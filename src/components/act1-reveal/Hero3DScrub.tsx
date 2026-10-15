import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WatchModel } from '../act2-lab/WatchModel';
import { DialTextureRenderer } from '../act2-lab/DialTextureCanvas';
import { sound } from '../../lib/sound-effects';
import type { WatchFinish, WatchDialFace } from '../../types';
import { ShoppingBag, ChevronDown, Sparkles, Volume2, VolumeX, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Hero3DScrubProps {
  finish: WatchFinish;
  dialFace: WatchDialFace;
  onExploreClick: () => void;
}

// Studio Softbox Reflection Environment
const HeroStudioEnvironment: React.FC = () => {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();
    const roomEnvironment = new RoomEnvironment();
    const renderTarget = pmremGenerator.fromScene(roomEnvironment);
    scene.environment = renderTarget.texture;

    return () => {
      pmremGenerator.dispose();
      roomEnvironment.dispose();
      renderTarget.dispose();
    };
  }, [gl, scene]);

  return null;
};

// 60FPS Camera Flight Rig driven by Scroll Progress
const HeroCameraFlight: React.FC<{ progress: number }> = ({ progress }) => {
  const { camera } = useThree();

  useFrame(() => {
    // Stage 1 (0 to 0.45): Macro close-up on the fluted bezel rim
    // Stage 2 (0.45 to 0.8): Sweeping rotation across the sapphire crystal
    // Stage 3 (0.8 to 1.0): Full frontal presentation reveal
    const p = progress;

    let targetX = 0;
    let targetY = 0;
    let targetZ = 8.0;
    let lookX = 0;
    let lookY = 0;
    let lookZ = 0;

    if (p < 0.45) {
      const t = p / 0.45;
      // Gliding macro rim pass
      targetX = THREE.MathUtils.lerp(2.6, 1.2, t);
      targetY = THREE.MathUtils.lerp(0.4, 1.5, t);
      targetZ = THREE.MathUtils.lerp(3.2, 4.6, t);
      lookX = THREE.MathUtils.lerp(1.8, 0.4, t);
      lookY = THREE.MathUtils.lerp(0.0, 0.2, t);
    } else if (p < 0.8) {
      const t = (p - 0.45) / 0.35;
      // Arc sweep back to center
      targetX = THREE.MathUtils.lerp(1.2, 0.0, t);
      targetY = THREE.MathUtils.lerp(1.5, 0.8, t);
      targetZ = THREE.MathUtils.lerp(4.6, 7.8, t);
      lookX = THREE.MathUtils.lerp(0.4, 0.0, t);
      lookY = THREE.MathUtils.lerp(0.2, 0.0, t);
    } else {
      const t = (p - 0.8) / 0.2;
      // Frontal lock
      targetX = 0.0;
      targetY = THREE.MathUtils.lerp(0.8, 0.5, t);
      targetZ = THREE.MathUtils.lerp(7.8, 8.2, t);
    }

    camera.position.x += (targetX - camera.position.x) * 0.12;
    camera.position.y += (targetY - camera.position.y) * 0.12;
    camera.position.z += (targetZ - camera.position.z) * 0.12;
    camera.lookAt(lookX, lookY, lookZ);
  });

  return null;
};

