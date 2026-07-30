import type { Metadata } from 'next';
import OrcamentoLanding from './OrcamentoLanding';

/**
 * Landing page dedicada do orçamento — destino do Google Ads.
 * Título literal que repete a pesquisa + formulário no primeiro ecrã +
 * selos de confiança. Curta e sem catálogo, para máxima conversão.
 * Indexável (é também uma boa página de aterragem orgânica).
 */
export const metadata: Metadata = {
  title: 'Orçamento de Impressão 3D em Portugal',
  description:
    'Pede um orçamento de impressão 3D em Portugal. Envia o teu ficheiro (STL, OBJ, 3MF, STEP) ou só a ideia — resposta em até 2 horas úteis no WhatsApp, sem compromisso.',
  alternates: { canonical: '/orcamento' },
  openGraph: {
    type: 'website',
    title: 'Orçamento de Impressão 3D em Portugal · SparkLab',
    description:
      'Envia o teu ficheiro 3D ou só a ideia e recebe preço e prazo — resposta em até 2 horas úteis, sem compromisso.',
    url: '/orcamento',
  },
};

export default function OrcamentoPage() {
  return <OrcamentoLanding />;
}
