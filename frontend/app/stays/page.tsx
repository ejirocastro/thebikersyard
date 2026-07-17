"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StayCategoryBar from "../components/stays/StayCategoryBar";
import StayFilterBar from "../components/stays/StayFilterBar";
import StayCarousel from "../components/stays/StayCarousel";
import { ROWS } from "./data";

export default function StaysPage() {
  const [activeCategory, setActiveCategory] = useState("");

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a]">
      <Navbar />

      {/* sticky filter bar */}
      <StayFilterBar />

      <main className="flex-1">
        {/* page header */}
        <div className="mx-auto max-w-screen-xl px-4 pt-10 pb-6 sm:px-6 lg:px-10">
          <h1 className="font-display text-3xl font-bold italic uppercase tracking-wide text-white sm:text-4xl lg:text-5xl">
            Stays
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/45 sm:text-base">
            Discover biker-friendly stays, lodges, campsites, cabins, and premium
            accommodations for every ride.
          </p>
        </div>

        {/* category bar */}
        <div className="mx-auto max-w-screen-xl px-4 pb-8 sm:px-6 lg:px-10">
          <StayCategoryBar active={activeCategory} onChange={setActiveCategory} />
        </div>

        {/* content rows */}
        <div className="mx-auto max-w-screen-xl px-6 pb-16 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-12">
            {ROWS.map((row) => (
              <StayCarousel key={row.title} title={row.title} ids={row.ids} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
