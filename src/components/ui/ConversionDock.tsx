import React from 'react';
import { sound } from '../../lib/sound-effects';
import { ShoppingBag, ExternalLink, CheckCircle2 } from 'lucide-react';

export const ConversionDock: React.FC = () => {
  const amazonUrl = 'https://www.amazon.com/dp/B0GVK49N4M';

  return (
    <aside
      aria-label="Conversion and Ordering Dock"
      className="fixed bottom-0 left-0 right-0 z-40 px-4 sm:px-8 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] bg-[#070707]/90 backdrop-blur-xl border-t border-white/10 shadow-2xl transition-transform"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
        {/* Price & Stock Readout */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex flex-col">
            <div className="flex items-baseline space-x-2">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
                $69.99
              </span>
              <span className="font-mono text-xs sm:text-sm text-[#8A8A8A] line-through">
                $129.99
              </span>
              <span className="hidden sm:inline font-mono text-[10px] bg-[#005934]/30 text-[#0d8252] border border-[#005934]/40 px-2 py-0.5 rounded-full font-bold">
                46% OFF
              </span>
            </div>
            <div className="flex items-center space-x-1.5 text-[10px] sm:text-[11px] font-mono text-[#8A8A8A]">
              <CheckCircle2 className="w-3 h-3 text-[#00D18F]" />
              <span>In Stock · Free Prime 1-Day Delivery</span>
            </div>
          </div>
        </div>

        {/* Primary Action CTA (48px height minimum for mobile ergonomics) */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playSapphireChime()}
            className="min-h-[48px] px-6 sm:px-10 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-[#070707] font-mono text-xs sm:text-sm font-bold flex items-center space-x-2.5 shadow-xl shadow-[#C5A059]/25 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buy on Amazon</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>
    </aside>
  );
};
