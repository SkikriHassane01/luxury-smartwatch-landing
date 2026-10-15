import React from 'react';
import { Sparkles, Shield, Activity, Eye, Watch } from 'lucide-react';


export const CraftsmanshipBento: React.FC = () => {
  return (
    <section className="relative w-full py-24 px-6 sm:px-12 bg-[#070707] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-[11px] tracking-[0.25em] text-[#C5A059] uppercase block mb-2">
            MATERIALS & METALLURGY
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white font-medium">
            Heirloom Swiss Craftsmanship
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-[#8A8A8A] font-light">
            Constructed to command the boardroom and survive the ocean.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card 1: Fluted Bezel (Large span) */}
          <div className="md:col-span-2 glass-panel p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#C5A059]/15 to-transparent blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            <div className="flex flex-col sm:flex-row gap-6 items-start justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/15 flex items-center justify-center text-[#C5A059] mb-6">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="font-mono text-[11px] text-[#C5A059] uppercase tracking-wider block mb-1">
                  AESTHETIC SIGNATURE
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
                  Classic Fluted Bezel & Diamonds
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-[#8A8A8A] leading-relaxed max-w-sm">
                  Each fluting ridge is angled at precisely 45 degrees to refract ambient light across the dial. The hallmark of prestigious Geneva horology, featuring 10 diamond crystal indices and a magnified cyclops date display.
                </p>
              </div>
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border border-[#C5A059]/30 shrink-0 shadow-2xl relative group-hover:scale-105 transition-transform duration-500">
                <img
                  src={`${import.meta.env.BASE_URL}assets/generated/start_frame_grounded_1.png`}
                  alt="SOUYIE Fluted Bezel and Diamond Dial"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-1 right-1 font-mono text-[8px] bg-black/80 text-[#C5A059] px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/10">
                  1080P MASTER
                </div>
              </div>
            </div>
            <div className="mt-8 flex items-center space-x-6 text-xs font-mono text-[#E5E5E5] border-t border-white/10 pt-4">
              <div>
                <span className="text-[#8A8A8A] block">FACETS</span>
                <span className="text-base font-bold text-white">48 Fluted Ridges</span>
              </div>
              <div>
                <span className="text-[#8A8A8A] block">INDICES</span>
                <span className="text-base font-bold text-[#C5A059]">10 Diamond Markers</span>
              </div>
              <div>
                <span className="text-[#8A8A8A] block">POLISH</span>
                <span className="text-base font-bold text-[#C5A059]">Mirror-Finish</span>
              </div>
            </div>
          </div>

          {/* Card 2: Butterfly Clasp & Jubilee Bracelet */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col justify-between group relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#005934]/25 flex items-center justify-center text-[#0d8252]">
                  <Watch className="w-6 h-6" />
                </div>
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 shrink-0 shadow-lg">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/generated/end_frame_grounded_1.png`}
                    alt="Stainless Clasp & PPG Sensor"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
              <span className="font-mono text-[11px] text-[#0d8252] uppercase tracking-wider block mb-1">
                METALLURGY & CLASP
              </span>
              <h3 className="text-xl font-serif text-white font-semibold">
                Jubilee Steel & Clasp
              </h3>
              <p className="mt-3 text-xs text-[#8A8A8A] leading-relaxed">
                5-link Jubilee bracelet fastened with a concealed double-deployment butterfly push clasp stamped STEEL STAINLESS.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[11px] text-[#8A8A8A] flex justify-between">
              <span>Lug: <strong className="text-white">22mm</strong></span>
              <span>Clasp: <strong className="text-[#C5A059]">Butterfly</strong></span>
            </div>
          </div>

          {/* Card 3: 1.32" 466x466 AMOLED */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#4D96FF]/15 flex items-center justify-center text-[#4D96FF] mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <span className="font-mono text-[11px] text-[#4D96FF] uppercase tracking-wider block mb-1">
                OPTICS & AOD
              </span>
              <h3 className="text-xl font-serif text-white font-semibold">
                Retina AMOLED 466×466
              </h3>
              <p className="mt-3 text-xs text-[#8A8A8A] leading-relaxed">
                Inky true blacks with infinite contrast ratio. Always-On Display (AOD) shows time and date without waking the screen.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[11px] text-[#8A8A8A]">
              <span>Pixel Density: </span>
              <span className="text-[#4D96FF] font-bold">353 PPI</span>
            </div>
          </div>

          {/* Card 4: IP68 Resistance */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#00D18F]/15 flex items-center justify-center text-[#00D18F] mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <span className="font-mono text-[11px] text-[#00D18F] uppercase tracking-wider block mb-1">
                SEALING
              </span>
              <h3 className="text-xl font-serif text-white font-semibold">
                IP68 Submersible
              </h3>
              <p className="mt-3 text-xs text-[#8A8A8A] leading-relaxed">
                Ready for swimming, heavy rain, and dust storms. Double-gasket silicone seals protect acoustic chambers.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[11px] text-[#8A8A8A]">
              <span>Depth: </span>
              <span className="text-[#00D18F] font-bold">1.5m Submersible</span>
            </div>
          </div>

          {/* Card 5: 160+ Sports & Navigation */}
          <div className="md:col-span-2 lg:col-span-3 glass-panel p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group">
            <div>
              <div className="inline-flex items-center space-x-2 text-[11px] font-mono text-[#C5A059] uppercase tracking-wider mb-2">
                <Activity className="w-4 h-4" />
                <span>BIOMETRIC INTELLIGENCE</span>
              </div>
              <h3 className="text-2xl font-serif text-white font-semibold">
                160+ Athletic Modes & PPG Vital Sensing
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#8A8A8A] max-w-xl">
                Advanced kinematic algorithms track movement cadence, calorie burn, blood oxygen saturation (SpO2), heart rate variability (HRV), and recovery readiness.
              </p>
            </div>
            <div className="flex items-center space-x-3 shrink-0">
              <div className="px-4 py-2.5 rounded-xl bg-[#121212] border border-white/10 font-mono text-xs text-white">
                <span className="text-[#C5A059] font-bold text-lg block">160+</span>
                <span className="text-[#8A8A8A] text-[10px]">Sport Profiles</span>
              </div>
              <div className="px-4 py-2.5 rounded-xl bg-[#121212] border border-white/10 font-mono text-xs text-white">
                <span className="text-[#00FF88] font-bold text-lg block">24/7</span>
                <span className="text-[#8A8A8A] text-[10px]">PPG Telemetry</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
