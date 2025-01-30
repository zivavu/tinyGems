'use client';

import { useEffect, useState } from 'react';
import { cn } from '../utils/dummy/utils';

export default function ParticlesBackground({ className }: { className?: string }) {
  const [isMounted, setIsMounted] = useState(false);
  function getRandomTransform() {
    const MAX_OFFSET = 20;
    return `transform: translate(${Math.random() * MAX_OFFSET - MAX_OFFSET / 2}px, ${Math.random() * MAX_OFFSET - MAX_OFFSET / 2}px)`;
  }

  function getRandomSize() {
    const MIN_SIZE = 10;
    const MAX_SIZE = 25;
    const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
    return `${size}px`;
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className={cn('absolute inset-0 h-full overflow-hidden', className)}>
      {[...Array(300)].map((_, i) => {
        const originX = Math.random() * 100;
        const originY = Math.random() * 100;

        const size = getRandomSize();
        return (
          <div
            key={i}
            className="absolute blur-sm bg-violet-400/30 dark:bg-rose-600/30 rounded-full"
            style={{
              left: `${originX}%`,
              top: `${originY}%`,
              width: size,
              height: size,
              animation: `float 12s ease-in-out infinite`,
              animationDelay: `${i * 0.01}s`,
            }}
          />
        );
      })}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          20% {
            ${getRandomTransform()};
          }
          40% {
            ${getRandomTransform()};
          }
          60% {
            ${getRandomTransform()};
          }
          80% {
            ${getRandomTransform()};
          }
        }
      `}</style>
    </div>
  );
}
