"use client";

import { useRef } from "react";
import * as THREE from "three";

interface StudioLightingProps {
  intensity?: number;
  environmentIntensity?: number;
}

export default function StudioLighting({ intensity = 1.2 }: StudioLightingProps) {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);

  return (
    <>
      {/* Ambient ambient glow */}
      <ambientLight color="#f5efd9" intensity={0.45 * intensity} />

      {/* Main Warm Key Light */}
      <directionalLight
        ref={keyLightRef}
        position={[4, 6, 5]}
        intensity={2.8 * intensity}
        color="#fff6dd"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Secondary Fill Light */}
      <directionalLight
        position={[-5, 3, -2]}
        intensity={1.2 * intensity}
        color="#d8e2ec"
      />

      {/* Sharp Rim Light for catching gold bevels & facets */}
      <directionalLight
        position={[0, 8, -6]}
        intensity={3.2 * intensity}
        color="#ffffff"
      />

      {/* Soft Under-bounce Light simulating reflective marble/pedestal */}
      <directionalLight
        position={[0, -4, 2]}
        intensity={0.6 * intensity}
        color="#c7b77d"
      />
    </>
  );
}
