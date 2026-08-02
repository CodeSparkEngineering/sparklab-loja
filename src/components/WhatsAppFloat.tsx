'use client';

import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { getWhatsAppLink } from '@/utils/whatsapp';
import { useLang } from '@/i18n/LanguageContext';

/**
 * Botões flutuantes de contacto, sempre visíveis:
 *  - WhatsApp no canto inferior ESQUERDO — com 86% do tráfego em telemóvel, é
 *    dos contactos de maior conversão.
 *  - Telefone (clique-para-ligar, tel:) no canto inferior DIREITO — gémeo do
 *    WhatsApp mas em azul.
 * Ficam em z-95: por baixo do header (100) e do carrinho (200). O botão
 * "voltar ao topo" (BackToTop) empilha-se ACIMA do telefone, à direita, para
 * não colidir (ver o bottom elevado lá).
 */
const L = {
  pt: {
    waAria: 'Falar connosco no WhatsApp',
    waMsg: 'Olá! Gostaria de saber mais sobre uma impressão 3D.',
    callAria: 'Ligar para a SparkLab',
  },
  en: {
    waAria: 'Chat with us on WhatsApp',
    waMsg: "Hello! I'd like to know more about a 3D print.",
    callAria: 'Call SparkLab',
  },
} as const;

export default function WhatsAppFloat() {
  const { lang } = useLang();
  const t = L[lang];

  return (
    <>
      <a
        href={getWhatsAppLink(t.waMsg)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.waAria}
        title={t.waAria}
        className="fixed z-[95] left-4 sm:left-6 bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-6
          grid place-items-center w-14 h-14 rounded-full
          bg-[#25D366] text-white shadow-lg shadow-black/20
          hover:bg-[#1fbd5a] hover:-translate-y-0.5
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2
          transition-all duration-300"
      >
        <WhatsAppIcon size={28} />
      </a>

      <a
        href="tel:+351916853802"
        aria-label={t.callAria}
        title={t.callAria}
        className="fixed z-[95] right-4 sm:right-6 bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-6
          grid place-items-center w-14 h-14 rounded-full
          bg-[#2563eb] text-white shadow-lg shadow-black/20
          hover:bg-[#1d4ed8] hover:-translate-y-0.5
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2
          transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
          <path d="M6.62 10.79a15.53 15.53 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.56 1 1 0 01-.24 1.02l-2.2 2.21z" />
        </svg>
      </a>
    </>
  );
}
