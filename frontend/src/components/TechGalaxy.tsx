import React, { useState } from 'react';
import { GLOBE_SKILLS } from '../data/techStack';
import { TechIcon } from './TechIcon';

interface OrbitSkill {
  name: string;
  slug: string;
  color: string;
  percentage: number;
  borderColor: string;
  shadow: string;
  angleOffset: number;
  radius: number;
}

export const TechGalaxy: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<OrbitSkill | null>(null);

  const skills: OrbitSkill[] = GLOBE_SKILLS.map((s, i) => ({
    name: s.name,
    slug: s.slug,
    color: s.color,
    percentage: s.level,
    borderColor: s.borderColor,
    shadow: s.shadow,
    angleOffset: (i / GLOBE_SKILLS.length) * Math.PI * 2,
    radius: i % 2 === 0 ? 130 : 210,
  }));

  return (
    <div className="relative w-full h-[520px] flex items-center justify-center select-none overflow-hidden">
      <div className="absolute w-[260px] h-[260px] rounded-full border border-cyan-500/10 pointer-events-none animate-pulse" />
      <div className="absolute w-[420px] h-[420px] rounded-full border border-purple-500/5 pointer-events-none" />

      {hoveredSkill && (
        <div className="absolute z-20 flex flex-col items-center justify-center p-4 border border-cyan-400/30 glass-panel rounded-full w-48 h-48 animate-pulse-glow shadow-cyan-glow">
          <div className="text-center select-text">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center bg-[#040612]/80 border border-cyan-500/20">
              <TechIcon slug={hoveredSkill.slug} color={hoveredSkill.color} name={hoveredSkill.name} size="lg" />
            </div>
            <span className="font-orbitron font-extrabold text-sm text-cyan-400 block tracking-wider truncate">
              {hoveredSkill.name.toUpperCase()}
            </span>
            <span className="font-mono text-2xl font-black text-slate-100 block mt-1">
              {hoveredSkill.percentage}%
            </span>
            <span className="font-mono text-[8px] text-purple-400 uppercase tracking-widest block mt-1">
              // SYS_INTEGRITY
            </span>
          </div>
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        {skills.map((skill, idx) => {
          const speed = skill.radius === 130 ? 'animate-[spin_24s_linear_infinite]' : 'animate-[spin_40s_linear_infinite_reverse]';

          return (
            <div
              key={idx}
              className={`absolute flex items-center justify-center w-full h-full pointer-events-none ${hoveredSkill ? '[animation-play-state:paused]' : speed}`}
            >
              <div
                className="absolute pointer-events-auto cursor-pointer flex items-center justify-center"
                style={{
                  transform: `rotate(${skill.angleOffset}rad) translate(${skill.radius}px) rotate(-${skill.angleOffset}rad)`,
                }}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div
                  className={`w-11 h-11 border rounded-full bg-cyber-dark/95 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:border-cyan-400
                    ${skill.borderColor} ${hoveredSkill?.name === skill.name ? skill.shadow : 'border-cyan-500/10'}`}
                >
                  <TechIcon slug={skill.slug} color={skill.color} name={skill.name} size="md" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechGalaxy;
