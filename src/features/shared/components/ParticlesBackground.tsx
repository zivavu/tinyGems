'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';
import colors from 'tailwindcss/colors';
import { cn } from '../utils/dummy/utils';

const PARTICLE_COUNT = 250;
const MIN_SIZE = 10;
const MAX_SIZE = 25;
const MAX_TARGET_RADIUS = 100;
const MIN_SPEED = 0.001;
const MAX_SPEED = 0.003;
const LIGHT_MODE_COLOR = colors.violet[400];
const DARK_MODE_COLOR = colors.rose[900];

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  currentTargetX: number;
  currentTargetY: number;
  nextTargetX: number;
  nextTargetY: number;
  transitionProgress: number;
  size: number;
  speed: number;
  sprite: HTMLCanvasElement;
}

function createParticleSprite(size: number, color: string): HTMLCanvasElement {
  const sprite = document.createElement('canvas');
  sprite.width = size;
  sprite.height = size;
  const ctx = sprite.getContext('2d');
  if (ctx) {
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
  }
  return sprite;
}

function getRandomTarget(originX: number, originY: number, radius: number): [number, number] {
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * radius;
  return [originX + Math.cos(angle) * distance, originY + Math.sin(angle) * distance];
}

function createParticle(canvasWidth: number, canvasHeight: number, color: string): Particle {
  const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
  const originX = Math.random() * canvasWidth;
  const originY = Math.random() * canvasHeight;
  const [targetX, targetY] = getRandomTarget(originX, originY, MAX_TARGET_RADIUS);
  const [nextTargetX, nextTargetY] = getRandomTarget(originX, originY, MAX_TARGET_RADIUS);

  return {
    x: originX,
    y: originY,
    originX,
    originY,
    currentTargetX: targetX,
    currentTargetY: targetY,
    nextTargetX,
    nextTargetY,
    transitionProgress: 0,
    size,
    speed: MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED),
    sprite: createParticleSprite(size, color),
  };
}

function ParticlesBackground({ theme, className }: { theme: string | undefined; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const scrollPositionRef = useRef<number>(window.scrollY);

  function updateScrollPosition(): void {
    scrollPositionRef.current = window.scrollY;
  }

  function isParticleInViewport(particle: Particle): boolean {
    const viewportTop = scrollPositionRef.current;
    const viewportBottom = viewportTop + window.innerHeight;
    const particleTop = particle.y - particle.size / 2;
    const particleBottom = particle.y + particle.size / 2;

    return particleBottom >= viewportTop && particleTop <= viewportBottom;
  }

  function getCurrentColor(): string {
    return theme === 'dark' ? DARK_MODE_COLOR : LIGHT_MODE_COLOR;
  }

  function initCanvas(): void {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;
    canvas.width = width;
    canvas.height = height;

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => createParticle(width, height, getCurrentColor()));
  }

  function animate(): void {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((particle) => {
      particle.transitionProgress += particle.speed;

      if (particle.transitionProgress >= 1) {
        particle.currentTargetX = particle.nextTargetX;
        particle.currentTargetY = particle.nextTargetY;
        [particle.nextTargetX, particle.nextTargetY] = getRandomTarget(particle.originX, particle.originY, MAX_TARGET_RADIUS);
        particle.transitionProgress = 0;
      }

      const targetX = particle.currentTargetX + (particle.nextTargetX - particle.currentTargetX) * particle.transitionProgress;
      const targetY = particle.currentTargetY + (particle.nextTargetY - particle.currentTargetY) * particle.transitionProgress;

      const dx = targetX - particle.x;
      const dy = targetY - particle.y;

      particle.x += dx * particle.speed;
      particle.y += dy * particle.speed;

      if (isParticleInViewport(particle)) {
        ctx.drawImage(particle.sprite, particle.x - particle.size / 2, particle.y - particle.size / 2);
      }
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    initCanvas();
    animationFrameRef.current = requestAnimationFrame(animate);

    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', updateScrollPosition);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateScrollPosition);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} style={{ filter: 'blur(8px)' }} className={cn('absolute inset-0 overflow-hidden', className)} />;
}

export function ThemedParticlesBackground({ className }: { className?: string }) {
  const { theme } = useTheme();
  return <ParticlesBackground key={theme} theme={theme} className={className} />;
}
