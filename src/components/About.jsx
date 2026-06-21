import { useState, useEffect, useRef } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const journeySteps = [
  {
    month: "August",
    year: "2024",
    title: "Started B.Tech in CSE",
    subtitle: "SRM Institute of Science and Technology",
    desc: "Started B.Tech in Computer Science Engineering at SRM Institute of Science and Technology. This was the beginning of my programming journey and introduction to software development.",
    tags: ["Education"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
      </svg>
    )
  },
  {
    month: "",
    year: "2025",
    title: "Programming Fundamentals",
    subtitle: "Language Foundations & DSA",
    desc: "Started learning programming fundamentals including Java, Python, C, and C++. Also explored Data Structures and Algorithms to strengthen logical thinking and problem-solving skills.",
    tags: ["Java", "Python", "C", "C++", "DSA"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    )
  },
  {
    month: "November",
    year: "2025",
    title: "Built Java Chat App",
    subtitle: "Real-Time Networking",
    desc: "Built a Java Chat Application. Developed a real-time communication application using Java and networking concepts.",
    tags: ["Java", "Networking", "Socket Programming"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    )
  },
  {
    month: "January",
    year: "2026",
    title: "Artificial Intelligence Focus",
    subtitle: "Intelligent Systems",
    desc: "Started exploring Artificial Intelligence. Learned AI fundamentals and gained exposure to modern intelligent systems and emerging technologies.",
    tags: ["AI", "Machine Learning"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    )
  },
  {
    month: "March",
    year: "2026",
    title: "Electricity Billing System",
    subtitle: "Database Integrations",
    desc: "Built an Electricity Billing System. Developed a desktop application using Java, JDBC, and MySQL for customer and billing management.",
    tags: ["Java", "JDBC", "MySQL"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 10h10M7 14h6" />
      </svg>
    )
  },
  {
    month: "June",
    year: "2026",
    customDate: "June 2026 – Present",
    title: "Currently Working @ IncodeVision",
    subtitle: "Frontend Developer Intern",
    desc: "Currently working as a Frontend Developer Intern at IncodeVision, contributing to real-world frontend development projects and gaining practical industry experience.",
    contributions: [
      "Developed QuickCalc App using React.js",
      "Built a responsive Weather App",
      "Implemented frontend features using HTML, CSS, JavaScript, and React.js"
    ],
    tags: ["React.js", "JavaScript", "HTML", "CSS", "Frontend Development", "UI/UX"],
    isOngoing: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    )
  },
  {
    month: "July",
    year: "2026",
    title: "Entering 3rd Year B.Tech CSE",
    subtitle: "Continuing Education",
    desc: "Entering the third year of my Computer Science and Engineering degree while continuing to gain practical industry experience through internships and project development.",
    tags: ["Education", "B.Tech CSE"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    )
  }
];

export default function About() {
  const revealRef = useIntersectionObserver();
  const timelineRef = useRef(null);
  const endingDotRef = useRef(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [trackBottomOffset, setTrackBottomOffset] = useState(120);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress relative to the timeline container
      const elementHeight = rect.height;
      const elementTop = rect.top;
      
      const start = viewportHeight * 0.85; // triggers when it enters 85% of screen height
      const end = viewportHeight * 0.25;   // stops filling when bottom rises to 25% height
      
      const scrolled = start - elementTop;
      const totalRange = start - end + elementHeight;
      
      const progress = Math.max(0, Math.min(1, scrolled / totalRange));
      setScrollPercent(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateOffset = () => {
      if (!endingDotRef.current || !timelineRef.current) return;
      const dotRect = endingDotRef.current.getBoundingClientRect();
      const containerRect = timelineRef.current.getBoundingClientRect();
      
      // Calculate bottom offset: distance from dot center to bottom of container
      const dotCenterY = dotRect.top + dotRect.height / 2;
      const offset = containerRect.bottom - dotCenterY;
      
      setTrackBottomOffset(offset);
    };
    
    updateOffset();
    window.addEventListener('resize', updateOffset);
    const timer = setTimeout(updateOffset, 200);
    
    return () => {
      window.removeEventListener('resize', updateOffset);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="about" className="journey-timeline-section">
      <div className="section-container">
        <div className="section-header reveal" ref={revealRef}>
          <span className="section-subtitle">A story of growth, learning, and building through technology.</span>
          <h2 className="section-title gradient-text">My Journey</h2>
        </div>

        <div className="timeline-container" ref={timelineRef}>
          {/* Vertical central timeline track */}
          <div className="timeline-center-track" aria-hidden="true" style={{ bottom: `${trackBottomOffset}px` }}>
            <div 
              className="timeline-progress-fill" 
              style={{ transform: `scaleY(${scrollPercent})` }}
            ></div>
          </div>

          <div className="timeline-steps-list">
            {journeySteps.map((step, idx) => (
              <div 
                key={idx} 
                className={`timeline-step-item reveal ${idx % 2 === 0 ? 'step-left' : 'step-right'} ${step.isOngoing ? 'active-milestone' : ''}`}
                ref={revealRef}
              >
                {/* Visual node on the central vertical track */}
                <div className={`timeline-track-node ${step.isOngoing ? 'active-node' : ''}`} aria-hidden="true">
                  <div className="node-pulse"></div>
                  <span className="node-dot"></span>
                </div>

                {/* Glassmorphic timeline card */}
                <div className={`glass-card timeline-card ${step.isOngoing ? 'active-card' : ''}`}>
                  <div className="timeline-card-header">
                    <div className="timeline-card-icon" aria-hidden="true">
                      {step.icon}
                    </div>
                    <div className="timeline-card-meta">
                      <div className="timeline-card-date-badge">
                        {step.customDate ? (
                          <span className="badge-custom-date">{step.customDate}</span>
                        ) : (
                          <>
                            {step.month && <span className="badge-month">{step.month}</span>}
                            <span className="badge-year">{step.year}</span>
                          </>
                        )}
                        {step.isOngoing && (
                          <span className="status-badge-ongoing">
                            <span className="pulse-indicator"></span>
                            🚀 Ongoing
                          </span>
                        )}
                      </div>
                      <h3 className="timeline-card-title">{step.title}</h3>
                      <h4 className="timeline-card-subtitle">{step.subtitle}</h4>
                    </div>
                  </div>
                  <p className="timeline-card-desc">{step.desc}</p>

                  {step.contributions && (
                    <ul className="timeline-card-contributions">
                      {step.contributions.map((bullet, bulletIdx) => (
                        <li key={bulletIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="timeline-card-tags">
                    {step.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="glass-badge timeline-tag-badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Glowing Journey Continues Ending Indicator */}
          <div className="timeline-ending-container reveal" ref={revealRef}>
            <div className="timeline-ending-track-node" aria-hidden="true">
              <div className="node-pulse"></div>
              <span ref={endingDotRef} className="node-dot ending-node-dot"></span>
            </div>
            <div className="timeline-ending-content">
              <h4 className="journey-continues-title">Journey Continues...</h4>
              <p className="journey-continues-subtitle">Still learning, building, and growing every day.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
