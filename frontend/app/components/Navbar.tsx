"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SignInModal, JoinNowModal } from "./AuthModals";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Garage", href: "/garage" },
  { label: "Events", href: "/events" },
  { label: "About", href: "#" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function openSignIn() { setOpen(false); setJoinOpen(false); setSignInOpen(true); }
  function openJoin() { setOpen(false); setSignInOpen(false); setJoinOpen(true); }

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full transition-all duration-300"
        style={{
          background: scrolled ? "rgba(0,0,0,0.92)" : "rgba(0,0,0,0.75)",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        }}
      >
        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-10">
          {/* logo */}
          <a
            href="/"
            className="shrink-0 font-display text-lg font-bold italic tracking-wide text-white transition-opacity hover:opacity-80 sm:text-xl"
          >
            Bikers.<span className="text-accent">Yard</span>
          </a>

          {/* desktop links */}
          <ul className="hidden items-center gap-1 md:flex lg:gap-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/stays"
                className="ml-1 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-orange-500 hover:shadow-[0_0_16px_rgba(240,107,0,0.4)]"
              >
                Stays
              </a>
            </li>
          </ul>

          {/* desktop auth */}
          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={openSignIn}
              className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:border-accent/50 hover:text-accent"
            >
              Sign In
            </button>
            <button
              onClick={openJoin}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-orange-500 hover:shadow-[0_0_16px_rgba(240,107,0,0.4)]"
            >
              Join Now
            </button>
          </div>

          {/* mobile: join + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={openJoin}
              className="rounded-lg bg-accent px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-orange-500"
            >
              Join Now
            </button>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white transition-colors hover:border-white/20 hover:bg-white/5"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-60 md:hidden">
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="absolute right-0 top-0 flex h-full w-[min(320px,85vw)] flex-col"
              style={{
                background: "rgba(10,10,10,0.98)",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(24px)",
              }}
            >
              {/* drawer header */}
              <div className="flex h-14 items-center justify-between border-b border-white/8 px-5">
                <a href="/" className="font-display text-lg font-bold italic text-white">
                  Bikers.<span className="text-accent">Yard</span>
                </a>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-colors hover:border-white/20 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* nav links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex min-h-12 items-center rounded-xl px-4 text-base font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                  >
                    <a
                      href="/stays"
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center rounded-xl px-4 text-base font-medium text-accent transition-colors hover:bg-accent/8"
                    >
                      Stays
                    </a>
                  </motion.li>
                </ul>
              </nav>

              {/* auth buttons */}
              <div className="border-t border-white/8 px-4 py-5">
                <div className="flex flex-col gap-3">
                  <button
                    onClick={openSignIn}
                    className="flex h-12 w-full items-center justify-center rounded-xl border border-white/15 text-sm font-semibold text-white/80 transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={openJoin}
                    className="flex h-12 w-full items-center justify-center rounded-xl bg-accent text-sm font-bold text-white transition-colors hover:bg-orange-500"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} onSwitchToJoin={openJoin} />
      <JoinNowModal open={joinOpen} onClose={() => setJoinOpen(false)} onSwitchToSignIn={openSignIn} />
    </>
  );
}
