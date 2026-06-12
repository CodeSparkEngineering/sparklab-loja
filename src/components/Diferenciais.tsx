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
            <div className="card__icon card__icon--orange w-16 h-16 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 overflow-hidden bg-white/5 border border-white/10 rounded-xl">
              <img src="/images/bambu-spool.png" alt="Filamento Oficial Bambu Lab" className="w-full h-full object-contain p-2" />
            </div>
            <h3>Materiais oficiais Bambu Lab</h3>
            <p>Utilizamos exclusivamente impressoras Bambu Lab P1S e seus filamentos oficiais (PLA, PETG, ABS, TPU, ASA, PC) para o melhor acabamento e precisão.</p>
          </article>

          <article className="card card--feature reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="card__icon card__icon--blue w-16 h-16 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 overflow-hidden bg-white/5 border border-white/10 rounded-xl">
              <img src="/images/delivery-box.png" alt="Entrega rápida" className="w-full h-full object-contain p-1" />
            </div>
            <h3>Entrega em todo o Portugal</h3>
            <p>Produzimos com cuidado e despachamos via CTT registado para todo o país, com embalagem segura e seguimento da encomenda.</p>
          </article>

          <article className="card card--feature reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="card__icon card__icon--olive w-16 h-16 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 overflow-hidden bg-white/5 border border-white/10 rounded-xl">
              <img src="/images/pro-finish.png" alt="Acabamento profissional" className="w-full h-full object-contain p-1" />
            </div>
            <h3>Acabamento profissional</h3>
            <p>Lixagem, pintura e montagem incluídos sob pedido. A tua peça chega pronta para exibir ou usar.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