export const Hero3DScrub: React.FC<Hero3DScrubProps> = ({
  finish,
  dialFace,
  onExploreClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [muted, setMuted] = useState<boolean>(sound.getMuted());
  const [dialTexture, setDialTexture] = useState<THREE.CanvasTexture | null>(null);
  const rendererRef = useRef<DialTextureRenderer | null>(null);

  const amazonUrl = 'https://www.amazon.com/dp/B0GVK49N4M';

  // Initialize Dial Renderer
  useEffect(() => {
    const renderer = new DialTextureRenderer(1024);
    rendererRef.current = renderer;
    setDialTexture(renderer.texture);

    return () => {
      renderer.destroy();
    };
  }, []);

  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setFace(dialFace);
    }
  }, [dialFace]);

  // GSAP ScrollTrigger for 60fps Liquid Camera Flight
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 0.4,
      anticipatePin: 1,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const toggleSound = () => {
    const isNowMuted = sound.toggleMute();
    setMuted(isNowMuted);
    if (!isNowMuted) {
      sound.playMechanicalTick();
    }
  };

  // Model rotation responds dynamically to scroll progress
  const modelRotation: [number, number, number] = [
    0.25 - scrollProgress * 0.2,
    scrollProgress < 0.5 ? (scrollProgress / 0.5) * 0.6 : 0.6 - ((scrollProgress - 0.5) / 0.5) * 0.6,
    0,
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#070707] overflow-hidden flex items-center justify-center select-none"
    >
      {/* 3D WebGL Canvas Layer (100% 60fps, No Video Decoder Lag) */}
      <div className="absolute inset-0 z-10 w-full h-full">
        <Canvas
          camera={{ position: [2.6, 0.4, 3.2], fov: 36 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
        >
          <HeroStudioEnvironment />
          <ambientLight intensity={0.5} />
          <directionalLight position={[6, 8, 6]} intensity={2.4} color="#FFF8EE" />
          <directionalLight position={[-8, 4, -4]} intensity={3.5} color="#E0ECFF" />
          <directionalLight position={[0, -6, 4]} intensity={1.0} color="#C5A059" />

          <HeroCameraFlight progress={scrollProgress} />

          <Float speed={1.0} rotationIntensity={0.15} floatIntensity={0.25}>
            <group rotation={modelRotation}>
              <WatchModel
                finish={finish}
                dialTexture={dialTexture}
                explodeProgress={0}
                chargerSnapped={false}
              />
            </group>
          </Float>
        </Canvas>
      </div>

      {/* Atmospheric Vignette & Contrast Shadows */}
      <div className="absolute inset-0 z-15 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/80 pointer-events-none" />
      <div className="absolute inset-0 z-15 bg-radial from-transparent via-[#070707]/30 to-[#070707] pointer-events-none" />

      {/* AMOLED Ignition Radial Burst Overlay */}
      <div
        style={{
          opacity: Math.max(0, (scrollProgress - 0.6) / 0.4),
          transform: `scale(${1 + (scrollProgress - 0.6) * 0.3})`,
        }}
        className="absolute inset-0 z-15 pointer-events-none flex items-center justify-center transition-opacity duration-300"
      >
        <div className="w-[650px] h-[650px] rounded-full bg-radial from-[#005934]/30 via-[#C5A059]/15 to-transparent blur-3xl animate-pulse" />
      </div>

      {/* Top Header Status & Sound Toggle */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30 pointer-events-auto">
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
          <span className="font-mono text-[11px] tracking-[0.25em] text-[#C5A059] uppercase font-semibold">
            {scrollProgress < 0.45
              ? 'MACRO RIM SCAN // 904L FLUTING'
              : scrollProgress < 0.8
              ? 'OPTICAL SWEEP // SAPPHIRE LENS'
              : 'RETINA AMOLED IGNITION // 466×466'}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSound}
            aria-label={muted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-2.5 rounded-full bg-[#121212]/80 border border-white/10 hover:border-[#C5A059]/50 text-[#E5E5E5] hover:text-[#C5A059] transition-colors backdrop-blur-md cursor-pointer"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#C5A059]" />}
          </button>
        </div>
      </div>

      {/* Minimal Editorial DOM Typography Overlay */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center pointer-events-none flex flex-col items-center justify-center mt-[-30px]">
        {/* Monogram Badge */}
        <div
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 1.8),
            transform: `translate3d(0, ${-scrollProgress * 30}px, 0)`,
          }}
          className="inline-flex items-center space-x-2 mb-4 px-4 py-1.5 rounded-full border border-[#C5A059]/30 bg-[#121212]/70 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="font-mono text-[11px] tracking-[0.2em] text-[#C5A059] uppercase">
            SWISS HYBRID ARCHITECTURE · ASIN B0GVK49N4M
          </span>
        </div>

        {/* Master Headline */}
        <h1
          style={{
            transform: `translate3d(0, ${Math.sin(scrollProgress * Math.PI) * -12}px, 0)`,
          }}
          className="text-5xl sm:text-7xl md:text-8xl font-serif tracking-tight leading-[1.05] text-white font-medium drop-shadow-2xl"
        >
          <span className="block text-[#E5E5E5]">Classic Soul.</span>
          <span className="block gold-gradient-text italic font-normal">Digital Heart.</span>
        </h1>

        {/* Minimal Subtitle */}
        <p
          style={{
            opacity: Math.max(0.3, 1 - Math.abs(scrollProgress - 0.5) * 1.5),
          }}
          className="mt-5 text-sm sm:text-lg text-[#C8CFD7] max-w-xl mx-auto font-light leading-relaxed drop-shadow"
        >
          The iconic Rolex-styled fluted bezel meets high-performance 1.32" Retina AMOLED, Bluetooth 5.4 HD voice calls, and 24/7 PPG optical telemetry.
        </p>

        {/* Minimal Direct Buy Bar (Direct conversion, zero clutter) */}
        <div
          style={{
            opacity: Math.max(0, (scrollProgress - 0.5) / 0.4),
            transform: `translate3d(0, ${(1 - scrollProgress) * 20}px, 0)`,
          }}
          className="mt-8 pointer-events-auto flex flex-col sm:flex-row items-center gap-4"
        >
          <div className="glass-panel px-6 py-3 rounded-2xl flex items-center space-x-4 border border-[#C5A059]/40 shadow-2xl">
            <div className="text-left">
              <span className="text-[10px] font-mono text-[#8A8A8A] block">OFFICIAL LAUNCH PRICE</span>
              <div className="flex items-baseline space-x-2">
                <span className="font-mono text-2xl font-bold text-white">$69.99</span>
                <span className="font-mono text-xs text-[#8A8A8A] line-through">$129.99</span>
                <span className="font-mono text-[10px] text-[#00D18F] font-bold">46% OFF</span>
              </div>
            </div>

            <a
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playSapphireChime()}
              className="bg-[#C5A059] hover:bg-[#D4AF37] text-[#070707] font-mono text-xs font-bold px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg shadow-[#C5A059]/30 hover:scale-[1.03] transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Buy on Amazon</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator Button */}
      <button
        onClick={onExploreClick}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 z-20 pointer-events-auto cursor-pointer hover:opacity-80 transition-opacity"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] text-[#8A8A8A] uppercase">
          {scrollProgress < 0.85 ? 'Scroll Down to Inspect 3D' : 'Scroll to Exploded Architecture'}
        </span>
        <ChevronDown className="w-4 h-4 text-[#C5A059] animate-bounce" />
      </button>

    </section>
  );
};
