export type WatchFinish = 'silver' | 'black' | 'gold';
export type WatchDialFace = 'chronograph' | 'fitness' | 'executive';
export type WatchStrap = 'steel' | 'silicone';

export interface WatchFinishInfo {
  id: WatchFinish;
  name: string;
  tagline: string;
  metalColor: string;
  hexCode: string;
  roughness: number;
  metalness: number;
  highlightHex: string;
}

export interface DialFaceInfo {
  id: WatchDialFace;
  name: string;
  type: string;
  description: string;
  complications: string[];
}

export const WATCH_FINISHES: Record<WatchFinish, WatchFinishInfo> = {
  silver: {
    id: 'silver',
    name: 'Oyster Silver',
    tagline: '904L-Grade Mirror Polish & Brushed Steel',
    metalColor: '#DDE2E8',
    hexCode: '#C8CFD7',
    roughness: 0.18,
    metalness: 0.95,
    highlightHex: '#FFFFFF',
  },
  black: {
    id: 'black',
    name: 'Midnight Black',
    tagline: 'DLC Diamond-Like Carbon Stealth Coating',
    metalColor: '#1A1C1E',
    hexCode: '#1A1C1E',
    roughness: 0.28,
    metalness: 0.9,
    highlightHex: '#525960',
  },
  gold: {
    id: 'gold',
    name: 'Champagne Gold',
    tagline: '18K Warm Champagne PVD Electrolytic Gold',
    metalColor: '#C5A059',
    hexCode: '#C5A059',
    roughness: 0.2,
    metalness: 0.92,
    highlightHex: '#FFE29A',
  },
};

export const DIAL_FACES: Record<WatchDialFace, DialFaceInfo> = {
  chronograph: {
    id: 'chronograph',
    name: 'Heritage Chronograph',
    type: 'Swiss Horology Classic',
    description: 'Emerald sunburst dial with dual sub-dials, gold fluted baton indices, and sweeping mechanical second hand.',
    complications: ['60-Sec Subdial', '24H Military Index', 'Date Aperture', 'Tachymeter Scale'],
  },
  fitness: {
    id: 'fitness',
    name: 'Dynamic Telemetry',
    type: 'Biometric Performance',
    description: 'Real-time PPG optical heart rate wave, triple metabolic rings (Calories, Steps, Active Hours), and SpO2 indicator.',
    complications: ['72 BPM Live Pulse', '8,420 Steps / Goal', '650 kcal Ring', '99% SpO2 Blood O2'],
  },
  executive: {
    id: 'executive',
    name: 'Minimal Executive',
    type: 'Silicon Valley Digital',
    description: 'Ultra-crisp Retina typography, dual world timezones (Geneva / Cupertino), battery gauge, and weather matrix.',
    complications: ['10:08:42 Retina Digital', 'Geneva UTC+1', '7-Day Battery (86%)', 'IP68 Sealed Status'],
  },
};
