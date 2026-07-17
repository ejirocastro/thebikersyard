"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import { PRODUCTS, CATEGORIES } from "../data";
import { useGarageStore } from "../store";
import type { GarageFilters } from "./FilterSidebar";

const PAGE_SIZE = 8;

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

export default function ProductGrid({
  search,
  categoryFilter,
  filters,
  onOpenMobileFilters,
}: {
  search: string;
  categoryFilter: string;
  filters: GarageFilters;
  onOpenMobileFilters: () => void;
}) {
  const { selectedBike } = useGarageStore();
  const [sort, setSort] = useState("featured");
  const [compatibleOnly, setCompatibleOnly] = useState(false);
  const [page, setPage] = useState(1);

  let products = PRODUCTS.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());

    const matchCat = !categoryFilter || p.category === categoryFilter;

    const matchCompat =
      !compatibleOnly ||
      !selectedBike ||
      p.compatibleWith.includes("*") ||
      p.compatibleWith.includes(selectedBike.key);

    const matchBrand = !filters.brands.length || filters.brands.includes(p.brand);
    const matchFilterCat = !filters.categories.length || filters.categories.includes(p.category);
    const matchPrice = p.price >= filters.priceMin && p.price <= filters.priceMax;
    const matchRating = !filters.rating || p.rating >= filters.rating;
    const matchStock = !filters.inStockOnly || p.stock > 0;
    const matchDiscount = !filters.hasDiscount || !!p.originalPrice;

    return matchSearch && matchCat && matchCompat && matchBrand && matchFilterCat && matchPrice && matchRating && matchStock && matchDiscount;
  });

  products = [...products].sort((a, b) => {
    if (sort === "price_asc") return a.price - b.price;
    if (sort === "price_desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "newest") return b.id - a.id;
    return 0;
  });

  const total = products.length;
  const visible = products.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < total;

  const categoryLabel = categoryFilter
    ? CATEGORIES.find((c) => c.id === categoryFilter)?.label
    : null;

  // count active sidebar filters for mobile badge
  const sidebarCount =
    filters.brands.length +
    filters.categories.length +
    (filters.priceMin > 0 || filters.priceMax < 5000 ? 1 : 0) +
    (filters.rating ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.hasDiscount ? 1 : 0);

  return (
    <div>
      {/* toolbar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-display text-2xl font-bold italic uppercase tracking-wide text-white">
            {categoryLabel ?? "All Products"}
          </h2>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/40">
            {total} results
          </span>
          {selectedBike && (
            <span className="rounded-full border border-accent/20 bg-accent/8 px-3 py-1 text-xs text-accent">
              🏍️ {selectedBike.make} {selectedBike.model}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* mobile filter trigger */}
          <button
            onClick={onOpenMobileFilters}
            className={`relative flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors lg:hidden ${sidebarCount > 0 ? "border-accent/40 bg-accent/10 text-accent" : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
              <path strokeLinecap="round" d="M3 6h18M6 12h12M9 18h6" />
            </svg>
            Filters
            {sidebarCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
                {sidebarCount}
              </span>
            )}
          </button>

          {selectedBike && (
            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2">
              <div
                onClick={() => setCompatibleOnly((v) => !v)}
                className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${compatibleOnly ? "border-accent bg-accent" : "border-white/20"}`}
              >
                {compatibleOnly && (
                  <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-xs font-semibold text-white/60">Compatible only</span>
            </label>
          )}

          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            className="rounded-xl border border-white/10 bg-[#151515] px-3 py-2 text-xs text-white/60 outline-none focus:border-accent"
          >
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* grid */}
      {visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <svg viewBox="0 0 64 64" fill="none" className="h-16 w-16 text-white/8">
            <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" />
            <path d="M20 32h24M32 20v24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p className="font-display text-xl font-bold italic uppercase text-white/20">No Products Found</p>
          <p className="text-sm text-white/30">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: (i % PAGE_SIZE) * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* load more */}
      {hasMore && (
        <div className="mt-10 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setPage((p) => p + 1)}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition-colors hover:border-accent/30 hover:text-accent"
          >
            Load More
            <span className="text-xs text-white/30">{total - visible.length} remaining</span>
          </motion.button>
        </div>
      )}
    </div>
  );
}
