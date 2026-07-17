"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import EventSidebar, { ActiveFilters } from "../components/EventSidebar";
import EventGrid from "../components/EventGrid";
import AddEventModal from "../components/AddEventModal";

const SORT_OPTIONS = [
  { value: "date", label: "Date" },
  { value: "popular", label: "Popular" },
  { value: "price", label: "Price" },
];

const EMPTY_FILTERS: ActiveFilters = { types: [], categories: [], dateRange: "", location: "" };

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");
  const [filters, setFilters] = useState<ActiveFilters>(EMPTY_FILTERS);
  const [addEventOpen, setAddEventOpen] = useState(false);

  function openMobileFilter() {
    document.getElementById("mobile-filter-trigger")?.click();
  }

  // build active chip list
  const activeChips: { label: string; onRemove: () => void }[] = [
    ...filters.types.map((t) => ({
      label: t,
      onRemove: () => setFilters((f) => ({ ...f, types: f.types.filter((x) => x !== t) })),
    })),
    ...filters.categories.map((c) => ({
      label: c,
      onRemove: () => setFilters((f) => ({ ...f, categories: f.categories.filter((x) => x !== c) })),
    })),
    ...(filters.dateRange ? [{ label: filters.dateRange, onRemove: () => setFilters((f) => ({ ...f, dateRange: "" })) }] : []),
    ...(filters.location ? [{ label: filters.location, onRemove: () => setFilters((f) => ({ ...f, location: "" })) }] : []),
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a]">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <EventSidebar filters={filters} onFiltersChange={setFilters} />

        <main className="flex flex-1 flex-col overflow-y-auto px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">

          {/* page header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="font-display text-2xl font-bold italic uppercase text-white sm:text-3xl">
              Events
            </h1>

            {/* controls row */}
            <div className="flex flex-1 flex-wrap items-center justify-end gap-2 sm:gap-3">
              {/* mobile filter button */}
              <button
                onClick={openMobileFilter}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 transition-colors hover:border-accent/40 hover:text-white lg:hidden"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 12h10M11 20h2" />
                </svg>
                Filters
                {activeChips.length > 0 && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                    {activeChips.length}
                  </span>
                )}
              </button>

              {/* sort tabs */}
              <div className="flex items-center rounded-lg border border-white/10 bg-white/5 p-0.5">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSort(opt.value)}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                      sort === opt.value ? "bg-accent text-white" : "text-white/50 hover:text-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* search */}
              <div className="relative flex-1 sm:flex-none">
                <svg className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search events..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-8 pr-3 text-sm text-white placeholder-white/30 outline-none focus:border-accent focus:ring-1 focus:ring-accent sm:w-48 md:w-56"
                />
              </div>

              {/* add event */}
              <button
                onClick={() => setAddEventOpen(true)}
                className="flex shrink-0 items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-orange-600 sm:px-4 sm:text-sm"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span className="hidden sm:inline">Add Event</span>
              </button>
            </div>
          </div>

          {/* active filter chips */}
          {activeChips.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-white/30">Active filters:</span>
              {activeChips.map((chip) => (
                <button
                  key={chip.label}
                  onClick={chip.onRemove}
                  className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent/20"
                >
                  {chip.label}
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} className="h-2.5 w-2.5">
                    <path strokeLinecap="round" d="M2 2l8 8M10 2l-8 8" />
                  </svg>
                </button>
              ))}
              <button
                onClick={() => setFilters(EMPTY_FILTERS)}
                className="text-xs text-white/30 underline hover:text-white/60 transition-colors"
              >
                Clear all
              </button>
            </div>
          )}

          {/* grid */}
          <EventGrid search={search} sort={sort} />
        </main>
      </div>

      <AddEventModal open={addEventOpen} onClose={() => setAddEventOpen(false)} />
    </div>
  );
}
