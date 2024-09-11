import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Dot {
  x: number;
  y: number;
  size: number;
  opacity: number;
  id: string; // Use string for UUID
}

const CursorTrail: React.FC = () => {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const chance = Math.random();

      if (chance > 0.85) {
        const newDot: Dot = {
          x: event.clientX,
          y: event.clientY,
          size: Math.random() * 15 + 10,
          opacity: 0.6,
          id: uuidv4(), // Generate unique ID
        };
        setDots((prevDots) => [...prevDots, newDot]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      setDots((prevDots) =>
        prevDots
          .map((dot) => ({
            ...dot,
            opacity: dot.opacity - 0.05,
            y: dot.y - 1,
          }))
          .filter((dot) => dot.opacity > 0)
      );
    }, 50);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="fixed bg-[#6da38c] rounded-full pointer-events-none"
          style={{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            left: dot.x,
            top: dot.y,
            transform: 'translate(-50%, -50%)',
            opacity: dot.opacity,
            boxShadow: `0 0 15px 10px rgba(129, ${dot.size + 150}, 143, ${dot.opacity})`,
            zIndex: 50,
          }}
        />
      ))}
    </>
  );
};

export default CursorTrail;
