import React from 'react';
import { GraduationCap, BookOpen, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface EducationEntry {
  institution: string;
  degree: string;
  field: string;
  year: string;
  grade?: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
  glowClass: string;
  location: string;
  highlights: string[];
}

const educationData: EducationEntry[] = [
  {
    institution: 'AMC Engineering College',
    degree: 'Bachelor of Engineering (B.E.)',
    field: 'Information Science and Engineering',
    year: '2020 – 2024',
    location: 'Bangalore, Karnataka',
    icon: GraduationCap,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    glowClass: 'shadow-[0_0_25px_rgba(6,182,212,0.08)]',
    highlights: [
      'Specialized in backend systems architecture and database management',
      'Developed capstone project: Scalable REST API platform for real-time data streaming',
      'Studied Data Structures, Algorithms, Operating Systems, and Computer Networks',
    ]
  },
  {
    institution: 'LND College',
    degree: 'Indian School Certificate (ISC)',
    field: 'Class 12th – Science Stream',
    year: '2017 – 2019',
    location: 'Motihari, Bihar',
    icon: BookOpen,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    glowClass: 'shadow-[0_0_25px_rgba(168,85,247,0.08)]',
    highlights: [
      'Focused on Physics, Chemistry, Mathematics and Computer Science',
      'Developed strong algorithmic thinking and logical reasoning foundation',
    ]
  },
  {
    institution: 'SJS Public School',
    degree: 'Central Board of Secondary Education (CBSE)',
    field: 'Class 10th',
    year: '2016 – 2017',
    location: 'Motihari, Bihar',
    icon: Award,
    color: 'text-pink-400',
    borderColor: 'border-pink-500/30',
    glowClass: 'shadow-[0_0_25px_rgba(236,72,153,0.08)]',
    highlights: [
      'Strong academic foundation across core subjects',
      'First exposure to computers and programming fundamentals',
    ]
  }
];

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full select-none">

      {/* Section Header */}
      <div className="mb-16 text-center">
        <span className="font-mono text-xs text-purple-400 tracking-widest uppercase block mb-2">// ACADEMIC RECORDS</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-wider font-orbitron">
          EDUCATION DIRECTORY
        </h2>
        <div className="w-24 h-[2px] bg-gradient-to-r from-purple-400 to-transparent mt-3 mx-auto"></div>
        <p className="text-slate-400 text-sm mt-4 font-inter max-w-xl mx-auto">
          Academic training that laid the systems-thinking foundation for high-performance backend engineering.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">

        {/* Vertical connecting line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/30 via-purple-500/20 to-transparent pointer-events-none md:-translate-x-px"></div>

        <div className="flex flex-col gap-12">
          {educationData.map((edu, idx) => {
            const Icon = edu.icon;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content Card — takes up half width on md+ */}
                <div className={`flex-1 md:px-10 ${isEven ? 'md:pr-14 md:pl-0 md:text-right' : 'md:pl-14 md:pr-0 md:text-left'} pl-14 md:pl-10`}>
                  <div
                    className={`p-6 rounded-xl border glass-panel ${edu.borderColor} ${edu.glowClass} hover:scale-[1.01] transition-transform duration-300 group`}
                  >
                    {/* Year Badge */}
                    <span className={`inline-block font-mono text-[10px] tracking-widest px-2.5 py-1 rounded border ${edu.borderColor} ${edu.color} bg-cyber-bg/50 mb-3`}>
                      {edu.year}
                    </span>

                    {/* Institution */}
                    <h3 className={`font-orbitron font-extrabold text-base md:text-lg text-slate-100 tracking-wide leading-tight mb-1`}>
                      {edu.institution}
                    </h3>

                    {/* Degree */}
                    <p className={`font-semibold text-sm ${edu.color} mb-0.5`}>{edu.degree}</p>
                    <p className="text-slate-400 text-xs font-inter mb-1">{edu.field}</p>
                    <p className="text-slate-500 text-[10px] font-mono mb-4">📍 {edu.location}</p>

                    {/* Highlights */}
                    <ul className={`space-y-1.5 ${isEven ? 'md:text-right' : 'md:text-left'} text-left`}>
                      {edu.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="text-slate-400 text-xs font-inter flex items-start gap-2 md:flex-row">
                          <span className={`${edu.color} mt-0.5 shrink-0`}>▸</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Center Icon Marker */}
                <div className="absolute left-0 md:left-1/2 top-6 md:-translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border-2 bg-[#03030c] z-10 shrink-0"
                  style={{ borderColor: edu.color.includes('cyan') ? 'rgba(6,182,212,0.4)' : edu.color.includes('purple') ? 'rgba(168,85,247,0.4)' : 'rgba(236,72,153,0.4)' }}
                >
                  <Icon className={`w-5 h-5 ${edu.color}`} />
                </div>

                {/* Spacer side (empty) */}
                <div className="hidden md:block flex-1"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
