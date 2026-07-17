"use client";

import { useState } from "react";
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

  function openSignIn() { setOpen(false); setJoinOpen(false); setSignInOpen(true); }
  function openJoin() { setOpen(false); setSignInOpen(false); setJoinOpen(true); }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-black border-b border-white/10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-10">
          {/* logo */}
          <a href="/" className="text-xl font-bold tracking-wide text-white">
            Bikers.<span className="text-accent">Yard</span>
          </a>

          {/* desktop links */}
          <ul className="hidden items-center gap-6 text-sm font-medium text-white/80 md:flex lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition-colors hover:text-accent">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/stays"
                className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              >
                Stays
              </a>
            </li>
          </ul>

          {/* desktop auth buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={openSignIn}
              className="rounded-md border border-accent px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
            >
              Sign In
            </button>
            <button
              onClick={openJoin}
              className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Join Now
            </button>
          </div>

          {/* mobile: join now + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={openJoin}
              className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Join Now
            </button>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-60 md:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-72 flex-col bg-[#0d0d0d] border-l border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <a href="/" className="text-lg font-bold text-white">
                Bikers.<span className="text-accent">Yard</span>
              </a>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white/60"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <ul className="flex flex-col gap-1 px-4 py-6">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center rounded-lg px-3 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/stays"
                  onClick={() => setOpen(false)}
                  className="flex items-center rounded-lg px-3 py-3 text-sm font-medium text-accent transition-colors hover:bg-white/5"
                >
                  Stays
                </a>
              </li>
            </ul>

            <div className="mt-auto flex flex-col gap-3 border-t border-white/10 px-5 py-6">
              <button
                onClick={openSignIn}
                className="w-full rounded-md border border-accent px-4 py-2.5 text-center text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
              >
                Sign In
              </button>
              <button
                onClick={openJoin}
                className="w-full rounded-md bg-accent px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* auth modals */}
      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} onSwitchToJoin={openJoin} />
      <JoinNowModal open={joinOpen} onClose={() => setJoinOpen(false)} onSwitchToSignIn={openSignIn} />
    </>
  );
}
