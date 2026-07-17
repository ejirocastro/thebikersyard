"use client";

import { motion } from "framer-motion";
import { CATEGORIES } from "../data";

export default function CategoryGrid({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold italic uppercase tracking-wide text-white">Shop by Category</h2>
        <button className="text-xs font-semibold text-accent hover:underline">View all</button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {CATEGORIES.map((cat, i) => (
          <motion.button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative overflow-hidden rounded-2xl border border-white/8 text-left transition-all hover:border-accent/25 hover:shadow-[0_8px_32px_rgba(240,107,0,0.12)]"
          >
            <div className={`h-20 bg-gradient-to-br ${cat.gradient} flex items-center justify-center`}>
              <span className="text-2xl">{cat.icon}</span>
              {/* hover glow */}
              <div className="absolute inset-0 bg-accent/0 transition-all group-hover:bg-accent/8" />
            </div>
            <div className="bg-[#151515] px-3 py-2.5">
              <p className="truncate text-[11px] font-bold uppercase tracking-wide text-white/80 group-hover:text-white transition-colors">
                {cat.label}
              </p>
              <p className="text-[10px] text-white/30">{cat.count.toLocaleString()} items</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
