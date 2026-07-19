'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/i18n/LanguageContext';

const L = {
  pt: {
    cancel:
      'Pagamento cancelado — o teu carrinho continua guardado. 🧡 Podes tentar de novo quando quiseres.',
    dismiss: 'Fechar aviso',
  },
  en: {
    cancel:
      'Payment canceled — your cart is still saved. 🧡 You can try again whenever you like.',
    dismiss: 'Dismiss notice',
  },
} as const;

/**
 * Aviso simpático quando o cliente cancela o pagamento na Stripe (volta com
 * ?checkout=cancelado). Sem isto, aterrava na homepage sem qualquer mensagem.
 * Lê o parâmetro só no cliente, limpa-o do URL e auto-fecha.
 */
export default function CheckoutNotice() {
  const { lang } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout') !== 'cancelado') return;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- só após o mount (lê o URL client-side)
    setShow(true);

    // Remove o parâmetro do URL sem recarregar (para não reaparecer no refresh).
    params.delete('checkout');
    const qs = params.toString();
    window.history.replaceState(
      null,
      '',
      window.location.pathname + (qs ? `?${qs}` : '') + window.location.hash
    );

    const timer = setTimeout(() => setShow(false), 9000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      role="status"
      className="fixed z-[95] left-1/2 -translate-x-1/2 bottom-[calc(1rem+env(safe-area-inset-bottom))]
        w-[min(92vw,440px)] flex items-start gap-3 rounded-2xl border border-stone-200 dark:border-white/10
        bg-white dark:bg-stone-900 shadow-lg px-4 py-3.5"
    >
      <span className="text-sm text-stone-700 dark:text-stone-200 leading-snug flex-1">
        {L[lang].cancel}
      </span>
      <button
        type="button"
        onClick={() => setShow(false)}
        aria-label={L[lang].dismiss}
        className="shrink-0 -mr-1 -mt-0.5 text-xl leading-none text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
      >
        ×
      </button>
    </div>
  );
}
