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
      <StayFilterBar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 pt-8 pb-4 sm:px-6 sm:pt-10 lg:px-10">
          <h1
            className="font-display font-bold italic uppercase tracking-wide text-white"
            style={{ fontSize: "clamp(1.6rem, 5vw, 3rem)" }}
          >
            Stays
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/40 sm:text-base">
            Biker-friendly lodges, campsites, cabins, and premium accommodations for every ride.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-10">
          <StayCategoryBar active={activeCategory} onChange={setActiveCategory} />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-10 sm:gap-12">
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
