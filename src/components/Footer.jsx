import { Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/60 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-sm text-white/70 sm:flex-row sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} VibeLaunch. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="#" aria-label="GitHub" className="rounded p-2 text-white/70 transition hover:bg-white/5 hover:text-white">
            <Github className="h-5 w-5" />
          </a>
          <a href="#" aria-label="Twitter" className="rounded p-2 text-white/70 transition hover:bg-white/5 hover:text-white">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="mailto:hello@example.com" aria-label="Email" className="rounded p-2 text-white/70 transition hover:bg-white/5 hover:text-white">
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
