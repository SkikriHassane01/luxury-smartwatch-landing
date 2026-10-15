import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../../lib/sound-effects';
import type {
  WatchFinish,
  WatchDialFace,
  WatchStrap,
} from '../../types';
import {
  WATCH_FINISHES,
} from '../../types';
import {
  X,
  ShoppingBag,
  Check,
  Watch,
  Layers,
  ExternalLink,
} from 'lucide-react';


interface CustomizeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentFinish: WatchFinish;
  onFinishChange: (finish: WatchFinish) => void;
  currentDial: WatchDialFace;
  onDialChange: (dial: WatchDialFace) => void;
}

export const CustomizeDrawer: React.FC<CustomizeDrawerProps> = ({
  isOpen,
  onClose,
  currentFinish,
  onFinishChange,
  currentDial,
  onDialChange,
}) => {
  const [selectedStrap, setSelectedStrap] = useState<WatchStrap>('steel');
  const amazonUrl = 'https://www.amazon.com/dp/B0GVK49N4M';

  if (!isOpen) return null;

  const handleFinish = (finish: WatchFinish) => {
    sound.playSapphireChime();
    onFinishChange(finish);
  };

  const handleDial = (dial: WatchDialFace) => {
    sound.playMechanicalTick();
    onDialChange(dial);
  };

  const handleStrap = (strap: WatchStrap) => {
    sound.playMechanicalTick();
    setSelectedStrap(strap);
  };

  const handleProceed = () => {
    sound.playSapphireChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C5A059', '#005934', '#FFFFFF', '#FFE29A'],
    });
    setTimeout(() => {
      window.open(amazonUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300"
        onClick={() => {
          sound.playMechanicalTick();
          onClose();
        }}
      />

      {/* Drawer Panel */}
      <div className="relative z-10 w-full max-w-lg bg-[#0E1114] border-l border-white/10 h-full overflow-y-auto flex flex-col justify-between p-6 sm:p-8 shadow-2xl animate-slideLeft">
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono text-[#C5A059] tracking-widest uppercase block mb-1">
                CONFIGURATOR · ASIN B0GVK49N4M
              </span>
              <h3 className="text-2xl font-serif text-white font-semibold">
                Bespoke Order Suite
              </h3>
            </div>
            <button
              onClick={() => {
                sound.playMechanicalTick();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#8A8A8A] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section 1: Casing & Bezel Finish */}
          <div className="mt-6">
            <label className="text-xs font-mono text-[#8A8A8A] uppercase tracking-wider block mb-3">
              1. Chassis & Fluted Bezel Finish
            </label>
            <div className="space-y-2.5">
              {(['silver', 'black', 'gold'] as WatchFinish[]).map((fin) => {
                const config = WATCH_FINISHES[fin];
                const isSelected = currentFinish === fin;
                return (
                  <div
                    key={fin}
                    onClick={() => handleFinish(fin)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#181C20] border-[#C5A059] shadow-md'
                        : 'bg-white/5 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span
                        className="w-5 h-5 rounded-full border border-white/30 shadow-inner"
                        style={{ backgroundColor: config.hexCode }}
                      />
                      <div>
                        <span className="font-serif text-sm font-semibold text-white block">
                          {config.name}
                        </span>
                        <span className="text-[11px] text-[#8A8A8A] block">
                          {config.tagline}
                        </span>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#C5A059]" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Default Dial Complication */}
          <div className="mt-6">
            <label className="text-xs font-mono text-[#8A8A8A] uppercase tracking-wider block mb-3">
              2. Active Dial Complication
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['chronograph', 'fitness', 'executive'] as WatchDialFace[]).map((face) => {
                const isSelected = currentDial === face;
                return (

                  <button
                    key={face}
                    onClick={() => handleDial(face)}
                    className={`p-2.5 rounded-xl text-center border text-xs font-mono transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#C5A059] text-[#070707] font-bold border-[#C5A059]'
                        : 'bg-white/5 border-white/5 text-[#8A8A8A] hover:text-white'
                    }`}
                  >
                    <span className="block text-[11px]">
                      {face === 'chronograph' && 'Heritage'}
                      {face === 'fitness' && 'Fitness'}
                      {face === 'executive' && 'Executive'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Strap Selection */}
          <div className="mt-6">
            <label className="text-xs font-mono text-[#8A8A8A] uppercase tracking-wider block mb-3">
              3. Bracelet Package
            </label>
            <div className="space-y-2">
              <div
                onClick={() => handleStrap('steel')}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedStrap === 'steel'
                    ? 'bg-[#181C20] border-[#005934] shadow-md'
                    : 'bg-white/5 border-white/5'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Watch className="w-4 h-4 text-[#00D18F]" />
                  <div>
                    <span className="font-serif text-sm font-semibold text-white block">
                      Stainless Steel 3-Link + Butterfly Clasp
                    </span>
                    <span className="text-[10px] text-[#00D18F] font-mono">
                      PRIMARY LUXURY BRACELET (INCLUDED)
                    </span>
                  </div>
                </div>
                {selectedStrap === 'steel' && <Check className="w-4 h-4 text-[#00D18F]" />}
              </div>

              <div
                onClick={() => handleStrap('silicone')}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedStrap === 'silicone'
                    ? 'bg-[#181C20] border-[#005934] shadow-md'
                    : 'bg-white/5 border-white/5'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Layers className="w-4 h-4 text-[#C5A059]" />
                  <div>
                    <span className="font-serif text-sm font-semibold text-white block">
                      Dual-Strap Bundle (Steel + Black Silicone)
                    </span>
                    <span className="text-[10px] text-[#C5A059] font-mono">
                      BOX SET BONUS (FREE PROMOTION)
                    </span>
                  </div>
                </div>
                {selectedStrap === 'silicone' && <Check className="w-4 h-4 text-[#C5A059]" />}
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Bottom Checkout Summary */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="font-mono text-xs text-[#8A8A8A] block">TOTAL PRICE</span>
              <div className="flex items-baseline space-x-2">
                <span className="font-mono text-3xl font-bold text-white">$69.99</span>
                <span className="font-mono text-xs text-[#8A8A8A] line-through">$129.99</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs text-[#00D18F] block font-bold">
                SAVE $60.00 (46%)
              </span>
              <span className="font-mono text-[10px] text-[#8A8A8A] block">
                Free Prime Shipping
              </span>
            </div>
          </div>

          <button
            onClick={handleProceed}
            className="w-full py-4 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-[#070707] font-mono text-sm font-bold flex items-center justify-center space-x-2 shadow-xl shadow-[#C5A059]/25 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Complete Order on Amazon</span>
            <ExternalLink className="w-4 h-4 opacity-70" />
          </button>

          <p className="mt-3 text-[10px] font-mono text-[#8A8A8A] text-center">
            Fulfilled and protected by Amazon A-to-z 30-Day Guarantee.
          </p>
        </div>
      </div>
    </div>
  );
};
