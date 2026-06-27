import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, ContactShadows } from '@react-three/drei';

function HeartModel() {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Generate a procedural 3D heart shape
  const shape = useMemo(() => {
    const x = -5, y = -10; // offset to center the heart geometry
    const heartShape = new THREE.Shape();
    heartShape.moveTo(x + 5, y + 5);
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
    return heartShape;
  }, []);

  const extrudeSettings = {
    depth: 3,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 2,
    bevelSize: 1,
    bevelThickness: 1,
  };

  // Follow the mouse cursor smoothly and keep it alive on mobile
  useFrame((state) => {
    if (meshRef.current) {
      // Continuous slow rotation base
      const baseRotationY = state.clock.elapsedTime * 0.2;
      
      // Offset by pointer interaction
      const targetX = (state.pointer.x * Math.PI) / 3;
      const targetY = (state.pointer.y * Math.PI) / 3;
      
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, baseRotationY + targetX, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, Math.PI - targetY, 0.1);
    }
  });

  return (
    <Float speed={3} rotationIntensity={0} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={0.12} rotation={[Math.PI, 0, 0]}>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <MeshDistortMaterial
          color="#ff0a4b" // Brighter, punchy vibrant red
          emissive="#ff0a4b" // Emissive glow so it pops against dark background
          emissiveIntensity={0.6}
          clearcoat={1}
          clearcoatRoughness={0.2}
          metalness={0.5} // Lowered metalness so it doesn't get dark shadows
          roughness={0.1}
          distort={0.2} // Pulsating/beating effect
          speed={4} // Faster beating
        />
      </mesh>
    </Float>
  );
}

export default function InteractiveHeart() {
  return (
    <div style={{ width: '100%', height: '300px', marginBottom: '10px' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* Brighter lighting to make it pop */}
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ffb3c6" />
        
        <HeartModel />
        
        {/* Soft shadow underneath the heart */}
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} color="#ff0a4b" />
      </Canvas>
    </div>
  );
}
