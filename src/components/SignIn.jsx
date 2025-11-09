import { useState } from 'react';
import { Lock, Mail, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Simple client-side validation
    if (mode === 'signup' && form.name.trim().length < 2) {
      setError('Please enter your name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      // Mock auth: store a faux token and basic profile in localStorage
      const profile = {
        name: mode === 'signup' ? form.name : form.email.split('@')[0],
        email: form.email,
      };
      localStorage.setItem('auth_token', Math.random().toString(36).slice(2));
      localStorage.setItem('auth_profile', JSON.stringify(profile));

      // Navigate to the studio page after sign-in
      navigate('/studio');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative isolate min-h-[80vh] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_60%)]">
      <div className="mx-auto max-w-md px-4 py-16 sm:py-24">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {mode === 'signup' ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="mt-3 text-white/70">
            {mode === 'signup' ? 'Join the Human + AI co‑creation movement.' : 'Sign in to continue your co‑creation.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
          {mode === 'signup' && (
            <div>
              <label className="mb-1 block text-sm text-white/70" htmlFor="name">Name</label>
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3">
                <User className="h-4 w-4 text-white/60" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Ada Lovelace"
                  className="w-full bg-transparent py-2.5 text-sm text-white placeholder-white/40 outline-none"
                  autoComplete="name"
                />
              </div>
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm text-white/70" htmlFor="email">Email</label>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3">
              <Mail className="h-4 w-4 text-white/60" />
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
                className="w-full bg-transparent py-2.5 text-sm text-white placeholder-white/40 outline-none"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-white/70" htmlFor="password">Password</label>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3">
              <Lock className="h-4 w-4 text-white/60" />
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                placeholder="••••••••"
                className="w-full bg-transparent py-2.5 text-sm text-white placeholder-white/40 outline-none"
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                required
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white px-4 py-2.5 font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Sign in'}
          </button>

          <p className="text-center text-sm text-white/60">
            {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setMode((m) => (m === 'signup' ? 'signin' : 'signup'))}
              className="font-medium text-white hover:underline"
            >
              {mode === 'signup' ? 'Sign in' : 'Create one'}
            </button>
          </p>
        </form>
      </div>
    </section>
  );
}
