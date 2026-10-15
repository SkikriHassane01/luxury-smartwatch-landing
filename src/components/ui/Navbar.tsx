import React from 'react';
import { sound } from '../../lib/sound-effects';
import { ShoppingBag, ExternalLink, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const amazonUrl = 'https://www.amazon.com/dp/B0GVK49N4M';

  const scrollTo = (id: string) => {
    sound.playMechanicalTick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-4 pointer-events-none transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand Monogram */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-2.5 glass-panel px-4 py-2 rounded-2xl cursor-pointer hover:border-[#C5A059]/50 transition-colors shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
          <span className="font-cinzel text-lg tracking-wider text-white font-bold">
            SOUYIE
          </span>
          <span className="text-[10px] font-mono tracking-widest text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded-full border border-[#C5A059]/20">
            H66PRO
          </span>
        </a>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 glass-panel px-3 py-1.5 rounded-2xl border border-white/10 shadow-lg text-xs font-mono">
          <button
            onClick={() => scrollTo('act1-reveal')}
            className="px-3.5 py-1.5 rounded-xl text-[#8A8A8A] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            The Orbit
          </button>
          <button
            onClick={() => scrollTo('paradigm-shift')}
            className="px-3.5 py-1.5 rounded-xl text-[#8A8A8A] hover:text-[#C5A059] hover:bg-white/5 transition-colors cursor-pointer"
          >
            Paradigm
          </button>
          <button
            onClick={() => scrollTo('act2-telemetry')}
            className="px-3.5 py-1.5 rounded-xl text-[#8A8A8A] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            Telemetry
          </button>
          <button
            onClick={() => scrollTo('act3-charger')}
            className="px-3.5 py-1.5 rounded-xl text-[#8A8A8A] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            Charging
          </button>
          <button
            onClick={() => scrollTo('act3-craftsmanship')}
            className="px-3.5 py-1.5 rounded-xl text-[#8A8A8A] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            Craftsmanship
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center space-x-3">
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playSapphireChime()}
            className="flex items-center space-x-2 bg-[#C5A059] hover:bg-[#D4AF37] text-[#070707] font-mono text-xs font-bold px-5 py-2.5 rounded-2xl shadow-lg shadow-[#C5A059]/25 hover:scale-[1.03] transition-all cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Buy on Amazon</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </div>
    </header>
  );
};
