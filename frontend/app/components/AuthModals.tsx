"use client";

import { useState, useEffect } from "react";

/* ─── shared helpers ─── */

function inputCls(hasError: boolean) {
  return `w-full rounded-lg border ${
    hasError ? "border-red-500/60" : "border-white/10"
  } bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30`;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase tracking-widest text-white/50">{label}</label>
      {children}
      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  );
}

function ModalShell({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.9)]"
        style={{
          background: "rgba(14,11,8,0.95)",
          border: "1px solid rgba(255,150,50,0.15)",
          backdropFilter: "blur(24px)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ─── divider ─── */
function OrDivider() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-white/10" />
      <span className="text-xs text-white/25">or</span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

/* ─── social buttons ─── */
function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-white/70 transition-colors hover:border-white/20 hover:text-white">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Google
      </button>
      <button className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-white/70 transition-colors hover:border-white/20 hover:text-white">
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        Facebook
      </button>
    </div>
  );
}

/* ════════════════════════════════
   SIGN IN MODAL
════════════════════════════════ */
export function SignInModal({
  open,
  onClose,
  onSwitchToJoin,
}: {
  open: boolean;
  onClose: () => void;
  onSwitchToJoin: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  function reset() { setEmail(""); setPassword(""); setErrors({}); setLoading(false); }

  function handleClose() { reset(); onClose(); }

  function switchToJoin() { reset(); onSwitchToJoin(); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email";
    if (!password) errs.password = "Password is required";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    handleClose();
  }

  return (
    <ModalShell open={open} onClose={handleClose}>
      {/* header */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
        <div>
          <p className="text-lg font-bold text-white">
            Bikers.<span className="text-accent">Yard</span>
          </p>
          <p className="text-xs text-white/40">Sign in to your account</p>
        </div>
        <button
          onClick={handleClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-colors hover:border-accent/40 hover:text-accent"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-6">
        <SocialButtons />
        <OrDivider />

        <Field label="Email Address" error={errors.email}>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((x) => ({ ...x, email: "" })); }}
            className={inputCls(!!errors.email)}
          />
        </Field>

        <Field label="Password" error={errors.password}>
          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((x) => ({ ...x, password: "" })); }}
              className={`${inputCls(!!errors.password)} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              {showPwd ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path strokeLinecap="round" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path strokeLinecap="round" d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path strokeLinecap="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </Field>

        <div className="flex justify-end">
          <button type="button" className="text-xs text-accent hover:underline">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-60"
        >
          {loading && (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          )}
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center text-xs text-white/30">
          Don&apos;t have an account?{" "}
          <button type="button" onClick={switchToJoin} className="text-accent hover:underline font-semibold">
            Join Now
          </button>
        </p>
      </form>
    </ModalShell>
  );
}

/* ════════════════════════════════
   JOIN NOW MODAL
════════════════════════════════ */
export function JoinNowModal({
  open,
  onClose,
  onSwitchToSignIn,
}: {
  open: boolean;
  onClose: () => void;
  onSwitchToSignIn: () => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function reset() { setForm({ name: "", email: "", password: "", confirm: "" }); setErrors({}); setLoading(false); setDone(false); }
  function handleClose() { reset(); onClose(); }
  function switchToSignIn() { reset(); onSwitchToSignIn(); }

  function set(key: keyof typeof form, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Partial<typeof form> = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 8) errs.password = "At least 8 characters";
    if (form.confirm !== form.password) errs.confirm = "Passwords do not match";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setDone(true);
  }

  return (
    <ModalShell open={open} onClose={handleClose}>
      {/* header */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
        <div>
          <p className="text-lg font-bold text-white">
            Bikers.<span className="text-accent">Yard</span>
          </p>
          <p className="text-xs text-white/40">Join the brotherhood today</p>
        </div>
        <button
          onClick={handleClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-colors hover:border-accent/40 hover:text-accent"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {done ? (
        <div className="flex flex-col items-center gap-5 px-6 py-14 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-8 w-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-display text-lg font-bold italic uppercase text-white">Welcome to the Brotherhood!</p>
            <p className="mt-1 text-sm text-white/40">
              Hey <span className="text-accent">{form.name.split(" ")[0]}</span>, your account is ready. Ride hard.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg bg-accent px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Let&apos;s Ride
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-6">
          <SocialButtons />
          <OrDivider />

          <Field label="Full Name" error={errors.name}>
            <input
              type="text"
              placeholder="John Rider"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={inputCls(!!errors.name)}
            />
          </Field>

          <Field label="Email Address" error={errors.email}>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={inputCls(!!errors.email)}
            />
          </Field>

          <Field label="Password" error={errors.password}>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                className={`${inputCls(!!errors.password)} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPwd ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <path strokeLinecap="round" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path strokeLinecap="round" d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <path strokeLinecap="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </Field>

          <Field label="Confirm Password" error={errors.confirm}>
            <input
              type="password"
              placeholder="Re-enter password"
              value={form.confirm}
              onChange={(e) => set("confirm", e.target.value)}
              className={inputCls(!!errors.confirm)}
            />
          </Field>

          <p className="text-[11px] text-white/25 leading-relaxed">
            By joining you agree to our{" "}
            <span className="text-accent cursor-pointer hover:underline">Terms of Service</span> and{" "}
            <span className="text-accent cursor-pointer hover:underline">Privacy Policy</span>.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-60"
          >
            {loading && (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            )}
            {loading ? "Creating account..." : "Join Now"}
          </button>

          <p className="text-center text-xs text-white/30">
            Already a member?{" "}
            <button type="button" onClick={switchToSignIn} className="text-accent hover:underline font-semibold">
              Sign In
            </button>
          </p>
        </form>
      )}
    </ModalShell>
  );
}
