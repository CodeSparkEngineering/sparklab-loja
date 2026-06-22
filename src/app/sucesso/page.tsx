import Link from 'next/link';
import Stripe from 'stripe';
import ClearCartOnMount from '@/components/ClearCartOnMount';
import { formatEUR } from '@/data/products';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type SearchParams = Promise<{ session_id?: string }>;

async function getSession(sessionId: string) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  try {
    const stripe = new Stripe(key);
    return await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });
  } catch {
    return null;
  }
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
            <h1 className="order__title">Pagamento confirmado</h1>
            <p className="order__text">
              Obrigado pela tua compra. Vamos iniciar a produção da tua
              encomenda na nossa Bambu Lab P1S e enviá-la com embalagem segura,
              via CTT registado.{' '}
              {email ? <>Enviámos a confirmação para <strong>{email}</strong>.</> : null}
            </p>
            {total !== null && (
              <p className="order__total">
                Total pago: <strong>{formatEUR(total)}</strong>
              </p>
            )}
          </>
        ) : (
          <>
            <h1 className="order__title">A processar o teu pedido</h1>
            <p className="order__text">
              Se concluíste o pagamento, ele pode levar alguns instantes a
              confirmar. Qualquer dúvida, fala connosco.
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
