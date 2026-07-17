"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { CATEGORIES } from "../../stays/data";

export default function StayCategoryBar({
  active,
  onChange,
}: {
  active: string;
  onChange: (cat: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    ref.current?.scrollBy({ left: dir === "left" ? -240 : 240, behavior: "smooth" });
  }

  return (
    <div className="relative flex items-center">
      {/* left arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 z-10 hidden h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a] text-white/60 shadow-lg transition-colors hover:text-accent sm:flex"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
          <path strokeLinecap="round" d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* scroll track */}
      <div
        ref={ref}
        className="flex gap-2 overflow-x-auto scroll-smooth px-1 sm:px-10 pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.label;
          return (
            <motion.button
              key={cat.label}
              onClick={() => onChange(isActive ? "" : cat.label)}
              whileTap={{ scale: 0.95 }}
              className={`relative flex shrink-0 flex-col items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                isActive
                  ? "border border-accent/40 bg-accent/10 text-accent"
                  : "border border-white/8 bg-white/4 text-white/50 hover:border-white/15 hover:text-white/80"
              }`}
            >
              <span className="text-lg leading-none">{cat.icon}</span>
              <span className="whitespace-nowrap">{cat.label}</span>
              {isActive && (
                <motion.div
                  layoutId="category-indicator"
                  className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-accent"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* right arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 z-10 hidden h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a] text-white/60 shadow-lg transition-colors hover:text-accent sm:flex"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
          <path strokeLinecap="round" d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
