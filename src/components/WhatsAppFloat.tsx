'use client';

import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { getWhatsAppLink } from '@/utils/whatsapp';
import { useLang } from '@/i18n/LanguageContext';

/**
 * Botão flutuante de WhatsApp, sempre visível (canto inferior esquerdo, para
 * não colidir com o "voltar ao topo" que está à direita). Com 86% do tráfego
 * em telemóvel, é dos contactos de maior conversão. z-95: por baixo do header
 * (100) e do carrinho (200).
 */
const L = {
  pt: { aria: 'Falar connosco no WhatsApp', msg: 'Olá! Gostaria de saber mais sobre uma impressão 3D.' },
  en: { aria: 'Chat with us on WhatsApp', msg: "Hello! I'd like to know more about a 3D print." },
} as const;

export default function WhatsAppFloat() {
  const { lang } = useLang();
  const t = L[lang];

  return (
    <a
      href={getWhatsAppLink(t.msg)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.aria}
      title={t.aria}
      className="fixed z-[95] left-4 sm:left-6 bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-6
        grid place-items-center w-14 h-14 rounded-full
        bg-[#25D366] text-white shadow-lg shadow-black/20
        hover:bg-[#1fbd5a] hover:-translate-y-0.5
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2
        transition-all duration-300"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
