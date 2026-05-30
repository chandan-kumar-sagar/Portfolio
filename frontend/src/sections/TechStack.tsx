import React, { useState } from 'react';
import { Database, Layout, Wrench, Shield, Server, Terminal } from 'lucide-react';

export const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'backend' | 'frontend' | 'database' | 'tools' | 'auth'>('all');

  const categories = [
    { id: 'all', name: 'ALL MODULES', icon: Terminal },
    { id: 'backend', name: 'BACKEND', icon: Server },
    { id: 'frontend', name: 'FRONTEND', icon: Layout },
    { id: 'database', name: 'DATABASES', icon: Database },
    { id: 'tools', name: 'SYSTEM TOOLS', icon: Wrench },
    { id: 'auth', name: 'SECURITY & AUTH', icon: Shield }
  ];

  const skills = [
    // Backend
    { name: 'Node.js', category: 'backend', level: 90, icon: '🟢' },
    { name: 'Express.js', category: 'backend', level: 92, icon: '⚡' },
    { name: 'TypeScript', category: 'backend', level: 85, icon: '🔷' },
    { name: 'RESTful APIs', category: 'backend', level: 95, icon: '🔗' },
    
    // Frontend
    { name: 'React.js', category: 'frontend', level: 82, icon: '⚛️' },
    { name: 'JavaScript', category: 'frontend', level: 88, icon: '💛' },
    { name: 'HTML5 & CSS3', category: 'frontend', level: 90, icon: '🎨' },
    { name: 'Tailwind CSS', category: 'frontend', level: 80, icon: '💨' },
    
    // Databases
    { name: 'MySQL', category: 'database', level: 88, icon: '🐬' },
    { name: 'MongoDB', category: 'database', level: 84, icon: '🍃' },
    { name: 'SQL Query Optimization', category: 'database', level: 90, icon: '🏎️' },
    { name: 'Database Schemas', category: 'database', level: 92, icon: '📂' },
    
    // Tools
    { name: 'Git & GitHub', category: 'tools', level: 85, icon: '🐙' },
    { name: 'Postman', category: 'tools', level: 90, icon: '🚀' },
    { name: 'VS Code', category: 'tools', level: 92, icon: '💻' },
    { name: 'Nodemon & ts-node', category: 'tools', level: 90, icon: '⚙️' },
    
    // Auth & Security
    { name: 'JSON Web Tokens (JWT)', category: 'auth', level: 92, icon: '🔑' },
    { name: 'OAuth 2.0 Integration', category: 'auth', level: 80, icon: '🔐' },
    { name: 'RBAC (Role Based Access)', category: 'auth', level: 88, icon: '🛡️' },
    { name: 'Rate Limiting Shields', category: 'auth', level: 85, icon: '🧱' }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="techstack" className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full select-none">
      
      {/* Section Header */}
      <div className="mb-16 text-center">
        <span className="font-mono text-xs text-purple-400 tracking-widest uppercase block mb-2">// CAPABILITIES INDEX</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-wider">
          TELESCOPIC TECH MATRIX
        </h2>
        <div className="w-24 h-[2px] bg-gradient-to-r from-purple-400 to-transparent mt-3 mx-auto"></div>
      </div>

      {/* Futuristic Telemetry Navigation Hub */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {categories.map((cat) => {
          const IconComp = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2.5 rounded font-orbitron font-semibold text-[10px] tracking-wider flex items-center gap-2 border transition-all duration-300 cursor-pointer clickable
                ${isActive 
                  ? 'bg-purple-600 border-purple-400 text-slate-100 shadow-purple-glow' 
                  : 'bg-cyber-card border-cyan-500/10 text-slate-400 hover:border-cyan-500/30 hover:text-cyan-400'
                }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Skills Matrix Charge Indicator bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, idx) => (
          <div 
            key={idx} 
            className="p-5 border border-cyan-500/5 glass-panel rounded-lg hover:border-cyan-500/20 hover:shadow-hud-glow transition-all duration-300 relative group overflow-hidden"
          >
            
            {/* Ambient progress glow behind card */}
            <div 
              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-500 shadow-cyan-glow"
              style={{ width: `${skill.level}%` }}
            ></div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 select-text">
                <span className="text-lg">{skill.icon}</span>
                <span className="font-orbitron font-bold text-sm tracking-wide text-slate-200 group-hover:text-cyan-400 transition-colors">
                  {skill.name}
                </span>
              </div>
              <span className="font-mono text-xs text-cyan-400/90 font-bold bg-[#040612] px-2 py-0.5 rounded border border-cyan-950/40 shadow-inner">
                {skill.level}%
              </span>
            </div>

            {/* Subgrid Charging visual */}
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
            
            {/* Tech Module details */}
            <div className="mt-3 flex items-center justify-between font-mono text-[9px] text-slate-500 select-none">
              <span>MODULE ID: {skill.category.toUpperCase()}_{idx}</span>
              <span className="text-purple-400/80">OPERATIONAL</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
export default TechStack;
