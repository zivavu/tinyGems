'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '../utils/dummy/utils';

export default function ParticlesBackground({ className, particleCount = 300 }: { className?: string; particleCount?: number }) {
  const [isMounted, setIsMounted] = useState(false);
  const particlesPerGroup = 6;
  const groupCount = Math.ceil(particleCount / particlesPerGroup);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  function getRandomTransform() {
    const MAX_OFFSET = 30;
    const transform = `transform: translate(${Math.random() * MAX_OFFSET - MAX_OFFSET / 2}px, ${Math.random() * MAX_OFFSET - MAX_OFFSET / 2}px)`;
    return transform;
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
            className="absolute"
            style={{
              animation: `float 22s infinite`,
              animationTimingFunction: 'ease-in-out',
              animationDelay: `${groupIndex * 0.2}s`,
            }}
          >
            {groupParticles}
          </div>
        );
      })}
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          10% {
            ${getRandomTransform()};
          }
          20% {
            ${getRandomTransform()};
          }
          30% {
            ${getRandomTransform()};
          }
          40% {
            ${getRandomTransform()};
          }
          50% {
            ${getRandomTransform()};
          }
          60% {
            ${getRandomTransform()};
          }
          70% {
            ${getRandomTransform()};
          }
          80% {
            ${getRandomTransform()};
          }
          90% {
            ${getRandomTransform()};
          }
        }
      `}</style>
    </div>
  );
}
