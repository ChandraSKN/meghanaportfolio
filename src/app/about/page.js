'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';

const timeline = [
  "Pharm.D | MSc Psychology | PGDip in Pharmacovigilance",
  "Graduate Member – British Psychological Society",
  "10+ Years in Public Health, Governance, and Education",
  "Board Trustee – Rotherham Abuse Counselling Service",
  "Physician's Assistant – NHS, Addenbrooke's Hospital",
  "CBT, ACT, MI, Trans Health Coaching (under supervision)",
  "Founder – PRIDaLLY (Inclusive MedTech)",
  "Founder – ARGO Chroma (Drag-safe Cosmetics)",
  "Co-founder – Scensora (Conscious Candles)",
  "Author – 1 Book | 4 Peer-reviewed Papers",
];

// Position cards in M shape: 4 left column, 1 middle, 3 right column
function getPosition(idx) {
  const xLeft = -12;
  const xRight = 12;
  const peakX = 0;
  const spacingY = 4.5;

  const positions = [
    // Left vertical line going up
    [xLeft, -spacingY * 2, 0], // 0
    [xLeft, -spacingY * 1, 0], // 1
    [xLeft, 0, 0],             // 2
    [xLeft, spacingY * 1, 0],  // 3

    // Peak
    [peakX, spacingY * -2, 0], // 4

    // Right vertical line going down
    [xRight, spacingY * 1, 0],  // 5
    [xRight, 0, 0],            // 6
    [xRight, -spacingY * 1, 0], // 7
    [xRight, -spacingY * 2, 0], // 8
    [xRight, -spacingY * 3, 0], // 9
  ];

  return positions[idx] || [0, 0, 0];
}


function Card({ text, position, visible }) {
  return (
    <group position={position} visible={visible}>
      <mesh>
        <planeGeometry args={[6.5, 2.2]} />
        <meshStandardMaterial color="#ffffff" opacity={0.95} transparent />
      </mesh>
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.3}
        maxWidth={6}
        lineHeight={1.3}
        color="#000"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
}


function AnimatedLine({ start, end, visible, progress }) {
  const drawnPoints = useMemo(() => {
    const vec = new THREE.Vector3().subVectors(end, start).multiplyScalar(progress).add(start);
    return [start.clone(), vec];
  }, [start, end, progress]);

  return visible ? (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array([
            drawnPoints[0].x, drawnPoints[0].y, drawnPoints[0].z,
            drawnPoints[1].x, drawnPoints[1].y, drawnPoints[1].z,
          ])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#FF69B4" linewidth={4} />
    </line>
  ) : null;
}


function SceneContent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);

  useFrame((_, delta) => {
    if (lineProgress < 1) {
      setLineProgress((p) => Math.min(p + delta * 1.5, 1));
    } else if (activeIndex < timeline.length) {
      const next = activeIndex + 1;
      setTimeout(() => {
        setActiveIndex(next);
        setLineProgress(0);
      }, 300);
    }
  });

  return (
    <>
      {timeline.map((text, idx) => {
        const pos = getPosition(idx);
        const nextPos = getPosition(idx + 1);
        const showCard = idx <= activeIndex;
        const showLine = idx < activeIndex;

        return (
          <group key={idx}>
            {idx < timeline.length - 1 && (
              <AnimatedLine
                start={new THREE.Vector3(...pos)}
                end={new THREE.Vector3(...nextPos)}
                visible={showLine}
                progress={idx === activeIndex ? lineProgress : 1}
              />
            )}
            <Card text={text} position={pos} visible={showCard} />
          </group>
        );
      })}
    </>
  );
}

export default function AboutPage() {
  const [welcome, setWelcome] = useState(true);

  return (
    <div className="w-full h-screen bg-[#FBEAEA] text-black overflow-hidden p-4">
      {/* {welcome && (
        <div
          onClick={() => setWelcome(false)}
          className="fixed inset-0 bg-[#FBEAEA] flex items-center justify-center text-4xl font-bold z-50 cursor-pointer"
        >
          Welcome to Dr. Meghana's Journey — Click to Begin
        </div>
      )} */}
      {welcome && (
        <Canvas camera={{ position: [0, 0, 40], fov: 45 }}>
          <ambientLight intensity={2} />
          <directionalLight position={[10, 10, 10]} intensity={0.6} />
          <SceneContent />
        </Canvas>
      )}
    </div>
  );
}