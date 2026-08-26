'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';
import { CONTACT_EMAIL } from '@/data/site';

/**
 * Política de Privacidade — alinhada com o RGPD e com o que o site FAZ hoje:
 * Stripe (pagamentos), Resend (emails), Vercel (alojamento + Blob para os
 * ficheiros 3D do orçamento), Google Analytics 4 e Google Ads (ambos atrás
 * do banner de consentimento / Consent Mode v2).
 *
 * TODO (Israel): quando tiveres a denominação legal + NIF, acrescenta-os
 * na secção "Responsável pelo tratamento". (Email já incluído.)
 */

const STORAGE_KEY = 'sparklab-consent';

function ResetCookiesButton({ label }: { label: string }) {
  const reset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* indisponível — nada a limpar */
    }
    // Recarrega: o consent default volta a "denied" e o banner reaparece.
    window.location.reload();
  };
  return (
    <button type="button" onClick={reset} className="btn btn--ghost btn--sm">
      🍪 {label}
    </button>
  );
}

const L = {
  pt: {
    back: 'Voltar ao início',
    title: 'Política de Privacidade',
    updated: 'Última atualização: julho de 2026',
    intro: (
      <>
        A <strong>SparkLab</strong> é uma loja de impressão 3D sediada em Sangalhos, Portugal,
        e é a responsável pelo tratamento dos dados descritos nesta política, de acordo com o
        Regulamento Geral sobre a Proteção de Dados (RGPD). Contacto:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-orange-600 dark:text-orange-400 hover:underline">{CONTACT_EMAIL}</a>.
      </>
    ),
    s1Title: '1. Dados que recolhemos',
    s1: [
      <><strong>Encomendas:</strong> nome, email, telefone/WhatsApp e morada de entrega, recolhidos no momento da compra.</>,
      <><strong>Pagamento:</strong> processado de forma segura pela Stripe. <strong>Nunca</strong> vemos nem guardamos os dados do teu cartão.</>,
      <><strong>Pedidos de orçamento:</strong> nome, contacto, descrição da peça e, se o enviares, o teu ficheiro 3D (guardado no nosso armazenamento seguro).</>,
      <><strong>Contacto:</strong> o conteúdo das mensagens que nos envias (ex.: WhatsApp).</>,
      <><strong>Carrinho e preferências:</strong> guardados localmente no teu navegador (localStorage) — não saem do teu dispositivo.</>,
      <><strong>Navegação:</strong> estatísticas de utilização via Google Analytics, <em>apenas</em> se aceitares os cookies (ver secção 3).</>,
    ],
    s2Title: '2. Porque podemos tratar estes dados (bases legais)',
    s2: [
      <><strong>Execução de contrato</strong> — processar, produzir e entregar a tua encomenda ou orçamento.</>,
      <><strong>Obrigação legal</strong> — faturação e registos fiscais.</>,
      <><strong>Consentimento</strong> — cookies de análise e publicidade (podes retirá-lo a qualquer momento, ver abaixo).</>,
      <><strong>Interesse legítimo</strong> — segurança do site e prevenção de fraude.</>,
    ],
    s3Title: '3. Cookies',
    s3a: (
      <>
        <strong>Essenciais (sem cookies de rastreio):</strong> o carrinho, o idioma e a tua
        escolha de consentimento vivem no localStorage do teu navegador. São necessários ao
        funcionamento do site e não te seguem pela internet.
      </>
    ),
    s3b: (
      <>
        <strong>Análise e publicidade (só com o teu consentimento):</strong> usamos o Google
        Analytics 4 (cookies <code>_ga*</code>) para perceber como o site é usado e, quando
        ativas campanhas, a medição de conversões do Google Ads. Por omissão estão{' '}
        <strong>desativados</strong>; só são ligados se carregares em “Aceitar” no aviso de
        cookies (Google Consent Mode v2).
      </>
    ),
    s3c: 'Podes mudar de ideias a qualquer momento:',
    s3btn: 'Alterar preferências de cookies',
    s4Title: '4. Com quem partilhamos',
    s4Intro: 'Só partilhamos o estritamente necessário com prestadores que tornam o serviço possível (subcontratantes):',
    s4: [
      <><strong>Stripe</strong> — processamento de pagamentos.</>,
      <><strong>CTT / transportadora</strong> — entrega das encomendas.</>,
      <><strong>Resend</strong> — envio de emails transacionais (confirmação de encomenda).</>,
      <><strong>Vercel</strong> — alojamento do site e armazenamento dos ficheiros 3D que envias no orçamento.</>,
      <><strong>Google</strong> — estatísticas (Analytics) e medição de anúncios (Ads), apenas com o teu consentimento. Nas páginas dos guias carregamos ainda um botão do Google (&ldquo;fonte preferida&rdquo;) que só é acionado se clicares nele.</>,
    ],
    s4Outro: 'Não vendemos nem alugamos os teus dados a terceiros.',
    s5Title: '5. Transferências internacionais',
    s5: (
      <>
        Alguns destes prestadores (Stripe, Google, Resend, Vercel) podem tratar dados nos
        Estados Unidos. Essas transferências assentam em salvaguardas reconhecidas pela UE,
        como o <em>EU-U.S. Data Privacy Framework</em> e/ou cláusulas contratuais-tipo.
      </>
    ),
    s6Title: '6. Durante quanto tempo guardamos',
    s6: [
      <><strong>Dados de encomenda e faturação:</strong> até 10 anos, por obrigação fiscal.</>,
      <><strong>Ficheiros 3D e mensagens de orçamento:</strong> apenas enquanto necessários para responder e produzir; eliminamos mediante pedido.</>,
      <><strong>Estatísticas (Analytics):</strong> até 14 meses.</>,
    ],
    s7Title: '7. Os teus direitos',
    s7: (
      <>
        Tens o direito de aceder, retificar, apagar, limitar ou opor-te ao tratamento dos
        teus dados, o direito à portabilidade e o de retirar o consentimento a qualquer
        momento. Para os exercer, contacta-nos pelo WhatsApp. Tens ainda o direito de
        apresentar reclamação à autoridade de controlo portuguesa, a{' '}
        <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-orange-600 dark:text-orange-400 hover:underline">
          CNPD (cnpd.pt)
        </a>.
      </>
    ),
    s8Title: '8. Contacto',
    contactText: 'Para qualquer questão sobre privacidade, escreve-nos para',
    contactAfter: 'ou fala connosco pelo',
    contactLink: 'WhatsApp (+351 916 853 802)',
    disclaimer: (
      <>
        Este documento é um resumo informativo e não constitui aconselhamento jurídico.
        Recomendamos a revisão por um profissional.
      </>
    ),
  },
  en: {
    back: 'Back to home',
    title: 'Privacy Policy',
    updated: 'Last updated: July 2026',
    intro: (
      <>
        <strong>SparkLab</strong> is a 3D printing shop based in Sangalhos, Portugal, and is
        the controller of the data described in this policy, in accordance with the General
        Data Protection Regulation (GDPR). Contact:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-orange-600 dark:text-orange-400 hover:underline">{CONTACT_EMAIL}</a>.
      </>
    ),
    s1Title: '1. Data we collect',
    s1: [
      <><strong>Orders:</strong> name, email, phone/WhatsApp number and delivery address, collected when you place an order.</>,
      <><strong>Payment:</strong> handled securely by Stripe. We <strong>never</strong> see or store your card details.</>,
      <><strong>Quote requests:</strong> name, contact, part description and, if you send one, your 3D file (kept in our secure storage).</>,
      <><strong>Contact:</strong> the content of the messages you send us (e.g. WhatsApp).</>,
      <><strong>Cart and preferences:</strong> stored locally in your browser (localStorage) — they never leave your device.</>,
      <><strong>Browsing:</strong> usage statistics via Google Analytics, <em>only</em> if you accept cookies (see section 3).</>,
    ],
    s2Title: '2. Why we may process this data (legal bases)',
    s2: [
      <><strong>Contract performance</strong> — processing, producing and delivering your order or quote.</>,
      <><strong>Legal obligation</strong> — invoicing and tax records.</>,
      <><strong>Consent</strong> — analytics and advertising cookies (withdrawable at any time, see below).</>,
      <><strong>Legitimate interest</strong> — site security and fraud prevention.</>,
    ],
    s3Title: '3. Cookies',
    s3a: (
      <>
        <strong>Essential (no tracking cookies):</strong> your cart, language and consent
        choice live in your browser&apos;s localStorage. They are required for the site to work
        and do not follow you around the internet.
      </>
    ),
    s3b: (
      <>
        <strong>Analytics and advertising (only with your consent):</strong> we use Google
        Analytics 4 (<code>_ga*</code> cookies) to understand how the site is used and, when
        campaigns are active, Google Ads conversion measurement. They are{' '}
        <strong>off by default</strong> and only enabled if you click “Accept” on the cookie
        notice (Google Consent Mode v2).
      </>
    ),
    s3c: 'You can change your mind at any time:',
    s3btn: 'Change cookie preferences',
    s4Title: '4. Who we share it with',
    s4Intro: 'We share only what is strictly necessary with the providers that make the service possible (processors):',
    s4: [
      <><strong>Stripe</strong> — payment processing.</>,
      <><strong>CTT / carrier</strong> — order delivery.</>,
      <><strong>Resend</strong> — transactional emails (order confirmation).</>,
      <><strong>Vercel</strong> — website hosting and storage of the 3D files you upload with a quote.</>,
      <><strong>Google</strong> — statistics (Analytics) and ad measurement (Ads), only with your consent. On the guide pages we also load a Google &ldquo;preferred source&rdquo; button, which only acts if you click it.</>,
    ],
    s4Outro: 'We do not sell or rent your data to third parties.',
    s5Title: '5. International transfers',
    s5: (
      <>
        Some of these providers (Stripe, Google, Resend, Vercel) may process data in the
        United States. Such transfers rely on safeguards recognised by the EU, such as the{' '}
        <em>EU-U.S. Data Privacy Framework</em> and/or standard contractual clauses.
      </>
    ),
    s6Title: '6. How long we keep it',
    s6: [
      <><strong>Order and invoicing data:</strong> up to 10 years, as required by tax law.</>,
      <><strong>3D files and quote messages:</strong> only while needed to reply and produce; deleted on request.</>,
      <><strong>Statistics (Analytics):</strong> up to 14 months.</>,
    ],
    s7Title: '7. Your rights',
    s7: (
      <>
        You have the right to access, rectify, erase, restrict or object to the processing
        of your data, the right to portability and to withdraw consent at any time. To
        exercise them, contact us on WhatsApp. You also have the right to lodge a complaint
        with the Portuguese supervisory authority,{' '}
        <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-orange-600 dark:text-orange-400 hover:underline">
          CNPD (cnpd.pt)
        </a>.
      </>
    ),
    s8Title: '8. Contact',
    contactText: 'For any privacy-related questions, email us at',
    contactAfter: 'or message us on',
    contactLink: 'WhatsApp (+351 916 853 802)',
    disclaimer: (
      <>
        This document is an informative summary and does not constitute legal advice. We
        recommend having it reviewed by a professional.
      </>
    ),
  },
} as const;

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mt-8">{children}</h2>
);

