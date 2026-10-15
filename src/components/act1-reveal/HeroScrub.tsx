import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollScrubEngine } from '../../lib/scrub-engine';
import { sound } from '../../lib/sound-effects';
import { Volume2, VolumeX, ChevronDown, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const HeroScrub: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);
  const amoledGlowRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState<number>(0);
  const [muted, setMuted] = useState<boolean>(sound.getMuted());
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const scrubEngineRef = useRef<ScrollScrubEngine | null>(null);

  // Preload poster images for fallback canvas rendering
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // Preload image stages
    const base = import.meta.env.BASE_URL;
    const sources = [
      `${base}assets/hero/hero_bezel_glide.png`,
      `${base}assets/hero/hero_hands_sweep.png`,
      `${base}assets/hero/hero_amoled_glow.png`,
    ];

    imagesRef.current = sources.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize Scrub Engine
    if (video) {
      scrubEngineRef.current = new ScrollScrubEngine({
        mediaElement: video,
        duration: 4.5,
        onUpdate: (prog) => {
          setProgress(prog);

          // Draw to fallback canvas if video is not playing or while loading
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx && imagesRef.current.length > 0) {
              const imgIndex = Math.min(
                imagesRef.current.length - 1,
                Math.floor(prog * imagesRef.current.length)
              );
              const img = imagesRef.current[imgIndex];
              if (img && img.complete && img.naturalWidth > 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // Cover fit
                const hRatio = canvas.width / img.naturalWidth;
                const vRatio = canvas.height / img.naturalHeight;
                const ratio = Math.max(hRatio, vRatio);
                const centerShiftX = (canvas.width - img.naturalWidth * ratio) / 2;
                const centerShiftY = (canvas.height - img.naturalHeight * ratio) / 2;
                ctx.drawImage(
                  img,
                  0,
                  0,
                  img.naturalWidth,
                  img.naturalHeight,
                  centerShiftX,
                  centerShiftY,
                  img.naturalWidth * ratio,
                  img.naturalHeight * ratio
                );
              }
            }
          }
        },
      });
    }

    // GSAP ScrollTrigger for Hero Pinning
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=220%',
      pin: true,
      scrub: prefersReducedMotion ? false : 0.6,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (scrubEngineRef.current) {
          scrubEngineRef.current.setProgress(self.progress);
        }
      },
    });

    return () => {
      trigger.kill();
      if (scrubEngineRef.current) {
        scrubEngineRef.current.destroy();
      }
    };
  }, []);

  const toggleSound = () => {
    const isNowMuted = sound.toggleMute();
    setMuted(isNowMuted);
    if (!isNowMuted) {
      sound.playMechanicalTick();
    }
  };

  // Stage indicator text based on scroll progress
  const getStageBadge = () => {
    if (progress < 0.35) return 'PHASE 01 // 904L FLUTED BEZEL';
    if (progress < 0.7) return 'PHASE 02 // MECHANICAL SWEEP';
    return 'PHASE 03 // 1.32" 466x466 AMOLED IGNITION';
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#070707] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Background Media Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Video Scrub Element */}
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}assets/hero/hero_reveal.mp4`}
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoLoaded ? 'opacity-90' : 'opacity-0'
          }`}
        />

        {/* Fallback & Coalescing High-Res Canvas */}
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${
            videoLoaded ? 'opacity-0' : 'opacity-85'
          }`}
        />

        {/* Cinematic Vignette & Obsidian Studio Shadows */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#070707]/40 to-[#070707] pointer-events-none" />

        {/* Climax AMOLED Radial Burst Overlay */}
        <div
          ref={amoledGlowRef}
          style={{
            opacity: Math.max(0, (progress - 0.65) / 0.35),
            transform: `scale(${1 + (progress - 0.65) * 0.4})`,
          }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-300"
        >
          <div className="w-[600px] h-[600px] rounded-full bg-radial from-[#005934]/35 via-[#C5A059]/15 to-transparent blur-3xl animate-pulse" />
        </div>
      </div>

      {/* Luxury Telemetry Badge & Audio Control Bar (Top) */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30 pointer-events-auto">
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
          <span className="font-mono text-[11px] tracking-[0.25em] text-[#C5A059] uppercase font-semibold">
            {getStageBadge()}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-[11px] font-mono text-[#8A8A8A] bg-[#121212]/80 px-3 py-1.5 rounded-full border border-white/10">
            <span>SCRUB SYNC</span>
            <span className="text-[#C5A059] font-bold">{Math.round(progress * 100)}%</span>
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

      {/* Main DOM Typography Overlay */}
      <div
        ref={textOverlayRef}
        className="relative z-20 max-w-5xl mx-auto px-6 text-center pointer-events-none flex flex-col items-center justify-center mt-[-40px]"
      >
        {/* Pre-title Monogram */}
        <div
          style={{
            opacity: Math.max(0, 1 - progress * 1.5),
            transform: `translate3d(0, ${-progress * 40}px, 0)`,
          }}
          className="inline-flex items-center space-x-2 mb-4 px-4 py-1 rounded-full border border-[#C5A059]/30 bg-[#121212]/70 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="font-mono text-[11px] tracking-[0.2em] text-[#C5A059] uppercase">
            SWISS HOROLOGY ARCHITECTURE · ASIN B0GVK49N4M
          </span>
        </div>

        {/* Primary Climax Headline: "Classic Soul. Digital Heart." */}
        <h1
          style={{
            transform: `translate3d(0, ${Math.sin(progress * Math.PI) * -15}px, 0)`,
          }}
          className="text-5xl sm:text-7xl md:text-8xl font-serif tracking-tight leading-[1.05] text-white font-medium drop-shadow-2xl"
        >
          <span className="block text-[#E5E5E5]">Classic Soul.</span>
          <span className="block gold-gradient-text italic font-normal">Digital Heart.</span>
        </h1>

        {/* Descriptive Subtitle with Horology & Silicon Valley Fusion */}
        <p
          style={{
            opacity: Math.max(0.2, 1 - Math.abs(progress - 0.5) * 1.6),
            transform: `translate3d(0, ${progress * 20}px, 0)`,
          }}
          className="mt-6 text-base sm:text-xl text-[#C8CFD7] max-w-2xl mx-auto font-light leading-relaxed drop-shadow"
        >
          Zinc-alloy fluted bezel crafted in timeless Geneva tradition.
          Surging within: a 1.32-inch 466×466 Retina AMOLED, Bluetooth 5.4 HD Voice, and 24/7 PPG optical telemetry.
        </p>

        {/* Climax Specification Readouts (Fades in at climax) */}
        <div
          style={{
            opacity: Math.max(0, (progress - 0.55) / 0.4),
            transform: `translate3d(0, ${(1 - progress) * 30}px, 0)`,
          }}
          className="mt-8 grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-xl text-left"
        >
          <div className="glass-panel p-3.5 rounded-xl text-center border-l-2 border-l-[#C5A059]">
            <span className="block font-mono text-xs text-[#8A8A8A] uppercase">Display</span>
            <span className="block font-serif text-lg sm:text-2xl text-white font-semibold">1.32" AMOLED</span>
            <span className="block font-mono text-[10px] text-[#C5A059]">466×466 Retina</span>
          </div>

          <div className="glass-panel p-3.5 rounded-xl text-center border-l-2 border-l-[#005934]">
            <span className="block font-mono text-xs text-[#8A8A8A] uppercase">Chassis</span>
            <span className="block font-serif text-lg sm:text-2xl text-white font-semibold">Fluted Bezel</span>
            <span className="block font-mono text-[10px] text-[#0d8252]">Zinc-Alloy 3-Link</span>
          </div>

          <div className="glass-panel p-3.5 rounded-xl text-center border-l-2 border-l-[#C5A059]">
            <span className="block font-mono text-xs text-[#8A8A8A] uppercase">Calling</span>
            <span className="block font-serif text-lg sm:text-2xl text-white font-semibold">BT 5.4 HD</span>
            <span className="block font-mono text-[10px] text-[#C5A059]">Acoustic Grille</span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none z-20">
        <span className="font-mono text-[10px] tracking-[0.25em] text-[#8A8A8A] uppercase">
          {progress < 0.85 ? 'Scroll Down to Ignite' : 'Scroll to Enter 3D Lab'}
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div
            style={{
              transform: `translateY(${Math.min(16, progress * 24)}px)`,
            }}
            className="w-1.5 h-1.5 rounded-full bg-[#C5A059] transition-transform duration-100"
          />
        </div>
        <ChevronDown className="w-4 h-4 text-[#8A8A8A] animate-bounce" />
      </div>
    </section>
  );
};
