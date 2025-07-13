import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Code, Briefcase, GraduationCap, ExternalLink, Mail, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import profileImage from '@/assets/images/adrian.png';

// Language translations
const translations = {
  sv: {
    name: "Erik Andersson",
    title: "Fullstack Utvecklare",
    subtitle: "Jag skapar moderna webbapplikationer med passion för användarupplevelse och ren kod.",
    nav: {
      projects: "Egna Projekt",
      experience: "Arbetserfarenhet", 
      education: "Utbildning"
    },
    sections: {
      projects: {
        title: "Egna Projekt",
        description: "Utforska mina senaste projekt och tekniska lösningar",
        items: [
          {
            title: "E-handelslösning",
            description: "Modern e-handelsplattform byggd med React och Node.js",
            tech: ["React", "Node.js", "MongoDB"],
            link: "#"
          },
          {
            title: "Task Manager App",
            description: "Responsiv app för projekthantering med realtidsuppdateringar",
            tech: ["TypeScript", "Firebase", "Tailwind"],
            link: "#"
          },
          {
            title: "Portfolio Dashboard",
            description: "Interaktiv dashboard för att visa projektstatistik",
            tech: ["React", "D3.js", "Express"],
            link: "#"
          }
        ]
      },
      experience: {
        title: "Arbetserfarenhet",
        description: "Min professionella resa inom webbutveckling",
        items: [
          {
            title: "Senior Utvecklare",
            company: "Tech Solutions AB",
            period: "2022 - Nuvarande",
            description: "Ledande utvecklare för moderna webbapplikationer med fokus på användarupplevelse."
          },
          {
            title: "Frontend Utvecklare",
            company: "Digital Agency",
            period: "2020 - 2022",
            description: "Utvecklade responsiva webbsidor och applikationer för olika kunder."
          },
          {
            title: "Junior Utvecklare",
            company: "StartUp Inc",
            period: "2018 - 2020",
            description: "Första professionella rollen där jag lärde mig moderna utvecklingsmetoder."
          }
        ]
      },
      education: {
        title: "Utbildning",
        description: "Min akademiska bakgrund och kontinuerliga lärande",
        items: [
          {
            title: "Kandidatexamen i Datavetenskap",
            school: "KTH Royal Institute of Technology",
            period: "2015 - 2018",
            description: "Specialisering inom webbutveckling och mjukvarudesign."
          },
          {
            title: "Fullstack Bootcamp",
            school: "Coding Academy",
            period: "2018",
            description: "Intensiv kurs i modern webbutveckling och agila metoder."
          }
        ]
      }
    },
    cta: {
      contact: "Kontakta mig",
      projects: "Se projekt",
      resume: "Ladda ner CV"
    }
  },
  en: {
    name: "Erik Andersson", 
    title: "Fullstack Developer",
    subtitle: "I create modern web applications with a passion for user experience and clean code.",
    nav: {
      projects: "Projects",
      experience: "Experience",
      education: "Education"
    },
    sections: {
      projects: {
        title: "My Projects",
        description: "Explore my latest projects and technical solutions",
        items: [
          {
            title: "E-commerce Solution",
            description: "Modern e-commerce platform built with React and Node.js",
            tech: ["React", "Node.js", "MongoDB"],
            link: "#"
          },
          {
            title: "Task Manager App",
            description: "Responsive project management app with real-time updates",
            tech: ["TypeScript", "Firebase", "Tailwind"],
            link: "#"
          },
          {
            title: "Portfolio Dashboard",
            description: "Interactive dashboard for displaying project statistics",
            tech: ["React", "D3.js", "Express"],
            link: "#"
          }
        ]
      },
      experience: {
        title: "Work Experience",
        description: "My professional journey in web development",
        items: [
          {
            title: "Senior Developer",
            company: "Tech Solutions AB",
            period: "2022 - Present",
            description: "Lead developer for modern web applications with focus on user experience."
          },
          {
            title: "Frontend Developer", 
            company: "Digital Agency",
            period: "2020 - 2022",
            description: "Developed responsive websites and applications for various clients."
          },
          {
            title: "Junior Developer",
            company: "StartUp Inc",
            period: "2018 - 2020",
            description: "First professional role where I learned modern development practices."
          }
        ]
      },
      education: {
        title: "Education",
        description: "My academic background and continuous learning",
        items: [
          {
            title: "Bachelor's in Computer Science",
            school: "KTH Royal Institute of Technology",
            period: "2015 - 2018",
            description: "Specialization in web development and software design."
          },
          {
            title: "Fullstack Bootcamp",
            school: "Coding Academy", 
            period: "2018",
            description: "Intensive course in modern web development and agile methods."
          }
        ]
      }
    },
    cta: {
      contact: "Contact me",
      projects: "View projects",
      resume: "Download CV"
    }
  }
};

