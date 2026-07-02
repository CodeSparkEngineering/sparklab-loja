'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

const L = {
  pt: {
    back: 'Voltar ao início',
    title: 'Termos e Condições',
    updated: 'Última atualização: junho de 2026',
    intro: (
      <>
        Ao comprar na <strong>SparkLab</strong>, concordas com as condições abaixo. Os
        preços estão em euros (€) e aplicam-se a Portugal.
      </>
    ),
    s1Title: '1. Encomendas e pagamento',
    s1: (
      <>
        Os pagamentos são processados de forma segura pela Stripe. A encomenda é confirmada
        após a aprovação do pagamento. Os produtos podem ser <strong>prontos a enviar</strong> ou
        <strong> sob encomenda</strong> (produzidos após a compra).
      </>
    ),
    s2Title: '2. Envio',
    s2a: 'Entregamos para todo o Portugal, via CTT.',
    s2b: 'Envio grátis em encomendas a partir de 40€; abaixo disso, portes de 4,90€.',
    s2c: 'Os prazos são estimativas e podem variar conforme a produção e a transportadora.',
    s3Title: '3. Peças personalizadas',
    s3: (
      <>
        Peças com personalização (nome, cor ou modelo à medida) são feitas especialmente
        para ti. Por isso, salvo defeito, não estão sujeitas ao direito de livre devolução.
      </>
    ),
    s4Title: '4. Ficheiros STL',
    s4: (
      <>
        A venda de ficheiros STL é feita sob encomenda através do WhatsApp. Os ficheiros são
        licenciados para <strong>uso pessoal</strong>. Não é permitido revender, redistribuir
        nem partilhar o ficheiro com terceiros.
      </>
    ),
    s5Title: '5. Defeitos e trocas',
    s5: (
      <>
        Se a tua peça chegar com defeito, fala connosco pelo WhatsApp até 14 dias após a
        receção e resolvemos — com substituição ou reembolso, conforme o caso.
      </>
    ),
    s6Title: '6. Propriedade intelectual',
    s6: (
      <>
        Os modelos, imagens e conteúdos da SparkLab são propriedade da marca e não podem ser
        reproduzidos sem autorização.
      </>
    ),
    s7Title: '7. Contacto',
    contactText: 'Dúvidas sobre uma encomenda? Fala connosco pelo',
    contactLink: 'WhatsApp (+351 916 853 802)',
    disclaimer: (
      <>
        Este documento é um resumo informativo. Recomendamos rever com um profissional antes
        de operar com pagamentos reais.
      </>
    ),
  },
  en: {
    back: 'Back to home',
    title: 'Terms and Conditions',
    updated: 'Last updated: June 2026',
    intro: (
      <>
        By purchasing from <strong>SparkLab</strong>, you agree to the terms below. All
        prices are in euros (€) and apply to Portugal.
      </>
    ),
    s1Title: '1. Orders and payment',
    s1: (
      <>
        Payments are processed securely by Stripe. Your order is confirmed once payment has
        been approved. Products may be <strong>ready to ship</strong> or
        <strong> made to order</strong> (produced after purchase).
      </>
    ),
    s2Title: '2. Shipping',
    s2a: 'We deliver anywhere in Portugal via CTT.',
    s2b: 'Free shipping on orders of 40€ or more; below that, a 4,90€ shipping fee applies.',
    s2c: 'Delivery times are estimates and may vary depending on production and the carrier.',
    s3Title: '3. Personalised pieces',
    s3: (
      <>
        Personalised pieces (with a name, a specific colour, or a made-to-measure design) are
        made especially for you. For that reason, unless defective, they are not covered by
        the right of free return.
      </>
    ),
    s4Title: '4. STL files',
    s4: (
      <>
        STL files are sold to order via WhatsApp. Files are licensed for{' '}
        <strong>personal use</strong>. Reselling, redistributing, or sharing the file with
        third parties is not permitted.
      </>
    ),
    s5Title: '5. Defects and exchanges',
    s5: (
      <>
        If your piece arrives defective, contact us on WhatsApp within 14 days of delivery
        and we will make it right — with a replacement or a refund, as appropriate.
      </>
    ),
    s6Title: '6. Intellectual property',
    s6: (
      <>
        SparkLab&apos;s models, images, and content are the property of the brand and may not
        be reproduced without permission.
      </>
    ),
    s7Title: '7. Contact',
    contactText: 'Questions about an order? Message us on',
    contactLink: 'WhatsApp (+351 916 853 802)',
    disclaimer: (
      <>
        This document is an informative summary. We recommend reviewing it with a
        professional before operating with real payments.
      </>
    ),
  },
} as const;

export default function TermosContent() {
  const { lang } = useLang();
  const t = L[lang];

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container max-w-3xl mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.back}
        </Link>

        <h1 className="h2 mb-2 text-stone-900">{t.title}</h1>
        <p className="text-sm text-stone-600 mb-10">{t.updated}</p>

        <div className="prose max-w-none text-stone-600 leading-relaxed space-y-6">
          <p>{t.intro}</p>

          <h2 className="text-xl font-semibold text-stone-900 mt-8">{t.s1Title}</h2>
          <p>{t.s1}</p>

          <h2 className="text-xl font-semibold text-stone-900 mt-8">{t.s2Title}</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>{t.s2a}</li>
            <li>{t.s2b}</li>
            <li>{t.s2c}</li>
          </ul>

          <h2 className="text-xl font-semibold text-stone-900 mt-8">{t.s3Title}</h2>
          <p>{t.s3}</p>

          <h2 className="text-xl font-semibold text-stone-900 mt-8">{t.s4Title}</h2>
          <p>{t.s4}</p>

          <h2 className="text-xl font-semibold text-stone-900 mt-8">{t.s5Title}</h2>
          <p>{t.s5}</p>

          <h2 className="text-xl font-semibold text-stone-900 mt-8">{t.s6Title}</h2>
          <p>{t.s6}</p>

          <h2 className="text-xl font-semibold text-stone-900 mt-8">{t.s7Title}</h2>
          <p>
            {t.contactText}{' '}
            <a href="https://wa.me/351916853802" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">
              {t.contactLink}
            </a>.
          </p>

          <p className="text-sm text-zinc-500 mt-10 border-t border-white/10 pt-6">
            {t.disclaimer}
          </p>

          {lang === 'en' && (
            <p className="text-sm text-zinc-500 italic">
              This translation is provided for convenience. In case of any discrepancy, the
              Portuguese version prevails.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
