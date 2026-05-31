import { config } from '../config/env';
import { generateLocalChatReply } from '../data/knowledgeBase';

const API = config.apiBaseUrl;

export const api = {
  hit: () => fetch(`${API}/hit`, { method: 'POST' }),

  contact: (data: { name: string; email: string; subject: string; message: string }) =>
    fetch(`${API}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),

  chat: async (message: string): Promise<string> => {
    try {
      const res = await fetch(`${API}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data.success && data.reply) return data.reply as string;
    } catch {
      /* offline fallback */
    }
    return generateLocalChatReply(message);
  },
};

export default api;
