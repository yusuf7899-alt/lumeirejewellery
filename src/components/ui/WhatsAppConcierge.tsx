"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppConcierge() {
  const [openCard, setOpenCard] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Luxury notification popover */}
      {openCard && (
        <div className="mb-3 w-72 bg-obsidian-deep/95 border border-champagne/30 p-4 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.9)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] uppercase tracking-luxury text-champagne font-medium">
                Atelier Concierge
              </span>
            </div>
            <button
              onClick={() => setOpenCard(false)}
              className="text-ivory/50 hover:text-ivory p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-ivory/80 mt-2 font-light leading-relaxed">
            Connect with our jewellery specialists in Dubai for custom commissions and private viewings.
          </p>
          <a
            href="https://wa.me/971552315658?text=Hello%20Lumeire%20Jewellery%2C%20I%20would%20like%20to%20enquire%20about%20your%20creations."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-center w-full bg-champagne hover:bg-champagne-light text-obsidian text-[11px] font-medium tracking-luxury uppercase py-2 rounded-lg transition-colors shadow-lg"
          >
            Start WhatsApp Chat
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setOpenCard(!openCard)}
        aria-label="Open Lumeire Concierge"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-obsidian-deep border border-champagne/40 text-champagne hover:border-champagne hover:scale-105 transition-all duration-300 shadow-[0_4px_25px_rgba(199,183,125,0.25)]"
      >
        <span className="absolute inset-0 rounded-full border border-champagne/20 animate-ping opacity-30" />
        <MessageCircle className="w-6 h-6 text-champagne transition-transform group-hover:scale-110" />
      </button>
    </div>
  );
}
