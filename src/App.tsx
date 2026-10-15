import { useEffect } from 'react';
import { initSmoothScroll, destroySmoothScroll } from './lib/smooth-scroll';
import { WatchCanvasScrub } from './components/canvas-scrub/WatchCanvasScrub';
import { ParadigmShift } from './components/act1-reveal/ParadigmShift';
import { SpecsMatrix } from './components/act3-telemetry/SpecsMatrix';
import { MagneticCharger } from './components/act3-telemetry/MagneticCharger';
import { CraftsmanshipBento } from './components/act3-telemetry/CraftsmanshipBento';
import { Navbar } from './components/ui/Navbar';
import { ConversionDock } from './components/ui/ConversionDock';
import { ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';

export function App() {
  useEffect(() => {
    // Mount Lenis Smooth Scroll tied to GSAP ScrollTrigger ticker
    initSmoothScroll();

    return () => {
      destroySmoothScroll();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070707] text-[#E5E5E5] selection:bg-[#C5A059] selection:text-[#070707] overflow-x-hidden">
      {/* Floating Luxury Navbar */}
      <Navbar />

      {/* Main Minimal Interaction Journey */}
      <main id="top" className="w-full">
        {/* ACT 1: Butter-Smooth 60-120FPS Canvas Frame-Sequence Scrub */}
        <section id="act1-reveal" className="w-full">
          <WatchCanvasScrub totalFrames={192} />
        </section>

        {/* ACT 1.5: THE THREE PS // PARADIGM SHIFT COMPARISON */}
        <section id="act1-paradigm" className="w-full">
          <ParadigmShift />
        </section>

        {/* ACT 2: TECHNICAL TELEMETRY */}
        <section id="act2-telemetry" className="w-full">
          <SpecsMatrix />
        </section>

        {/* Interactive Magnetic Fast Charger */}
        <section id="act3-charger" className="w-full">
          <MagneticCharger />
        </section>

        {/* Swiss Horology Craftsmanship Bento Grid */}
        <section id="act3-craftsmanship" className="w-full">
          <CraftsmanshipBento />
        </section>
      </main>


      {/* Editorial Luxury Horology Footer */}
      <footer className="relative w-full bg-[#050607] border-t border-white/10 pt-16 pb-32 px-6 sm:px-12 text-xs font-mono text-[#8A8A8A]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center space-x-2 text-white font-serif text-2xl font-bold mb-2">
              <Sparkles className="w-5 h-5 text-[#C5A059]" />
              <span className="font-cinzel">SOUYIE HOROLOGY</span>
            </div>
            <p className="max-w-md text-xs text-[#8A8A8A] font-light leading-relaxed font-sans">
              Swiss fluted bezel craftsmanship meeting Silicon Valley biometric silicon. Model H66PRO.
            </p>
            <div className="mt-4 flex items-center space-x-3 text-[11px] text-[#C5A059]">
              <ShieldCheck className="w-4 h-4 text-[#00D18F]" />
              <span>Official Amazon Catalog Product · ASIN: B0GVK49N4M</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            <div>
              <span className="text-white block font-bold mb-2">TELEMETRY</span>
              <ul className="space-y-1 text-[11px]">
                <li>Bluetooth 5.4 HD Voice</li>
                <li>1.32" 466×466 Retina AMOLED</li>
                <li>IP68 / 5ATM Water Resistant</li>
                <li>4-Point Optical PPG Array</li>
              </ul>
            </div>

            <div>
              <span className="text-white block font-bold mb-2">GUARANTEE</span>
              <ul className="space-y-1 text-[11px]">
                <li>12-Month Official Warranty</li>
                <li>30-Day Amazon Money-Back</li>
                <li>Free Prime Global Delivery</li>
                <li>24/7 Concierge Support</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#555]">
          <span>© 2026 SOUYIE Watch Co. All Rights Reserved. ASIN: B0GVK49N4M.</span>
          <div className="flex items-center space-x-4">
            <a
              href="https://www.amazon.com/dp/B0GVK49N4M"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C5A059] flex items-center space-x-1"
            >
              <span>View on Amazon Store</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Conversion Dock (Bottom Thumb-Zone) */}
      <ConversionDock />
    </div>
  );
}

export default App;
