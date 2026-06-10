import { type NextRequest, NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import Stripe from 'stripe';
import { getProductById } from '@/data/products';

// Lê arquivos do disco (fs) → precisa do runtime Node.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Entrega segura de arquivos STL.
 *
 * Fluxo: /api/download?session_id=cs_...&product_id=stl-...
 *  1. Confirma no Stripe que a sessão existe e foi PAGA.
 *  2. Confirma que essa compra realmente inclui o produto pedido.
 *  3. Confirma que o produto é digital e tem um STL associado.
 *  4. Só então lê o arquivo da pasta PRIVADA e o envia como download.
 *
 * Os STL ficam em `private-stl/` (fora de /public), então não há como
 * baixá-los sem passar por aqui — e aqui exige um pagamento confirmado.
 */
export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id');
  const productId = request.nextUrl.searchParams.get('product_id');

  if (!sessionId || !productId) {
    return NextResponse.json(
      { error: 'Parâmetros em falta (session_id, product_id).' },
      { status: 400 },
    );
  }

  const product = getProductById(productId);
  if (!product || !product.digital || !product.stl) {
    return NextResponse.json(
      { error: 'Produto não é um arquivo digital válido.' },
      { status: 404 },
    );
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json(
      { error: 'Pagamentos não configurados.' },
      { status: 500 },
    );
  }

  // 1 + 2: sessão paga e que contém este produto.
  let paidForProduct = false;
  try {
    const stripe = new Stripe(key);
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product'],
    });

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Pagamento não confirmado para esta sessão.' },
        { status: 403 },
      );
    }

    for (const item of session.line_items?.data ?? []) {
      const prod = item.price?.product;
      const metaId =
        prod && typeof prod === 'object' && 'metadata' in prod
          ? prod.metadata?.product_id
          : undefined;
      if (metaId === productId) {
        paidForProduct = true;
        break;
      }
    }
  } catch {
    return NextResponse.json(
      { error: 'Não foi possível validar o pagamento.' },
      { status: 502 },
    );
  }

  if (!paidForProduct) {
    return NextResponse.json(
      { error: 'Esta compra não inclui este arquivo.' },
      { status: 403 },
    );
  }

  // 4: lê e entrega o arquivo da pasta privada.
  // Sanitiza o nome do arquivo para impedir path traversal.
  const safeFile = path.basename(product.stl.file);
  const filePath = path.join(process.cwd(), 'private-stl', safeFile);

  let data: Buffer;
  try {
    data = await readFile(filePath);
  } catch {
    return NextResponse.json(
      { error: 'Arquivo ainda não disponível. Fale connosco pelo WhatsApp.' },
      { status: 404 },
    );
  }

  const downloadName = product.stl.downloadName || safeFile;

  return new NextResponse(new Uint8Array(data), {
    status: 200,
    headers: {
      'Content-Type': 'model/stl',
      'Content-Disposition': `attachment; filename="${downloadName}"`,
      'Content-Length': String(data.byteLength),
      'Cache-Control': 'private, no-store',
    },
  });
}
