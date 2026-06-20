export default function AOficina() {
  return (
    <section id="a-oficina" className="py-24 bg-stone-50 dark:bg-transparent relative overflow-hidden">
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Coluna da Imagem */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative mx-auto w-4/5 lg:w-full max-w-md rotate-[-2deg] transition-transform hover:rotate-0 duration-500">
              {/* "Fita-cola" */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 dark:bg-white/10 backdrop-blur-md rotate-[-3deg] shadow-sm z-20" />
              
              <div className="bg-white dark:bg-[#1a1816] p-4 pb-16 shadow-2xl rounded-sm border border-stone-100 dark:border-white/5 relative z-10">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-stone-200 dark:bg-stone-800">
                  {/* Foto real de uma peça nossa (trocar por foto da oficina quando houver) */}
                  <img
                    src="/images/bananao.jpg"
                    alt="Peça impressa à mão pela SparkLab"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="absolute bottom-4 left-0 right-0 text-center text-2xl text-stone-600 dark:text-stone-400"
                  style={{ fontFamily: 'var(--f-accent)' }}
                >
                  Feito à mão, peça a peça 🛠️
                </div>
              </div>
            </div>
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
                Cada peça que sai daqui não é apenas "impressa". É desenhada, preparada camada a camada 
                com as configurações ideais, impressa na nossa Bambu Lab P1S, limpa, embalada à mão e levada 
                aos correios com todo o cuidado. 
              </p>
              <p>
                Quando nos pedes um orçamento ou compras no catálogo, estás a falar diretamente 
                com a pessoa que vai operar a máquina. Sem intermediários, sem respostas robóticas. 
                Apenas eu, as impressoras, e as tuas ideias a ganharem forma no mundo real.
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
            
            <div className="mt-10 pt-8 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-stone-800 overflow-hidden relative shrink-0 flex items-center justify-center border border-stone-200 dark:border-white/10">
                  <img
                    src="/logo.jpg"
                    alt="SparkLab"
                    className="w-9 h-9 object-contain"
                  />
                </div>
                <div>
                  <p className="text-stone-900 dark:text-stone-100 font-semibold" style={{ fontFamily: 'var(--f-head)' }}>Fundador da SparkLab</p>
                  <p className="text-stone-500 dark:text-stone-400 text-sm">Maker & Entusiasta 3D</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
