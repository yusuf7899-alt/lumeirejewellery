"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [loaded, setLoaded] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Elegant luxury reveal timer
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1400);

    const removeTimer = setTimeout(() => {
      setRemoved(true);
    }, 2400);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-obsidian-deep flex flex-col items-center justify-center transition-all duration-1000 ease-out ${
        loaded ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Glowing aura */}
        <div className="absolute w-48 h-48 rounded-full bg-champagne/10 blur-3xl animate-pulse-subtle pointer-events-none" />

        {/* Lumeire Seal */}
        <div className="relative w-28 h-28 md:w-36 md:h-36 mb-8 transition-transform duration-1000">
          <Image
            src="/branding/lumeire_jewellery_logo.svg"
            alt="Lumeire Jewellery Dubai"
            fill
            priority
            className="object-contain drop-shadow-[0_0_20px_rgba(199,183,125,0.3)]"
          />
        </div>

        {/* Brand Typography */}
        <div className="text-center overflow-hidden">
          <h2 className="font-serif text-xl md:text-2xl tracking-ultra-wide text-ivory uppercase font-light">
            Lumeire
          </h2>
          <p className="text-[9px] uppercase tracking-luxury-wide text-champagne/80 mt-1">
            Dubai · Haute Joaillerie
          </p>
        </div>

        {/* Minimal luxury loading indicator */}
        <div className="w-24 h-[1px] bg-champagne/20 mt-8 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-champagne to-transparent w-full animate-[shimmer_1.6s_infinite]" />
        </div>
      </div>
    </div>
  );
}
