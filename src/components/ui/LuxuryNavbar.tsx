"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function LuxuryNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          scrolled
            ? "bg-obsidian/85 backdrop-blur-md border-b border-champagne/15 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-gradient-to-b from-obsidian/70 to-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Navigation links */}
          <nav className="hidden md:flex items-center space-x-10 text-[11px] uppercase tracking-luxury text-ivory/80 font-medium">
            <Link
              href="#scenes"
              className="hover:text-champagne transition-colors duration-300 relative group py-1"
            >
              Creations
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-champagne transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="#collections"
              className="hover:text-champagne transition-colors duration-300 relative group py-1"
            >
              Collections
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-champagne transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="#heritage"
              className="hover:text-champagne transition-colors duration-300 relative group py-1"
            >
              Maison
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-champagne transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* Center: Brand identity */}
          <Link
            href="/"
            className="flex flex-col items-center group cursor-pointer focus:outline-none"
          >
            <span className="font-serif text-2xl md:text-3xl tracking-ultra-wide font-normal text-ivory group-hover:text-champagne-light transition-colors duration-500">
              LUMEIRE
            </span>
            <span className="text-[8px] uppercase tracking-luxury-wide text-champagne/90 -mt-1 font-sans">
              Haute Joaillerie · Dubai
            </span>
          </Link>

          {/* Right: Concierge CTA & Menu button */}
          <div className="flex items-center space-x-6">
            <a
              href="https://wa.me/971552315658?text=Hello%20Lumeire%20Jewellery%2C%20I%20would%20like%20to%20request%20a%20private%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center space-x-2 text-[10px] uppercase tracking-luxury border border-champagne/30 px-4 py-2 rounded-full hover:bg-champagne/10 hover:border-champagne text-champagne-light transition-all duration-500"
            >
              <span>Private Concierge</span>
              <ArrowUpRight className="w-3 h-3 text-champagne" />
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
              className="p-2 text-ivory hover:text-champagne transition-colors duration-300 focus:outline-none"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Luxury Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-obsidian-deep/98 backdrop-blur-2xl transition-all duration-700 flex flex-col justify-between p-8 md:p-16 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-6xl mx-auto w-full pt-20 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-ultra-wide text-champagne/70 block">
                Index of Creations
              </span>
              <ul className="space-y-4">
                {[
                  { name: "The Screw Bangle Edition", href: "#screw-bangle" },
                  { name: "The Open Cuff & Screwdriver", href: "#open-cuff" },
                  { name: "Nail Diamond Cuff", href: "#nail-cuff" },
                  { name: "Floral Motif High Jewellery", href: "#floral-necklace" },
                  { name: "Curated Masterpieces", href: "#collections" },
                  { name: "The Dubai Atelier", href: "#heritage" },
                ].map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-serif text-2xl md:text-4xl text-ivory/80 hover:text-champagne transition-all duration-300 inline-block hover:translate-x-3"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-champagne/20 pt-8 md:pt-0 md:pl-16 space-y-8">
              <div>
                <h4 className="text-[11px] uppercase tracking-luxury text-champagne mb-2">
                  Dubai Private Atelier
                </h4>
                <p className="text-sm text-ivory/60 leading-relaxed font-light">
                  Bespoke appointments and haute joaillerie viewings available upon confidential request.
                </p>
              </div>

              <div>
                <h4 className="text-[11px] uppercase tracking-luxury text-champagne mb-2">
                  VIP Direct Contact
                </h4>
                <a
                  href="tel:+971552315658"
                  className="text-lg text-ivory hover:text-champagne block transition-colors"
                >
                  +971 55 231 5658
                </a>
                <a
                  href="https://wa.me/971552315658"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-champagne/90 hover:underline mt-1 inline-block"
                >
                  Chat with a Jewellery Concierge on WhatsApp
                </a>
              </div>

              <div className="pt-4 flex items-center space-x-6 text-xs text-ivory/40 uppercase tracking-widest">
                <Link
                  href="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-champagne transition-colors"
                >
                  Owner Access
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto w-full pt-8 border-t border-champagne/10 flex flex-col md:flex-row justify-between items-center text-[10px] text-ivory/40 tracking-luxury uppercase">
          <span>© {new Date().getFullYear()} Lumeire Jewellery — Dubai, UAE</span>
          <span className="mt-2 md:mt-0">All GLB 3D Creations Certified Genuine</span>
        </div>
      </div>
    </>
  );
}
