'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { cn } from '../utils/dummy/utils';

const ParticlesBackgroundClient = ({ className }: { className?: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [scrollSegment, setScrollSegment] = useState(0);
  const [particles] = useState(() =>
    Array.from({ length: 300 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: getRandomSize(),
      segment: Math.floor((Math.random() * 100) / (((window.innerHeight * 2) / document.documentElement.scrollHeight) * 100)),
    })),
  );

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

  const debouncedScrollHandler = useDebounce(() => {
    const scrollPos = window.scrollY;
    const segmentHeight = window.innerHeight * 2;
    setScrollSegment(Math.floor(scrollPos / segmentHeight));
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', debouncedScrollHandler);
    return () => window.removeEventListener('scroll', debouncedScrollHandler);
  }, [debouncedScrollHandler]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className={cn('absolute inset-0 h-full overflow-hidden', className)}>
      {particles.map((particle) => {
        if (Math.abs(particle.segment - scrollSegment) > 1) return null;

        return (
          <div
            key={particle.id}
            className="absolute blur-sm bg-violet-400/30 dark:bg-rose-700/50 rounded-full transition-opacity duration-500"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
              opacity: particle.segment === scrollSegment ? 1 : 0.3,
              animation: `float 6s ease-in-out infinite`,
              animationDelay: `${particle.id * 0.02}s`,
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
          25% {
            ${getRandomTransform()};
          }
          50% {
            ${getRandomTransform()};
          }
          75% {
            ${getRandomTransform()};
          }
        }
      `}</style>
    </div>
  );
};

const ParticlesBackground = dynamic(() => Promise.resolve(ParticlesBackgroundClient), {
  ssr: false,
});

export default ParticlesBackground;
