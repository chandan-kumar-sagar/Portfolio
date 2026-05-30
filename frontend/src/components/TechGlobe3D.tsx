import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface SkillNode {
  name: string;
  icon: string;
  color: string;
  borderColor: string;
  textColor: string;
  shadow: string;
  level: number;
  desc: string;
}

interface TechGlobe3DProps {
  activeSection: string;
  onHoverSkill: (skill: SkillNode | null) => void;
}

// 10 Core technologies
const SKILLS: SkillNode[] = [
  { name: "Node.js",     icon: "🟢", color: "#22c55e", borderColor: "border-green-500/50",  textColor: "text-green-400",  shadow: "shadow-[0_0_18px_rgba(34,197,94,0.5)]",   level: 92, desc: "Designing scalable backend architectures with event-driven runtime engines." },
  { name: "Express.js",  icon: "⚡", color: "#06b6d4", borderColor: "border-cyan-500/50",   textColor: "text-cyan-400",   shadow: "shadow-[0_0_18px_rgba(6,182,212,0.5)]",   level: 90, desc: "Routing HTTP endpoints and configuring pipeline middleware systems." },
  { name: "TypeScript",  icon: "🔷", color: "#3b82f6", borderColor: "border-blue-500/50",   textColor: "text-blue-400",   shadow: "shadow-[0_0_18px_rgba(59,130,246,0.5)]",  level: 88, desc: "Enforcing strict static type constraints, custom interfaces & schemas." },
  { name: "MySQL",       icon: "🐬", color: "#a855f7", borderColor: "border-purple-500/50", textColor: "text-purple-400", shadow: "shadow-[0_0_18px_rgba(168,85,247,0.5)]",  level: 90, desc: "Structuring relational databases and tuning complex query indexes." },
  { name: "MongoDB",     icon: "🍃", color: "#10b981", borderColor: "border-emerald-500/50",textColor: "text-emerald-400",shadow: "shadow-[0_0_18px_rgba(16,185,129,0.5)]",  level: 85, desc: "Constructing JSON document storage matrices and aggregations." },
  { name: "React.js",   icon: "⚛️", color: "#0ea5e9", borderColor: "border-sky-500/50",    textColor: "text-sky-400",    shadow: "shadow-[0_0_18px_rgba(14,165,233,0.5)]",  level: 82, desc: "Building modular interfaces with reactive virtual DOM lifecycles." },
  { name: "JWT Auth",    icon: "🔑", color: "#ec4899", borderColor: "border-pink-500/50",   textColor: "text-pink-400",   shadow: "shadow-[0_0_18px_rgba(236,72,153,0.5)]",  level: 92, desc: "Implementing stateless session-free authorization and access scopes." },
  { name: "Git",         icon: "🐙", color: "#f97316", borderColor: "border-orange-500/50", textColor: "text-orange-400", shadow: "shadow-[0_0_18px_rgba(249,115,22,0.5)]",  level: 88, desc: "Managing repository version control trees and merge branches." },
  { name: "Postman",     icon: "🚀", color: "#6366f1", borderColor: "border-indigo-500/50", textColor: "text-indigo-400", shadow: "shadow-[0_0_18px_rgba(99,102,241,0.5)]",  level: 90, desc: "Automating API unit tests and compiling development environment scripts." },
  { name: "JavaScript",  icon: "💛", color: "#eab308", borderColor: "border-yellow-500/50", textColor: "text-yellow-400", shadow: "shadow-[0_0_18px_rgba(234,179,8,0.5)]",   level: 88, desc: "Working with asynchronous event loops, promises, and functional patterns." }
];

