export const WHATSAPP_NUMBER = '351913323056';

/** Número como se lê em Portugal: "913 323 056" (derivado do de cima). */
export const WHATSAPP_DISPLAY = WHATSAPP_NUMBER.slice(3).replace(/(\d{3})(?=\d)/g, '$1 ');

export const getWhatsAppLink = (msg: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};
