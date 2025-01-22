'use client';

import { useEffect, useState } from 'react';

export function BackgroundParticles() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 opacity-20 dark:opacity-30 pointer-events-none">
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>

      {Array.from({ length: 70 }).map((_, i) => {
        const size = Math.random() * 3 + 2;
        return (
          <div
            key={i}
            className="absolute bg-rose-400 rounded-full animate-float"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 4 + 4}s infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        );
      })}
    </div>
  );
}
