// GERADO a partir de public/icons/*.svg — não editar à mão.
// Os ícones são embutidos (e não <img src>) de propósito: dentro de um <img>
// o SVG é um documento isolado e o currentColor resolveria a preto, ficando
// invisível no tema escuro. Embutido, herda a cor do texto como deve ser.

export const ICONES = {
  'acabamento': `<path stroke="currentColor" d="M14.5 3.5l6 6L11 19H5v-6l9.5-9.5z"/> <path stroke="#ea580c" d="M12.5 5.5l6 6" stroke-width="1.5"/> <path stroke="currentColor" d="M5 21h14" stroke-width="1.4"/>`,
  'catalogo': `<path stroke="currentColor" d="M4 7l8-4 8 4v10l-8 4-8-4V7z"/> <path stroke="currentColor" d="M4 7l8 4 8-4M12 11v10"/> <path stroke="#ea580c" d="M12 3v4" stroke-width="1.5"/>`,
  'embalagem': `<rect x="4" y="8" width="16" height="12" rx="1.5" stroke="currentColor"/> <path stroke="currentColor" d="M4 12h16M12 8v12" stroke-width="1.4"/> <path stroke="#ea580c" d="M9 5c1-1.8 3-1.8 3 0 0-1.8 2-1.8 3 0l-1.5 3h-3L9 5z" stroke-width="1.4"/>`,
  'empresas': `<path stroke="currentColor" d="M4 21V6l6-3v18M10 21h10V10l-5-2.5"/> <path stroke="currentColor" d="M6.5 8h1M6.5 11.5h1M6.5 15h1M14 13h2.5M14 16.5h2.5" stroke-width="1.4"/> <path stroke="#ea580c" d="M3 21h18" stroke-width="1.5"/>`,
  'envio': `<rect x="3" y="8" width="12" height="9" rx="1.5" stroke="currentColor"/> <path stroke="currentColor" d="M15 11h3.5L21 14v3h-6"/> <circle cx="7.5" cy="18.5" r="1.8" stroke="currentColor"/> <circle cx="17.5" cy="18.5" r="1.8" stroke="currentColor"/> <path stroke="#ea580c" d="M6 5h6M4 8V5" stroke-width="1.5"/>`,
  'filamento': `<circle cx="12" cy="12" r="8" stroke="currentColor"/> <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.4"/> <circle cx="12" cy="12" r="1.5" stroke="#ea580c"/> <path stroke="#ea580c" d="M20 12c0 1.5 1 2 2.2 2" stroke-width="1.5"/>`,
  'impressao': `<path stroke="currentColor" d="M8 3h8v5l-2.5 3h-3L8 8V3z"/> <path stroke="currentColor" d="M10 5.5h4M10 7.5h4" stroke-width="1.4"/> <path stroke="#ea580c" d="M12 11v3"/> <path stroke="#ea580c" d="M12 17l-1.8 1.2M12 17l1.8 1.2M12 17v2.6M10 20.8h4" stroke-width="1.5"/>`,
  'modelacao': `<path stroke="currentColor" d="M12 4l6.5 3.75v7.5L12 19l-6.5-3.75v-7.5L12 4z"/> <path stroke="currentColor" d="M5.5 7.75L12 11.5l6.5-3.75M12 11.5V19" stroke-width="1.4"/> <circle cx="12" cy="4" r="1.6" fill="#ea580c" stroke="none"/> <circle cx="18.5" cy="15.5" r="1.6" fill="#ea580c" stroke="none"/> <circle cx="5.5" cy="15.5" r="1.6" fill="#ea580c" stroke="none"/>`,
  'orcamento': `<rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor"/> <path stroke="currentColor" d="M9 8h6M9 12h6" stroke-width="1.5"/> <path stroke="#ea580c" d="M13.5 15.2c-.4-.5-1-.8-1.7-.8-1.1 0-2 .8-2 1.8s.9 1.8 2 1.8c.7 0 1.3-.3 1.7-.8M8.8 16.4h3.4" stroke-width="1.4"/>`,
  'pagamento': `<path stroke="currentColor" d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"/> <path stroke="#ea580c" d="M9 12l2 2 4-4" stroke-width="1.6"/>`,
  'portugal': `<path stroke="currentColor" d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/> <path stroke="#ea580c" d="M12 7.2l1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.2-2.4 1.2.5-2.6-1.9-1.8 2.6-.4L12 7.2z" stroke-width="1.3"/>`,
  'prazo': `<circle cx="12" cy="13" r="8" stroke="currentColor"/> <path stroke="currentColor" d="M9 2.5h6" stroke-width="1.5"/> <path stroke="#ea580c" d="M12 9v4.5l3 1.8" stroke-width="1.6"/>`,
  'qualidade': `<path stroke="currentColor" d="M12 3.5l2.5 5.1 5.6.8-4 3.9.9 5.6L12 16.3 7 18.9l.9-5.6-4-3.9 5.6-.8L12 3.5z"/> <circle cx="12" cy="11.5" r="1.4" fill="#ea580c" stroke="none"/>`,
  'reparacao': `<path stroke="currentColor" d="M14.5 6.5a4 4 0 0 1 5-1l-3 3 .7 2.3 2.3.7 3-3a4 4 0 0 1-5.5 5L9.5 21a2 2 0 0 1-3-3l7.5-7.5a4 4 0 0 1 .5-4z" transform="scale(0.92) translate(1,1)"/> <circle cx="7.5" cy="19.2" r="0.8" fill="#ea580c" stroke="none"/>`,
  'stl': `<path stroke="currentColor" d="M7 3h7l4 4v14H7V3z"/> <path stroke="currentColor" d="M14 3v4h4" stroke-width="1.4"/> <path stroke="#ea580c" d="M12 10l3 1.7v3.6L12 17l-3-1.7v-3.6L12 10z" stroke-width="1.4"/>`,
  'whatsapp': `<path stroke="currentColor" d="M12 4a8 8 0 0 1 6.9 12l.9 3.6-3.7-.9A8 8 0 1 1 12 4z"/> <path stroke="#ea580c" d="M9.3 9.6c.2-.6.9-.7 1.3-.2l.7.9c.2.3.2.7-.1 1l-.5.5c.5 1 1.4 1.9 2.5 2.4l.5-.5c.3-.3.7-.3 1-.1l.9.7c.5.4.4 1.1-.2 1.3-2.9 1.2-7.3-3.1-6.1-6z" stroke-width="1.4"/>`,
} as const;

export type NomeIcone = keyof typeof ICONES;
