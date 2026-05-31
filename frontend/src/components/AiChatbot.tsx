import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Minimize2, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import { config } from '../config/env';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: `Hi! I'm JARVIS — Chandan's AI assistant. Ask me about his skills, experience, projects, availability, or how to contact him.`,
  timestamp: new Date(),
};

const SUGGESTIONS = [
  'Who is Chandan Kumar?',
  'What are his skills?',
  'Tell me about his projects',
  'Is he available for work?',
];

export const AiChatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    const reply = await api.chat(trimmed);

    setTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      },
    ]);
  }, [typing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-5 right-5 z-[70] w-14 h-14 rounded-2xl flex items-center justify-center hud-panel border-cyan-400/30 shadow-cyan-glow cursor-pointer group"
            aria-label="Open AI chat"
          >
            <Bot className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-purple-500 animate-ping" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="fixed bottom-5 right-5 z-[70] w-[min(100vw-2rem,380px)] h-[min(70vh,520px)] flex flex-col rounded-2xl overflow-hidden hud-panel border-cyan-500/20 shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(0,240,255,0.08)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/15 bg-[#050614]/80 backdrop-blur-xl shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl border border-cyan-500/25 flex items-center justify-center bg-cyan-950/30">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <p className="font-orbitron text-[11px] font-bold text-slate-100 tracking-wider">JARVIS AI</p>
                  <p className="font-mono text-[8px] text-cyan-500/70">Ask about {config.ownerName}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                  aria-label="Minimize chat"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scroll-smooth">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] px-3 py-2.5 rounded-xl text-xs leading-relaxed whitespace-pre-wrap
                      ${msg.role === 'user'
                        ? 'bg-cyan-500/15 border border-cyan-500/25 text-cyan-100 rounded-br-sm'
                        : 'bg-[#080915]/90 border border-purple-500/15 text-slate-300 rounded-bl-sm'
                      }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-xl bg-[#080915]/90 border border-purple-500/15 flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-[9px] font-mono px-2 py-1 rounded-full border border-cyan-500/15 text-cyan-400/80 hover:bg-cyan-500/10 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-cyan-500/10 bg-[#03030c]/90 shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about skills, projects..."
                  disabled={typing}
                  className="flex-1 bg-[#050614] border border-cyan-950/60 rounded-xl px-3 py-2.5 font-mono text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 focus:shadow-cyan-glow transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 disabled:opacity-40 transition-all"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiChatbot;
