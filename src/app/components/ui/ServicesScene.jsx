'use client';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import StageSpotlightScene from './StageSpotlightScene'; // where useFrame is used

export default function ServicesScene() {
  return (
    <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <Suspense fallback={null}>
        <StageSpotlightScene />
      </Suspense>
    </Canvas>
  );
}
