import React, { useState } from 'react';
import { sound } from '../../lib/sound-effects';
import { Zap, BatteryCharging, RotateCcw } from 'lucide-react';


export const MagneticCharger: React.FC = () => {
  const [isCharging, setIsCharging] = useState<boolean>(false);
  const [chargePercent, setChargePercent] = useState<number>(86);

  const handleSnapToggle = () => {
    if (!isCharging) {
      sound.playMagneticSnap();
      setIsCharging(true);
      // Simulate rapid charge increment
      setChargePercent(86);
    } else {
      sound.playMechanicalTick();
      setIsCharging(false);
    }
  };

  return (
    <section className="relative w-full py-20 px-6 sm:px-12 bg-gradient-to-b from-[#070707] via-[#0E1114] to-[#070707] overflow-hidden border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Description Column */}
        <div className="max-w-xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121212] border border-[#FFE29A]/30 text-[11px] font-mono text-[#FFE29A] uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5 text-[#FFE29A]" />
            <span>MAGNETIC FAST INDUCTION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif text-white font-medium tracking-tight">
            Effortless Alignment. Instant Power.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#8A8A8A] font-light leading-relaxed">
            High-permeability neodymium magnets snap the charging puck into micro-millimeter alignment with the dual gold-plated pogo pins on the caseback. Zero cord fumbling.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 font-mono text-xs">
            <div className="glass-panel p-4 rounded-xl">
              <span className="text-[#8A8A8A] block mb-1">BATTERY CAPACITY</span>
              <span className="text-xl font-serif text-white font-bold">300 mAh</span>
              <span className="text-[#C5A059] block text-[10px] mt-1">High-Density Cobalt</span>
            </div>

            <div className="glass-panel p-4 rounded-xl">
              <span className="text-[#8A8A8A] block mb-1">ACTIVE ENDURANCE</span>
              <span className="text-xl font-serif text-white font-bold">7 Days</span>
              <span className="text-[#00D18F] block text-[10px] mt-1">30-Day Ultra Standby</span>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleSnapToggle}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-mono text-xs font-semibold flex items-center justify-center space-x-3 transition-all cursor-pointer ${
                isCharging
                  ? 'bg-[#1A201E] border border-[#00D18F] text-[#00D18F] shadow-lg shadow-[#00D18F]/15'
                  : 'bg-[#C5A059] hover:bg-[#D4AF37] text-[#070707] shadow-lg shadow-[#C5A059]/25 hover:scale-[1.02]'
              }`}
            >
              {isCharging ? (
                <>
                  <RotateCcw className="w-4 h-4" />
                  <span>Release Magnetic Charger</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Snap Magnetic Charger (Simulate Click)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Interactive Visual Demonstration */}
        <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
          {/* Charger Base Disk Glow */}
          <div
            className={`absolute w-72 h-72 rounded-full blur-2xl transition-all duration-700 ${
              isCharging
                ? 'bg-[#00D18F]/25 scale-110 animate-pulse'
                : 'bg-white/5 scale-90'
            }`}
          />

          {/* Watch Caseback Silhouette */}
          <div className="relative z-10 w-64 h-64 rounded-full bg-[#12161A] border-4 border-[#242A30] shadow-2xl flex items-center justify-center p-4">
            {/* Fluted Edge Rim simulation */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#C5A059]/30" />

            {/* Inner Sensor Dome */}
            <div className="w-44 h-44 rounded-full bg-[#07090B] border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
              {/* Dual Gold Magnetic Pogo Pins */}
              <div className="absolute top-6 flex space-x-6">
                <div
                  className={`w-2.5 h-2.5 rounded-full border border-[#FFE29A] transition-all duration-300 ${
                    isCharging ? 'bg-[#FFE29A] shadow-md shadow-[#FFE29A]' : 'bg-[#C5A059]'
                  }`}
                />
                <div
                  className={`w-2.5 h-2.5 rounded-full border border-[#FFE29A] transition-all duration-300 ${
                    isCharging ? 'bg-[#FFE29A] shadow-md shadow-[#FFE29A]' : 'bg-[#C5A059]'
                  }`}
                />
              </div>

              {/* Status Display Inside Caseback */}
              {isCharging ? (
                <div className="text-center animate-fadeIn">
                  <BatteryCharging className="w-8 h-8 text-[#00D18F] mx-auto animate-bounce mb-1" />
                  <span className="font-mono text-2xl font-bold text-white block">
                    {chargePercent}%
                  </span>
                  <span className="font-mono text-[10px] text-[#00D18F] tracking-widest uppercase block">
                    FAST CHARGING
                  </span>
                  <span className="font-mono text-[9px] text-[#8A8A8A] block mt-1">
                    90 min to 100%
                  </span>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-3.5 h-3.5 text-[#8A8A8A]" />
                  </div>
                  <span className="font-mono text-xs text-[#8A8A8A] uppercase tracking-wider block">
                    Standby
                  </span>
                  <span className="font-mono text-[10px] text-[#C5A059] block mt-1">
                    Ready to Snap
                  </span>
                </div>
              )}

              {/* 4-Point PPG Biometric LEDs */}
              <div className="absolute bottom-6 flex space-x-4">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                      isCharging
                        ? 'bg-[#00FF88] shadow-sm shadow-[#00FF88]'
                        : 'bg-[#005934]/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Magnetic Charging Puck Dock Animation */}
            <div
              style={{
                transform: isCharging
                  ? 'translate(0, -68px) scale(1)'
                  : 'translate(0, -130px) scale(0.85)',
                opacity: isCharging ? 1 : 0.4,
                transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              }}
              className="absolute top-0 z-20 pointer-events-none"
            >
              <div className="w-20 h-8 rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#C8CFD7] border border-white/50 shadow-xl flex items-center justify-center">
                <span className="font-mono text-[9px] text-[#070707] font-bold">
                  SOUYIE SNAP
                </span>
              </div>
              <div className="w-1.5 h-8 bg-[#444] mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
