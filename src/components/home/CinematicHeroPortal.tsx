"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

export default function CinematicHeroPortal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !portalRef.current) return;

    const ctx = gsap.context(() => {
      // Zoom and push into the architectural archway on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1.2,
        },
      });

      tl.to(
        portalRef.current,
        {
          scale: 2.8,
          opacity: 0,
          transformOrigin: "center center",
          ease: "power2.inOut",
        },
        0
      )
        .to(
          titleRef.current,
          {
            scale: 0.85,
            opacity: 0,
            y: -50,
            ease: "power2.in",
          },
          0
        )
        .to(
          subtitleRef.current,
          {
            opacity: 0,
            y: -30,
            ease: "power2.in",
          },
          0
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#F7F4EE] text-charcoal overflow-hidden flex flex-col items-center justify-between py-16 px-6 z-10"
    >
      {/* Subtle ambient lighting vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#F7F4EE]/50 to-[#EAE4D5]/80 pointer-events-none" />

      {/* Top indicator */}
      <div className="relative z-20 text-center pt-8">
        <span className="text-[10px] md:text-[11px] uppercase tracking-ultra-wide text-champagne-dark font-medium block">
          Haute Joaillerie · Dubai
        </span>
      </div>

      {/* Centerpiece: Symmetrical Architectural Archway Portal */}
      <div
        ref={portalRef}
        className="relative z-10 w-full max-w-4xl h-[420px] md:h-[550px] flex items-center justify-center transition-transform"
      >
        {/* Exterior Arch Frame */}
        <div className="relative w-[300px] md:w-[420px] h-[400px] md:h-[520px] rounded-t-full border-[1.5px] border-champagne/40 bg-gradient-to-b from-[#FFFDF9] to-[#ECE5D8] shadow-[0_20px_50px_rgba(182,161,93,0.15)] flex flex-col items-center justify-center p-8 overflow-hidden">
          {/* Inner concentric arch with delicate gold hairline */}
          <div className="absolute inset-4 rounded-t-full border border-champagne/30" />
          <div className="absolute inset-8 rounded-t-full border border-champagne/20" />

          {/* Deep Perspective Hallway Illusion */}
          <div className="absolute inset-14 rounded-t-full bg-gradient-to-b from-[#EFEAE0] to-[#DFD6C5] flex flex-col items-center justify-center shadow-inner">
            {/* Lumeire Circular Seal */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4 animate-float-slow">
              <Image
                src="/branding/lumeire_jewellery_logo.svg"
                alt="Lumeire Jewellery Dubai Seal"
                fill
                priority
                className="object-contain drop-shadow-[0_4px_15px_rgba(182,161,93,0.2)]"
              />
            </div>
          </div>
        </div>

        {/* Floating Typography overlay across the portal */}
        <div
          ref={titleRef}
          className="absolute z-20 text-center pointer-events-none select-none"
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl tracking-ultra-wide font-normal text-charcoal/90 uppercase drop-shadow-sm">
            Lumeire
          </h1>
          <p className="font-serif text-lg sm:text-2xl md:text-3xl tracking-luxury-wide text-champagne-dark font-light mt-2 italic">
            Atelier Dubai
          </p>
        </div>
      </div>

      {/* Bottom scroll invitation */}
      <div
        ref={subtitleRef}
        className="relative z-20 flex flex-col items-center space-y-3 pb-4"
      >
        <span className="text-[10px] uppercase tracking-luxury text-charcoal/50">
          Scroll to Enter The Realm
        </span>
        <ArrowDown className="w-4 h-4 text-champagne-dark animate-bounce" />
      </div>
    </section>
  );
}
