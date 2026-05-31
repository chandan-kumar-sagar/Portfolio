export const portfolioKnowledge = {
  owner: {
    name: 'Chandan Kumar',
    title: 'Backend Developer | MERN Stack Engineer',
    experience: '1.7+ years',
    email: 'chandan99file@gmail.com',
    phone: '+91-7488406481',
    github: 'https://github.com/chandan99file',
    linkedin: 'https://linkedin.com/in/chandan-kumar',
    location: 'Bengaluru, India',
    availability:
      'Open to full-time backend and MERN stack roles, freelance API projects, and remote collaborations.',
  },
  introduction:
    'Chandan Kumar is a Backend Developer with 1.7+ years of professional experience building scalable Node.js/Express systems, secure JWT authentication, RBAC, REST APIs, and optimized MySQL/MongoDB databases. He improved API latency by 25–30% through query optimization and indexing.',
  skills: [
    'Node.js', 'Express.js', 'TypeScript', 'JavaScript', 'React.js',
    'MySQL', 'MongoDB', 'PostgreSQL', 'REST APIs', 'JWT', 'RBAC',
    'Git', 'Postman', 'Tailwind CSS', 'Database Schema Design', 'Rate Limiting',
  ],
  experience: [
    {
      role: 'Backend Developer',
      company: 'Flutterflirt',
      period: 'Jan 2025 – Present',
      highlights: 'Scalable Node.js/Express services, JWT/RBAC, 25–30% API latency reduction via MySQL optimization.',
    },
    {
      role: 'Core Database & API Systems Engineer',
      company: 'Apex Technical & AMC Projects',
      period: 'Oct 2023 – Dec 2024',
      highlights: 'Database schemas, Postman API validation, Gemini-powered Chrome extension automations.',
    },
  ],
  education: [
    'B.E. Information Science & Engineering — AMC Engineering College, Bangalore (2024)',
    'ISC (12th) — LND College, Motihari (2019)',
  ],
  projects: [
    { name: 'TicketHub Booking Platform', stack: 'Node.js, Express, MySQL, JWT, RBAC', desc: 'Concurrent seat booking with secure auth.' },
    { name: 'Kaveri Engineering Systems', stack: 'Node.js, Express, MySQL, JWT', desc: 'Workforce records and attendance APIs.' },
    { name: 'Workday AI Auto-Applier', stack: 'React, Node.js, MongoDB, Gemini API', desc: 'Chrome extension for intelligent job form automation.' },
    { name: 'REST API Platform Gateway', stack: 'TypeScript, Node.js, Express, MySQL', desc: 'Rate-limited production API gateway with CORS shields.' },
  ],
  achievements: [
    '25–30% faster API response through SQL indexing',
    'JWT / RBAC security implementations',
    'Production REST APIs with rate limiting and CORS',
  ],
} as const;

export const FALLBACK_REPLY =
  'Please contact Chandan directly for more information. Email: chandan99file@gmail.com | Phone: +91-7488406481';

const normalize = (text: string) => text.toLowerCase().replace(/[^\w\s]/g, ' ').trim();
const includesAny = (text: string, keywords: string[]) => keywords.some((k) => text.includes(k));

/** Client-side fallback when API is offline */
export const generateLocalChatReply = (message: string): string => {
  const q = normalize(message);
  if (!q) return 'Send a message and I will help you learn about Chandan Kumar.';

  const { owner, introduction, skills, experience, projects, education, achievements } = portfolioKnowledge;

  if (includesAny(q, ['who is', 'who are', 'about chandan', 'about you', 'introduction', 'tell me about'])) {
    return introduction;
  }
  if (includesAny(q, ['skill', 'tech', 'technology', 'stack', 'tools', 'expertise', 'mern'])) {
    return `Chandan's core skills: ${skills.join(', ')}.`;
  }
  if (includesAny(q, ['experience', 'work', 'job', 'career', 'company', 'flutterflirt'])) {
    return experience.map((e) => `${e.role} at ${e.company} (${e.period}): ${e.highlights}`).join('\n\n');
  }
  if (includesAny(q, ['project', 'portfolio', 'built', 'ticket', 'kaveri', 'workday'])) {
    return projects.map((p) => `• ${p.name} — ${p.desc} [${p.stack}]`).join('\n');
  }
  if (includesAny(q, ['education', 'college', 'degree', 'graduate', 'amc'])) {
    return education.join('\n');
  }
  if (includesAny(q, ['contact', 'email', 'phone', 'reach', 'linkedin', 'github', 'connect'])) {
    return `Contact:\n📧 ${owner.email}\n📞 ${owner.phone}\n💼 ${owner.linkedin}\n🐙 ${owner.github}`;
  }
  if (includesAny(q, ['resume', 'cv'])) {
    return `${owner.name} — ${owner.title}. ${owner.experience} experience. Email: ${owner.email}`;
  }
  if (includesAny(q, ['available', 'availability', 'hire', 'freelance', 'open to work'])) {
    return owner.availability;
  }
  if (includesAny(q, ['hello', 'hi', 'hey'])) {
    return `Hello! I'm JARVIS. Ask about Chandan's skills, experience, projects, or contact details.`;
  }
  if (includesAny(q, ['achievement', 'benchmark', 'optimize', 'latency', 'performance'])) {
    return achievements.map((a) => `• ${a}`).join('\n');
  }
  return FALLBACK_REPLY;
};
