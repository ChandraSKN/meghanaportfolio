'use client';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function StageSpotlightScene() {
  const spotlightRef = useRef();
  const targetRef = useRef();
  const beamRef = useRef();
  const { scene } = useThree();

  // Animate spotlight beam rotation
  useFrame(({ clock }) => {
    if (spotlightRef.current && targetRef.current) {
      spotlightRef.current.target.position.set(0, 0, 0); // center target
      spotlightRef.current.target.updateMatrixWorld();
    }

    if (beamRef.current) {
      beamRef.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.3;
    }
  });

  return (
    <group>
      {/* Stage */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[5, 5, 0.2, 64]} />
        <meshStandardMaterial color="#FDE2E2" />
      </mesh>

      {/* Service Text */}
      <Float floatIntensity={2}>
        <Text fontSize={0.5} position={[0, 0.5, 0]} color="#3C3C3C" anchorX="center">
          Mental Health Support
        </Text>
        <Text fontSize={0.5} position={[0, 0.5, 0]} color="#3C3C3C" anchorX="center">
          Mental Health Support
        </Text>
      </Float>

      {/* Spotlight Beam */}
      <mesh ref={beamRef} position={[0, 3.5, 1]} rotation={[-Math.PI / 2.5, 0, 0]}>
        <coneGeometry args={[1.5, 4, 32, 1, true]} />
        <meshStandardMaterial color="#fffde7" opacity={0.3} transparent />
      </mesh>

      {/* Actual Spotlight */}
      <spotLight
        ref={spotlightRef}
        position={[0, 4, 1]}
        angle={0.3}
        penumbra={1}
        intensity={2.5}
        distance={10}
        castShadow
      />
      <object3D ref={targetRef} position={[0, 0, 0]} />
    </group>
  );
}
