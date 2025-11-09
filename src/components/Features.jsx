import { Shield, Wand2, Timer, Puzzle } from 'lucide-react';

export default function Features() {
  const items = [
    {
      icon: Wand2,
      title: 'Co‑create, don\'t dictate',
      body: 'Every interaction is a dialogue. The system proposes; you steer. It learns from your edits and celebrates your voice.'
    },
    {
      icon: Timer,
      title: 'Time‑saving by design',
      body: 'Automations for the boring parts—setup, scaffolding, boilerplate—so you can focus on the parts only you can do.'
    },
    {
      icon: Puzzle,
      title: 'Composable copilots',
      body: 'Mix domain skills—writing, coding, research, design—into one canvas that adapts to the task at hand.'
    },
    {
      icon: Shield,
      title: 'Transparent by default',
      body: 'Show your work: citations, reasoning traces, and reversible changes built into the flow.'
    }
  ];

  return (
    <section id="features" className="relative isolate">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Principles & Capabilities</h2>
          <p className="mt-3 text-white/70">Innovation • Human‑AI Interaction • Real‑world Utility</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-white/70">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
