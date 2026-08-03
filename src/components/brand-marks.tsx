/**
 * Marcas de terceiros (símbolo + nome) nas cores oficiais, para selos de
 * confiança. Partilhado pelo footer (TrustBadges) e pelo carrinho.
 */

/** Stripe — símbolo oficial + nome, na cor de marca #635BFF. */
export function StripeMark() {
  return (
    <span className="inline-flex items-center gap-1 font-bold" style={{ color: '#635BFF' }}>
      <svg viewBox="0 0 24 24" width="13" height="13" fill="#635BFF" aria-hidden="true">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305z" />
      </svg>
      Stripe
    </span>
  );
}

/** Visa — wordmark simples na cor de marca. */
export function VisaMark() {
  return (
    <span
      aria-label="Visa"
      className="text-[13px] font-bold italic leading-none tracking-tight"
      style={{ color: '#1434CB', fontFamily: 'Arial, sans-serif' }}
    >
      VISA
    </span>
  );
}

/** Mastercard — dois círculos oficiais. */
export function MastercardMark() {
  return (
    <svg viewBox="0 0 32 20" width="26" height="16" aria-label="Mastercard">
      <circle cx="13" cy="10" r="7" fill="#EB001B" />
      <circle cx="19" cy="10" r="7" fill="#F79E1B" />
      <path d="M16 4.6a7 7 0 0 0 0 10.8 7 7 0 0 0 0-10.8z" fill="#FF5F00" />
    </svg>
  );
}

/** Google — logo "G" oficial a 4 cores. */
export function GoogleMark({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className="shrink-0">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

/** MB WAY — método de pagamento móvel português (badge de texto na cor da marca). */
export function MBWayMark() {
  return (
    <span
      aria-label="MB WAY"
      className="inline-flex items-center rounded-[4px] px-1.5 py-[3px] text-[10px] font-extrabold uppercase leading-none tracking-tight text-white"
      style={{ background: '#e30613' }}
    >
      MB&nbsp;WAY
    </span>
  );
}

/** Bambu Lab — glifo + nome, na cor de marca verde. */
export function BambuMark() {
  return (
    <span className="inline-flex items-center gap-1 font-bold" style={{ color: '#00AE42' }}>
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#00AE42" strokeWidth="2.4" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M8 8h8v8H8z" fill="#00AE42" stroke="none" />
      </svg>
      Bambu Lab
    </span>
  );
}
