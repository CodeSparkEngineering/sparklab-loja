'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

const L = {
  pt: {
    back: 'Voltar ao início',
    title: 'Política de Privacidade',
    updated: 'Última atualização: junho de 2026',
    intro: (
      <>
        A <strong>SparkLab</strong> é uma loja de impressão 3D sediada em Portugal. Esta
        política explica que dados recolhemos quando usas o nosso site e como os tratamos,
        de acordo com o Regulamento Geral sobre a Proteção de Dados (RGPD).
      </>
    ),
    s1Title: '1. Dados que recolhemos',
    d1: (
      <>
        <strong>Encomendas:</strong> nome, email, telefone/WhatsApp e morada de entrega, recolhidos no momento da compra.
      </>
    ),
    d2: (
      <>
        <strong>Pagamento:</strong> processado de forma segura pela Stripe. <strong>Nunca</strong> vemos nem guardamos os dados do teu cartão.
      </>
    ),
    d3: (
      <>
        <strong>Contacto:</strong> o conteúdo das mensagens que nos envias (ex.: WhatsApp, formulário de orçamento).
      </>
    ),
    d4: (
      <>
        <strong>Carrinho:</strong> guardado localmente no teu navegador (localStorage) para a tua conveniência.
      </>
    ),
    s2Title: '2. Como usamos os teus dados',
    s2: (
      <>
        Usamos os teus dados apenas para processar e entregar as tuas encomendas, responder
        a pedidos de orçamento e prestar apoio ao cliente. Não enviamos comunicações de
        marketing sem o teu consentimento.
      </>
    ),
    s3Title: '3. Com quem partilhamos',
    s3Intro: 'Só partilhamos o estritamente necessário com parceiros que tornam a compra possível:',
    p1: (
      <>
        <strong>Stripe</strong> — processamento do pagamento.
      </>
    ),
    p2: (
      <>
        <strong>CTT / transportadora</strong> — entrega da encomenda.
      </>
    ),
    s3Outro: 'Não vendemos nem alugamos os teus dados a terceiros.',
    s4Title: '4. Os teus direitos',
    s4: (
      <>
        Tens o direito de aceder, corrigir ou eliminar os teus dados, bem como de retirar
        o consentimento a qualquer momento. Para o fazer, contacta-nos pelo WhatsApp.
      </>
    ),
    s5Title: '5. Contacto',
    contactText: 'Para qualquer questão sobre privacidade, fala connosco pelo',
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
    title: 'Privacy Policy',
    updated: 'Last updated: June 2026',
    intro: (
      <>
        <strong>SparkLab</strong> is a 3D printing shop based in Portugal. This policy
        explains what data we collect when you use our website and how we handle it, in
        accordance with the General Data Protection Regulation (GDPR).
      </>
    ),
    s1Title: '1. Data we collect',
    d1: (
      <>
        <strong>Orders:</strong> name, email, phone/WhatsApp number and delivery address, collected when you place an order.
      </>
    ),
    d2: (
      <>
        <strong>Payment:</strong> handled securely by Stripe. We <strong>never</strong> see or store your card details.
      </>
    ),
    d3: (
      <>
        <strong>Contact:</strong> the content of the messages you send us (e.g. WhatsApp, quote request form).
      </>
    ),
    d4: (
      <>
        <strong>Cart:</strong> stored locally in your browser (localStorage) for your convenience.
      </>
    ),
    s2Title: '2. How we use your data',
    s2: (
      <>
        We use your data solely to process and deliver your orders, respond to quote
        requests and provide customer support. We do not send marketing communications
        without your consent.
      </>
    ),
    s3Title: '3. Who we share it with',
    s3Intro: 'We share only what is strictly necessary with the partners that make your purchase possible:',
    p1: (
      <>
        <strong>Stripe</strong> — payment processing.
      </>
    ),
    p2: (
      <>
        <strong>CTT / carrier</strong> — order delivery.
      </>
    ),
    s3Outro: 'We do not sell or rent your data to third parties.',
    s4Title: '4. Your rights',
    s4: (
      <>
        You have the right to access, correct or delete your data, and to withdraw your
        consent at any time. To exercise these rights, contact us on WhatsApp.
      </>
    ),
    s5Title: '5. Contact',
    contactText: 'For any privacy-related questions, message us on',
    contactLink: 'WhatsApp (+351 916 853 802)',
    disclaimer: (
      <>
        This document is an informative summary. We recommend reviewing it with a
        professional before operating with real payments.
      </>
    ),
  },
} as const;

export default function PrivacidadeContent() {
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
          <ul className="list-disc pl-6 space-y-1">
            <li>{t.d1}</li>
            <li>{t.d2}</li>
            <li>{t.d3}</li>
            <li>{t.d4}</li>
          </ul>

          <h2 className="text-xl font-semibold text-stone-900 mt-8">{t.s2Title}</h2>
          <p>{t.s2}</p>

          <h2 className="text-xl font-semibold text-stone-900 mt-8">{t.s3Title}</h2>
          <p>{t.s3Intro}</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>{t.p1}</li>
            <li>{t.p2}</li>
          </ul>
          <p>{t.s3Outro}</p>

          <h2 className="text-xl font-semibold text-stone-900 mt-8">{t.s4Title}</h2>
          <p>{t.s4}</p>

          <h2 className="text-xl font-semibold text-stone-900 mt-8">{t.s5Title}</h2>
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
