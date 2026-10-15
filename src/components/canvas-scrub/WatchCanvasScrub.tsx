import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sound } from '../../lib/sound-effects';
import { ShoppingBag, ExternalLink, Sparkles, ChevronDown, Volume2, VolumeX, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface WatchCanvasScrubProps {
  totalFrames?: number;
  framePrefix?: string;
  frameExtension?: string;
}

/**
 * Computes eased band opacity with plateau and ramps according to scroll-landing doctrine.
 */
function computeBand(progress: number, start: number, end: number, ramp = 0.04): number {
  if (progress < start || progress > end) return 0;
  if (start === 0) {
    if (progress > end - ramp) return (end - progress) / ramp;
    return 1;
  }
  if (progress < start + ramp) return (progress - start) / ramp;
  if (progress > end - ramp) return (end - progress) / ramp;
  return 1;
}

export const WatchCanvasScrub: React.FC<WatchCanvasScrubProps> = ({
  totalFrames = 192,
  framePrefix = `${import.meta.env.BASE_URL}assets/frames/frame_`,
  frameExtension = '.jpg',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(sound.getMuted());

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const amazonUrl = 'https://www.amazon.com/dp/B0GVK49N4M';

  // 1. Preload frame sequence into memory for 60fps/120fps instantaneous rendering
  useEffect(() => {
    let mounted = true;
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(4, '0');
      img.src = `${framePrefix}${frameNum}${frameExtension}`;

      img.onload = () => {
        if (!mounted) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded >= Math.min(12, totalFrames)) {
          setIsReady(true);
        }
      };

      img.onerror = () => {
        if (!mounted) return;
        loaded++;
        setLoadedCount(loaded);
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      mounted = false;
    };
  }, [totalFrames, framePrefix, frameExtension]);

  // 2. High-Performance Double-Buffered Render Loop with Lerp Smoothing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * 0.22;
      const frameIdx = Math.max(
        0,
        Math.min(imagesRef.current.length - 1, Math.round(currentFrameRef.current))
      );
      const img = imagesRef.current[frameIdx];

      if (img && img.complete && img.naturalWidth > 0) {
        const w = canvas.width;
        const h = canvas.height;
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = w / h;

        let renderW = w;
        let renderH = h;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          renderH = w / imgRatio;
          offsetY = (h - renderH) / 2;
        } else {
          renderW = h * imgRatio;
          offsetX = (w - renderW) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
      }

      rafIdRef.current = requestAnimationFrame(render);
    };

    rafIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isReady]);

  // 3. GSAP ScrollTrigger binding scroll delta directly to frame index
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=280%',
      pin: true,
      scrub: 0.3,
      anticipatePin: 1,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        targetFrameRef.current = (totalFrames - 1) * self.progress;
      },
    });

    return () => {
      trigger.kill();
    };
  }, [totalFrames]);

  const toggleSound = () => {
    const isMuted = sound.toggleMute();
    setMuted(isMuted);
    if (!isMuted) sound.playMechanicalTick();
  };

  // Compute 4-stage narrative band weights
  const band1 = useMemo(() => computeBand(scrollProgress, 0.00, 0.28), [scrollProgress]);
  const band2 = useMemo(() => computeBand(scrollProgress, 0.26, 0.56), [scrollProgress]);
  const band3 = useMemo(() => computeBand(scrollProgress, 0.54, 0.84), [scrollProgress]);
  const band4 = useMemo(() => computeBand(scrollProgress, 0.82, 1.00), [scrollProgress]);

  // Real-time telemetry calculations
  const orbitDegree = Math.round(scrollProgress * 360);
  const currentFrameNum = Math.min(totalFrames, Math.round(scrollProgress * (totalFrames - 1)) + 1);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#070707] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Hardware-Accelerated 2D Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-10"
      />

      {/* Cinematic Vignette Overlays */}
      <div className="absolute inset-0 z-15 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/75 pointer-events-none" />
      <div className="absolute inset-0 z-15 bg-radial from-transparent via-[#070707]/35 to-[#070707] pointer-events-none" />

      {/* Discreet Preload Indicator */}
      {!isReady && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 font-mono text-[10px] text-[#C5A059] bg-[#121212]/85 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          CALIBRATING FRAME ENGINE ({Math.round((loadedCount / Math.max(1, totalFrames)) * 100)}%)
        </div>
      )}

      {/* Top Status & Audio Controls */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30 pointer-events-auto">
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
          <span className="font-mono text-[11px] tracking-[0.25em] text-[#C5A059] uppercase font-semibold">
            {scrollProgress < 0.28
              ? 'SWISS FLUTED BEZEL // 48 FACETS'
              : scrollProgress < 0.58
              ? 'RETINA AMOLED IGNITION // 466×466'
              : scrollProgress < 0.84
              ? 'OPTICAL PPG BIOMETRICS // 24/7'
              : 'AMAZON PRIME LAUNCH // $69.99'}
          </span>
        </div>

        {/* Real-Time Telemetry HUD & Audio Toggle */}
        <div className="flex items-center space-x-3 font-mono text-[10px] text-[#8A8A8A]">
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#121212]/80 border border-white/10 backdrop-blur-md">
            <span>ORBIT: <strong className="text-white">{orbitDegree}°</strong></span>
            <span className="text-white/20">|</span>
            <span>FRAME: <strong className="text-[#C5A059]">{String(currentFrameNum).padStart(3, '0')}/{totalFrames}</strong></span>
          </div>

          <button
            onClick={toggleSound}
            aria-label={muted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-2.5 rounded-full bg-[#121212]/80 border border-white/10 hover:border-[#C5A059]/50 text-[#E5E5E5] hover:text-[#C5A059] transition-colors backdrop-blur-md cursor-pointer"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#C5A059]" />}
          </button>
        </div>
      </div>

      {/* Dynamic Local Scrim for Four-Layer Legibility System */}
      <div
        style={{
          opacity: Math.max(band1, Math.max(band2, Math.max(band3, band4))) * 0.75,
        }}
        className="absolute inset-0 z-18 pointer-events-none bg-gradient-to-t from-black/80 via-black/40 to-black/70 transition-opacity duration-300"
      />

      {/* Master Narrative Bands Container */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center pointer-events-none flex flex-col items-center justify-center">

        {/* BAND 1: The Swiss Hallmark */}
        {band1 > 0 && (
          <div
            style={{
              opacity: band1,
              transform: `translate3d(0, ${(1 - band1) * 20}px, 0)`,
            }}
            className="flex flex-col items-center justify-center transition-transform duration-200"
          >
            <div className="inline-flex items-center space-x-2 mb-4 px-4 py-1.5 rounded-full border border-[#C5A059]/30 bg-[#121212]/80 backdrop-blur-md shadow-xl">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-[#C5A059] uppercase">
                SWISS HYBRID ARCHITECTURE · ASIN B0GVK49N4M
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif tracking-tight leading-[1.05] text-white font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_0_20px_rgba(0,0,0,0.85)]">
              <span className="block text-[#E5E5E5]">Classic Soul.</span>
              <span className="block gold-gradient-text italic font-normal">Digital Heart.</span>
            </h1>

            <p className="mt-5 text-sm sm:text-lg text-[#E0E0E0] max-w-xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              48-ridge fluted coin-edge bezel angled at 45 degrees, encircling 10 diamond crystal indices and a magnified cyclops date display.
            </p>
          </div>
        )}

        {/* BAND 2: Retina AMOLED Ignition */}
        {band2 > 0 && (
          <div
            style={{
              opacity: band2,
              transform: `translate3d(0, ${(1 - band2) * 20}px, 0)`,
            }}
            className="flex flex-col items-center justify-center transition-transform duration-200"
          >
            <div className="inline-flex items-center space-x-2 mb-4 px-4 py-1.5 rounded-full border border-[#4D96FF]/40 bg-[#121212]/80 backdrop-blur-md shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#4D96FF] animate-pulse" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-[#4D96FF] uppercase font-semibold">
                1.32" RETINA AMOLED // 466×466 PIXELS
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[1.08] text-white font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_0_20px_rgba(0,0,0,0.85)]">
              Inky True Blacks. <br />
              <span className="text-[#4D96FF] italic font-normal">353 PPI Density.</span>
            </h2>

            <p className="mt-5 text-sm sm:text-lg text-[#E0E0E0] max-w-xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Infinite contrast ratio and Always-On Display (AOD). Crisp analog hands and real-time step telemetry vivid under direct sunlight.
            </p>
          </div>
        )}

        {/* BAND 3: Biometric Silicon & Jubilee Metallurgy */}
        {band3 > 0 && (
          <div
            style={{
              opacity: band3,
              transform: `translate3d(0, ${(1 - band3) * 20}px, 0)`,
            }}
            className="flex flex-col items-center justify-center transition-transform duration-200"
          >
            <div className="inline-flex items-center space-x-2 mb-4 px-4 py-1.5 rounded-full border border-[#00D18F]/40 bg-[#121212]/80 backdrop-blur-md shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#00D18F] animate-pulse" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-[#00D18F] uppercase font-semibold">
                4-POINT OPTICAL PPG // STAINLESS JUBILEE
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[1.08] text-white font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_0_20px_rgba(0,0,0,0.85)]">
              24/7 Vital Telemetry. <br />
              <span className="text-[#00D18F] italic font-normal">Concealed Clasp.</span>
            </h2>

            <p className="mt-5 text-sm sm:text-lg text-[#E0E0E0] max-w-xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Ceramic caseback with dual-frequency PPG diodes for continuous SpO2 and HRV monitoring, fastened with a butterfly deployant stamped STEEL STAINLESS.
            </p>
          </div>
        )}

        {/* BAND 4: Direct Amazon Prime Checkout */}
        {band4 > 0 && (
          <div
            style={{
              opacity: band4,
              transform: `translate3d(0, ${(1 - band4) * 20}px, 0)`,
            }}
            className="flex flex-col items-center justify-center transition-transform duration-200 pointer-events-auto"
          >
            <div className="inline-flex items-center space-x-2 mb-3 px-4 py-1.5 rounded-full border border-[#C5A059]/40 bg-[#121212]/90 backdrop-blur-md shadow-xl">
              <ShieldCheck className="w-4 h-4 text-[#00D18F]" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-[#C5A059] uppercase font-semibold">
                AMAZON PRIME EXCLUSIVE · ASIN B0GVK49N4M
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[1.08] text-white font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_0_20px_rgba(0,0,0,0.85)]">
              Heirloom Presence. <br />
              <span className="gold-gradient-text italic font-normal">Modern Intelligence.</span>
            </h2>

            {/* Direct Buy Box (Frictionless, Minimal) */}
            <div className="mt-6 glass-panel px-7 py-4 rounded-2xl flex flex-col sm:flex-row items-center gap-5 border border-[#C5A059]/50 shadow-2xl bg-[#121212]/90 backdrop-blur-lg">
              <div className="text-left">
                <span className="text-[10px] font-mono text-[#8A8A8A] block uppercase tracking-wider">
                  LAUNCH EXCLUSIVE OFFER
                </span>
                <div className="flex items-baseline space-x-2.5">
                  <span className="font-mono text-3xl font-bold text-white">$69.99</span>
                  <span className="font-mono text-sm text-[#8A8A8A] line-through">$129.99</span>
                  <span className="font-mono text-xs text-[#00D18F] font-bold">46% OFF</span>
                </div>
                <span className="font-mono text-[10px] text-[#8A8A8A] block mt-0.5">
                  ✓ In Stock · Free Prime 1-Day Delivery
                </span>
              </div>

              <a
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playSapphireChime()}
                className="w-full sm:w-auto bg-[#C5A059] hover:bg-[#D4AF37] text-[#070707] font-mono text-xs font-bold px-7 py-3.5 rounded-xl flex items-center justify-center space-x-2.5 shadow-xl shadow-[#C5A059]/30 hover:scale-[1.03] transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buy on Amazon</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none z-20">
        <span className="font-mono text-[10px] tracking-[0.25em] text-[#8A8A8A] uppercase">
          {scrollProgress < 0.85 ? 'Scroll to Orbit' : 'Scroll to Paradigm Shift'}
        </span>
        <ChevronDown className="w-4 h-4 text-[#C5A059] animate-bounce" />
      </div>
    </section>
  );
};
