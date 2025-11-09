import { Lightbulb, Users, Sparkles } from 'lucide-react';

export default function ProblemFocus() {
  return (
    <section id="focus" className="relative isolate">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Human + AI: Co‑Creation for the Future</h2>
          <p className="mt-3 text-white/70">
            Build with AI, not just for AI. Create copilots that amplify human creativity, productivity, and learning.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-orange-500 to-yellow-400/90">
              <Lightbulb className="h-5 w-5 text-black" />
            </div>
            <h3 className="text-lg font-semibold">Style‑aware Code Copilot</h3>
            <p className="mt-2 text-sm text-white/70">
              An assistant that learns your patterns and suggests idiomatic refactors, tests, and architecture notes.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-fuchsia-500 to-pink-400">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold">Co‑creative Studio</h3>
            <p className="mt-2 text-sm text-white/70">
              A companion for art, stories, and design that riffs with you, offering variations you can steer in real‑time.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-400 to-emerald-400">
              <Users className="h-5 w-5 text-black" />
            </div>
            <h3 className="text-lg font-semibold">Personalized Tutor</h3>
            <p className="mt-2 text-sm text-white/70">
              Adapts to your pace and tone, guiding with scaffolding, practice loops, and gentle feedback.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
