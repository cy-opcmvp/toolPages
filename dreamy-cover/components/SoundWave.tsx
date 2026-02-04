
import React, { useEffect, useState } from 'react';

interface SoundWaveProps {
  color: string;
  speed: number;
  className?: string;
}

const SoundWave: React.FC<SoundWaveProps> = ({ color, speed, className }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let frame: number;
    const animate = () => {
      setPhase((p) => (p + 0.02 * speed) % (Math.PI * 2));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [speed]);

  const generatePath = (offset: number, height: number, freq: number) => {
    const points = [];
    for (let x = 0; x <= 100; x += 2) {
      const y = 50 + Math.sin(x * freq + phase + offset) * height;
      points.push(`${x},${y}`);
    }
    return `M 0,50 Q ${points.join(' ')} L 100,50`;
  };

  return (
    <svg 
      viewBox="0 0 100 100" 
      preserveAspectRatio="none" 
      className={`w-full h-32 opacity-40 mix-blend-screen ${className}`}
    >
      <path
        d={generatePath(0, 20, 0.2)}
        fill="none"
        stroke={color}
        strokeWidth="0.5"
      />
      <path
        d={generatePath(Math.PI / 2, 15, 0.15)}
        fill="none"
        stroke={color}
        strokeWidth="0.3"
        opacity="0.6"
      />
      <path
        d={generatePath(Math.PI, 25, 0.1)}
        fill="none"
        stroke={color}
        strokeWidth="0.2"
        opacity="0.4"
      />
    </svg>
  );
};

export default SoundWave;
