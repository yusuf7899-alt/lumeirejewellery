"use client";

import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { ArrowUpRight } from "lucide-react";

export default function EditorialCollectionsGrid() {
  const products = getAllProducts();

  return (
    <section id="collections" className="w-full bg-obsidian py-32 px-6 md:px-12 border-t border-champagne/15">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Editorial Hierarchy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-8 border-b border-champagne/20">
          <div>
            <span className="text-[10px] uppercase tracking-ultra-wide text-champagne block mb-3 font-medium">
              Curated Masterpieces
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl font-normal text-ivory tracking-luxury uppercase">
              The Collection
            </h2>
          </div>
          <p className="text-xs md:text-sm text-ivory/60 max-w-sm mt-6 md:mt-0 font-light leading-relaxed">
            Every creation is rendered from authentic solid gold GLB models, conceived and finished in Dubai for private collectors.
          </p>
        </div>

        {/* Editorial Grid: 2-column large editorial rows with hairline dividers */}
        <div className="divide-y divide-champagne/15 border-b border-champagne/15">
          {products.map((product, idx) => (
            <div
              key={product.id}
              className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center group transition-colors duration-500 hover:bg-white/[0.015]"
            >
              {/* Index & Category */}
              <div className="md:col-span-2 flex items-center space-x-4">
                <span className="font-serif text-lg text-champagne/60 font-light">
                  0{idx + 1}
                </span>
                <span className="text-[10px] uppercase tracking-luxury text-ivory/50">
                  {product.category}
                </span>
              </div>

              {/* Title & Description */}
              <div className="md:col-span-5">
                <Link href={`/jewellery/${product.slug}`} className="inline-block group/title">
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivory font-light group-hover/title:text-champagne transition-colors duration-300">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-xs text-ivory/60 mt-2 font-light line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Material Specs */}
              <div className="md:col-span-2 text-left md:text-center">
                <span className="text-[9px] uppercase tracking-luxury text-champagne/70 block">
                  Composition
                </span>
                <span className="text-xs text-ivory/80 font-light">
                  {product.specifications.material.split("&")[0]}
                </span>
              </div>

              {/* Price & Action */}
              <div className="md:col-span-3 flex items-center justify-between md:justify-end space-x-6">
                <div className="text-right">
                  {product.showPrice ? (
                    <span className="font-serif text-lg md:text-xl text-ivory tracking-wide">
                      {product.price.toLocaleString()} {product.currency}
                    </span>
                  ) : (
                    <span className="text-xs uppercase tracking-luxury text-champagne">
                      Upon Request
                    </span>
                  )}
                </div>

                <Link
                  href={`/jewellery/${product.slug}`}
                  aria-label={`View ${product.name} in 3D`}
                  className="w-11 h-11 rounded-full border border-champagne/30 flex items-center justify-center text-champagne group-hover:bg-champagne group-hover:text-obsidian group-hover:border-champagne transition-all duration-300 shadow-sm"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
