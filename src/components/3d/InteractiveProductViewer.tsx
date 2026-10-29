"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Float } from "@react-three/drei";
import ProductModel from "./ProductModel";
import StudioLighting from "./StudioLighting";
import { RotateCw } from "lucide-react";

interface InteractiveProductViewerProps {
  modelPath: string;
  productName: string;
  initialTone?: "yellow" | "rose" | "white";
}

function Loader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-obsidian/40 backdrop-blur-sm z-10">
      <div className="w-8 h-8 border border-champagne/20 border-t-champagne rounded-full animate-spin" />
      <span className="text-[10px] tracking-luxury uppercase text-champagne/80 mt-3 font-light">
        Rendering 3D Masterpiece...
      </span>
    </div>
  );
}

export default function InteractiveProductViewer({
  modelPath,
  productName,
  initialTone = "yellow",
}: InteractiveProductViewerProps) {
  const [goldTone, setGoldTone] = useState<"yellow" | "rose" | "white">(initialTone);
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div
      aria-label={`Interactive 3D model of ${productName}`}
      className="relative w-full h-[450px] md:h-[600px] bg-gradient-to-b from-obsidian-light/50 to-obsidian border border-champagne/15 rounded-2xl overflow-hidden shadow-2xl group"
    >
      {/* 3D Canvas */}
      <Suspense fallback={<Loader />}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 4.2], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          className="cursor-grab active:cursor-grabbing"
        >
          <StudioLighting intensity={1.3} />
          
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <ProductModel
              modelPath={modelPath}
              targetSize={2.2}
              goldTone={goldTone}
              autoRotate={autoRotate}
              rotationSpeed={0.6}
            />
          </Float>

          <ContactShadows
            position={[0, -1.3, 0]}
            opacity={0.6}
            scale={5}
            blur={2.4}
            far={3.5}
            color="#050505"
          />

          <OrbitControls
            enablePan={false}
            minDistance={2.5}
            maxDistance={6.5}
            enableDamping
            dampingFactor={0.06}
          />
        </Canvas>
      </Suspense>

      {/* Floating Controls Overlay */}
      <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
        <span className="text-[9px] uppercase tracking-luxury text-champagne bg-obsidian-deep/80 px-3 py-1 rounded-full border border-champagne/20 backdrop-blur-md">
          Interactive 3D GLB
        </span>
      </div>

      {/* Bottom Control Bar */}
      <div className="absolute bottom-4 inset-x-4 z-20 flex flex-wrap items-center justify-between gap-3 p-3 bg-obsidian-deep/85 border border-champagne/20 rounded-xl backdrop-blur-md">
        {/* Precious Metal Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-[10px] uppercase tracking-luxury text-ivory/60 mr-1 hidden sm:inline">
            Finish:
          </span>
          <button
            onClick={() => setGoldTone("yellow")}
            className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5 ${
              goldTone === "yellow"
                ? "bg-champagne text-obsidian font-medium shadow-md"
                : "text-ivory/70 hover:text-champagne bg-obsidian/40 border border-champagne/20"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span>18K Yellow</span>
          </button>
          <button
            onClick={() => setGoldTone("rose")}
            className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5 ${
              goldTone === "rose"
                ? "bg-[#E59882] text-obsidian font-medium shadow-md"
                : "text-ivory/70 hover:text-champagne bg-obsidian/40 border border-champagne/20"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#E59882]" />
            <span>Rose Gold</span>
          </button>
          <button
            onClick={() => setGoldTone("white")}
            className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5 ${
              goldTone === "white"
                ? "bg-[#E2E4E8] text-obsidian font-medium shadow-md"
                : "text-ivory/70 hover:text-champagne bg-obsidian/40 border border-champagne/20"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#E2E4E8]" />
            <span>White Gold</span>
          </button>
        </div>

        {/* Orbit & Auto-Rotate toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1.5 rounded-lg border text-xs transition-colors ${
              autoRotate
                ? "border-champagne text-champagne bg-champagne/10"
                : "border-ivory/20 text-ivory/50 hover:text-ivory"
            }`}
            title="Toggle Continuous Rotation"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <span className="text-[9px] uppercase tracking-widest text-ivory/40 hidden md:inline">
            Drag to Orbit · Scroll to Zoom
          </span>
        </div>
      </div>
    </div>
  );
}
