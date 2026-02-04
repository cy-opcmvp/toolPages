
import React, { useRef, useEffect } from 'react';
import { CoverSettings } from '../types';

interface CoverCanvasProps {
  settings: CoverSettings;
  onExport: (dataUrl: string) => void;
}

const CoverCanvas: React.FC<CoverCanvasProps> = ({ settings, onExport }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = settings.orientation === 'horizontal' ? 1280 : 1080;
    const height = settings.orientation === 'horizontal' ? 720 : 1920;
    canvas.width = width;
    canvas.height = height;

    // --- Background Rendering Logic ---
    ctx.clearRect(0, 0, width, height);
    
    // Base Gradient
    const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
    baseGrad.addColorStop(0, '#0a0a14');
    baseGrad.addColorStop(1, '#020205');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, width, height);

    const drawOrbs = () => {
      const drawCircle = (x: number, y: number, r: number, color: string) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, color + '55');
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      };
      drawCircle(width * 0.2, height * 0.3, width * 0.6, settings.primaryColor);
      drawCircle(width * 0.8, height * 0.7, width * 0.7, settings.secondaryColor);
    };

    const drawGrid = () => {
      ctx.strokeStyle = settings.primaryColor + '44';
      ctx.lineWidth = 1;
      const step = 60;
      // Horizontal lines with perspective
      for (let i = 0; i < height; i += step) {
        const y = i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      // Vertical lines
      for (let i = 0; i < width; i += step) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
    };

    const drawDust = () => {
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const r = Math.random() * 2;
        ctx.fillStyle = Math.random() > 0.5 ? settings.primaryColor + 'aa' : settings.secondaryColor + 'aa';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawMesh = () => {
      const g = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
      g.addColorStop(0, settings.primaryColor + '44');
      g.addColorStop(0.5, settings.secondaryColor + '33');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
      
      // Top left accent
      const g2 = ctx.createRadialGradient(0, 0, 0, 0, 0, width*0.8);
      g2.addColorStop(0, settings.secondaryColor + '44');
      g2.addColorStop(1, 'transparent');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);
    };

    switch (settings.backgroundEffect) {
      case 'orbs': drawOrbs(); break;
      case 'grid': drawGrid(); break;
      case 'dust': drawDust(); break;
      case 'mesh': drawMesh(); break;
    }

    // Sound Waves
    ctx.strokeStyle = '#ffffff11';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(0, height * (0.4 + i * 0.1));
      for (let x = 0; x <= width; x += 10) {
        const y = height * (0.4 + i * 0.1) + Math.sin(x * 0.005 + i) * 30;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // --- Text Configuration ---
    ctx.textAlign = settings.textAlign;
    ctx.textBaseline = 'middle';
    
    const posX = settings.textAlign === 'center' ? width / 2 
               : settings.textAlign === 'left' ? width * 0.1 
               : width * 0.9;

    if ('letterSpacing' in ctx) {
      (ctx as any).letterSpacing = `${settings.titleLetterSpacing}px`;
    }

    const lines = settings.title.split('\n');
    const lineHeight = settings.titleFontSize * settings.titleLineHeight;
    const startY = (height / 2) + settings.titleOffsetY - ((lines.length - 1) * lineHeight) / 2;

    ctx.font = `900 ${settings.titleFontSize}px "Noto Sans SC"`;
    
    lines.forEach((line, index) => {
      ctx.shadowBlur = settings.glowIntensity;
      ctx.shadowColor = settings.primaryColor;
      
      const textGrad = ctx.createLinearGradient(posX - 200, 0, posX + 200, 0);
      textGrad.addColorStop(0, '#ffffff');
      textGrad.addColorStop(1, '#e0e0e0');
      
      ctx.fillStyle = textGrad;
      ctx.fillText(line, posX, startY + index * lineHeight);
      ctx.shadowBlur = settings.glowIntensity / 2;
      ctx.fillText(line, posX, startY + index * lineHeight);
    });

    if ('letterSpacing' in ctx) { (ctx as any).letterSpacing = '0px'; }

    if (settings.subtitle) {
      ctx.shadowBlur = 0;
      ctx.font = `600 ${settings.subtitleFontSize}px "Noto Sans SC"`;
      ctx.fillStyle = '#ffffffcc';
      const subtitleY = startY + (lines.length * lineHeight) + settings.subtitleOffsetY;
      ctx.fillText(settings.subtitle, posX, subtitleY);
    }

    onExport(canvas.toDataURL('image/png'));
  }, [settings]);

  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-2xl border border-white/10 glass-effect">
      <canvas ref={canvasRef} className="block w-full h-auto object-contain bg-black" />
    </div>
  );
};

export default CoverCanvas;