// Icon-only badge — shows tooltip on hover
const TechBadge: React.FC<{
  skill: SkillNode;
  position: [number, number, number];
  onHover: (hovered: boolean) => void;
}> = ({ skill, position, onHover }) => {
  const badgeRef = useRef<THREE.Group>(null);
  const [depthOpacity, setDepthOpacity] = useState(1);
  const [depthScale, setDepthScale] = useState(1);
  const [depthZIndex, setDepthZIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    if (!badgeRef.current) return;
    const worldPos = new THREE.Vector3();
    badgeRef.current.getWorldPosition(worldPos);

    const cameraZ = state.camera.position.z;
    const maxDistance = cameraZ + 2.35;
    const minDistance = cameraZ - 2.35;
    const distance = worldPos.distanceTo(state.camera.position);
    const t = 1 - (distance - minDistance) / (maxDistance - minDistance);
    const clampedT = Math.max(0, Math.min(1, t));

    setDepthOpacity(THREE.MathUtils.lerp(0.1, 1.0, clampedT));
    setDepthScale(THREE.MathUtils.lerp(0.6, 1.1, clampedT));
    setDepthZIndex(Math.round(clampedT * 100));
  });

  const handleMouseEnter = () => { setIsHovered(true); onHover(true); };
  const handleMouseLeave = () => { setIsHovered(false); onHover(false); };

  return (
    <group ref={badgeRef} position={position}>
      <Html distanceFactor={4.5} center className="pointer-events-none">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            opacity: depthOpacity,
            transform: `scale(${depthScale * (isHovered ? 1.35 : 1.0)})`,
            zIndex: depthZIndex + (isHovered ? 50 : 0),
            pointerEvents: depthOpacity > 0.35 ? 'auto' : 'none',
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="relative flex flex-col items-center select-none"
        >
          {/* Icon Circle — the ONLY visible element when not hovered */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center bg-[#040612]/95 backdrop-blur-md border-2 cursor-pointer transition-all duration-200
              ${isHovered ? `${skill.borderColor} ${skill.shadow}` : 'border-white/10'}`}
          >
            <span className="text-lg leading-none">{skill.icon}</span>
          </div>

          {/* Tooltip — only appears on hover, floats above */}
          {isHovered && (
            <div
              className={`absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1.5 rounded-lg bg-[#040612]/95 backdrop-blur-md border ${skill.borderColor} pointer-events-none`}
              style={{ zIndex: 999 }}
            >
              <span className={`font-orbitron font-extrabold text-[10px] tracking-widest ${skill.textColor} block text-center`}>
                {skill.name}
              </span>
              <span className="font-mono text-[8px] text-slate-400 block text-center">
                {skill.level}% proficiency
              </span>
              {/* Arrow */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#040612] border-r border-b"
                style={{ borderColor: skill.color + '60' }}
              />
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

// Inner Globe group
interface InnerGlobeProps {
  onHoverSkill: (skill: SkillNode | null) => void;
  targetRotationX: React.MutableRefObject<number>;
  targetRotationY: React.MutableRefObject<number>;
  currentRotationX: React.MutableRefObject<number>;
  currentRotationY: React.MutableRefObject<number>;
  isDragging: boolean;
}

const InnerGlobe: React.FC<InnerGlobeProps> = ({
  onHoverSkill,
  targetRotationX, targetRotationY,
  currentRotationX, currentRotationY,
  isDragging
}) => {
  const globeGroupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const particleCount = 500;
  const positions = React.useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    const radius = 1.4;
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      arr[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);

  const skillPositions = React.useMemo(() => {
    const coords: [number, number, number][] = [];
    const radius = 2.2;
    const n = SKILLS.length;
    for (let i = 0; i < n; i++) {
      const phi   = Math.acos(1 - 2 * (i + 0.5) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      coords.push([
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      ]);
    }
    return coords;
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (!isDragging) targetRotationY.current += 0.0015;

    currentRotationY.current = THREE.MathUtils.lerp(currentRotationY.current, targetRotationY.current, 0.06);
    currentRotationX.current = THREE.MathUtils.lerp(currentRotationX.current, targetRotationX.current, 0.06);

    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y = currentRotationY.current;
      globeGroupRef.current.rotation.x = currentRotationX.current;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = elapsed * 0.18;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -elapsed * 0.28;
  });

  return (
    <group ref={globeGroupRef}>
      {/* Point-cloud sphere surface */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#00f0ff" size={0.035} sizeAttenuation transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </points>

      {/* Wireframe globe */}
      <mesh>
        <sphereGeometry args={[1.38, 20, 20]} />
        <meshBasicMaterial color="#0d1b3e" transparent opacity={0.12} wireframe />
      </mesh>

      {/* Rotating HUD rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1.7, 0.009, 8, 64]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.22} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[-Math.PI / 4, -Math.PI / 4, 0]}>
        <torusGeometry args={[1.88, 0.007, 8, 48]} />
        <meshBasicMaterial color="#bd00ff" transparent opacity={0.16} />
      </mesh>

      {/* Icon-only orbiting tech badges */}
      {SKILLS.map((skill, idx) => (
        <TechBadge
          key={skill.name}
          skill={skill}
          position={skillPositions[idx]}
          onHover={(hovered) => onHoverSkill(hovered ? skill : null)}
        />
      ))}
    </group>
  );
};

export const TechGlobe3D: React.FC<TechGlobe3DProps> = ({ activeSection: _activeSection, onHoverSkill }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const pointerX = useRef(0);
  const pointerY = useRef(0);
  const targetRotationY = useRef(0);
  const targetRotationX = useRef(0);
  const currentRotationY = useRef(0);
  const currentRotationX = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    pointerX.current = e.clientX;
    pointerY.current = e.clientY;
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    targetRotationY.current += (e.clientX - pointerX.current) * 0.005;
    targetRotationX.current += (e.clientY - pointerY.current) * 0.005;
    targetRotationX.current = Math.max(-Math.PI / 2.8, Math.min(Math.PI / 2.8, targetRotationX.current));
    pointerX.current = e.clientX;
    pointerY.current = e.clientY;
  };

  const handlePointerUpOrLeave = () => {
    setIsDragging(false);
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUpOrLeave}
      onPointerLeave={handlePointerUpOrLeave}
      className="w-full h-full relative select-none cursor-grab active:cursor-grabbing"
    >
      {/* Glow backdrop */}
      <div className="absolute inset-0 pointer-events-none rounded-full blur-[90px] bg-cyan-500/4 -z-10" />

      <Canvas camera={{ position: [0, 0, 4.8], fov: 45 }} className="w-full h-full pointer-events-none">
        <ambientLight intensity={1.4} color="#0c1020" />
        <pointLight position={[-6, 3, -4]} intensity={2.5} color="#bd00ff" />
        <pointLight position={[6, -3, 4]}  intensity={2.5} color="#00f0ff" />
        <InnerGlobe
          onHoverSkill={onHoverSkill}
          targetRotationX={targetRotationX}
          targetRotationY={targetRotationY}
          currentRotationX={currentRotationX}
          currentRotationY={currentRotationY}
          isDragging={isDragging}
        />
      </Canvas>

      {/* Corner HUD labels */}
      <div className="absolute bottom-3 left-3 font-mono text-[8px] text-cyan-500/35 pointer-events-none select-none leading-relaxed">
        <div>DRAG TO ROTATE</div>
        <div>HOVER TO INSPECT</div>
      </div>
    </div>
  );
};

export default TechGlobe3D;
export type { SkillNode };
