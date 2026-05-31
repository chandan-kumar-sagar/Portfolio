import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [pct, setPct] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => setPct(Math.round(v * 100)));
  }, [scrollYProgress]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_12px_rgba(0,240,255,0.6)]"
        style={{ scaleX }}
      />
      <div className="fixed top-3 right-4 z-[60] hidden md:flex items-center gap-1.5 font-mono text-[8px] text-cyan-500/50 pointer-events-none select-none">
        <span>SCROLL</span>
        <span className="text-cyan-400/80 tabular-nums">{pct}%</span>
      </div>
    </>
  );
};

export default ScrollProgress;
