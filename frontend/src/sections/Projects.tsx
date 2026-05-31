import React from 'react';
import { ExternalLink, Database, Zap, Cpu, Server } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { SectionReveal } from '../components/SectionReveal';
import { TechIcon } from '../components/TechIcon';
import { getTechByName } from '../data/techStack';

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Projects: React.FC = () => {
  const projectList = [
    {
      title: "TicketHub Booking Platform",
      desc: "A high-performance ticket and movie reservation ecosystem featuring concurrent seat booking transactions, secure JWT user accounts, and strict RBAC profiles.",
      tech: ["Node.js", "Express.js", "MySQL", "JWT", "RBAC"],
      github: "https://github.com/chandan99file/TicketHub",
      demo: "#",
      icon: Cpu,
      color: "border-cyan-500/20 shadow-cyan-glow",
      // Custom procedural HTML Architecture Diagram representing the system flow!
      architecture: (
        <div className="w-full h-28 sm:h-36 bg-[#040612] rounded border border-cyan-950/70 p-2.5 font-mono text-[8px] text-cyan-400 flex flex-col gap-1 overflow-hidden shadow-inner select-none">
          <div className="text-slate-500 uppercase">// ARCHITECTURE: SECURE_RESERVATION_FLOW</div>
          <div className="flex items-center justify-between border-b border-cyan-950 pb-1 mb-1">
            <span>[CLIENT]</span>
            <span className="text-slate-500">HTTP POST</span>
            <span>[API GATEWAY]</span>
          </div>
          <div className="flex flex-col gap-1 text-[7.5px] items-center text-center">
            <div className="px-2 py-0.5 border border-cyan-500/30 rounded bg-cyan-950/20 text-cyan-300 w-full truncate">
              User -&gt; JWT auth verification -&gt; PASS
            </div>
            <div className="w-[1px] h-2 bg-cyan-500/30"></div>
            <div className="px-2 py-0.5 border border-purple-500/30 rounded bg-purple-950/20 text-purple-300 w-full truncate">
              Express router controller -&gt; check seat availability
            </div>
            <div className="w-[1px] h-2 bg-cyan-500/30"></div>
            <div className="px-2 py-0.5 border border-pink-500/30 rounded bg-pink-950/20 text-pink-300 w-full truncate">
              SQL Transaction: RESERVE SEAT (Auto-Rollback on clash)
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Kaveri Engineering Systems",
      desc: "Employee workspace backend driving centralized workforce records, attendance logging schemas (punch-in/out APIs), and custom secure token authentications.",
      tech: ["Node.js", "Express.js", "MySQL", "JWT", "REST APIs"],
      github: "https://github.com/chandan99file/Kaveri-Engineering",
      demo: "#",
      icon: Database,
      color: "border-purple-500/20 shadow-purple-glow",
      architecture: (
        <div className="w-full h-28 sm:h-36 bg-[#040612] rounded border border-purple-950/70 p-2.5 font-mono text-[8px] text-purple-400 flex flex-col gap-1 overflow-hidden shadow-inner select-none">
          <div className="text-slate-500 uppercase">// ARCHITECTURE: ATTENDANCE_PUNCH_SYSTEM</div>
          <div className="flex items-center justify-between border-b border-purple-950 pb-1 mb-1">
            <span>[CLI ENGINE]</span>
            <span className="text-slate-500">MUTATE DATA</span>
            <span>[DATABASE CORE]</span>
          </div>
          <div className="flex flex-col gap-1 text-[7.5px] items-center text-center">
            <div className="px-2 py-0.5 border border-purple-500/30 rounded bg-purple-950/20 text-purple-300 w-full truncate">
              Log Punch-in (capture Timestamp + Location)
            </div>
            <div className="w-[1px] h-2 bg-purple-500/30"></div>
            <div className="px-2 py-0.5 border border-pink-500/30 rounded bg-pink-950/20 text-pink-300 w-full truncate">
              Verify JWT Token auth credentials
            </div>
            <div className="w-[1px] h-2 bg-purple-500/30"></div>
            <div className="px-2 py-0.5 border border-cyan-500/30 rounded bg-cyan-950/20 text-cyan-300 w-full truncate">
              MySQL query update: increment hours & resolve logs
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Workday AI Auto-Applier",
      desc: "An advanced Chrome extension leveraging the Gemini API to parse resume parameters dynamically, execute mapping arrays, and automate multi-step job page forms.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Gemini API"],
      github: "https://github.com/chandan99file/Workday-AI-Auto-apply",
      demo: "#",
      icon: Zap,
      color: "border-pink-500/20 shadow-purple-glow",
      architecture: (
        <div className="w-full h-28 sm:h-36 bg-[#040612] rounded border border-pink-950/70 p-2.5 font-mono text-[8px] text-pink-400 flex flex-col gap-1 overflow-hidden shadow-inner select-none">
          <div className="text-slate-500 uppercase">// ARCHITECTURE: GEMINI_RESUME_PARSER</div>
          <div className="flex items-center justify-between border-b border-pink-950 pb-1 mb-1">
            <span>[EXTENSION]</span>
            <span className="text-slate-500">API ROUTING</span>
            <span>[GEMINI AI]</span>
          </div>
          <div className="flex flex-col gap-1 text-[7.5px] items-center text-center">
            <div className="px-2 py-0.5 border border-pink-500/30 rounded bg-pink-950/20 text-pink-300 w-full truncate">
              Read PDF uploads -&gt; extract text telemetry
            </div>
            <div className="w-[1px] h-2 bg-pink-500/30"></div>
            <div className="px-2 py-0.5 border border-cyan-500/30 rounded bg-cyan-950/20 text-cyan-300 w-full truncate">
              Gemini model parsing -&gt; map text parameters to json
            </div>
            <div className="w-[1px] h-2 bg-pink-500/30"></div>
            <div className="px-2 py-0.5 border border-purple-500/30 rounded bg-purple-950/20 text-purple-300 w-full truncate">
              React form filler -&gt; complete Workday browser inputs
            </div>
          </div>
        </div>
      )
    },
    {
      title: "REST API Platform Gateway",
      desc: "A production-grade backend gateway containing rate limit firewalls, standard CORS checks, optimized SQL database indexes, and response diagnostics.",
      tech: ["TypeScript", "Node.js", "Express.js", "MySQL", "CORS"],
      github: "https://github.com/chandan99file/api-ecosystem",
      demo: "#",
      icon: Server,
      color: "border-cyan-500/20 shadow-cyan-glow",
      architecture: (
        <div className="w-full h-28 sm:h-36 bg-[#040612] rounded border border-cyan-950/70 p-2.5 font-mono text-[8px] text-cyan-400 flex flex-col gap-1 overflow-hidden shadow-inner select-none">
          <div className="text-slate-500 uppercase">// ARCHITECTURE: ENDPOINT_FIREWALL_SHIELD</div>
          <div className="flex items-center justify-between border-b border-cyan-950 pb-1 mb-1">
            <span>[REQUEST]</span>
            <span className="text-slate-500">API SHIELD</span>
            <span>[MAINFRAME]</span>
          </div>
          <div className="flex flex-col gap-1 text-[7.5px] items-center text-center">
            <div className="px-2 py-0.5 border border-cyan-500/30 rounded bg-cyan-950/20 text-cyan-300 w-full truncate">
              Request limit check: 100 hits / 15 mins (express-rate-limit)
            </div>
            <div className="w-[1px] h-2 bg-cyan-500/30"></div>
            <div className="px-2 py-0.5 border border-purple-500/30 rounded bg-purple-950/20 text-purple-300 w-full truncate">
              CORS shield review -&gt; parse query parameters
            </div>
            <div className="w-[1px] h-2 bg-cyan-500/30"></div>
            <div className="px-2 py-0.5 border border-pink-500/30 rounded bg-pink-950/20 text-pink-300 w-full truncate">
              Execute optimized SQL lookup (Index trees) [Latency: 12ms]
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <SectionReveal delay={0.05}>
      <section id="projects" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full select-none">
        <SectionHeader tag="Projects" title="PROJECT ARCHITECTURES" accent="purple" subtitle="Real-world systems with secure auth, optimized queries, and clean API design." />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
        {projectList.map((project, idx) => {
          const IconComp = project.icon;
          return (
            <div 
              key={idx}
              className={`p-5 sm:p-6 border rounded-lg bg-cyber-card backdrop-blur-md transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between relative group hover:border-cyan-400/30 ${project.color}`}
            >
              
              {/* Scanline hover overlay */}
              <div className="absolute inset-0 pointer-events-none rounded-lg bg-gradient-to-b from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 laser-scan"></div>
              
              <div>
                {/* Visual Architecture block Diagram */}
                <div className="mb-4">
                  {project.architecture}
                </div>

                {/* Title */}
                <div className="flex items-center gap-3 mb-3 select-text">
                  <div className="w-8 h-8 rounded border border-slate-700/50 flex items-center justify-center bg-cyber-dark group-hover:border-cyan-400/30 transition-colors">
                    <IconComp className="w-4.5 h-4.5 text-cyan-400" />
                  </div>
                  <h3 className="font-orbitron font-extrabold text-base text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 font-inter leading-relaxed select-text">
                  {project.desc}
                </p>
              </div>

              <div>
                {/* Tech module badges */}
                <div className="flex flex-wrap items-center gap-1.5 mb-5">
                  {project.tech.map((t, tIdx) => {
                    const tech = getTechByName(t);
                    return (
                      <span
                        key={tIdx}
                        className="font-mono text-[9px] tracking-wider text-cyan-300 bg-cyan-950/15 border border-cyan-500/10 px-2 py-0.5 rounded cursor-default flex items-center gap-1.5"
                      >
                        {tech && (
                          <TechIcon slug={tech.slug} color={tech.color} name={tech.name} size="sm" />
                        )}
                        {t.toUpperCase()}
                      </span>
                    );
                  })}
                </div>

                {/* Secure links */}
                <div className="flex items-center justify-between border-t border-cyan-950/50 pt-4 font-mono text-[10px]">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors clickable cursor-pointer"
                  >
                    <GithubIcon className="w-3.5 h-3.5" /> SOURCE_CODE
                  </a>
                  
                  <a 
                    href={project.demo}
                    className="flex items-center gap-1 text-purple-400 hover:text-purple-300 font-bold transition-colors clickable cursor-pointer"
                  >
                    LIVE_DEMO <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      </section>
    </SectionReveal>
  );
};
export default Projects;