const Portfolio: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'sv' | 'en'>('sv');
  const [activeSection, setActiveSection] = useState('hero');

  // Detect user language/location
  useEffect(() => {
    const detectLanguage = () => {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('sv')) {
        setLanguage('sv');
      } else {
        setLanguage('en');
      }
    };
    
    detectLanguage();
    
    // Intersection Observer for active navigation
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
    
    return () => observer.disconnect();
  }, []);

  const t = translations[language];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'sv' ? 'en' : 'sv');
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent hover:scale-105 transition-transform"
              >
                EA
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {Object.entries(t.nav).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className={`nav-link px-3 py-2 text-sm font-medium ${
                      activeSection === key ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <div className="lang-toggle">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 text-sm font-medium"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language.toUpperCase()}</span>
                </button>
                <div 
                  className={`lang-toggle-slider ${language === 'en' ? 'left-8' : 'left-1'}`}
                />
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mobile-menu-enter mobile-menu-enter-active">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              {Object.entries(t.nav).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`block px-3 py-2 text-base font-medium w-full text-left ${
                    activeSection === key ? 'text-primary bg-primary-soft' : 'text-muted-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                  <span className="bg-gradient-hero bg-clip-text text-transparent">
                    {t.name}
                  </span>
                </h1>
                <h2 className="text-xl sm:text-2xl text-muted-foreground mb-6">
                  {t.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                  {t.subtitle}
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    onClick={() => scrollToSection('projects')}
                    className="hero-gradient text-white hover:scale-105 transition-transform"
                    size="lg"
                  >
                    <Code className="w-5 h-5 mr-2" />
                    {t.cta.projects}
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="hover:scale-105 transition-transform"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    {t.cta.contact}
                  </Button>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4 mt-8 justify-center lg:justify-start">
                  <Button variant="ghost" size="sm">
                    <Github className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Linkedin className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Mail className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="w-80 h-80 mx-auto rounded-full overflow-hidden shadow-hover border-4 border-primary/20">
                  <img 
                    src={profileImage} 
                    alt={t.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-hero rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent rounded-full opacity-30 animate-pulse delay-75"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Cards - Mobile Friendly */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(t.sections).map(([key, section]) => (
              <Card 
                key={key}
                className="portfolio-card cursor-pointer"
                onClick={() => scrollToSection(key)}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary-soft rounded-lg">
                    {key === 'projects' && <Code className="w-6 h-6 text-primary" />}
                    {key === 'experience' && <Briefcase className="w-6 h-6 text-primary" />}
                    {key === 'education' && <GraduationCap className="w-6 h-6 text-primary" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                {t.sections.projects.title}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.sections.projects.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.sections.projects.items.map((project, index) => (
              <Card key={index} className="portfolio-card group">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-primary-soft text-primary text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="group-hover:text-primary">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Project
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                {t.sections.experience.title}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.sections.experience.description}
            </p>
          </div>

          <div className="space-y-8">
            {t.sections.experience.items.map((exp, index) => (
              <Card key={index} className="portfolio-card">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-1">
                    <div className="text-sm text-muted-foreground mb-2">{exp.period}</div>
                    <div className="font-medium text-primary">{exp.company}</div>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                {t.sections.education.title}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.sections.education.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.sections.education.items.map((edu, index) => (
              <Card key={index} className="portfolio-card">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">{edu.period}</div>
                  <h3 className="text-xl font-semibold mb-2">{edu.title}</h3>
                  <div className="font-medium text-primary mb-4">{edu.school}</div>
                  <p className="text-muted-foreground">{edu.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
              {t.cta.contact}
            </h3>
            <p className="text-muted-foreground mb-6">
              {language === 'sv' 
                ? "Låt oss bygga något fantastiskt tillsammans!" 
                : "Let's build something amazing together!"
              }
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="hero-gradient text-white">
                <Mail className="w-5 h-5 mr-2" />
                {t.cta.contact}
              </Button>
              <Button variant="outline">
                {t.cta.resume}
              </Button>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border text-sm text-muted-foreground">
            <p>&copy; 2024 {t.name}. {language === 'sv' ? 'Alla rättigheter förbehållna.' : 'All rights reserved.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;