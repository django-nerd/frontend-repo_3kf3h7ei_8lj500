import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section id="get-started" className="relative isolate">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 via-cyan-400/10 to-emerald-400/10 p-8 text-center">
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">Ready to co‑create?</h3>
          <p className="mx-auto mt-2 max-w-2xl text-white/70">Sign in to your studio and start iterating with quick blocks, suggestions, and exports. It’s fast, fun, and your changes persist locally.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link to="/signin" className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 font-medium text-black transition hover:bg-white/90">
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#features" className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-5 py-2.5 text-white/90 transition hover:bg-white/5">
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
