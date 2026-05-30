import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    // Smoothen cursor lag follower
    let animationFrameId: number;
    
    const updateFollower = () => {
      setFollowerPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        
        // Easing interpolation coefficient
        const ease = 0.15;
        
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease
        };
      });
      
      animationFrameId = requestAnimationFrame(updateFollower);
    };

    animationFrameId = requestAnimationFrame(updateFollower);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  useEffect(() => {
    // Detect hovering over clickable entities
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('clickable') ||
        target.closest('.clickable')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  // Suppress cursor on mobile/touch screens
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
    return null;
  }

  if (!isVisible) return null;

  return (
    <>
      {/* Central Cursor Point */}
      <div 
        className="fixed w-[6px] h-[6px] bg-cyan-400 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      
      {/* Outer Targeting Reticle Retrace */}
      <div 
        className={`fixed w-8 h-8 rounded-full border pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out flex items-center justify-center
          ${isHovered 
            ? 'w-12 h-12 border-purple-500 bg-purple-500/10 shadow-purple-glow' 
            : 'border-cyan-400/40 shadow-cyan-glow bg-transparent'
          }`}
        style={{ left: `${followerPosition.x}px`, top: `${followerPosition.y}px` }}
      >
        {/* Futuristic crosshairs inside reticle when hovering */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[1px] h-[6px] bg-purple-400 absolute top-0"></div>
            <div className="w-[1px] h-[6px] bg-purple-400 absolute bottom-0"></div>
            <div className="w-[6px] h-[1px] bg-purple-400 absolute left-0"></div>
            <div className="w-[6px] h-[1px] bg-purple-400 absolute right-0"></div>
          </div>
        )}
      </div>
    </>
  );
};
export default CustomCursor;
