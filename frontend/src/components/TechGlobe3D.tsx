import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';
import { GLOBE_SKILLS, type TechSkill } from '../data/techStack';
import { TechIcon } from './TechIcon';
import { theme } from '../theme/colors';

const T = theme.three;

export type SkillNode = TechSkill;

interface TechGlobe3DProps {
  activeSection: string;
  onHoverSkill: (skill: SkillNode | null) => void;
  /** @deprecated — kept for API compat; globe is always transparent now */
  embedded?: boolean;
}

const AUTO_SPIN = 0.011;
const RING_SPEEDS = [1.4, -2.1, 0.95, -1.65, 2.4];

/* ─── Atmospheric core with fresnel-style glow ─── */
const AtmosphereCore: React.FC = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  const atmosphereShader = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uColorA: { value: new THREE.Color(T.particle) },
          uColorB: { value: new THREE.Color(T.particleAlt) },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          varying vec3 vNormal;
          void main() {
            float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.2);
            float pulse = 0.65 + 0.35 * sin(uTime * 2.5);
            vec3 col = mix(uColorA, uColorB, fresnel);
            gl_FragColor = vec4(col, fresnel * 0.45 * pulse);
          }
        `,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    atmosphereShader.uniforms.uTime.value = t;

    if (coreRef.current) {
      const s = 1 + Math.sin(t * 3) * 0.04;
      coreRef.current.scale.setScalar(s);
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = t * 0.6;
      glowRef.current.rotation.x = t * 0.25;
      const gs = 1.15 + Math.sin(t * 2) * 0.08;
      glowRef.current.scale.setScalar(gs);
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 1.2;
      wireRef.current.rotation.z = t * 0.4;
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.05, 2]} />
        <meshBasicMaterial color={T.particle} transparent opacity={0.04} wireframe />
      </mesh>
      <mesh ref={glowRef} scale={1.12} material={atmosphereShader}>
        <sphereGeometry args={[1.08, 48, 48]} />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.18, 1]} />
        <meshBasicMaterial color={T.particle} wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

/* ─── Animated particle shell ─── */
const ParticleShell: React.FC<{ count?: number }> = ({ count = 1800 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const basePositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const radius = 1.45;
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(basePositions.slice(), 3));
    return geo;
  }, [basePositions]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.35;
    pointsRef.current.rotation.x = Math.sin(t * 0.5) * 0.08;
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.45 + Math.sin(t * 4) * 0.15;
    mat.size = 0.028 + Math.sin(t * 3) * 0.008;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={T.particle}
        size={0.032}
        sizeAttenuation
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

/* ─── Fast orbital data streams ─── */
const OrbitStreams: React.FC = () => {
  const streams = useMemo(() => {
    return [1.55, 1.72, 1.9, 2.08].map((r, i) => ({
      radius: r,
      speed: 1.8 + i * 0.4,
      tilt: (i * Math.PI) / 5,
      color: T.streamColors[i],
      count: 80 + i * 20,
    }));
  }, []);

  return (
    <>
      {streams.map((s, idx) => (
        <OrbitStreamRing key={idx} {...s} phase={idx * 1.2} />
      ))}
    </>
  );
};

const OrbitStreamRing: React.FC<{
  radius: number;
  speed: number;
  tilt: number;
  color: string;
  count: number;
  phase: number;
}> = ({ radius, speed, tilt, color, count, phase }) => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      arr[i * 3] = Math.cos(a) * radius;
      arr[i * 3 + 1] = Math.sin(a) * radius * 0.15;
      arr[i * 3 + 2] = Math.sin(a) * radius;
    }
    return arr;
  }, [radius, count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * speed + phase;
    ref.current.rotation.x = tilt + Math.sin(t * 0.8) * 0.12;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.02}
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

/* ─── HUD rings — fast multi-axis spin ─── */
const HudRings: React.FC = () => {
  const rings = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    rings.current.forEach((ring, i) => {
      if (!ring) return;
      const spd = RING_SPEEDS[i] ?? 1;
      ring.rotation.z = t * spd;
      ring.rotation.x = Math.sin(t * 0.7 + i) * 0.5 + i * 0.35;
      ring.rotation.y = Math.cos(t * 0.5 + i * 0.8) * 0.3;
      const scale = 1 + Math.sin(t * 2 + i) * 0.02;
      ring.scale.setScalar(scale);
    });
  });

  const ringConfigs: [number, number, string, number][] = T.ringColors.map((col, i) => [
    1.62 + i * 0.16,
    0.012 - i * 0.0015,
    col,
    0.32 - i * 0.05,
  ] as [number, number, string, number]);

  return (
    <>
      {ringConfigs.map(([r, tube, col, op], i) => (
        <mesh
          key={i}
          ref={(el) => { rings.current[i] = el; }}
          rotation={[Math.PI / 3 + i * 0.4, Math.PI / 5, i * 0.6]}
        >
          <torusGeometry args={[r, tube, 8, 96]} />
          <meshBasicMaterial color={col} transparent opacity={op} />
        </mesh>
      ))}
    </>
  );
};

/* ─── Rotating radar sweep ─── */
const RadarSweep: React.FC = () => {
  const sweepRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!sweepRef.current) return;
    sweepRef.current.rotation.y = state.clock.getElapsedTime() * 2.8;
  });

  return (
    <mesh ref={sweepRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.25, 2.55, 64, 1, 0, Math.PI / 4]} />
      <meshBasicMaterial
        color={T.particle}
        transparent
        opacity={0.06}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

/* ─── Tech satellite badge ─── */
const TechBadge: React.FC<{
  skill: SkillNode;
  position: [number, number, number];
  index: number;
  onHover: (hovered: boolean) => void;
}> = ({ skill, position, index, onHover }) => {
  const badgeRef = useRef<THREE.Group>(null);
  const trailRef = useRef<THREE.Mesh>(null);
  const [depthOpacity, setDepthOpacity] = useState(1);
  const [depthScale, setDepthScale] = useState(1);
  const [depthZIndex, setDepthZIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    if (!badgeRef.current) return;
    const t = state.clock.getElapsedTime();
    const bob = Math.sin(t * 3 + index * 0.7) * 0.06;
    badgeRef.current.position.set(position[0], position[1] + bob, position[2]);

    const worldPos = new THREE.Vector3();
    badgeRef.current.getWorldPosition(worldPos);
    const cameraZ = state.camera.position.z;
    const maxDistance = cameraZ + 2.35;
    const minDistance = cameraZ - 2.35;
    const distance = worldPos.distanceTo(state.camera.position);
    const clampedT = Math.max(0, Math.min(1, 1 - (distance - minDistance) / (maxDistance - minDistance)));

    setDepthOpacity(THREE.MathUtils.lerp(0.15, 1.0, clampedT));
    setDepthScale(THREE.MathUtils.lerp(0.65, 1.2, clampedT));
    setDepthZIndex(Math.round(clampedT * 100));

    if (trailRef.current) {
      trailRef.current.rotation.z = t * 2 + index;
      const trailScale = 0.85 + Math.sin(t * 4 + index) * 0.15;
      trailRef.current.scale.setScalar(trailScale);
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.15} floatIntensity={0.35}>
      <group ref={badgeRef} position={position}>
        <mesh ref={trailRef}>
          <ringGeometry args={[0.32, 0.42, 32]} />
          <meshBasicMaterial
            color={skill.color}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        <Html distanceFactor={4.2} center className="pointer-events-none">
          <div
            onMouseEnter={() => { setIsHovered(true); onHover(true); }}
            onMouseLeave={() => { setIsHovered(false); onHover(false); }}
            style={{
              opacity: depthOpacity,
              transform: `scale(${depthScale * (isHovered ? 1.45 : 1.0)})`,
              zIndex: depthZIndex + (isHovered ? 50 : 0),
              pointerEvents: depthOpacity > 0.35 ? 'auto' : 'none',
              transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="relative flex flex-col items-center select-none"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center bg-[#050614]/95 backdrop-blur-md border-2 cursor-pointer
                ${isHovered ? `${skill.borderColor} ${skill.shadow}` : 'border-cyan-500/15'}`}
              style={{
                boxShadow: isHovered
                  ? `0 0 24px ${skill.color}80, 0 0 48px ${skill.color}30`
                  : `0 0 12px ${skill.color}25`,
                animation: isHovered ? 'none' : 'pulse-glow 2s ease-in-out infinite',
              }}
            >
              <TechIcon slug={skill.slug} color={skill.color} name={skill.name} size="md" />
            </div>

            {isHovered && (
              <div
                className={`absolute bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-2 rounded-lg bg-[#080915]/95 backdrop-blur-md border ${skill.borderColor}`}
                style={{ zIndex: 999 }}
              >
                <span className={`font-orbitron font-extrabold text-[10px] tracking-widest ${skill.textColor} block text-center`}>
                  {skill.name}
                </span>
                <span className="font-mono text-[8px] text-slate-400 block text-center">
                  {skill.level}% proficiency
                </span>
              </div>
            )}
          </div>
        </Html>
      </group>
    </Float>
  );
};

