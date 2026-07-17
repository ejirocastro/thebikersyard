"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { PRODUCTS, BIKE_MODELS } from "../data";
import { useGarageStore } from "../store";

const BADGE_STYLES: Record<string, string> = {
  "New": "bg-blue-500/90 text-white",
  "Sale": "bg-red-500/90 text-white",
  "Hot": "bg-accent/90 text-white",
  "Limited": "bg-amber-500/90 text-black",
  "Editor's Pick": "bg-white/90 text-black",
};

const COMMUNITY_REVIEWS = [
  { user: "RiderKev93", avatar: "bg-orange-500", bike: "2024 Ducati Panigale V4", rating: 5, date: "Jun 2026", body: "Absolutely transforms the sound and performance. Gained noticeable pull throughout the rev range. Install took about 2 hours with basic tools." },
  { user: "MotoJake_ZA", avatar: "bg-red-600", bike: "2024 BMW S1000RR", rating: 5, date: "May 2026", body: "Build quality is exceptional. The titanium finish looks incredible and the weight saving is real. Track tested — 100% recommend." },
  { user: "FastLane_Femi", avatar: "bg-amber-500", bike: "2023 Yamaha R1 M", rating: 4, date: "Apr 2026", body: "Great product overall. Sound note is deep and aggressive without being antisocial on the street. Slight heat soak near traffic but expected." },
  { user: "Brotherhood_Rider", avatar: "bg-zinc-500", bike: "2024 KTM 1290 Super Duke", rating: 5, date: "Mar 2026", body: "The packaging and presentation were premium, which set expectations high. Product absolutely delivered. This is what buying from Bikers Yard feels like." },
];

