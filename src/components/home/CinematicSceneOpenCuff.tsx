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

export default function CinematicSceneOpenCuff() {
  const sectionRef = useRef<HTMLElement>(null);
  const framesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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

      // Expand concentric graphic frames (matching Scene 3 of reference video)
      tl.fromTo(
        framesRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1.15, opacity: 1, duration: 0.8, ease: "power2.out" }
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
      id="open-cuff"
      ref={sectionRef}
      className="relative w-full h-screen bg-obsidian-deep text-ivory overflow-hidden flex items-center justify-center z-20"
    >
      {/* Concentric Graphic Wireframe Rectangles (Directly inspired by Tank Louis scene in reference) */}
      <div
        ref={framesRef}
        className="absolute inset-0 pointer-events-none flex items-center justify-center transition-transform"
      >
        <div className="relative w-[340px] md:w-[500px] h-[460px] md:h-[620px] border border-champagne/15 rounded-lg flex items-center justify-center">
          <div className="w-[85%] h-[85%] border border-champagne/25 rounded-lg flex items-center justify-center">
            <div className="w-[80%] h-[80%] border border-champagne/35 rounded-md flex items-center justify-center">
              <div className="w-[75%] h-[75%] border border-champagne/15 rounded-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* 3D GLB Model: Open Cuff & Screwdriver */}
      <div className="absolute inset-0 z-10">
        <Suspense fallback={null}>
          <Canvas
            shadows
            camera={{ position: [0, 0, 4.2], fov: 40 }}
            gl={{ antialias: true, alpha: true }}
          >
            <StudioLighting intensity={1.4} />
            <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.3}>
              <ProductModel
                modelPath="/models/open_cuff_bracelet_3d.glb"
                targetSize={2.4}
                autoRotate
                rotationSpeed={0.5}
                goldTone="yellow"
              />
            </Float>
            <ContactShadows
              position={[0, -1.4, 0]}
              opacity={0.65}
              scale={5}
              blur={2.6}
              far={3.5}
              color="#000000"
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Editorial Typographic Overlay */}
      <div
        ref={textRef}
        className="relative z-20 max-w-6xl w-full mx-auto px-8 flex flex-col md:flex-row items-end md:items-center justify-between pointer-events-none"
      >
        <div className="text-left max-w-md pointer-events-auto">
          <span className="text-[10px] uppercase tracking-ultra-wide text-champagne/80 font-medium block mb-2">
            Haute Mécanique · 02
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-normal tracking-luxury uppercase leading-tight drop-shadow-lg">
            Precision Open Cuff
          </h2>
          <p className="text-xs sm:text-sm text-ivory/70 font-light mt-3 leading-relaxed">
            Accompanied by a dedicated solid gold custom screwdriver. Mechanical precision elevated to fine jewellery intimacy.
          </p>
          <div className="mt-6 flex items-center space-x-6">
            <Link
              href="/jewellery/precision-open-cuff"
              className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-luxury text-champagne border-b border-champagne/40 pb-1 hover:border-champagne-light hover:text-champagne-light transition-colors duration-300"
            >
              <span>Inspect in 3D</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="https://wa.me/971552315658?text=Hello%20Lumeire%2C%20I%20would%20like%20to%20enquire%20about%20the%20Precision%20Open%20Cuff."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-luxury text-ivory/80 hover:text-champagne"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        {/* Right Details */}
        <div className="hidden md:flex flex-col items-end text-right space-y-2 pointer-events-auto mt-8 md:mt-0">
          <span className="text-[9px] uppercase tracking-luxury text-champagne/60">
            Mechanism
          </span>
          <span className="font-serif text-xl text-ivory">Threaded Gold Bolt</span>
          <span className="text-[9px] uppercase tracking-luxury text-champagne/60 pt-2">
            Companion
          </span>
          <span className="text-xs tracking-wider text-ivory/70">Solid Gold Screwdriver</span>
        </div>
      </div>
    </section>
  );
}