/* ─── Main animated globe assembly ─── */
const AnimatedGlobe: React.FC<{
  onHoverSkill: (skill: SkillNode | null) => void;
  targetRotationX: React.MutableRefObject<number>;
  targetRotationY: React.MutableRefObject<number>;
  currentRotationX: React.MutableRefObject<number>;
  currentRotationY: React.MutableRefObject<number>;
  isDragging: boolean;
}> = ({
  onHoverSkill,
  targetRotationX,
  targetRotationY,
  currentRotationX,
  currentRotationY,
  isDragging,
}) => {
  const globeGroupRef = useRef<THREE.Group>(null);

  const skillPositions = useMemo(() => {
    const coords: [number, number, number][] = [];
    const radius = 2.25;
    const n = GLOBE_SKILLS.length;
    for (let i = 0; i < n; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      coords.push([
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      ]);
    }
    return coords;
  }, []);

  useFrame(() => {
    if (!isDragging) targetRotationY.current += AUTO_SPIN;

    currentRotationY.current = THREE.MathUtils.lerp(currentRotationY.current, targetRotationY.current, 0.08);
    currentRotationX.current = THREE.MathUtils.lerp(currentRotationX.current, targetRotationX.current, 0.08);

    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y = currentRotationY.current;
      globeGroupRef.current.rotation.x = currentRotationX.current;
      if (!isDragging) {
        globeGroupRef.current.rotation.z = Math.sin(currentRotationY.current * 0.3) * 0.04;
      }
    }
  });

  return (
    <group ref={globeGroupRef}>
      <AtmosphereCore />
      <ParticleShell />
      <OrbitStreams />
      <HudRings />
      <RadarSweep />

      <Sparkles count={80} scale={4.5} size={2.5} speed={1.2} opacity={0.45} color={T.particle} />
      <Sparkles count={60} scale={4.2} size={2} speed={1.8} opacity={0.35} color={T.particleAlt} />
      <Sparkles count={40} scale={3.8} size={1.5} speed={2.5} opacity={0.25} color={theme.neon.pink} />

      {GLOBE_SKILLS.map((skill, idx) => (
        <TechBadge
          key={skill.name}
          skill={skill}
          position={skillPositions[idx]}
          index={idx}
          onHover={(hovered) => onHoverSkill(hovered ? skill : null)}
        />
      ))}
    </group>
  );
};

