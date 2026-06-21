export default function Diferenciais() {
  return (
    <section className="section" id="diferenciais">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow--hand" style={{ color: 'var(--blue)' }}>o nosso toque</span>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">O cuidado artesanal que as <span className="text-orange-600">máquinas</span> não têm.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <article className="card reveal p-8 flex flex-col gap-4">
            <img src="/images/diferenciais-filamento.jpg" alt="Filamento dourado e extrusora Bambu Lab" className="w-full h-44 object-cover rounded-2xl shadow-sm" loading="lazy" />
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">O padrão de ouro Bambu Lab</h3>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">Trabalhamos exclusivamente com as máquinas P1S. Cada filamento é escolhido a dedo para que a tua peça tenha resistência e aquele acabamento perfeito.</p>
          </article>

          <article className="card reveal p-8 flex flex-col gap-4" style={{ transitionDelay: '0.1s' }}>
            <img src="/images/diferenciais-envio.jpg" alt="Peças impressas em 3D embaladas à mão numa caixa" className="w-full h-44 object-cover rounded-2xl shadow-sm" loading="lazy" />
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">Enviamos de nós para ti</h3>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">Embalamos tudo à mão, com muito plástico bolha e carinho. Despachamos via CTT registado para que chegue até ti impecável, em qualquer ponto do país.</p>
          </article>

          <article className="card reveal p-8 flex flex-col gap-4" style={{ transitionDelay: '0.2s' }}>
            <img src="/images/diferenciais-acabamento.jpg" alt="Peça impressa em 3D lixada e pintada à mão numa bancada de acabamento" className="w-full h-44 object-cover rounded-2xl shadow-sm" loading="lazy" />
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">Não é só "Carregar no Botão"</h3>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">Lixamos, pintamos e montamos se precisares. Não deixamos pontas soltas. A tua peça chega-te pronta para exibir ou usar, com todo o mimo.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
