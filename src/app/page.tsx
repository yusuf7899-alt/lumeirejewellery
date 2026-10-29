"use client";

import dynamic from "next/dynamic";
import Preloader from "@/components/ui/Preloader";
import LuxuryNavbar from "@/components/ui/LuxuryNavbar";
import CinematicHeroPortal from "@/components/home/CinematicHeroPortal";
import EditorialCollectionsGrid from "@/components/home/EditorialCollectionsGrid";
import BrandHeritage from "@/components/home/BrandHeritage";
import AtelierConcierge from "@/components/home/AtelierConcierge";
import LuxuryFooter from "@/components/ui/LuxuryFooter";
import WhatsAppConcierge from "@/components/ui/WhatsAppConcierge";

const CinematicSceneScrewBangle = dynamic(
  () => import("@/components/home/CinematicSceneScrewBangle"),
  { ssr: false }
);

const CinematicSceneOpenCuff = dynamic(
  () => import("@/components/home/CinematicSceneOpenCuff"),
  { ssr: false }
);

const CinematicSceneNailCuff = dynamic(
  () => import("@/components/home/CinematicSceneNailCuff"),
  { ssr: false }
);

const CinematicSceneFloralNecklace = dynamic(
  () => import("@/components/home/CinematicSceneFloralNecklace"),
  { ssr: false }
);

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-obsidian text-ivory">
      {/* Luxury Brand Preloader */}
      <Preloader />

      {/* Luxury Navigation Bar */}
      <LuxuryNavbar />

      {/* Cinematic Scene Sequence */}
      <div id="scenes" className="relative w-full">
        {/* Scene 1: The Architectural Portal */}
        <CinematicHeroPortal />

        {/* Scene 2: The Screw Bangle with Geometric Gold Mirrors */}
        <CinematicSceneScrewBangle />

        {/* Scene 3: The Precision Open Cuff & Screwdriver in Midnight Obsidian */}
        <CinematicSceneOpenCuff />

        {/* Scene 4: The Nail Diamond Cuff under Midnight Spotlight */}
        <CinematicSceneNailCuff />

        {/* Scene 5: Floral Motif Masterpiece with Orbital Gold Ribbons */}
        <CinematicSceneFloralNecklace />
      </div>

      {/* Editorial Curated Catalogue */}
      <EditorialCollectionsGrid />

      {/* Dubai Brand Story & Atelier Heritage */}
      <BrandHeritage />

      {/* Private Concierge & WhatsApp Booking */}
      <AtelierConcierge />

      {/* Luxury Footer */}
      <LuxuryFooter />

      {/* Floating Concierge Action */}
      <WhatsAppConcierge />
    </main>
  );
}
