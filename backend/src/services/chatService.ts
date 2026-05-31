import { portfolioKnowledge, FALLBACK_REPLY } from '../data/knowledgeBase';

const normalize = (text: string) => text.toLowerCase().replace(/[^\w\s]/g, ' ').trim();

const includesAny = (text: string, keywords: string[]) =>
  keywords.some((k) => text.includes(k));

export const generateChatReply = (message: string): string => {
  const q = normalize(message);
  if (!q) return 'Send a message and I will help you learn about Chandan Kumar.';

  const { owner, introduction, skills, experience, projects, education, achievements } = portfolioKnowledge;

  if (includesAny(q, ['who is', 'who are', 'about chandan', 'about you', 'introduction', 'tell me about', 'who am i talking'])) {
    return introduction;
  }

  if (includesAny(q, ['skill', 'tech', 'technology', 'stack', 'tools', 'expertise', 'mern', 'node', 'database'])) {
    return `Chandan's core skills: ${skills.join(', ')}. He specializes in backend architecture, REST APIs, JWT/RBAC security, and database optimization.`;
  }

  if (includesAny(q, ['experience', 'work', 'job', 'career', 'company', 'flutterflirt', 'professional'])) {
    return experience
      .map((e) => `${e.role} at ${e.company} (${e.period}): ${e.highlights}`)
      .join('\n\n');
  }

  if (includesAny(q, ['project', 'portfolio', 'built', 'ticket', 'kaveri', 'workday', 'api gateway'])) {
    return projects
      .map((p) => `• ${p.name} — ${p.desc} [${p.stack}]`)
      .join('\n');
  }

  if (includesAny(q, ['education', 'college', 'degree', 'graduate', 'amc', 'engineering college'])) {
    return education.join('\n');
  }

  if (includesAny(q, ['contact', 'email', 'phone', 'reach', 'linkedin', 'github', 'connect'])) {
    return `Contact Chandan Kumar:\n📧 ${owner.email}\n📞 ${owner.phone}\n💼 LinkedIn: ${owner.linkedin}\n🐙 GitHub: ${owner.github}`;
  }

  if (includesAny(q, ['resume', 'cv', 'download resume'])) {
    return `Chandan Kumar — ${owner.title}. ${owner.experience} of backend experience. Request his resume via ${owner.email} or use the contact form on this portfolio.`;
  }

  if (includesAny(q, ['available', 'availability', 'hire', 'hiring', 'freelance', 'open to work', 'looking for'])) {
    return owner.availability;
  }

  if (includesAny(q, ['achievement', 'benchmark', 'optimize', 'latency', 'performance', 'jwt', 'rbac'])) {
    return achievements.map((a) => `• ${a}`).join('\n');
  }

  if (includesAny(q, ['hello', 'hi', 'hey', 'good morning', 'good evening'])) {
    return `Hello! I'm JARVIS, Chandan's portfolio assistant. Ask me about his skills, experience, projects, availability, or contact details.`;
  }

  if (includesAny(q, ['name', 'chandan kumar'])) {
    return `${owner.name} is a ${owner.title} based in ${owner.location} with ${owner.experience} of experience. ${introduction}`;
  }

  return FALLBACK_REPLY;
};
