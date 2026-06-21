import { useState, useEffect } from 'react';
import { Menu, X, Mail } from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const navItems = [
  { id: 'home', label: 'About' },
  { id: 'about', label: 'Journey' },
  { id: 'skills', label: 'Tech Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Update Scroll Progress Bar
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // 2. Add Background Tint on Scroll
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // 3. Highlight Active Section
      const currentScroll = window.scrollY + 150; // offset for triggers
      
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (currentScroll >= top && currentScroll < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true"></div>

      <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-logo" onClick={() => scrollToSection('home')} style={{ cursor: 'pointer' }}>
            <span className="logo-ac">AC</span>
            <span className="logo-name">Ashvini Chourasia</span>
          </div>

          {/* Desktop Nav Items */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`nav-link-btn ${activeSection === item.id ? 'active' : ''}`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social icons on desktop */}
          <div className="navbar-socials">
            <a href="https://github.com/Ashvini-2" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub">
              <GithubIcon size={18} />
            </a>
            <a href="https://www.linkedin.com/in/ashvini-chourasia/" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
              <LinkedinIcon size={18} />
            </a>
            <a href="mailto:ashvinichourasia@gmail.com" className="social-icon-link" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>

          {/* Hamburger button */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${isOpen ? 'open' : ''}`} id="mobile-nav" aria-hidden={!isOpen}>
        <nav className="mobile-nav-container">
          <ul className="mobile-nav-list">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`mobile-nav-link-btn ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mobile-drawer-socials">
            <a href="https://github.com/Ashvini-2" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub">
              <GithubIcon size={20} />
            </a>
            <a href="https://www.linkedin.com/in/ashvini-chourasia/" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
              <LinkedinIcon size={20} />
            </a>
            <a href="mailto:ashvinichourasia@gmail.com" className="social-icon-link" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
