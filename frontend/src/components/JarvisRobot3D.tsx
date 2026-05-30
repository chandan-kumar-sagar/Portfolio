import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface JarvisRobot3DProps {
  activeSection: string;
  isSpeaking: boolean;
}

// 3D Inner Robot Model Component
const HumanoidRobot: React.FC<{ activeSection: string; isSpeaking: boolean }> = ({ activeSection, isSpeaking }) => {
  const robotRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftForearmRef = useRef<THREE.Group>(null);
  const rightForearmRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Track cursor coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2),
        y: (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2),
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate robot inside the R3F frame loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (!robotRef.current) return;

    // 1. Idle Breathing Animation (Spine, Torso, Hips)
    const breathFactor = Math.sin(time * 2.0);
    if (torsoRef.current) {
      torsoRef.current.position.y = breathFactor * 0.02;
      torsoRef.current.rotation.x = breathFactor * 0.01;
    }

    // 2. Cursor targeting / Mouse tracking for Head and Neck
    if (headRef.current) {
      // Smoothly interpolate looking rotations
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, mouse.x * 0.5, 0.1);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, mouse.y * 0.3, 0.1);
      // Breathing tilt
      headRef.current.rotation.z = Math.sin(time * 1.5) * 0.005;
    }

    // 3. Dynamic Hand Gestures & Animations based on active scroll section
    if (leftArmRef.current && rightArmRef.current && leftForearmRef.current && rightForearmRef.current) {
      if (activeSection === 'contact') {
        // Pointing/inviting gesture
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.6, 0.1);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -1.0, 0.1);
        rightForearmRef.current.rotation.y = THREE.MathUtils.lerp(rightForearmRef.current.rotation.y, -0.5, 0.1);
        
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.4, 0.1);
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -0.3, 0.1);
      } else if (isSpeaking) {
        // Speak talking arm gesture
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.4 + Math.sin(time * 5) * 0.05, 0.1);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.8 + Math.cos(time * 5) * 0.05, 0.1);
        
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.4, 0.1);
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -0.2, 0.1);
      } else {
        // Natural organic humanoid breathing idle arm rest
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.2, 0.1);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, Math.sin(time * 1.2) * 0.04, 0.1);
        rightForearmRef.current.rotation.y = THREE.MathUtils.lerp(rightForearmRef.current.rotation.y, 0, 0.1);
        
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.2, 0.1);
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, Math.sin(time * 1.2) * 0.04, 0.1);
      }
    }
  });

  return (
    <group ref={robotRef} position={[0, -1.8, 0]}>
      {/* Torso Frame */}
      <group ref={torsoRef}>
        {/* Futuristic Chrome Torso Body Armor */}
        <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.45, 0.25, 0.9, 16]} />
          <meshStandardMaterial 
            color={0x151c2c} 
            metalness={0.9} 
            roughness={0.15} 
            normalScale={new THREE.Vector2(0.2, 0.2)}
          />
        </mesh>

        {/* Cybernetic Spine Links */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 0.35, 8]} />
          <meshStandardMaterial color={0x0a0f1d} metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Core Pulsing Reactor Reactor (Chest Center) */}
        <mesh position={[0, 1.45, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.05, 16]} />
          <meshBasicMaterial color={isSpeaking ? 0xff007f : 0x00f0ff} />
        </mesh>

        {/* Hips and Pelvis */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[0.48, 0.18, 0.35]} />
          <meshStandardMaterial color={0x111625} metalness={0.9} roughness={0.15} />
        </mesh>

        {/* LEFT ARM assembly */}
        <group ref={leftArmRef} position={[-0.6, 1.6, 0]}>
          {/* Shoulder Joint */}
          <mesh castShadow>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color={0x00f0ff} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Upper Arm Bicep */}
          <mesh position={[-0.15, -0.3, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.07, 0.5, 12]} />
            <meshStandardMaterial color={0x111625} metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Elbow Joint */}
          <group ref={leftForearmRef} position={[-0.15, -0.55, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshStandardMaterial color={0x111625} metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Forearm */}
            <mesh position={[0, -0.3, 0]} castShadow>
              <cylinderGeometry args={[0.07, 0.05, 0.45, 12]} />
              <meshStandardMaterial color={0x151c2c} metalness={0.95} roughness={0.15} />
            </mesh>
            {/* Hand with glowing palm node */}
            <mesh position={[0, -0.55, 0]} castShadow>
              <boxGeometry args={[0.09, 0.09, 0.05]} />
              <meshStandardMaterial color={0x111625} metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, -0.58, 0.01]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshBasicMaterial color={0x00f0ff} />
            </mesh>
          </group>
        </group>

        {/* RIGHT ARM assembly */}
        <group ref={rightArmRef} position={[0.6, 1.6, 0]}>
          {/* Shoulder Joint */}
          <mesh castShadow>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color={0x00f0ff} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Upper Arm Bicep */}
          <mesh position={[0.15, -0.3, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.07, 0.5, 12]} />
            <meshStandardMaterial color={0x111625} metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Elbow Joint */}
          <group ref={rightForearmRef} position={[0.15, -0.55, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshStandardMaterial color={0x111625} metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Forearm */}
            <mesh position={[0, -0.3, 0]} castShadow>
              <cylinderGeometry args={[0.07, 0.05, 0.45, 12]} />
              <meshStandardMaterial color={0x151c2c} metalness={0.95} roughness={0.15} />
            </mesh>
            {/* Hand with glowing palm node */}
            <mesh position={[0, -0.55, 0]} castShadow>
              <boxGeometry args={[0.09, 0.09, 0.05]} />
              <meshStandardMaterial color={0x111625} metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, -0.58, 0.01]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshBasicMaterial color={0x00f0ff} />
            </mesh>
          </group>
        </group>
      </group>

      {/* Head Assembly on Neck Joint */}
      <mesh position={[0, 1.85, 0]}>
        <cylinderGeometry args={[0.07, 0.09, 0.22, 12]} />
        <meshStandardMaterial color={0x0a0f1d} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* HEAD GROUP */}
      <group ref={headRef} position={[0, 2.05, 0]}>
        {/* High-Tech Chrome Skull Core */}
        <mesh castShadow>
          <sphereGeometry args={[0.26, 32, 32]} />
          <meshStandardMaterial color={0x151c2c} metalness={0.95} roughness={0.12} />
        </mesh>
        
        {/* Holographic Visor Glass Layer */}
        <mesh>
          <sphereGeometry args={[0.28, 32, 32]} />
          <meshPhysicalMaterial 
            color={0x00f0ff} 
            transparent={true} 
            opacity={0.3} 
            roughness={0.1} 
            metalness={0.1} 
            transmission={0.8} 
            thickness={0.5} 
          />
        </mesh>

        {/* Emissive Cyber Visor Eyes (glowing cyan / magenta when speaking) */}
        <mesh position={[0, 0.04, 0.21]}>
          <boxGeometry args={[0.22, 0.038, 0.05]} />
          <meshBasicMaterial color={isSpeaking ? 0xff007f : 0x00f0ff} />
        </mesh>

        {/* Circular Orbiting Diagnostic Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.34, 0.01, 8, 48]} />
          <meshBasicMaterial color={0x00f0ff} transparent opacity={0.6} />
        </mesh>

        {/* Ear Antennas / Core Audio Transceivers */}
        <mesh position={[0.29, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.08, 12]} />
          <meshBasicMaterial color={0x00f0ff} />
        </mesh>
        <mesh position={[-0.29, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.08, 12]} />
          <meshBasicMaterial color={0x00f0ff} />
        </mesh>
      </group>

      {/* LEFT LEG Assembly */}
      <group position={[-0.2, 0.5, 0]}>
        {/* Upper Thigh */}
        <mesh castShadow>
          <cylinderGeometry args={[0.09, 0.07, 0.6, 12]} />
          <meshStandardMaterial color={0x111625} metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Knee Joint */}
        <group position={[0, -0.35, 0]}>
          <mesh>
            <sphereGeometry args={[0.075, 12, 12]} />
            <meshStandardMaterial color={0x151c2c} metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Shin */}
          <mesh position={[0, -0.3, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.05, 0.55, 12]} />
            <meshStandardMaterial color={0x151c2c} metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Foot */}
          <mesh position={[0, -0.62, 0.05]} castShadow>
            <boxGeometry args={[0.1, 0.06, 0.22]} />
            <meshStandardMaterial color={0x111625} metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* RIGHT LEG Assembly */}
      <group position={[0.2, 0.5, 0]}>
        {/* Upper Thigh */}
        <mesh castShadow>
          <cylinderGeometry args={[0.09, 0.07, 0.6, 12]} />
          <meshStandardMaterial color={0x111625} metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Knee Joint */}
        <group position={[0, -0.35, 0]}>
          <mesh>
            <sphereGeometry args={[0.075, 12, 12]} />
            <meshStandardMaterial color={0x151c2c} metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Shin */}
          <mesh position={[0, -0.3, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.05, 0.55, 12]} />
            <meshStandardMaterial color={0x151c2c} metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Foot */}
          <mesh position={[0, -0.62, 0.05]} castShadow>
            <boxGeometry args={[0.1, 0.06, 0.22]} />
            <meshStandardMaterial color={0x111625} metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export const JarvisRobot3D: React.FC<JarvisRobot3DProps> = ({ activeSection, isSpeaking }) => {
  return (
    <div className="w-full h-full min-h-[580px] md:min-h-[680px] relative select-none">
      {/* Core Glowing Hologram Underlights */}
      <div className="absolute inset-0 bg-radial-gradient from-cyan-500/5 via-purple-500/0 to-transparent pointer-events-none rounded-full blur-[80px]" />
      
      {/* React Three Fiber Canvas Mount */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Holographic Studio Lighting */}
        <ambientLight intensity={1.8} color="#0d1b3e" />
        
        {/* Core Spotlight on Robot */}
        <spotLight
          position={[0, 5, 5]}
          angle={0.4}
          penumbra={0.8}
          intensity={6}
          castShadow
          shadow-bias={-0.0001}
          color="#00f0ff"
        />

        {/* Cinematic Backdrop Accent Lights */}
        <pointLight position={[-4, 2, -2]} intensity={4} color="#bd00ff" />
        <pointLight position={[4, -1, 2]} intensity={3} color="#00f0ff" />
        
        <Float speed={1.8} floatIntensity={0.25} rotationIntensity={0.1}>
          <HumanoidRobot activeSection={activeSection} isSpeaking={isSpeaking} />
        </Float>
      </Canvas>
    </div>
  );
};

export default JarvisRobot3D;
