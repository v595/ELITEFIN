import { siteConfig } from "../config/siteConfig";

export function getWhatsAppLink(customMessage?: string): string {
  const number = siteConfig.whatsapp.replace(/\D/g, "");
  const message = encodeURIComponent(customMessage || siteConfig.whatsappDefaultMessage);
  return `https://wa.me/${number}?text=${message}`;
}
