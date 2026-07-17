"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Stay } from "../../stays/data";

const AMENITY_ICONS: Record<string, string> = {
  "Bike Parking": "🏍️", "Secure Parking": "🔒", "WiFi": "📶",
  "Workshop Nearby": "🔧", "EV Charging": "⚡", "Pet Friendly": "🐾",
  "Pool": "🏊", "Restaurant": "🍽️", "Bar": "🍺", "Laundry": "👕",
  "Air Con": "❄️", "Fireplace": "🔥", "Hot Tub": "♨️", "Gym": "💪",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <svg viewBox="0 0 24 24" fill="#f0810f" className="h-3 w-3 shrink-0">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      <span className="text-[11px] font-bold text-white">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function StayCard({ stay }: { stay: Stay }) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group relative w-56 shrink-0 cursor-pointer sm:w-64 lg:w-72"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div
        className="overflow-hidden rounded-2xl border bg-[#111] shadow-lg transition-all duration-300 group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.7)]"
        style={{ borderColor: hovered ? "rgba(240,129,15,0.2)" : "rgba(255,255,255,0.06)" }}
      >
        {/* image area */}
        <div className={`relative h-40 overflow-hidden bg-linear-to-br ${stay.gradient} sm:h-44`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="select-none font-display text-xl font-bold italic tracking-widest text-white/8 sm:text-2xl">
              {stay.name.split(" ").slice(0, 2).join(" ").toUpperCase()}
            </span>
          </div>

          {stay.tag && (
            <span className="absolute left-3 top-3 rounded-lg bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
              {stay.tag}
            </span>
          )}

          {stay.instantBook && (
            <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-lg bg-accent/90 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Instant Book
            </span>
          )}

          {/* wishlist */}
          <button
            onClick={(e) => { e.stopPropagation(); setLiked((v) => !v); }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          >
            <motion.svg
              viewBox="0 0 24 24" className="h-4 w-4"
              animate={{ scale: liked ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.25 }}
              fill={liked ? "#f0810f" : "none"}
              stroke={liked ? "#f0810f" : "white"}
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </motion.svg>
          </button>

          {/* price */}
          <div className="absolute bottom-3 right-3 rounded-xl bg-black/70 px-2.5 py-1.5 backdrop-blur-sm">
            <span className="text-sm font-bold text-white">${stay.price}</span>
            <span className="text-[10px] text-white/45"> /night</span>
          </div>
        </div>

        {/* content */}
        <div className="p-3 sm:p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-display text-sm font-bold uppercase tracking-wide text-white">
                {stay.name}
              </h3>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-white/40">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3 shrink-0 text-accent/60">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 5 6 13 6 13s6-8 6-13c0-3.314-2.686-6-6-6Z" /><circle cx="12" cy="8" r="2" />
                </svg>
                <span className="truncate">{stay.location}, {stay.country}</span>
              </p>
            </div>
            <StarRating rating={stay.rating} />
          </div>

          <p className="mt-2 flex items-center gap-1 text-[11px] text-white/30">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3 shrink-0 text-accent/50">
              <path strokeLinecap="round" d="M3 12h18M12 3l9 9-9 9" />
            </svg>
            {stay.distance}
          </p>

          {stay.riderFriendly && (
            <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-accent/20 bg-accent/8 px-2.5 py-0.5 text-[10px] font-semibold text-accent">
              🏍️ Rider Friendly
            </span>
          )}

          {/* amenity icons */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {stay.amenities.slice(0, 5).map((a) => (
              <span
                key={a}
                title={a}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/8 bg-white/4 text-sm transition-colors hover:border-accent/25 hover:bg-accent/8"
              >
                {AMENITY_ICONS[a] ?? "•"}
              </span>
            ))}
            {stay.amenities.length > 5 && (
              <span className="flex h-7 items-center rounded-lg border border-white/8 bg-white/4 px-2 text-[10px] text-white/35">
                +{stay.amenities.length - 5}
              </span>
            )}
          </div>

          {/* hover reveal */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: hovered ? 1 : 0, height: hovered ? "auto" : 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 flex items-center justify-between border-t border-white/8 pt-3">
              <span className="text-[11px] text-white/30">{stay.reviews.toLocaleString()} reviews</span>
              <button className="rounded-lg bg-accent px-4 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-orange-500 active:scale-95">
                View Stay
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
