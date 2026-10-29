export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "Bangles" | "Bracelets" | "Cuffs" | "Necklaces";
  collection: string;
  description: string;
  story: string;
  price: number;
  currency: "AED";
  showPrice: boolean;
  model3D: string;
  images: string[];
  featured: boolean;
  published: boolean;
  sortOrder: number;
  specifications: {
    material: string;
    finish: string;
    gemstones?: string;
    origin: string;
    weightEstimate?: string;
    closure?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-screw-bangle-01",
    name: "The Lumeire Screw Bangle",
    slug: "lumeire-screw-bangle",
    category: "Bangles",
    collection: "Iconic Atelier",
    description:
      "Crafted in solid 18K yellow gold, the Lumeire Screw Bangle is defined by rhythmic screw-head engravings and mirror-polished contours.",
    story:
      "Born in our Dubai atelier, this piece transforms mechanical clarity into a symbol of unbreakable bonds. Each screw impression is meticulously calibrated to capture dynamic light from every angle.",
    price: 18500,
    currency: "AED",
    showPrice: true,
    model3D: "/models/lumeire_screw_bangle_3d.glb",
    images: [
      "/models/screw_bangle_preview.jpg",
      "/models/screw_bangle_detail.jpg",
    ],
    featured: true,
    published: true,
    sortOrder: 1,
    specifications: {
      material: "18K Solid Yellow Gold (AU 750)",
      finish: "High-Gloss Mirror Polish",
      origin: "Dubai, United Arab Emirates",
      weightEstimate: "Approx. 34.5 grams",
      closure: "Hinged Concealed Safety Clasp",
    },
    createdAt: "2026-10-01T00:00:00Z",
    updatedAt: "2026-10-30T00:00:00Z",
  },
  {
    id: "prod-open-cuff-02",
    name: "Precision Open Cuff & Screwdriver",
    slug: "precision-open-cuff",
    category: "Cuffs",
    collection: "Haute Mécanique",
    description:
      "An architectural open cuff featuring slotted screw fasteners, accompanied by a solid gold custom precision screwdriver.",
    story:
      "A tribute to pure engineering in jewellery design. The dedicated screwdriver is not merely a tool, but an artistic heirloom companion designed to lock the cuff into permanent intimacy.",
    price: 22400,
    currency: "AED",
    showPrice: true,
    model3D: "/models/open_cuff_bracelet_3d.glb",
    images: [],
    featured: true,
    published: true,
    sortOrder: 2,
    specifications: {
      material: "18K Yellow Gold with Screwdriver Accents",
      finish: "Dual Satin and Mirror Lustre",
      origin: "Dubai, United Arab Emirates",
      weightEstimate: "Approx. 41.2 grams (including driver)",
      closure: "Bespoke Threaded Locking Bolt",
    },
    createdAt: "2026-10-02T00:00:00Z",
    updatedAt: "2026-10-30T00:00:00Z",
  },
  {
    id: "prod-nail-cuff-03",
    name: "The Nail Diamond Cuff",
    slug: "nail-diamond-cuff",
    category: "Bracelets",
    collection: "Audace Collection",
    description:
      "A daring reimagining of the curved nail form, sculptured in 18K yellow gold and set with pavé-set round brilliant diamonds along the head and tip.",
    story:
      "An unapologetic celebration of individuality. What was once humble hardware is elevated to high jewellery through sensual curved ergonomics and flawless stone setting.",
    price: 34200,
    currency: "AED",
    showPrice: true,
    model3D: "/models/nail_diamond_cuff_bracelet_3d.glb",
    images: [],
    featured: true,
    published: true,
    sortOrder: 3,
    specifications: {
      material: "18K Yellow Gold & Natural Diamonds",
      finish: "Hand-Burnished Gloss",
      gemstones: "0.85 ct Brilliant Diamonds (Color F-G, Clarity VVS)",
      origin: "Dubai, United Arab Emirates",
      weightEstimate: "Approx. 38.0 grams",
      closure: "Flexible Memory Spring Tension Clasp",
    },
    createdAt: "2026-10-03T00:00:00Z",
    updatedAt: "2026-10-30T00:00:00Z",
  },
  {
    id: "prod-floral-necklace-04",
    name: "Floral Motif High Jewellery Necklace",
    slug: "floral-motif-high-jewellery-necklace",
    category: "Necklaces",
    collection: "High Jewellery",
    description:
      "An intricate botanical masterwork of hundreds of hand-linked floral medallions draped seamlessly along the collarbone.",
    story:
      "A monumental creation comprising over 850 handcrafted gold elements inspired by blooming desert flora. The cascade rests with silky textile-like suppleness against the skin.",
    price: 88000,
    currency: "AED",
    showPrice: true,
    model3D: "/models/floral_motif_necklaces_3d.glb",
    images: [],
    featured: true,
    published: true,
    sortOrder: 4,
    specifications: {
      material: "18K Multi-Tier Gold & Bespoke Diamond Clusters",
      finish: "Artisanal Textured & Polished Filigree",
      gemstones: "3.40 ct Rare Selected Diamonds",
      origin: "Dubai, United Arab Emirates",
      weightEstimate: "Approx. 115.0 grams",
      closure: "Concealed Dual Push-Button Safety",
    },
    createdAt: "2026-10-04T00:00:00Z",
    updatedAt: "2026-10-30T00:00:00Z",
  },
  {
    id: "prod-open-bangle-05",
    name: "The Lumeire Open Bangle",
    slug: "lumeire-open-bangle",
    category: "Bangles",
    collection: "Iconic Atelier",
    description:
      "Sleek architectural open bangle engineered with tapered terminal tips and discreet diamond accents.",
    story:
      "Designed for the modern connoisseur, this open silhouette offers effortless slip-on elegance while holding its sculptural posture with sovereign grace.",
    price: 19800,
    currency: "AED",
    showPrice: true,
    model3D: "/models/lumeire_open_bangle_3d.glb",
    images: [],
    featured: false,
    published: true,
    sortOrder: 5,
    specifications: {
      material: "18K Yellow Gold",
      finish: "Liquid Gold High Polish",
      gemstones: "0.20 ct Round Brilliant Diamonds",
      origin: "Dubai, United Arab Emirates",
      weightEstimate: "Approx. 29.8 grams",
    },
    createdAt: "2026-10-05T00:00:00Z",
    updatedAt: "2026-10-30T00:00:00Z",
  },
  {
    id: "prod-signature-bracelet-06",
    name: "Lumeire Signature Link Bracelet",
    slug: "lumeire-signature-link-bracelet",
    category: "Bracelets",
    collection: "Heritage",
    description:
      "Substantial, interlocking oval links featuring soft bevelled contours and an invisible security clasp.",
    story:
      "The definitive everyday luxury link bracelet. Substantial in weight yet fluid in motion, evoking the enduring architectural strength of Dubai's skyline.",
    price: 16500,
    currency: "AED",
    showPrice: true,
    model3D: "/models/lumeire_bracelet_3d.glb",
    images: [],
    featured: false,
    published: true,
    sortOrder: 6,
    specifications: {
      material: "18K Solid Yellow Gold",
      finish: "Hand-Laquered High Sheen",
      origin: "Dubai, United Arab Emirates",
      weightEstimate: "Approx. 31.0 grams",
      closure: "Integrated Invisible Box Clasp",
    },
    createdAt: "2026-10-06T00:00:00Z",
    updatedAt: "2026-10-30T00:00:00Z",
  },
];

// In-memory / persistent storage fallback for owner management
export function getAllProducts(): Product[] {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("lumeire_products_override");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
  }
  return INITIAL_PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getAllProducts();
  return products.find((p) => p.slug === slug);
}

export function saveProductOverride(products: Product[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("lumeire_products_override", JSON.stringify(products));
  }
}
