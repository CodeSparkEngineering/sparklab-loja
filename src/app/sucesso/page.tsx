import Link from 'next/link';
import Stripe from 'stripe';
import ClearCartOnMount from '@/components/ClearCartOnMount';
import { formatEUR, getProductById, type Product } from '@/data/products';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type SearchParams = Promise<{ session_id?: string }>;

async function getSession(sessionId: string) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  try {
    const stripe = new Stripe(key);
    return await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product'],
    });
  } catch {
    return null;
  }
}

/** Extrai os produtos digitais (STL) comprados nesta sessão. */
function getDigitalProducts(session: Stripe.Checkout.Session | null): Product[] {
  if (!session) return [];
  const result: Product[] = [];
  const seen = new Set<string>();
  for (const item of session.line_items?.data ?? []) {
    const prod = item.price?.product;
    const metaId =
      prod && typeof prod === 'object' && 'metadata' in prod
        ? prod.metadata?.product_id
        : undefined;
    if (!metaId || seen.has(metaId)) continue;
    const product = getProductById(metaId);
    if (product?.digital && product.stl) {
      seen.add(metaId);
      result.push(product);
    }
  }
  return result;
}

export default async function SucessoPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { session_id } = await searchParams;
  const session = session_id ? await getSession(session_id) : null;
  const paid = session?.payment_status === 'paid';
  const email =
    session?.customer_details?.email ?? session?.customer_email ?? null;
  const total =
    typeof session?.amount_total === 'number' ? session.amount_total / 100 : null;
  const digitalProducts = paid ? getDigitalProducts(session) : [];
  const hasPhysical = session?.metadata?.has_physical === 'true';

  return (
    <main className="order">
      {/* Limpa o carrinho só se o pagamento foi confirmado */}
      {paid && <ClearCartOnMount />}

      <div className="order__card">
        <div className={`order__icon ${paid ? 'order__icon--ok' : 'order__icon--pending'}`}>
          {paid ? (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          )}
        </div>

        {paid ? (
          <>
            <h1 className="order__title">Pagamento confirmado!</h1>
            <p className="order__text">
              Obrigado pela sua compra.{' '}
              {hasPhysical
                ? 'Recebemos o seu pedido e vamos começar a produção. '
                : digitalProducts.length > 0
                  ? 'Os teus arquivos estão prontos para download abaixo. '
                  : ''}
              {email ? <>Enviámos a confirmação para <strong>{email}</strong>.</> : null}
            </p>
            {total !== null && (
              <p className="order__total">
                Total pago: <strong>{formatEUR(total)}</strong>
              </p>
            )}

            {digitalProducts.length > 0 && session_id && (
              <div className="order__downloads">
                <h2 className="order__downloads-title">
                  Os teus arquivos STL
                </h2>
                <ul className="order__downloads-list">
                  {digitalProducts.map((p) => (
                    <li key={p.id} className="order__download">
                      <span className="order__download-name">
                        <span aria-hidden="true">📦</span> {p.name}
                      </span>
                      <a
                        className="btn btn--primary btn--sm"
                        href={`/api/download?session_id=${encodeURIComponent(session_id)}&product_id=${encodeURIComponent(p.id)}`}
                      >
                        Baixar .STL
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="order__downloads-note">
                  Guarda os arquivos em local seguro. Podes voltar a esta página
                  pelo link no teu email para baixar de novo.
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="order__title">A processar o seu pedido</h1>
            <p className="order__text">
              Se você concluiu o pagamento, ele pode levar alguns instantes a
              confirmar. Qualquer dúvida, fale connosco.
            </p>
          </>
        )}

        <div className="order__actions">
          <Link href="/#catalogo" className="btn btn--primary">
            Voltar ao catálogo
          </Link>
          <Link href="/" className="btn btn--ghost">
            Página inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
