const StarsSVG = () => (
  <div className="stars" aria-label="5 estrelas">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block' }}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

export default function Depoimentos() {
  return (
    <section className="section section--alt" id="depoimentos">
      <div className="container">
        <div className="section__head reveal" style={{ textAlign: 'center', marginInline: 'auto' }}>
          <span className="eyebrow--hand" style={{ color: 'var(--blue)' }}>o que dizem de nós</span>
          <h2 className="h2">Quem já recebeu,<br />voltou a <span className="hand-underline">pedir</span>.</h2>
        </div>

        <div className="grid grid--3 testimonials">
          <figure className="quote reveal">
            <StarsSVG />
            <blockquote>
              <p>Pedi miniaturas para o meu jogo de tabuleiro e a qualidade surpreendeu.
              Detalhes minúsculos perfeitos e a entrega foi mais rápida do que prometido.</p>
            </blockquote>
            <figcaption>
              <div>
                <strong>Mariana Freitas</strong>
                <small>Designer de jogos · Lisboa</small>
              </div>
            </figcaption>
          </figure>

          <figure className="quote reveal">
            <StarsSVG />
            <blockquote>
              <p>Precisava de uma peça de substituição que o fabricante já não vendia.
              Enviei o desenho e, em dois dias, estava a funcionar como nova.</p>
            </blockquote>
            <figcaption>
              <div>
                <strong>Rafael Monteiro</strong>
                <small>Engenheiro mecânico · Porto</small>
              </div>
            </figcaption>
          </figure>

          <figure className="quote reveal">
            <StarsSVG />
            <blockquote>
              <p>A luminária com foto da minha filha ficou linda. Atendimento no WhatsApp
              foi atencioso e ajudaram-me a escolher a melhor imagem.</p>
            </blockquote>
            <figcaption>
              <div>
                <strong>Camila Duarte</strong>
                <small>Cliente desde 2024 · Braga</small>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
