import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemFocus from './components/ProblemFocus';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <Hero />
        <ProblemFocus />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
