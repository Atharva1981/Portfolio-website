import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Moon, Sun, Download, ExternalLink, Github, Mail, Linkedin,
  MessageCircle, Brain, ChevronUp, MapPin, BadgeCheck, ArrowRight,
  Menu, X, Star
} from 'lucide-react';
import ChatBot from '@/components/ChatBot';
import ProjectCard from '@/components/ProjectCard';

/* ─── Scroll-reveal hook ───────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add('visible'); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ─── Mouse glow hook ──────────────────────────────────────────────── */
function useMouseGlow() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
}

/* ─── Data ─────────────────────────────────────────────────────────── */
const skillCategories = [
  {
    category: 'Programming & Query',
    items: ['Python', 'SQL', 'R']
  },
  {
    category: 'Data Analysis & Viz',
    items: ['Power BI', 'Tableau', 'Microsoft Excel', 'Pivot Tables', 'Dashboards', 'Data Cleaning', 'Data Wrangling', 'Exploratory Data Analysis (EDA)', 'Data Visualization']
  },
  {
    category: 'ML Libraries',
    items: ['Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'Matplotlib', 'Seaborn']
  },
  {
    category: 'Databases',
    items: ['MySQL', 'MongoDB', 'PostgreSQL']
  },
  {
    category: 'Version Control',
    items: ['Git', 'GitHub']
  },
  {
    category: 'APIs & Integration',
    items: ['REST APIs', 'Data Integration', 'EDA']
  }
];

const projects = [
  {
    title: "India's Import–Export Trade Analysis Dashboard",
    description: "Built an end-to-end Power BI dashboard analyzing India's trade trends (2019–2025) with 20+ DAX measures including Trade Balance and Dependency Index. Integrated Python forecasting visuals for trend prediction.",
    image: '/imgs/market_report.svg',
    tech: ['Power BI', 'DAX', 'Python', 'Data Analysis'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Atharva1981/Import_Export_Trade_Analysis'
  },
  {
    title: 'Crop Disease Detection Using CNN',
    description: 'Developed a CNN model with 91% accuracy to detect 10+ crop diseases, reducing manual inspection time by 60%. Built user-friendly interface connecting farmers to e-commerce sites for treatment products.',
    image: '/imgs/agriculture-12-00009-ag.webp',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'Scikit-learn', 'Deep Learning'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Atharva1981/Agro.AI'
  },
  {
    title: 'HackRx API – Insurance Policy AI Query System',
    description: 'Developed an AI-powered FastAPI service to process insurance PDFs and deliver context-aware answers via semantic search using FAISS and Mistral 7B. Improved document retrieval time and query accuracy by 40%.',
    image: '/imgs/Banner-Image-1.jpg',
    tech: ['Python', 'FastAPI', 'FAISS', 'Mistral 7B', 'PyMuPDF', 'AI/ML'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Atharva1981/hackrx-api-deploy'
  }
];

const experiences = [
  {
    role: 'Full-Stack Web Developer Intern',
    company: 'CorpVenue',
    period: 'May 2025 – August 2025',
    description: "Developed and deployed CorpVenue's official website using React.js and Node.js, optimizing load speed and enhancing UI/UX consistency. Applied SEO and analytics strategies to increase user engagement by 35% and reduce bounce rate by 25%.",
    avatar: '/imgs/corpvenue.jpg',
    chips: ['React.js', 'Node.js', 'SEO', 'Analytics']
  },
  {
    role: 'Data Analyst Intern',
    company: 'IBM SkillsBuild',
    period: 'June 2024 – August 2024',
    description: 'Cleaned and analyzed 15K+ data points using Python, SQL and Excel, uncovering 5 key sustainability trends. Built 10+ Power BI dashboards to visualize KPIs and presented data-driven recommendations that improved project decision efficiency.',
    avatar: '/imgs/ibm.png',
    chips: ['Python', 'SQL', 'Power BI', 'Excel']
  }
];

const certifications = [
  { name: 'Oracle Cloud Infrastructure (OCI) Foundations Associate', issuer: 'Oracle', year: '2025' },
  { name: 'Tata Group Data Analytics Job Simulation', issuer: 'Forage', year: '2025' },
  { name: 'Agentic AI: From Learner to Builder – Become an AI Agent Architect', issuer: 'IBM SkillsBuild', year: '2025' },
  { name: 'Machine Learning', issuer: 'Stanford University', year: '2024' }
];

const leadership = [
  {
    name: 'Public Relations Manager',
    role: 'Ambiora Techfest 2024',
    content: 'Secured sponsorships worth ₹5,000+ by independently negotiating with local businesses. Managed sponsor communication, branding, and ensured maximum visibility during the event. Contributed to organizing a successful tech fest with 1,000+ attendees.',
    avatar: '/imgs/Screenshot 2025-12-15 142239.png'
  },
  {
    name: 'Delegate & Solution Drafting Committee Member',
    role: 'NMMUN (Model United Nations)',
    content: 'Participated as a delegate representing Turkey and engaged in structured diplomatic debates. Collaborated with fellow members to draft resolutions and formulate actionable solutions.',
    avatar: '/imgs/UN+logo.webp'
  }
];

/* ─── Component ────────────────────────────────────────────────────── */
const Index = () => {
  const [isDark, setIsDark] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Typewriter
  const typeTargets = ['Data Analysis', 'Power BI', 'Machine Learning', 'SQL', 'Data Pipelines', 'EDA'];
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useMouseGlow();
  useReveal();

  /* scroll tracking */
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* dark class on <html> */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  /* typewriter */
  useEffect(() => {
    const full = typeTargets[titleIndex];
    const speed = isDeleting ? 35 : 75;
    const t = setTimeout(() => {
      setDisplayText(prev =>
        isDeleting ? full.substring(0, prev.length - 1) : full.substring(0, prev.length + 1)
      );
      if (!isDeleting && displayText === full) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setTitleIndex(p => (p + 1) % typeTargets.length);
      }
    }, speed);
    return () => clearTimeout(t);
  }, [displayText, isDeleting, titleIndex]);

  const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

  return (
    <div className={`min-h-screen relative overflow-x-hidden ${isDark ? 'dark' : ''}`}
      style={{ background: isDark ? '#0a0a0a' : '#f8f8f8', color: isDark ? '#fff' : '#111' }}>

      {/* Persistent grid */}
      <div className="grid-bg" />

      {/* Mouse-follow glow */}
      <div className="mouse-glow" />

      {/* ── Ambient blobs ─────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)', animationDelay: '2s' }} />
      </div>

      {/* ── Floating Pill Navbar ─────────────────────────────────── */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="pill-nav flex items-center gap-1 px-4 py-2 w-full max-w-2xl">
          {/* Logo */}
          <div className="flex items-center gap-2 mr-auto">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-orange-500/40 flex-shrink-0">
              <img src="/imgs/atharva.jpg" alt="AK" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-sm" style={{ color: 'hsl(var(--primary))' }}>AK</span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200"
                style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = 'hsl(var(--primary))'; (e.target as HTMLElement).style.background = 'rgba(249,115,22,0.08)'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'; (e.target as HTMLElement).style.background = 'transparent'; }}>
                {link}
              </a>
            ))}
          </div>

          {/* Dark mode + mobile */}
          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
              aria-label="Toggle theme">
              {isDark
                ? <Sun className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                : <Moon className="w-4 h-4" style={{ color: '#555' }} />}
            </button>
            <button
              className="md:hidden w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu">
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-[4.5rem] left-0 right-0 z-40 flex justify-center px-4">
          <div className="pill-nav w-full max-w-2xl rounded-2xl py-3 px-4 flex flex-col gap-1">
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200"
                style={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }}>
                {link}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section id="home" className="relative z-10 pt-28 pb-16 min-h-screen flex items-center">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Left content */}
            <div className="flex-1 min-w-0">
              {/* Location pill */}
              <div className="flex items-center gap-2 mb-6 reveal">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-ping-slow" />
                <span className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
                  <MapPin className="inline w-3 h-3 mr-1" />Mumbai, India
                </span>
              </div>

              {/* Name */}
              <h1 className="font-black mb-4 reveal reveal-delay-1"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
                <span style={{ color: 'hsl(var(--primary))' }}>Atharva</span>{' '}
                <span style={{ color: isDark ? '#fff' : '#111' }}>Khairnar</span>
              </h1>

              {/* Typewriter role */}
              <div className="flex items-center gap-2 mb-6 reveal reveal-delay-2" style={{ minHeight: '2rem' }}>
                <span className="font-semibold text-xl" style={{ color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)' }}>
                  {displayText}
                </span>
                <span className="typing-cursor" />
              </div>

              {/* Bio */}
              <div className="mb-8 max-w-xl reveal reveal-delay-3">
                <p className="text-base leading-relaxed mb-3"
                  style={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }}>
                  I analyze data using <strong style={{ color: isDark ? '#fff' : '#111' }}>Python, SQL, and Power BI</strong>, and apply{' '}
                  <strong style={{ color: isDark ? '#fff' : '#111' }}>machine learning</strong> to uncover trends, build dashboards,
                  and support business decision-making through actionable insights.
                </p>
                <p className="text-base leading-relaxed"
                  style={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }}>
                  From ingestion to insight, I design <strong style={{ color: isDark ? '#fff' : '#111' }}>data pipelines</strong>, apply machine learning, and build{' '}
                  <strong style={{ color: isDark ? '#fff' : '#111' }}>intelligent systems</strong> that transform complex data into clear, actionable outcomes.
                </p>
              </div>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-2 mb-8 reveal reveal-delay-4">
                {['Python', 'SQL', 'Power BI', 'Pandas', 'Scikit-learn', 'Data Pipelines'].map(t => (
                  <span key={t} className="tech-chip">{t}</span>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 mb-8 reveal reveal-delay-5">
                <a href="/Atharva_Khairnar_Analyst (1).pdf" download="Atharva_Khairnar_Analyst.pdf">
                  <button className="btn-push">
                    <Download className="w-4 h-4" /> Download Resume <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
                <button className="btn-outline-push" onClick={() => setIsChatOpen(true)}>
                  <Brain className="w-4 h-4" /> Ask AI Assistant
                </button>
              </div>

              {/* Stats bar */}
              <div className="stat-bar reveal">
                {[
                  { value: '2+', label: 'Years of experience' },
                  { value: '5+', label: 'Projects delivered' },
                  { value: '2', label: 'Internships completed' },
                  { value: '4+', label: 'Certifications' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="font-black text-2xl" style={{ color: isDark ? '#fff' : '#111' }}>
                      {s.value}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)' }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – animated blob image */}
            <div className="blob-wrap flex-shrink-0 reveal">
              <div className="blob-shape" />
              <img src="/imgs/atharva.jpg" alt="Atharva Khairnar" className="blob-img" />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────────── */}
      <section id="about" className="relative z-10 py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <span className="section-label reveal">About</span>
          <h2 className="text-3xl font-bold mb-8 reveal reveal-delay-1"
            style={{ color: isDark ? '#fff' : '#111' }}>Who I am</h2>

          <div className="glass-card p-8 reveal reveal-delay-2">
            <p className="text-base leading-relaxed mb-4"
              style={{ color: isDark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.65)' }}>
              I am an <strong style={{ color: isDark ? '#fff' : '#111' }}>Information Technology undergraduate at NMIMS University</strong> with a strong interest in data analytics, data engineering, and AI-driven systems. I enjoy working with data to extract meaningful insights and building end-to-end analytical solutions using <strong style={{ color: isDark ? '#fff' : '#111' }}>Python, SQL, and BI tools</strong> like Power BI and Tableau. My experience includes developing interactive data dashboards, machine learning models, and scalable applications, combining analytical thinking with practical implementation.
            </p>
            <p className="text-base leading-relaxed mb-6"
              style={{ color: isDark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.65)' }}>
              Alongside data analysis, I am developing a strong understanding of <strong style={{ color: isDark ? '#fff' : '#111' }}>data pipelines and intelligent AI systems</strong>, including data collection, transformation, modeling, and deployment to support real-world decision-making. I am passionate about leveraging data-driven approaches and AI to build impactful, scalable solutions for complex problems.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-ping-slow" />
              <span className="text-sm font-medium" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)' }}>
                Available for opportunities
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ─────────────────────────────────────────────────── */}
      <section id="skills" className="relative z-10 py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <span className="section-label reveal">Skills</span>
          <h2 className="text-3xl font-bold mb-10 reveal reveal-delay-1"
            style={{ color: isDark ? '#fff' : '#111' }}>Skills & Expertise</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat, i) => (
              <div key={i} className={`glass-card p-6 reveal reveal-delay-${Math.min(i + 1, 5)}`}>
                <h3 className="font-semibold text-sm mb-4" style={{ color: 'hsl(var(--primary))' }}>
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map(skill => (
                    <span key={skill} className="skill-chip">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ───────────────────────────────────────────────── */}
      <section id="projects" className="relative z-10 py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <span className="section-label reveal">Projects</span>
          <h2 className="text-3xl font-bold mb-4 reveal reveal-delay-1"
            style={{ color: isDark ? '#fff' : '#111' }}>Featured Projects</h2>
          <p className="text-sm mb-10 reveal reveal-delay-2"
            style={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)' }}>
            A showcase of my work in data analysis and machine learning
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div key={i} className={`reveal reveal-delay-${Math.min(i + 1, 5)}`}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ─────────────────────────────────────────── */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <span className="section-label reveal">Achievements</span>
          <h2 className="text-3xl font-bold mb-10 reveal reveal-delay-1"
            style={{ color: isDark ? '#fff' : '#111' }}>Certifications</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <div key={i} className={`glass-card p-5 flex items-start gap-4 reveal reveal-delay-${Math.min(i + 1, 5)}`}>
                <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)' }}>
                  <BadgeCheck className="w-5 h-5" style={{ color: 'hsl(var(--primary))' }} />
                </div>
                <div>
                  <p className="font-semibold text-sm leading-snug mb-1" style={{ color: isDark ? '#fff' : '#111' }}>
                    {cert.name}
                  </p>
                  <p className="text-xs" style={{ color: 'hsl(var(--primary))' }}>{cert.issuer}</p>
                  <p className="text-xs mt-0.5" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>
                    {cert.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ─────────────────────────────────────────────── */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <span className="section-label reveal">Leadership</span>
          <h2 className="text-3xl font-bold mb-10 reveal reveal-delay-1"
            style={{ color: isDark ? '#fff' : '#111' }}>Leadership & Extracurricular</h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {leadership.map((item, i) => (
              <div key={i} className={`glass-card p-6 reveal reveal-delay-${i + 1}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border"
                    style={{ borderColor: 'rgba(249,115,22,0.3)' }}>
                    <img src={item.avatar} alt={item.name}
                      className="w-full h-full object-cover"
                      onError={e => { (e.target as HTMLImageElement).src = ''; }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: isDark ? '#fff' : '#111' }}>{item.name}</p>
                    <p className="text-xs" style={{ color: 'hsl(var(--primary))' }}>{item.role}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed"
                  style={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }}>
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ─────────────────────────────────────────────── */}
      <section id="experience" className="relative z-10 py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <span className="section-label reveal">Experience</span>
          <h2 className="text-3xl font-bold mb-12 reveal reveal-delay-1"
            style={{ color: isDark ? '#fff' : '#111' }}>Work Experience</h2>

          <div className="timeline">
            {experiences.map((exp, i) => (
              <div key={i} className={`timeline-item reveal reveal-delay-${i + 1}`}>
                <div className="glass-card p-6">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border flex-shrink-0"
                      style={{ borderColor: 'rgba(249,115,22,0.3)' }}>
                      <img src={exp.avatar} alt={exp.company}
                        className="w-full h-full object-cover"
                        onError={e => { (e.target as HTMLImageElement).src = ''; }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                        <h3 className="font-bold text-base" style={{ color: isDark ? '#fff' : '#111' }}>
                          {exp.role}
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{
                            background: 'rgba(249,115,22,0.1)',
                            border: '1px solid rgba(249,115,22,0.2)',
                            color: 'hsl(var(--primary))'
                          }}>
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-3" style={{ color: 'hsl(var(--primary))' }}>
                        {exp.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-4"
                    style={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }}>
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.chips.map(chip => (
                      <span key={chip} className="skill-chip text-xs">{chip}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="mt-16 reveal">
            <span className="section-label">Education</span>
            <h2 className="text-3xl font-bold mb-6 reveal reveal-delay-1"
              style={{ color: isDark ? '#fff' : '#111' }}>Education</h2>
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-lg font-bold"
                  style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)', color: 'hsl(var(--primary))' }}>
                  🎓
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1" style={{ color: isDark ? '#fff' : '#111' }}>
                    B.Tech in Information Technology
                  </h3>
                  <p className="text-sm font-medium mb-1" style={{ color: 'hsl(var(--primary))' }}>
                    NMIMS, Mumbai, Maharashtra
                  </p>
                  <p className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>
                    July 2023 – May 2027 &nbsp;·&nbsp; CGPA: 3.7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────── */}
      <section id="contact" className="relative z-10 py-20">
        <div className="container mx-auto px-6 max-w-2xl">
          <span className="section-label reveal">Contact</span>
          <h2 className="text-3xl font-bold mb-4 reveal reveal-delay-1"
            style={{ color: isDark ? '#fff' : '#111' }}>Get In Touch</h2>
          <p className="text-sm mb-10 reveal reveal-delay-2"
            style={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)' }}>
            Ready to collaborate? Let's discuss your next project or opportunity.
          </p>

          <div className="glass-card p-8 reveal reveal-delay-3">
            <form className="space-y-5" onSubmit={e => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5"
                    style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>Name</label>
                  <input id="contact-name" placeholder="Your name" className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-all"
                    style={{
                      background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                      border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
                      color: isDark ? '#fff' : '#111'
                    }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5"
                    style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>Email</label>
                  <input id="contact-email" type="email" placeholder="your@email.com" className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-all"
                    style={{
                      background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                      border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
                      color: isDark ? '#fff' : '#111'
                    }} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5"
                  style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>Message</label>
                <textarea id="contact-message" rows={4} placeholder="Tell me about your project..."
                  className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-all resize-none"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                    border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
                    color: isDark ? '#fff' : '#111'
                  }} />
              </div>
              <button type="submit" className="btn-push w-full justify-center">
                Send Message <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="flex flex-wrap justify-center gap-3 mt-8 pt-8"
              style={{ borderTop: '1px solid ' + (isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)') }}>
              <button className="btn-outline-push"
                onClick={() => window.location.href = 'mailto:atharvakhairnar1981@gmail.com'}>
                <Mail className="w-4 h-4" /> Email
              </button>
              <button className="btn-outline-push"
                onClick={() => window.open('https://linkedin.com/in/atharvakhairnar2005', '_blank')}>
                <Linkedin className="w-4 h-4" /> LinkedIn
              </button>
              <button className="btn-outline-push"
                onClick={() => window.open('https://github.com/Atharva1981', '_blank')}>
                <Github className="w-4 h-4" /> GitHub
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="relative z-10 py-8" style={{ borderTop: '1px solid ' + (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)') }}>
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }}>
            Built by Atharva with 💙 · © 2025 Atharva Khairnar. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ── Back to Top ─────────────────────────────────────────────── */}
      {scrollY > 400 && (
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <ChevronUp className="w-4 h-4" /> Back to top
        </button>
      )}

      {/* ── Floating AI Chatbot button ───────────────────────────────── */}
      <button
        id="chat-fab"
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
        style={{
          background: 'hsl(var(--primary))',
          boxShadow: '0 4px 0 rgba(180,70,0,0.6), 0 8px 24px rgba(249,115,22,0.35)'
        }}
        onClick={() => setIsChatOpen(true)}
        aria-label="Open AI chat">
        <div className="relative">
          <Brain className="w-6 h-6 text-white" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2"
            style={{ borderColor: 'hsl(var(--primary))' }} />
        </div>
      </button>

      {/* ── Robo mascot ─────────────────────────────────────────────── */}
      <img
        src="/robo.svg"
        alt="Robo"
        className="fixed bottom-4 right-[4.5rem] w-16 h-16 z-40 animate-bounce-gentle pointer-events-none"
      />

      {/* ── ChatBot ─────────────────────────────────────────────────── */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Index;
