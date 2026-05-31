const env = import.meta.env;

export const config = {
  apiBaseUrl: env.VITE_API_BASE_URL ?? 'http://localhost:5000/api/portfolio',
  ownerName: env.VITE_OWNER_NAME ?? 'Chandan Kumar',
  ownerTitle: env.VITE_OWNER_TITLE ?? 'Backend Developer | MERN Stack Engineer',
  ownerEmail: env.VITE_OWNER_EMAIL ?? 'chandan99file@gmail.com',
  ownerPhone: env.VITE_OWNER_PHONE ?? '+91-7488406481',
  githubUrl: env.VITE_GITHUB_URL ?? 'https://github.com/chandan99file',
  linkedinUrl: env.VITE_LINKEDIN_URL ?? 'https://linkedin.com/in/chandan-kumar',
  resumeUrl: env.VITE_RESUME_URL ?? '#',
  appTitle: env.VITE_APP_TITLE ?? 'Chandan Kumar | Futuristic Backend Engineer',
} as const;
