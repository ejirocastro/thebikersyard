"use client";

const EVENTS = [
  { id: 1, title: "MotoFest Championship", description: "The ultimate motorcycle championship featuring top riders from across the country competing for glory.", category: ["Motorsport", "Race"], price: "$120", attendees: 1156, progress: 85, bg: "from-orange-900 via-orange-800 to-black", label: "MOTO FEST", date: "Aug 14, 2026", time: "9:00 AM", location: "Lagos Speedway", status: "almost_full" },
  { id: 2, title: "Track Day Sprint", description: "A high-adrenaline track day sprint for riders who live for speed and precision on the tarmac.", category: ["Training", "Race"], price: "$120", attendees: 556, progress: 45, bg: "from-red-900 via-zinc-900 to-black", label: "SPRINT", date: "Aug 22, 2026", time: "7:30 AM", location: "Ikeja Circuit", status: "new" },
  { id: 3, title: "Gear & Ride Expo", description: "Explore the latest motorcycle gear, accessories and innovations from top brands worldwide.", category: ["Gear & Merch", "Expo"], price: "$120", attendees: 356, progress: 30, bg: "from-zinc-800 via-zinc-900 to-black", label: "GEAR EXPO", date: "Sep 5, 2026", time: "10:00 AM", location: "Eko Convention Centre", status: null },
  { id: 4, title: "Brotherhood Night Ride", description: "A community night ride through the city — brothers on the road, one mission, one lifestyle.", category: ["Community", "Road Trips"], price: "Free", attendees: 3226, progress: 95, bg: "from-amber-900 via-zinc-900 to-black", label: "NIGHT RIDE", date: "Jul 19, 2026", time: "8:00 PM", location: "Victoria Island, Lagos", status: "sold_out" },
  { id: 5, title: "Advanced Riding Clinic", description: "Professional training clinic led by expert coaches — sharpen your skills and ride safer.", category: ["Training"], price: "$120", attendees: 412, progress: 60, bg: "from-orange-950 via-zinc-900 to-black", label: "TRAINING", date: "Aug 2, 2026", time: "8:00 AM", location: "Abuja Race Track", status: null },
  { id: 6, title: "Tech & Tune Summit", description: "Join top mechanics and engineers for deep dives into motorcycle tech, tuning and performance.", category: ["Technology"], price: "$120", attendees: 4109, progress: 78, bg: "from-zinc-700 via-zinc-900 to-black", label: "TECH SUMMIT", date: "Sep 18, 2026", time: "11:00 AM", location: "Port Harcourt Hub", status: "almost_full" },
  { id: 7, title: "Desert Highway Cruise", description: "An epic cross-country highway cruise for riders seeking freedom, open roads and brotherhood.", category: ["Road Trips", "Community"], price: "$80", attendees: 432, progress: 50, bg: "from-yellow-900 via-zinc-900 to-black", label: "HIGHWAY", date: "Oct 3, 2026", time: "6:00 AM", location: "Kano — Abuja Route", status: "new" },
  { id: 8, title: "Stunt Riders Showcase", description: "Watch the world's best stunt riders push the limits of physics and machine in this live showcase.", category: ["Motorsport"], price: "$120", attendees: 1728, progress: 88, bg: "from-red-950 via-orange-950 to-black", label: "STUNT SHOW", date: "Aug 30, 2026", time: "3:00 PM", location: "National Stadium, Abuja", status: "almost_full" },
  { id: 9, title: "Women Who Ride", description: "A celebration of women in motorcycling — rides, talks, networking and community all day long.", category: ["Community"], price: "Free", attendees: 1306, progress: 72, bg: "from-rose-900 via-zinc-900 to-black", label: "WOMEN RIDE", date: "Sep 27, 2026", time: "9:00 AM", location: "Lekki, Lagos", status: null },
  { id: 10, title: "Superbike Invitational", description: "Elite superbike riders go head to head in this invite-only invitational race on a closed circuit.", category: ["Race", "Motorsport"], price: "$150", attendees: 2756, progress: 91, bg: "from-orange-800 via-zinc-900 to-black", label: "SUPERBIKE", date: "Nov 8, 2026", time: "10:00 AM", location: "Calabar Circuit", status: "sold_out" },
  { id: 11, title: "Vintage Bikes Meetup", description: "A gathering of classic and vintage motorcycle enthusiasts — history, restoration stories and rides.", category: ["Community", "Gear & Merch"], price: "Free", attendees: 1467, progress: 55, bg: "from-stone-700 via-zinc-900 to-black", label: "VINTAGE", date: "Oct 17, 2026", time: "11:00 AM", location: "Ibadan Heritage Park", status: null },
  { id: 12, title: "Enduro Off-Road Challenge", description: "Conquer dirt, mud and mountain terrain in the most grueling off-road enduro challenge of the year.", category: ["Race", "Training"], price: "$120", attendees: 799, progress: 40, bg: "from-lime-900 via-zinc-900 to-black", label: "ENDURO", date: "Nov 22, 2026", time: "7:00 AM", location: "Jos Plateau", status: "new" },
];

