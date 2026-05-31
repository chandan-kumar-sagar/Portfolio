import React from 'react';
import { Compass, Info, Award } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { SectionReveal } from '../components/SectionReveal';

export const About: React.FC = () => {
  return (
    <SectionReveal>
      <section id="about" className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full select-none">
        <SectionHeader tag="About" title="PROFESSIONAL STORY LOG" accent="cyan" align="left" subtitle="Backend engineer focused on scalable APIs, database performance, and secure system design." />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch select-text">
        
        {/* Left Grid: Detailed Chronological Biography story */}
        <div className="lg:col-span-8 flex h-full">
          <div className="p-8 border border-cyan-500/10 glass-panel hud-panel rounded-lg shadow-hud-glow flex flex-col justify-between relative group card-lift w-full h-full">
            {/* Holographic scanner effect */}
            <div className="absolute inset-0 pointer-events-none rounded-lg bg-gradient-to-b from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 laser-scan"></div>
            
            <div className="space-y-6 text-slate-300 text-sm md:text-base leading-relaxed">
              <div className="flex items-center gap-2 border-b border-cyan-500/15 pb-3">
                <Compass className="w-5 h-5 text-cyan-400 animate-pulse" />
                <h3 className="font-orbitron font-extrabold text-slate-100 tracking-wider uppercase text-sm md:text-base">
                  BIOGRAPHICAL TELEMETRY INITIALIZED
                </h3>
              </div>

              <p>
                My name is <strong className="text-cyan-300 font-bold font-orbitron">Chandan Kumar</strong>. I am a Backend Developer with over <span className="text-cyan-400 font-bold">1.7+ years</span> of core professional experience specializing in architecting bulletproof backend systems. My journey into programming was driven by a deep fascination with how complex data structures align in the background to serve millions of global requests instantly.
              </p>

              <p>
                Throughout my professional journey, I have honed my skill set in a specialized, production-ready stack comprising <strong className="text-cyan-300">Node.js, Express.js, TypeScript, MySQL, and MongoDB</strong>. Rather than just writing simple lines of code, I focus heavily on the complete database schema design, system architecture planning, security shielding, and cloud deployment pipelines.
              </p>

              <p>
                One of my proudest achievements was resolving a core bottleneck at **Flutterflirt**, where I rebuilt slow queries and applied precise schema indexing strategies. This database optimization **improved API response time by 25–30%**, significantly optimizing server utilization and enhancing user retention.
              </p>

              <p>
                To safeguard client records, I implement military-grade backend defenses, utilizing strict **JSON Web Tokens (JWT) authentication** and **Role-Based Access Control (RBAC)** matrices. I believe that a developer's quality is demonstrated by the security, resilience, and speed of their APIs under massive concurrency.
              </p>

              <p>
                Having graduated with a **Bachelor of Engineering in Information Science and Engineering** from **AMC Engineering College, Bangalore (Class of 2024)**, I approach system challenges with robust algorithmic logic. My ultimate engineering goal is to evolve into a world-class Software Engineer and System Architect, designing core global digital infrastructures that shape the future.
              </p>
            </div>

            {/* Micro terminal coordinate footer */}
            <div className="mt-8 pt-4 border-t border-cyan-950/40 flex flex-wrap items-center justify-between font-mono text-[9px] text-slate-500 select-none">
              <span>VISITORLINK: ESTABLISHED</span>
              <span>GEOLOCATION: AMC_COLLEGE_BLR</span>
            </div>
          </div>
        </div>

        {/* Right Grid: Career Stats and Qualifications summary */}
        <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8 h-full">
          
          {/* Quick Metrics Widget */}
          <div className="p-6 border border-purple-500/10 glass-panel rounded-lg flex flex-col justify-between flex-grow relative group">
            <h3 className="font-orbitron font-extrabold text-xs text-purple-400 tracking-widest uppercase mb-4 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-400" /> SYSTEM CAPABILITIES
            </h3>
            
            <div className="space-y-4">
              <div>
                <span className="font-mono text-[9px] text-slate-500 block">OPTIMIZATION INTEGRITY</span>
                <span className="font-orbitron font-black text-2xl text-cyan-400 text-glow-cyan">25-30% FAST</span>
                <span className="font-inter text-[10px] text-slate-400 block mt-0.5">Applied to relational MySQL index trees.</span>
              </div>
              
              <div>
                <span className="font-mono text-[9px] text-slate-500 block">SECURITY PROTOCOL</span>
                <span className="font-orbitron font-black text-2xl text-purple-400 text-glow-purple">JWT / RBAC</span>
                <span className="font-inter text-[10px] text-slate-400 block mt-0.5">Automated token cycles and permission shields.</span>
              </div>

              <div>
                <span className="font-mono text-[9px] text-slate-500 block">API COMPILING SPEED</span>
                <span className="font-orbitron font-black text-2xl text-pink-400 text-glow-purple">&lt; 15ms</span>
                <span className="font-inter text-[10px] text-slate-400 block mt-0.5">Optimized routing structures.</span>
              </div>
            </div>
          </div>

          {/* Education Widget card */}
          <div className="p-6 border border-cyan-500/10 glass-panel rounded-lg flex flex-col justify-between relative group">
            <h3 className="font-orbitron font-extrabold text-xs text-cyan-400 tracking-widest uppercase mb-4 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-cyan-400" /> ACADEMIC DIRECTORY
            </h3>
            <div className="font-mono text-[10px] space-y-3">
              <div>
                <span className="text-cyan-400"># AMC ENGINEERING COLLEGE</span>
                <span className="text-slate-300 block font-sans text-xs mt-0.5">B.E. Information Science (BLR)</span>
                <span className="text-slate-500 block text-[9px] mt-0.5">GRADUATED: 2024</span>
              </div>
              <div className="border-t border-cyan-950/30 pt-2.5">
                <span className="text-purple-400"># LND COLLEGE, MOTIHARI</span>
                <span className="text-slate-300 block font-sans text-xs mt-0.5">Indian School Certificate (12th)</span>
                <span className="text-slate-500 block text-[9px] mt-0.5">COMPLETED: 2019</span>
              </div>
            </div>
          </div>

        </div>

      </div>
      </section>
    </SectionReveal>
  );
};
export default About;
