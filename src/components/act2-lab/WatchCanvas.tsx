import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { WatchModel } from './WatchModel';
import { DialTextureRenderer } from './DialTextureCanvas';
import type { WatchFinish, WatchDialFace } from '../../types';

interface WatchCanvasProps {
  finish: WatchFinish;
  dialFace: WatchDialFace;
  explodeProgress: number; // 0.0 to 1.0
  chargerSnapped?: boolean;
  enableOrbit?: boolean;
  modelRotation?: [number, number, number];
  cameraDistance?: number;
}

// Studio Softbox Reflection Environment Generator
const StudioEnvironment: React.FC = () => {
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

// Camera Choreography Controller
const CameraRig: React.FC<{
  explodeProgress: number;
  enableOrbit: boolean;
  cameraDistance: number;
}> = ({ explodeProgress, enableOrbit, cameraDistance }) => {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useFrame(() => {
    if (!enableOrbit) {
      const targetZ = cameraDistance + explodeProgress * 2.2;
      const targetY = 1.0 + explodeProgress * 1.2;
      camera.position.z += (targetZ - camera.position.z) * 0.08;
      camera.position.y += (targetY - camera.position.y) * 0.08;
      camera.lookAt(0, 0, 0);
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={enableOrbit}
      enablePan={false}
      minDistance={4.5}
      maxDistance={12.0}
      minPolarAngle={Math.PI * 0.15}
      maxPolarAngle={Math.PI * 0.85}
      dampingFactor={0.06}
      enableDamping
    />
  );
};

export const WatchCanvas: React.FC<WatchCanvasProps> = ({
  finish,
  dialFace,
  explodeProgress,
  chargerSnapped = false,
  enableOrbit = true,
  modelRotation = [0.2, 0, 0],
  cameraDistance = 8.2,
}) => {
  const [dialTexture, setDialTexture] = useState<THREE.CanvasTexture | null>(null);
  const rendererRef = useRef<DialTextureRenderer | null>(null);

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

  return (
    <div className="relative w-full h-full select-none cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 1.0, cameraDistance], fov: 36 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        {/* Photorealistic Studio HDR Environment Map */}
        <StudioEnvironment />

        {/* Ambient Fill */}
        <ambientLight intensity={0.5} />

        {/* Key Studio Light (Warm Top-Right) */}
        <directionalLight
          position={[6, 8, 6]}
          intensity={2.2}
          color="#FFF9EE"
          castShadow
        />

        {/* Rolex Horology Rim Light (Cold Platinum Backlight) */}
        <directionalLight
          position={[-7, 5, -5]}
          intensity={3.2}
          color="#E8F0FE"
        />

        {/* Gold Specular Highlight Light */}
        <directionalLight
          position={[0, -6, 4]}
          intensity={0.8}
          color="#C5A059"
        />

        {/* Camera Rig & Orbit Controls */}
        <CameraRig
          explodeProgress={explodeProgress}
          enableOrbit={enableOrbit}
          cameraDistance={cameraDistance}
        />

        {/* Floating Watch Model */}
        <Float
          speed={explodeProgress > 0.05 ? 0 : 1.2}
          rotationIntensity={explodeProgress > 0.05 ? 0 : 0.2}
          floatIntensity={explodeProgress > 0.05 ? 0 : 0.3}
        >
          <group rotation={modelRotation}>
            <WatchModel
              finish={finish}
              dialTexture={dialTexture}
              explodeProgress={explodeProgress}
              chargerSnapped={chargerSnapped}
            />
          </group>
        </Float>

        {/* Contact Shadow on Floor */}
        <ContactShadows
          position={[0, -3.0, 0]}
          opacity={0.5}
          scale={9}
          blur={2.8}
          far={5}
          color="#000000"
        />
      </Canvas>
    </div>
  );
};
