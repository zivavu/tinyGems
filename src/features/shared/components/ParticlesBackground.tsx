'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '../utils/dummy/utils';

export default function ParticlesBackground({ className, particleCount = 300 }: { className?: string; particleCount?: number }) {
  const [isMounted, setIsMounted] = useState(false);
  const particlesPerGroup = 15;
  const groupCount = Math.ceil(particleCount / particlesPerGroup);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  function generateKeyframes() {
    let keyframesRules = '';

    for (let i = 0; i < groupCount; i++) {
      keyframesRules += `
        @keyframes float-${i} {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px); }
          50% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px); }
          75% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px); }
          90% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px); }
        }
      `;
    }
    return keyframesRules;
  }

  function getRandomSize() {
    const MIN_SIZE = 7;
    const MAX_SIZE = 20;
    return Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE;
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    function handleResize() {
      if (!containerRef.current) return;
      if (containerSize.width === containerRef.current.clientWidth) return;
      setContainerSize({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMounted, containerRef]);

  if (!isMounted) return null;

  return (
    <div ref={containerRef} className={cn('absolute inset-0 h-full overflow-hidden', className)}>
      {[...Array(groupCount)].map((_, groupIndex) => {
        const groupParticles = [];
        for (let i = 0; i < particlesPerGroup; i++) {
          const particleIndex = groupIndex * particlesPerGroup + i;
          if (particleIndex >= particleCount) break;

          const originX = Math.random() * (containerSize.width || 0);
          const originY = Math.random() * (containerSize.height || 0);
          const size = getRandomSize();

          groupParticles.push(
            <div
              key={particleIndex}
              className="fixed rounded-full bg-rose-400/70 dark:bg-red-600/70"
              style={{
                filter: 'blur(6px)',
                width: size,
                height: size,
                left: originX,
                top: originY,
              }}
            />,
          );
        }

        return (
          <div
            key={groupIndex}
            className="absolute h-full w-full"
            style={{
              animation: `float-${groupIndex} 12s infinite`,
              animationDelay: `${groupIndex * 0.1}s`,
              animationTimingFunction: 'ease-in-out',
            }}
          >
            {groupParticles}
          </div>
        );
      })}
      <style>{generateKeyframes()}</style>
    </div>
  );
}
