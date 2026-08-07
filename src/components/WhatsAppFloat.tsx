import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloat: React.FC = () => {
  const WHATSAPP_NUMBER = '917028616607';
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hi Parivar Furniture, I would like to inquire about solid wood furniture.'
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Support"
      className="fixed right-4 bottom-20 sm:bottom-6 z-40 w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-white stroke-none" />
    </a>
  );
};
