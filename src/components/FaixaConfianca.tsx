import { ShieldCheck, Truck, MapPin, MessageCircle } from 'lucide-react';

const ITEMS = [
  { icon: ShieldCheck, title: 'Pagamento seguro', desc: 'Cartão via Stripe' },
  { icon: Truck, title: 'Envio CTT registado', desc: 'Para todo o Portugal' },
  { icon: MapPin, title: 'Feito em Portugal', desc: 'Impresso à mão' },
  { icon: MessageCircle, title: 'Apoio direto', desc: 'Resposta rápida no WhatsApp' },
];

export default function FaixaConfianca() {
  return (
    <section className="trust" aria-label="As nossas garantias">
      <div className="container trust__grid">
        {ITEMS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="trust__item">
            <span className="trust__icon" aria-hidden="true">
              <Icon size={22} strokeWidth={1.8} />
            </span>
            <div className="trust__text">
              <strong>{title}</strong>
              <span>{desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
