"use client";

import Image from "next/image";

export default function BrandHeritage() {
  return (
    <section id="heritage" className="w-full bg-[#FAF8F5] text-charcoal py-32 px-6 md:px-12 border-t border-champagne/20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
        {/* Left Column: Brand Emblem Seal */}
        <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
          <div className="relative w-44 h-44 md:w-56 md:h-56 mb-6">
            <Image
              src="/branding/lumeire_jewellery_logo.svg"
              alt="Lumeire Seal Dubai"
              fill
              className="object-contain drop-shadow-[0_10px_25px_rgba(182,161,93,0.2)]"
            />
          </div>
          <span className="text-[10px] uppercase tracking-ultra-wide text-champagne-dark font-medium">
            Maison Fondée à Dubaï
          </span>
        </div>

        {/* Right Column: Editorial Narrative */}
        <div className="md:col-span-7 space-y-8">
          <div>
            <span className="text-[10px] uppercase tracking-ultra-wide text-champagne-dark font-medium block mb-3">
              The Architecture of Adornment
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-charcoal tracking-luxury uppercase leading-tight">
              Where Dubai Craft Meets Enduring Gold
            </h2>
          </div>

          <p className="text-sm md:text-base text-charcoal/80 font-light leading-relaxed">
            Lumeire Jewellery was founded on a singular conviction: fine jewellery should possess the architectural integrity of a sculpture and the intimate lightness of a second skin.
          </p>

          <p className="text-sm md:text-base text-charcoal/80 font-light leading-relaxed">
            Every bangle, cuff, and high jewellery necklace is realized in solid 18K gold and set with certified diamonds in our Dubai atelier. We reject mass production in favor of bespoke craftsmanship—giving discerning collectors a piece of eternal distinction.
          </p>

          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-8 border-t border-champagne/30 text-left">
            <div>
              <span className="font-serif text-2xl md:text-3xl text-charcoal block">18K</span>
              <span className="text-[10px] uppercase tracking-luxury text-charcoal/60 mt-1 block">
                Solid Certified Gold
              </span>
            </div>
            <div>
              <span className="font-serif text-2xl md:text-3xl text-charcoal block">VVS</span>
              <span className="text-[10px] uppercase tracking-luxury text-charcoal/60 mt-1 block">
                Ethical Diamonds
              </span>
            </div>
            <div>
              <span className="font-serif text-2xl md:text-3xl text-charcoal block">Dubai</span>
              <span className="text-[10px] uppercase tracking-luxury text-charcoal/60 mt-1 block">
                Private Atelier
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
