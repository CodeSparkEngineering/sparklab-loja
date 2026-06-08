export const WHATSAPP_NUMBER = '351916853802';

export const getWhatsAppLink = (msg: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};
