import type { Metadata } from 'next';
import PrivacidadeContent from './PrivacidadeContent';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como a SparkLab recolhe, usa e protege os teus dados.',
  alternates: { canonical: '/privacidade' },
};

export default function PrivacidadePage() {
  return <PrivacidadeContent />;
}
