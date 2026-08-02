import { NextResponse, type NextRequest } from 'next/server';
import Stripe from 'stripe';
import { getProductById, unitPriceFor, WHOLESALE_MIN_QTY, WHOLESALE_DISCOUNT } from '@/data/products';
import { SITE_URL } from '@/data/site';

// Stripe usa APIs de Node (crypto), então força o runtime Node.
export const runtime = 'nodejs';

type IncomingLine = { id: string; qty: number; customizations?: Record<string, string> };

// Mensagens mostradas NA página de checkout da Stripe (custom_text). Bilingue —
// o idioma vem do site (o cliente escolheu PT/EN) e também fixa o locale.
const CHECKOUT_TEXT = {
  pt: {
    submit:
      'Peças personalizadas e por encomenda são produzidas após o pagamento — confirmamos o prazo contigo no WhatsApp (+351 916 853 802).',
    shipping:
      'Enviamos para todo o Portugal via CTT registado, com seguimento. Grátis a partir de 40€.',
  },
  en: {
    submit:
      'Personalized and made-to-order pieces are produced after payment — we confirm the timeline with you on WhatsApp (+351 916 853 802).',
    shipping:
      'We ship anywhere in Portugal via registered CTT mail, with tracking. Free over €40.',
  },
} as const;

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
  let body: { items?: IncomingLine[]; lang?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Corpo inválido.' }, { status: 400 });
  }

  const lang: 'pt' | 'en' = body.lang === 'en' ? 'en' : 'pt';
  const incoming = Array.isArray(body.items) ? body.items : [];
  if (incoming.length === 0) {
    return NextResponse.json({ error: 'Carrinho vazio.' }, { status: 400 });
  }
  // Defesa em profundidade: o carrinho real nunca chega perto disto (catálogo
  // tem ~23 produtos); um array gigante só pode ser um pedido forjado.
  if (incoming.length > 100) {
    return NextResponse.json({ error: 'Carrinho inválido.' }, { status: 400 });
  }

  // O header Origin é controlado pelo cliente — valida contra os domínios
  // do site antes de o usar nos redirects do Stripe (evita que alguém crie
  // sessões de pagamento que redirecionam para um site externo).
  const ALLOWED_ORIGINS = new Set([
    SITE_URL,
    'https://sparklab3d.pt',
    'https://sparklab-loja.vercel.app', // URL antiga da Vercel, ainda ativa
    ...(process.env.NODE_ENV !== 'production' ? [new URL(request.url).origin] : []),
  ]);
  const rawOrigin = request.headers.get('origin') ?? new URL(request.url).origin;
  const origin = ALLOWED_ORIGINS.has(rawOrigin) ? rawOrigin : SITE_URL;

  // Atacado: soma as quantidades POR PRODUTO (variantes personalizadas do
  // mesmo produto contam juntas) para decidir o desconto de 15% em 10+.
  const qtyByProduct: Record<string, number> = {};
  for (const line of incoming) {
    const product = getProductById(String(line?.id));
    const qty = Math.max(1, Math.min(99, Math.floor(Number(line?.qty) || 0)));
    if (!product || qty < 1) continue;
    qtyByProduct[product.id] = (qtyByProduct[product.id] ?? 0) + qty;
  }

  // Monta os line_items a partir do catálogo do SERVIDOR (preço autoritativo).
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let hasPhysical = false;
  let hasDigital = false;
  for (const line of incoming) {
    const product = getProductById(String(line?.id));
    const qty = Math.max(1, Math.min(99, Math.floor(Number(line?.qty) || 0)));
    if (!product || qty < 1) continue;

    if (product.digital) hasDigital = true;
    else hasPhysical = true;

    // Só aceita chaves de personalização DEFINIDAS no produto (whitelist) e
    // limita o tamanho dos valores — evita metadados arbitrários (que podiam
    // até sobrepor o product_id) e o limite de 500 chars/valor da Stripe.
    const customizations: Record<string, string> = {};
    if (line.customizations && product.customizations?.length) {
      for (const def of product.customizations) {
        const val = line.customizations[def.id];
        if (typeof val === 'string' && val.trim()) {
          customizations[def.id] = val.trim().slice(0, 200);
        }
      }
    }

    // Personalizações OBRIGATÓRIAS validadas AQUI, no servidor — a UI também
    // obriga, mas um POST direto à API não passa por ela; sem isto seria
    // possível pagar uma peça personalizada sem os dados para a produzir.
    const missingReq = product.customizations?.find(
      (def) => def.required && !customizations[def.id]
    );
    if (missingReq) {
      const label = lang === 'en' && missingReq.labelEn ? missingReq.labelEn : missingReq.label;
      return NextResponse.json(
        {
          error:
            lang === 'en'
              ? `Missing required personalization "${label}" for ${product.nameEn ?? product.name}.`
              : `Falta a personalização obrigatória "${label}" em ${product.name}.`,
        },
        { status: 400 }
      );
    }

    let customText = '';
    if (Object.keys(customizations).length > 0) {
      customText = '\nPersonalização: ' + Object.entries(customizations)
        .map(([key, val]) => {
          const optionDef = product.customizations?.find(c => c.id === key);
          return `${optionDef?.label || key}: ${val}`;
        }).join(' | ');
    }

    // 15% de atacado quando o total do MESMO produto (todas as variantes)
    // atinge as 10 unidades — preço calculado sempre no servidor.
    const totalOfProduct = qtyByProduct[product.id] ?? qty;
    const unit = unitPriceFor(product.price, totalOfProduct);
    const wholesaleText =
      totalOfProduct >= WHOLESALE_MIN_QTY
        ? `\nAtacado (${WHOLESALE_MIN_QTY}+ un.): −${Math.round(WHOLESALE_DISCOUNT * 100)}%`
        : '';

    lineItems.push({
      quantity: qty,
      price_data: {
        currency: 'eur',
        unit_amount: Math.round(unit * 100), // EUR → cêntimos
        product_data: {
          name: product.name,
          description: product.desc + customText + wholesaleText,
          ...(product.images && product.images.length > 0 ? { images: [`${origin}${product.images[0]}`] } : {}),
          metadata: {
            ...customizations,
            product_id: product.id, // por último: nunca pode ser sobreposto
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

    // Mensagens na página de checkout (no idioma do site). A de envio só se
    // aplica quando há recolha de morada (itens físicos) — adicionada abaixo.
    const customText: Stripe.Checkout.SessionCreateParams.CustomText = {
      submit: { message: CHECKOUT_TEXT[lang].submit },
    };

    // Itens físicos exigem envio + endereço. Se o carrinho é SÓ digital (STL),
    // não há envio nem endereço — entrega é por download na página de sucesso.
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items: lineItems,
      locale: lang, // fixa o checkout no idioma escolhido no site (pt/en)
      billing_address_collection: 'auto',
      phone_number_collection: { enabled: hasPhysical },
      invoice_creation: { enabled: true }, // gera fatura em PDF (útil p/ atacado/empresas)
      custom_text: customText,
      success_url: `${origin}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout=cancelado#catalogo`,
      metadata: { has_digital: String(hasDigital), has_physical: String(hasPhysical), lang },
    };

    if (hasPhysical) {
      customText.shipping_address = { message: CHECKOUT_TEXT[lang].shipping };
      params.shipping_address_collection = { allowed_countries: SHIPPING_COUNTRIES };
      params.shipping_options = [
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
      ];
    }

    const session = await stripe.checkout.sessions.create(params);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    // Loga o detalhe no servidor, mas devolve mensagem genérica ao cliente
    // (mensagens da Stripe podem expor detalhes internos da conta/config).
    console.error('[checkout] erro:', err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: 'Erro ao criar a sessão de pagamento. Tenta novamente.' },
      { status: 500 }
    );
  }
}
