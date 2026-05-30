import React, { useState, useEffect } from 'react';
import { Loader } from './components/Loader';
import { CustomCursor } from './components/CustomCursor';
import { ParticlesBG } from './components/ParticlesBG';
import { TechGlobe3D, type SkillNode } from './components/TechGlobe3D';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { TechStack } from './sections/TechStack';
import { Experience } from './sections/Experience';
import { Education } from './sections/Education';
import { Projects } from './sections/Projects';
import { Highlights } from './sections/Highlights';
import { Contact } from './sections/Contact';
import { Terminal, Shield, Cpu, MessageSquare, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = 'http://localhost:5000/api/portfolio';

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'techstack' },
  { label: 'Experience', id: 'experience' },
  { label: 'Education', id: 'education' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [pageViews, setPageViews] = useState(1250);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // AI Assistant Speaking States
  const [speechText, setSpeechText] = useState("Hello, I am JARVIS, Chandan's AI Core system.");
  const [speechDisplayText, setSpeechDisplayText] = useState('');
  const [startupCompleted, setStartupCompleted] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);

  // Smooth scroll handler
  const handleNavClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Sync API logs & hits with backend Express server
  useEffect(() => {
    const syncData = async () => {
      try {
        const hitRes = await fetch(`${API_BASE}/hit`, { method: 'POST' });
        const hitData = await hitRes.json();
        if (hitData.success) setPageViews(hitData.pageViews);
      } catch (err) {
        console.warn('[SYSTEM-WARNING] Local Database offline.', err);
      }
    };
    syncData();
  }, []);

  // Timed dialog bubble sequence on load
  useEffect(() => {
    if (loading) return;

    const timer1 = setTimeout(() => {
      setSpeechText("Welcome to Chandan Kumar's digital core environment.");
    }, 2500);
    const timer2 = setTimeout(() => {
      setSpeechText('Database Architect. Node.js Specialist. MERN Stack Developer.');
    }, 5500);
    const timer3 = setTimeout(() => {
      setSpeechText('Scroll down to initiate deep scans on his experience.');
    }, 8500);
    const timer4 = setTimeout(() => {
      setStartupCompleted(true);
    }, 11500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [loading]);

  // Handle scrolling commentaries and tech-globe hovering
  useEffect(() => {
    if (loading) return;

    if (hoveredSkill) {
      setSpeechText(
        `DIAGNOSTIC UPLINK: ${hoveredSkill.name.toUpperCase()} operational at ${hoveredSkill.level}% efficiency. ${hoveredSkill.desc}`
      );
      return;
    }

    if (!startupCompleted) return;

    const commentaries: Record<string, string> = {
      hero: 'Scroll down to initiate deep scans on his experience.',
      about: 'Chandan possesses 1.7+ years of experience in high-performance backend systems.',
      techstack: 'These are the technologies Chandan uses to build scalable systems.',
      experience: "Here is Chandan's professional journey.",
      education: "Chandan's academic foundation — AMC Engineering College, Bangalore.",
      projects: 'These projects showcase real-world backend engineering.',
      contact: "Let's connect and build something impactful.",
    };

    const newComment = commentaries[activeSection];
    if (newComment) setSpeechText(newComment);
  }, [activeSection, startupCompleted, loading, hoveredSkill]);

  // Letter-by-letter typewriter animator
  useEffect(() => {
    let active = true;
    let currentText = '';
    let index = 0;
    setSpeechDisplayText('');

    const type = () => {
      if (!active) return;
      if (index < speechText.length) {
        currentText += speechText.charAt(index);
        setSpeechDisplayText(currentText);
        index++;
        setTimeout(type, 28);
      }
    };

    const timeoutId = setTimeout(type, 50);
    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, [speechText]);

  // Track active section on scroll
  useEffect(() => {
    if (loading) return;
    const sections = ['hero', 'about', 'techstack', 'experience', 'education', 'projects', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, rootMargin: '-30% 0px -40% 0px', threshold: 0.1 }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((sec) => {
        const el = document.getElementById(sec);
        if (el) observer.unobserve(el);
      });
    };
  }, [loading]);

  // Contact form submission
  const handleSubmitContact = async (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      return { success: resData.success, message: resData.message };
    } catch (err) {
      console.error('[CRITICAL-FAULT] Direct uplink failed.', err);
      return {
        success: false,
        message: 'TRANSMISSION ANOMALY: Uplink socket dropped.',
      };
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 bg-[#03030c] font-inter overflow-x-hidden select-none">

      {/* JARVIS Boot Loader */}
      <Loader onComplete={() => setLoading(false)} />

      {!loading && (
        <>
          <CustomCursor />
          <ParticlesBG />

          {/* ─── FIXED NAVBAR ─── */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-[#03030c]/90 backdrop-blur-lg border-b border-cyan-500/10 px-4 md:px-8 py-3.5 flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => handleNavClick('hero')}
            >
              <div className="w-9 h-9 rounded border border-cyan-500/30 flex items-center justify-center bg-cyan-950/20 shadow-hud-glow group-hover:border-cyan-400 transition-colors">
                <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>
              <div>
                <span className="font-orbitron font-extrabold text-sm tracking-widest text-slate-100">
                  CHANDAN
                </span>
                <span className="font-orbitron font-semibold text-[10px] tracking-wider text-purple-400 block -mt-1">
                  KUMAR
                </span>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded font-orbitron text-[10px] tracking-widest transition-all duration-200 cursor-pointer
                    ${activeSection === link.id
                      ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20'
                      : 'text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/5 border border-transparent'
                    }`}
                >
                  {link.label.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Right Side: Status + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right font-mono text-[9px] text-cyan-400/70">
                <span>UPLINK: SECURE</span>
                <span>VIEWS: {pageViews || '1250'}</span>
              </div>
              <div className="px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-950/15 flex items-center gap-1.5 shadow-hud-glow">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                <span className="font-orbitron text-[9px] tracking-widest text-cyan-400 font-bold hidden xs:block">
                  JARVIS ACTIVE
                </span>
              </div>
              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="fixed top-[60px] left-0 right-0 z-40 bg-[#03030c]/95 backdrop-blur-lg border-b border-cyan-500/10 py-4 px-6 flex flex-col gap-2"
              >
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left px-4 py-2.5 rounded font-orbitron text-[11px] tracking-widest transition-all
                      ${activeSection === link.id
                        ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20'
                        : 'text-slate-400 hover:text-cyan-400 border border-transparent'
                      }`}
                  >
                    {link.label.toUpperCase()}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── MAIN CONTENT ─── */}
          <main className="relative z-10 pt-[60px]">

            {/* ═══════════════════════════════════════════
                HERO SECTION — Full width, globe centered
                ═══════════════════════════════════════════ */}
            <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-16 overflow-hidden">

              {/* Ambient backdrop glows */}
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full filter blur-[120px] pointer-events-none animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full filter blur-[100px] pointer-events-none"></div>

              {/* Top Labels */}
              <div className="text-center mb-10 z-10 select-text">
                <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs mb-5 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/10">
                  <Terminal className="w-3.5 h-3.5 animate-pulse" />
                  <span className="tracking-wider uppercase">// DIRECT COGNITIVE LINK: PORT-443</span>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-100 tracking-tight leading-none mb-4 font-orbitron">
                  Chandan Kumar
                </h1>
                <Hero onNavClick={handleNavClick} pageViews={pageViews} activeSection={activeSection} />
              </div>

              {/* JARVIS Speech Bubble + 3D Globe — centered */}
              <div className="w-full max-w-2xl mx-auto z-10 flex flex-col items-center gap-5">

                {/* Speech Bubble */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={speechText}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-lg px-5 py-4 rounded-xl border border-cyan-400/25 bg-[#03030c]/90 backdrop-blur-md shadow-hud-glow select-text"
                  >
                    <div className="flex items-center gap-2 border-b border-cyan-500/15 pb-2 mb-2.5 font-mono text-[9px] text-cyan-400 tracking-wider">
                      <MessageSquare className="w-3.5 h-3.5 animate-pulse" />
                      <span>JARVIS SPEECH_UPLINK</span>
                    </div>
                    <p className="font-mono text-xs leading-relaxed text-cyan-100 min-h-[40px]">
                      {speechDisplayText}
                      <span className="border-r border-cyan-400 ml-0.5 animate-pulse">&nbsp;</span>
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Interactive 3D Tech Globe */}
                <div className="w-full h-[520px] md:h-[600px] pointer-events-auto">
                  <TechGlobe3D
                    activeSection={activeSection}
                    onHoverSkill={(skill) => setHoveredSkill(skill)}
                  />
                </div>
              </div>

              {/* Scroll indicator */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[9px] text-slate-500 tracking-widest z-10"
              >
                <div className="w-px h-8 bg-gradient-to-b from-cyan-500/40 to-transparent"></div>
                SCROLL
              </motion.div>
            </section>

            {/* ═══════════════════════════════════════════
                ALL PORTFOLIO SECTIONS — Full width
                ═══════════════════════════════════════════ */}
            <About />
            <TechStack />
            <Experience />
            <Education />
            <Projects />
            <Highlights />
            <Contact onSubmitContact={handleSubmitContact} />

          </main>

          {/* ─── FOOTER ─── */}
          <footer className="relative border-t border-cyan-500/10 bg-[#02020a]/80 py-10 px-6 backdrop-blur-md z-10 text-center font-mono">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-[10px] tracking-wider text-slate-400">
                  © 2024 CHANDAN KUMAR — ALL PORTFOLIO CORES NOMINAL.
                </span>
              </div>
              <div className="flex items-center gap-6 text-[10px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                  SECURE SHIELD: ACTIVE
                </span>
                <span>LATENCY: 12ms</span>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};
export default App;
