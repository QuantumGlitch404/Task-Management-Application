import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial, Sphere, Float } from '@react-three/drei';

const ElegantGeometry = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Outer intricate wireframe */}
      <Icosahedron args={[2.5, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#3b82f6" 
          wireframe 
          transparent
          opacity={0.15}
        />
      </Icosahedron>

      {/* Inner solid sophisticated object */}
      <Icosahedron args={[1.8, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#121212" 
          roughness={0.2}
          metalness={0.8}
          flatShading
        />
      </Icosahedron>

      {/* Floating orbital sphere */}
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[0.3, 32, 32]} position={[3, 2, -1]}>
          <meshStandardMaterial 
            color="#3b82f6" 
            roughness={0.1}
            metalness={0.9}
            emissive="#3b82f6"
            emissiveIntensity={0.2}
          />
        </Sphere>
      </Float>
      
      {/* Second orbital sphere */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2.5}>
        <Sphere args={[0.2, 32, 32]} position={[-2.5, -2, 1]}>
          <meshStandardMaterial 
            color="#e2e8f0" 
            roughness={0.4}
            metalness={0.5}
          />
        </Sphere>
      </Float>
    </group>
  );
};

const FloatingTaskCard = () => {
  return (
    <div className="w-full h-full min-h-[450px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        {/* Elegant cinematic lighting */}
        <ambientLight intensity={0.2} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1.5} 
          castShadow 
          color="#ffffff"
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[0, 0, 10]} intensity={0.2} color="#ffffff" />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <ElegantGeometry />
        </Float>
      </Canvas>
    </div>
  );
};

export default FloatingTaskCard;
