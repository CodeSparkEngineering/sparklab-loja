export default function ComoFunciona() {
  return (
    <section className="section section--alt" id="como-funciona">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow eyebrow--orange">
            <span className="dot" /> Como funciona
          </span>
          <h2 className="h2">
            Três passos entre uma ideia<br />e a peça na tua mão.
          </h2>
        </div>

        <ol className="timeline">
          {/* Step 01 */}
          <li className="tl-item reveal">
            <div className="tl-num">
              <div className="tl-num__circle">01</div>
            </div>
            <div className="tl-body">
              <h3>Escolhe ou envia o teu ficheiro</h3>
              <p>
                Seleciona uma peça do catálogo ou envia o teu próprio ficheiro
                STL / OBJ para um orçamento rápido. Sem complicações.
              </p>
              <div className="tl-art">
                <span className="art-file">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  .STL
                </span>
                <span className="art-file">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  .OBJ
                </span>
                <span className="art-file" style={{ color: 'var(--blue)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  Catálogo
                </span>
              </div>
            </div>
          </li>

          {/* Step 02 */}
          <li className="tl-item reveal">
            <div className="tl-num">
              <div className="tl-num__circle">02</div>
            </div>
            <div className="tl-body">
              <h3>Personaliza ao detalhe</h3>
              <p>
                Define a cor, material, tamanho e acabamento. A nossa equipa
                confirma todos os detalhes antes de imprimir — sem surpresas.
              </p>
              <div className="tl-art">
                <span className="art-swatch" style={{ background: '#d97757' }} title="Laranja" />
                <span className="art-swatch" style={{ background: '#6a9bcc' }} title="Azul" />
                <span className="art-swatch" style={{ background: '#788c5d' }} title="Verde" />
                <span className="art-swatch" style={{ background: '#2a2a27' }} title="Preto" />
                <span className="art-swatch" style={{ background: '#e8e6dc', border: '1px solid rgba(0,0,0,.1)' }} title="Branco" />
                <span className="art-swatch" style={{ background: '#c4a0d0' }} title="Rosa" />
              </div>
            </div>
          </li>

          {/* Step 03 */}
          <li className="tl-item reveal">
            <div className="tl-num">
              <div className="tl-num__circle">03</div>
            </div>
            <div className="tl-body">
              <h3>Recebe em casa, em todo o Portugal</h3>
              <p>
                Produzimos, embalamos e despachamos via CTT para todo o país,
                com embalagem segura — até à porta da tua casa.
              </p>
              <div className="tl-art">
                <span className="art-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10H3M16 2l5 8-5 8M8 2L3 10l5 8" />
                  </svg>
                  Envio CTT registado
                </span>
                <span className="art-badge" style={{ background: 'rgba(59,130,246,.08)', borderColor: 'rgba(59,130,246,.2)', color: 'var(--blue)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Embalagem segura
                </span>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
