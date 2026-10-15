import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WatchCanvas } from './WatchCanvas';
import { sound } from '../../lib/sound-effects';
import type { WatchFinish, WatchDialFace } from '../../types';
import { WATCH_FINISHES } from '../../types';
import {
  Rotate3d,
  Check,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExplodedSequenceProps {
  currentFinish: WatchFinish;
  onFinishChange: (finish: WatchFinish) => void;
  currentDial: WatchDialFace;
  onDialChange: (dial: WatchDialFace) => void;
  onOpenCustomizer: () => void;
}

const LAYER_INFO = [
  {
    layer: '01 / 06',
    title: '904L Fluted Bezel & Sapphire Glass',
    desc: '45° precision radial fluting facets refracting ambient light in classic Geneva style.',
  },
  {
    layer: '02 / 06',
    title: '1.32" Round Retina AMOLED Display',
    desc: '466×466 resolution at 353 PPI with true inky blacks and Always-On Display.',
  },
  {
    layer: '03 / 06',
    title: 'Dual-Core SoC & Bluetooth 5.4',
    desc: 'Integrated noise-cancelling DSP processor for crystal-clear HD voice calls.',
  },
  {
    layer: '04 / 06',
    title: '300mAh High-Density Cobalt Cell',
    desc: '7-day active battery life and 30-day standby, charged via magnetic induction.',
  },
  {
    layer: '05 / 06',
    title: 'IP68 Hermetic Mid-Chassis',
    desc: 'Zinc-alloy tonneau housing with silicone O-rings, submersible to 1.5 meters.',
  },
  {
    layer: '06 / 06',
    title: '4-Point Optical PPG Biometric Base',
    desc: 'Quad-wavelength optical array capturing 24/7 heart rate and SpO2 blood oxygen.',
  },
];

export const ExplodedSequence: React.FC<ExplodedSequenceProps> = ({
  currentFinish,
  onFinishChange,
  currentDial,
  onDialChange,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [explodeProgress, setExplodeProgress] = useState<number>(0);
  const [enableOrbit, setEnableOrbit] = useState<boolean>(true);

  const amazonUrl = 'https://www.amazon.com/dp/B0GVK49N4M';

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=240%',
      pin: true,
      scrub: 0.4,
      anticipatePin: 1,
      onUpdate: (self) => {
        setExplodeProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const handleFinishSelect = (finish: WatchFinish) => {
    sound.playSapphireChime();
    onFinishChange(finish);
  };

  const handleDialSelect = (dial: WatchDialFace) => {
    sound.playMechanicalTick();
    onDialChange(dial);
  };

  // Determine current active layer based on scroll progress
  const activeLayerIndex = Math.min(
    LAYER_INFO.length - 1,
    Math.floor(explodeProgress * LAYER_INFO.length)
  );
  const currentLayer = LAYER_INFO[activeLayerIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#070707] overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Background Soft Studio Ambient */}
      <div className="absolute inset-0 bg-radial from-[#121212]/70 via-[#070707] to-[#070707] pointer-events-none" />

      {/* Top Header & Telemetry Bar (Minimalist) */}
      <div className="relative z-20 pt-6 px-6 sm:px-12 flex items-center justify-between w-full">
        <div>
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#C5A059] uppercase block mb-1">
            3D ARCHITECTURE // EXPLODED ENGINEERING
          </span>
          <h2 className="text-xl sm:text-3xl font-serif text-white font-medium">
            Internal Mechanics & Finish Configurator
          </h2>
        </div>

        {/* Orbit Mode Toggle */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              sound.playMechanicalTick();
              setEnableOrbit(!enableOrbit);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono flex items-center space-x-2 transition-all cursor-pointer ${
              enableOrbit
                ? 'bg-[#C5A059] text-[#070707] font-bold shadow-md shadow-[#C5A059]/20'
                : 'bg-[#181818] text-[#8A8A8A] border border-white/10'
            }`}
          >
            <Rotate3d className="w-3.5 h-3.5" />
            <span>{enableOrbit ? 'Orbit Active (Drag 360°)' : 'Tap to Orbit'}</span>
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Layer (Full Screen, Clear View) */}
      <div className="absolute inset-0 z-10 w-full h-full">
        <WatchCanvas
          finish={currentFinish}
          dialFace={currentDial}
          explodeProgress={explodeProgress}
          enableOrbit={enableOrbit}
        />
      </div>

      {/* Minimal Floating Layer Callout (Single Sleek Pill, No Clutter) */}
      <div className="relative z-20 mx-auto max-w-lg px-6 pointer-events-none text-center">
        <div
          style={{
            opacity: explodeProgress > 0.05 ? 1 : 0,
            transform: `translate3d(0, ${explodeProgress > 0.05 ? 0 : 20}px, 0)`,
            transition: 'all 0.3s ease-out',
          }}
          className="glass-panel px-6 py-3.5 rounded-2xl border border-[#C5A059]/30 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-center space-x-2 mb-1">
            <span className="font-mono text-[10px] text-[#C5A059] font-bold tracking-widest uppercase">
              LAYER {currentLayer.layer}
            </span>
            <span className="text-white/30 text-xs">·</span>
            <span className="font-serif text-sm font-semibold text-white">
              {currentLayer.title}
            </span>
          </div>
          <p className="text-xs text-[#8A8A8A] font-light leading-relaxed">
            {currentLayer.desc}
          </p>
        </div>
      </div>

      {/* Bottom Minimal Interactive Studio Dock (Finish + Dial + Instant Buy) */}
      <div className="relative z-20 pb-8 px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-4 w-full pointer-events-auto">
        {/* Real-Time Finish Switcher */}
        <div className="glass-panel p-1.5 rounded-2xl flex items-center space-x-1.5 border border-white/10 shadow-xl">
          <span className="text-[10px] font-mono text-[#8A8A8A] uppercase px-2 font-medium">
            Finish:
          </span>
          {(['silver', 'black', 'gold'] as WatchFinish[]).map((fin) => {
            const config = WATCH_FINISHES[fin];
            const isSelected = currentFinish === fin;
            return (
              <button
                key={fin}
                onClick={() => handleFinishSelect(fin)}
                className={`px-3 py-1.5 rounded-xl flex items-center space-x-2 text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1F2327] text-white border border-[#C5A059] shadow-sm'
                    : 'text-[#8A8A8A] hover:text-white'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-white/30"
                  style={{ backgroundColor: config.hexCode }}
                />
                <span className="hidden sm:inline">{config.name}</span>
                {isSelected && <Check className="w-3 h-3 text-[#C5A059]" />}
              </button>
            );
          })}
        </div>

        {/* Dial Face Switcher */}
        <div className="glass-panel p-1.5 rounded-2xl flex items-center space-x-1.5 border border-white/10 shadow-xl">
          <span className="text-[10px] font-mono text-[#8A8A8A] uppercase px-2 font-medium">
            Dial:
          </span>
          {(['chronograph', 'fitness', 'executive'] as WatchDialFace[]).map((face) => {
            const isSelected = currentDial === face;
            return (
              <button
                key={face}
                onClick={() => handleDialSelect(face)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#C5A059] text-[#070707] font-bold shadow-sm shadow-[#C5A059]/20'
                    : 'text-[#8A8A8A] hover:text-white'
                }`}
              >
                {face === 'chronograph' && 'Heritage'}
                {face === 'fitness' && 'Telemetry'}
                {face === 'executive' && 'Executive'}
              </button>
            );
          })}
        </div>

        {/* Direct Amazon Buy Box */}
        <div className="flex items-center space-x-3">
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playSapphireChime()}
            className="bg-[#C5A059] hover:bg-[#D4AF37] text-[#070707] font-mono text-xs font-bold px-5 py-2.5 rounded-xl flex items-center space-x-2 shadow-lg shadow-[#C5A059]/20 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Buy SOUYIE H66PRO ($69.99)</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </div>
    </section>
  );
};
