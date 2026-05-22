import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const Sphere = ({ color }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      // Slow Y-axis rotation (360 degrees in ~60s)
      meshRef.current.rotation.y += 0.0017;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      {/* Simple flat shading material, no complex effects */}
      <meshStandardMaterial 
        color={color} 
        flatShading={true}
        roughness={0.8}
      />
    </mesh>
  );
};

const ProgressOrb = ({ color = '#3b82f6' }) => {
  return (
    <div className="w-8 h-8 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4] }}>
        {/* Minimal lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        
        <Sphere color={color} />
      </Canvas>
    </div>
  );
};

export default ProgressOrb;
