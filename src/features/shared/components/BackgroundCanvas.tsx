'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

const vertexShader = `
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = (theme: string) => `
precision mediump float;
uniform vec2 resolution;
uniform float time;

#define PI 3.14159265359

${
  theme === 'dark'
    ? `#define BASE_COLOR vec3(0.08, 0.03, 0.18)
   #define ACCENT vec3(0.7, 0.2, 0.4)`
    : `#define BASE_COLOR vec3(0.98, 0.95, 0.92)
   #define ACCENT vec3(0.9, 0.3, 0.2)`
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9,78.2))) * 43758.5);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f*f*(3.0-2.0*f);
  return mix(
    mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), f.x),
    mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), f.x), f.y);
}

float fbm(vec2 p) {
  float total = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    total += noise(p) * amplitude;
    p *= 2.5;
    amplitude *= 0.2;
  }
  return total;
}

void main() {
  vec2 uv = gl_FragCoord.xy/resolution.xy;
  uv.x *= resolution.x/resolution.y;
  
  float timeFactor = time * 0.1;
  
  // Base mineral structure
  vec2 p = uv * 12.0;
  float q = fbm(p + timeFactor);
  float r = fbm(p + 1.0*q + 0.1*timeFactor);
  float pattern = fbm(p + 5.0*r + 0.3*timeFactor);
  
  // Color layers
  vec3 color = BASE_COLOR;
  color = mix(color, ACCENT, smoothstep(0.3, 0.6, pattern));
  color = mix(color, ACCENT * 1.5, smoothstep(0.6, 0.9, pattern));
  
  // Depth variation
  color *= 0.8 + 0.4*fbm(uv + timeFactor);
  
  gl_FragColor = vec4(color, 0.15);
}
`;

function BackgroundCanvas({ theme }: { theme: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrame = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // Create shaders
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, vertexShader);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, fragmentShader(theme));
    gl.compileShader(fs);

    // Create program
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Create fullscreen triangle
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Get uniforms
    const resolutionLoc = gl.getUniformLocation(program, 'resolution');
    const timeLoc = gl.getUniformLocation(program, 'time');

    let time = 0;
    const render = () => {
      time += 0.01;

      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      animationFrame.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame.current!);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" />;
}

export function WrappedBackgroundCanvas() {
  const theme = useTheme();
  return <BackgroundCanvas theme={theme.resolvedTheme ?? 'light'} key={theme.resolvedTheme} />;
}
