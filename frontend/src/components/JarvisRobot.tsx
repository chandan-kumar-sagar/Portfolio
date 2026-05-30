import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

interface JarvisRobotProps {
  activeSection: string;
}

export const JarvisRobot: React.FC<JarvisRobotProps> = ({ activeSection }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const speechBubbleRef = useRef<HTMLDivElement>(null);
  
  const [speechText, setSpeechText] = useState("Hello, I am Chandan's AI Assistant. Welcome to the portfolio of Chandan Kumar!");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Dynamic dialogs linked to scroll progression
  useEffect(() => {
    const dialogs: Record<string, string> = {
      hero: "Hello, I am Chandan's AI Assistant. Welcome to the portfolio of Chandan Kumar, Backend Engineer & MERN Stack Developer.",
      about: "Chandan possesses 1.7+ years of experience. He optimized database schema indices to slash API response latency by 25-30%!",
      techstack: "These are the core technologies Chandan utilizes daily. Hover over any node in the galaxy to diagnose skill benchmarks.",
      experience: "Here is Chandan's professional timeline, including his impact at Flutterflirt and Apex Digital Solutions.",
      projects: "These projects demonstrate solid production-grade backend design: TicketHub, Kaveri Engineering, and Workday AI.",
      contact: "Uplink terminals are online. Let's establish a secure packet transmission to build something exceptional together!"
    };

    const newText = dialogs[activeSection] || dialogs.hero;
    setSpeechText(newText);
    
    // Trigger speaking mouth pulse animations
    setIsSpeaking(true);
    const timer = setTimeout(() => setIsSpeaking(false), 2500);
    return () => clearTimeout(timer);
  }, [activeSection]);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene & Setup
    const width = 360;
    const height = 480;
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.8, 4.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // 2. Lighting (Holographic glowing accents)
    const ambientLight = new THREE.AmbientLight(0x0a1128, 2.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f0ff, 6, 10);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    const purpleLight = new THREE.PointLight(0xbd00ff, 4, 10);
    purpleLight.position.set(-2, 1, 2);
    scene.add(purpleLight);

    // 3. Materials
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0x111625,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: false
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.6,
      thickness: 0.5
    });

    const emissiveMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
    });

    const coreEmissiveMaterial = new THREE.MeshBasicMaterial({
      color: 0xff007f,
    });

    // 4. Procedural Humanoid Robot Group
    const robotGroup = new THREE.Group();

    // Torso Base
    const torsoGeo = new THREE.CylinderGeometry(0.5, 0.3, 0.8, 16);
    const torsoMesh = new THREE.Mesh(torsoGeo, chromeMaterial);
    torsoMesh.position.y = -0.7;
    robotGroup.add(torsoMesh);

    // Shoulder Plates (Right & Left)
    const shoulderGeo = new THREE.SphereGeometry(0.2, 12, 12);
    const rightShoulder = new THREE.Mesh(shoulderGeo, chromeMaterial);
    rightShoulder.position.set(0.65, -0.4, 0);
    const leftShoulder = new THREE.Mesh(shoulderGeo, chromeMaterial);
    leftShoulder.position.set(-0.65, -0.4, 0);
    robotGroup.add(rightShoulder);
    robotGroup.add(leftShoulder);

    // Glowing Core Reactor (Chest)
    const reactorGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.05, 12);
    reactorGeo.rotateX(Math.PI / 2);
    const reactorMesh = new THREE.Mesh(reactorGeo, coreEmissiveMaterial);
    reactorMesh.position.set(0, -0.5, 0.22);
    robotGroup.add(reactorMesh);

    // Neck Join
    const neckGeo = new THREE.CylinderGeometry(0.08, 0.1, 0.25, 12);
    const neckMesh = new THREE.Mesh(neckGeo, chromeMaterial);
    neckMesh.position.y = -0.2;
    robotGroup.add(neckMesh);

    // Head Assembly
    const headGroup = new THREE.Group();
    headGroup.position.y = 0.15;

    // Head Sphere Glass Cover
    const headGeo = new THREE.SphereGeometry(0.38, 32, 32);
    const headMesh = new THREE.Mesh(headGeo, glassMaterial);
    headGroup.add(headMesh);

    // Inner Metallic Skull Core
    const skullGeo = new THREE.SphereGeometry(0.26, 16, 16);
    const skullMesh = new THREE.Mesh(skullGeo, chromeMaterial);
    headGroup.add(skullMesh);

    // Dynamic Blinking Cyber Eyes (Left & Right)
    const eyeGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const rightEye = new THREE.Mesh(eyeGeo, emissiveMaterial);
    rightEye.position.set(0.12, 0.05, 0.22);
    const leftEye = new THREE.Mesh(eyeGeo, emissiveMaterial);
    leftEye.position.set(-0.12, 0.05, 0.22);
    headGroup.add(rightEye);
    headGroup.add(leftEye);

    // Circular Holographic Orbiting HUD Ring (Surrounding Head)
    const ringGeo = new THREE.TorusGeometry(0.48, 0.015, 8, 48);
    ringGeo.rotateX(Math.PI / 2);
    const ringMesh = new THREE.Mesh(ringGeo, emissiveMaterial);
    headGroup.add(ringMesh);

    // Glowing Ears Sensors
    const earGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.1, 12);
    earGeo.rotateZ(Math.PI / 2);
    const rightEar = new THREE.Mesh(earGeo, emissiveMaterial);
    rightEar.position.set(0.39, 0, 0);
    const leftEar = new THREE.Mesh(earGeo, emissiveMaterial);
    leftEar.position.set(-0.39, 0, 0);
    headGroup.add(rightEar);
    headGroup.add(leftEar);

    robotGroup.add(headGroup);
    scene.add(robotGroup);

    // 5. Mouse Interaction Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouse.targetX = (e.clientX - cx) / cx;
      mouse.targetY = (e.clientY - cy) / cy;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 6. Animation Loop
    let lastBlinkTime = 0;
    let isBlinking = false;
    let blinkDuration = 100; // ms
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Ambient floating idle breathing motion
      robotGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.04;
      headGroup.position.y = 0.15 + Math.cos(elapsedTime * 2) * 0.01;

      // Smooth cursor targeting tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Rotate head smoothly to follow mouse
      headGroup.rotation.y = mouse.x * 0.45;
      headGroup.rotation.x = mouse.y * 0.3;

      // Rotate HUD ring continuously
      ringMesh.rotation.y = elapsedTime * 0.4;
      ringMesh.rotation.x = Math.sin(elapsedTime * 0.5) * 0.1;

      // Speech audio pulse visualization (Scales reactor and HUD rings)
      if (isSpeaking) {
        const pulse = 1 + Math.sin(elapsedTime * 24) * 0.08;
        reactorMesh.scale.set(pulse, pulse, pulse);
        ringMesh.scale.set(pulse, pulse, pulse);
      } else {
        reactorMesh.scale.set(1, 1, 1);
        ringMesh.scale.set(1, 1, 1);
      }

      // Natural eye blinking mechanics
      const now = Date.now();
      if (!isBlinking && now - lastBlinkTime > Math.random() * 4000 + 3000) {
        isBlinking = true;
        lastBlinkTime = now;
      }

      if (isBlinking) {
        const progress = (now - lastBlinkTime) / blinkDuration;
        if (progress >= 1) {
          isBlinking = false;
          rightEye.scale.y = 1;
          leftEye.scale.y = 1;
        } else {
          // Blink squash scale down Y and up slightly X
          const scaleY = progress < 0.5 ? (1 - progress * 2) : ((progress - 0.5) * 2);
          rightEye.scale.y = Math.max(0.05, scaleY);
          leftEye.scale.y = Math.max(0.05, scaleY);
        }
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    let animationId = requestAnimationFrame(animate);

    // Cleanups
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mountRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [isSpeaking]);

  return (
    <div className="relative flex flex-col items-center">
      {/* 3D WebGL Canvas Holder */}
      <div 
        ref={mountRef} 
        className="w-[360px] h-[480px] cursor-grab select-none drop-shadow-[0_0_35px_rgba(0,240,255,0.2)]"
      />

      {/* Futuristic Holographic Speak Bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={speechText}
          ref={speechBubbleRef}
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -15 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute -top-16 md:-top-20 left-1/2 transform -translate-x-1/2 w-72 md:w-80 px-4 py-3 rounded-lg border border-cyan-400/30 glass-panel shadow-hud-glow select-text"
        >
          {/* Cyber bracket pointers */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyber-dark border-r border-b border-cyan-400/30 rotate-45"></div>
          
          <div className="flex items-center gap-1.5 border-b border-cyan-500/15 pb-1 mb-1.5 font-mono text-[9px] text-cyan-400 tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span>JARVIS SYSTEM SPEECH_UPLINK</span>
          </div>
          
          <p className="font-mono text-[10px] md:text-xs leading-relaxed text-cyan-100 select-text">
            {speechText}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default JarvisRobot;
