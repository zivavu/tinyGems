'use client';

import { useEffect, useRef } from 'react';
import { cn } from '../utils/dummy/utils';

const PARTICLE_COUNT = 300;

const vertexShaderSrc = `
attribute vec2 aOrigin;
attribute float aSize;
attribute float aSpeed;
attribute float aOffset;

uniform float uTime;
uniform vec2 uResolution;

varying vec3 vColor;
varying float vAlpha;

void main() {
    float maxOffset = 0.02;
    float time = uTime * aSpeed;
    vec2 offset = vec2(
        sin(time + aOffset * 6.2831) * maxOffset,
        cos(time + aOffset * 3.1415) * maxOffset
    );
    
    vec2 position = aOrigin + offset;
    position = position * 2.0 - 1.0;
    position.y *= uResolution.y / uResolution.x;
    
    // Color with slight variations
    vec3 colorStart = vec3(0.96, 0.45, 0.71);
    vec3 colorEnd = vec3(0.38, 0.65, 0.98);
    vColor = mix(colorStart, colorEnd, aOrigin.x) * (0.9 + aOffset * 0.2);
    
    gl_PointSize = aSize * 25.0; // Larger size for blur
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderSrc = `
precision highp float;
varying vec3 vColor;

void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    
    // Circular shape with smooth edge
    float circle = 1.0 - smoothstep(0.3, 0.5, dist);
    
    // Gaussian blur with long tail
    float blur = exp(-dist * dist * 6.0) * 2.0;
    
    // Combine effects
    float alpha = min(circle + blur, 1.0);
    
    gl_FragColor = vec4(vColor, alpha * 0.7);
}
`;

export default function WebGLParticles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Enable blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    // Helper function to create shader
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vertexShaderSrc);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSrc);

    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const particles = {
      origin: new Float32Array(PARTICLE_COUNT * 2),
      size: new Float32Array(PARTICLE_COUNT),
      speed: new Float32Array(PARTICLE_COUNT),
      offset: new Float32Array(PARTICLE_COUNT),
    };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.origin[i * 2] = Math.random();
      particles.origin[i * 2 + 1] = Math.random();
      particles.size[i] = 0.5 + Math.random() * 1.5;
      particles.speed[i] = 0.3 + Math.random();
      particles.offset[i] = Math.random();
    }

    const setupAttribute = (name: string, data: Float32Array, size: number) => {
      const buffer = gl.createBuffer();
      const location = gl.getAttribLocation(program, name);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    };

    setupAttribute('aOrigin', particles.origin, 2);
    setupAttribute('aSize', particles.size, 1);
    setupAttribute('aSpeed', particles.speed, 1);
    setupAttribute('aOffset', particles.offset, 1);

    // Get uniforms
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uResolution = gl.getUniformLocation(program, 'uResolution');

    // Handle resize
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // Animation loop
    let time = 0;
    function animate() {
      time += 0.01;

      gl.uniform1f(uTime, time);
      gl.uniform2f(uResolution, canvas.width, canvas.height);

      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.drawArrays(gl.POINTS, 0, PARTICLE_COUNT);
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return (
    <div className={cn('absolute inset-0 h-full overflow-hidden', className)}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}
