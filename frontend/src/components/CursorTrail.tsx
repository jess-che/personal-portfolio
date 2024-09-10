import React, { useState, useEffect } from 'react';

interface Dot {
  x: number;
  y: number;
  size: number;
  opacity: number;
  id: number;
}

const CursorTrail: React.FC = () => {
  const [dots, setDots] = useState<Dot[]>([]);
  const [idCounter, setIdCounter] = useState<number>(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const chance = Math.random(); // Generates a random number between 0 and 1

      if (chance > 0.85) { 
        const newDot: Dot = {
          x: event.clientX,
          y: event.clientY,
          size: Math.random() * 15 + 10,
          opacity: .6,
          id: idCounter,
        };
        setDots((prevDots) => [...prevDots, newDot]);
        setIdCounter((prevCounter) => prevCounter + 1);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      setDots((prevDots) =>
        prevDots
          .map((dot) => ({
            ...dot,
            opacity: dot.opacity - 0.05,
            y: dot.y - 1, // move the dot slightly up as it fades
          }))
          .filter((dot) => dot.opacity > 0)
      );
    }, 50);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [idCounter]);

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
