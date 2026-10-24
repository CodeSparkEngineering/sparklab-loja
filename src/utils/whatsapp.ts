export const WHATSAPP_NUMBER = '351913323056';

export const getWhatsAppLink = (msg: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};
