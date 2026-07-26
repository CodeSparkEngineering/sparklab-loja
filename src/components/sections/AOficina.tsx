'use client';

import Image from 'next/image';
import { useLang } from '@/i18n/LanguageContext';
import { GoogleMark } from '@/components/brand-marks';
import { GOOGLE_SKILLS_URL } from '@/data/site';

const L = {
  pt: {
    altIsrael: 'Israel Vieira, co-fundador da SparkLab',
    roleIsrael: 'Co-fundador · Dev',
    certLabel: 'Certificado Google',
    certTitle: 'Ver perfil público de certificações Google Cloud',
    altPamela: 'Pamela Falk, co-fundadora da SparkLab',
    rolePamela: 'Co-fundadora · 3D Maker',
    caption: 'Produção local e feita à mão, aqui em Portugal',
    title: 'Por trás das máquinas.',
    p1: 'Esquece as fábricas gigantes e os produtos feitos em massa na China. A SparkLab é, na sua essência, uma pequena oficina sediada em Portugal, nascida da paixão pura pela impressão 3D e pela criação.',
    p2: 'Cada peça que sai daqui não é apenas "impressa". É desenhada, preparada camada a camada com as configurações ideais, impressa nas nossas Bambu Lab P1S, limpa, embalada à mão e levada aos correios com todo o cuidado.',
    p3: 'Quando nos pedes um orçamento ou compras no catálogo, estás a falar diretamente com quem vai operar a máquina. Sem intermediários, sem respostas robóticas. Apenas nós, as impressoras, e as tuas ideias a ganharem forma no mundo real.',
    facts: [
      { k: 'Equipamento Utilizado', v: 'Impressoras Bambu Lab P1S com câmara fechada' },
      { k: 'Materiais de Impressão', v: 'PLA, PETG, ABS, ASA, TPU e PC' },
      { k: 'Volume Único de Impressão', v: 'Até 256 × 256 × 256 mm' },
      { k: 'Área de Atendimento', v: 'Produção local com envio para Portugal Continental e Ilhas' },
    ],
  },
  en: {
    altIsrael: 'Israel Vieira, SparkLab co-founder',
    roleIsrael: 'Co-founder · Dev',
    certLabel: 'Google certified',
    certTitle: 'View public Google Cloud certifications profile',
    altPamela: 'Pamela Falk, SparkLab co-founder',
    rolePamela: 'Co-founder · 3D Maker',
    caption: 'Local production, handmade here in Portugal',
    title: 'Behind the machines.',
    p1: "Forget giant factories and mass-produced goods from China. SparkLab is, at its heart, a small workshop based in Portugal, born from a pure passion for 3D printing and making things.",
    p2: `Every piece that leaves here isn't just "printed". It's designed, prepared layer by layer with the ideal settings, printed on our Bambu Lab P1S printers, cleaned, hand-packed and taken to the post office with the utmost care.`,
    p3: "When you ask us for a quote or buy from the catalog, you're talking directly to the person who runs the machine. No middlemen, no robotic replies. Just us, the printers, and your ideas taking shape in the real world.",
    facts: [
      { k: 'Equipment', v: 'Bambu Lab P1S printers with enclosed chamber' },
      { k: 'Printing Materials', v: 'PLA, PETG, ABS, ASA, TPU and PC' },
      { k: 'Single Print Volume', v: 'Up to 256 × 256 × 256 mm' },
      { k: 'Service Area', v: 'Local production shipping to mainland Portugal and the Islands' },
    ],
  },
} as const;

export default function AOficina() {
  const { lang } = useLang();
  const t = L[lang];

  return (
    <section id="a-oficina" className="py-24 bg-stone-50 dark:bg-transparent relative overflow-hidden">
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Coluna da Foto — Israel (a foto da Pamela foi removida "pra já") */}
          <div className="w-full lg:w-1/2">
            <div className="max-w-xs mx-auto">
              {/* Israel */}
              <figure className="bg-white dark:bg-[#1a1816] p-3 pb-4 shadow-2xl rounded-sm border border-stone-100 dark:border-white/5 rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-stone-200 dark:bg-stone-800">
                  <Image src="/images/fundador-israel.jpg" alt={t.altIsrael} fill className="object-cover" sizes="(max-width: 768px) 60vw, 320px" />
                </div>
                <figcaption className="text-center mt-3">
                  <span className="block font-bold text-stone-900 dark:text-stone-100" style={{ fontFamily: 'var(--f-head)' }}>Israel Vieira</span>
                  <span className="block text-xs text-stone-500 dark:text-stone-400">{t.roleIsrael}</span>
                  {/* Perfil público Google Skills — torna a certificação verificável. */}
                  <a
                    href={GOOGLE_SKILLS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t.certTitle}
                    className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                  >
                    <GoogleMark size={12} />
                    {t.certLabel}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </a>
                </figcaption>
              </figure>
            </div>
            <p className="text-center mt-6 text-xl text-stone-600 dark:text-stone-400" style={{ fontFamily: 'var(--f-accent)' }}>
              {t.caption}
            </p>
          </div>

          {/* Coluna do Texto */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-6 tracking-tight" style={{ fontFamily: 'var(--f-head)' }}>
              {t.title}
            </h2>
            <div className="space-y-6 text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
              <p>{t.p3}</p>
            </div>

            {/* Fact sheet estruturado para extração por motores de resposta IA (AEO) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm border-t border-stone-200 dark:border-stone-800 pt-6">
              {t.facts.map((f) => (
                <div key={f.k}>
                  <span className="block font-semibold text-stone-900 dark:text-stone-100">{f.k}</span>
                  <span className="text-stone-500 dark:text-stone-400">{f.v}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