export default function PrivacidadeContent() {
  const { lang } = useLang();
  const t = L[lang];

  return (
    <main className="min-h-screen pt-32 pb-20 bg-[var(--bg)]">
      <div className="container max-w-3xl mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.back}
        </Link>

        <h1 className="h2 mb-2 text-stone-900 dark:text-stone-100">{t.title}</h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-10">{t.updated}</p>

        <div className="prose max-w-none text-stone-600 dark:text-stone-300 leading-relaxed space-y-6">
          <p>{t.intro}</p>

          <H>{t.s1Title}</H>
          <ul className="list-disc pl-6 space-y-1">
            {t.s1.map((item, i) => <li key={i}>{item}</li>)}
          </ul>

          <H>{t.s2Title}</H>
          <ul className="list-disc pl-6 space-y-1">
            {t.s2.map((item, i) => <li key={i}>{item}</li>)}
          </ul>

          <H>{t.s3Title}</H>
          <p>{t.s3a}</p>
          <p>{t.s3b}</p>
          <p>{t.s3c}</p>
          <ResetCookiesButton label={t.s3btn} />

          <H>{t.s4Title}</H>
          <p>{t.s4Intro}</p>
          <ul className="list-disc pl-6 space-y-1">
            {t.s4.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          <p>{t.s4Outro}</p>

          <H>{t.s5Title}</H>
          <p>{t.s5}</p>

          <H>{t.s6Title}</H>
          <ul className="list-disc pl-6 space-y-1">
            {t.s6.map((item, i) => <li key={i}>{item}</li>)}
          </ul>

          <H>{t.s7Title}</H>
          <p>{t.s7}</p>

          <H>{t.s8Title}</H>
          <p>
            {t.contactText}{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-orange-600 dark:text-orange-400 hover:underline">
              {CONTACT_EMAIL}
            </a>{' '}
            {t.contactAfter}{' '}
            <a href="https://wa.me/351916853802" target="_blank" rel="noopener noreferrer" className="text-orange-600 dark:text-orange-400 hover:underline">
              {t.contactLink}
            </a>.
          </p>

          <p className="text-sm text-stone-500 dark:text-zinc-500 mt-10 border-t border-stone-200 dark:border-white/10 pt-6">
            {t.disclaimer}
          </p>

          {lang === 'en' && (
            <p className="text-sm text-stone-500 dark:text-zinc-500 italic">
              This translation is provided for convenience. In case of any discrepancy, the
              Portuguese version prevails.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
