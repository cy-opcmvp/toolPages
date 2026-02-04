import React, { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import { IconConfig } from '../types';

interface IconCanvasProps {
  config: IconConfig;
}

export interface IconCanvasHandle {
  getDataUrl: () => string;
  getCanvasElement: () => HTMLCanvasElement | null;
}

// Internal High Res Dimensions (3:4 Ratio)
const CANVAS_WIDTH = 1536; 
const CANVAS_HEIGHT = 2048;

const IconCanvas = forwardRef<IconCanvasHandle, IconCanvasProps>(({ config }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);

  useImperativeHandle(ref, () => ({
    getDataUrl: () => {
      if (canvasRef.current) {
        return canvasRef.current.toDataURL('image/png');
      }
      return '';
    },
    getCanvasElement: () => canvasRef.current
  }));

  // Image Loader Effect
  useEffect(() => {
    if (config.contentMode === 'image' && config.imageSrc) {
        const img = new Image();
        img.src = config.imageSrc;
        img.onload = () => setLoadedImage(img);
    } else {
        setLoadedImage(null);
    }
  }, [config.contentMode, config.imageSrc]);

  // Drawing Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // --- 1. Shape Path Construction ---
    const radius = (config.borderRadius / 100) * (CANVAS_WIDTH / 2);
    
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(CANVAS_WIDTH - radius, 0);
    ctx.quadraticCurveTo(CANVAS_WIDTH, 0, CANVAS_WIDTH, radius);
    ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT - radius);
    ctx.quadraticCurveTo(CANVAS_WIDTH, CANVAS_HEIGHT, CANVAS_WIDTH - radius, CANVAS_HEIGHT);
    ctx.lineTo(radius, CANVAS_HEIGHT);
    ctx.quadraticCurveTo(0, CANVAS_HEIGHT, 0, CANVAS_HEIGHT - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();

    // Clip for background and patterns
    ctx.save();
    ctx.clip();
    
    // --- 2. Background Fill ---
    if (config.bgType === 'solid') {
        ctx.fillStyle = config.bgColor;
    } else if (config.bgType === 'gradient-linear') {
        // Calculate gradient coordinates based on angle
        // Convert angle to radians
        const rad = (config.bgGradientAngle - 90) * (Math.PI / 180);
        
        // Find center
        const cx = CANVAS_WIDTH / 2;
        const cy = CANVAS_HEIGHT / 2;
        
        // Calculate a far enough distance to cover corners
        const dist = Math.sqrt(Math.pow(CANVAS_WIDTH, 2) + Math.pow(CANVAS_HEIGHT, 2)) / 2;
        
        const x1 = cx - Math.cos(rad) * dist;
        const y1 = cy - Math.sin(rad) * dist;
        const x2 = cx + Math.cos(rad) * dist;
        const y2 = cy + Math.sin(rad) * dist;

        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        config.bgGradientStops.forEach(stop => grad.addColorStop(stop.offset, stop.color));
        ctx.fillStyle = grad;
    } else if (config.bgType === 'gradient-radial') {
        const grad = ctx.createRadialGradient(
            CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 0, 
            CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, CANVAS_WIDTH
        );
        config.bgGradientStops.forEach(stop => grad.addColorStop(stop.offset, stop.color));
        ctx.fillStyle = grad;
    }

    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // --- 3. Patterns ---
    if (config.pattern && config.pattern !== 'none') {
        ctx.save();
        ctx.strokeStyle = config.patternColor || config.textColor; 
        ctx.globalAlpha = config.patternOpacity !== undefined ? config.patternOpacity : 0.3; 
        ctx.lineWidth = config.patternLineWidth || 15;
        const spacing = config.patternSpacing || 120;
        const angle = config.patternAngle || 0;

        // Pattern Rotation Logic
        // We move the origin to the center, rotate, then move back.
        // We also need to draw a much larger area to ensure the canvas is covered when rotated.
        ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        ctx.rotate(angle * Math.PI / 180);
        ctx.translate(-CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2);

        // Calculate a safe drawing bound. Diagonal of ~2600.
        // We draw from Center - 2000 to Center + 2000 to be safe.
        // Current coordinate system is relative to top-left (0,0) before rotation.
        // But since we rotated around center, we need to cover the bounding box of the rotated canvas.
        const drawStart = -1500;
        const drawEnd = 3000;

        if (config.pattern === 'grid') {
            ctx.beginPath();
            for (let x = drawStart; x < drawEnd; x += spacing) {
                ctx.moveTo(x, drawStart);
                ctx.lineTo(x, drawEnd);
            }
            for (let y = drawStart; y < drawEnd; y += spacing) {
                ctx.moveTo(drawStart, y);
                ctx.lineTo(drawEnd, y);
            }
            ctx.stroke();

        } else if (config.pattern === 'stripes') {
            ctx.beginPath();
            // Just vertical lines (which can be rotated by the context rotation)
            for (let x = drawStart; x < drawEnd; x += spacing) {
                ctx.moveTo(x, drawStart);
                ctx.lineTo(x, drawEnd);
            }
            ctx.stroke();

        } else if (config.pattern === 'waves') {
            const waveHeight = spacing / 2; 
            const frequency = 0.01;
            ctx.beginPath();
            for (let y = drawStart; y < drawEnd; y += spacing) {
                for (let x = drawStart; x <= drawEnd; x += 20) {
                   const yOffset = Math.sin(x * frequency) * (waveHeight * 0.4);
                   if (x === drawStart) ctx.moveTo(x, y + yOffset);
                   else ctx.lineTo(x, y + yOffset);
                }
            }
            ctx.stroke();
        }
        ctx.restore();
    }
    
    // Restore clipping
    ctx.restore(); 

    // --- 4. Border ---
    if (config.borderWidth > 0) {
      // Recreate path to stroke it
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(CANVAS_WIDTH - radius, 0);
      ctx.quadraticCurveTo(CANVAS_WIDTH, 0, CANVAS_WIDTH, radius);
      ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT - radius);
      ctx.quadraticCurveTo(CANVAS_WIDTH, CANVAS_HEIGHT, CANVAS_WIDTH - radius, CANVAS_HEIGHT);
      ctx.lineTo(radius, CANVAS_HEIGHT);
      ctx.quadraticCurveTo(0, CANVAS_HEIGHT, 0, CANVAS_HEIGHT - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();

      // Border is drawn half-in, half-out by default canvas stroke.
      ctx.lineWidth = config.borderWidth * 4; 
      ctx.strokeStyle = config.borderColor;
      ctx.stroke();
    }

    // --- 5. Content (Text or Image) ---
    const centerX = (CANVAS_WIDTH / 2) + (config.textPositionX * 4); // Scale offset
    const centerY = (CANVAS_HEIGHT / 2) + (config.textPositionY * 4);

    if (config.contentMode === 'image' && loadedImage) {
        ctx.save();
        // Scale image based on fontSize slider (acting as scale multiplier)
        const scale = (config.fontSize / 100); 
        const w = loadedImage.width * scale;
        const h = loadedImage.height * scale;
        
        ctx.translate(centerX, centerY);
        ctx.drawImage(loadedImage, -w/2, -h/2, w, h);
        ctx.restore();

    } else if (config.contentMode === 'text') {
        ctx.fillStyle = config.textColor;
        const scaledFontSize = config.fontSize * 4;
        ctx.font = `${config.fontStyle} ${config.fontWeight} ${scaledFontSize}px ${config.fontFamily}`;
        
        // Apply letter spacing (Modern API)
        if ('letterSpacing' in ctx) {
            (ctx as any).letterSpacing = `${config.letterSpacing * 4}px`;
        }

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Multi-line Handling
        const lines = config.text.split('\n');
        const lineHeight = scaledFontSize * config.lineHeight;
        const totalBlockHeight = lineHeight * lines.length;
        
        // Start Y position (top of the block, centered vertically relative to centerY)
        // We need to adjust because textBaseline 'middle' centers the *line*, so we need to offset the block.
        // Actually simplest way:
        // Top Line Y = centerY - (totalBlockHeight / 2) + (lineHeight / 2)
        let currentY = centerY - (totalBlockHeight / 2) + (lineHeight / 2);

        lines.forEach(line => {
            ctx.fillText(line, centerX, currentY);
            currentY += lineHeight;
        });
    }

  }, [config, loadedImage]);

  return (
    <div className="shadow-2xl rounded-lg overflow-hidden border border-gray-200 inline-block bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      <canvas 
        ref={canvasRef} 
        width={CANVAS_WIDTH} 
        height={CANVAS_HEIGHT}
        className="w-[300px] h-[400px] object-contain"
        style={{ width: '300px', height: '400px' }} 
      />
    </div>
  );
});

IconCanvas.displayName = 'IconCanvas';

export default IconCanvas;
