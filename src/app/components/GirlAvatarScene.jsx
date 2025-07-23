"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Html } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";

function GirlModel({ scrollY }) {
  const { scene } = useGLTF("/meghanaportfolio/public/girl.glb"); // Replace with a GLB model URL or public asset
  const meshRef = useRef();

  // Basic scroll to emotion logic
  useEffect(() => {
    if (!meshRef.current) return;
    const expressionIndex = Math.floor((scrollY / window.innerHeight) * 4);

    // Pseudocode: Apply morph targets or animations
    meshRef.current.rotation.y = scrollY * 0.001;
    // Change expression based on scroll
    // You can integrate morphTargetInfluences here
  }, [scrollY]);

  return <primitive ref={meshRef} object={scene} scale={2} />;
}

export default function GirlAvatarScene() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-[200vh] w-full relative">
      <Canvas className="fixed top-0 left-0 h-screen w-screen" camera={{ position: [0, 1.5, 5] }}>
        <ambientLight intensity={1} />
        <GirlModel scrollY={scrollY} />
      </Canvas>
      <div className="absolute top-[10vh] left-[10vw] z-10 text-white text-4xl font-bold">
        Welcome everyone 🌟
      </div>
    </div>
  );
}
