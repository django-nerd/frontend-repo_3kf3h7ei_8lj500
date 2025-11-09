import { useState } from 'react';
import { Menu, X, Rocket } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-tr from-fuchsia-500 to-cyan-400">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          <span className="text-base font-semibold tracking-wide text-white">VibeLaunch</span>
        </div>

        <div className="hidden items-center gap-8 text-sm text-white/80 md:flex">
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#pricing" className="transition hover:text-white">Pricing</a>
          <a href="#about" className="transition hover:text-white">About</a>
        </div>

        <div className="hidden md:block">
          <a
            href="#get-started"
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-white/90"
          >
            Get Started
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="inline-flex items-center justify-center rounded-md border border-white/10 p-2 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-black/70 p-4 backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm text-white/80">
            <a href="#features" className="rounded-md px-2 py-2 hover:bg-white/5">Features</a>
            <a href="#pricing" className="rounded-md px-2 py-2 hover:bg-white/5">Pricing</a>
            <a href="#about" className="rounded-md px-2 py-2 hover:bg-white/5">About</a>
            <a
              href="#get-started"
              className="mt-2 rounded-md bg-white px-3 py-2 text-center font-medium text-black hover:bg-white/90"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
