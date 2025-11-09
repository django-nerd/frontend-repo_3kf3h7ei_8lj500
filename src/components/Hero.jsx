import Spline from '@splinetool/react-spline';
import { Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative isolate">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/0C8f1sTz2E0u3rJm/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-28 sm:py-32 lg:flex-row lg:items-end lg:justify-between lg:py-40">
        <div className="text-center lg:text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/80 backdrop-blur">
            <Star className="h-3.5 w-3.5 text-yellow-300" />
            <span>Now with a slick 3D hero</span>
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Launch faster with a beautiful starter
          </h1>
          <p className="mt-4 max-w-xl text-balance text-base leading-relaxed text-white/80 sm:text-lg">
            A modern, animated landing page ready to customize. Built with React, Tailwind, and a live 3D scene you can interact with.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <a href="#get-started" className="w-full rounded-md bg-white px-5 py-3 text-center font-medium text-black shadow-sm transition hover:bg-white/90 sm:w-auto">
              Get Started
            </a>
            <a href="#features" className="w-full rounded-md border border-white/20 px-5 py-3 text-center font-medium text-white/90 transition hover:bg-white/5 sm:w-auto">
              See Features
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>
    </section>
  );
}
