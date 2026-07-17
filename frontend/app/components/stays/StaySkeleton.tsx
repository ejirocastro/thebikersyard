export default function StaySkeleton() {
  return (
    <div className="flex-shrink-0 w-64 sm:w-72 animate-pulse">
      <div className="overflow-hidden rounded-2xl border border-white/6 bg-[#111]">
        <div className="h-44 bg-white/5" />
        <div className="p-4 flex flex-col gap-3">
          <div className="h-4 w-3/4 rounded-lg bg-white/8" />
          <div className="h-3 w-1/2 rounded-lg bg-white/5" />
          <div className="h-3 w-2/3 rounded-lg bg-white/5" />
          <div className="flex gap-1.5 mt-1">
            {[1,2,3,4,5].map((i) => (
              <div key={i} className="h-7 w-7 rounded-lg bg-white/5" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
