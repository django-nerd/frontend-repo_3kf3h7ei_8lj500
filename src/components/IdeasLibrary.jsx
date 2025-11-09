import { useMemo, useState } from 'react';
import { Search, BookmarkPlus } from 'lucide-react';

const STARTER_IDEAS = [
  { id: 'persona-loop', title: 'Persona Feedback Loop', desc: 'Invite users to co‑author prompts based on their goals and values.', tags: ['feedback', 'co-creation'] },
  { id: 'metric-micro', title: 'Micro Success Metrics', desc: 'Define a tiny success metric for each block to keep outcomes clear.', tags: ['metrics', 'outcomes'] },
  { id: 'ritual-1-2-5', title: '1–2–5 Ritual', desc: 'Brainstorm alone, then pair, then group of five to merge ideas.', tags: ['rituals', 'workshop'] },
  { id: 'ethics-card', title: 'Ethics Check Card', desc: 'Quick checklist for safety, bias, and transparency before shipping.', tags: ['ethics', 'safety'] },
];

export default function IdeasLibrary({ onUse }) {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return STARTER_IDEAS;
    return STARTER_IDEAS.filter((i) => (
      i.title.toLowerCase().includes(term) ||
      i.desc.toLowerCase().includes(term) ||
      i.tags.join(' ').toLowerCase().includes(term)
    ));
  }, [q]);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-center gap-2">
        <Search className="h-4 w-4 text-white/60" />
        <input
          className="w-full rounded-md bg-black/40 px-3 py-2 text-sm text-white placeholder-white/40 outline-none"
          placeholder="Search starter ideas…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((i) => (
          <div key={i.id} className="rounded-lg border border-white/10 bg-black/30 p-3">
            <div className="text-sm font-medium">{i.title}</div>
            <div className="mt-1 text-sm text-white/70">{i.desc}</div>
            <div className="mt-2 flex flex-wrap gap-1">
              {i.tags.map((t) => (
                <span key={t} className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/70">{t}</span>
              ))}
            </div>
            <div className="mt-2 text-right">
              <button onClick={() => onUse(i)} className="inline-flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-xs text-white/80 transition hover:bg-white/5">
                <BookmarkPlus className="h-3.5 w-3.5" /> Use idea
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
