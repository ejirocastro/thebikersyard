"use client";

import { motion } from "framer-motion";
import Embers from "../../components/Embers";

export default function GarageHero({ onShopParts, onFindBike }: { onShopParts: () => void; onFindBike: () => void }) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "72vh" }}
    >
      {/* layered background: deep radial glow simulating forge/garage lighting */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 120% 80% at 60% 100%, rgba(200,70,0,0.45) 0%, rgba(120,35,0,0.25) 30%, #0b0b0b 65%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_80%,rgba(160,50,0,0.3),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_20%,rgba(80,20,0,0.2),transparent_60%)]" />

      {/* smoke wisps */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${180 + i * 60}px`,
            height: `${180 + i * 60}px`,
            left: `${10 + i * 15}%`,
            bottom: `${-20 + i * 5}%`,
            background: `radial-gradient(circle, rgba(255,107,0,${0.04 - i * 0.005}) 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{
            y: [0, -(30 + i * 10), 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 4 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}

      <Embers count={25} />

      {/* content */}
      <div className="relative mx-auto flex max-w-screen-xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-28 lg:px-10 lg:py-32">
        <div className="max-w-3xl">
          {/* headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold italic uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl"
          >
            Upgrade Your Ride.
            <br />
            <span className="text-accent">Performance Parts.</span>
            <br />
            <span className="text-white/80">Built for Brotherhood.</span>
          </motion.h1>

          {/* sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 max-w-lg text-sm leading-relaxed text-white/45 sm:text-base"
          >
            Genuine parts, premium gear, and performance upgrades — built by riders, for riders.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onShopParts}
              className="flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-bold text-white shadow-[0_0_30px_rgba(240,107,0,0.35)] transition-colors hover:bg-[#FF8A1D]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path strokeLinecap="round" d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
                <path strokeLinecap="round" d="M16 10a4 4 0 01-8 0" />
              </svg>
              Shop Parts
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onFindBike}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:border-accent/40 hover:bg-accent/8 hover:text-accent"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" d="m21 21-4.35-4.35" />
              </svg>
              Find My Bike
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* bottom fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0b0b0b] to-transparent" />
    </section>
  );
}
