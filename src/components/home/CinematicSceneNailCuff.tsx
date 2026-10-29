"use client";

import { useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import ProductModel from "@/components/3d/ProductModel";
import StudioLighting from "@/components/3d/StudioLighting";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

export default function CinematicSceneNailCuff() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 1.2,
        },
      });

      tl.fromTo(
        spotlightRef.current,
        { scale: 0.5, opacity: 0.2 },
        { scale: 1.3, opacity: 0.85, duration: 0.8 }
      ).fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4 },
        0.2
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="nail-cuff"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#070707] text-ivory overflow-hidden flex items-center justify-center z-20"
    >
      {/* High-Contrast Spotlight Beam in Midnight Void */}
      <div
        ref={spotlightRef}
        className="absolute w-[450px] md:w-[650px] h-[450px] md:h-[650px] rounded-full bg-radial-gradient from-champagne/15 via-champagne/5 to-transparent blur-3xl pointer-events-none"
      />

      {/* 3D GLB Model: Nail Diamond Cuff */}
      <div className="absolute inset-0 z-10">
        <Suspense fallback={null}>
          <Canvas
            shadows
            camera={{ position: [0, 0, 4.2], fov: 40 }}
            gl={{ antialias: true, alpha: true }}
          >
            <StudioLighting intensity={1.5} />
            <Float speed={2.2} rotationIntensity={0.4} floatIntensity={0.35}>
              <ProductModel
                modelPath="/models/nail_diamond_cuff_bracelet_3d.glb"
                targetSize={2.4}
                autoRotate
                rotationSpeed={0.5}
                goldTone="yellow"
              />
            </Float>
            <ContactShadows
              position={[0, -1.4, 0]}
              opacity={0.7}
              scale={5}
              blur={2.8}
              far={3.5}
              color="#000000"
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Editorial Content */}
      <div
        ref={textRef}
        className="relative z-20 max-w-6xl w-full mx-auto px-8 flex flex-col md:flex-row items-end md:items-center justify-between pointer-events-none"
      >
        <div className="text-left max-w-md pointer-events-auto">
          <span className="text-[10px] uppercase tracking-ultra-wide text-champagne/80 font-medium block mb-2">
            Audace · 03
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-normal tracking-luxury uppercase leading-tight drop-shadow-md">
            Nail Diamond Cuff
          </h2>
          <p className="text-xs sm:text-sm text-ivory/70 font-light mt-3 leading-relaxed">
            Raw industrial audacity transmuted into pure 18K yellow gold, crowned with pavé brilliant-cut diamonds.
          </p>
          <div className="mt-6 flex items-center space-x-6">
            <Link
              href="/jewellery/nail-diamond-cuff"
              className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-luxury text-champagne border-b border-champagne/40 pb-1 hover:border-champagne-light hover:text-champagne-light transition-colors duration-300"
            >
              <span>Inspect in 3D</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="https://wa.me/971552315658?text=Hello%20Lumeire%2C%20I%20would%20like%20to%20enquire%20about%20the%20Nail%20Diamond%20Cuff."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-luxury text-ivory/80 hover:text-champagne"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        {/* Right Gemological Data */}
        <div className="hidden md:flex flex-col items-end text-right space-y-2 pointer-events-auto mt-8 md:mt-0">
          <span className="text-[9px] uppercase tracking-luxury text-champagne/60">
            Diamond Pavé
          </span>
          <span className="font-serif text-xl text-ivory">0.85 ct F-G / VVS</span>
          <span className="text-[9px] uppercase tracking-luxury text-champagne/60 pt-2">
            Silhouette
          </span>
          <span className="text-xs tracking-wider text-ivory/70">Flexible Memory Gold</span>
        </div>
      </div>
    </section>
  );
}
