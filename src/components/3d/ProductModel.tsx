"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ProductModelProps {
  modelPath: string;
  targetSize?: number;
  rotation?: [number, number, number];
  position?: [number, number, number];
  scale?: number;
  goldTone?: "yellow" | "rose" | "white";
  autoRotate?: boolean;
  rotationSpeed?: number;
  castShadow?: boolean;
}

const GOLD_PALETTES = {
  yellow: {
    color: "#D4AF37",
    specular: "#FFF2A8",
  },
  rose: {
    color: "#E59882",
    specular: "#FFD0C4",
  },
  white: {
    color: "#E2E4E8",
    specular: "#FFFFFF",
  },
};

export default function ProductModel({
  modelPath,
  targetSize = 2.4,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  scale = 1,
  goldTone = "yellow",
  autoRotate = false,
  rotationSpeed = 0.5,
  castShadow = true,
}: ProductModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

  // Clone scene and configure geometry & luxury materials
  const { centeredScene, finalScale } = useMemo(() => {
    const clone = scene.clone(true);

    // Compute bounding box to center and scale uniformly
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    const computedScale = (targetSize / maxDimension) * scale;

    const center = new THREE.Vector3();
    box.getCenter(center);

    // Reposition to origin
    clone.position.set(-center.x, -center.y, -center.z);

    const palette = GOLD_PALETTES[goldTone];

    // High-end luxury gold material
    const goldMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(palette.color),
      metalness: 0.96,
      roughness: 0.15,
      clearcoat: 0.65,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
      envMapIntensity: 2.2,
    });

    // Diamond / stone physical material with optical refraction
    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#FFFFFF"),
      metalness: 0.05,
      roughness: 0.04,
      transmission: 0.88,
      thickness: 0.6,
      ior: 2.417, // True diamond index of refraction
      reflectivity: 1.0,
      envMapIntensity: 3.0,
    });

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = castShadow;
        mesh.receiveShadow = true;

        const currentMatName = (mesh.material as THREE.Material)?.name?.toLowerCase() || "";

        if (
          currentMatName.includes("diamond") ||
          currentMatName.includes("stone") ||
          currentMatName.includes("gem")
        ) {
          mesh.material = diamondMaterial;
        } else {
          mesh.material = goldMaterial;
        }
      }
    });

    const wrapper = new THREE.Group();
    wrapper.add(clone);

    return { centeredScene: wrapper, finalScale: computedScale };
  }, [scene, targetSize, scale, goldTone, castShadow]);

  // Subtle floating and rotation loop
  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.4 * rotationSpeed;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={[finalScale, finalScale, finalScale]}
    >
      <primitive object={centeredScene} />
    </group>
  );
}
