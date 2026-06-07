export const WHATSAPP_NUMBER = '5511999999999';

export const getWhatsAppLink = (msg: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};
