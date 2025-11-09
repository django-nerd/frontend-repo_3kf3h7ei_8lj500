import { Sparkles, Shield, GaugeCircle, Plug, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Polished UI',
    desc: 'Clean, accessible components with sensible defaults and modern aesthetics.',
  },
  {
    icon: Shield,
    title: 'Secure by default',
    desc: 'Built on best practices so you can focus on product, not boilerplate.',
  },
  {
    icon: GaugeCircle,
    title: 'Fast performance',
    desc: 'Vite-powered dev server and production builds that feel instant.',
  },
  {
    icon: Plug,
    title: 'API-ready',
    desc: 'Simple patterns to connect your frontend to any backend service.',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative border-t border-white/10 bg-black/50 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(120,119,198,0.15),rgba(0,0,0,0))]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">Everything you need to ship</h2>
          <p className="mt-3 text-base text-white/70">
            Opinionated patterns that stay out of your way when you need to move fast.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition duration-200 hover:-translate-y-0.5 hover:bg-white/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-tr from-fuchsia-500/80 to-cyan-400/80 text-white shadow-inner">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{desc}</p>
              <div className="mt-4 inline-flex items-center text-sm text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
                Learn more
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
