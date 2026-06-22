export default function AOficina() {
  return (
    <section id="a-oficina" className="py-24 bg-stone-50 dark:bg-transparent relative overflow-hidden">
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Coluna das Fotos — os dois fundadores */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-md mx-auto lg:max-w-none">
              {/* Israel */}
              <figure className="bg-white dark:bg-[#1a1816] p-3 pb-4 shadow-2xl rounded-sm border border-stone-100 dark:border-white/5 rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-stone-200 dark:bg-stone-800">
                  <img src="/images/fundador-israel.jpg" alt="Israel Vieira, co-fundador da SparkLab" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <figcaption className="text-center mt-3">
                  <span className="block font-bold text-stone-900 dark:text-stone-100" style={{ fontFamily: 'var(--f-head)' }}>Israel Vieira</span>
                  <span className="block text-xs text-stone-500 dark:text-stone-400">Co-fundador · Dev (certificado Google)</span>
                </figcaption>
              </figure>
              {/* Pamela */}
              <figure className="bg-white dark:bg-[#1a1816] p-3 pb-4 shadow-2xl rounded-sm border border-stone-100 dark:border-white/5 rotate-[2deg] hover:rotate-0 transition-transform duration-500">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-stone-200 dark:bg-stone-800">
                  <img src="/images/fundador-pamela.jpg" alt="Pamela Falk, co-fundadora da SparkLab" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <figcaption className="text-center mt-3">
                  <span className="block font-bold text-stone-900 dark:text-stone-100" style={{ fontFamily: 'var(--f-head)' }}>Pamela Falk</span>
                  <span className="block text-xs text-stone-500 dark:text-stone-400">Co-fundadora · 3D Maker</span>
                </figcaption>
              </figure>
            </div>
            <p className="text-center mt-6 text-xl text-stone-600 dark:text-stone-400" style={{ fontFamily: 'var(--f-accent)' }}>
              Os fundadores da SparkLab — produção local, em Portugal
            </p>
          </div>

          {/* Coluna do Texto */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-6 tracking-tight" style={{ fontFamily: 'var(--f-head)' }}>
              Por trás das máquinas.
            </h2>
            <div className="space-y-6 text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              <p>
                Esquece as fábricas gigantes e os produtos feitos em massa na China.
                A SparkLab é, na sua essência, uma pequena oficina sediada em Portugal,
                nascida da paixão pura pela impressão 3D e pela criação.
              </p>
              <p>
                Cada peça que sai daqui não é apenas &quot;impressa&quot;. É desenhada, preparada camada a camada
                com as configurações ideais, impressa na nossa Bambu Lab P1S, limpa, embalada à mão e levada
                aos correios com todo o cuidado.
              </p>
              <p>
                Quando nos pedes um orçamento ou compras no catálogo, estás a falar diretamente
                com quem vai operar a máquina. Sem intermediários, sem respostas robóticas.
                Apenas nós, as impressoras, e as tuas ideias a ganharem forma no mundo real.
              </p>
            </div>

            {/* Fact sheet estruturado para extração por motores de resposta IA (AEO) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm border-t border-stone-200 dark:border-stone-800 pt-6">
              <div>
                <span className="block font-semibold text-stone-900 dark:text-stone-100">Equipamento Utilizado</span>
                <span className="text-stone-500 dark:text-stone-400">Bambu Lab P1S com Câmara Fechada</span>
              </div>
              <div>
                <span className="block font-semibold text-stone-900 dark:text-stone-100">Materiais de Impressão</span>
                <span className="text-stone-500 dark:text-stone-400">PLA, PETG, ABS, ASA, TPU e PC</span>
              </div>
              <div>
                <span className="block font-semibold text-stone-900 dark:text-stone-100">Volume Único de Impressão</span>
                <span className="text-stone-500 dark:text-stone-400">Até 256 × 256 × 256 mm</span>
              </div>
              <div>
                <span className="block font-semibold text-stone-900 dark:text-stone-100">Área de Atendimento</span>
                <span className="text-stone-500 dark:text-stone-400">Produção local com envio para Portugal Continental e Ilhas</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
