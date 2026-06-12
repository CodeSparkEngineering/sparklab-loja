// Ícones vetoriais nítidos e coloridos (substituem os PNGs pixelados).

function SpoolIcon() {
  // Bobine de filamento (vista de frente)
  return (
    <svg viewBox="0 0 40 40" width="36" height="36" aria-hidden="true">
      <circle cx="20" cy="20" r="17" fill="#f97316" opacity="0.16" />
      <circle cx="20" cy="20" r="16" fill="none" stroke="#fb923c" strokeWidth="2" />
      <circle cx="20" cy="20" r="11.5" fill="none" stroke="#f97316" strokeWidth="4.5" />
      <circle cx="20" cy="20" r="6" fill="#fdba74" />
      <circle cx="20" cy="20" r="2.4" fill="#7c2d12" />
    </svg>
  );
}

function BoxIcon() {
  // Caixa de entrega (isométrica)
  return (
    <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">
      <path d="M20 4 34 12v16L20 36 6 28V12z" fill="#1e3a8a" />
      <path d="M20 4 34 12 20 20 6 12z" fill="#60a5fa" />
      <path d="M6 12 20 20v16L6 28z" fill="#3b82f6" />
      <path d="M34 12 20 20v16l14-8z" fill="#2563eb" />
      <path d="M13 8 27 16" stroke="#bfdbfe" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SparkleIcon() {
  // Brilho/acabamento
  return (
    <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">
      <path d="M19 4 22.2 15.8 34 19 22.2 22.2 19 34 15.8 22.2 4 19 15.8 15.8z" fill="#a3e635" />
      <path d="M31 5 32.4 9.6 37 11 32.4 12.4 31 17 29.6 12.4 25 11 29.6 9.6z" fill="#84cc16" />
    </svg>
  );
}

export default function Diferenciais() {
  return (
    <section className="section" id="diferenciais">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow eyebrow--blue"><span className="dot dot--blue"></span> Diferenciais</span>
          <h2 className="h2">Qualidade que se sente<br />ao tocar.</h2>
        </div>

        <div className="grid grid--3">
          <article className="card card--feature reveal">
            <div className="card__icon card__icon--orange w-16 h-16 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 bg-white/5 border border-white/10 rounded-xl">
              <SpoolIcon />
            </div>
            <h3>Materiais oficiais Bambu Lab</h3>
            <p>Utilizamos exclusivamente impressoras Bambu Lab P1S e os seus filamentos oficiais (PLA, PETG, ABS, TPU, ASA, PC) para o melhor acabamento e precisão.</p>
          </article>

          <article className="card card--feature reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="card__icon card__icon--blue w-16 h-16 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 bg-white/5 border border-white/10 rounded-xl">
              <BoxIcon />
            </div>
            <h3>Entrega em todo o Portugal</h3>
            <p>Produzimos com cuidado e despachamos via CTT registado para todo o país, com embalagem segura e seguimento da encomenda.</p>
          </article>

          <article className="card card--feature reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="card__icon card__icon--olive w-16 h-16 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 bg-white/5 border border-white/10 rounded-xl">
              <SparkleIcon />
            </div>
            <h3>Acabamento profissional</h3>
            <p>Lixagem, pintura e montagem incluídos sob pedido. A tua peça chega pronta para exibir ou usar.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
