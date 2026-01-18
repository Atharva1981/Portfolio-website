import React, { useState, useEffect } from 'react';
import { Moon, Sun, Download, ExternalLink, Github, Mail, Linkedin, MessageCircle, Code, Database, Brain, ChevronRight, Star, Sparkles, User, Menu, X, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ChatBot from '@/components/ChatBot';
import ProjectCard from '@/components/ProjectCard';
import SkillBadge from '@/components/SkillBadge';

const Index = () => {
  const [isDark, setIsDark] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [titles, setTitles] = useState(['Data Analysis', 'Power BI', 'Machine Learning', 'SQL', 'Python', 'EDA']);
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter animation
  useEffect(() => {
    const fullText = titles[titleIndex];
    const typingSpeed = isDeleting ? 30 : 70; // Slightly faster typing
    const pauseTime = 1000; // Pause for 1 second before deleting

    const timer = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1)
      );

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex, titles]);

  const skillCategories = [
    {
      category: '🧮 Programming & Query Languages',
      items: [
        { name: 'Python', icon: Code },
        { name: 'SQL', icon: Database },
        { name: 'R', icon: Code }
      ]
    },
    {
      category: '📊 Data Analysis & Visualization',
      items: [
        { name: 'Power BI', icon: Database },
        { name: 'Tableau', icon: Database },
        { name: 'Microsoft Excel', icon: Database },
        { name: 'Pivot Tables', icon: Database },
        { name: 'Dashboards', icon: Database }
      ]
    },
    {
      category: '🧰 Libraries & Frameworks',
      items: [
        { name: 'Pandas', icon: Database },
        { name: 'NumPy', icon: Code },
        { name: 'Scikit-learn', icon: Brain },
        { name: 'TensorFlow', icon: Brain },
        { name: 'Matplotlib', icon: Database },
        { name: 'Seaborn', icon: Database }
      ]
    },
    {
      category: '🗄️ Databases & Data Handling',
      items: [
        { name: 'MySQL', icon: Database },
        { name: 'MongoDB', icon: Database }
      ]
    },
    {
      category: '🌐 Version Control & Collaboration',
      items: [
        { name: 'Git', icon: Code },
        { name: 'GitHub', icon: Code }
      ]
    },
    {
      category: '🔌 APIs & Integration',
      items: [
        { name: 'REST APIs', icon: Code },
        { name: 'Data Integration via APIs', icon: Code },
        { name: 'EDA', icon: Database }
      ]
    }
  ];

  const projects = [
    {
      title: 'India\'s Import–Export Trade Analysis Dashboard',
      description: 'Built an end-to-end Power BI dashboard analyzing India\'s trade trends (2019–2025) with 20+ DAX measures including Trade Balance and Dependency Index. Integrated Python forecasting visuals for trend prediction.',
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
      period: 'May 2025 - August 2025',
      description: 'Developed and deployed CorpVenue\'s official website using React.js and Node.js, optimizing load speed and enhancing UI/UX consistency. Applied SEO and analytics strategies to increase user engagement by 35% and reduce bounce rate by 25%.',
      avatar: '/imgs/corpvenue.jpg'
    },
    {
      role: 'Data Analyst Intern',
      company: 'IBM SkillsBuild',
      period: 'June 2024 - August 2024',
      description: 'Cleaned and analyzed 15K+ data points using Python, SQL and Excel, uncovering 5 key sustainability trends that guided actionable business insights. Built 10+ Power BI dashboards to visualize KPIs and presented data-driven recommendations that improved project decision efficiency.',
      avatar: '/imgs/ibm.png'
    }
  ];

  const certifications = [
    {
      name: 'Oracle Cloud Infrastructure (OCI) Foundations Associate',
      issuer: 'Oracle',
      year: '2025'
    },
    {
      name: 'Tata Group Data Analytics Job Simulation',
      issuer: 'Forage',
      year: '2025'
    },
    {
      name: 'Agentic AI: From Learner to Builder – Become an AI Agent Architect',
      issuer: 'IBM SkillsBuild',
      year: '2025'
    },
    {
      name: 'Machine Learning',
      issuer: 'Stanford University',
      year: '2024'
    }
  ];

  const leadership = [
    {
      name: 'Public Relations Manager',
      role: 'Ambiora Techfest 2024',
      content: 'Secured sponsorships worth ₹5,000+ by independently negotiating with local businesses. Managed sponsor communication, branding, and ensured maximum visibility during the event. Contributed to organizing a successful tech fest with 1,000+ attendees.',
      avatar: '/imgs/Screenshot 2025-12-15 142239.png'
    },
    {
      name: 'Delegate and Solution Drafting Committee Member',
      role: 'NMMUN (Model United Nations)',
      content: 'Participated as a delegate representing Turkey and engaged in structured diplomatic debates. Collaborated with fellow members to draft resolutions and formulate actionable solutions.',
      avatar: '/imgs/UN+logo.webp'
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} ultra-modern-bg transition-all duration-500 relative overflow-x-hidden`}>
      {/* Ultra Modern Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-3xl"></div>
      {/* Simplified Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow stagger-2"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-pulse-slow stagger-3"></div>
      </div>

      {/* Ultra Modern Glass Header */}
      <header className="fixed top-0 w-full glass-nav z-50 transition-all duration-300">
        <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-bold text-primary flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-blue-500">
              <img 
                src="/imgs/athatva.jpg" 
                alt="Atharva Khairnar" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
              Atharva Khairnar
            </span>
          </div>
          
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="text-sm lg:text-base text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a 
              href="/Atharva_Khairnar_Analyst (1).pdf" 
              download="Atharva_Khairnar_Analyst.pdf"
              className="text-sm lg:text-base text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group"
            >
              Download Resume
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="rounded-full glass-button bg-gradient-to-r from-blue-600 to-blue-700 hover:from-gray-700 hover:to-slate-700 hover:scale-110 transition-all duration-300 text-white h-8 w-8 sm:h-10 sm:w-10"
            >
              {isDark ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden rounded-full glass-button bg-gradient-to-r from-blue-600 to-blue-700 hover:from-gray-700 hover:to-slate-700 hover:scale-110 transition-all duration-300 text-white h-8 w-8"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              {['Home', 'About', 'Projects', 'Resume', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground hover:text-primary transition-all duration-300 py-2"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Enhanced Hero Section */}
      <section id="home" className="pt-16 sm:pt-20 min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Animated Avatar */}
            <div className="mb-6 sm:mb-8 flex justify-center">
              <div className="relative perspective-tilt">
                <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white/20 shadow-2xl animate-floating glass-morphism">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Atharva Khairnar" />
                  <AvatarFallback className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-emerald-500 text-white">
                    AK
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full animate-ping"></div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce-gentle">
                  <Sparkles className="w-4 h-4 text-white animate-rotate-slow" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse-slow"></div>
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-lg animate-floating stagger-2"></div>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 ultra-smooth-entrance">
              <span className="block text-foreground animate-scale-in stagger-1 text-base sm:text-lg md:text-xl">Hey, I'm</span>
              <span className="bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent animate-gradient holographic">
                Atharva
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl animate-bounce-gentle stagger-3">👋</span>
            </h1>
            
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 space-y-2 animate-slide-up px-2">
              <p className="text-primary font-semibold min-h-[32px]">
                {displayText}
                <span className="border-r-2 border-primary ml-1 animate-pulse"></span>
              </p>
              <p className="text-sm sm:text-base md:text-lg animate-slide-up stagger-2">I analyze data using Python, SQL, and Power BI, and apply machine learning and data science techniques to uncover trends, build dashboards, and support business decision-making through actionable insights.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-slide-up stagger-3 px-4">
              <Button variant="outline" size="lg" className="w-full sm:w-auto glass-button magnetic-hover perspective-tilt bg-gradient-to-r from-blue-600 to-blue-700 hover:from-gray-700 hover:to-slate-700 text-white border-blue-600 text-sm sm:text-base">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => setIsChatOpen(true)}
                className="w-full sm:w-auto glass-button magnetic-hover perspective-tilt bg-gradient-to-r from-blue-600 to-blue-700 hover:from-gray-700 hover:to-slate-700 text-white text-sm sm:text-base"
              >
                <Brain className="mr-2 h-4 w-4" />
                Ask AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-12 sm:py-16 md:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-foreground animate-fade-in">About Me</h2>
            
            <Card className="glass-effect mb-8 sm:mb-12 animate-fade-in-up">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                  I'm a Data Analyst with Machine Learning expertise, experienced in analyzing data, building interactive dashboards, and developing ML models to solve real-world problems.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                  Using Python, SQL, Power BI, and ML techniques, I turn data into insights that drive decision-making, efficiency, and measurable impact across business and technical domains.
                </p>
                
                <div className="flex justify-center mb-6">
                  <div className="flex items-center space-x-4 glass-effect px-6 py-3 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">Available for opportunities</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mb-8">
              <p className="text-muted-foreground text-sm sm:text-base mb-4">
                I specialize in data analysis, machine learning, and building data-driven solutions. Here are some of the technologies and tools I work with:
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                  <span className="mr-2">{category.category.split(' ')[0]}</span>
                  <span className="text-sm opacity-75">{category.category.split(' ').slice(1).join(' ')}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex}
                      className="px-3 py-1.5 bg-white/5 rounded-full border border-white/10 text-sm flex items-center gap-2 group hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300"
                      data-tooltip-content={skill.name}
                    >
                      <skill.icon className="h-3.5 w-3.5 text-blue-400" />
                      <span className="text-white/90">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-12 sm:py-16 md:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-foreground animate-fade-in">Featured Projects</h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground animate-fade-in-up px-4">
              A showcase of my work in data analysis and data science
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="animate-fade-in-up" 
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-12 sm:py-16 md:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-foreground animate-fade-in">Certifications</h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground animate-fade-in-up">
              Professional certifications and achievements
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <Card key={index} className="glass-effect animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 break-words">{cert.name}</h3>
                      <p className="text-sm sm:text-base text-emerald-500 mb-1">{cert.issuer}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{cert.year}</p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center text-white flex-shrink-0">
                      <BadgeCheck className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-12 sm:py-16 md:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-foreground animate-fade-in">Leadership & Extracurricular</h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground animate-fade-in-up">
              Activities and leadership roles
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {leadership.map((item, index) => (
              <Card key={index} className="glass-effect animate-fade-in-up" style={{ animationDelay: `${index * 300}ms` }}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                    <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                      <AvatarImage src={item.avatar} alt={item.name} />
                      <AvatarFallback className="text-xs sm:text-sm">{item.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm sm:text-base text-foreground break-words">{item.name}</p>
                      <p className="text-xs sm:text-sm text-emerald-500 break-words">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="resume" className="py-12 sm:py-16 md:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-foreground animate-fade-in">Experience</h2>
            </div>

            <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-12">
              {experiences.map((exp, index) => (
                <Card key={index} className="glass-effect animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <Avatar className="border-2 border-white/20 w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                        <AvatarImage src={exp.avatar} alt={exp.company} />
                        <AvatarFallback className="text-xs sm:text-sm">{exp.company.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                          <h3 className="text-lg sm:text-xl font-semibold text-foreground break-words">{exp.role}</h3>
                          <span className="text-primary font-medium glass-effect px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-emerald-500 mb-2 font-medium break-words">{exp.company}</p>
                        <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Education Section */}
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-foreground animate-fade-in">Education</h2>
              <Card className="glass-effect inline-block animate-fade-in-up w-full sm:w-auto">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">B.Tech in Information Technology</h3>
                  <p className="text-base sm:text-lg text-emerald-500 mb-1">NMIMS, Mumbai, Maharashtra</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">July 2023 - May 2027 | CGPA: 3.7</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-foreground animate-fade-in">Get In Touch</h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 sm:mb-12 animate-fade-in-up px-4">
              Ready to collaborate? Let's discuss your next project or opportunity.
            </p>

            <Card className="glass-effect animate-fade-in-up">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" className="mt-2 glass-effect" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" className="mt-2 glass-effect" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Tell me about your project..."
                      className="mt-2 w-full rounded-md border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    ></textarea>
                  </div>
                  <Button type="submit" size="lg" className="w-full glass-effect bg-gradient-to-r from-blue-600 to-blue-700 hover:from-gray-700 hover:to-slate-700 hover:scale-105 transition-all duration-300 text-white">
                    Send Message
                  </Button>
                </form>

                <Separator className="my-8" />

                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 sm:space-x-6">
                  <Button 
                    variant="ghost" 
                    size="lg" 
                    className="w-full sm:w-auto glass-effect bg-gradient-to-r from-blue-600 to-blue-700 hover:from-gray-700 hover:to-slate-700 hover:scale-110 transition-all duration-300 text-white text-sm sm:text-base"
                    onClick={() => window.location.href = 'mailto:atharvakhairnar1981@gmail.com'}
                  >
                    <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Email
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="lg" 
                    className="w-full sm:w-auto glass-effect bg-gradient-to-r from-blue-600 to-blue-700 hover:from-gray-700 hover:to-slate-700 hover:scale-110 transition-all duration-300 text-white text-sm sm:text-base"
                    onClick={() => window.open('https://linkedin.com/in/atharvakhairnar2005', '_blank')}
                  >
                    <Linkedin className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    LinkedIn
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="lg" 
                    className="w-full sm:w-auto glass-effect bg-gradient-to-r from-blue-600 to-blue-700 hover:from-gray-700 hover:to-slate-700 hover:scale-110 transition-all duration-300 text-white text-sm sm:text-base"
                    onClick={() => window.open('https://github.com/Atharva1981', '_blank')}
                  >
                    <Github className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    GitHub
                  </Button>
                </div>

                <div className="flex items-center justify-center mt-4 space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-muted-foreground">📍 Mumbai, India</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-8 border-t border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground mb-2">
            Built by Atharva with 💙 using React & TailwindCSS
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 Atharva Khairnar. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Enhanced Floating Chatbot Button */}
      <Button
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 rounded-full w-14 h-14 sm:w-16 sm:h-16 glass-effect bg-gradient-to-r from-blue-600 to-blue-700 hover:from-gray-700 hover:to-slate-700 shadow-xl z-50 hover:scale-110 transition-all duration-300 text-white flex items-center justify-center"
        onClick={() => setIsChatOpen(true)}
      >
        <div className="relative flex items-center justify-center">
          {/* Male Avatar SVG */}
          <svg className="h-6 w-6 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          {/* Chat indicator */}
          <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full flex items-center justify-center">
            <MessageCircle className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-white" />
          </div>
        </div>
      </Button>
      {/* Add robo.svg next to the button - visible on mobile too */}
      <img
        src="/robo.svg"
        alt="Robo"
        className="fixed bottom-4 right-20 sm:bottom-6 sm:right-20 w-16 h-16 sm:w-20 sm:h-20 animate-bounce z-50"
      />

      {/* Chatbot Component */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Index;
