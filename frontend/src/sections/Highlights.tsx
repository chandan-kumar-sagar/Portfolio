import React from 'react';
import { Database, ShieldCheck, Zap } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { SectionReveal } from '../components/SectionReveal';

export const Highlights: React.FC = () => {
  const highlightCards = [
    {
      title: "Relational Query Indexing",
      metric: "25% - 30%",
      metricLabel: "LATENCY REDUCTION",
      desc: "Accelerated database retrieval latency by creating composite indexes, streamlining slow sub-queries, and optimizing joins on MySQL and PostgreSQL schemas.",
      icon: Database,
      tag: "PERFORMANCE"
    },
    {
      title: "Access Shielding Integrity",
      metric: "JWT / RBAC",
      metricLabel: "SECURITY MATRIX",
      desc: "Protected system API endpoints with secure token exchanges, httpOnly cookie paths, and granular Role-Based Access Control policies.",
      icon: ShieldCheck,
      tag: "SECURITY"
    },
    {
      title: "Intelligent Chrome Extensions",
      metric: "Gemini API",
      metricLabel: "AI AUTOMATOR CORE",
      desc: "Developed job app auto-fill pipelines using browser automations and intelligent LLM-based resume parsing algorithms.",
      icon: Zap,
      tag: "INNOVATION"
    }
  ];

  return (
    <SectionReveal>
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full select-none">
        <SectionHeader tag="Benchmarks" title="TECHNICAL BENCHMARKS" accent="pink" subtitle="Measurable outcomes from production engineering work." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {highlightCards.map((card, idx) => {
          const IconComp = card.icon;
          return (
            <div 
              key={idx}
              className="p-8 border border-cyan-500/10 glass-panel rounded-lg hover:border-cyan-500/35 hover:shadow-cyan-glow transition-all duration-300 flex flex-col justify-between h-[360px] relative group overflow-hidden"
            >
              
              {/* Scanline hover effect */}
              <div className="absolute inset-0 pointer-events-none rounded-lg bg-gradient-to-b from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 laser-scan"></div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[9px] text-pink-400 font-bold border border-pink-500/20 px-2 py-0.5 rounded uppercase bg-pink-950/10 select-text">
                    {card.tag}
                  </span>
                  <div className="w-10 h-10 border border-slate-700/50 rounded flex items-center justify-center bg-cyber-dark group-hover:border-cyan-500/35 transition-colors">
                    <IconComp className="w-5 h-5 text-cyan-400 animate-pulse" />
                  </div>
                </div>

                <h3 className="font-orbitron font-extrabold text-lg text-slate-200 mb-3 select-text">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-inter select-text">
                  {card.desc}
                </p>
              </div>

              {/* Metric data footer */}
              <div className="mt-8 border-t border-cyan-950/40 pt-4 select-text">
                <span className="text-3xl font-black font-orbitron tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  {card.metric}
                </span>
                <span className="font-mono text-[9px] text-slate-500 block uppercase mt-0.5 tracking-wider">
                  {card.metricLabel}
                </span>
              </div>

            </div>
          );
        })}
      </div>

      </section>
    </SectionReveal>
  );
};
export default Highlights;
