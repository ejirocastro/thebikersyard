"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, CATEGORIES } from "../data";

export interface GarageFilters {
  brands: string[];
  categories: string[];
  priceMin: number;
  priceMax: number;
  rating: number | null;
  inStockOnly: boolean;
  hasDiscount: boolean;
}

export const DEFAULT_FILTERS: GarageFilters = {
  brands: [],
  categories: [],
  priceMin: 0,
  priceMax: 5000,
  rating: null,
  inStockOnly: false,
  hasDiscount: false,
};

const PRICE_MAX = 5000;

const ALL_BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))].sort();

function activeFilterCount(f: GarageFilters): number {
  let n = 0;
  if (f.brands.length) n++;
  if (f.categories.length) n++;
  if (f.priceMin > 0 || f.priceMax < PRICE_MAX) n++;
  if (f.rating) n++;
  if (f.inStockOnly) n++;
  if (f.hasDiscount) n++;
  return n;
}

/* ── SHARED SIDEBAR CONTENT ── */
function SidebarContent({
  filters,
  onChange,
  onReset,
}: {
  filters: GarageFilters;
  onChange: (f: GarageFilters) => void;
  onReset: () => void;
}) {
  const [brandsExpanded, setBrandsExpanded] = useState(true);
  const [catsExpanded, setCatsExpanded] = useState(true);
  const [priceExpanded, setPriceExpanded] = useState(true);

  function toggleBrand(brand: string) {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands: next });
  }

  function toggleCategory(id: string) {
    const next = filters.categories.includes(id)
      ? filters.categories.filter((c) => c !== id)
      : [...filters.categories, id];
    onChange({ ...filters, categories: next });
  }

  const count = activeFilterCount(filters);

  return (
    <div className="flex flex-col gap-0">
      {/* header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#2B2B2B]">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-accent">
            <path strokeLinecap="round" d="M3 6h18M6 12h12M9 18h6" />
          </svg>
          <span className="text-sm font-bold text-white">Filters</span>
          {count > 0 && (
            <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white">{count}</span>
          )}
        </div>
        {count > 0 && (
          <button onClick={onReset} className="text-xs text-accent hover:underline">
            Reset all
          </button>
        )}
      </div>

      <div className="flex flex-col overflow-y-auto" style={{ maxHeight: "calc(100vh - 180px)", scrollbarWidth: "none" }}>

        {/* ── BRANDS ── */}
        <div className="border-b border-[#2B2B2B]">
          <button
            onClick={() => setBrandsExpanded((v) => !v)}
            className="flex w-full items-center justify-between px-5 py-3.5 transition-colors hover:bg-white/2"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-white/60">Brand</span>
            <svg
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              className={`h-3.5 w-3.5 text-white/30 transition-transform ${brandsExpanded ? "" : "-rotate-90"}`}
            >
              <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <AnimatePresence initial={false}>
            {brandsExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-1 px-4 pb-4">
                  {ALL_BRANDS.map((brand) => {
                    const checked = filters.brands.includes(brand);
                    const count = PRODUCTS.filter((p) => p.brand === brand).length;
                    return (
                      <label
                        key={brand}
                        className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/3"
                      >
                        <div
                          onClick={() => toggleBrand(brand)}
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${checked ? "border-accent bg-accent" : "border-white/20"}`}
                        >
                          {checked && (
                            <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5">
                              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <span className={`flex-1 text-xs transition-colors ${checked ? "text-white" : "text-white/50"}`}>
                          {brand}
                        </span>
                        <span className="text-[10px] text-white/20">{count}</span>
                      </label>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── CATEGORY ── */}
        <div className="border-b border-[#2B2B2B]">
          <button
            onClick={() => setCatsExpanded((v) => !v)}
            className="flex w-full items-center justify-between px-5 py-3.5 transition-colors hover:bg-white/2"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-white/60">Category</span>
            <svg
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              className={`h-3.5 w-3.5 text-white/30 transition-transform ${catsExpanded ? "" : "-rotate-90"}`}
            >
              <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <AnimatePresence initial={false}>
            {catsExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-1 px-4 pb-4">
                  {CATEGORIES.map((cat) => {
                    const checked = filters.categories.includes(cat.id);
                    const count = PRODUCTS.filter((p) => p.category === cat.id).length;
                    return (
                      <label
                        key={cat.id}
                        className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/3"
                      >
                        <div
                          onClick={() => toggleCategory(cat.id)}
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${checked ? "border-accent bg-accent" : "border-white/20"}`}
                        >
                          {checked && (
                            <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5">
                              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <span className="mr-1 text-sm">{cat.icon}</span>
                        <span className={`flex-1 text-xs transition-colors ${checked ? "text-white" : "text-white/50"}`}>
                          {cat.label}
                        </span>
                        <span className="text-[10px] text-white/20">{count}</span>
                      </label>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── PRICE RANGE ── */}
        <div className="border-b border-[#2B2B2B]">
          <button
            onClick={() => setPriceExpanded((v) => !v)}
            className="flex w-full items-center justify-between px-5 py-3.5 transition-colors hover:bg-white/2"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-white/60">Price Range</span>
            <svg
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              className={`h-3.5 w-3.5 text-white/30 transition-transform ${priceExpanded ? "" : "-rotate-90"}`}
            >
              <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <AnimatePresence initial={false}>
            {priceExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-white">${filters.priceMin.toLocaleString()}</span>
                    <span className="text-xs text-white/30">—</span>
                    <span className="text-xs font-semibold text-white">
                      ${filters.priceMax >= PRICE_MAX ? `${PRICE_MAX.toLocaleString()}+` : filters.priceMax.toLocaleString()}
                    </span>
                  </div>

                  {/* Min slider */}
                  <div className="relative mb-2">
                    <input
                      type="range" min={0} max={PRICE_MAX} step={50}
                      value={filters.priceMin}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val <= filters.priceMax - 100) onChange({ ...filters, priceMin: val });
                      }}
                      className="price-slider w-full"
                    />
                  </div>
                  {/* Max slider */}
                  <div className="relative">
                    <input
                      type="range" min={0} max={PRICE_MAX} step={50}
                      value={filters.priceMax}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val >= filters.priceMin + 100) onChange({ ...filters, priceMax: val });
                      }}
                      className="price-slider w-full"
                    />
                  </div>

                  {/* quick price chips */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {[
                      { label: "Under $500", min: 0, max: 500 },
                      { label: "$500–$1k", min: 500, max: 1000 },
                      { label: "$1k–$2k", min: 1000, max: 2000 },
                      { label: "$2k+", min: 2000, max: PRICE_MAX },
                    ].map((chip) => {
                      const active = filters.priceMin === chip.min && filters.priceMax === chip.max;
                      return (
                        <button
                          key={chip.label}
                          onClick={() => onChange({ ...filters, priceMin: chip.min, priceMax: chip.max })}
                          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors border ${active ? "border-accent bg-accent/15 text-accent" : "border-white/10 text-white/35 hover:border-white/20 hover:text-white/60"}`}
                        >
                          {chip.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── RATING ── */}
        <div className="border-b border-[#2B2B2B] px-5 py-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/60">Min Rating</p>
          <div className="flex gap-2">
            {[4, 3, 2].map((star) => {
              const active = filters.rating === star;
              return (
                <button
                  key={star}
                  onClick={() => onChange({ ...filters, rating: active ? null : star })}
                  className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${active ? "border-accent bg-accent/15 text-accent" : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"}`}
                >
                  <svg viewBox="0 0 24 24" fill="#f0810f" className="h-3 w-3">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {star}+
                </button>
              );
            })}
          </div>
        </div>

        {/* ── TOGGLES ── */}
        <div className="px-5 py-4 flex flex-col gap-3">
          <label className="flex cursor-pointer items-center justify-between gap-3">
            <span className="text-xs font-semibold text-white/60">In Stock Only</span>
            <div
              onClick={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
              className={`relative h-5 w-9 rounded-full transition-colors ${filters.inStockOnly ? "bg-accent" : "bg-white/10"}`}
            >
              <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${filters.inStockOnly ? "translate-x-4" : "translate-x-0.5"}`} />
            </div>
          </label>

          <label className="flex cursor-pointer items-center justify-between gap-3">
            <span className="text-xs font-semibold text-white/60">On Sale</span>
            <div
              onClick={() => onChange({ ...filters, hasDiscount: !filters.hasDiscount })}
              className={`relative h-5 w-9 rounded-full transition-colors ${filters.hasDiscount ? "bg-accent" : "bg-white/10"}`}
            >
              <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${filters.hasDiscount ? "translate-x-4" : "translate-x-0.5"}`} />
            </div>
          </label>
        </div>

      </div>
    </div>
  );
}

