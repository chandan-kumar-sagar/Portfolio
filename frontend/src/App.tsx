import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Loader } from './components/Loader';
import { CustomCursor } from './components/CustomCursor';
import { ParticlesBG } from './components/ParticlesBG';
import { PageAmbient } from './components/PageAmbient';
import { ScrollProgress } from './components/ScrollProgress';
import type { SkillNode } from './components/TechGlobe3D';
import { Hero } from './sections/Hero';
import { config } from './config/env';
import { api } from './services/api';
import { Terminal, Shield, Cpu, MessageSquare, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TechGlobe3D = lazy(() =>
  import('./components/TechGlobe3D').then((m) => ({ default: m.TechGlobe3D }))
);
const AiChatbot = lazy(() => import('./components/AiChatbot'));
const About = lazy(() => import('./sections/About'));
const TechStack = lazy(() => import('./sections/TechStack'));
const Experience = lazy(() => import('./sections/Experience'));
const Education = lazy(() => import('./sections/Education'));
const Projects = lazy(() => import('./sections/Projects'));
const Highlights = lazy(() => import('./sections/Highlights'));
const Contact = lazy(() => import('./sections/Contact'));

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'techstack' },
  { label: 'Experience', id: 'experience' },
  { label: 'Education', id: 'education' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

const SectionLoader: React.FC = () => (
  <div className="py-20 flex justify-center" aria-hidden>
    <div className="w-7 h-7 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
  </div>
);

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [pageViews, setPageViews] = useState(1250);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [speechText, setSpeechText] = useState("Hello, I am JARVIS, Chandan's AI Core system.");
  const [speechDisplayText, setSpeechDisplayText] = useState('');
  const [startupCompleted, setStartupCompleted] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);

  const handleNavClick = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    api.hit()
      .then((r) => r.json())
      .then((d) => { if (d.success) setPageViews(d.pageViews); })
      .catch(() => console.warn('[SYSTEM-WARNING] Local Database offline.'));
  }, []);

  useEffect(() => {
    if (loading) return;
    const t1 = setTimeout(() => setSpeechText("Welcome to Chandan Kumar's digital core environment."), 2500);
    const t2 = setTimeout(() => setSpeechText('Database Architect. Node.js Specialist. MERN Stack Developer.'), 5500);
    const t3 = setTimeout(() => setSpeechText('Scroll down to initiate deep scans on his experience.'), 8500);
    const t4 = setTimeout(() => setStartupCompleted(true), 11500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [loading]);

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
    const c = commentaries[activeSection];
    if (c) setSpeechText(c);
  }, [activeSection, startupCompleted, loading, hoveredSkill]);

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
    const id = setTimeout(type, 50);
    return () => { active = false; clearTimeout(id); };
  }, [speechText]);

  useEffect(() => {
    if (loading) return;
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [loading]);

  useEffect(() => {
    if (loading) return;
    const sections = ['hero', 'about', 'techstack', 'experience', 'education', 'projects', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: '-30% 0px -40% 0px', threshold: 0.1 }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => sections.forEach((id) => { const el = document.getElementById(id); if (el) observer.unobserve(el); });
  }, [loading]);

  const handleSubmitContact = async (data: { name: string; email: string; subject: string; message: string }) => {
    try {
      const res = await api.contact(data);
      const resData = await res.json();
      return { success: resData.success, message: resData.message };
    } catch {
      return { success: false, message: 'TRANSMISSION ANOMALY: Uplink socket dropped.' };
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 bg-[#03030c] font-inter overflow-x-hidden select-none cyber-grid">
      <Loader onComplete={() => setLoading(false)} />

      {!loading && (
        <>
          <PageAmbient />
          <CustomCursor />
          <ParticlesBG />
          <ScrollProgress />

          <nav className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3.5 flex items-center justify-between transition-all duration-300
            ${navScrolled
              ? 'bg-[#03030c]/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,240,255,0.06)]'
              : 'bg-[#03030c]/70 backdrop-blur-md border-b border-cyan-500/10'
            }`}
          >
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('hero')}>
              <div className="w-9 h-9 rounded border border-cyan-500/30 flex items-center justify-center bg-cyan-950/20 shadow-hud-glow group-hover:border-cyan-400 transition-colors">
                <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>
              <div>
                <span className="font-orbitron font-extrabold text-sm tracking-widest text-slate-100">
                  {config.ownerName.split(' ')[0]?.toUpperCase()}
                </span>
                <span className="font-orbitron font-semibold text-[10px] tracking-wider text-purple-400 block -mt-1">
                  {config.ownerName.split(' ').slice(1).join(' ').toUpperCase() || 'KUMAR'}
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-lg font-orbitron text-[10px] tracking-widest transition-all duration-200 cursor-pointer border
                    ${activeSection === link.id
                      ? 'nav-link-active text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
                      : 'text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/5 border-transparent'
                    }`}
                >
                  {link.label.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right font-mono text-[9px] text-cyan-400/70">
                <span>UPLINK: SECURE</span>
                <span>VIEWS: {pageViews || '1250'}</span>
              </div>
              <div className="px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-950/15 flex items-center gap-1.5 shadow-hud-glow">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-orbitron text-[9px] tracking-widest text-cyan-400 font-bold hidden sm:block">JARVIS ACTIVE</span>
              </div>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 transition-colors">
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="fixed top-[60px] left-0 right-0 z-40 bg-[#03030c]/95 backdrop-blur-lg border-b border-cyan-500/10 py-4 px-6 flex flex-col gap-2"
              >
                {NAV_LINKS.map((link) => (
                  <button key={link.id} onClick={() => handleNavClick(link.id)}
                    className={`text-left px-4 py-2.5 rounded font-orbitron text-[11px] tracking-widest transition-all
                      ${activeSection === link.id ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20' : 'text-slate-400 hover:text-cyan-400 border border-transparent'}`}
                  >
                    {link.label.toUpperCase()}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <main className="relative z-10 pt-[60px] mesh-gradient">

            {/* ═══ HERO SECTION ═══ */}
            <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-16 overflow-hidden">

              {/* === Ambient Glows === */}
              {/* Left side — purple glow for girl */}
              <div className="absolute left-0 bottom-0 pointer-events-none" style={{ width: '500px', height: '600px', background: 'radial-gradient(ellipse at left bottom, rgba(189,0,255,0.15) 0%, rgba(189,0,255,0.04) 45%, transparent 75%)' }} />
              {/* Right side — cyan glow for boy */}
              <div className="absolute right-0 top-0 pointer-events-none" style={{ width: '500px', height: '600px', background: 'radial-gradient(ellipse at right top, rgba(0,240,255,0.15) 0%, rgba(0,240,255,0.04) 45%, transparent 75%)' }} />

              {/* ── Boy — top-right corner, cyan neon swing ── */}
              <div
                className="absolute z-10 pointer-events-none flex items-start select-none w-[100px] sm:w-[140px] md:w-[190px] lg:w-[240px] xl:w-[270px]"
                style={{ top: '70px', right: '10px' }}
              >
                <img src="/swing-boy.png" alt="" aria-hidden="true" className="char-boy w-full h-auto object-contain" />
              </div>

              {/* ══ TOP SECTION: Heading + Hero content (left-aligned on desktop) ══ */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-center lg:text-left flex flex-col items-center lg:items-start mb-4 z-20 select-text w-full max-w-5xl relative lg:pl-12 lg:mr-auto"
              >
                <div className="pro-badge mb-6 flex justify-center lg:justify-start">
                  <Terminal className="w-3.5 h-3.5 mr-2" />
                  <span className="tracking-wider uppercase">Backend Engineer · MERN Stack · Open to Work</span>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-4 font-orbitron relative text-center lg:text-left w-full">
                  <span className="absolute inset-0 blur-2xl opacity-30 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400 select-none" aria-hidden="true">{config.ownerName}</span>
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-slate-100 to-purple-300">{config.ownerName}</span>
                </h1>

                <Hero onNavClick={handleNavClick} pageViews={pageViews} activeSection={activeSection} />
              </motion.div>

              {/* ══ BOTTOM ROW: [Speech + Girl] left ↔ Globe right ══ */}
              <div className="w-full max-w-6xl mx-auto z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between relative gap-4 lg:gap-8">

                {/* ── LEFT COLUMN: Speech box pushed down, Girl anchored at bottom ── */}
                <div className="hidden lg:flex flex-col items-start justify-between flex-1 self-stretch" style={{ minHeight: '380px' }}>
                  {/* Speech Panel — pushed down with top margin */}
                  <div className="mt-16 w-full">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={speechText}
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.96 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-[360px] px-6 py-5 bg-[#030510]/80 backdrop-blur-md border-t-2 border-b border-l border-r border-cyan-500/10 border-t-cyan-400/30 shadow-[0_0_20px_rgba(0,240,255,0.05)] select-text relative"
                      >
                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400/50" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400/50" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400/30" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400/30" />
                        <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-3 font-mono text-[9px] text-cyan-400 tracking-wider">
                          <div className="flex items-center gap-2">
                            <Terminal className="w-3.5 h-3.5 animate-pulse" />
                            <span>SYS.CORE.JARVIS</span>
                          </div>
                          <span className="text-cyan-500/50">v2.4.1</span>
                        </div>
                        <p className="font-mono text-[13px] leading-relaxed text-cyan-50 min-h-[48px]">
                          {speechDisplayText}
                          <span className="inline-block w-1.5 h-3.5 ml-1 bg-cyan-400 animate-pulse align-middle"></span>
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Girl — anchored at bottom */}
                  <div className="pointer-events-none select-none flex items-end">
                    <img
                      src="/swing-girl.png"
                      alt=""
                      aria-hidden="true"
                      className="char-girl h-auto object-contain"
                      style={{ width: '210px', maxHeight: '300px', marginBottom: '-8px' }}
                    />
                  </div>
                </div>

                {/* Mobile: speech panel centered */}
                <div className="lg:hidden relative z-20 flex flex-col items-center w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={speechText}
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.96 }}
                      transition={{ duration: 0.3 }}
                      className="w-full max-w-[420px] px-6 py-5 bg-[#030510]/80 backdrop-blur-md border-t-2 border-b border-l border-r border-cyan-500/10 border-t-cyan-400/30 shadow-[0_0_20px_rgba(0,240,255,0.05)] select-text relative"
                    >
                      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400/50" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400/50" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400/30" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400/30" />
                      <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-3 font-mono text-[9px] text-cyan-400 tracking-wider">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-3.5 h-3.5 animate-pulse" />
                          <span>SYS.CORE.JARVIS</span>
                        </div>
                        <span className="text-cyan-500/50">v2.4.1</span>
                      </div>
                      <p className="font-mono text-[13px] leading-relaxed text-cyan-50 min-h-[48px]">
                        {speechDisplayText}
                        <span className="inline-block w-1.5 h-3.5 ml-1 bg-cyan-400 animate-pulse align-middle"></span>
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ── RIGHT: Globe ── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="w-full max-w-[600px] h-[420px] md:h-[520px] lg:h-[560px] pointer-events-auto globe-canvas flex items-center justify-center flex-1"
                >
                  <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="w-10 h-10 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" /></div>}>
                    <TechGlobe3D activeSection={activeSection} onHoverSkill={setHoveredSkill} />
                  </Suspense>
                </motion.div>
              </div>

              {/* ── Girl fallback on mobile/tablet — absolute bottom-left ── */}
              <div className="lg:hidden absolute bottom-0 left-2 z-0 pointer-events-none select-none flex items-end w-[100px] sm:w-[130px] md:w-[160px]">
                <img src="/swing-girl.png" alt="" aria-hidden="true" className="char-girl w-full h-auto object-contain" />
              </div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[9px] text-slate-500 tracking-widest z-10"
              >
                <div className="w-px h-8 bg-gradient-to-b from-cyan-500/40 to-transparent" />
                SCROLL
              </motion.div>
            </section>

            <div className="section-divider max-w-4xl mx-auto" aria-hidden="true" />

            <Suspense fallback={<SectionLoader />}><About /></Suspense>
            <div className="section-divider max-w-4xl mx-auto" aria-hidden="true" />
            <Suspense fallback={<SectionLoader />}><TechStack /></Suspense>
            <div className="section-divider max-w-4xl mx-auto" aria-hidden="true" />
            <Suspense fallback={<SectionLoader />}><Experience /></Suspense>
            <div className="section-divider max-w-4xl mx-auto" aria-hidden="true" />
            <Suspense fallback={<SectionLoader />}><Education /></Suspense>
            <div className="section-divider max-w-4xl mx-auto" aria-hidden="true" />
            <Suspense fallback={<SectionLoader />}><Projects /></Suspense>
            <div className="section-divider max-w-4xl mx-auto" aria-hidden="true" />
            <Suspense fallback={<SectionLoader />}><Highlights /></Suspense>
            <div className="section-divider max-w-4xl mx-auto" aria-hidden="true" />
            <Suspense fallback={<SectionLoader />}>
              <Contact onSubmitContact={handleSubmitContact} />
            </Suspense>
          </main>

          <footer className="relative border-t border-cyan-500/10 bg-[#02020a]/80 py-10 px-6 backdrop-blur-md z-10 text-center font-mono">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-[10px] tracking-wider text-slate-400">
                  © {new Date().getFullYear()} {config.ownerName.toUpperCase()} — ALL PORTFOLIO CORES NOMINAL.
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

          <Suspense fallback={null}>
            <AiChatbot />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default App;
