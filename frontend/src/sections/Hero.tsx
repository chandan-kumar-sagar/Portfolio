import React, { useState, useEffect } from 'react';
import { ArrowRight, Download } from 'lucide-react';

interface HeroProps {
  onNavClick: (sectionId: string) => void;
  pageViews: number;
  activeSection: string;
}

export const Hero: React.FC<HeroProps> = ({ onNavClick, pageViews: _pageViews, activeSection: _activeSection }) => {
  const roles = ['Backend Developer', 'MERN Stack Developer', 'Node.js Engineer', 'API Architect'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: number;
    const currentFullText = roles[roleIndex];

    const handleType = () => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText === currentFullText) {
          timer = setTimeout(() => setIsDeleting(true), 2200);
          return;
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
      setTypingSpeed(isDeleting ? 40 : 100);
      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, typingSpeed]);

  return (
    <div className="flex flex-col items-center text-center select-text w-full">

      {/* Animated Role Typewriter */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-orbitron tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 min-h-[40px] mb-5">
        {displayText}
        <span className="border-r-2 border-cyan-400 animate-typing-blink ml-1"></span>
      </h2>

      {/* Description */}
      <p className="text-sm sm:text-base text-slate-400 font-inter leading-relaxed max-w-2xl mb-8">
        Leveraging <span className="text-cyan-400 font-bold">1.7+ years</span> of core backend systems experience.
        Specializing in high-performance <span className="text-purple-400 font-semibold">Node.js/Express.js</span> REST APIs,
        robust database query optimizations achieving <span className="text-cyan-400 font-semibold">25–30% faster latency</span>,
        secure JWT authentication layers, and production-level system deployments.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
        <button
          onClick={() => onNavClick('projects')}
          className="px-8 py-3.5 rounded font-orbitron font-semibold text-xs tracking-widest text-[#03030c] bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-cyan-glow hover:shadow-cyan-glow-heavy flex items-center gap-2 cursor-pointer clickable"
        >
          EXPLORE PROJECTS <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => onNavClick('contact')}
          className="px-8 py-3.5 rounded font-orbitron font-semibold text-xs tracking-widest text-purple-300 border border-purple-500/40 bg-purple-950/15 hover:border-purple-400 hover:bg-purple-950/30 transition-all duration-300 hover:shadow-purple-glow flex items-center gap-2 cursor-pointer clickable"
        >
          CONTACT TERMINAL
        </button>
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); onNavClick('contact'); }}
          className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 font-mono text-[10px] tracking-widest transition-colors duration-200 underline decoration-cyan-500/20 underline-offset-4 cursor-pointer clickable"
        >
          <Download className="w-3.5 h-3.5" />[ GET RESUME.PDF ]
        </a>
      </div>

      {/* Quick HUD Metrics Row */}
      <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-cyan-950/40 w-full max-w-lg select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          <div className="font-mono text-[9px] text-left">
            <span className="text-slate-500 block uppercase">DB OPTIMIZATION</span>
            <span className="text-cyan-300 font-bold">25-30% FAST RESPONSE</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping"></span>
          <div className="font-mono text-[9px] text-left">
            <span className="text-slate-500 block uppercase">SECURITY GATEWAY</span>
            <span className="text-purple-300 font-bold">JWT / RBAC ACCESS</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping"></span>
          <div className="font-mono text-[9px] text-left">
            <span className="text-slate-500 block uppercase">EXPERIENCE</span>
            <span className="text-pink-300 font-bold">1.7+ YEARS BACKEND</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
