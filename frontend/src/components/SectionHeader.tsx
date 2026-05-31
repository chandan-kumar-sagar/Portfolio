import React from 'react';

interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  accent?: 'cyan' | 'purple' | 'pink';
  align?: 'center' | 'left';
}

const accentMap = {
  cyan: { tag: 'text-cyan-400/90', bar: 'from-cyan-400 via-cyan-400/50', dot: 'bg-cyan-400' },
  purple: { tag: 'text-purple-400/90', bar: 'from-purple-400 via-purple-400/50', dot: 'bg-purple-400' },
  pink: { tag: 'text-pink-400/90', bar: 'from-pink-400 via-pink-400/50', dot: 'bg-pink-400' },
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tag,
  title,
  subtitle,
  accent = 'cyan',
  align = 'center',
}) => {
  const a = accentMap[accent];
  return (
    <div className={`mb-14 md:mb-16 ${align === 'center' ? 'text-center' : 'text-center lg:text-left'}`}>
      <div className={`inline-flex items-center gap-2 mb-3 ${align === 'center' ? 'mx-auto' : 'lg:mx-0'}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${a.dot}`} />
        <span className={`font-mono text-[11px] ${a.tag} tracking-[0.2em] uppercase`}>{tag}</span>
      </div>
      <h2 className="text-3xl md:text-[2.5rem] font-extrabold text-slate-50 tracking-wide leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-inter">
          {subtitle}
        </p>
      )}
      <div
        className={`w-16 h-0.5 bg-gradient-to-r ${a.bar} to-transparent mt-5 ${
          align === 'center' ? 'mx-auto' : 'mx-auto lg:mx-0'
        }`}
      />
    </div>
  );
};

export default SectionHeader;
