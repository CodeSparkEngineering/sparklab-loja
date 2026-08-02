import type { Metadata } from 'next';
import CalculadoraContent from './CalculadoraContent';

/**
 * Calculadora de preços INTERNA da SparkLab (não indexável, fora do menu).
 * Fórmula acordada: (material + energia + tempo de trabalho) × 3.
 * Números-base reais em CalculadoraContent (editáveis e guardados no browser).
 */
export const metadata: Metadata = {
  title: 'Calculadora de preços (interna)',
  robots: { index: false, follow: false },
  alternates: { canonical: '/calculadora' },
};

export default function CalculadoraPage() {
  return <CalculadoraContent />;
}
