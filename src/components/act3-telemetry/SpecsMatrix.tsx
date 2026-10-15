import React, { useState } from 'react';
import { sound } from '../../lib/sound-effects';
import {
  PhoneCall,
  ShieldCheck,
  HeartPulse,
  Radio,
  Mic,
  Volume2,
  Droplets,
  Award,
  Activity,
  Moon,
} from 'lucide-react';


type SpecTab = 'connectivity' | 'durability' | 'health';

export const SpecsMatrix: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SpecTab>('connectivity');

  const handleTabChange = (tab: SpecTab) => {
    sound.playMechanicalTick();
    setActiveTab(tab);
  };

  return (
    <section className="relative w-full py-24 px-6 sm:px-12 bg-[#070707] border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Monogram Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121212] border border-[#005934]/50 text-[11px] font-mono text-[#0d8252] uppercase tracking-wider mb-4">
            <Radio className="w-3.5 h-3.5" />
            <span>ACT 3 // TECHNICAL TELEMETRY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white font-medium tracking-tight">
            Engineered Beyond Convention
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#8A8A8A] font-light leading-relaxed">
            Every millimeter of the SOUYIE H66PRO is calibrated to merge heirloom Swiss aesthetics with rigorous biometric and acoustic engineering.
          </p>

          {/* Interactive Navigation Tabs */}
          <div className="mt-10 inline-flex p-1.5 rounded-2xl bg-[#121212] border border-white/10 max-w-xl w-full justify-between">
            <button
              onClick={() => handleTabChange('connectivity')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-mono flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                activeTab === 'connectivity'
                  ? 'bg-[#C5A059] text-[#070707] font-bold shadow-lg shadow-[#C5A059]/20'
                  : 'text-[#8A8A8A] hover:text-white hover:bg-white/5'
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              <span>Connectivity</span>
            </button>

            <button
              onClick={() => handleTabChange('durability')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-mono flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                activeTab === 'durability'
                  ? 'bg-[#C5A059] text-[#070707] font-bold shadow-lg shadow-[#C5A059]/20'
                  : 'text-[#8A8A8A] hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Durability</span>
            </button>

            <button
              onClick={() => handleTabChange('health')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-mono flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                activeTab === 'health'
                  ? 'bg-[#C5A059] text-[#070707] font-bold shadow-lg shadow-[#C5A059]/20'
                  : 'text-[#8A8A8A] hover:text-white hover:bg-white/5'
              }`}
            >
              <HeartPulse className="w-4 h-4" />
              <span>Biometrics</span>
            </button>
          </div>
        </div>

        {/* Tab 1: CONNECTIVITY & AUDIO */}
        {activeTab === 'connectivity' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-[#C5A059] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059] mb-4">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] text-[#8A8A8A] uppercase tracking-wider block mb-1">
                  Single-Chip Telephony
                </span>
                <h3 className="text-xl font-serif text-white font-semibold">
                  Bluetooth 5.4 HD Voice
                </h3>
                <p className="mt-3 text-xs text-[#8A8A8A] leading-relaxed">
                  Latest BT 5.4 protocol delivers instant dial, crystal-clear incoming call answering, and seamless address book synchronization with ultra-low latency.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs text-[#C5A059] flex items-center justify-between">
                <span>Effective Range</span>
                <span className="text-white font-bold">15m / 50ft</span>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-[#005934] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#005934]/20 flex items-center justify-center text-[#0d8252] mb-4">
                  <Volume2 className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] text-[#8A8A8A] uppercase tracking-wider block mb-1">
                  Acoustic Engineering
                </span>
                <h3 className="text-xl font-serif text-white font-semibold">
                  High-Fidelity Speaker Cavity
                </h3>
                <p className="mt-3 text-xs text-[#8A8A8A] leading-relaxed">
                  Integrated 3-slot speaker grille at 9 o'clock engineered with waterproof acoustic membrane producing rich, intelligible audio even in noisy urban environments.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs text-[#0d8252] flex items-center justify-between">
                <span>Sound Pressure</span>
                <span className="text-white font-bold">88 dB SPL Peak</span>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-[#4D96FF] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#4D96FF]/15 flex items-center justify-center text-[#4D96FF] mb-4">
                  <Mic className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] text-[#8A8A8A] uppercase tracking-wider block mb-1">
                  Voice Intelligence
                </span>
                <h3 className="text-xl font-serif text-white font-semibold">
                  Noise-Reducing MEMS Mic
                </h3>
                <p className="mt-3 text-xs text-[#8A8A8A] leading-relaxed">
                  Precision pinhole microphone paired with active DSP wind-noise cancellation and native voice assistant trigger (Siri / Google Assistant).
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs text-[#4D96FF] flex items-center justify-between">
                <span>Voice Assistant</span>
                <span className="text-white font-bold">Instant Wake Trigger</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: DURABILITY & CHASSIS */}
        {activeTab === 'durability' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-[#00D18F] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#00D18F]/15 flex items-center justify-center text-[#00D18F] mb-4">
                  <Droplets className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] text-[#8A8A8A] uppercase tracking-wider block mb-1">
                  Water & Dust Ingress
                </span>
                <h3 className="text-xl font-serif text-white font-semibold">
                  IP68 Certified Hermetic Seal
                </h3>
                <p className="mt-3 text-xs text-[#8A8A8A] leading-relaxed">
                  Dual-tier internal silicone gaskets completely seal the acoustic ports, crown stem, and optical glass against dust, sand, and water immersion up to 1.5 meters.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs text-[#00D18F] flex items-center justify-between">
                <span>Submersion Rating</span>
                <span className="text-white font-bold">1.5m / 30 Minutes</span>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-[#C5A059] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/15 flex items-center justify-center text-[#C5A059] mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] text-[#8A8A8A] uppercase tracking-wider block mb-1">
                  Metallurgy
                </span>
                <h3 className="text-xl font-serif text-white font-semibold">
                  Die-Cast Zinc Alloy Case
                </h3>
                <p className="mt-3 text-xs text-[#8A8A8A] leading-relaxed">
                  Engineered from high-density zinc alloy for robust impact resistance while maintaining the substantial, weighted luxury wrist feel of an automatic chronometer.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs text-[#C5A059] flex items-center justify-between">
                <span>Vickers Hardness</span>
                <span className="text-white font-bold">HV 140 High-Tensile</span>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-[#FFFFFF] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] text-[#8A8A8A] uppercase tracking-wider block mb-1">
                  Optics Protection
                </span>
                <h3 className="text-xl font-serif text-white font-semibold">
                  Sapphire-Coated Mineral Glass
                </h3>
                <p className="mt-3 text-xs text-[#8A8A8A] leading-relaxed">
                  Multi-layer anti-fingerprint oleophobic coating with genuine sapphire crystal sputter-deposition resists micro-scratches from daily desk diving and outdoor sports.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs text-white flex items-center justify-between">
                <span>Scratch Resistance</span>
                <span className="text-white font-bold">Mohs 8.5 Scale</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: HEALTH & BIOMETRICS */}
        {activeTab === 'health' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-[#FF4D4D] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FF4D4D]/15 flex items-center justify-center text-[#FF4D4D] mb-4">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] text-[#8A8A8A] uppercase tracking-wider block mb-1">
                  Continuous Cardiac
                </span>
                <h3 className="text-xl font-serif text-white font-semibold">
                  24/7 Optical PPG Array
                </h3>
                <p className="mt-3 text-xs text-[#8A8A8A] leading-relaxed">
                  Quad-wavelength LED sensors monitor resting heart rate, active exercise zones, and sudden spikes or irregular beats with real-time haptic alerts.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs text-[#FF4D4D] flex items-center justify-between">
                <span>Sampling Rate</span>
                <span className="text-white font-bold">250 Hz Continuous</span>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-[#00D18F] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#00D18F]/15 flex items-center justify-center text-[#00D18F] mb-4">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] text-[#8A8A8A] uppercase tracking-wider block mb-1">
                  Oxygenation & Pressure
                </span>
                <h3 className="text-xl font-serif text-white font-semibold">
                  SpO2 & Blood Pressure
                </h3>
                <p className="mt-3 text-xs text-[#8A8A8A] leading-relaxed">
                  Infrared light reflection measures arterial hemoglobin oxygen saturation on demand, crucial for high-altitude training and athletic recovery.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs text-[#00D18F] flex items-center justify-between">
                <span>Accuracy Tolerance</span>
                <span className="text-white font-bold">±1.5% Clinical Curve</span>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-[#9D68FF] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#9D68FF]/15 flex items-center justify-center text-[#9D68FF] mb-4">
                  <Moon className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] text-[#8A8A8A] uppercase tracking-wider block mb-1">
                  Circadian Science
                </span>
                <h3 className="text-xl font-serif text-white font-semibold">
                  REM Sleep & 160+ Sports
                </h3>
                <p className="mt-3 text-xs text-[#8A8A8A] leading-relaxed">
                  Automatic sleep cycle breakdown (Deep, Light, REM) and dedicated tracking algorithms for running, swimming, cycling, golf, and high-intensity interval training.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs text-[#9D68FF] flex items-center justify-between">
                <span>Athletic Modes</span>
                <span className="text-white font-bold">160+ Profiles</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
