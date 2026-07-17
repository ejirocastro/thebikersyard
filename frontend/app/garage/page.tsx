"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GarageHero from "./components/GarageHero";
import GarageTopBar from "./components/GarageTopBar";
import BikeSelector from "./components/BikeSelector";
import CategoryGrid from "./components/CategoryGrid";
import ProductGrid from "./components/ProductGrid";
import MyGaragePanel from "./components/MyGaragePanel";
import { FilterSidebarDesktop, FilterSidebarMobile, DEFAULT_FILTERS } from "./components/FilterSidebar";
import type { GarageFilters } from "./components/FilterSidebar";
import { FEATURED_BRANDS } from "./data";

export default function GaragePage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [bikeSelectorOpen, setBikeSelectorOpen] = useState(false);
  const [garageOpen, setGarageOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<GarageFilters>(DEFAULT_FILTERS);
  const productsRef = useRef<HTMLDivElement>(null);

  function scrollToProducts() {
    productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleShopParts() {
    setCategoryFilter("");
    scrollToProducts();
  }

  function handleFindBike() {
    setBikeSelectorOpen(true);
  }

  function handleCategorySelect(id: string) {
    setCategoryFilter((prev) => (prev === id ? "" : id));
    scrollToProducts();
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0b0b0b]">
      <Navbar />

      {/* sticky top bar */}
      <GarageTopBar
        search={search}
        onSearch={setSearch}
        onOpenBikeSelector={() => setBikeSelectorOpen(true)}
        onOpenGarage={() => setGarageOpen(true)}
      />

      {/* hero */}
      <GarageHero onShopParts={handleShopParts} onFindBike={handleFindBike} />

      {/* bike selector panel */}
      <AnimatePresence>
        {bikeSelectorOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="relative z-30 border-b border-white/8 bg-[#0f0f0f]"
          >
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10">
              <BikeSelector onClose={() => setBikeSelectorOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* featured brands strip */}
      <div className="border-y border-white/6 bg-[#111]">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-6 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-white/20">Premium Brands</span>
            {FEATURED_BRANDS.map((brand) => (
              <span key={brand} className="shrink-0 text-xs font-bold text-white/30 transition-colors hover:text-accent cursor-pointer">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1">
        {/* categories */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
          <CategoryGrid onSelect={handleCategorySelect} />
        </section>

        {/* divider glow */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="h-px bg-linear-to-r from-transparent via-accent/30 to-transparent" />
        </div>

        {/* products section — sidebar + grid */}
        <section ref={productsRef} className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
          <div className="flex items-start gap-6">
            {/* desktop filter sidebar */}
            <FilterSidebarDesktop
              filters={filters}
              onChange={setFilters}
              onReset={resetFilters}
            />

            {/* product grid */}
            <div className="min-w-0 flex-1">
              <ProductGrid
                search={search}
                categoryFilter={categoryFilter}
                filters={filters}
                onOpenMobileFilters={() => setMobileFiltersOpen(true)}
              />
            </div>
          </div>
        </section>

        {/* community cta */}
        <section
          className="relative overflow-hidden"
          style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(200,70,0,0.12) 0%, transparent 70%)" }}
        >
          <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent/60">The Brotherhood</p>
              <h2 className="mt-3 font-display text-3xl font-bold italic uppercase text-white sm:text-4xl">
                Shop. Upgrade. Ride. Repeat.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/40">
                Join 10,000+ riders already using The Bikers Yard to discover genuine parts, premium gear, and the best biker community on the planet.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button className="rounded-xl bg-accent px-8 py-3 text-sm font-bold text-white shadow-[0_0_30px_rgba(240,107,0,0.25)] transition-colors hover:bg-[#FF8A1D]">
                  Join the Brotherhood
                </button>
                <button className="rounded-xl border border-white/15 px-8 py-3 text-sm font-bold text-white/70 transition-colors hover:border-white/30 hover:text-white">
                  Explore Events
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* my garage side panel */}
      <MyGaragePanel open={garageOpen} onClose={() => setGarageOpen(false)} />

      {/* mobile filter bottom sheet */}
      <FilterSidebarMobile
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        onChange={setFilters}
        onReset={resetFilters}
      />
    </div>
  );
}
