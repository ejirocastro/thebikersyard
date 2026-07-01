const navLinks = ["Home", "Training", "Shop", "Events", "About"];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b border-white/10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <a href="#" className="text-xl font-bold tracking-wide text-white">
          Bikers.<span className="text-accent">Yard</span>
        </a>

        <ul className="hidden items-center gap-8 text-sm font-medium text-white/80 md:flex">
          {navLinks.map((link) => (
            <li key={link}>
              <a href="#" className="transition-colors hover:text-accent">
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a
            href="#"
            className="hidden rounded-md border border-accent px-5 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent/10 sm:block"
          >
            Sign In
          </a>
          <a
            href="#"
            className="rounded-md bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Join Now
          </a>
        </div>
      </nav>
    </header>
  );
}
