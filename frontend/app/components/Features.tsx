const features = [
  {
    title: "Extreme Power",
    description: "High performance machines built for domination.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="h-9 w-9">
        {/* speedometer */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 17.5A7 7 0 0 1 12 5a7 7 0 0 1 5.5 2.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a6 6 0 0 1 5-9.9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12 9.5 9" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
        <path strokeLinecap="round" d="M8 18h8" />
      </svg>
    ),
  },
  {
    title: "Advanced Safety",
    description: "Ride with confidence using next-gen safety tech.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="h-9 w-9">
        {/* shield with checkmark */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.5 4 6v5c0 4.5 3.4 8.7 8 9.9 4.6-1.2 8-5.4 8-9.9V6L12 2.5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Smart Systems",
    description: "Intelligent systems that keep you ahead of every ride.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="h-9 w-9">
        {/* location pin with person silhouette inside */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 5 6 13 6 13s6-8 6-13c0-3.314-2.686-6-6-6Z" />
        <circle cx="12" cy="7.5" r="1.4" fill="currentColor" stroke="none" />
        <path strokeLinecap="round" d="M9.8 11.5c0-1.2 1-2.1 2.2-2.1s2.2.9 2.2 2.1" />
        {/* signal arcs */}
        <path strokeLinecap="round" d="M19 4.5a9 9 0 0 1 0 7" />
        <path strokeLinecap="round" d="M5 4.5a9 9 0 0 0 0 7" />
      </svg>
    ),
  },
  {
    title: "Rider Community",
    description: "Brothers on the road. One mission. One lifestyle.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="h-9 w-9">
        {/* arc over three people */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 20c0-2 1.8-3.5 4-3.5h6c2.2 0 4 1.5 4 3.5" />
        <circle cx="12" cy="9" r="2.5" />
        <path strokeLinecap="round" d="M1 20c0-1.5 1.3-2.7 3-2.7" />
        <circle cx="4" cy="11" r="1.8" />
        <path strokeLinecap="round" d="M23 20c0-1.5-1.3-2.7-3-2.7" />
        <circle cx="20" cy="11" r="1.8" />
        {/* arc above group */}
        <path strokeLinecap="round" d="M7 6.5a5.5 5.5 0 0 1 10 0" />
      </svg>
    ),
  },
];

const stats = [
  { value: "10K+", label: "Riders" },
  { value: "50+", label: "Events" },
  { value: "100+", label: "Destinations" },
  { value: "24/7", label: "Support" },
];

export default function Features() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 90% 80% at 75% 100%, rgba(180,65,0,0.55) 0%, rgba(120,40,0,0.3) 35%, #0a0a0a 70%)",
      }}
    >
      {/* secondary glow bottom-left for depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_15%_100%,rgba(140,50,0,0.3),transparent_65%)]" />

      <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-6 sm:px-10">
        {/*
          True glassmorphism: panel must be semi-transparent so the fire
          behind bleeds through the blur — bg uses rgba not a Tailwind
          opacity class so it doesn't fight the backdrop-filter
        */}
        <div
          className="rounded-2xl backdrop-blur-md shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
          style={{
            background: "rgba(18,14,10,0.55)",
            border: "1px solid rgba(255,150,50,0.12)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`flex flex-col gap-4 p-8 transition-colors hover:bg-white/[0.03] ${
                  i < 3 ? "lg:border-r" : ""
                } ${i === 1 ? "sm:border-r" : ""}`}
                style={{ borderColor: "rgba(255,150,50,0.08)" }}
              >
                <span className="text-accent">{f.icon}</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white">
                    {f.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* stats bar */}
      <div className="relative mx-auto max-w-6xl px-6 py-12 sm:px-10">
        <div className="grid grid-cols-2 gap-y-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center gap-2 ${
                i !== stats.length - 1 ? "lg:border-r lg:border-white/10" : ""
              }`}
            >
              <span className="font-display text-5xl font-bold italic text-accent sm:text-6xl">
                {s.value}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* orange glow line under stats */}
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      </div>
    </section>
  );
}
