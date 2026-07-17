import Image from "next/image";
import Embers from "./Embers";

export default function Hero() {
  return (
    <section className="relative flex min-h-[85svh] w-full items-end overflow-hidden pb-12 sm:items-center sm:min-h-[90svh] sm:pb-0">
      <Image
        src="/images/yardreso_4k.jpg"
        alt="Motorcyclist riding through flames"
        fill
        priority
        sizes="100vw"
        quality={100}
        className="object-cover object-[72%_30%] sm:object-right sm:object-center"
      />

      {/* gradient: left side black for text, right side reveals the bike */}
      <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/75 to-transparent sm:from-black sm:via-black/60 sm:to-black/10" />
      {/* top fade so it doesn't feel cut off */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-black/60 to-transparent" />
      {/* bottom blend */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent" />

      <Embers count={30} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div style={{ maxWidth: "min(520px, 75vw)" }}>
          {/* eyebrow */}
          <p className="font-display text-[10px] font-semibold italic uppercase tracking-[0.18em] text-accent/80 sm:text-[11px]">
            Ride Hard. Ride Smart. Ride <span className="text-accent">Bikers.Yard</span>
          </p>

          {/* headline */}
          <h1
            className="-skew-x-2 mt-2 font-display font-bold italic uppercase leading-[1.04] tracking-tight text-white sm:-skew-x-3"
            style={{ fontSize: "clamp(1.9rem, 8vw, 5rem)" }}
          >
            Ignite the
            <br />
            <span className="text-accent">Engine.</span>
            <br />
            Brotherhood.
          </h1>

          {/* body */}
          <p className="mt-3 text-sm leading-relaxed text-white/60 sm:mt-4 sm:text-base" style={{ maxWidth: "36ch" }}>
            Gear, training, and a community built for those who live for the road.
          </p>

          {/* CTAs — nowrap so they always sit side by side */}
          <div className="mt-6 flex items-center gap-3 sm:mt-8">
            <a
              href="#"
              className="flex h-11 shrink-0 items-center rounded-xl bg-accent px-5 text-sm font-bold text-white shadow-[0_0_20px_rgba(240,107,0,0.35)] transition-all hover:bg-orange-500 active:scale-95 sm:h-12 sm:px-7"
            >
              Explore Now
            </a>
            <a
              href="#"
              className="flex h-11 shrink-0 items-center gap-2 rounded-xl border border-white/25 bg-black/40 px-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 active:scale-95 sm:h-12 sm:px-6"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/40">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5 translate-x-px">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Watch Video
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
