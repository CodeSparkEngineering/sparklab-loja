import type { Metadata } from 'next';
import Stripe from 'stripe';
import ClearCartOnMount from '@/components/ClearCartOnMount';
import SucessoCard from './SucessoCard';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Página pós-checkout: nunca deve aparecer nos resultados de pesquisa.
export const metadata: Metadata = {
  title: 'Encomenda confirmada',
  robots: { index: false, follow: false },
};

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
      <SucessoCard paid={paid} email={email} total={total} />
    </main>
  );
}
