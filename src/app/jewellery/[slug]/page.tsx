import { notFound } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import LuxuryNavbar from "@/components/ui/LuxuryNavbar";
import LuxuryFooter from "@/components/ui/LuxuryFooter";
import WhatsAppConcierge from "@/components/ui/WhatsAppConcierge";
import { ArrowLeft, ArrowUpRight, MessageCircle, ShieldCheck } from "lucide-react";

// Client-only dynamic import for 3D Orbit Viewer
const InteractiveProductViewer = dynamic(
  () => import("@/components/3d/InteractiveProductViewer"),
  { ssr: false }
);

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const related = getAllProducts()
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  const whatsappMessage = encodeURIComponent(
    `Hello Lumeire Jewellery, I am inquiring about "${product.name}" (${product.specifications.material}) listed at ${
      product.showPrice ? `${product.price.toLocaleString()} ${product.currency}` : "Price on Request"
    }. Could you provide further consultation?`
  );

  return (
    <main className="min-h-screen bg-obsidian text-ivory">
      <LuxuryNavbar />

      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Breadcrumb / Return Link */}
        <div className="mb-8">
          <Link
            href="/#collections"
            className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-luxury text-ivory/60 hover:text-champagne transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Collections</span>
          </Link>
        </div>

        {/* Master Showcase Layout: 3D Model on Left, Editorial Details on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* 3D Model Viewport (7 Columns) */}
          <div className="lg:col-span-7 sticky top-28">
            <InteractiveProductViewer
              modelPath={product.model3D}
              productName={product.name}
              initialTone="yellow"
            />
          </div>

          {/* Product Editorial Details (5 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center space-x-3 text-[10px] uppercase tracking-ultra-wide text-champagne mb-2">
                <span>{product.collection}</span>
                <span>·</span>
                <span>{product.category}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory tracking-luxury leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-4 pb-6 border-b border-champagne/15">
                {product.showPrice ? (
                  <div className="flex items-baseline space-x-2">
                    <span className="font-serif text-2xl sm:text-3xl text-champagne-light">
                      {product.price.toLocaleString()}
                    </span>
                    <span className="text-xs tracking-widest text-ivory/60 uppercase">
                      {product.currency}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs uppercase tracking-luxury text-champagne font-medium">
                    Price Available on Private Request
                  </span>
                )}
                <span className="text-[10px] text-ivory/40 block mt-1 tracking-wider">
                  Inclusive of certified Dubai authentication & VIP insured delivery
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-ivory/80 font-light leading-relaxed">
              {product.description}
            </p>

            {/* Atelier Story */}
            <div className="p-6 rounded-2xl bg-obsidian-deep/80 border border-champagne/20 space-y-2">
              <span className="text-[10px] uppercase tracking-luxury text-champagne font-medium block">
                Atelier Notes
              </span>
              <p className="text-xs text-ivory/70 font-light leading-relaxed">
                {product.story}
              </p>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] uppercase tracking-luxury text-champagne font-medium block">
                Creation Details
              </span>
              <dl className="grid grid-cols-2 gap-4 text-xs font-light divide-y divide-champagne/10">
                <div className="pt-2">
                  <dt className="text-ivory/40 text-[10px] uppercase tracking-wider">Material</dt>
                  <dd className="text-ivory/90 mt-0.5">{product.specifications.material}</dd>
                </div>
                <div className="pt-2">
                  <dt className="text-ivory/40 text-[10px] uppercase tracking-wider">Finish</dt>
                  <dd className="text-ivory/90 mt-0.5">{product.specifications.finish}</dd>
                </div>
                {product.specifications.gemstones && (
                  <div className="pt-2">
                    <dt className="text-ivory/40 text-[10px] uppercase tracking-wider">Gemstones</dt>
                    <dd className="text-ivory/90 mt-0.5">{product.specifications.gemstones}</dd>
                  </div>
                )}
                {product.specifications.weightEstimate && (
                  <div className="pt-2">
                    <dt className="text-ivory/40 text-[10px] uppercase tracking-wider">Weight</dt>
                    <dd className="text-ivory/90 mt-0.5">{product.specifications.weightEstimate}</dd>
                  </div>
                )}
                <div className="pt-2">
                  <dt className="text-ivory/40 text-[10px] uppercase tracking-wider">Origin</dt>
                  <dd className="text-ivory/90 mt-0.5">{product.specifications.origin}</dd>
                </div>
                {product.specifications.closure && (
                  <div className="pt-2">
                    <dt className="text-ivory/40 text-[10px] uppercase tracking-wider">Clasp</dt>
                    <dd className="text-ivory/90 mt-0.5">{product.specifications.closure}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Inquiry Action Buttons */}
            <div className="space-y-3 pt-4">
              <a
                href={`https://wa.me/971552315658?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-3 bg-champagne hover:bg-champagne-light text-obsidian text-xs font-medium tracking-luxury uppercase py-4 rounded-full transition-all duration-300 shadow-xl group"
              >
                <MessageCircle className="w-4 h-4 text-obsidian" />
                <span>Enquire on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-ivory/50 uppercase tracking-luxury pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-champagne" />
                <span>Certified Genuine Gold · Dubai Atelier Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Creations */}
        <div className="mt-32 pt-16 border-t border-champagne/15">
          <span className="text-[10px] uppercase tracking-ultra-wide text-champagne block mb-2 font-medium">
            Discover Further
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ivory uppercase font-light mb-10">
            Complementary Creations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/jewellery/${rel.slug}`}
                className="group block p-6 rounded-2xl bg-obsidian-deep/60 border border-champagne/15 hover:border-champagne/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-champagne/70 mb-3">
                  <span>{rel.category}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-champagne transition-colors" />
                </div>
                <h3 className="font-serif text-xl text-ivory group-hover:text-champagne transition-colors font-light">
                  {rel.name}
                </h3>
                <span className="text-xs text-ivory/60 mt-2 block font-light">
                  {rel.showPrice ? `${rel.price.toLocaleString()} ${rel.currency}` : "Price on Request"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <LuxuryFooter />
      <WhatsAppConcierge />
    </main>
  );
}
