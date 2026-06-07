export default function Depoimentos() {
  return (
    <section className="section section--alt" id="depoimentos">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow eyebrow--blue"><span className="dot dot--blue"></span> Depoimentos</span>
          <h2 className="h2">Quem já recebeu,<br />voltou a pedir.</h2>
        </div>

        <div className="grid grid--3 testimonials">
          <figure className="quote reveal">
            <div className="stars">★★★★★</div>
            <blockquote>
              <p>Pedi miniaturas para o meu jogo de tabuleiro e a qualidade surpreendeu.
              Detalhes minúsculos perfeitos e a entrega foi mais rápida do que prometido.</p>
            </blockquote>
            <figcaption>
              <div className="avatar" style={{ background: '#d97757' }}>M</div>
              <div>
                <strong>Mariana Freitas</strong>
                <small>Designer de jogos · Lisboa</small>
              </div>
            </figcaption>
          </figure>

          <figure className="quote reveal">
            <div className="stars">★★★★★</div>
            <blockquote>
              <p>Precisava de uma peça de reposição que o fabricante não vendia mais.
              Mandei o desenho, em dois dias estava funcionando como nova.</p>
            </blockquote>
            <figcaption>
              <div className="avatar" style={{ background: '#6a9bcc' }}>R</div>
              <div>
                <strong>Rafael Monteiro</strong>
                <small>Engenheiro mecânico · Porto</small>
              </div>
            </figcaption>
          </figure>

          <figure className="quote reveal">
            <div className="stars">★★★★★</div>
            <blockquote>
              <p>A luminária com foto da minha filha ficou linda. Atendimento no WhatsApp
              foi atencioso e me ajudaram a escolher a melhor imagem.</p>
            </blockquote>
            <figcaption>
              <div className="avatar" style={{ background: '#788c5d' }}>C</div>
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
