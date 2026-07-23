import type { Metadata } from 'next';
import PedidoRecebidoCard from './PedidoRecebidoCard';

/**
 * Página de confirmação do pedido de orçamento ("obrigado").
 * Serve de destino de conversão no Google Ads: é o URL único que só é
 * atingido depois de alguém submeter o formulário de orçamento.
 *
 * noindex: é uma página de confirmação — não deve aparecer nas pesquisas
 * (senão seria contada como conversão por quem lá chega pelo Google).
 */
export const metadata: Metadata = {
  title: 'Pedido recebido · SparkLab',
  description: 'Recebemos o teu pedido de orçamento. Respondemos em até 2 horas úteis no WhatsApp.',
  robots: { index: false, follow: true },
};

export default function PedidoRecebidoPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4 py-24">
      <PedidoRecebidoCard />
    </main>
  );
}
