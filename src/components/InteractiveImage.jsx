import { useState, useRef } from 'react';

export default function InteractiveImage() {
  const containerRef = useRef(null);
  const [particles] = useState(() => 
    Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2, // 2px to 6px
      delay: Math.random() * 4,
      duration: Math.random() * 6 + 4, // 4s to 10s
      left: Math.random() * 110 - 5,
      top: Math.random() * 110 - 5,
    }))
  );

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const box = container.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;

    // Convert mouse delta to 3D rotation angles (Max 12 degrees tilt)
    const factor = 12;
    const rotateX = -(y / (box.height / 2)) * factor;
    const rotateY = (x / (box.width / 2)) * factor;

    container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    container.style.transition = 'none';
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    container.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  };

  return (
    <div 
      ref={containerRef}
      className="interactive-image-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Background Soft Blue Glowing Aura */}
      <div className="avatar-glow-aura" aria-hidden="true"></div>

      {/* Subtle animated blue light rays */}
      <div className="avatar-light-rays" aria-hidden="true">
        <div className="light-ray ray-1"></div>
        <div className="light-ray ray-2"></div>
        <div className="light-ray ray-3"></div>
      </div>

      {/* Rotating conic gradient glowing ring */}
      <div className="avatar-gradient-ring" aria-hidden="true"></div>

      {/* Circular image mask frame */}
      <div className="avatar-image-frame">
        <img 
          src="/profile_avatar.png" 
          alt="Ashvini Chourasia Portrait" 
          className="avatar-image" 
        />
      </div>

      {/* 3D Orbiting Tech Icons */}
      <div className="orbit-system" aria-hidden="true">
        {/* Inner Orbit (HTML5, CSS3) - Radius: 180px, Direction: Clockwise, Speed: 20s */}
        <div className="orbit-ring orbit-ring-inner">
          {/* HTML5 */}
          <div className="orbit-icon-holder orbit-icon-1">
            <div className="orbit-icon-content" style={{ color: '#e44d26' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 2l1.5 15 5.5 3 5.5-3L19 2H5z" />
                <path d="M8 7h8m-8 3h7.5l-.5 5-3 1.5-3-1.5-.2-2" />
              </svg>
            </div>
          </div>
          {/* CSS3 */}
          <div className="orbit-icon-holder orbit-icon-2">
            <div className="orbit-icon-content" style={{ color: '#264de4' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 2l1.5 15 5.5 3 5.5-3L19 2H5z" />
                <path d="M8 7h8.5l-.2 2.5H8.5m.2 2.5h7.5l-.5 5-3.7 1.5-3.7-1.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Middle Orbit (React.js, JavaScript) - Radius: 240px, Direction: Counter-Clockwise, Speed: 28s */}
        <div className="orbit-ring orbit-ring-middle">
          {/* React.js */}
          <div className="orbit-icon-holder orbit-icon-3">
            <div className="orbit-icon-content" style={{ color: '#61dafb' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
                <circle cx="12" cy="12" r="1.8" fill="currentColor" />
              </svg>
            </div>
          </div>
          {/* JavaScript */}
          <div className="orbit-icon-holder orbit-icon-4">
            <div className="orbit-icon-content" style={{ color: '#f7df1e' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 16c.5 1 1.5 1.5 2.5 1.5s2-.5 2-1.5c0-1-1-1.5-2-2s-2-1-2-2.5c0-1.5 1-2.5 2.5-2.5s2 1 2.5 2M7.5 8H6v8" />
              </svg>
            </div>
          </div>
        </div>

        {/* Outer Orbit (Java, MySQL, GitHub) - Radius: 300px, Direction: Clockwise, Speed: 38s */}
        <div className="orbit-ring orbit-ring-outer">
          {/* Java */}
          <div className="orbit-icon-holder orbit-icon-5">
            <div className="orbit-icon-content" style={{ color: '#e76f00' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 10h11a1 1 0 0 1 1 1v4a5 5 0 0 1-5 5h-3a5 5 0 0 1-5-5v-4a1 1 0 0 1 1-1z" />
                <path d="M17 12h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2" />
                <path d="M8 7c0-1.5 1-2.5 1-4.5" strokeLinecap="round" />
                <path d="M11 7c0-1.5 1-2.5 1-4.5" strokeLinecap="round" />
                <path d="M14 7c0-1.5 1-2.5 1-4.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          {/* MySQL */}
          <div className="orbit-icon-holder orbit-icon-6">
            <div className="orbit-icon-content" style={{ color: '#38bdf8' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
              </svg>
            </div>
          </div>
          {/* GitHub */}
          <div className="orbit-icon-holder orbit-icon-7">
            <div className="orbit-icon-content" style={{ color: '#ffffff' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Orbiting particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="floating-particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
          aria-hidden="true"
        ></div>
      ))}
    </div>
  );
}
