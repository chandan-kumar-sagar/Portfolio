import React, { useState } from 'react';
import { Send, Mail, Cpu, Phone } from 'lucide-react';
import { config } from '../config/env';
import { SectionHeader } from '../components/SectionHeader';
import { SectionReveal } from '../components/SectionReveal';

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface ContactProps {
  onSubmitContact: (data: { name: string; email: string; subject: string; message: string }) => Promise<{ success: boolean; message: string }>;
}

export const Contact: React.FC<ContactProps> = ({ onSubmitContact }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "🤖 JARVIS TERMINAL: STANDBY - WAITING FOR VISITOR PROTOCOLS...",
    "📡 SECURE PORT CONNECTED. ENCRYPTION PROTOCOL: SSL_AES_256"
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTerminalLog = (message: string) => {
    setTerminalLogs((prev) => [...prev, `> ${message}`]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      handleTerminalLog("CRITICAL: VALIDATION ERROR - ALL FIELD PARAMETERS REQUIRED.");
      return;
    }

    setLoading(true);
    handleTerminalLog(`COMPILING TRANSMISSION FOR VISITOR: ${formData.name.toUpperCase()}...`);
    handleTerminalLog("ENCRYPTING PACKETS & INITIATING SECURE ENVELOPE...");

    try {
      const response = await onSubmitContact(formData);
      if (response.success) {
        handleTerminalLog("TRANSMISSION SUCCESSFUL! UPLINK COMPLETED.");
        handleTerminalLog(`SERVER RESPONSE: ${response.message}`);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        handleTerminalLog(`FAULT SHIELD TRIGGERED: ${response.message}`);
      }
    } catch (err: any) {
      handleTerminalLog("CRITICAL FAULT: SERVER OFFLINE. SECURE ARCHIVE BUFFER RUNNING.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionReveal>
      <section id="contact" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full select-none">
        <SectionHeader tag="Contact" title="SECURE TRANSCEIVER UPLINK" accent="cyan" subtitle="Reach out for collaborations, hiring, or project inquiries." />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
        
        {/* Left Column: Social Links & Server Telemetry */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-8 select-text">
          <div className="p-5 sm:p-6 border border-cyan-500/10 glass-panel rounded-lg shadow-hud-glow">
            <h3 className="font-orbitron font-bold text-sm text-cyan-400 tracking-wider uppercase mb-3 flex items-center gap-2">
              <Cpu className="w-4.5 h-4.5 animate-pulse" /> TARGET DIRECTIVES
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Recruiters, engineering managers, or fellow tech developers: utilize this direct transceiver link to log an inquiry. {config.ownerName} will respond to verified systems immediately.
            </p>

            <div className="space-y-4 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded border border-slate-700/50 flex items-center justify-center bg-cyber-dark text-purple-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">SECURE DIRECT EMAIL</span>
                  <a href={`mailto:${config.ownerEmail}`} className="hover:text-cyan-400 transition-colors clickable cursor-pointer">
                    {config.ownerEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-cyan-950/20 pt-3">
                <div className="w-8 h-8 rounded border border-slate-700/50 flex items-center justify-center bg-cyber-dark text-cyan-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">DIRECT COMM UPLINK</span>
                  <a href={`tel:${config.ownerPhone.replace(/\s/g, '')}`} className="hover:text-purple-400 transition-colors clickable cursor-pointer">
                    {config.ownerPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social node clusters */}
          <div className="p-5 sm:p-6 border border-purple-500/10 glass-panel rounded-lg">
            <h3 className="font-orbitron font-bold text-xs text-purple-400 tracking-wider uppercase mb-3 sm:mb-4">
              EXTERNAL COGNITIVE PORTS
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <a
                href={config.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 border border-slate-700/50 rounded bg-[#040612] hover:border-cyan-400/40 hover:shadow-cyan-glow flex items-center gap-2 text-xs font-mono text-slate-300 transition-all duration-300 clickable cursor-pointer"
              >
                <GithubIcon className="w-4 h-4 text-cyan-400" />
                <span>GITHUB_PORT</span>
              </a>
              <a
                href={config.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 border border-slate-700/50 rounded bg-[#040612] hover:border-purple-400/40 hover:shadow-purple-glow flex items-center gap-2 text-xs font-mono text-slate-300 transition-all duration-300 clickable cursor-pointer"
              >
                <LinkedinIcon className="w-4 h-4 text-purple-400" />
                <span>LINKEDIN_PORT</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Terminal / Futuristic input panels */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Terminal logger feedback screen */}
          <div className="w-full font-mono text-[9px] md:text-[10px] text-cyan-500/90 bg-[#040612] border border-cyan-950/70 p-3 sm:p-4 rounded-lg h-28 sm:h-36 overflow-y-auto flex flex-col gap-1 shadow-inner select-none scrollbar-thin">
            <div className="text-slate-500">// JARVIS LOGSTREAM DIAGNOSTICS:</div>
            {terminalLogs.map((log, i) => (
              <div key={i} className="truncate">
                {log}
              </div>
            ))}
          </div>

          {/* Core Interactive Command Form */}
          <form onSubmit={handleSubmit} className="relative p-5 sm:p-6 md:p-8 border border-cyan-500/10 glass-panel rounded-lg shadow-hud-glow space-y-4">
            
            <div className="absolute inset-0 pointer-events-none rounded-lg bg-gradient-to-b from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 hover:opacity-100 transition-opacity duration-300 laser-scan"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[9px] text-slate-500 uppercase mb-1">VISITOR_NAME</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="w-full bg-[#040612] border border-cyan-950/50 rounded p-2.5 font-mono text-xs text-slate-100 focus:outline-none focus:border-cyan-400 focus:shadow-cyan-glow transition-all"
                />
              </div>
              <div>
                <label className="block font-mono text-[9px] text-slate-500 uppercase mb-1">VISITOR_EMAIL</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  placeholder="e.g. j.doe@uplink.net"
                  className="w-full bg-[#040612] border border-cyan-950/50 rounded p-2.5 font-mono text-xs text-slate-100 focus:outline-none focus:border-cyan-400 focus:shadow-cyan-glow transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[9px] text-slate-500 uppercase mb-1">TRANSMISSION_SUBJECT</label>
              <input 
                type="text" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange}
                placeholder="e.g. Project Integration Proposal"
                className="w-full bg-[#040612] border border-cyan-950/50 rounded p-2.5 font-mono text-xs text-slate-100 focus:outline-none focus:border-cyan-400 focus:shadow-cyan-glow transition-all"
              />
            </div>

            <div>
              <label className="block font-mono text-[9px] text-slate-500 uppercase mb-1">ENVELOPE_CONTENT</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange}
                rows={4}
                placeholder="Enter details of system proposal..."
                className="w-full bg-[#040612] border border-cyan-950/50 rounded p-2.5 font-mono text-xs text-slate-100 focus:outline-none focus:border-cyan-400 focus:shadow-cyan-glow transition-all scrollbar-thin resize-none"
              />
            </div>

            {/* Futuristic Magnetic Submit element */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded font-orbitron font-semibold text-xs tracking-widest text-[#03030c] bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 transition-all duration-300 shadow-cyan-glow hover:shadow-cyan-glow-heavy flex items-center justify-center gap-2 cursor-pointer clickable"
            >
              {loading ? (
                <>UPLINKING PACKAGE...</>
              ) : (
                <>
                  TRANSMIT TELEMETRY <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

        </div>
      </div>

      </section>
    </SectionReveal>
  );
};
export default Contact;
