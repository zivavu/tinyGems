'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';
import colors from 'tailwindcss/colors';
import { cn } from '../utils/dummy/utils';

const PARTICLE_COUNT: number = 300;
const PERIOD: number = 12 * 1000;
const KEYFRAME_TIMES: number[] = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
const MIN_SIZE: number = 10;
const MAX_SIZE: number = 35;
const MAX_OFFSET: number = 20;
const LIGHT_MODE_COLOR: string = colors.violet[400];
const DARK_MODE_COLOR: string = colors.rose[900];

interface Keyframe {
  time: number;
  offsetX: number;
  offsetY: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  delay: number;
  keyframes: Keyframe[];
  sprite: HTMLCanvasElement;
}

function createParticleSprite(size: number, color: string): HTMLCanvasElement {
  const sprite: HTMLCanvasElement = document.createElement('canvas');
  sprite.width = size;
  sprite.height = size;
  const ctx: CanvasRenderingContext2D | null = sprite.getContext('2d');
  if (ctx) {
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
  }
  return sprite;
}

function createParticle(canvasWidth: number, canvasHeight: number, index: number, color: string): Particle {
  const x: number = Math.random() * canvasWidth;
  const y: number = Math.random() * canvasHeight;
  const size: number = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
  const delay: number = index * 10;
  const keyframes: Keyframe[] = KEYFRAME_TIMES.map(function (t: number): Keyframe {
    if (t === 0 || t === 1) {
      return { time: t, offsetX: 0, offsetY: 0 };
    } else {
      const offsetX: number = Math.random() * MAX_OFFSET - MAX_OFFSET / 2;
      const offsetY: number = Math.random() * MAX_OFFSET - MAX_OFFSET / 2;
      return { time: t, offsetX: offsetX, offsetY: offsetY };
    }
  });
  const sprite: HTMLCanvasElement = createParticleSprite(size, color);
  return { x: x, y: y, size: size, delay: delay, keyframes: keyframes, sprite: sprite };
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function computeOffset(keyframes: Keyframe[], normalizedTime: number): { offsetX: number; offsetY: number } {
  let i: number;
  for (i = 0; i < keyframes.length - 1; i++) {
    if (normalizedTime >= keyframes[i].time && normalizedTime <= keyframes[i + 1].time) {
      const localT: number = (normalizedTime - keyframes[i].time) / (keyframes[i + 1].time - keyframes[i].time);
      const offsetX: number = lerp(keyframes[i].offsetX, keyframes[i + 1].offsetX, localT);
      const offsetY: number = lerp(keyframes[i].offsetY, keyframes[i + 1].offsetY, localT);
      return { offsetX: offsetX, offsetY: offsetY };
    }
  }
  return { offsetX: 0, offsetY: 0 };
}

function ParticlesBackground({ theme, className }: { theme: string | undefined; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const scrollPositionRef = useRef<number>(0);

  function getCurrentColor(): string {
    return theme === 'dark' ? DARK_MODE_COLOR : LIGHT_MODE_COLOR;
  }

  function initCanvas(): void {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const width: number = canvas.parentElement.clientWidth;
    const height: number = canvas.parentElement.clientHeight;
    canvas.width = width;
    canvas.height = height;
    const particles: Particle[] = [];
    const color: string = getCurrentColor();
    for (let i: number = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(width, height, i, color));
    }
    particlesRef.current = particles;
  }

  function isParticleVisible(particle: Particle): boolean {
    const padding = MAX_SIZE + MAX_OFFSET;
    const scrollPosition = scrollPositionRef.current;
    const viewportTop = scrollPosition - padding;
    const viewportBottom = scrollPosition + window.innerHeight + padding;

    const isVisible = particle.y >= viewportTop && particle.y <= viewportBottom;

    return isVisible;
  }

  function animate(): void {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas) return;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!ctx) return;

    scrollPositionRef.current = window.scrollY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const now: number = Date.now();

    particlesRef.current
      .filter((particle) => isParticleVisible(particle))
      .forEach(function (particle: Particle): void {
        const elapsed: number = (now + particle.delay) % PERIOD;
        const normalizedTime: number = elapsed / PERIOD;
        const offset = computeOffset(particle.keyframes, normalizedTime);
        const posX: number = particle.x + offset.offsetX;
        const posY: number = particle.y + offset.offsetY;
        ctx.drawImage(particle.sprite, posX - particle.size / 2, posY - particle.size / 2);
      });

    animationFrameRef.current = requestAnimationFrame(animate);
  }

  useEffect(function (): () => void {
    initCanvas();
    animationFrameRef.current = requestAnimationFrame(animate);

    function handleResize(): void {
      initCanvas();
    }

    function handleScroll(): void {
      scrollPositionRef.current = window.scrollY;
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return function (): void {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className={cn('absolute blur-sm inset-0 overflow-hidden opacity-50', className)} />;
}

export function ThemedParticlesBackground({ className }: { className?: string }) {
  const { theme } = useTheme();
  return <ParticlesBackground key={theme} theme={theme} className={className} />;
}
