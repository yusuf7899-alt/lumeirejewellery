"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, MessageCircle } from "lucide-react";

export default function LuxuryFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#050505] text-ivory/60 pt-20 pb-12 px-6 md:px-12 border-t border-champagne/15 text-xs">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-champagne/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/branding/lumeire_jewellery_logo.svg"
                  alt="Lumeire Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-2xl text-ivory tracking-ultra-wide block">
                  LUMEIRE
                </span>
                <span className="text-[9px] uppercase tracking-luxury text-champagne block">
                  Haute Joaillerie · Dubai
                </span>
              </div>
            </div>
            <p className="max-w-sm text-ivory/50 font-light leading-relaxed">
              Architectural solid gold jewellery and bespoke commissions handcrafted in Dubai, UAE for international collectors.
            </p>
          </div>

          {/* Creations Links */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[10px] uppercase tracking-luxury text-champagne font-medium block">
              Creations
            </span>
            <ul className="space-y-2.5 font-light">
              <li>
                <Link href="/jewellery/lumeire-screw-bangle" className="hover:text-champagne transition-colors">
                  The Screw Bangle
                </Link>
              </li>
              <li>
                <Link href="/jewellery/precision-open-cuff" className="hover:text-champagne transition-colors">
                  Open Cuff & Screwdriver
                </Link>
              </li>
              <li>
                <Link href="/jewellery/nail-diamond-cuff" className="hover:text-champagne transition-colors">
                  Nail Diamond Cuff
                </Link>
              </li>
              <li>
                <Link href="/jewellery/floral-motif-high-jewellery-necklace" className="hover:text-champagne transition-colors">
                  Floral Motif Necklace
                </Link>
              </li>
              <li>
                <Link href="/jewellery/lumeire-open-bangle" className="hover:text-champagne transition-colors">
                  The Open Bangle
                </Link>
              </li>
              <li>
                <Link href="/jewellery/lumeire-signature-link-bracelet" className="hover:text-champagne transition-colors">
                  Signature Link Bracelet
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier & Connect */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[10px] uppercase tracking-luxury text-champagne font-medium block">
              Private Concierge
            </span>
            <p className="text-ivory/70 font-light">
              Direct Inquiries: <a href="tel:+971552315658" className="hover:text-champagne">+971 55 231 5658</a>
            </p>
            <p className="text-ivory/70 font-light">
              Location: Downtown Dubai, UAE
            </p>
            <div className="pt-2 flex items-center space-x-4">
              <a
                href="https://wa.me/971552315658"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-champagne/30 flex items-center justify-center text-champagne hover:bg-champagne hover:text-obsidian transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-champagne/30 flex items-center justify-center text-champagne hover:bg-champagne hover:text-obsidian transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-ivory/40 tracking-luxury uppercase">
          <div>
            © {new Date().getFullYear()} Lumeire Jewellery Dubai. All rights reserved.
          </div>
          <div className="flex items-center space-x-8 mt-4 sm:mt-0">
            <Link href="/admin" className="hover:text-champagne transition-colors">
              Owner Management
            </Link>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 hover:text-champagne transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
