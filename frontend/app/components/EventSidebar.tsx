"use client";

import { useState } from "react";

const eventTypes = ["Conferences", "Seminars", "Workshops", "Meetings", "Trade Shows", "Festival", "Race"];
const categories = ["Motorsport", "Training", "Technology", "Gear & Merch", "Community", "Road Trips"];

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function Calendar() {
  const [month, setMonth] = useState(new Date(2026, 6, 1));
  const today = new Date();

  const year = month.getFullYear();
  const monthIdx = month.getMonth();
  const monthName = month.toLocaleString("default", { month: "long" });

  const firstDay = new Date(year, monthIdx, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  const cells = Array.from({ length: offset + daysInMonth }, (_, i) =>
    i < offset ? null : i - offset + 1
  );

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button onClick={() => setMonth(new Date(year, monthIdx - 1, 1))} className="text-white/40 hover:text-white transition-colors">‹</button>
        <span className="text-sm font-semibold text-white">{monthName} {year}</span>
        <button onClick={() => setMonth(new Date(year, monthIdx + 1, 1))} className="text-white/40 hover:text-white transition-colors">›</button>
      </div>
      <div className="grid grid-cols-7 gap-y-1 text-center">
        {DAYS.map((d) => (
          <span key={d} className="text-[10px] font-semibold uppercase text-white/30">{d}</span>
        ))}
        {cells.map((day, i) => {
          const isToday = day === today.getDate() && monthIdx === today.getMonth() && year === today.getFullYear();
          return (
            <button
              key={i}
              disabled={!day}
              className={`flex h-7 w-7 mx-auto items-center justify-center rounded-full text-xs transition-colors ${
                !day ? "invisible" : isToday ? "bg-accent text-white font-bold" : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CheckGroup({
  label,
  items,
  checked,
  onToggle,
}: {
  label: string;
  items: string[];
  checked: string[];
  onToggle: (item: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white">{label}</p>
      <div className="grid grid-cols-2 gap-x-2 gap-y-2">
        {items.map((item) => (
          <label key={item} className="flex cursor-pointer items-center gap-2">
            <div
              onClick={() => onToggle(item)}
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                checked.includes(item) ? "border-accent bg-accent" : "border-white/20 bg-transparent"
              }`}
            >
              {checked.includes(item) && (
                <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-xs text-white/60">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export interface ActiveFilters {
  types: string[];
  categories: string[];
  dateRange: string;
  location: string;
}

function SidebarContent({
  onClose,
  filters,
  onFiltersChange,
}: {
  onClose?: () => void;
  filters: ActiveFilters;
  onFiltersChange: (f: ActiveFilters) => void;
}) {
  const [price, setPrice] = useState(120);

  const toggle = (key: "types" | "categories", item: string) => {
    const prev = filters[key];
    onFiltersChange({
      ...filters,
      [key]: prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item],
    });
  };

  return (
    <div className="flex flex-col gap-5 px-5 py-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold uppercase tracking-widest text-white">Filter By</span>
        {onClose && (
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="h-px bg-white/10" />
      <Calendar />
      <div className="h-px bg-white/10" />

      <CheckGroup
        label="Event Type"
        items={eventTypes}
        checked={filters.types}
        onToggle={(item) => toggle("types", item)}
      />
      <div className="h-px bg-white/10" />

      <CheckGroup
        label="Event Category"
        items={categories}
        checked={filters.categories}
        onToggle={(item) => toggle("categories", item)}
      />
      <div className="h-px bg-white/10" />

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white">Date Range</p>
        <select
          value={filters.dateRange}
          onChange={(e) => onFiltersChange({ ...filters, dateRange: e.target.value })}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white/60 outline-none focus:border-accent"
        >
          <option value="">All Dates</option>
          <option value="Today">Today</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
          <option value="Custom">Custom</option>
        </select>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white">Location</p>
        <select
          value={filters.location}
          onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white/60 outline-none focus:border-accent"
        >
          <option value="">All Cities</option>
          <option value="Lagos">Lagos</option>
          <option value="Abuja">Abuja</option>
          <option value="London">London</option>
        </select>
      </div>

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white">Ticket Price Range</p>
        <input
          type="range"
          min={0}
          max={500}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full accent-[#f0810f]"
        />
        <div className="mt-1 flex justify-between text-xs text-white/40">
          <span>$0</span>
          <span className="text-accent font-semibold">${price}</span>
        </div>
      </div>
    </div>
  );
}

export default function EventSidebar({
  filters,
  onFiltersChange,
}: {
  filters: ActiveFilters;
  onFiltersChange: (f: ActiveFilters) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* desktop sidebar */}
      <aside className="hidden w-64 shrink-0 overflow-y-auto border-r border-white/10 bg-[#0d0d0d] lg:block">
        <SidebarContent filters={filters} onFiltersChange={onFiltersChange} />
      </aside>

      {/* mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-60 lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-white/10 bg-[#0d0d0d]">
            <div className="sticky top-0 flex justify-center py-2">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>
            <SidebarContent filters={filters} onFiltersChange={onFiltersChange} onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* expose toggle for page */}
      <button id="mobile-filter-trigger" className="hidden" onClick={() => setMobileOpen(true)} />
    </>
  );
}
