import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] w-full items-center overflow-hidden">
      <Image
        src="/images/yardreso_4k.jpg"
        alt="Motorcyclist riding through flames"
        fill
        priority
        sizes="100vw"
        quality={100}
        className="object-cover object-right"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/10" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="max-w-xl">
          <p className="-skew-x-6 font-display text-sm font-semibold italic uppercase tracking-widest text-white">
            Ride Hard. Ride Smart. Ride <span className="text-accent">BRO.</span>
          </p>
          <h1 className="-skew-x-6 mt-3 font-display text-5xl font-bold italic uppercase leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Ignite the
            <br />
            <span className="text-accent">Engine.</span>
            <br />
            Brotherhood.
          </h1>
          <p className="mt-6 max-w-md text-lg text-white/70">
            Ride hard, ride together. Gear, training, and a community built
            for those who live for the road.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="rounded-md bg-accent px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Explore Now
            </a>
            <a
              href="#"
              className="flex items-center gap-2 rounded-md border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
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
