'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef, useEffect, useState } from 'react';

function generateParticlesFromImage(imageSrc, spacing = 4) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "anonymous";

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const width = image.width;
      const height = image.height;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(image, 0, 0);
      const imgData = ctx.getImageData(0, 0, width, height).data;

      const points = [];
      for (let y = 0; y < height; y += spacing) {
        for (let x = 0; x < width; x += spacing) {
          const index = (y * width + x) * 4;
          const alpha = imgData[index + 3];
          if (alpha > 100) {
            points.push([(x - width / 2) / 10, -(y - height / 2) / 10, 0]);
          }
        }
      }
      resolve(points);
    };
  });
}

function Particles({ points }) {
  const ref = useRef();

  const [positions] = useState(() => {
    const arr = new Float32Array(points.length * 3);
    for (let i = 0; i < points.length; i++) {
      const [x, y, z] = points[i];
      arr[i * 3] = (Math.random() - 0.5) * 100;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 100;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return arr;
  });

  useFrame(() => {
    const attr = ref.current.geometry.attributes.position;
    for (let i = 0; i < points.length; i++) {
      const [tx, ty, tz] = points[i];
      attr.array[i * 3] += (tx - attr.array[i * 3]) * 0.04;
      attr.array[i * 3 + 1] += (ty - attr.array[i * 3 + 1]) * 0.04;
      attr.array[i * 3 + 2] += (tz - attr.array[i * 3 + 2]) * 0.04;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.4}
        color="#0077B6"
        sizeAttenuation
        transparent
        opacity={0.9}
      />
    </points>
  );
}

export default function LogoParticlesCanvas({ onLoadComplete }) {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    generateParticlesFromImage('/logo.png', 5).then((pts) => {
      setPoints(pts);
      if (onLoadComplete) onLoadComplete(); // ✅ Callback here
    });
  }, []);

  return (
    <div>
      <Canvas camera={{ position: [0, 0, 40], fov: 75 }}>
        <ambientLight />
        {points.length > 0 && <Particles points={points} />}
      </Canvas>
    </div>
  );
}

