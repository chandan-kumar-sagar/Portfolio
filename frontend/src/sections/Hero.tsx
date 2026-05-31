import React, { useState, useEffect } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { config } from '../config/env';

const ROLES = [
  'Backend Developer',
  'MERN Stack Developer',
  'Node.js Engineer',
  'API Architect',
];

interface HeroProps {
  onNavClick: (sectionId: string) => void;
  pageViews: number;
  activeSection: string;
}

export const Hero: React.FC<HeroProps> = ({ onNavClick, pageViews: _pageViews, activeSection: _activeSection }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const current = ROLES[roleIndex];

    if (!isDeleting && displayText.length < current.length) {
      timer = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 75);
    } else if (!isDeleting && displayText.length === current.length) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText.length > 0) {
      timer = setTimeout(() => setDisplayText(current.slice(0, displayText.length - 1)), 40);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left select-text w-full">

      <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold font-orbitron tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 min-h-[36px] sm:min-h-[40px] mb-4 sm:mb-5">
        {displayText}
        <span className="border-r-2 border-cyan-400 animate-typing-blink ml-1" aria-hidden />
      </h2>

      <p className="text-sm sm:text-base text-slate-400 font-inter leading-relaxed max-w-[95%] sm:max-w-2xl mb-6 sm:mb-8">
        Leveraging <span className="text-cyan-400 font-bold">1.7+ years</span> of core backend systems experience.
        Specializing in high-performance <span className="text-purple-400 font-semibold">Node.js/Express.js</span> REST APIs,
        robust database query optimizations achieving <span className="text-cyan-400 font-semibold">25–30% faster latency</span>,
        secure JWT authentication layers, and production-level system deployments.
      </p>

      <div className="flex flex-col xs:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10 w-full">
        <button
          type="button"
          onClick={() => onNavClick('projects')}
          className="btn-primary flex items-center gap-2 cursor-pointer clickable w-full xs:w-auto"
        >
          EXPLORE PROJECTS <ArrowRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onNavClick('contact')}
          className="btn-secondary flex items-center gap-2 cursor-pointer clickable w-full xs:w-auto"
        >
          CONTACT TERMINAL
        </button>
        <a
          href={config.resumeUrl}
          onClick={(e) => { if (config.resumeUrl === '#') { e.preventDefault(); onNavClick('contact'); } }}
          className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 font-mono text-[10px] tracking-widest transition-colors duration-200 underline decoration-cyan-500/20 underline-offset-4 cursor-pointer clickable"
        >
          <Download className="w-3.5 h-3.5" />[ GET RESUME.PDF ]
        </a>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-6 sm:pt-8 w-full max-w-2xl select-none lg:mx-0">
        <div className="pro-stat text-center lg:text-left">
          <span className="pro-stat-label">DB Optimization</span>
          <span className="pro-stat-value block mt-1 text-xs sm:text-sm">25–30% Faster</span>
        </div>
        <div className="pro-stat text-center lg:text-left">
          <span className="pro-stat-label">Security</span>
          <span className="pro-stat-value block mt-1 text-purple-300 text-xs sm:text-sm">JWT / RBAC</span>
        </div>
        <div className="pro-stat text-center lg:text-left">
          <span className="pro-stat-label">Experience</span>
          <span className="pro-stat-value block mt-1 text-pink-300 text-xs sm:text-sm">1.7+ Years</span>
        </div>
      </div>
    </div>
  );
};
export default Hero;
