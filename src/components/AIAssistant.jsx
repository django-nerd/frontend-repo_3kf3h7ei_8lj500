import { useEffect, useMemo, useState } from 'react';
import { Sparkles, Wand2, ListTodo, Lightbulb } from 'lucide-react';

// Lightweight, on-device "AI" heuristics to keep UX instant and private
function extractKeywords(text) {
  return Array.from(new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 3 && !['with', 'that', 'this', 'from', 'have', 'about', 'into', 'your', 'their', 'there', 'which', 'and', 'the', 'for'].includes(w))
  ));
}

function outlineFromPrompt(prompt) {
  const base = prompt.replace(/\.$/, '');
  return [
    `Objective: ${base}`,
    'Audience: Who benefits and why',
    'Success criteria: Measurable outcomes',
    'Flow: Discover → Co-create → Iterate → Share',
  ];
}

function tasksFromPrompt(prompt) {
  const kw = extractKeywords(prompt);
  const top = kw.slice(0, 5);
  return [
    'Draft a compelling headline',
    'Create a two-sentence value proposition',
    `List 3 user outcomes${top.length ? ` about ${top.join(', ')}` : ''}`,
    'Design the primary CTA and its success metric',
  ];
}

function improveClarity(text) {
  // Simple readability pass: shorten sentences and remove filler words
  return text
    .replace(/\b(really|very|actually|basically|simply)\b/gi, '')
    .replace(/\s+/g, ' ')
    .split('. ')
    .map((s) => (s.length > 90 ? s.slice(0, 87) + '…' : s))
    .join('. ')
    .trim();
}

export default function AIAssistant({ items, onInsert }) {
  const [mode, setMode] = useState('suggest');
  const [prompt, setPrompt] = useState('Build a landing section that showcases human + AI collaboration with clear CTAs.');
  const [loading, setLoading] = useState(false);
  const [useCloud, setUseCloud] = useState(true);

  const combinedText = useMemo(() => items.map((i) => i.text).join(' '), [items]);

  const suggestions = useMemo(() => {
    if (mode === 'outline') return outlineFromPrompt(prompt);
    if (mode === 'tasks') return tasksFromPrompt(prompt);
    if (mode === 'clarify') return [improveClarity(combinedText || prompt)];
    // default: suggest
    const kw = extractKeywords(prompt + ' ' + combinedText);
    const headline = kw.slice(0, 2).map((k) => k[0].toUpperCase() + k.slice(1)).join(' + ') || 'Human + AI';
    return [
      `${headline}: co-create outcomes, not just outputs`,
      'Add a short success metric under each idea',
      'Invite feedback loops: draft → test → refine',
    ];
  }, [mode, prompt, combinedText]);

  useEffect(() => {
    // persist last prompt locally per session
    sessionStorage.setItem('ai_prompt', prompt);
  }, [prompt]);

  useEffect(() => {
    const last = sessionStorage.getItem('ai_prompt');
    if (last) setPrompt(last);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callBackend = async () => {
    const base = import.meta.env.VITE_BACKEND_URL || '';
    const url = `${base}/api/generate`;
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, mode, text: combinedText.slice(0, 1500) }),
      });
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      const list = Array.isArray(data?.suggestions) ? data.suggestions : [];
      list.forEach((s) => onInsert({ type: 'paragraph', text: s }));
    } catch (e) {
      // graceful fallback to local heuristics
      suggestions.forEach((s) => onInsert({ type: 'paragraph', text: s }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-xs text-white/70">
          <Sparkles className="h-3.5 w-3.5 text-purple-300" />
          <span>AI Sidekick</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/70">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" className="accent-white" checked={useCloud} onChange={(e) => setUseCloud(e.target.checked)} />
            Cloud AI
          </label>
          <div className="flex gap-1">
            <button
              className={`rounded-md px-2 py-1 text-xs ${mode === 'suggest' ? 'bg-white text-black' : 'border border-white/10 text-white/80'}`}
              onClick={() => setMode('suggest')}
              aria-label="Suggest"
            >
              <Lightbulb className="mr-1 inline h-3.5 w-3.5" />Suggest
            </button>
            <button
              className={`rounded-md px-2 py-1 text-xs ${mode === 'outline' ? 'bg-white text-black' : 'border border-white/10 text-white/80'}`}
              onClick={() => setMode('outline')}
              aria-label="Outline"
            >
              <Wand2 className="mr-1 inline h-3.5 w-3.5" />Outline
            </button>
            <button
              className={`rounded-md px-2 py-1 text-xs ${mode === 'tasks' ? 'bg-white text-black' : 'border border-white/10 text-white/80'}`}
              onClick={() => setMode('tasks')}
              aria-label="Tasks"
            >
              <ListTodo className="mr-1 inline h-3.5 w-3.5" />Tasks
            </button>
            <button
              className={`rounded-md px-2 py-1 text-xs ${mode === 'clarify' ? 'bg-white text-black' : 'border border-white/10 text-white/80'}`}
              onClick={() => setMode('clarify')}
              aria-label="Clarify"
            >
              <Wand2 className="mr-1 inline h-3.5 w-3.5" />Clarify
            </button>
          </div>
        </div>
      </div>

      <label className="mb-2 block text-xs text-white/60">Idea focus</label>
      <input
        className="mb-3 w-full rounded-lg bg-black/40 px-3 py-2 text-sm text-white placeholder-white/40 outline-none"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the theme, audience, and goal"
      />

      {useCloud ? (
        <button
          onClick={callBackend}
          disabled={loading}
          className="mb-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-white/90 disabled:opacity-70"
        >
          <Sparkles className="h-4 w-4" /> {loading ? 'Thinking…' : 'Generate with AI'}
        </button>
      ) : null}

      <ul className="space-y-2">
        {suggestions.map((s, idx) => (
          <li key={idx} className="rounded-lg border border-white/10 bg-black/30 p-3 text-sm leading-relaxed">
            <div>{s}</div>
            <div className="mt-2 text-right">
              <button
                onClick={() => onInsert({ type: 'paragraph', text: s })}
                className="rounded-md border border-white/10 px-2 py-1 text-xs text-white/80 transition hover:bg-white/5"
              >
                Insert
              </button>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
