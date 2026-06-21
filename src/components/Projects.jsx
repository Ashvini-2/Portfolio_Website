import { MessageSquare, Receipt, CloudSun, Calculator, ExternalLink, Info } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

import chatAppImg from '../assets/chat_app.png';
import billingAppImg from '../assets/billing_app.png';
import weatherAppImg from '../assets/weather_app.png';
import calcAppImg from '../assets/calc_app.png';

const GithubIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Projects() {
  const revealRef = useIntersectionObserver({ threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  const projectsData = [
    {
      title: "Java Chat Application",
      description: "A real-time chat application developed using Java networking and socket programming concepts, enabling instant communication between connected users.",
      image: chatAppImg,
      icon: <MessageSquare size={20} className="proj-icon-blue" />,
      technologies: ["Java", "Socket Programming"],
      links: [
        { label: "GitHub", url: "https://github.com/Ashvini-2/ChatttingApplication", icon: <GithubIcon size={16} /> }
      ]
    },
    {
      title: "Electricity Billing System",
      description: "A desktop-based electricity billing management system built using Java, JDBC, and MySQL for customer management, bill generation, and record maintenance.",
      image: billingAppImg,
      icon: <Receipt size={20} className="proj-icon-cyan" />,
      technologies: ["Java", "JDBC", "MySQL"],
      links: [
        { label: "GitHub", url: "https://github.com/Ashvini-2/Electricity-Billing-System.git", icon: <GithubIcon size={16} /> }
      ]
    },
    {
      title: "Weather App",
      description: "A responsive weather application developed during my frontend development internship. The application fetches real-time weather data and displays temperature, humidity, wind speed, pressure, and visibility in a clean modern interface.",
      image: weatherAppImg,
      icon: <CloudSun size={20} className="proj-icon-lightblue" />,
      technologies: ["React.js", "HTML", "CSS", "JavaScript"],
      links: [
        { label: "Live Demo", url: "https://weatherapp-mu-vert.vercel.app/", icon: <ExternalLink size={16} /> },
        { label: "GitHub", url: "https://github.com/Ashvini-2/Weather_App", icon: <GithubIcon size={16} />, secondary: true }
      ]
    },
    {
      title: "QuickCalc",
      description: "A modern calculator application developed during my frontend development internship featuring responsive design, intuitive user experience, and clean UI.",
      image: calcAppImg,
      icon: <Calculator size={20} className="proj-icon-yellow" />,
      technologies: ["React.js", "HTML", "CSS", "JavaScript"],
      links: [
        { label: "Live Demo", url: "https://quick-calc-six.vercel.app/", icon: <ExternalLink size={16} /> },
        { label: "GitHub", url: "https://github.com/Ashvini-2/QuickCalc", icon: <GithubIcon size={16} />, secondary: true }
      ]
    }
  ];

  // 3D Tilt Card Math with Reflection position tracking
  const handleCardTilt = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    // Set mouse position properties for CSS reflection gradient
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    
    const rotateX = -((y - box.height / 2) / (box.height / 2)) * 6; // Max 6 deg
    const rotateY = ((x - box.width / 2) / (box.width / 2)) * 6;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleCardReset = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  // Magnetic Button Math
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
    <section id="projects" className="projects-section">
      <div className="section-container">
        <div className="section-header reveal" ref={revealRef}>
          <span className="section-subtitle">My Creative Works</span>
          <h2 className="section-title gradient-text">Projects That I Built</h2>
        </div>

        <div className="projects-grid">
          {projectsData.map((project, idx) => (
            <div 
              key={idx} 
              className={`glass-card project-card reveal reveal-delay-${idx + 1}`}
              ref={revealRef}
              onMouseMove={handleCardTilt}
              onMouseLeave={handleCardReset}
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), border-color 0.3s, box-shadow 0.3s'
              }}
            >
              {/* Dynamic reflection overlay */}
              <div className="project-card-reflection" aria-hidden="true"></div>

              {/* Animated corner border glow */}
              <div className="project-card-border-glow" aria-hidden="true"></div>

              {/* Project Image Wrapper */}
              <div className="project-image-wrapper" style={{ transform: 'translateZ(20px)' }}>
                <img src={project.image} alt={project.title} className="project-mockup-img" />
                <div className="project-image-overlay"></div>
                <div className="project-card-badge">
                  {project.icon}
                </div>
              </div>

              {/* Card Contents */}
              <div className="project-card-content">
                <h3 className="project-title" style={{ transform: 'translateZ(25px)' }}>
                  {project.title}
                </h3>
                
                <p className="project-description" style={{ transform: 'translateZ(15px)' }}>
                  {project.description}
                </p>

                <div className="project-tech-list" style={{ transform: 'translateZ(20px)' }}>
                  {project.technologies.map((tech, techIdx) => (
                    <span key={techIdx} className="glass-badge project-tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-actions" style={{ transform: 'translateZ(30px)' }}>
                  {project.links.map((link, linkIdx) => (
                    <a 
                      key={linkIdx} 
                      href={link.url}
                      onClick={(e) => {
                        if (link.url === '#') {
                          e.preventDefault();
                          alert(`More details on ${project.title} (placeholder action)`);
                        }
                      }}
                      target={link.url !== '#' ? "_blank" : undefined}
                      rel={link.url !== '#' ? "noopener noreferrer" : undefined}
                      className={`btn ${link.secondary ? 'btn-secondary' : 'btn-primary'} project-btn shine-overlay magnetic-item`}
                      onMouseMove={handleMagneticMove}
                      onMouseLeave={handleMagneticLeave}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
