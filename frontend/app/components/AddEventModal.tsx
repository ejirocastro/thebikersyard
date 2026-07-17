"use client";

import { useState, useEffect } from "react";

const CATEGORIES = ["Motorsport", "Training", "Technology", "Gear & Merch", "Community", "Road Trips"];
const EVENT_TYPES = ["Conference", "Seminar", "Workshop", "Festival", "Race", "Expo"];

interface FormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: string;
  type: string;
  categories: string[];
  capacity: string;
}

const EMPTY: FormData = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  price: "",
  type: "",
  categories: [],
  capacity: "",
};

export default function AddEventModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  function set(key: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function toggleCategory(cat: string) {
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter((c) => c !== cat)
        : [...f.categories, cat],
    }));
  }

  function validate(): Partial<{ title: string; date: string; time: string; location: string; type: string }> {
    const e: Partial<{ title: string; date: string; time: string; location: string; type: string }> = {};
    if (!form.title.trim()) e.title = "Event title is required";
    if (!form.date) e.date = "Date is required";
    if (!form.time) e.time = "Time is required";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.type) e.type = "Select an event type";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  }

  function handleClose() {
    setForm(EMPTY);
    setErrors({});
    setSubmitted(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* modal panel */}
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.9)]"
        style={{
          background: "rgba(14,11,8,0.92)",
          border: "1px solid rgba(255,150,50,0.15)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 px-6 py-4"
          style={{ background: "rgba(14,11,8,0.95)" }}>
          <div>
            <h2 className="font-display text-xl font-bold italic uppercase text-white">Add Event</h2>
            <p className="text-xs text-white/40">Fill in the details to create a new event</p>
          </div>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-colors hover:border-accent/40 hover:text-accent"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {submitted ? (
          /* success state */
          <div className="flex flex-col items-center justify-center gap-5 px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-display text-lg font-bold italic uppercase text-white">Event Created!</p>
              <p className="mt-1 text-sm text-white/40">
                <span className="text-accent">{form.title}</span> has been added to the events list.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { setForm(EMPTY); setSubmitted(false); }}
                className="rounded-lg border border-white/10 px-5 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:border-accent/30 hover:text-white"
              >
                Add Another
              </button>
              <button
                onClick={handleClose}
                className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* form */
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-6">

            {/* title */}
            <Field label="Event Title" required error={errors.title}>
              <input
                type="text"
                placeholder="e.g. MotoFest Championship 2027"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                className={inputCls(!!errors.title)}
              />
            </Field>

            {/* description */}
            <Field label="Description">
              <textarea
                rows={3}
                placeholder="Tell riders what this event is about..."
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                className={`${inputCls(false)} resize-none`}
              />
            </Field>

            {/* date + time */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date" required error={errors.date}>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                  className={inputCls(!!errors.date)}
                />
              </Field>
              <Field label="Time" required error={errors.time}>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => set("time", e.target.value)}
                  className={inputCls(!!errors.time)}
                />
              </Field>
            </div>

            {/* location */}
            <Field label="Location / Venue" required error={errors.location}>
              <input
                type="text"
                placeholder="e.g. Lagos Speedway, Nigeria"
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                className={inputCls(!!errors.location)}
              />
            </Field>

            {/* event type */}
            <Field label="Event Type" required error={errors.type}>
              <select
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
                className={inputCls(!!errors.type)}
              >
                <option value="">Select type...</option>
                {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>

            {/* categories */}
            <Field label="Categories">
              <div className="flex flex-wrap gap-2 pt-1">
                {CATEGORIES.map((cat) => {
                  const active = form.categories.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                        active
                          ? "border-accent bg-accent/15 text-accent"
                          : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </Field>

            {/* price + capacity */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Ticket Price">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-white/30">$</span>
                  <input
                    type="number"
                    min={0}
                    placeholder="0 = Free"
                    value={form.price}
                    onChange={(e) => set("price", e.target.value)}
                    className={`${inputCls(false)} pl-6`}
                  />
                </div>
              </Field>
              <Field label="Capacity">
                <input
                  type="number"
                  min={1}
                  placeholder="Max attendees"
                  value={form.capacity}
                  onChange={(e) => set("capacity", e.target.value)}
                  className={inputCls(false)}
                />
              </Field>
            </div>

            {/* divider */}
            <div className="h-px bg-white/10" />

            {/* actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 rounded-lg border border-white/10 py-3 text-sm font-semibold text-white/60 transition-colors hover:border-white/20 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-lg bg-accent py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              >
                Create Event
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase tracking-widest text-white/60">
        {label}{required && <span className="ml-1 text-accent">*</span>}
      </label>
      {children}
      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full rounded-lg border ${
    hasError ? "border-red-500/60" : "border-white/10"
  } bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30`;
}
