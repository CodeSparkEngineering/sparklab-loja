'use client';

import Image from 'next/image';
import { useLang } from '@/i18n/LanguageContext';

const L = {
  pt: {
    eyebrow: 'o nosso toque',
    cards: [
      {
        img: '/images/diferenciais-filamento.jpg',
        alt: 'Filamento dourado e extrusora Bambu Lab',
        title: 'O padrão de ouro Bambu Lab',
        text: 'Trabalhamos exclusivamente com as máquinas P1S. Cada filamento é escolhido a dedo para que a tua peça tenha resistência e aquele acabamento perfeito.',
      },
      {
        img: '/images/diferenciais-envio.jpg',
        alt: 'Peças impressas em 3D embaladas à mão numa caixa',
        title: 'Enviamos de nós para ti',
        text: 'Embalagem segura e cuidada. Despachamos via CTT registado, com seguimento, para que chegue impecável a qualquer ponto do país.',
      },
      {
        img: '/images/diferenciais-acabamento.jpg',
        alt: 'Peça impressa em 3D lixada e pintada à mão numa bancada de acabamento',
        title: 'Não é só "Carregar no Botão"',
        text: 'Cada peça é revista e limpa à mão antes de seguir — nada de pontas soltas. Queres acabamentos especiais, como lixagem, pintura ou montagem? Fazemos a pedido, orçados à parte.',
      },
    ],
  },
  en: {
    eyebrow: 'our touch',
    cards: [
      {
        img: '/images/diferenciais-filamento.jpg',
        alt: 'Golden filament and Bambu Lab extruder',
        title: 'The Bambu Lab gold standard',
        text: 'We work exclusively with P1S machines. Every filament is hand-picked so your piece gets strength and that flawless finish.',
      },
      {
        img: '/images/diferenciais-envio.jpg',
        alt: '3D printed pieces hand-packed in a box',
        title: 'Shipped from us to you',
        text: 'Careful, secure packaging. We dispatch via registered CTT mail, with tracking, so it arrives spotless anywhere in the country.',
      },
      {
        img: '/images/diferenciais-acabamento.jpg',
        alt: '3D printed piece sanded and hand-painted on a finishing bench',
        title: 'Not just "pressing a button"',
        text: "Every piece is hand-checked and cleaned before it ships — no loose ends. Want special finishing, like sanding, painting or assembly? We do it on request, quoted separately.",
      },
    ],
  },
} as const;

export default function Diferenciais() {
  const { lang } = useLang();
  const t = L[lang];

  return (
    <section className="section" id="diferenciais">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow--hand" style={{ color: 'var(--blue)' }}>{t.eyebrow}</span>
          {lang === 'pt' ? (
            <h2 className="text-3xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">O cuidado artesanal que as <span className="text-orange-600">máquinas</span> não têm.</h2>
          ) : (
            <h2 className="text-3xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">The handcrafted care <span className="text-orange-600">machines</span> don&apos;t have.</h2>
          )}
        </div>

        {/* Mobile: carrossel horizontal com snap (a pilha vertical media
            1839px — quase 2 ecrãs antes de chegar a mais nada). Desktop: a
            grelha de 3 colunas de sempre. */}
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0">
          {t.cards.map((card, i) => (
            <article key={card.title} className="card reveal p-6 md:p-8 flex flex-col gap-4 w-[82vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none" style={i > 0 ? { transitionDelay: `${i * 0.1}s` } : undefined}>
              <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-sm">
                <Image src={card.img} alt={card.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">{card.title}</h3>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
