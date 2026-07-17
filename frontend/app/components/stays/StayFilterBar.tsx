"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROPERTY_TYPES = ["Hotel", "Cabin", "Lodge", "Campsite", "Resort", "Hostel", "Villa", "Farm Stay"];
const AMENITY_FILTERS = ["Bike Parking", "Secure Parking", "Workshop Nearby", "EV Charging", "Pet Friendly", "WiFi", "Pool"];

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all ${
        active
          ? "border-accent/50 bg-accent/12 text-accent"
          : "border-white/10 bg-white/4 text-white/55 hover:border-white/20 hover:text-white"
      }`}
    >
      {label}
      {active && (
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} className="h-2.5 w-2.5">
          <path strokeLinecap="round" d="M2 2l8 8M10 2l-8 8" />
        </svg>
      )}
    </button>
  );
}

function Dropdown({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all ${
          open ? "border-accent/40 bg-accent/10 text-accent" : "border-white/10 bg-white/4 text-white/55 hover:border-white/20 hover:text-white"
        }`}
      >
        {icon}
        {label}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}>
          <path strokeLinecap="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-[55]" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-full z-[56] mt-2 min-w-[200px] rounded-2xl border border-white/10 bg-[#111] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function StayFilterBar() {
  const [destination, setDestination] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(1);
  const [maxPrice, setMaxPrice] = useState(300);
  const [propTypes, setPropTypes] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);

  function togglePropType(t: string) {
    setPropTypes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
  }
  function toggleAmenity(a: string) {
    setAmenities((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);
  }

  const hasFilters = destination || checkin || checkout || propTypes.length > 0 || amenities.length > 0 || maxPrice < 300;

  return (
    <div
      className="sticky top-[57px] z-40 w-full border-b border-white/8"
      style={{ background: "rgba(10,10,10,0.92)", backdropFilter: "blur(16px)" }}
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-10">
        <div
          className="flex gap-2 overflow-x-auto py-3"
          style={{ scrollbarWidth: "none" }}
        >
          {/* destination */}
          <div className="relative flex shrink-0 items-center">
            <svg className="absolute left-3 h-3.5 w-3.5 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="h-10 w-36 rounded-xl border border-white/10 bg-white/5 pl-8 pr-3 text-xs text-white placeholder-white/30 outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 sm:w-44"
            />
          </div>

          <div className="h-10 w-px shrink-0 bg-white/8" />

          {/* check-in */}
          <input
            type="date"
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            className="h-10 shrink-0 rounded-xl border border-white/10 bg-white/5 px-3 text-xs text-white/60 outline-none focus:border-accent w-32"
          />

          {/* check-out */}
          <input
            type="date"
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
            className="h-10 shrink-0 rounded-xl border border-white/10 bg-white/5 px-3 text-xs text-white/60 outline-none focus:border-accent w-32"
          />

          <div className="h-10 w-px shrink-0 bg-white/8" />

          {/* guests */}
          <Dropdown
            label={`${guests} Guest${guests > 1 ? "s" : ""}`}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path strokeLinecap="round" d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
          >
            <div className="flex items-center justify-between gap-6 px-2 py-1">
              <span className="text-xs text-white/60">Guests</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setGuests((g) => Math.max(1, g - 1))} className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-white/60 hover:border-accent/40 hover:text-accent transition-colors">−</button>
                <span className="w-4 text-center text-sm font-bold text-white">{guests}</span>
                <button onClick={() => setGuests((g) => Math.min(20, g + 1))} className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-white/60 hover:border-accent/40 hover:text-accent transition-colors">+</button>
              </div>
            </div>
          </Dropdown>

          {/* price */}
          <Dropdown
            label={`Up to $${maxPrice}`}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            }
          >
            <div className="px-2 py-2 w-52">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/50">Max price / night</p>
              <input
                type="range"
                min={20}
                max={1000}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#f0810f]"
              />
              <div className="mt-1 flex justify-between text-[11px] text-white/40">
                <span>$20</span>
                <span className="font-semibold text-accent">${maxPrice}</span>
              </div>
            </div>
          </Dropdown>

          {/* property type */}
          <Dropdown
            label={propTypes.length ? `Type · ${propTypes.length}` : "Property Type"}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            }
          >
            <div className="flex flex-col gap-1 p-1">
              {PROPERTY_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => togglePropType(t)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors ${
                    propTypes.includes(t) ? "bg-accent/10 text-accent" : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {t}
                  {propTypes.includes(t) && (
                    <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </Dropdown>

          {/* amenities */}
          <Dropdown
            label={amenities.length ? `Amenities · ${amenities.length}` : "Amenities"}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              </svg>
            }
          >
            <div className="flex flex-col gap-1 p-1 w-48">
              {AMENITY_FILTERS.map((a) => (
                <button
                  key={a}
                  onClick={() => toggleAmenity(a)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors ${
                    amenities.includes(a) ? "bg-accent/10 text-accent" : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {a}
                  {amenities.includes(a) && (
                    <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </Dropdown>

          {/* clear filters */}
          {hasFilters && (
            <button
              onClick={() => { setDestination(""); setCheckin(""); setCheckout(""); setPropTypes([]); setAmenities([]); setMaxPrice(300); setGuests(1); }}
              className="flex shrink-0 items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-2.5 text-xs font-semibold text-red-400 whitespace-nowrap transition-colors hover:bg-red-500/15"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
