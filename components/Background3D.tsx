import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const Geometries = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.02; // Slower rotation for elegance
    }
  });

  // Elegant gold and dark shapes
  const shapes = Array.from({ length: 12 }).map((_, i) => ({
    position: [
      (Math.random() - 0.5) * 25,
      (Math.random() - 0.5) * 25,
      (Math.random() - 0.5) * 15 - 5
    ] as [number, number, number],
    color: i % 2 === 0 ? '#D4AF37' : '#333333', // Gold and Dark Grey
    scale: Math.random() * 0.6 + 0.3,
    type: i % 3, 
  }));

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float key={i} speed={1} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={shape.position} scale={shape.scale}>
            {shape.type === 0 && <icosahedronGeometry args={[1, 0]} />}
            {shape.type === 1 && <torusGeometry args={[0.8, 0.05, 16, 50]} />} {/* Thinner torus */}
            {shape.type === 2 && <octahedronGeometry args={[1, 0]} />}
            <meshStandardMaterial 
              color={shape.color} 
              wireframe={true}
              transparent
              opacity={0.4}
              metalness={0.9}
              roughness={0.1}
              emissive={shape.color}
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}
      {/* Subtle dust particles */}
      <Stars radius={60} depth={50} count={1000} factor={3} saturation={0} fade speed={0.5} />
    </group>
  );
};

export const Background3D: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/20 via-black to-black opacity-80 pointer-events-none" />
      
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.2} />
        {/* Warm Gold Lights */}
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#D4AF37" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFFFFF" />
        <Geometries />
        <fog attach="fog" args={['#000000', 8, 35]} />
      </Canvas>
    </div>
  );
};