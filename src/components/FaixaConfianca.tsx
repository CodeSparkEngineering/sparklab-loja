// Marcas reais (logos a cores) em chips brancos — estilo "selo de confiança".

function VisaMark() {
  return (
    <svg viewBox="0 0 48 16" width="38" height="13" role="img" aria-label="Visa">
      <text x="0" y="13" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontStyle="italic" fontSize="16" fill="#1A1F71">VISA</text>
    </svg>
  );
}

function MastercardMark() {
  return (
    <svg viewBox="0 0 36 24" width="30" height="20" role="img" aria-label="Mastercard">
      <circle cx="14" cy="12" r="8" fill="#EB001B" />
      <circle cx="22" cy="12" r="8" fill="#F79E1B" />
      <path d="M18 6.1a8 8 0 0 1 0 11.8 8 8 0 0 1 0-11.8z" fill="#FF5F00" />
    </svg>
  );
}

function CttMark() {
  return (
    <svg viewBox="0 0 44 16" width="36" height="13" role="img" aria-label="CTT">
      <text x="0" y="13" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="15" letterSpacing="0.5" fill="#D6001C">CTT</text>
    </svg>
  );
}

function PortugalFlag() {
  return (
    <svg viewBox="0 0 30 20" width="28" height="19" role="img" aria-label="Bandeira de Portugal">
      <rect width="30" height="20" rx="2.5" fill="#DA291C" />
      <path d="M0 2.5A2.5 2.5 0 0 1 2.5 0H12v20H2.5A2.5 2.5 0 0 1 0 17.5z" fill="#046A38" />
      <circle cx="12" cy="10" r="3.6" fill="#FFE000" stroke="#fff" strokeWidth="0.7" />
      <circle cx="12" cy="10" r="1.7" fill="#003DA5" />
    </svg>
  );
}

function WhatsappMark() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="#25D366" role="img" aria-label="WhatsApp">
      <path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.01c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3zM12 21.7h-.01c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 18.2-5.1c0 5.4-4.4 9.8-9.8 9.8zm5.4-7.3c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-.9-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.2 5 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.5.2-.7.2-1.4.2-1.5 0-.1-.3-.2-.6-.4z" />
    </svg>
  );
}

const ITEMS = [
  { badge: <><VisaMark /><MastercardMark /></>, title: 'Pagamento seguro', desc: 'Visa, Mastercard via Stripe', wide: true },
  { badge: <CttMark />, title: 'Envio CTT registado', desc: 'Para todo o Portugal', wide: false },
  { badge: <PortugalFlag />, title: 'Feito em Portugal', desc: 'Impresso à mão', wide: false },
  { badge: <WhatsappMark />, title: 'Apoio direto', desc: 'Resposta rápida no WhatsApp', wide: false },
];

export default function FaixaConfianca() {
  return (
    <section className="trust" aria-label="As nossas garantias">
      <div className="container trust__grid">
        {ITEMS.map((it) => (
          <div key={it.title} className="trust__item">
            <span className={`trust__badge ${it.wide ? 'trust__badge--wide' : ''}`}>
              {it.badge}
            </span>
            <div className="trust__text">
              <strong>{it.title}</strong>
              <span>{it.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
