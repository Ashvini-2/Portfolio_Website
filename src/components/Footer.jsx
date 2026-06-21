import { Mail, ArrowUp } from 'lucide-react';

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

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleMagneticMove = (e) => {
    const btn = e.currentTarget;
    const box = btn.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    btn.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
  };

  const handleMagneticLeave = (e) => {
    const btn = e.currentTarget;
    btn.style.transform = 'translate3d(0, 0, 0)';
  };

  return (
    <footer className="footer-container">
      <div className="footer-content-inner">
        <div className="footer-top-row">
          <div className="footer-branding">
            <span className="footer-logo">AC</span>
            <div>
              <h3 className="footer-name">Ashvini Chourasia</h3>
              <p className="footer-subtitle">Frontend Developer Intern | Java Developer</p>
            </div>
          </div>

          <div className="footer-social-links">
            <a 
              href="https://github.com/Ashvini-2" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-link footer-social" 
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/in/ashvini-chourasia/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-link footer-social" 
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
            <a 
              href="mailto:ashvinichourasia@gmail.com" 
              className="social-icon-link footer-social" 
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom-row">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Ashvini Chourasia. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop} 
            className="back-to-top-btn magnetic-item" 
            aria-label="Scroll to Top"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
