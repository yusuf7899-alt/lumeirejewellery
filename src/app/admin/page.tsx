"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, getAllProducts, saveProductOverride, INITIAL_PRODUCTS } from "@/lib/products";
import {
  Lock,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  LogOut,
  ArrowUpRight,
  CheckCircle,
  Save,
  X,
  Box,
} from "lucide-react";

const AVAILABLE_GLB_MODELS = [
  { label: "Screw Bangle (/models/lumeire_screw_bangle_3d.glb)", value: "/models/lumeire_screw_bangle_3d.glb" },
  { label: "Open Cuff & Screwdriver (/models/open_cuff_bracelet_3d.glb)", value: "/models/open_cuff_bracelet_3d.glb" },
  { label: "Nail Diamond Cuff (/models/nail_diamond_cuff_bracelet_3d.glb)", value: "/models/nail_diamond_cuff_bracelet_3d.glb" },
  { label: "Floral Motif Necklace (/models/floral_motif_necklaces_3d.glb)", value: "/models/floral_motif_necklaces_3d.glb" },
  { label: "Open Bangle (/models/lumeire_open_bangle_3d.glb)", value: "/models/lumeire_open_bangle_3d.glb" },
  { label: "Signature Link Bracelet (/models/lumeire_bracelet_3d.glb)", value: "/models/lumeire_bracelet_3d.glb" },
];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    // Check session login state
    const sessionAuth = sessionStorage.getItem("lumeire_owner_logged_in");
    if (sessionAuth === "true") {
      setAuthenticated(true);
      setProducts(getAllProducts());
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default Owner Secret Passcode (can also be authenticated against Supabase user)
    if (passcode === "lumeire2026" || passcode === "admin123" || passcode === "owner") {
      setAuthenticated(true);
      sessionStorage.setItem("lumeire_owner_logged_in", "true");
      setProducts(getAllProducts());
      setAuthError("");
    } else {
      setAuthError("Invalid owner credentials. Access denied.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("lumeire_owner_logged_in");
    setAuthenticated(false);
  };

  const handleTogglePublished = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, published: !p.published, updatedAt: new Date().toISOString() } : p
    );
    setProducts(updated);
    saveProductOverride(updated);
  };

  const handleToggleFeatured = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, featured: !p.featured, updatedAt: new Date().toISOString() } : p
    );
    setProducts(updated);
    saveProductOverride(updated);
  };

  const handleTogglePriceVisibility = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, showPrice: !p.showPrice, updatedAt: new Date().toISOString() } : p
    );
    setProducts(updated);
    saveProductOverride(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this piece from the catalogue?")) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      saveProductOverride(updated);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    let updated: Product[];
    if (isNew) {
      updated = [editingProduct, ...products];
    } else {
      updated = products.map((p) => (p.id === editingProduct.id ? editingProduct : p));
    }

    setProducts(updated);
    saveProductOverride(updated);
    setEditingProduct(null);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddNew = () => {
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: "New Luxury Creation",
      slug: `new-creation-${Date.now()}`,
      category: "Bangles",
      collection: "Iconic Atelier",
      description: "Handcrafted 18K gold masterwork forged in Dubai.",
      story: "Crafted with architectural precision for the modern collector.",
      price: 25000,
      currency: "AED",
      showPrice: true,
      model3D: AVAILABLE_GLB_MODELS[0].value,
      images: [],
      featured: false,
      published: true,
      sortOrder: products.length + 1,
      specifications: {
        material: "18K Solid Yellow Gold (AU 750)",
        finish: "Mirror Polish",
        origin: "Dubai, United Arab Emirates",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setIsNew(true);
    setEditingProduct(newProd);
  };

  const handleResetToDefault = () => {
    if (confirm("Reset catalogue to default 6 Lumeire creations?")) {
      setProducts(INITIAL_PRODUCTS);
      saveProductOverride(INITIAL_PRODUCTS);
    }
  };

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-obsidian-deep flex flex-col items-center justify-center p-6 text-ivory">
        <div className="w-full max-w-md p-8 rounded-2xl bg-obsidian border border-champagne/20 shadow-2xl space-y-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-16 h-16 mb-4">
              <Image
                src="/branding/lumeire_jewellery_logo.svg"
                alt="Lumeire Seal"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="font-serif text-2xl uppercase tracking-ultra-wide text-ivory">
              Owner Atelier Portal
            </h1>
            <p className="text-xs text-champagne/80 tracking-luxury uppercase mt-1">
              Lumeire Jewellery · Dubai
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-luxury text-ivory/60 block mb-1">
                Owner Access Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter owner secret"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-obsidian-deep border border-champagne/30 rounded-lg px-4 py-3 text-sm text-ivory focus:outline-none focus:border-champagne"
                  autoFocus
                />
                <Lock className="w-4 h-4 text-champagne absolute right-3 top-3.5" />
              </div>
              {authError && <p className="text-xs text-rose-400 mt-2">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-champagne hover:bg-champagne-light text-obsidian text-xs uppercase tracking-luxury font-medium py-3 rounded-lg transition-colors shadow-lg"
            >
              Authenticate & Enter
            </button>
          </form>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-[10px] uppercase tracking-luxury text-ivory/40 hover:text-champagne transition-colors"
            >
              Return to Public Website
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0E0E0E] text-ivory">
      {/* Top Admin Header */}
      <header className="bg-obsidian border-b border-champagne/20 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-serif text-xl tracking-ultra-wide text-champagne">
            LUMEIRE
          </Link>
          <span className="text-[10px] uppercase tracking-luxury text-ivory/40 border-l border-ivory/20 pl-4">
            Owner Studio Dashboard
          </span>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center space-x-1.5 text-ivory/70 hover:text-champagne transition-colors"
          >
            <span>Live Storefront</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 text-rose-400/80 hover:text-rose-400 border border-rose-500/20 px-3 py-1.5 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8">
        {/* Banner with Actions */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-champagne/15">
          <div>
            <h1 className="font-serif text-3xl text-ivory tracking-luxury">
              Catalogue Management
            </h1>
            <p className="text-xs text-ivory/60 mt-1 font-light">
              Manage your 3D GLB jewellery models, pricing in AED, descriptions, and storefront visibility.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleResetToDefault}
              className="text-xs border border-ivory/20 hover:border-ivory/40 text-ivory/60 px-4 py-2 rounded-lg transition-colors"
            >
              Reset to 6 Defaults
            </button>
            <button
              onClick={handleAddNew}
              className="flex items-center space-x-2 bg-champagne hover:bg-champagne-light text-obsidian text-xs font-medium uppercase tracking-wider px-4 py-2 rounded-lg transition-colors shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Creation</span>
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl flex items-center space-x-3 text-emerald-300 text-xs">
            <CheckCircle className="w-4 h-4" />
            <span>Changes successfully synchronized to storefront.</span>
          </div>
        )}

        {/* Product Table */}
        <div className="bg-obsidian border border-champagne/15 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-obsidian-deep border-b border-champagne/15 text-[10px] uppercase tracking-luxury text-champagne">
                <tr>
                  <th className="py-4 px-6">Creation</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Price (AED)</th>
                  <th className="py-4 px-4">3D GLB Model</th>
                  <th className="py-4 px-4">Featured</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-champagne/10 font-light">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <Box className="w-5 h-5 text-champagne shrink-0" />
                        <div>
                          <span className="font-medium text-ivory block">{p.name}</span>
                          <span className="text-[10px] text-ivory/40">/{p.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-ivory/70">{p.category}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-serif text-sm text-ivory">
                          {p.price.toLocaleString()} AED
                        </span>
                        <button
                          onClick={() => handleTogglePriceVisibility(p.id)}
                          title={p.showPrice ? "Price visible to public" : "Price hidden (Upon Request)"}
                          className="text-ivory/40 hover:text-champagne"
                        >
                          {p.showPrice ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-rose-400" />}
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-[10px] text-champagne/80 font-mono truncate max-w-[180px] block">
                        {p.model3D.split("/").pop()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleFeatured(p.id)}
                        className={`p-1 rounded ${p.featured ? "text-amber-400" : "text-ivory/20 hover:text-ivory/50"}`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleTogglePublished(p.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                          p.published
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                        }`}
                      >
                        {p.published ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right space-x-3">
                      <Link
                        href={`/jewellery/${p.slug}`}
                        target="_blank"
                        className="text-ivory/40 hover:text-champagne inline-block"
                        title="Preview on Live Site"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => {
                          setIsNew(false);
                          setEditingProduct({ ...p });
                        }}
                        className="text-ivory/60 hover:text-champagne"
                        title="Edit Details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-rose-400/60 hover:text-rose-400"
                        title="Delete Piece"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit / Create Modal Form */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 overflow-y-auto">
          <div className="bg-obsidian border border-champagne/30 rounded-2xl max-w-2xl w-full p-8 shadow-2xl my-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-champagne/20">
              <h2 className="font-serif text-2xl text-ivory uppercase tracking-luxury">
                {isNew ? "Create New Jewellery Piece" : `Edit: ${editingProduct.name}`}
              </h2>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-ivory/50 hover:text-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-luxury text-champagne block mb-1">
                    Piece Name
                  </label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                    className="w-full bg-obsidian-deep border border-champagne/25 rounded-lg px-3 py-2 text-ivory focus:outline-none focus:border-champagne"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-luxury text-champagne block mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={editingProduct.slug}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, slug: e.target.value })
                    }
                    className="w-full bg-obsidian-deep border border-champagne/25 rounded-lg px-3 py-2 text-ivory focus:outline-none focus:border-champagne"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-luxury text-champagne block mb-1">
                    Category
                  </label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value as Product["category"],
                      })
                    }
                    className="w-full bg-obsidian-deep border border-champagne/25 rounded-lg px-3 py-2 text-ivory focus:outline-none focus:border-champagne"
                  >
                    <option value="Bangles">Bangles</option>
                    <option value="Cuffs">Cuffs</option>
                    <option value="Bracelets">Bracelets</option>
                    <option value="Necklaces">Necklaces</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-luxury text-champagne block mb-1">
                    Collection
                  </label>
                  <input
                    type="text"
                    value={editingProduct.collection}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, collection: e.target.value })
                    }
                    className="w-full bg-obsidian-deep border border-champagne/25 rounded-lg px-3 py-2 text-ivory focus:outline-none focus:border-champagne"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-luxury text-champagne block mb-1">
                    Price (AED)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full bg-obsidian-deep border border-champagne/25 rounded-lg px-3 py-2 text-ivory focus:outline-none focus:border-champagne"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-luxury text-champagne block mb-1">
                  Attached 3D GLB Model
                </label>
                <select
                  value={editingProduct.model3D}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, model3D: e.target.value })
                  }
                  className="w-full bg-obsidian-deep border border-champagne/25 rounded-lg px-3 py-2 text-ivory font-mono focus:outline-none focus:border-champagne"
                >
                  {AVAILABLE_GLB_MODELS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-luxury text-champagne block mb-1">
                  Editorial Description
                </label>
                <textarea
                  rows={2}
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  className="w-full bg-obsidian-deep border border-champagne/25 rounded-lg px-3 py-2 text-ivory focus:outline-none focus:border-champagne"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-luxury text-champagne block mb-1">
                  Atelier Story & Heritage Notes
                </label>
                <textarea
                  rows={2}
                  value={editingProduct.story}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, story: e.target.value })
                  }
                  className="w-full bg-obsidian-deep border border-champagne/25 rounded-lg px-3 py-2 text-ivory focus:outline-none focus:border-champagne"
                />
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.showPrice}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, showPrice: e.target.checked })
                    }
                    className="rounded border-champagne/30 text-champagne focus:ring-0"
                  />
                  <span className="text-ivory/80">Display Price in AED</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.published}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, published: e.target.checked })
                    }
                    className="rounded border-champagne/30 text-champagne focus:ring-0"
                  />
                  <span className="text-ivory/80">Published to Storefront</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.featured}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, featured: e.target.checked })
                    }
                    className="rounded border-champagne/30 text-champagne focus:ring-0"
                  />
                  <span className="text-ivory/80">Featured Highlight</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-champagne/20">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 rounded-lg border border-ivory/20 text-ivory/70 hover:text-ivory"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-champagne hover:bg-champagne-light text-obsidian px-6 py-2.5 rounded-lg font-medium tracking-luxury uppercase shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Creation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
