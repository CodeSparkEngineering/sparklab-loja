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
  // Só expomos dados do cliente (email/total) quando o pagamento está
  // confirmado. Assim, mesmo com um session_id válido mas não pago, nada
  // de pessoal chega ao browser (defesa em profundidade — o ID Stripe já
  // é impossível de adivinhar, isto é a segunda camada).
  const email = paid
    ? session?.customer_details?.email ?? session?.customer_email ?? null
    : null;
  const total =
    paid && typeof session?.amount_total === 'number' ? session.amount_total / 100 : null;

  return (
    <main className="order">
      {/* Limpa o carrinho só se o pagamento foi confirmado */}
      {paid && <ClearCartOnMount />}
      <SucessoCard paid={paid} email={email} total={total} />
    </main>
  );
}
