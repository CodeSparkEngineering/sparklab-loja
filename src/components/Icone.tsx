import { ICONES, type NomeIcone } from '@/components/icones-dados';

/**
 * Ícones do kit de identidade da SparkLab (16 peças, traço 1.8, 24×24).
 *
 * Duas adaptações feitas ao importar o kit:
 *  · o prata do kit (#C7CCD1) passou a `currentColor`, para o ícone herdar a
 *    cor do texto onde estiver e funcionar em tema claro e escuro;
 *  · o laranja do kit (#F97316) passou ao laranja da marca do site (#ea580c).
 *    Esse acento fica fixo de propósito — é a assinatura visual.
 *
 * Porque é embutido e não <img src="/icons/x.svg">: dentro de um <img> o SVG
 * é um documento isolado, o `currentColor` resolveria a preto e os ícones
 * ficavam invisíveis no tema escuro. Embutido, a herança funciona.
 *
 * São decorativos (aria-hidden): quem os usa põe sempre texto ao lado.
 */
export default function Icone({
  nome,
  tamanho = 24,
  className,
}: {
  nome: NomeIcone;
  tamanho?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={tamanho}
      height={tamanho}
      fill="none"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      dangerouslySetInnerHTML={{ __html: ICONES[nome] }}
    />
  );
}
