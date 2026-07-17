"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGarageStore } from "../store";
import { BIKE_MAKES, BIKE_MODELS } from "../data";

export default function BikeSelector({ onClose }: { onClose?: () => void }) {
  const { selectedBike, setSelectedBike, addToGarage } = useGarageStore();
  const [make, setMake] = useState(selectedBike?.make ?? "");
  const [model, setModel] = useState(selectedBike?.model ?? "");
  const [saved, setSaved] = useState(false);

  const filteredModels = BIKE_MODELS.filter((m) => !make || m.make === make);
  const selectedModel = BIKE_MODELS.find((m) => m.make === make && m.model === model) ?? null;

  function handleApply() {
    if (!selectedModel) return;
    setSelectedBike(selectedModel);
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose?.(); }, 900);
  }

  function handleSaveToGarage() {
    if (!selectedModel) return;
    addToGarage(selectedModel);
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose?.(); }, 900);
  }

  function handleClear() {
    setSelectedBike(null);
    setMake("");
    setModel("");
    onClose?.();
  }

  return (
    <div
      className="rounded-2xl border border-white/10 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
      style={{ background: "rgba(14,11,8,0.96)", backdropFilter: "blur(24px)" }}
    >
      {/* header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-bold italic uppercase text-white">Find My Bike</h3>
          <p className="text-xs text-white/40">Select your motorcycle to see compatible parts</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* make */}
        <div>
          <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-white/40">Manufacturer</label>
          <select
            value={make}
            onChange={(e) => { setMake(e.target.value); setModel(""); }}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-accent"
          >
            <option value="">All Makes</option>
            {BIKE_MAKES.map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>

        {/* model */}
        <div>
          <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-white/40">Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-accent"
          >
            <option value="">Select Model</option>
            {filteredModels.map((m) => (
              <option key={m.key} value={m.model}>{m.year} {m.model} {m.variant}</option>
            ))}
          </select>
        </div>
      </div>

      {/* selected bike chip */}
      <AnimatePresence>
        {selectedModel && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-xl border border-accent/20 bg-accent/8 px-4 py-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-accent uppercase tracking-wide">Selected Bike</p>
                <p className="mt-0.5 text-sm font-semibold text-white">
                  {selectedModel.year} {selectedModel.make} {selectedModel.model} {selectedModel.variant}
                </p>
                <p className="text-xs text-white/40">{selectedModel.engine}</p>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="#f0810f" strokeWidth={1.5} className="h-8 w-8 opacity-60">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* actions */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={handleApply}
          disabled={!selectedModel || saved}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#FF8A1D] disabled:opacity-40"
        >
          {saved ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Applied!
            </>
          ) : "Apply Filter"}
        </button>
        <button
          onClick={handleSaveToGarage}
          disabled={!selectedModel}
          className="flex items-center gap-1.5 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-white/60 transition-colors hover:border-accent/30 hover:text-accent disabled:opacity-40"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
            <path strokeLinecap="round" d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
          Save to My Garage
        </button>
        {selectedBike && (
          <button onClick={handleClear} className="rounded-xl border border-white/8 px-3 py-2.5 text-xs text-white/30 transition-colors hover:border-red-500/20 hover:text-red-400">
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
