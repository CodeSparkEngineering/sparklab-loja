export default function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs sm:text-sm font-medium py-2 px-4 flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-4 tracking-wide">
      <span>🚚 <span className="font-bold underline decoration-orange-300 underline-offset-2">Envio Grátis</span> a partir de 40€!</span>
      <span className="hidden sm:inline opacity-50">|</span>
      <span>📦 Preços especiais de <span className="font-bold underline decoration-orange-300 underline-offset-2">Atacado</span> a partir de 10 peças!</span>
    </div>
  );
}
