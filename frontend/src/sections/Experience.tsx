import React from 'react';
import { Calendar, Building2, CheckCircle, Database } from 'lucide-react';

export const Experience: React.FC = () => {
  const experiences = [
    {
      role: "Backend Developer",
      company: "Flutterflirt",
      duration: "Jan 2025 - Present",
      location: "Bengaluru, India (Remote/Hybrid)",
      icon: CheckCircle,
      tasks: [
        "Built and maintained highly scalable backend services using Node.js, Express.js, MySQL, PostgreSQL, and MongoDB, handling heavy API traffic.",
        "Designed and implemented production-ready RESTful APIs with secure JWT authentication and strict Role-Based Access Control (RBAC) schemas.",
        "Optimized complex MySQL queries and index pipelines, reducing core API response latency by 25-30%.",
        "Collaborated seamlessly with frontend engineers and product stakeholders to deliver high-performance features in agile environments."
      ],
      tags: ["Node.js", "Express.js", "MySQL", "PostgreSQL", "MongoDB", "JWT", "RBAC"],
      color: "border-cyan-500/25 shadow-cyan-glow"
    },
    {
      role: "Core Database & API Systems Engineer",
      company: "Apex Technical & AMC Projects",
      duration: "Oct 2023 - Dec 2024",
      location: "Bangalore, India",
      icon: Database,
      tasks: [
        "Architected robust, modular relational database schemas and indexed search pipelines using SQL and MongoDB structures.",
        "Designed and validated API routers using Postman, establishing clean request sanitization, routing, and error isolation controls.",
        "Engineered secure backends for structural tracking projects, incorporating transaction checks and user verification fields.",
        "Developed full-stack Chrome job extensions integrated with Gemini APIs to perform intelligent, multi-step browser automations."
      ],
      tags: ["JavaScript", "C++", "SQL", "Git & GitHub", "Postman", "Gemini API"],
      color: "border-purple-500/25 shadow-purple-glow"
    }
  ];

  return (
    <section id="experience" className="py-24 px-4 md:px-8 max-w-5xl mx-auto w-full select-none">
      
      {/* Section Title */}
      <div className="mb-16 text-center">
        <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase block mb-2">// DIRECTIVE: CHRONOLOGICAL_MATRIX</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-wider">
          PROFESSIONAL JOURNEY
        </h2>
        <div className="w-24 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent mt-3 mx-auto"></div>
      </div>

      {/* Timeline core data track */}
      <div className="relative border-l border-cyan-500/10 pl-6 md:pl-10 space-y-12 ml-4">
        
        {/* Optical glowing timeline path */}
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent shadow-cyan-glow"></div>

        {experiences.map((exp, idx) => {
          return (
            <div key={idx} className="relative group select-text">
              
              {/* Pulsing circular neon node */}
              <span className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full border border-slate-900 bg-cyber-bg flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-125
                ${idx === 0 ? 'text-cyan-400 border-cyan-400 shadow-cyan-glow' : 'text-purple-400 border-purple-400 shadow-purple-glow'}`}
              >
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${idx === 0 ? 'bg-cyan-400' : 'bg-purple-400'}`}></div>
              </span>

              {/* Glass timeline card */}
              <div className={`p-6 md:p-8 border rounded-lg bg-cyber-card backdrop-blur-md transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4 group-hover:border-cyan-400/30 ${exp.color}`}>
                
                {/* Scanline overlay */}
                <div className="absolute inset-0 pointer-events-none rounded-lg bg-gradient-to-b from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 laser-scan"></div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-cyan-500/15 pb-4">
                  <div>
                    <h3 className="font-orbitron font-extrabold text-base md:text-lg text-slate-100 group-hover:text-cyan-400 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 font-mono">
                      <Building2 className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                      <span>{exp.company.toUpperCase()}</span>
                      <span className="text-slate-600">•</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-cyan-400/90 bg-[#040612] px-3 py-1 rounded border border-cyan-950/80 w-max shadow-inner">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    <span>{exp.duration.toUpperCase()}</span>
                  </div>
                </div>

                {/* Subtask bullet points */}
                <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed font-inter pl-2">
                  {exp.tasks.map((task, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono mt-0.5 select-none">&gt;_</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tag buttons */}
                <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-cyan-500/15">
                  {exp.tags.map((tag, tagIdx) => (
                    <span 
                      key={tagIdx}
                      className="font-mono text-[9px] tracking-wider text-purple-300 bg-purple-950/15 border border-purple-500/10 px-2 py-1 rounded shadow-sm hover:border-purple-400/40 transition-colors cursor-default"
                    >
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Experience;
