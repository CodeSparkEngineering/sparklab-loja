'use client';

import Link from 'next/link';
import { formatEUR } from '@/data/products';
import { useLang } from '@/i18n/LanguageContext';

const L = {
  pt: {
    okTitle: 'Pagamento confirmado',
    okText: (email: string | null) => (
      <>
        Obrigado pela tua compra. Vamos iniciar a produção da tua encomenda na
        nossa Bambu Lab P1S e enviá-la com embalagem segura, via CTT registado.{' '}
        {email ? <>Enviámos a confirmação para <strong>{email}</strong>.</> : null}
      </>
    ),
    total: 'Total pago:',
    pendingTitle: 'A processar o teu pedido',
    pendingText: 'Se concluíste o pagamento, ele pode levar alguns instantes a confirmar. Qualquer dúvida, fala connosco.',
    backCatalog: 'Voltar ao catálogo',
    home: 'Página inicial',
    nextTitle: 'O que acontece a seguir',
    steps: [
      'Começamos a produzir a tua peça na nossa Bambu Lab P1S.',
      'Avisamos-te no WhatsApp com o prazo e o número de seguimento.',
      'Enviamos via CTT registado para a tua morada, com tracking.',
    ],
    waBtn: 'Falar no WhatsApp',
  },
  en: {
    okTitle: 'Payment confirmed',
    okText: (email: string | null) => (
      <>
        Thank you for your purchase. We&apos;ll start producing your order on our
        Bambu Lab P1S and ship it safely packed via registered CTT mail.{' '}
        {email ? <>We&apos;ve sent a confirmation to <strong>{email}</strong>.</> : null}
      </>
    ),
    total: 'Total paid:',
    pendingTitle: 'Processing your order',
    pendingText: 'If you completed the payment, it may take a few moments to confirm. Any questions, just talk to us.',
    backCatalog: 'Back to catalog',
    home: 'Home page',
    nextTitle: 'What happens next',
    steps: [
      'We start producing your piece on our Bambu Lab P1S.',
      'We keep you posted on WhatsApp with the timeline and tracking number.',
      'We ship via registered CTT mail to your address, with tracking.',
    ],
    waBtn: 'Chat on WhatsApp',
  },
} as const;

export default function SucessoCard({
  paid,
  email,
  total,
}: {
  paid: boolean;
  email: string | null;
  total: number | null;
}) {
  const { lang } = useLang();
  const t = L[lang];
  const wa = 'https://wa.me/351916853802';

  return (
    <div className="order__card">
      <div className={`order__icon ${paid ? 'order__icon--ok' : 'order__icon--pending'}`}>
        {paid ? (
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        )}
      </div>

      {paid ? (
        <>
          <h1 className="order__title">{t.okTitle}</h1>
          <p className="order__text">{t.okText(email)}</p>
          {total !== null && (
            <p className="order__total">
              {t.total} <strong>{formatEUR(total)}</strong>
            </p>
          )}
          <div className="mt-6 w-full max-w-sm mx-auto text-left rounded-2xl border border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-white/5 p-5">
            <h2 className="text-xs font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-3">
              {t.nextTitle}
            </h2>
            <ol className="space-y-2 text-sm text-stone-700 dark:text-stone-300 list-decimal pl-5 marker:text-orange-500 marker:font-bold">
              {t.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
        </>
      ) : (
        <>
          <h1 className="order__title">{t.pendingTitle}</h1>
          <p className="order__text">{t.pendingText}</p>
        </>
      )}

      <div className="order__actions">
        {paid && (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{ background: '#25D366', color: '#fff', borderColor: '#25D366' }}
          >
            {t.waBtn}
          </a>
        )}
        <Link href="/#catalogo" className="btn btn--primary">
          {t.backCatalog}
        </Link>
        <Link href="/" className="btn btn--ghost">
          {t.home}
        </Link>
      </div>
    </div>
  );
}
