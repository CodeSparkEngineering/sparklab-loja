import { NextResponse, type NextRequest } from 'next/server';
import Stripe from 'stripe';
import { getProductById } from '@/data/products';

// Stripe usa APIs de Node (crypto), então força o runtime Node.
export const runtime = 'nodejs';

type IncomingLine = { id: string; qty: number; customizations?: Record<string, string> };

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY não configurada (ver .env.local)');
  }
  return new Stripe(key);
}

// Países permitidos para entrega. Adicione mais conforme necessário.
const SHIPPING_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] =
  ['PT'];

export async function POST(request: NextRequest) {
  let body: { items?: IncomingLine[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Corpo inválido.' }, { status: 400 });
  }

  const incoming = Array.isArray(body.items) ? body.items : [];
  if (incoming.length === 0) {
    return NextResponse.json({ error: 'Carrinho vazio.' }, { status: 400 });
  }

  const origin =
    request.headers.get('origin') ?? new URL(request.url).origin;

  // Monta os line_items a partir do catálogo do SERVIDOR (preço autoritativo).
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const line of incoming) {
    const product = getProductById(String(line?.id));
    const qty = Math.max(1, Math.min(99, Math.floor(Number(line?.qty) || 0)));
    if (!product || qty < 1) continue;

    let customText = '';
    if (line.customizations && Object.keys(line.customizations).length > 0) {
      customText = '\nPersonalização: ' + Object.entries(line.customizations)
        .map(([key, val]) => {
          const optionDef = product.customizations?.find(c => c.id === key);
          return `${optionDef?.label || key}: ${val}`;
        }).join(' | ');
    }

    lineItems.push({
      quantity: qty,
      price_data: {
        currency: 'eur',
        unit_amount: Math.round(product.price * 100), // EUR → cêntimos
        product_data: {
          name: product.name,
          description: product.desc + customText,
          ...(product.images && product.images.length > 0 ? { images: [`${origin}${product.images[0]}`] } : {}),
          metadata: { 
            product_id: product.id,
            ...line.customizations
          },
        },
      },
    });
  }

  if (lineItems.length === 0) {
    return NextResponse.json(
      { error: 'Nenhum item válido no carrinho.' },
      { status: 400 }
    );
  }

  try {
    const subtotalCents = lineItems.reduce((acc, item) => acc + (item.price_data?.unit_amount || 0) * (item.quantity || 1), 0);
    const isFreeShipping = subtotalCents >= 4000; // 40€

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: isFreeShipping ? 0 : 490,
              currency: 'eur',
            },
            display_name: isFreeShipping ? 'Envio CTT Registado (Grátis)' : 'Envio CTT Registado',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 3 },
            },
          },
        },
      ],
      // Coleta de dados do cliente:
      billing_address_collection: 'auto',
      shipping_address_collection: { allowed_countries: SHIPPING_COUNTRIES },
      phone_number_collection: { enabled: true },
      // (email é coletado automaticamente pelo Stripe Checkout)
      success_url: `${origin}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout=cancelado#catalogo`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Erro ao criar a sessão de pagamento.';
    console.error('[checkout] erro:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
