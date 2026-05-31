import React, { useState } from 'react';
import { Database, Layout, Wrench, Shield, Server, Terminal } from 'lucide-react';
import { MATRIX_SKILLS } from '../data/techStack';
import { TechIcon } from '../components/TechIcon';
import { SectionHeader } from '../components/SectionHeader';
import { SectionReveal } from '../components/SectionReveal';

export const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'backend' | 'frontend' | 'database' | 'tools' | 'auth'>('all');

  const categories = [
    { id: 'all', name: 'ALL MODULES', icon: Terminal },
    { id: 'backend', name: 'BACKEND', icon: Server },
    { id: 'frontend', name: 'FRONTEND', icon: Layout },
    { id: 'database', name: 'DATABASES', icon: Database },
    { id: 'tools', name: 'SYSTEM TOOLS', icon: Wrench },
    { id: 'auth', name: 'SECURITY & AUTH', icon: Shield },
  ] as const;

  const filteredSkills = activeCategory === 'all'
    ? MATRIX_SKILLS
    : MATRIX_SKILLS.filter((skill) => skill.category === activeCategory);

  return (
    <SectionReveal>
      <section id="techstack" className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full select-none relative">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-purple-500/[0.02] via-transparent to-cyan-500/[0.02] rounded-3xl" />

        <SectionHeader tag="Capabilities" title="TELESCOPIC TECH MATRIX" accent="purple" subtitle="Production-ready backend, frontend, database, and security modules." />

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 max-w-4xl mx-auto">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded font-orbitron font-semibold text-[10px] tracking-wider flex items-center gap-2 border transition-all duration-300 cursor-pointer clickable
                  ${isActive
                    ? 'bg-purple-600/80 border-purple-400 text-slate-100 shadow-purple-glow scale-105'
                    : 'bg-cyber-card border-cyan-500/10 text-slate-400 hover:border-cyan-500/30 hover:text-cyan-400 hover:scale-102'
                  }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                {cat.name}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => (
            <div
              key={`${skill.name}-${idx}`}
              className="p-5 border border-cyan-500/5 glass-panel hud-panel rounded-lg card-lift hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all duration-300 relative group overflow-hidden"
            >
              <div
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-500 shadow-cyan-glow"
                style={{ width: `${skill.level}%` }}
              />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 select-text">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center bg-[#040612]/80 border ${skill.borderColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <TechIcon slug={skill.slug} color={skill.color} name={skill.name} size="md" />
                  </div>
                  <span className="font-orbitron font-bold text-sm tracking-wide text-slate-200 group-hover:text-cyan-400 transition-colors">
                    {skill.name}
                  </span>
                </div>
                <span className="font-mono text-xs text-cyan-400/90 font-bold bg-[#040612] px-2 py-0.5 rounded border border-cyan-950/40 shadow-inner">
                  {skill.level}%
                </span>
              </div>

              <div className="w-full h-3 bg-[#040612] border border-cyan-950/80 rounded p-[2px] flex gap-[2px]">
                {Array.from({ length: 10 }).map((_, segmentIdx) => {
                  const isActive = (segmentIdx + 1) * 10 <= skill.level;
                  return (
                    <div
                      key={segmentIdx}
                      className={`flex-grow h-full rounded-sm transition-all duration-500
                        ${isActive
                          ? 'bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-cyan-glow'
                          : 'bg-cyan-950/20'
                        }`}
                    />
                  );
                })}
              </div>

              <div className="mt-3 flex items-center justify-between font-mono text-[9px] text-slate-500 select-none">
                <span>MODULE ID: {skill.category?.toUpperCase()}_{idx}</span>
                <span className="text-purple-400/80">OPERATIONAL</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SectionReveal>
  );
};

export default TechStack;
