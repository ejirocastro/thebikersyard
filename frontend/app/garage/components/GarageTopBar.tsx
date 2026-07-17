"use client";

import { motion } from "framer-motion";
import { useGarageStore } from "../store";
import GarageSearchBar from "./GarageSearchBar";

export default function GarageTopBar({
  search,
  onSearch,
  onOpenBikeSelector,
  onOpenGarage,
}: {
  search: string;
  onSearch: (v: string) => void;
  onOpenBikeSelector: () => void;
  onOpenGarage: () => void;
}) {
  const { selectedBike, cartCount, myGarage, wishlist } = useGarageStore();
  const count = cartCount();

  return (
    <div
      className="sticky top-[57px] z-40 border-b border-[#2B2B2B]"
      style={{ background: "rgba(11,11,11,0.95)", backdropFilter: "blur(16px)" }}
    >
      <div className="mx-auto max-w-screen-xl px-4 py-3 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          {/* bike selector pill */}
          <button
            onClick={onOpenBikeSelector}
            className={`flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
              selectedBike
                ? "border-accent/40 bg-accent/10 text-accent"
                : "border-white/10 bg-white/5 text-white/50 hover:border-accent/20 hover:text-white"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
              <circle cx="5.5" cy="17.5" r="3.5" /><circle cx="18.5" cy="17.5" r="3.5" />
              <path strokeLinecap="round" d="M8 17.5h7M15 6h2l2 5" /><path strokeLinecap="round" d="M9 17.5L7 10l3-3h4l2 3H9z" />
            </svg>
            <span className="hidden sm:inline">
              {selectedBike ? `${selectedBike.make} ${selectedBike.model}` : "Select Bike"}
            </span>
            <span className="sm:hidden">{selectedBike ? "✓ Bike" : "Bike"}</span>
          </button>

          {/* search */}
          <div className="flex-1">
            <GarageSearchBar value={search} onChange={onSearch} />
          </div>

          {/* my garage */}
          <button
            onClick={onOpenGarage}
            className="relative flex shrink-0 flex-col items-center gap-0.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/50 transition-colors hover:border-accent/20 hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="hidden text-[9px] font-bold uppercase tracking-wide sm:block">Garage</span>
            {myGarage.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
                {myGarage.length}
              </span>
            )}
          </button>

          {/* cart */}
          <button
            onClick={onOpenGarage}
            className="relative flex shrink-0 flex-col items-center gap-0.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/50 transition-colors hover:border-accent/20 hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
              <path strokeLinecap="round" d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="hidden text-[9px] font-bold uppercase tracking-wide sm:block">Cart</span>
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 1.4 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white"
              >
                {count}
              </motion.span>
            )}
          </button>

          {/* wishlist */}
          <button
            onClick={onOpenGarage}
            className="relative hidden shrink-0 flex-col items-center gap-0.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/50 transition-colors hover:border-accent/20 hover:text-white sm:flex"
          >
            <svg viewBox="0 0 24 24" fill={wishlist.length > 0 ? "#f0810f" : "none"} stroke={wishlist.length > 0 ? "#f0810f" : "currentColor"} strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-[9px] font-bold uppercase tracking-wide">Saved</span>
          </button>
        </div>
      </div>
    </div>
  );
}