/* ── DESKTOP SIDEBAR ── */
export function FilterSidebarDesktop({
  filters,
  onChange,
  onReset,
}: {
  filters: GarageFilters;
  onChange: (f: GarageFilters) => void;
  onReset: () => void;
}) {
  return (
    <aside className="hidden lg:block w-56 xl:w-64 shrink-0 self-start sticky top-[113px] rounded-2xl border border-[#2B2B2B] bg-[#111] overflow-hidden">
      <SidebarContent filters={filters} onChange={onChange} onReset={onReset} />
    </aside>
  );
}

/* ── MOBILE BOTTOM SHEET ── */
export function FilterSidebarMobile({
  open,
  onClose,
  filters,
  onChange,
  onReset,
}: {
  open: boolean;
  onClose: () => void;
  filters: GarageFilters;
  onChange: (f: GarageFilters) => void;
  onReset: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden rounded-t-3xl border-t border-[#2B2B2B] bg-[#111] lg:hidden"
            style={{ maxHeight: "88vh" }}
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-1 w-10 rounded-full bg-white/15" />
            </div>
            <SidebarContent filters={filters} onChange={onChange} onReset={onReset} />
            <div className="border-t border-[#2B2B2B] bg-[#111] px-5 py-4">
              <button
                onClick={onClose}
                className="w-full rounded-xl bg-accent py-3 text-sm font-bold text-white transition-colors hover:bg-[#FF8A1D]"
              >
                Show Results
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
