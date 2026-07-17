import Image from "next/image";
import Embers from "./Embers";

export default function Hero() {
  return (
    <section className="relative flex min-h-[88svh] w-full items-center overflow-hidden sm:min-h-[90svh]">
      <Image
        src="/images/yardreso_4k.jpg"
        alt="Motorcyclist riding through flames"
        fill
        priority
        sizes="100vw"
        quality={100}
        className="object-cover object-[68%_center] sm:object-[center_center] sm:object-right"
      />

      {/* left-to-right gradient — strong black on text side, fades to reveal fire */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/10 sm:from-black sm:via-black/65 sm:to-black/5" />
      {/* bottom fade to blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />

      <Embers count={35} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-0 lg:px-10">
        <div className="w-full max-w-[clamp(280px,80vw,560px)]">
          {/* eyebrow */}
          <p className="font-display text-[clamp(9px,2.5vw,11px)] font-semibold italic uppercase tracking-[0.18em] text-accent/80">
            Ride Hard. Ride Smart. Ride{" "}
            <span className="text-accent">Bikers.Yard</span>
          </p>

          {/* headline — fluid type that never clips */}
          <h1
            className="-skew-x-2 mt-2 font-display font-bold italic uppercase leading-[1.04] tracking-tight text-white sm:-skew-x-3"
            style={{ fontSize: "clamp(2rem, 7vw, 5rem)" }}
          >
            Ignite the
            <br />
            <span className="text-accent">Engine.</span>
            <br />
            Brotherhood.
          </h1>

          {/* body */}
          <p
            className="mt-3 leading-relaxed text-white/60 sm:mt-5"
            style={{ fontSize: "clamp(0.8rem, 2.2vw, 1rem)", maxWidth: "38ch" }}
          >
            Gear, training, and a community built for those who live for the road.
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
            <a
              href="#"
              className="flex h-11 items-center rounded-xl bg-accent px-6 text-sm font-bold text-white shadow-[0_0_24px_rgba(240,107,0,0.35)] transition-all hover:bg-orange-500 hover:shadow-[0_0_32px_rgba(240,107,0,0.45)] active:scale-95 sm:h-12 sm:px-8"
            >
              Explore Now
            </a>
            <a
              href="#"
              className="flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-black/30 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/8 active:scale-95 sm:h-12 sm:px-8"
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
