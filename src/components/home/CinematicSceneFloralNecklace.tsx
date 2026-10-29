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

export default function CinematicSceneFloralNecklace() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ribbonsRef = useRef<HTMLDivElement>(null);

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

      // Ribbon orbital spin effect (Directly inspired by Scene 6 of reference video)
      tl.fromTo(
        ribbonsRef.current,
        { rotateZ: -30, scale: 0.8, opacity: 0.3 },
        { rotateZ: 25, scale: 1.1, opacity: 0.8, duration: 1 }
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
      id="floral-necklace"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0C0B0A] text-ivory overflow-hidden flex items-center justify-center z-20"
    >
      {/* Dynamic Spiraling Reflective Gold Ribbons & Pedestals */}
      <div
        ref={ribbonsRef}
        className="absolute inset-0 pointer-events-none flex items-center justify-center transition-transform"
      >
        <div className="relative w-[500px] md:w-[750px] h-[500px] md:h-[750px]">
          {/* Outer sweeping ribbon ring */}
          <div className="absolute inset-0 rounded-full border-[1.5px] border-champagne/20 border-t-champagne/60 border-b-transparent transform rotate-45 animate-[spin_24s_linear_infinite]" />
          {/* Middle reflective ribbon ring */}
          <div className="absolute inset-16 rounded-full border border-champagne/15 border-l-champagne/50 border-r-transparent transform -rotate-12 animate-[spin_18s_linear_infinite_reverse]" />
          {/* Inner pedestal halo */}
          <div className="absolute inset-32 rounded-full border border-champagne/10 border-t-champagne/40" />
        </div>
      </div>

      {/* 3D GLB Model: Floral Motif High Jewellery Necklace */}
      <div className="absolute inset-0 z-10">
        <Suspense fallback={null}>
          <Canvas
            shadows
            camera={{ position: [0, 0, 4.0], fov: 42 }}
            gl={{ antialias: true, alpha: true }}
          >
            <StudioLighting intensity={1.6} />
            <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.25}>
              <ProductModel
                modelPath="/models/floral_motif_necklaces_3d.glb"
                targetSize={2.6}
                autoRotate
                rotationSpeed={0.35}
                goldTone="yellow"
              />
            </Float>
            <ContactShadows
              position={[0, -1.4, 0]}
              opacity={0.6}
              scale={5}
              blur={2.5}
              far={3.5}
              color="#000000"
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Typographic Overlay */}
      <div
        ref={textRef}
        className="relative z-20 max-w-6xl w-full mx-auto px-8 flex flex-col md:flex-row items-end md:items-center justify-between pointer-events-none"
      >
        <div className="text-left max-w-md pointer-events-auto">
          <span className="text-[10px] uppercase tracking-ultra-wide text-champagne/80 font-medium block mb-2">
            High Jewellery · 04
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-normal tracking-luxury uppercase leading-tight drop-shadow-lg">
            Floral Motif Necklace
          </h2>
          <p className="text-xs sm:text-sm text-ivory/70 font-light mt-3 leading-relaxed">
            An opus of over 850 handcrafted sculptural links. Blooming desert petals forged in solid gold and accented with certified diamonds.
          </p>
          <div className="mt-6 flex items-center space-x-6">
            <Link
              href="/jewellery/floral-motif-high-jewellery-necklace"
              className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-luxury text-champagne border-b border-champagne/40 pb-1 hover:border-champagne-light hover:text-champagne-light transition-colors duration-300"
            >
              <span>Inspect in 3D</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="https://wa.me/971552315658?text=Hello%20Lumeire%2C%20I%20would%20like%20to%20enquire%20about%20the%20Floral%20Motif%20High%20Jewellery%20Necklace."
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
            Craftsmanship
          </span>
          <span className="font-serif text-xl text-ivory">850+ Gold Elements</span>
          <span className="text-[9px] uppercase tracking-luxury text-champagne/60 pt-2">
            Total Diamonds
          </span>
          <span className="text-xs tracking-wider text-ivory/70">3.40 ct Certified Gems</span>
        </div>
      </div>
    </section>
  );
}
