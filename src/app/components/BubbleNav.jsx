'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { Html, Float, Environment } from '@react-three/drei';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function getCornerPositions(camera, size) {
  const { width, height } = size;

  const distance = camera.position.z;
  const aspect = width / height;

  const vFOV = (camera.fov * Math.PI) / 180;
  const visibleHeight = 2 * Math.tan(vFOV / 2) * distance;
  const visibleWidth = visibleHeight * aspect;

  const halfW = visibleWidth / 2;
  const halfH = visibleHeight / 2;

  return {
    topLeft: [-halfW + 1, halfH - 1, 0],
    topRight: [halfW - 1, halfH - 1, 0],
    bottomLeft: [-halfW + 1.25, -halfH + 1, 0],
    bottomRight: [halfW - 1.25, -halfH + 1, 0],
  };
}

function Bubble({ label, href, position }) {
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.4}>
      <mesh position={position}>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshPhysicalMaterial
          transmission={1}
          roughness={0.05}
          thickness={2}
          clearcoat={1}
          color="#E8DAEF"
        />
        <Html center>
          <Link
            href={href}
            className="text-[#3C3C3C] hover:text-[#2E86C1] text-sm sm:text-base md:text-lg font-semibold hover:scal   e-110 transition-transform"
          >
            {label}
          </Link>
        </Html>
      </mesh>
    </Float>
  );
}

// 🔁 This is INSIDE the <Canvas>
function BubbleScene() {
  const { camera, size } = useThree();
  const [positions, setPositions] = useState(null);

  useEffect(() => {
    const newPos = getCornerPositions(camera, size);
    setPositions(newPos);
  }, [camera, size]);

  if (!positions) return null;

  return (
    <>
      <ambientLight intensity={0.8} />
      <Environment preset="sunset" />
      <Bubble label="Home" href="/" position={positions.topLeft} />
      <Bubble label="About" href="/about" position={positions.topRight} />
      <Bubble label="Services" href="/services" position={positions.bottomLeft} />
      <Bubble label="Blog" href="/blog" position={positions.bottomRight} />
    </>
  );
}

export default function BubbleNav() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
        <BubbleScene />
      </Canvas>
    </div>
  );
}
