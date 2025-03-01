'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
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

// Helper functions moved outside component to prevent recreation on each render
const getRandomDistance = (maxDistance: number) => Math.random() * maxDistance - maxDistance / 2;
const getRandomSize = (min: number, max: number) => Math.random() * (max - min) + min;
const getRandomPosition = (max: number) => Math.random() * max;

export default function ParticlesBackground({ className, particleCount = 300 }: { className?: string; particleCount?: number }) {
  const particlesPerGroup = 15;
  const groupCount = Math.ceil(particleCount / particlesPerGroup);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  
  // Constants
  const MIN_SIZE = 7;
  const MAX_SIZE = 20;
  const MAX_DISTANCE = 50;

  // Pre-generate transform values for keyframes to make them consistent
  const keyframeTransforms = useMemo(() => {
    const transforms = [];
    for (let i = 0; i < groupCount; i++) {
      transforms.push([
        `translate(0, 0)`, // 0%, 100%
        `translate(${getRandomDistance(MAX_DISTANCE)}px, ${getRandomDistance(MAX_DISTANCE)}px)`, // 25%
        `translate(${getRandomDistance(MAX_DISTANCE)}px, ${getRandomDistance(MAX_DISTANCE)}px)`, // 50%
        `translate(${getRandomDistance(MAX_DISTANCE)}px, ${getRandomDistance(MAX_DISTANCE)}px)`, // 75%
        `translate(${getRandomDistance(MAX_DISTANCE)}px, ${getRandomDistance(MAX_DISTANCE)}px)`, // 90%
      ]);
    }
    return transforms;
  }, [groupCount, MAX_DISTANCE]);

  // Memoize keyframes generation
  const keyframesStyles = useMemo(() => {
    let keyframesRules = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 0.7; }
      }
    `;
    
    for (let i = 0; i < groupCount; i++) {
      const [transform0, transform25, transform50, transform75, transform90] = keyframeTransforms[i];
      keyframesRules += `
        @keyframes float-${i} {
          0%, 100% { transform: ${transform0}; }
          25% { transform: ${transform25}; }
          50% { transform: ${transform50}; }
          75% { transform: ${transform75}; }
          90% { transform: ${transform90}; }
        }
      `;
    }
    return keyframesRules;
  }, [groupCount, keyframeTransforms]);

  const createParticles = useCallback(() => {
    if (!containerRef.current || !particlesRef.current) return;
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    if (width === 0 || height === 0) return;

    // Remove any existing particles
    while (particlesRef.current.firstChild) {
      particlesRef.current.removeChild(particlesRef.current.firstChild);
    }

    // Create group containers first
    const groupContainers = [];
    for (let groupIndex = 0; groupIndex < groupCount; groupIndex++) {
      const groupContainer = document.createElement('div');
      groupContainer.className = 'absolute h-full w-full';
      groupContainer.style.animation = `float-${groupIndex} 12s infinite`;
      groupContainer.style.animationDelay = `${groupIndex * 0.1}s`;
      groupContainer.style.animationTimingFunction = 'ease-in-out';
      groupContainers.push(groupContainer);
      particlesRef.current.appendChild(groupContainer);
    }

    // Create particles within each group
    for (let groupIndex = 0; groupIndex < groupCount; groupIndex++) {
      for (let i = 0; i < particlesPerGroup; i++) {
        const particleIndex = groupIndex * particlesPerGroup + i;
        if (particleIndex >= particleCount) break;

        const particle = document.createElement('div');
        particle.className = 'fixed rounded-full bg-accent-600';
        
        const size = getRandomSize(MIN_SIZE, MAX_SIZE);
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${getRandomPosition(width)}px`;
        particle.style.top = `${getRandomPosition(height)}px`;
        particle.style.opacity = '0';
        particle.style.filter = 'blur(6px)';
        particle.style.animation = 'fadeIn 0.5s ease-out forwards';
        
        groupContainers[groupIndex].appendChild(particle);
      }
    }
  }, [groupCount, particleCount, particlesPerGroup, MIN_SIZE, MAX_SIZE]);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    
    const handleResize = debounce(createParticles, 100);
    
    // Initial creation
    createParticles();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [createParticles]);

  return (
    <div ref={containerRef} className={cn('absolute inset-0 h-full overflow-hidden', className)}>
      <div ref={particlesRef} className="h-full w-full" />
      <style dangerouslySetInnerHTML={{ __html: keyframesStyles }} />
    </div>
  );
}
