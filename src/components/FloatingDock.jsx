import { useState, useEffect, useRef } from 'react';
import { User, History, Code2, Award, FolderClosed, Mail } from 'lucide-react';

const dockItems = [
  { id: 'home', label: 'About', icon: <User size={20} /> },
  { id: 'about', label: 'Journey', icon: <History size={20} /> },
  { id: 'skills', label: 'Tech Stack', icon: <Code2 size={20} /> },
  { id: 'projects', label: 'Projects', icon: <FolderClosed size={20} /> },
  { id: 'certifications', label: 'Certifications', icon: <Award size={20} /> },
  { id: 'contact', label: 'Contact', icon: <Mail size={20} /> }
];

export default function FloatingDock() {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dockRef = useRef(null);
  const itemsRef = useRef([]);

  // Active section detection while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY + window.innerHeight / 2;
      
      for (const item of dockItems) {
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 70; // offset height for navigation spacing
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

  // macOS Dock Hover Scale Math
  const handleMouseMove = (e) => {
    if (!dockRef.current) return;
    const mouseX = e.clientX;
    
    // We only scale items on larger screens (desktops)
    if (window.innerWidth < 868) return;

    itemsRef.current.forEach((itemEl) => {
      if (!itemEl) return;
      const rect = itemEl.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      
      // Calculate horizontal distance from cursor center
      const distX = mouseX - itemCenterX;
      const range = 120; // radius of zoom influence
      const maxScale = 1.45; // peak scale

      // Scale factor based on absolute distance (cos-like curve)
      const scale = 1 + (maxScale - 1) * Math.max(0, 1 - Math.abs(distX) / range);
      const translateY = (scale - 1) * -16; // offset upward

      itemEl.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      itemEl.style.transition = 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)';
    });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    itemsRef.current.forEach((itemEl) => {
      if (!itemEl) return;
      itemEl.style.transform = 'scale(1) translateY(0)';
      itemEl.style.transition = 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)';
    });
  };

  return (
    <nav className="floating-dock-wrapper" aria-label="Dock Navigation">
      <div 
        ref={dockRef}
        className="floating-dock-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {dockItems.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => (itemsRef.current[idx] = el)}
            className={`dock-item-holder ${activeSection === item.id ? 'active' : ''}`}
            onMouseEnter={() => setHoveredIndex(idx)}
          >
            {/* Elegant glassmorphic tooltip */}
            <div className={`dock-tooltip ${hoveredIndex === idx ? 'visible' : ''}`}>
              {item.label}
            </div>

            <button
              onClick={() => scrollToSection(item.id)}
              className="dock-item-btn"
              aria-label={`Navigate to ${item.label}`}
            >
              <span className="dock-icon-wrapper">{item.icon}</span>
              <span className="dock-active-indicator"></span>
            </button>
          </div>
        ))}
      </div>
    </nav>
  );
}
