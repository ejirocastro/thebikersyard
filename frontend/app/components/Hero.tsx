import Image from "next/image";
import Embers from "./Embers";

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] w-full items-center overflow-hidden sm:min-h-[90vh]">
      <Image
        src="/images/yardreso_4k.jpg"
        alt="Motorcyclist riding through flames"
        fill
        priority
        sizes="100vw"
        quality={100}
        // on mobile center the image so the bike is visible; shift right on larger screens
        className="object-cover object-center sm:object-right"
      />
      {/* heavier gradient on mobile so text is readable over centered image */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30 sm:from-black sm:via-black/60 sm:to-black/10" />
      <Embers count={35} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-lg sm:max-w-xl">
          <p className="-skew-x-3 font-display text-[11px] font-semibold italic uppercase tracking-widest text-white sm:-skew-x-6 sm:text-sm">
            Ride Hard. Ride Smart. Ride <span className="text-accent">BRO.</span>
          </p>
          <h1 className="-skew-x-3 mt-3 font-display text-4xl font-bold italic uppercase leading-tight tracking-tight text-white sm:-skew-x-6 sm:text-5xl md:text-6xl lg:text-7xl">
            Ignite the
            <br />
            <span className="text-accent">Engine.</span>
            <br />
            Brotherhood.
          </h1>
          <p className="mt-4 text-base text-white/70 sm:mt-6 sm:max-w-md sm:text-lg">
            Ride hard, ride together. Gear, training, and a community built
            for those who live for the road.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
            <a
              href="#"
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 sm:px-7 sm:py-3"
            >
              Explore Now
            </a>
            <a
              href="#"
              className="flex items-center gap-2 rounded-md border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 sm:px-7 sm:py-3"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/60">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5">
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
