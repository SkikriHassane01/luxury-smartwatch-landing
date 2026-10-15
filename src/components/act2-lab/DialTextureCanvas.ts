import * as THREE from 'three';
import type { WatchDialFace } from '../../types';


export class DialTextureRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  public texture: THREE.CanvasTexture;
  private currentFace: WatchDialFace = 'chronograph';
  private pulsePhase: number = 0;
  private animFrameId: number | null = null;

  constructor(size: number = 512) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = size;
    this.canvas.height = size;
    const context = this.canvas.getContext('2d');
    if (!context) throw new Error('Could not get 2D context for dial canvas');
    this.ctx = context;

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.generateMipmaps = true;
    this.texture.minFilter = THREE.LinearMipmapLinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.colorSpace = THREE.SRGBColorSpace;

    this.startRenderLoop();
  }

  public setFace(face: WatchDialFace): void {
    this.currentFace = face;
    this.render();
  }

  private startRenderLoop(): void {
    const tick = () => {
      this.pulsePhase += 0.05;
      this.render();
      this.animFrameId = requestAnimationFrame(tick);
    };
    this.animFrameId = requestAnimationFrame(tick);
  }

  public render(): void {
    const { ctx, canvas } = this;
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = w / 2 - 8;

    ctx.clearRect(0, 0, w, h);

    // Outer Bezel Rim shadow on dial
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();

    if (this.currentFace === 'chronograph') {
      this.renderChronograph(cx, cy, radius);
    } else if (this.currentFace === 'fitness') {
      this.renderFitness(cx, cy, radius);
    } else {
      this.renderExecutive(cx, cy, radius);
    }

    ctx.restore();

    this.texture.needsUpdate = true;
  }

  /**
   * 1. HERITAGE CHRONOGRAPH (Swiss Rolex Emerald Sunburst)
   */
  private renderChronograph(cx: number, cy: number, radius: number): void {
    const ctx = this.ctx;
    const now = new Date();
    const secs = now.getSeconds() + now.getMilliseconds() / 1000;
    const mins = now.getMinutes() + secs / 60;
    const hours = (now.getHours() % 12) + mins / 60;

    // Emerald Sunburst Radial Background
    const bgGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, radius);
    bgGrad.addColorStop(0, '#005934');
    bgGrad.addColorStop(0.65, '#00351F');
    bgGrad.addColorStop(1, '#05120B');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, cx * 2, cy * 2);

    // Sunburst Ray Flares
    ctx.save();
    ctx.strokeStyle = 'rgba(197, 160, 89, 0.05)';
    ctx.lineWidth = 1;
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 36) {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
      ctx.stroke();
    }
    ctx.restore();

    // Minute Ticks
    for (let i = 0; i < 60; i++) {
      const angle = (i * Math.PI) / 30;
      const isHour = i % 5 === 0;
      const innerR = isHour ? radius - 30 : radius - 16;
      const outerR = radius - 8;

      ctx.save();
      ctx.strokeStyle = isHour ? '#C5A059' : 'rgba(197, 160, 89, 0.35)';
      ctx.lineWidth = isHour ? 3 : 1.5;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
      ctx.lineTo(cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR);
      ctx.stroke();
      ctx.restore();
    }

    // Applied Champagne Gold Hour Batons with Luminous Core
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      if (i === 3) continue; // Date window spot
      const batonR = radius - 44;
      const bx = cx + Math.cos(angle) * batonR;
      const by = cy + Math.sin(angle) * batonR;

      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(angle + Math.PI / 2);

      // Gold Baton casing
      ctx.fillStyle = '#C5A059';
      ctx.fillRect(-6, -14, 12, 28);
      // Luminous Core
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(-3, -10, 6, 20);
      ctx.restore();
    }

    // Subdial at 6 o'clock (Running Seconds)
    const subY = cy + radius * 0.42;
    const subR = radius * 0.26;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, subY, subR, 0, Math.PI * 2);
    ctx.fillStyle = '#051810';
    ctx.fill();
    ctx.strokeStyle = '#C5A059';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#C5A059';
    ctx.font = 'bold 11px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('60', cx, subY - subR + 13);
    ctx.fillText('30', cx, subY + subR - 5);

    // Subdial hand
    const subAngle = (secs * Math.PI) / 30 - Math.PI / 2;
    ctx.strokeStyle = '#FFE090';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, subY);
    ctx.lineTo(cx + Math.cos(subAngle) * (subR - 6), subY + Math.sin(subAngle) * (subR - 6));
    ctx.stroke();
    ctx.restore();

    // Date Window at 3 o'clock
    const dateX = cx + radius * 0.58;
    ctx.save();
    ctx.fillStyle = '#070707';
    ctx.fillRect(dateX - 18, cy - 13, 36, 26);
    ctx.strokeStyle = '#C5A059';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(dateX - 18, cy - 13, 36, 26);
    ctx.fillStyle = '#E5E5E5';
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('21', dateX, cy);
    ctx.restore();

    // SOUYIE Brand Wordmark & Geneva Certification
    ctx.save();
    ctx.fillStyle = '#C5A059';
    ctx.font = 'bold 18px Cinzel, serif';
    ctx.textAlign = 'center';
    ctx.fillText('SOUYIE', cx, cy - radius * 0.42);
    ctx.font = '500 10px Montserrat, sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillStyle = '#8A8A8A';
    ctx.fillText('H66PRO CHRONOMETER', cx, cy - radius * 0.32);
    ctx.font = '9px Montserrat, sans-serif';
    ctx.fillStyle = '#0d8252';
    ctx.fillText('IP68 · 5ATM SWISS HYBRID', cx, cy + radius * 0.16);
    ctx.restore();

    // Classic Sweeping Mechanical Hands
    // Hour Hand
    const hourAngle = (hours * Math.PI) / 6 - Math.PI / 2;
    ctx.save();
    ctx.strokeStyle = '#C5A059';
    ctx.fillStyle = '#C5A059';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - Math.cos(hourAngle) * 15, cy - Math.sin(hourAngle) * 15);
    ctx.lineTo(cx + Math.cos(hourAngle) * (radius * 0.5), cy + Math.sin(hourAngle) * (radius * 0.5));
    ctx.stroke();
    ctx.restore();

    // Minute Hand
    const minAngle = (mins * Math.PI) / 30 - Math.PI / 2;
    ctx.save();
    ctx.strokeStyle = '#E6CA85';
    ctx.lineWidth = 4.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - Math.cos(minAngle) * 20, cy - Math.sin(minAngle) * 20);
    ctx.lineTo(cx + Math.cos(minAngle) * (radius * 0.76), cy + Math.sin(minAngle) * (radius * 0.76));
    ctx.stroke();
    ctx.restore();

    // Second Hand (Sweeping Gold needle with round counterweight)
    const secAngle = (secs * Math.PI) / 30 - Math.PI / 2;
    ctx.save();
    ctx.strokeStyle = '#FFE599';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - Math.cos(secAngle) * 30, cy - Math.sin(secAngle) * 30);
    ctx.lineTo(cx + Math.cos(secAngle) * (radius * 0.88), cy + Math.sin(secAngle) * (radius * 0.88));
    ctx.stroke();

    // Center jewel cap
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#C5A059';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#070707';
    ctx.fill();
    ctx.restore();
  }

  /**
   * 2. DYNAMIC FITNESS DASHBOARD (Biometric PPG Array & Activity Rings)
   */
  private renderFitness(cx: number, cy: number, radius: number): void {
    const ctx = this.ctx;

    // Dark Matte Obsidian Background
    ctx.fillStyle = '#090A0D';
    ctx.fillRect(0, 0, cx * 2, cy * 2);

    // Outer activity rings
    const ringSpecs = [
      { r: radius - 22, color: '#E65C00', val: 0.82, label: 'CAL' }, // Move
      { r: radius - 38, color: '#00D18F', val: 0.68, label: 'STEP' }, // Steps
      { r: radius - 54, color: '#00A3FF', val: 0.95, label: 'STAND' }, // Stand
    ];

    ringSpecs.forEach((ring) => {
      // Track background
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 9;
      ctx.stroke();

      // Progress Arc
      ctx.beginPath();
      ctx.arc(cx, cy, ring.r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ring.val);
      ctx.strokeStyle = ring.color;
      ctx.lineWidth = 9;
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.restore();
    });

    // Central Live PPG Heart Rate Waveform
    const waveY = cy - 10;
    ctx.save();
    ctx.strokeStyle = '#00D18F';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    const waveWidth = radius * 1.1;
    const startX = cx - waveWidth / 2;

    for (let x = 0; x < waveWidth; x += 2) {
      const px = startX + x;
      // Synthesize ECG pulse peak
      const distFromCenter = Math.abs(x - waveWidth / 2);
      let py = waveY;
      if (distFromCenter < 25) {
        py += Math.sin((x + this.pulsePhase * 20) * 0.3) * 18 * Math.cos(this.pulsePhase * 2);
      } else {
        py += Math.sin(x * 0.1 + this.pulsePhase * 4) * 4;
      }
      if (x === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.restore();

    // Real-Time Heart Rate Metric
    ctx.save();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('72', cx - 25, waveY + 50);

    ctx.fillStyle = '#00D18F';
    ctx.font = 'bold 14px Montserrat, sans-serif';
    ctx.fillText('BPM', cx + 25, waveY + 45);

    // SpO2 Blood Oxygen & Battery Row
    ctx.fillStyle = '#8A8A8A';
    ctx.font = '11px Montserrat, sans-serif';
    ctx.fillText('SpO2 99% · OPTICAL PPG 24/7', cx, waveY + 75);

    // Steps & Calories Readouts
    ctx.fillStyle = '#E5E5E5';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillText('8,420 STEPS', cx - 60, cy - radius * 0.45);
    ctx.fillText('650 KCAL', cx + 60, cy - radius * 0.45);

    // Time readout top
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    ctx.fillStyle = '#C5A059';
    ctx.font = 'bold 20px "JetBrains Mono", monospace';
    ctx.fillText(timeStr, cx, cy - radius * 0.65);
    ctx.restore();
  }

  /**
   * 3. MINIMALIST DIGITAL EXECUTIVE (Silicon Valley Monospace Retina)
   */
  private renderExecutive(cx: number, cy: number, radius: number): void {
    const ctx = this.ctx;
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');

    // Deep Obsidian Graphite Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, cy * 2);
    bgGrad.addColorStop(0, '#0E1114');
    bgGrad.addColorStop(1, '#050607');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, cx * 2, cy * 2);

    // Tech Grid pattern
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < cx * 2; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, cy * 2);
      ctx.stroke();
    }
    for (let y = 0; y < cy * 2; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(cx * 2, y);
      ctx.stroke();
    }
    ctx.restore();

    // World Time Header
    ctx.save();
    ctx.fillStyle = '#C5A059';
    ctx.font = '600 12px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('GENEVA 19:08  //  CUPERTINO 10:08', cx, cy - radius * 0.52);

    // Giant Retina Digital Time
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 54px "JetBrains Mono", monospace';
    ctx.fillText(`${hrs}:${mins}`, cx - 18, cy);

    ctx.fillStyle = '#C5A059';
    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.fillText(secs, cx + 90, cy - 8);

    // Date and Day
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const dateStr = `${days[now.getDay()]} · ${now.getDate()} ${months[now.getMonth()]}`;
    ctx.fillStyle = '#8A8A8A';
    ctx.font = '600 13px Montserrat, sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText(dateStr, cx, cy + 34);

    // Bottom Telemetry Matrix: 7-Day Battery & BT 5.4 HD
    const barY = cy + radius * 0.44;
    ctx.fillStyle = '#182026';
    ctx.fillRect(cx - 80, barY, 160, 6);
    ctx.fillStyle = '#0d8252';
    ctx.fillRect(cx - 80, barY, 160 * 0.86, 6);

    ctx.fillStyle = '#C8CFD7';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText('86% BATTERY (7-DAY ACTIVE)', cx, barY + 22);
    ctx.fillStyle = '#005934';
    ctx.fillText('● BT 5.4 HD CONNECTED', cx, barY + 38);
    ctx.restore();
  }

  public destroy(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    this.texture.dispose();
  }
}
