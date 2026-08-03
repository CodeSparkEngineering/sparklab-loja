/**
 * Fundo decorativo subtil — malha técnica (um aceno ao CAD/3D, passa precisão)
 * com brilhos quentes da marca (laranja/verde/âmbar) em deriva lenta. Puramente
 * estético (aria-hidden), leve (só CSS, sem imagem/vídeo), clipa os brilhos nas
 * margens (não gera scroll) e deixa o conteúdo por cima perfeitamente legível.
 */
export default function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="aurora-grid absolute inset-0" />
      <div
        className="aurora-blob absolute -left-28 -top-40 h-[32rem] w-[32rem] rounded-full bg-orange-400/25 blur-[110px]"
        style={{ animationDuration: '19s' }}
      />
      <div
        className="aurora-blob absolute -right-36 top-1/4 h-[30rem] w-[30rem] rounded-full bg-emerald-400/15 blur-[110px]"
        style={{ animationDuration: '25s', animationDelay: '-6s' }}
      />
      <div
        className="aurora-blob absolute -bottom-44 left-1/5 h-[28rem] w-[28rem] rounded-full bg-amber-300/20 blur-[110px]"
        style={{ animationDuration: '30s', animationDelay: '-12s' }}
      />
    </div>
  );
}
