import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "../../utils/whatsapp";

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-0 rounded-full bg-[#25D366] text-white shadow-lift hover:pr-5 transition-all duration-300 overflow-hidden"
      aria-label="Chat with EliteFin on WhatsApp"
    >
      <span className="flex items-center justify-center w-14 h-14 shrink-0">
        <MessageCircle size={28} fill="white" className="text-[#25D366]" />
      </span>
      <span className="max-w-0 group-hover:max-w-xs overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300">
        Chat with EliteFin
      </span>
    </a>
  );
}
