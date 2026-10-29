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

export default function CinematicSceneScrewBangle() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pin section and animate text reveals & floating tiles on scroll
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
        textRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5 }
      ).fromTo(
        tilesRef.current,
        { opacity: 0, scale: 0.85, rotateZ: -5 },
        { opacity: 1, scale: 1, rotateZ: 0, duration: 0.8 },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="screw-bangle"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#F9F7F2] text-charcoal overflow-hidden flex items-center justify-center z-20"
    >
      {/* Background Floating Golden Architectural Tiles (Scene 2 from reference) */}
      <div
        ref={tilesRef}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div className="relative w-full max-w-2xl h-[450px]">
          {/* Floating Gold Pillars / Mirrors */}
          <div className="absolute top-1/4 left-8 md:left-16 w-16 h-36 bg-gradient-to-br from-[#E8DEC3] to-[#C7B77D] opacity-40 shadow-xl rounded-sm transform -rotate-6 blur-[0.5px]" />
          <div className="absolute bottom-1/4 right-8 md:right-16 w-20 h-44 bg-gradient-to-tr from-[#C7B77D] to-[#F0E8C6] opacity-35 shadow-xl rounded-sm transform rotate-12 blur-[0.5px]" />
          <div className="absolute top-10 right-1/4 w-12 h-24 bg-gradient-to-b from-[#E5C378] to-transparent opacity-25 rounded-sm" />
          <div className="absolute bottom-12 left-1/4 w-14 h-28 bg-gradient-to-t from-[#B6A15D] to-transparent opacity-25 rounded-sm" />
        </div>
      </div>

      {/* 3D GLB Model Viewport */}
      <div className="absolute inset-0 z-10">
        <Suspense fallback={null}>
          <Canvas
            shadows
            camera={{ position: [0, 0, 4.0], fov: 40 }}
            gl={{ antialias: true, alpha: true }}
          >
            <StudioLighting intensity={1.1} />
            <Float speed={2.0} rotationIntensity={0.3} floatIntensity={0.4}>
              <ProductModel
                modelPath="/models/lumeire_screw_bangle_3d.glb"
                targetSize={2.4}
                autoRotate
                rotationSpeed={0.45}
                goldTone="yellow"
              />
            </Float>
            <ContactShadows
              position={[0, -1.4, 0]}
              opacity={0.35}
              scale={5}
              blur={2.5}
              far={3}
              color="#3A3426"
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Foreground Editorial Typography & Details */}
      <div
        ref={textRef}
        className="relative z-20 max-w-6xl w-full mx-auto px-8 flex flex-col md:flex-row items-end md:items-center justify-between pointer-events-none"
      >
        <div className="text-left max-w-md pointer-events-auto">
          <span className="text-[10px] uppercase tracking-ultra-wide text-champagne-dark font-medium block mb-2">
            Creations · 01
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-charcoal font-normal tracking-luxury uppercase leading-tight">
            The Screw Bangle
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/70 font-light mt-3 leading-relaxed">
            Forged in 18K solid yellow gold. An architectural silhouette fastened with precision screw details that capture the Dubai sun.
          </p>
          <div className="mt-6 flex items-center space-x-6">
            <Link
              href="/jewellery/lumeire-screw-bangle"
              className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-luxury text-charcoal border-b border-charcoal/40 pb-1 hover:border-champagne-dark hover:text-champagne-dark transition-colors duration-300"
            >
              <span>Inspect in 3D</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="https://wa.me/971552315658?text=Hello%20Lumeire%2C%20I%20would%20like%20to%20enquire%20about%20The%20Screw%20Bangle."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-luxury text-champagne-dark hover:underline"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        {/* Right Scene Indicator & Specs */}
        <div className="hidden md:flex flex-col items-end text-right space-y-2 pointer-events-auto mt-8 md:mt-0">
          <span className="text-[9px] uppercase tracking-luxury text-charcoal/40">
            Gold Weight
          </span>
          <span className="font-serif text-xl text-charcoal">34.5g Solid AU 750</span>
          <span className="text-[9px] uppercase tracking-luxury text-charcoal/40 pt-2">
            Location
          </span>
          <span className="text-xs tracking-wider text-charcoal/70">Atelier Dubai</span>
        </div>
      </div>
    </section>
  );
}
