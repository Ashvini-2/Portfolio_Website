import { useState, useEffect } from 'react';
import { ArrowRight, Code2, Terminal, Cpu, Database, Laptop, Download } from 'lucide-react';
import InteractiveImage from './InteractiveImage';

const words = [
  "Frontend Developer",
  "Java Developer",
  "React Developer",
  "Tech Enthusiast",
  "Problem Solver"
];

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const fullWord = words[currentWordIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        const nextText = fullWord.substring(0, currentText.length + 1);
        setCurrentText(nextText);
        setTypingSpeed(100);

        if (nextText === fullWord) {
          setTypingSpeed(1600);
          setIsDeleting(true);
        }
      } else {
        const nextText = fullWord.substring(0, currentText.length - 1);
        setCurrentText(nextText);
        setTypingSpeed(55);

        if (nextText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(350);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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

  // Magnetic button attraction effect
  const handleMagneticMove = (e) => {
    const btn = e.currentTarget;
    const box = btn.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Shift button toward the cursor pointer (max 12px shift)
    btn.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
  };

  const handleMagneticLeave = (e) => {
    const btn = e.currentTarget;
    btn.style.transform = 'translate3d(0, 0, 0)';
  };

  return (
    <section id="home" className="hero-section">
      {/* Floating tech background SVGs */}
      <div className="floating-icons-container" aria-hidden="true">
        <div className="floating-icon icon-react">
          <Code2 size={32} />
        </div>
        <div className="floating-icon icon-java">
          <Terminal size={32} />
        </div>
        <div className="floating-icon icon-js">
          <Cpu size={30} />
        </div>
        <div className="floating-icon icon-mysql">
          <Database size={28} />
        </div>
        <div className="floating-icon icon-git">
          <Laptop size={30} />
        </div>
      </div>

      <div className="section-container hero-container">
        <div className="hero-layout-grid">
          
          {/* Bio Details Left Side */}
          <div className="hero-left-col">
            <div className="hero-badge reveal reveal-delay-1">
              <span className="badge-glow"></span>
              <span className="badge-content">Ready for Internships & Collaborations</span>
            </div>

            <h1 className="hero-name reveal reveal-delay-2">
              Ashvini Chourasia
            </h1>

            <h2 className="hero-subtitle reveal reveal-delay-3">
              Frontend Developer Intern <span className="separator">|</span> Java Developer <span className="separator">|</span> B.Tech CSE Student
            </h2>

            <div className="typing-text-wrapper reveal reveal-delay-3" aria-live="polite">
              I am a <span className="typing-text">{currentText}</span>
              <span className="typing-cursor" aria-hidden="true">|</span>
            </div>

            <p className="hero-description reveal reveal-delay-4">
              I'm a Computer Science student passionate about Frontend development. I enjoy building scalable applications using Java, React, and modern web technologies. Currently seeking internship opportunities where I can contribute, learn, and grow as a software engineer.
            </p>

            <div className="hero-actions reveal reveal-delay-4">
              <button 
                onClick={() => scrollToSection('projects')} 
                className="btn btn-primary shine-overlay magnetic-item"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
              >
                View Projects <ArrowRight size={18} />
              </button>
              
              <a 
                href="https://drive.google.com/uc?export=download&id=1FQrB-SyToe-K82pzUm4oKNmWZ6N1HZ5k" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary shine-overlay magnetic-item"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                aria-label="Download Resume"
              >
                <Download size={18} />
                Download Resume
              </a>

              <button 
                onClick={() => scrollToSection('contact')} 
                className="btn btn-tertiary magnetic-item"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
              >
                Contact Me
              </button>
            </div>
          </div>

          {/* Interactive Profile Portrait Right Side */}
          <div className="hero-right-col reveal reveal-delay-2">
            <InteractiveImage />
          </div>

        </div>
      </div>

      {/* Mouse scroll guide */}
      <div className="scroll-down-indicator" onClick={() => scrollToSection('about')} aria-hidden="true">
        <div className="indicator-mouse">
          <div className="indicator-wheel"></div>
        </div>
        <span className="indicator-text">Scroll Down</span>
      </div>
    </section>
  );
}
