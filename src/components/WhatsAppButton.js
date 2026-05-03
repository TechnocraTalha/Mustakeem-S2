"use client";

import { WhatsAppIcon } from "./Icons";

export default function WhatsAppButton() {
  return (
    <a aria-label="Contact on WhatsApp" className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform duration-300 flex items-center justify-center" href="https://wa.me/918920784349" target="_blank" rel="noopener noreferrer">
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  );
}
