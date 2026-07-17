"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGarageStore } from "../store";
import { PRODUCTS, CATEGORIES } from "../data";

const TRENDING = ["Akrapovič Exhaust", "Brembo Calipers", "Shoei Helmet", "Öhlins Shock", "Alpinestars Jacket"];

export default function GarageSearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const { recentSearches, addRecentSearch } = useGarageStore();
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = value.length > 1
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.brand.toLowerCase().includes(value.toLowerCase()) ||
        p.category.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setFocused(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleSelect(term: string) {
    onChange(term);
    addRecentSearch(term);
    setFocused(false);
    inputRef.current?.blur();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim()) { addRecentSearch(value.trim()); setFocused(false); }
  }

  const showDropdown = focused;

  return (
    <div ref={ref} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all ${focused ? "border-accent/40 shadow-[0_0_0_3px_rgba(240,107,0,0.08)]" : "border-white/10"} bg-[#151515]`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={`h-4 w-4 shrink-0 transition-colors ${focused ? "text-accent" : "text-white/30"}`}>
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="m21 21-4.35-4.35" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder="Search by model, product, SKU, brand or category..."
            className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none"
          />

          {value && (
            <button type="button" onClick={() => { onChange(""); inputRef.current?.focus(); }} className="text-white/30 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          <button type="submit" className="flex items-center gap-1.5 rounded-xl bg-accent px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#FF8A1D]">
            Search
          </button>
        </div>
      </form>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-[0_24px_80px_rgba(0,0,0,0.8)]"
          >
            {/* live suggestions */}
            {suggestions.length > 0 && (
              <div className="border-b border-white/8 p-2">
                {suggestions.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(p.name)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-white/5"
                  >
                    <div className={`h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#f0810f" strokeWidth={2} className="h-3.5 w-3.5">
                        <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-white">{p.name}</p>
                      <p className="text-[10px] text-white/40">{p.brand} · {p.category}</p>
                    </div>
                    <span className="text-xs font-bold text-accent">${p.price}</span>
                  </button>
                ))}
              </div>
            )}

            {/* recent searches */}
            {recentSearches.length > 0 && !value && (
              <div className="border-b border-white/8 p-3">
                <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-white/25">Recent</p>
                <div className="flex flex-wrap gap-1.5">
                  {recentSearches.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSelect(s)}
                      className="flex items-center gap-1.5 rounded-xl border border-white/8 bg-white/4 px-3 py-1.5 text-xs text-white/60 transition-colors hover:border-accent/20 hover:text-accent"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
                        <polyline points="9 14 4 9 9 4" /><path d="M20 20v-7a4 4 0 0 0-4-4H4" />
                      </svg>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* trending */}
            {!value && (
              <div className="p-3">
                <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-white/25">Trending</p>
                <div className="flex flex-col gap-0.5">
                  {TRENDING.map((t, i) => (
                    <button
                      key={t}
                      onClick={() => handleSelect(t)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/5"
                    >
                      <span className="text-[10px] font-bold text-accent/50 w-4">{i + 1}</span>
                      <span className="text-xs text-white/60">{t}</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="ml-auto h-3 w-3 text-white/20">
                        <path strokeLinecap="round" d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* quick categories */}
            {!value && (
              <div className="border-t border-white/8 p-3">
                <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-white/25">Popular Categories</p>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.slice(0, 8).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelect(c.label)}
                      className="rounded-xl border border-white/8 bg-white/4 px-3 py-1.5 text-xs text-white/60 transition-colors hover:border-accent/20 hover:text-accent"
                    >
                      {c.icon} {c.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
