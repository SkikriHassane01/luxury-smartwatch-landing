import React from 'react';
import { ShieldCheck, Sparkles, X, Check, ExternalLink } from 'lucide-react';
import { sound } from '../../lib/sound-effects';

export const ParadigmShift: React.FC = () => {
  const amazonUrl = 'https://www.amazon.com/dp/B0GVK49N4M';

  return (
    <section id="paradigm-shift" className="relative w-full py-28 px-6 sm:px-12 bg-[#070707] border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A059]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[#C5A059]/30 text-[11px] font-mono text-[#C5A059] uppercase tracking-[0.2em] mb-4 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>THE THREE PS // PARADIGM SHIFT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white font-medium tracking-tight">
            Stop Wearing Plastic Toys <br className="hidden sm:inline" />
            <span className="gold-gradient-text italic font-normal">With Tailored Suits.</span>
          </h2>

          <p className="mt-5 text-sm sm:text-base text-[#8A8A8A] font-light leading-relaxed max-w-2xl mx-auto">
            Traditional luxury watches ignore modern health telemetry. Modern smartwatches look like cheap disposable silicon bricks. We engineered the definitive hybrid.
          </p>
        </div>

        {/* 3-Way Comparative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Card 1: Generic Smartwatch */}
          <div className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col justify-between relative group hover:border-white/10 transition-colors">
            <div>
              <div className="text-[11px] font-mono text-[#8A8A8A] uppercase tracking-wider mb-2">
                THE DISPOSABLE GADGET
              </div>
              <h3 className="text-2xl font-serif text-[#C8CFD7] font-medium">
                Generic Smartwatch
              </h3>
              <div className="mt-2 text-xl font-mono text-[#8A8A8A]">$399 — $799</div>

              <div className="mt-6 space-y-3 text-xs text-[#8A8A8A]">
                <div className="flex items-start space-x-2.5">
                  <X className="w-4 h-4 text-[#FF4D4D] shrink-0 mt-0.5" />
                  <span>Cheap plastic squircle case with silicone strap</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <X className="w-4 h-4 text-[#FF4D4D] shrink-0 mt-0.5" />
                  <span>Clashes visibly with formal shirts & business suits</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <X className="w-4 h-4 text-[#FF4D4D] shrink-0 mt-0.5" />
                  <span>18–36 hour battery life demanding daily charging</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <X className="w-4 h-4 text-[#FF4D4D] shrink-0 mt-0.5" />
                  <span>Rendered obsolete and disposable in 24 months</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 font-mono text-[11px] text-[#555]">
              VERDICT: Utilitarian tech toy lacking horological soul.
            </div>
          </div>

          {/* Card 2: Traditional Swiss Mechanical */}
          <div className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col justify-between relative group hover:border-white/10 transition-colors">
            <div>
              <div className="text-[11px] font-mono text-[#C5A059] uppercase tracking-wider mb-2">
                THE OLD STATUS SYMBOL
              </div>
              <h3 className="text-2xl font-serif text-white font-medium">
                Traditional Swiss Luxury
              </h3>
              <div className="mt-2 text-xl font-mono text-[#C5A059]">$5,000 — $15,000</div>

              <div className="mt-6 space-y-3 text-xs text-[#8A8A8A]">
                <div className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span className="text-[#CCC]">Heirloom fluted bezel & stainless metallurgy</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <X className="w-4 h-4 text-[#FF4D4D] shrink-0 mt-0.5" />
                  <span>Zero biometric telemetry (no HR, SpO2, or sleep)</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <X className="w-4 h-4 text-[#FF4D4D] shrink-0 mt-0.5" />
                  <span>No incoming call answering or wrist notifications</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <X className="w-4 h-4 text-[#FF4D4D] shrink-0 mt-0.5" />
                  <span>High ongoing maintenance & service overhaul fees</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 font-mono text-[11px] text-[#555]">
              VERDICT: Prestigious art piece with a total digital blind spot.
            </div>
          </div>

          {/* Card 3: SOUYIE H66PRO (The Winner / Crown Jewel) */}
          <div className="glass-panel p-8 rounded-3xl border-2 border-[#C5A059] shadow-2xl shadow-[#C5A059]/15 flex flex-col justify-between relative bg-gradient-to-b from-[#16140E] to-[#0A0A0A] transform md:-translate-y-3">
            {/* Top Recommended Tag */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C5A059] text-[#070707] font-mono text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
              THE HYBRID PARADIGM
            </div>

            <div>
              <div className="text-[11px] font-mono text-[#00D18F] uppercase tracking-wider mb-2 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>OFFICIAL AMAZON ASIN B0GVK49N4M</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
                SOUYIE H66PRO
              </h3>

              <div className="mt-2 flex items-baseline space-x-2.5 font-mono">
                <span className="text-3xl font-bold text-white">$69.99</span>
                <span className="text-sm text-[#8A8A8A] line-through">$129.99</span>
                <span className="text-xs text-[#00D18F] font-semibold">46% OFF</span>
              </div>

              <div className="mt-6 space-y-3 text-xs text-[#E5E5E5]">
                <div className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-[#00D18F] shrink-0 mt-0.5" />
                  <span><strong>48-ridge fluted coin-edge bezel</strong> & diamond crystal dial</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-[#00D18F] shrink-0 mt-0.5" />
                  <span><strong>1.32" 466×466 Retina AMOLED</strong> (353 PPI true blacks)</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-[#00D18F] shrink-0 mt-0.5" />
                  <span><strong>24/7 Optical PPG telemetry</strong> (Heart Rate, SpO2, Sleep)</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-[#00D18F] shrink-0 mt-0.5" />
                  <span><strong>Bluetooth 5.4 HD voice calls</strong> & IP68 waterproofing</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-[#00D18F] shrink-0 mt-0.5" />
                  <span><strong>7-day high-density battery</strong> with magnetic snap charging</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#C5A059]/30">
              <a
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playSapphireChime()}
                className="w-full py-3.5 px-4 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-[#070707] font-mono text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-[#C5A059]/30 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Claim Amazon Prime Offer</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <div className="mt-2 text-center font-mono text-[10px] text-[#8A8A8A]">
                30-Day Money Back · 12-Month Official Warranty
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