function StarDisplay({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "h-5 w-5" : "h-3.5 w-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} viewBox="0 0 24 24" fill={s <= Math.round(rating) ? "#f0810f" : "none"} stroke="#f0810f" strokeWidth={1.5} className={cls}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const product = PRODUCTS.find((p) => p.id === Number(id));

  const { selectedBike, addToCart, toggleWishlist, wishlist } = useGarageStore();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "install" | "compatibility" | "reviews">("specs");
  const [added, setAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col bg-[#0b0b0b]">
        <Navbar />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <p className="font-display text-2xl font-bold italic uppercase text-white/20">Product Not Found</p>
          <button onClick={() => router.push("/garage")} className="rounded-xl bg-accent px-6 py-2.5 text-sm font-bold text-white hover:bg-[#FF8A1D]">
            Back to Garage
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const inWishlist = wishlist.includes(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const isCompatible = selectedBike
    ? product.compatibleWith.includes("*") || product.compatibleWith.includes(selectedBike.key)
    : null;

  const compatibleBikes = BIKE_MODELS.filter(
    (b) => product.compatibleWith.includes("*") || product.compatibleWith.includes(b.key)
  );

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand)
  ).slice(0, 4);

  const frequentlyBought = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category !== product.category
  ).slice(0, 3);

  // simulated image panels (using gradient variants)
  const imagePanels = [
    product.gradient,
    `${product.gradient.split(" ")[0]} via-zinc-800 to-black`,
    `from-zinc-900 via-zinc-800 to-black`,
    `from-black via-zinc-900 ${product.gradient.split(" ").slice(-1)[0]}`,
  ];

  function handleAddToCart() {
    addToCart(product!.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0b0b0b]">
      <Navbar />

      {/* breadcrumb */}
      <div className="border-b border-[#2B2B2B] bg-[#0f0f0f]">
        <div className="mx-auto max-w-screen-xl px-4 py-3 sm:px-6 lg:px-10">
          <nav className="flex items-center gap-2 text-xs text-white/30">
            <button onClick={() => router.push("/garage")} className="hover:text-accent transition-colors">Garage</button>
            <span>/</span>
            <span className="capitalize">{product.category}</span>
            <span>/</span>
            <span className="text-white/60 truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <main className="flex-1">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-10">

          {/* ── MAIN PRODUCT SECTION ── */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">

            {/* LEFT — image gallery */}
            <div className="flex flex-col gap-3">
              {/* main image */}
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0.6, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`relative h-72 overflow-hidden rounded-2xl bg-gradient-to-br ${imagePanels[activeImageIndex]} sm:h-96 lg:h-[440px]`}
              >
                {/* brand watermark */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-5xl font-bold italic tracking-widest text-white/5 select-none sm:text-7xl">
                    {product.brand.toUpperCase()}
                  </span>
                </div>

                {/* product name overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 pb-5 pt-16">
                  <p className="text-xs font-bold uppercase tracking-widest text-accent/70">{product.brand}</p>
                  <p className="font-display text-lg font-bold italic uppercase text-white">{product.name}</p>
                </div>

                {/* badge */}
                {product.badge && (
                  <span className={`absolute left-4 top-4 rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wide ${BADGE_STYLES[product.badge]}`}>
                    {product.badge}
                  </span>
                )}

                {/* wishlist */}
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm transition-colors hover:bg-black/80"
                >
                  <svg viewBox="0 0 24 24" fill={inWishlist ? "#f0810f" : "none"} stroke={inWishlist ? "#f0810f" : "white"} strokeWidth={2} className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </motion.button>

                {/* compatibility pill on image */}
                {isCompatible !== null && (
                  <div className={`absolute left-4 bottom-16 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold backdrop-blur-sm ${isCompatible ? "bg-emerald-500/90 text-white" : "bg-red-500/80 text-white"}`}>
                    {isCompatible ? "✓ Fits Your Bike" : "✗ Not Compatible"}
                  </div>
                )}
              </motion.div>

              {/* thumbnail strip */}
              <div className="flex gap-2">
                {imagePanels.map((grad, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`relative h-16 flex-1 overflow-hidden rounded-xl bg-gradient-to-br ${grad} transition-all ${activeImageIndex === i ? "ring-2 ring-accent" : "opacity-50 hover:opacity-75"}`}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT — product info */}
            <div className="flex flex-col gap-5">
              {/* brand + name */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent/70">{product.brand} · {product.subcategory}</p>
                <h1 className="mt-1.5 font-display text-2xl font-bold italic uppercase leading-tight text-white sm:text-3xl">
                  {product.name}
                </h1>
                <p className="mt-1 text-xs text-white/30">SKU: {product.sku}</p>
              </div>

              {/* rating */}
              <div className="flex items-center gap-3">
                <StarDisplay rating={product.rating} size="lg" />
                <span className="text-sm font-bold text-white">{product.rating.toFixed(1)}</span>
                <span className="text-sm text-white/30">({product.reviews.toLocaleString()} reviews)</span>
                <span className="text-sm text-accent underline cursor-pointer hover:text-[#FF8A1D]" onClick={() => setActiveTab("reviews")}>
                  Read reviews
                </span>
              </div>

              {/* price */}
              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl font-bold text-accent">${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-white/30 line-through">${product.originalPrice.toLocaleString()}</span>
                )}
                {discount && (
                  <span className="rounded-lg bg-red-500/20 px-2 py-0.5 text-sm font-bold text-red-400">
                    Save {discount}%
                  </span>
                )}
              </div>

              {/* description */}
              <p className="text-sm leading-relaxed text-white/50 border-t border-[#2B2B2B] pt-4">
                {product.description}
              </p>

              {/* stock + delivery */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${product.stock > 5 ? "bg-emerald-500" : product.stock > 0 ? "bg-amber-500" : "bg-red-500"}`} />
                  <span className="text-white/50">
                    {product.stock > 5 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/40">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-accent/50">
                    <rect x="1" y="3" width="15" height="13" rx="1" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                  Ships in {product.delivery}
                </div>
                {product.instantBook && (
                  <div className="flex items-center gap-2 text-accent">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    Express Available
                  </div>
                )}
              </div>

              {/* qty + add to cart */}
              <div className="flex flex-wrap items-center gap-3 border-t border-[#2B2B2B] pt-4">
                <div className="flex items-center overflow-hidden rounded-xl border border-[#2B2B2B] bg-[#151515]">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 text-white/40 transition-colors hover:text-white">−</button>
                  <span className="w-10 text-center text-sm font-bold text-white">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="px-4 py-3 text-white/40 transition-colors hover:text-white">+</button>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${
                    added ? "bg-emerald-600 text-white" : "bg-accent text-white hover:bg-[#FF8A1D] shadow-[0_0_24px_rgba(240,107,0,0.25)]"
                  } disabled:opacity-40`}
                >
                  {added ? (
                    <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> Added to Cart!</>
                  ) : (
                    <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4"><path strokeLinecap="round" d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path strokeLinecap="round" d="M16 10a4 4 0 01-8 0" /></svg> Add to Cart</>
                  )}
                </motion.button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-colors ${inWishlist ? "border-accent/40 bg-accent/10 text-accent" : "border-[#2B2B2B] text-white/30 hover:border-accent/20 hover:text-accent"}`}
                >
                  <svg viewBox="0 0 24 24" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              {/* buy now */}
              <button className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-bold text-white transition-colors hover:border-white/20 hover:bg-white/8">
                Buy Now — Instant Checkout
              </button>

              {/* trust badges */}
              <div className="grid grid-cols-3 gap-2 rounded-2xl border border-[#2B2B2B] bg-[#111] p-4">
                {[
                  { icon: "🔒", label: "Secure Payment" },
                  { icon: "↩️", label: "Free Returns" },
                  { icon: "✅", label: "Genuine Parts" },
                ].map((b) => (
                  <div key={b.label} className="flex flex-col items-center gap-1 text-center">
                    <span className="text-xl">{b.icon}</span>
                    <span className="text-[10px] font-semibold text-white/35">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── TABS ── */}
          <div className="mt-14">
            <div className="flex gap-1 overflow-x-auto border-b border-[#2B2B2B]" style={{ scrollbarWidth: "none" }}>
              {(["specs", "compatibility", "install", "reviews"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative shrink-0 px-5 py-3 text-sm font-semibold capitalize transition-colors ${
                    activeTab === tab ? "text-white" : "text-white/35 hover:text-white/60"
                  }`}
                >
                  {tab === "reviews" ? `Reviews (${product.reviews.toLocaleString()})` : tab === "install" ? "Installation" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-6"
              >
                {/* SPECS */}
                {activeTab === "specs" && (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="flex items-start gap-3 rounded-xl border border-[#2B2B2B] bg-[#111] px-4 py-3">
                        <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">{key}</p>
                          <p className="mt-0.5 text-sm font-semibold text-white">{val}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-start gap-3 rounded-xl border border-[#2B2B2B] bg-[#111] px-4 py-3">
                      <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Category</p>
                        <p className="mt-0.5 text-sm font-semibold text-white capitalize">{product.subcategory}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl border border-[#2B2B2B] bg-[#111] px-4 py-3">
                      <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Manufacturer</p>
                        <p className="mt-0.5 text-sm font-semibold text-white">{product.brand}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* COMPATIBILITY */}
                {activeTab === "compatibility" && (
                  <div>
                    {selectedBike && (
                      <div className={`mb-6 flex items-center gap-3 rounded-2xl border p-4 ${isCompatible ? "border-emerald-500/30 bg-emerald-500/8" : "border-red-500/30 bg-red-500/8"}`}>
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${isCompatible ? "bg-emerald-500/20" : "bg-red-500/20"}`}>
                          {isCompatible ? "✓" : "✗"}
                        </div>
                        <div>
                          <p className={`text-sm font-bold ${isCompatible ? "text-emerald-400" : "text-red-400"}`}>
                            {isCompatible ? "Fits Your Bike" : "Not Compatible"}
                          </p>
                          <p className="text-xs text-white/40">
                            {selectedBike.year} {selectedBike.make} {selectedBike.model} {selectedBike.variant}
                          </p>
                        </div>
                      </div>
                    )}
                    <p className="mb-4 text-sm font-bold uppercase tracking-widest text-white/30">
                      Compatible with {compatibleBikes.length} motorcycle{compatibleBikes.length !== 1 ? "s" : ""}
                      {product.compatibleWith.includes("*") && " (Universal Fit)"}
                    </p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {(product.compatibleWith.includes("*") ? BIKE_MODELS : compatibleBikes).map((bike) => (
                        <div key={bike.key} className="flex items-center gap-3 rounded-xl border border-[#2B2B2B] bg-[#111] px-4 py-3">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#f0810f" strokeWidth={1.5} className="h-5 w-5 shrink-0 opacity-60">
                            <circle cx="5.5" cy="17.5" r="3.5" /><circle cx="18.5" cy="17.5" r="3.5" />
                            <path strokeLinecap="round" d="M8 17.5h7M15 6h2l2 5" /><path strokeLinecap="round" d="M9 17.5L7 10l3-3h4l2 3H9z" />
                          </svg>
                          <div>
                            <p className="text-xs font-semibold text-white">{bike.year} {bike.make} {bike.model}</p>
                            <p className="text-[10px] text-white/35">{bike.variant} · {bike.engine}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* INSTALLATION */}
                {activeTab === "install" && (
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="lg:col-span-2 flex flex-col gap-4">
                      {[
                        { step: 1, title: "Gather Tools", desc: "You'll need a torque wrench (10–25 Nm range), socket set, Allen keys, and thread-lock compound. Allow 2–3 hours for first-time install." },
                        { step: 2, title: "Prepare the Bike", desc: "Allow engine to cool completely (minimum 30 minutes). Lift bike on paddock stand and disconnect the battery negative terminal before starting." },
                        { step: 3, title: "Remove Stock Component", desc: "Follow the OEM service manual for your specific model. Take photos of the stock installation before removal for reference. Retain all original hardware." },
                        { step: 4, title: "Install & Torque", desc: "Follow the included installation guide. Apply thread-lock to all fasteners. Torque to specification — never over-tighten. Allow sealant to cure before riding." },
                        { step: 5, title: "Test & Verify", desc: "Start the engine and check for leaks, unusual sounds, or warning lights. Conduct a slow-speed test before returning to normal riding. Re-check torque after first 100km." },
                      ].map((s) => (
                        <div key={s.step} className="flex gap-4 rounded-xl border border-[#2B2B2B] bg-[#111] p-4">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                            {s.step}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{s.title}</p>
                            <p className="mt-1 text-xs leading-relaxed text-white/45">{s.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="rounded-2xl border border-[#2B2B2B] bg-[#111] p-5">
                        <p className="text-sm font-bold text-white mb-3">Need Help?</p>
                        <div className="flex flex-col gap-2 text-xs text-white/45">
                          <p>📖 Download installation manual</p>
                          <p>🎥 Watch installation video</p>
                          <p>💬 Ask the community</p>
                          <p>📞 Contact support</p>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/8 p-5">
                        <p className="text-xs font-bold text-amber-400 mb-2">⚠️ Professional Install Recommended</p>
                        <p className="text-xs text-white/40 leading-relaxed">Some installations may affect your motorcycle warranty. Consider professional installation for warranty peace of mind.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* REVIEWS */}
                {activeTab === "reviews" && (
                  <div className="flex flex-col gap-6">
                    {/* summary */}
                    <div className="flex flex-col gap-6 rounded-2xl border border-[#2B2B2B] bg-[#111] p-6 sm:flex-row sm:items-center">
                      <div className="flex flex-col items-center gap-1 sm:border-r sm:border-[#2B2B2B] sm:pr-8">
                        <span className="font-display text-6xl font-bold italic text-accent">{product.rating.toFixed(1)}</span>
                        <StarDisplay rating={product.rating} size="lg" />
                        <span className="text-xs text-white/35">{product.reviews.toLocaleString()} reviews</span>
                      </div>
                      <div className="flex flex-1 flex-col gap-2">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const pct = star === 5 ? 72 : star === 4 ? 20 : star === 3 ? 5 : star === 2 ? 2 : 1;
                          return (
                            <div key={star} className="flex items-center gap-3">
                              <span className="w-4 text-right text-xs text-white/40">{star}</span>
                              <svg viewBox="0 0 24 24" fill="#f0810f" className="h-3 w-3"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                              <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-white/8">
                                <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
                              </div>
                              <span className="w-8 text-xs text-white/30">{pct}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* reviews list */}
                    {COMMUNITY_REVIEWS.map((r, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="rounded-2xl border border-[#2B2B2B] bg-[#111] p-5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${r.avatar} text-xs font-bold text-white`}>
                              {r.user.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white">{r.user}</p>
                              <p className="text-[10px] text-white/35">🏍️ {r.bike}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <StarDisplay rating={r.rating} />
                            <span className="text-[10px] text-white/25">{r.date}</span>
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-white/55">{r.body}</p>
                        <div className="mt-3 flex items-center gap-3">
                          <button className="text-xs text-white/25 hover:text-white/50 transition-colors">👍 Helpful</button>
                          <button className="text-xs text-white/25 hover:text-white/50 transition-colors">Share</button>
                        </div>
                      </motion.div>
                    ))}

                    <button className="rounded-xl border border-[#2B2B2B] py-3 text-sm font-semibold text-white/40 transition-colors hover:border-accent/30 hover:text-accent">
                      Load more reviews
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── FREQUENTLY BOUGHT TOGETHER ── */}
          <div className="mt-14">
            <h2 className="mb-5 font-display text-xl font-bold italic uppercase tracking-wide text-white">
              Frequently Bought Together
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {frequentlyBought.map((p) => (
                <motion.div
                  key={p.id}
                  whileHover={{ y: -4 }}
                  onClick={() => router.push(`/garage/${p.id}`)}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#2B2B2B] bg-[#111] p-4 transition-all hover:border-accent/20"
                >
                  <div className={`h-14 w-14 shrink-0 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                    <span className="text-[9px] font-bold text-white/20">{p.brand.slice(0, 3).toUpperCase()}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-white">{p.name}</p>
                    <p className="text-[10px] text-white/35">{p.brand}</p>
                    <p className="text-sm font-bold text-accent mt-0.5">${p.price.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); addToCart(p.id); }}
                    className="shrink-0 rounded-lg bg-accent/10 px-3 py-1.5 text-[10px] font-bold text-accent transition-colors hover:bg-accent hover:text-white"
                  >
                    + Add
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── RELATED PRODUCTS ── */}
          <div className="mt-14">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold italic uppercase tracking-wide text-white">
                Related Products
              </h2>
              <button onClick={() => router.push("/garage")} className="text-xs font-semibold text-accent hover:underline">
                View all
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {relatedProducts.map((p) => (
                <motion.div
                  key={p.id}
                  whileHover={{ y: -4 }}
                  onClick={() => router.push(`/garage/${p.id}`)}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-[#2B2B2B] bg-[#151515] transition-all hover:border-accent/20"
                >
                  <div className={`h-28 bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                    <span className="font-display text-sm font-bold italic text-white/8">{p.brand.toUpperCase()}</span>
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-accent/60">{p.brand}</p>
                    <p className="mt-0.5 truncate text-xs font-bold text-white group-hover:text-accent transition-colors">{p.name}</p>
                    <p className="mt-1 text-sm font-bold text-accent">${p.price.toLocaleString()}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
