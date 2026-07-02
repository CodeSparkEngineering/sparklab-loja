import type { Metadata } from 'next';
import TermosContent from './TermosContent';

export const metadata: Metadata = {
  title: 'Termos e Condições',
  description: 'Condições de compra, envio e utilização dos produtos e ficheiros da SparkLab.',
  alternates: { canonical: '/termos' },
};

export default function TermosPage() {
  return <TermosContent />;
}