const AVATAR_COLORS = ["bg-orange-500", "bg-red-500", "bg-amber-500", "bg-zinc-500", "bg-orange-700", "bg-yellow-600"];

function AvatarStack({ count }: { count: number }) {
  const show = Math.min(3, count);
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex -space-x-1.5">
        {Array.from({ length: show }).map((_, i) => (
          <div key={i} className={`h-5 w-5 rounded-full border-2 border-[#111] ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`} />
        ))}
      </div>
      {count > 3 && <span className="text-[10px] text-white/35">+{count - 3}</span>}
    </div>
  );
}

type Status = "sold_out" | "almost_full" | "new" | null;

function StatusBadge({ status }: { status: Status }) {
  if (!status) return null;
  const map = {
    sold_out: { label: "Sold Out", cls: "bg-red-600/90 text-white" },
    almost_full: { label: "Almost Full", cls: "bg-amber-500/90 text-black" },
    new: { label: "New", cls: "bg-accent/90 text-white" },
  };
  const { label, cls } = map[status];
  return (
    <span className={`absolute left-3 top-3 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm ${cls}`}>
      {label}
    </span>
  );
}

export default function EventGrid({ search, sort }: { search: string; sort: string }) {
  const filtered = EVENTS.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.category.some((c) => c.toLowerCase().includes(search.toLowerCase()))
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price") {
      const pa = a.price === "Free" ? 0 : parseInt(a.price.replace("$", ""));
      const pb = b.price === "Free" ? 0 : parseInt(b.price.replace("$", ""));
      return pa - pb;
    }
    if (sort === "popular") return b.attendees - a.attendees;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  if (sorted.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center justify-center gap-4 py-8 text-center">
        <svg viewBox="0 0 64 64" fill="none" className="h-14 w-14 text-white/8">
          <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" />
          <path d="M20 32h24M32 20v24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p className="font-display text-lg font-bold italic uppercase text-white/20">No Events Found</p>
        <p className="text-sm text-white/30">Try a different search or clear your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {sorted.map((event) => (
        <div
          key={event.id}
          className="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#111] transition-all duration-300 hover:border-accent/25 hover:shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_0_1px_rgba(240,107,0,0.06)]"
        >
          {/* banner */}
          <div className={`relative flex h-32 items-center justify-center overflow-hidden bg-linear-to-br ${event.bg} sm:h-36`}>
            <span className="font-display text-lg font-bold italic tracking-wider text-white/15 select-none sm:text-xl">
              {event.label}
            </span>
            <StatusBadge status={event.status as Status} />
            <span className="absolute right-3 top-3 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
              {event.price}
            </span>
            <span className="absolute bottom-3 left-3 text-accent">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 2c0 0-4 4-4 8.5C8 13.5 9.5 15 12 15s4-1.5 4-4.5c0-.8-.2-1.5-.5-2.2C14.1 10 13 11 12 11c0-3 1-6 0-9Z" />
                <path d="M12 15c-2.5 0-4 1.5-4 3.5S9.5 22 12 22s4-1.5 4-3.5S14.5 15 12 15Z" opacity=".6" />
              </svg>
            </span>
          </div>

          {/* content */}
          <div className="flex flex-1 flex-col gap-3 p-4">
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white line-clamp-1">
                {event.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-white/40 line-clamp-2">
                {event.description}
              </p>
            </div>

            {/* date + location */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-xs text-white/45">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3 shrink-0 text-accent/70">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                {event.date} · {event.time}
              </div>
              <div className="flex items-center gap-2 text-xs text-white/45">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3 shrink-0 text-accent/70">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 5 6 13 6 13s6-8 6-13c0-3.314-2.686-6-6-6Z" /><circle cx="12" cy="8" r="2" />
                </svg>
                <span className="truncate">{event.location}</span>
              </div>
            </div>

            {/* tags */}
            <div className="flex flex-wrap gap-1">
              {event.category.map((cat) => (
                <span key={cat} className="rounded-full border border-white/8 px-2 py-0.5 text-[10px] text-white/40">
                  {cat}
                </span>
              ))}
            </div>

            {/* attendees + count */}
            <div className="flex items-center justify-between">
              <AvatarStack count={Math.floor(event.attendees / 100)} />
              <span className="text-xs font-semibold text-white/40">{event.attendees.toLocaleString()}</span>
            </div>

            {/* progress */}
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/8">
              <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${event.progress}%` }} />
            </div>

            {/* CTA */}
            <button
              disabled={event.status === "sold_out"}
              className={`mt-auto flex h-10 w-full items-center justify-center rounded-xl text-xs font-bold transition-all ${
                event.status === "sold_out"
                  ? "cursor-not-allowed bg-white/4 text-white/20"
                  : "border border-accent/20 bg-accent/8 text-accent hover:border-accent hover:bg-accent hover:text-white active:scale-[0.98]"
              }`}
            >
              {event.status === "sold_out" ? "Sold Out" : "View Details"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
