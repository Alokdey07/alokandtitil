import { useRef, useMemo, useState, useEffect } from 'react';
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

  const [pulse, setPulse] = useState(1);
  const orientation = useRef({ beta: 0, gamma: 0 });

  useEffect(() => {
    // 1. Listen for device tilt (Gyroscope/Accelerometer)
    const handleOrientation = (e: DeviceOrientationEvent) => {
      orientation.current = {
        beta: e.beta || 0,
        gamma: e.gamma || 0
      };
    };
    window.addEventListener('deviceorientation', handleOrientation as any);

    // 2. Listen for global taps to trigger a heartbeat pulse
    const handleTap = () => {
      setPulse(1.4); // swell up
      setTimeout(() => setPulse(1), 150); // snap back
    };
    window.addEventListener('pointerdown', handleTap);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation as any);
      window.removeEventListener('pointerdown', handleTap);
    };
  }, []);

  // Follow the mouse cursor smoothly and keep it alive on mobile
  useFrame((state) => {
    if (meshRef.current) {
      // Continuous slow rotation base
      const baseRotationY = state.clock.elapsedTime * 0.2;
      
      let targetX = (state.pointer.x * Math.PI) / 3;
      let targetY = (state.pointer.y * Math.PI) / 3;

      // If mobile sensors are detecting tilt, override the pointer!
      if (Math.abs(orientation.current.gamma) > 1 || Math.abs(orientation.current.beta) > 1) {
        targetX = (orientation.current.gamma * Math.PI) / 180; // Left-Right tilt
        // Phones are usually held tilted up at ~45 degrees, so we subtract 45 to find neutral center
        targetY = ((orientation.current.beta - 45) * Math.PI) / 180; 
      }
      
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, baseRotationY + targetX, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, Math.PI - targetY, 0.1);

      // Apply the heartbeat pulse scale
      const targetScale = pulse * 0.12;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.2));
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
