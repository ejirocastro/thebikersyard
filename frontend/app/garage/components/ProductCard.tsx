"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGarageStore } from "../store";
import type { Product } from "../data";

const BADGE_STYLES: Record<string, string> = {
  "New": "bg-blue-500/90 text-white",
  "Sale": "bg-red-500/90 text-white",
  "Hot": "bg-accent/90 text-white",
  "Limited": "bg-amber-500/90 text-black",
  "Editor's Pick": "bg-white/90 text-black",
};

export default function ProductCard({ product }: { product: Product }) {
  const { selectedBike, toggleWishlist, wishlist, addToCart, cart, toggleCompare, compareList } = useGarageStore();
  const [added, setAdded] = useState(false);

  const isCompatible = selectedBike
    ? product.compatibleWith.includes("*") || product.compatibleWith.includes(selectedBike.key)
    : null;

  const inWishlist = wishlist.includes(product.id);
  const inCart = cart.some((i) => i.productId === product.id);
  const inCompare = compareList.includes(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  function handleAddToCart() {
    addToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#2B2B2B] bg-[#151515] transition-all hover:border-accent/25 hover:shadow-[0_16px_48px_rgba(0,0,0,0.6),0_0_0_1px_rgba(240,107,0,0.06)]"
    >
      {/* image area */}
      <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${product.gradient} sm:h-48`}>
        {/* label watermark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-xl font-bold italic tracking-widest text-white/8 select-none">
            {product.brand.toUpperCase()}
          </span>
        </div>

        {/* compatibility indicator */}
        {isCompatible !== null && (
          <div className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-bold backdrop-blur-sm ${isCompatible ? "bg-emerald-500/90 text-white" : "bg-red-500/80 text-white"}`}>
            {isCompatible ? (
              <><svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg> Fits Your Bike</>
            ) : (
              <><svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5"><path d="M2 2l8 8M10 2l-8 8" stroke="white" strokeWidth={1.5} strokeLinecap="round" /></svg> Not Compatible</>
            )}
          </div>
        )}

        {/* badge */}
        {product.badge && (
          <span className={`absolute ${isCompatible !== null ? "top-10" : "top-3"} left-3 rounded-lg px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm ${BADGE_STYLES[product.badge]}`}>
            {product.badge}
          </span>
        )}

        {/* discount */}
        {discount && (
          <span className="absolute right-3 top-3 rounded-lg bg-red-500/90 px-2 py-0.5 text-[10px] font-bold text-white">
            -{discount}%
          </span>
        )}

        {/* wishlist */}
        <motion.button
          onClick={() => toggleWishlist(product.id)}
          whileTap={{ scale: 0.85 }}
          className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm transition-colors hover:bg-black/80"
        >
          <svg viewBox="0 0 24 24" fill={inWishlist ? "#f0810f" : "none"} stroke={inWishlist ? "#f0810f" : "white"} strokeWidth={2} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </motion.button>

        {/* stock */}
        {product.stock <= 5 && (
          <span className="absolute bottom-3 left-3 rounded-lg bg-amber-500/90 px-2 py-0.5 text-[10px] font-bold text-black">
            Only {product.stock} left
          </span>
        )}
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* brand + name */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-accent/70">{product.brand}</p>
          <h3 className="mt-0.5 font-display text-sm font-bold uppercase tracking-wide text-white line-clamp-2 group-hover:text-white transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-white/35 line-clamp-2">{product.description}</p>
        </div>

        {/* rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[1,2,3,4,5].map((s) => (
              <svg key={s} viewBox="0 0 24 24" fill={s <= Math.round(product.rating) ? "#f0810f" : "none"} stroke="#f0810f" strokeWidth={1.5} className="h-3 w-3">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="text-[10px] font-semibold text-white/40">({product.reviews.toLocaleString()})</span>
        </div>

        {/* price */}
        <div className="flex items-baseline gap-2">
          <span className="font-display text-xl font-bold text-accent">${product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-white/30 line-through">${product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* delivery */}
        <p className="flex items-center gap-1.5 text-[11px] text-white/35">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3 text-accent/50">
            <rect x="1" y="3" width="15" height="13" rx="1" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
          Ships in {product.delivery}
        </p>

        {/* compare */}
        <label className="flex cursor-pointer items-center gap-2">
          <div
            onClick={() => toggleCompare(product.id)}
            className={`flex h-3.5 w-3.5 items-center justify-center rounded border transition-colors ${inCompare ? "border-accent bg-accent" : "border-white/20"}`}
          >
            {inCompare && <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg>}
          </div>
          <span className="text-[10px] text-white/35">Add to compare</span>
        </label>

        {/* CTA */}
        <button
          onClick={handleAddToCart}
          className={`mt-auto w-full rounded-xl py-2.5 text-xs font-bold transition-all ${
            added
              ? "bg-emerald-600 text-white"
              : inCart
              ? "border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-white"
              : "bg-accent text-white hover:bg-[#FF8A1D]"
          }`}
        >
          {added ? "✓ Added to Cart" : inCart ? "In Cart · Add More" : "Add to Cart"}
        </button>
      </div>
    </motion.div>
  );
}
