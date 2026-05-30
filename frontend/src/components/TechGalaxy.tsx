import React, { useState } from 'react';

interface SkillNode {
  name: string;
  percentage: number;
  color: string;
  shadow: string;
  icon: string;
  angleOffset: number; // For spacing along orbit
  radius: number;      // Inner or outer orbit
}

export const TechGalaxy: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);

  // High-fidelity orbiting nodes
  const skills: SkillNode[] = [
    // Inner Orbit (Radius: 130px)
    { name: "Node.js", percentage: 92, color: "border-green-500/40 text-green-400", shadow: "shadow-[0_0_15px_rgba(34,197,94,0.4)]", icon: "🟢", angleOffset: 0, radius: 130 },
    { name: "Express.js", percentage: 90, color: "border-cyan-500/40 text-cyan-400", shadow: "shadow-[0_0_15px_rgba(6,182,212,0.4)]", icon: "⚡", angleOffset: Math.PI * 0.5, radius: 130 },
    { name: "TypeScript", percentage: 88, color: "border-blue-500/40 text-blue-400", shadow: "shadow-[0_0_15px_rgba(59,130,246,0.4)]", icon: "🔷", angleOffset: Math.PI, radius: 130 },
    { name: "MySQL", percentage: 90, color: "border-purple-500/40 text-purple-400", shadow: "shadow-[0_0_15px_rgba(168,85,247,0.4)]", icon: "🐬", angleOffset: Math.PI * 1.5, radius: 130 },

    // Outer Orbit (Radius: 210px)
    { name: "MongoDB", percentage: 85, color: "border-emerald-500/40 text-emerald-400", shadow: "shadow-[0_0_15px_rgba(16,185,129,0.4)]", icon: "🍃", angleOffset: 0, radius: 210 },
    { name: "React.js", percentage: 82, color: "border-sky-500/40 text-sky-400", shadow: "shadow-[0_0_15px_rgba(14,165,233,0.4)]", icon: "⚛️", angleOffset: Math.PI * 0.33, radius: 210 },
    { name: "JWT", percentage: 92, color: "border-pink-500/40 text-pink-400", shadow: "shadow-[0_0_15px_rgba(236,72,153,0.4)]", icon: "🔑", angleOffset: Math.PI * 0.66, radius: 210 },
    { name: "Git", percentage: 88, color: "border-orange-500/40 text-orange-400", shadow: "shadow-[0_0_15px_rgba(249,115,22,0.4)]", icon: "🐙", angleOffset: Math.PI, radius: 210 },
    { name: "Postman", percentage: 90, color: "border-indigo-500/40 text-indigo-400", shadow: "shadow-[0_0_15px_rgba(99,102,241,0.4)]", icon: "🚀", angleOffset: Math.PI * 1.33, radius: 210 },
    { name: "JavaScript", percentage: 88, color: "border-yellow-500/40 text-yellow-400", shadow: "shadow-[0_0_15px_rgba(234,179,8,0.4)]", icon: "💛", angleOffset: Math.PI * 1.66, radius: 210 }
  ];

  return (
    <div className="relative w-full h-[520px] flex items-center justify-center select-none overflow-hidden">
      
      {/* 1. Orbit Paths (Concentric glowing loops) */}
      <div className="absolute w-[260px] h-[260px] rounded-full border border-cyan-500/10 pointer-events-none scale-100 animate-pulse"></div>
      <div className="absolute w-[420px] h-[420px] rounded-full border border-purple-500/5 pointer-events-none scale-100"></div>

      {/* 2. Interactive Outer Diagnostics HUD Radar */}
      {hoveredSkill && (
        <div className="absolute z-20 flex flex-col items-center justify-center p-4 border border-cyan-400/30 glass-panel rounded-full w-48 h-48 animate-pulse-glow shadow-cyan-glow">
          <div className="text-center select-text">
            <span className="text-xl block mb-1">{hoveredSkill.icon}</span>
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

      {/* 3. Orbiting Skill Nodes */}
      <div className="absolute inset-0 flex items-center justify-center">
        {skills.map((skill, idx) => {
          // Determine the orbit rotation speed
          const speed = skill.radius === 130 ? 'animate-[spin_24s_linear_infinite]' : 'animate-[spin_40s_linear_infinite_reverse]';
          
          return (
            <div 
              key={idx}
              className={`absolute flex items-center justify-center w-full h-full pointer-events-none ${hoveredSkill ? '[animation-play-state:paused]' : speed}`}
            >
              {/* Position along circular path */}
              <div 
                className="absolute pointer-events-auto cursor-pointer flex items-center justify-center"
                style={{
                  transform: `rotate(${skill.angleOffset}rad) translate(${skill.radius}px) rotate(-${skill.angleOffset}rad)`
                }}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Visual node capsule */}
                <div 
                  className={`w-10 h-10 border rounded-full bg-cyber-dark/95 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:border-cyan-400
                    ${skill.color} ${hoveredSkill?.name === skill.name ? skill.shadow : 'border-cyan-500/10'}`}
                >
                  <span className="text-sm select-none">{skill.icon}</span>
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
