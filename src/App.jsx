import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemFocus from './components/ProblemFocus';
import Features from './components/Features';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <Hero />
        <ProblemFocus />
        <Features />
      </main>
      <footer className="border-t border-white/10 bg-black/60 py-8 text-center text-sm text-white/60">
        <p>
          Human + AI Co‑Creation • Built with React, Tailwind, and an interactive 3D scene.
        </p>
      </footer>
    </div>
  );
}

export default App;