/* ─── Subtle camera drift ─── */
const CameraRig: React.FC = () => {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    state.camera.position.x = Math.sin(t * 0.35) * 0.12;
    state.camera.position.y = Math.cos(t * 0.28) * 0.08;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

export const TechGlobe3D: React.FC<TechGlobe3DProps> = ({
  activeSection: _activeSection,
  onHoverSkill,
  embedded: _embedded = false,
}) => {
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
    targetRotationY.current += (e.clientX - pointerX.current) * 0.006;
    targetRotationX.current += (e.clientY - pointerY.current) * 0.006;
    targetRotationX.current = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, targetRotationX.current));
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
      className="w-full h-full relative select-none cursor-grab active:cursor-grabbing bg-transparent"
    >
      <Canvas
        camera={{ position: [0, 0, 3.9], fov: 48 }}
        className="w-full h-full pointer-events-none !bg-transparent"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.55} color={T.ambient} />
        <pointLight position={[-5, 4, -3]} intensity={2.2} color={theme.neon.purple} />
        <pointLight position={[5, -3, 4]} intensity={2.2} color={theme.neon.cyan} />
        <pointLight position={[0, 5, 2]} intensity={1.4} color={theme.neon.pink} />

        <CameraRig />
        <AnimatedGlobe
          onHoverSkill={onHoverSkill}
          targetRotationX={targetRotationX}
          targetRotationY={targetRotationY}
          currentRotationX={currentRotationX}
          currentRotationY={currentRotationY}
          isDragging={isDragging}
        />
      </Canvas>

      <div className="absolute bottom-2 left-2 font-mono text-[8px] text-cyan-500/40 pointer-events-none leading-relaxed">
        <div>DRAG TO ROTATE · HOVER NODES</div>
      </div>
    </div>
  );
};

export default TechGlobe3D;
