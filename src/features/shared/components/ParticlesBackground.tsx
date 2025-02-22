'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '../utils/cn';

function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export default function ParticlesBackground({ className, particleCount = 300 }: { className?: string; particleCount?: number }) {
  const particlesPerGroup = 15;
  const groupCount = Math.ceil(particleCount / particlesPerGroup);
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<React.ReactNode>(null);

  const maxDistance = 50;
  const getRandomDistance = () => Math.random() * maxDistance - maxDistance / 2;
  const getTransform = () => `translate(${getRandomDistance()}px, ${getRandomDistance()}px)`;
  function generateKeyframes() {
    let keyframesRules = '';
    for (let i = 0; i < groupCount; i++) {
      keyframesRules += `
        @keyframes float-${i} {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: ${getTransform()}; }
          50% { transform: ${getTransform()}; }
          75% { transform: ${getTransform()}; }
          90% { transform: ${getTransform()}; }
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

  function createParticles() {
    if (!containerRef.current) return null;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    if (width === 0 || height === 0) return null;

    return [...Array(groupCount)].map((_, groupIndex) => {
      const groupParticles = [];
      for (let i = 0; i < particlesPerGroup; i++) {
        const particleIndex = groupIndex * particlesPerGroup + i;
        if (particleIndex >= particleCount) break;

        const originX = Math.random() * width;
        const originY = Math.random() * height;
        const size = getRandomSize();

        groupParticles.push(
          <div
            key={particleIndex}
            className="fixed rounded-full bg-indigo-600 "
            style={{
              filter: 'blur(6px)',
              width: size,
              height: size,
              left: originX,
              top: originY,
              opacity: 0,
              animation: 'fadeIn 0.5s ease-out forwards',
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
    });
  }

  useEffect(() => {
    const handleResize = debounce(() => {
      setParticles(createParticles());
    }, 30);

    setParticles(createParticles());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className={cn('absolute inset-0 h-full overflow-hidden', className)}>
      {particles}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 0.7; }
          }
          ${generateKeyframes()}
        `}
      </style>
    </div>
  );
}
