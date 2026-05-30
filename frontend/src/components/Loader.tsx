import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const logs = [
    "🤖 INITIALIZING JARVIS COGNITIVE MATRIX...",
    "📐 CO-CALIBRATING THREE.JS WebGL PROCEDURAL RENDERER...",
    "🔩 ASSEMBLING 3D HUMANOID ROBOT JOINTS & ACTUATORS...",
    "👁️ SYNCHRONIZING EMISSIVE CYBER BLINK SHIELDS...",
    "🧬 DESIGNING ORBITAL TECH GALAXY MAGNETIC TRAIL...",
    "📂 CONNECTING SECURE MONGO/MYSQL DATABASE UPLINKS...",
    "⚡ ALL SYSTEMS OPERATIONAL. WELCOME, CHANDAN KUMAR."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 600);
          }, 400);
          return 100;
        }
        const step = Math.floor(Math.random() * 10) + 6;
        return Math.min(prev + step, 100);
      });
    }, 70);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const stepLength = 100 / logs.length;
    const currentLog = Math.floor(progress / stepLength);
    if (currentLog < logs.length && currentLog !== logIndex) {
      setLogIndex(currentLog);
    }
  }, [progress, logIndex, logs.length]);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020208] transition-opacity duration-700 ${progress === 100 ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* HUD scan overlay */}
      <div className="absolute inset-0 pointer-events-none laser-scan bg-transparent opacity-10"></div>
      
      <div className="relative w-80 md:w-[480px] flex flex-col items-center p-6 border border-cyan-500/25 glass-panel rounded-lg shadow-cyan-glow">
        
        {/* Animated HUD spinner */}
        <div className="relative w-28 h-28 flex items-center justify-center mb-6">
          <div className="absolute inset-0 border border-dashed border-cyan-400/40 rounded-full animate-slow-spin"></div>
          <div className="absolute inset-2 border border-dotted border-purple-500/50 rounded-full animate-reverse-spin"></div>
          <div className="absolute inset-4 border border-cyan-400/20 rounded-full flex items-center justify-center bg-cyan-950/15">
            <span className="font-orbitron font-extrabold text-xl text-cyan-400 text-glow-cyan">
              {progress}%
            </span>
          </div>
        </div>

        {/* Diagnostic log logs */}
        <div className="w-full font-mono text-[9px] md:text-[10px] text-cyan-400/90 bg-[#040612] border border-cyan-950/60 p-4 rounded h-32 overflow-hidden flex flex-col justify-end gap-1.5 shadow-inner">
          {logs.slice(0, logIndex + 1).map((log, i) => (
            <div 
              key={i} 
              className={`truncate transition-all duration-200 ${i === logIndex ? 'text-cyan-300 font-bold opacity-100' : 'opacity-40'}`}
            >
              {i === logIndex ? "> " : "✓ "} {log}
            </div>
          ))}
          {progress < 100 && (
            <div className="text-purple-400 animate-pulse text-[8px] tracking-widest mt-1">
              &gt;&gt; BOOTSTRAPPING ROBOT CONTROLS...
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full mt-5 h-[3px] bg-cyan-950/50 rounded-full overflow-hidden relative">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-100 shadow-cyan-glow"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default Loader;
