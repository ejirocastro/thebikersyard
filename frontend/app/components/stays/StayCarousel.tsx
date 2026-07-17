"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StayCard from "./StayCard";
import StaySkeleton from "./StaySkeleton";
import { getStayById } from "../../stays/data";
import type { Stay } from "../../stays/data";

export default function StayCarousel({ title, ids }: { title: string; ids: number[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [loading, setLoading] = useState(true);
  const [stays, setStays] = useState<Stay[]>([]);

  // simulate skeleton load
  useEffect(() => {
    const t = setTimeout(() => {
      setStays(ids.map((id) => getStayById(id)).filter(Boolean) as Stay[]);
      setLoading(false);
    }, 600 + Math.random() * 400);
    return () => clearTimeout(t);
  }, [ids]);

  function updateArrows() {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }

  function scroll(dir: "left" | "right") {
    ref.current?.scrollBy({ left: dir === "left" ? -580 : 580, behavior: "smooth" });
  }

  return (
    <div className="relative">
      {/* row header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold italic uppercase tracking-wide text-white sm:text-xl">
          {title}
        </h2>
        <button className="text-xs font-semibold text-accent hover:underline transition-colors">
          See all
        </button>
      </div>

      {/* left arrow */}
      <AnimatePresence>
        {canLeft && !loading && (
          <motion.button
            key="left"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#111] text-white shadow-xl transition-colors hover:border-accent/40 hover:text-accent sm:flex"
            style={{ marginTop: "22px" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <path strokeLinecap="round" d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* right arrow */}
      <AnimatePresence>
        {canRight && !loading && (
          <motion.button
            key="right"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#111] text-white shadow-xl transition-colors hover:border-accent/40 hover:text-accent sm:flex"
            style={{ marginTop: "22px" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <path strokeLinecap="round" d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* track */}
      <div
        ref={ref}
        onScroll={updateArrows}
        className="flex gap-4 overflow-x-auto pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollSnapType: "x mandatory" }}
      >
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <StaySkeleton key={i} />)
          : stays.map((stay) => (
              <div key={stay.id} style={{ scrollSnapAlign: "start" }}>
                <StayCard stay={stay} />
              </div>
            ))}
      </div>
    </div>
  );
}
