import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const Particles = () => {
  const count = 30; // Max 30 particles as specified
  const meshRef = useRef();
  
  // Generate random positions
  const dummy = useMemo(() => new Float32Array(count * 3), [count]);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    }
    return pos;
  }, [count]);

  useFrame(() => {
    if (meshRef.current) {
      // Very slow vertical drift
      meshRef.current.position.y += 0.001;
      
      // Reset position if too high
      if (meshRef.current.position.y > 10) {
        meshRef.current.position.y = -10;
      }
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05} // ~2px visual size
        color="#3b82f6"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <Particles />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
