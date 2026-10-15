import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { WatchFinish } from '../../types';
import { WATCH_FINISHES } from '../../types';

interface WatchModelProps {
  finish: WatchFinish;
  dialTexture: THREE.CanvasTexture | null;
  explodeProgress: number; // 0.0 = assembled, 1.0 = fully separated
  chargerSnapped?: boolean;
}

export const WatchModel: React.FC<WatchModelProps> = ({
  finish,
  dialTexture,
  explodeProgress,
  chargerSnapped = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ppgLightRef = useRef<THREE.PointLight>(null);
  const chargerGroupRef = useRef<THREE.Group>(null);

  const finishConfig = WATCH_FINISHES[finish];
  const metalColor = useMemo(() => new THREE.Color(finishConfig.metalColor), [finishConfig]);
  const highlightColor = useMemo(() => new THREE.Color(finishConfig.highlightHex), [finishConfig]);

  // High-density precision fluted bezel (72 triangular fluting ridges)
  const flutedBezelGeometry = useMemo(() => {
    const geom = new THREE.CylinderGeometry(2.36, 2.48, 0.32, 72, 1, true);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const angle = Math.atan2(z, x);
      // High-frequency fluting facet displacement
      const flute = Math.cos(angle * 72) * 0.055;
      pos.setX(i, x + (x / Math.hypot(x, z)) * flute);
      pos.setZ(i, z + (z / Math.hypot(x, z)) * flute);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  // Re-haut inner ring geometry
  const rehautGeometry = useMemo(() => {
    return new THREE.CylinderGeometry(2.18, 2.24, 0.18, 64, 1, true);
  }, []);

  // Frame tick animation for PPG pulse and charger
  useFrame((state) => {
    if (ppgLightRef.current) {
      const time = state.clock.getElapsedTime();
      ppgLightRef.current.intensity = 1.4 + Math.sin(time * 7) * 0.9;
    }

    if (chargerGroupRef.current) {
      const targetZ = chargerSnapped ? -0.7 - explodeProgress * 3.3 : -4.8;
      chargerGroupRef.current.position.z += (targetZ - chargerGroupRef.current.position.z) * 0.16;
    }
  });

  // Calculate Z offsets for the 6 exploded layers
  const zL1 = 0.35 + explodeProgress * 3.0; // Fluted Bezel & Sapphire Glass
  const zL2 = 0.18 + explodeProgress * 1.8; // AMOLED Retina Display
  const zL3 = 0.00 + explodeProgress * 0.6; // Logic Motherboard (BT 5.4 SoC)
  const zL4 = -0.18 - explodeProgress * 0.7; // 300mAh Cobalt Battery
  const zL5 = -0.38 - explodeProgress * 1.9; // IP68 Mid-Chassis & Bracelet
  const zL6 = -0.58 - explodeProgress * 3.1; // Optical PPG Caseback

  return (
    <group ref={groupRef} dispose={null}>
      {/* ============================================================ */}
      {/* LAYER 1: 904L FLUTED BEZEL & ANTI-REFLECTIVE SAPPHIRE GLASS  */}
      {/* ============================================================ */}
      <group position={[0, 0, zL1]}>
        {/* Precision Fluted Bezel Ring */}
        <mesh geometry={flutedBezelGeometry} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color={metalColor}
            metalness={finishConfig.metalness}
            roughness={finishConfig.roughness}
            envMapIntensity={2.5}
          />
        </mesh>

        {/* Polished Inner Chamfer Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.24, 0.05, 16, 64]} />
          <meshStandardMaterial
            color={highlightColor}
            metalness={0.98}
            roughness={0.05}
            envMapIntensity={3.0}
          />
        </mesh>

        {/* Re-haut Mirror Wall */}
        <mesh geometry={rehautGeometry} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.05]}>
          <meshStandardMaterial
            color={metalColor}
            metalness={0.95}
            roughness={0.1}
            envMapIntensity={2.2}
          />
        </mesh>

        {/* Genuine Anti-Reflective Curved Sapphire Crystal Lens */}
        <mesh position={[0, 0, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2.22, 2.22, 0.06, 64]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.25}
            roughness={0.01}
            metalness={0.1}
            transmission={0.95}
            thickness={0.5}
            ior={1.77} // Sapphire IOR
            color="#FFFFFF"
            attenuationColor="#60A5FA"
            attenuationDistance={1.2}
            envMapIntensity={2.0}
          />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* LAYER 2: 1.32" 466x466 RETINA AMOLED DISPLAY PANEL           */}
      {/* ============================================================ */}
      <group position={[0, 0, zL2]}>
        {/* Active AMOLED Screen Texture */}
        <mesh position={[0, 0, 0.02]}>
          <circleGeometry args={[2.16, 64]} />
          {dialTexture ? (
            <meshBasicMaterial map={dialTexture} toneMapped={false} />
          ) : (
            <meshStandardMaterial color="#005934" roughness={0.3} />
          )}
        </mesh>

        {/* Substrate Border */}
        <mesh position={[0, 0, 0]}>
          <circleGeometry args={[2.22, 64]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.9} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* LAYER 3: HIGH-DENSITY LOGIC MOTHERBOARD (BT 5.4 SOC)        */}
      {/* ============================================================ */}
      <group position={[0, 0, zL3]}>
        {/* PCB Board Substrate */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2.1, 2.1, 0.06, 48]} />
          <meshStandardMaterial
            color="#082819"
            roughness={0.35}
            metalness={0.5}
            envMapIntensity={1.2}
          />
        </mesh>

        {/* Central Dual-Core BT 5.4 Processor SoC */}
        <mesh position={[0, 0.1, 0.045]}>
          <boxGeometry args={[0.75, 0.75, 0.05]} />
          <meshStandardMaterial color="#1E2228" roughness={0.25} metalness={0.7} />
        </mesh>

        {/* Gold Heat-Spreader on SoC */}
        <mesh position={[0, 0.1, 0.075]}>
          <boxGeometry args={[0.42, 0.42, 0.02]} />
          <meshStandardMaterial color="#C5A059" roughness={0.12} metalness={0.95} envMapIntensity={2.5} />
        </mesh>

        {/* Peripheral Surface Mount Microchips */}
        {[-0.65, -0.3, 0.3, 0.65].map((x, i) => (
          <mesh key={i} position={[x, -0.42, 0.04]}>
            <boxGeometry args={[0.18, 0.28, 0.04]} />
            <meshStandardMaterial color="#C5A059" roughness={0.2} metalness={0.88} />
          </mesh>
        ))}

        {/* Circular Gold RF Antenna Trace */}
        <mesh position={[0, 0, 0.035]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.9, 0.025, 8, 64]} />
          <meshStandardMaterial color="#FFE29A" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* LAYER 4: 300mAh HIGH-DENSITY COBALT BATTERY                 */}
      {/* ============================================================ */}
      <group position={[0, 0, zL4]}>
        {/* Metallic Battery Pouch Cell */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.8, 1.8, 0.16, 48]} />
          <meshStandardMaterial
            color="#B8C4D0"
            metalness={0.9}
            roughness={0.2}
            envMapIntensity={1.8}
          />
        </mesh>

        {/* Gold Terminal Leads */}
        <mesh position={[0, 1.2, 0.04]}>
          <boxGeometry args={[0.3, 0.15, 0.03]} />
          <meshStandardMaterial color="#C5A059" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* LAYER 5: IP68 SEALED MID-CHASSIS & 3-LINK OYSTER BRACELET   */}
      {/* ============================================================ */}
      <group position={[0, 0, zL5]}>
        {/* Main Sculpted Zinc-Alloy Watch Case */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2.48, 2.54, 0.72, 64]} />
          <meshStandardMaterial
            color={metalColor}
            metalness={finishConfig.metalness}
            roughness={finishConfig.roughness}
            envMapIntensity={2.0}
          />
        </mesh>

        {/* Hermetic Silicone O-Ring Gasket */}
        <mesh position={[0, 0, 0.34]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.34, 0.035, 12, 64]} />
          <meshStandardMaterial color="#00D18F" roughness={0.9} />
        </mesh>

        {/* Digital Knurled Crown at 3 o'clock */}
        <group position={[2.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.36, 0.36, 0.38, 36]} />
            <meshStandardMaterial
              color={metalColor}
              metalness={finishConfig.metalness}
              roughness={finishConfig.roughness}
              envMapIntensity={2.0}
            />
          </mesh>
          {/* Gold Accent Crown Ring */}
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 0.06, 36]} />
            <meshStandardMaterial color={highlightColor} metalness={0.98} roughness={0.05} />
          </mesh>
        </group>

        {/* Speaker Acoustic Grille Slots at 9 o'clock */}
        {[-0.2, 0, 0.2].map((yOffset, idx) => (
          <mesh key={idx} position={[-2.55, yOffset, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.06, 0.28, 0.05]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
        ))}

        {/* Ergonomic Curved 3-Link Oyster Bracelet Segments */}
        {[1, -1].map((dirY) => (
          <group key={dirY} position={[0, dirY * 2.55, -0.1]}>
            {/* Left & Right Lug Prongs with Polished Chamfers */}
            {[-1.32, 1.32].map((lugX, lIdx) => (
              <mesh key={lIdx} position={[lugX, dirY * 0.32, 0]}>
                <boxGeometry args={[0.44, 0.95, 0.6]} />
                <meshStandardMaterial
                  color={metalColor}
                  metalness={finishConfig.metalness}
                  roughness={finishConfig.roughness}
                  envMapIntensity={2.2}
                />
              </mesh>
            ))}

            {/* Individual Articulated Bracelet Links */}
            {[1, 2, 3, 4].map((linkIdx) => {
              const linkY = dirY * (0.85 + linkIdx * 0.65);
              const linkZ = -linkIdx * 0.32;
              const linkRot = dirY * linkIdx * -0.22;
              return (
                <group key={linkIdx} position={[0, linkY, linkZ]} rotation={[linkRot, 0, 0]}>
                  {/* Outer Brushed Links */}
                  {[-0.92, 0.92].map((ox, oIdx) => (
                    <mesh key={oIdx} position={[ox, 0, 0]}>
                      <boxGeometry args={[0.66, 0.58, 0.22]} />
                      <meshStandardMaterial
                        color={metalColor}
                        metalness={finishConfig.metalness}
                        roughness={0.36} // Brushed satin finish
                        envMapIntensity={1.5}
                      />
                    </mesh>
                  ))}
                  {/* Center Mirror-Polished High-Sheen Link */}
                  <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[0.92, 0.58, 0.25]} />
                    <meshStandardMaterial
                      color={highlightColor}
                      metalness={0.98}
                      roughness={0.06} // Mirror polish
                      envMapIntensity={3.0}
                    />
                  </mesh>
                </group>
              );
            })}
          </group>
        ))}
      </group>

      {/* ============================================================ */}
      {/* LAYER 6: REAR OPTICAL PPG SENSOR ARRAY & MAGNETIC CHARGING   */}
      {/* ============================================================ */}
      <group position={[0, 0, zL6]}>
        {/* High-Gloss Ceramic Caseback Dome */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2.32, 2.12, 0.2, 48]} />
          <meshStandardMaterial
            color="#121518"
            roughness={0.15}
            metalness={0.8}
            envMapIntensity={2.0}
          />
        </mesh>

        {/* Central Sapphire Sensor Window */}
        <mesh position={[0, 0, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.95, 0.95, 0.05, 32]} />
          <meshStandardMaterial color="#06080A" roughness={0.08} metalness={0.9} />
        </mesh>

        {/* 4-Point PPG Biometric Green Optical LEDs */}
        {[
          [0, 0.45],
          [0, -0.45],
          [0.45, 0],
          [-0.45, 0],
        ].map(([px, py], pIdx) => (
          <mesh key={pIdx} position={[px, py, -0.15]}>
            <circleGeometry args={[0.09, 16]} />
            <meshBasicMaterial color="#00FF88" />
          </mesh>
        ))}

        {/* Biometric Green Emissive Point Light */}
        <pointLight
          ref={ppgLightRef}
          position={[0, 0, -0.4]}
          color="#00FF88"
          intensity={1.5}
          distance={3.0}
        />

        {/* Dual Gold Magnetic Pogo Contacts */}
        {[-0.55, 0.55].map((cx, cIdx) => (
          <mesh key={cIdx} position={[cx, 1.25, -0.11]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.08, 16]} />
            <meshStandardMaterial color="#FFE29A" metalness={0.98} roughness={0.08} envMapIntensity={3.0} />
          </mesh>
        ))}
      </group>

      {/* ============================================================ */}
      {/* MAGNETIC CHARGING PUCK DOCK                                  */}
      {/* ============================================================ */}
      <group ref={chargerGroupRef} position={[0, 1.25, -4.8]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.88, 0.88, 0.16, 32]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.3} />
        </mesh>
        {[-0.55, 0.55].map((cx, cIdx) => (
          <mesh key={cIdx} position={[cx, 0, 0.09]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
            <meshStandardMaterial color="#C5A059" metalness={0.95} roughness={0.1} />
          </mesh>
        ))}
        {/* Braided USB Cable */}
        <mesh position={[0, 0.9, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 1.6, 16]} />
          <meshStandardMaterial color="#2E3338" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
};
