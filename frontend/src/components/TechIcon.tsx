import React, { useState } from 'react';
import { techLogoUrl } from '../data/techStack';

interface TechIconProps {
  slug: string;
  color?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export const TechIcon: React.FC<TechIconProps> = ({
  slug,
  color,
  name,
  size = 'md',
  className = '',
}) => {
  const [failed, setFailed] = useState(false);
  const initials = name.slice(0, 2).toUpperCase();

  if (failed) {
    return (
      <span
        className={`${sizeMap[size]} flex items-center justify-center text-[8px] font-bold font-orbitron text-cyan-400 ${className}`}
        title={name}
      >
        {initials}
      </span>
    );
  }

  return (
    <img
      src={techLogoUrl(slug, color)}
      alt={`${name} logo`}
      title={name}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`${sizeMap[size]} object-contain select-none pointer-events-none ${className}`}
      draggable={false}
    />
  );
};

export default TechIcon;
