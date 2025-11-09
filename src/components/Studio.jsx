import { useEffect, useMemo, useState } from 'react';
import { Sparkles, Plus, Trash2, Save, Download } from 'lucide-react';

function PromptForm({ onGenerate, disabled }) {
  const [prompt, setPrompt] = useState('Build a landing page section with a bold headline and two CTAs.');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        onGenerate(prompt);
      }}
      className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row"
    >
      <input
        className="w-full flex-1 rounded-lg bg-black/40 px-3 py-2 text-sm text-white placeholder-white/40 outline-none"
        placeholder="Describe what you want to create…"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        type="submit"
        disabled={disabled}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90 disabled:opacity-70"
      >
        <Sparkles className="h-4 w-4" /> Generate
      </button>
    </form>
  );
}

function CanvasCard({ item, onEdit, onRemove }) {
  const [text, setText] = useState(item.text);
  useEffect(() => setText(item.text), [item.text]);

  return (
    <div className="group rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4">
      <textarea
        className="h-28 w-full resize-none rounded-md bg-black/40 p-3 text-sm leading-relaxed text-white outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => onEdit({ ...item, text })}
      />
      <div className="mt-3 flex items-center justify-between text-xs text-white/60">
        <span>Block • {item.type}</span>
        <button onClick={() => onRemove(item.id)} className="hidden items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-white/70 transition hover:bg-white/5 group-hover:flex">
          <Trash2 className="h-3.5 w-3.5" /> remove
        </button>
      </div>
    </div>
  );
}

export default function Studio() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('studio_items');
    return saved ? JSON.parse(saved) : [
      { id: crypto.randomUUID(), type: 'heading', text: 'Human + AI: Co‑Creation Canvas' },
      { id: crypto.randomUUID(), type: 'paragraph', text: 'Iterate with quick blocks. Edit text, rearrange, and export your idea.' }
    ];
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    localStorage.setItem('studio_items', JSON.stringify(items));
  }, [items]);

  const handleGenerate = (prompt) => {
    // A lightweight mock of an AI suggestion: produce a new block from the prompt
    const suggestion = `Suggestion: ${prompt}`;
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: 'paragraph', text: suggestion }
    ]);
  };

  const addBlock = () => setItems((prev) => ([...prev, { id: crypto.randomUUID(), type: 'paragraph', text: 'New block…' }]));
  const removeBlock = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const editBlock = (updated) => setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));

  const exportText = () => {
    const content = items.map((i) => (i.type === 'heading' ? `# ${i.text}` : `- ${i.text}`)).join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'co-creation-notes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const profile = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('auth_profile') || '{}');
    } catch {
      return {};
    }
  }, []);

  return (
    <section className="min-h-[80vh]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Co‑Creation Studio</h1>
            <p className="mt-1 text-white/70">Welcome{profile?.name ? `, ${profile.name}` : ''}! Sketch ideas, get quick suggestions, and export results.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={addBlock} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-white/90 transition hover:bg-white/5">
              <Plus className="h-4 w-4" /> Add block
            </button>
            <button onClick={() => { setSaving(true); setTimeout(() => setSaving(false), 600); }} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-white/90 transition hover:bg-white/5">
              <Save className="h-4 w-4" /> {saving ? 'Saving…' : 'Save' }
            </button>
            <button onClick={exportText} className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-white/90">
              <Download className="h-4 w-4" /> Export
            </button>
          </div>
        </div>

        <PromptForm onGenerate={handleGenerate} />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <CanvasCard key={item.id} item={item} onEdit={editBlock} onRemove={removeBlock} />
          ))}
        </div>
      </div>
    </section>
  );
}
