import { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef(null);
  const mouseCoords = useRef({ x: 0, y: 0 });
  const gridRef = useRef(null);

  useEffect(() => {
    // 1. Mouse coordinates listener for Parallax Depth Grid translation
    const handleMouseMove = (e) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };
      
      if (gridRef.current) {
        // Shift grid in opposite direction of mouse movement to create distance illusion
        const shiftX = (e.clientX - window.innerWidth / 2) * -0.018;
        const shiftY = (e.clientY - window.innerHeight / 2) * -0.018;
        gridRef.current.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 2. High-performance HTML5 Canvas Particle System
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Instantiate lightweight particle models
    const particleCount = 60;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 0.8, // 0.8px to 2.8px
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.45 + 0.15
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw interactive mouse spotlight glow
      const radialGlow = ctx.createRadialGradient(
        mouseCoords.current.x,
        mouseCoords.current.y,
        0,
        mouseCoords.current.x,
        mouseCoords.current.y,
        220 // Spotlight size
      );
      radialGlow.addColorStop(0, 'rgba(183, 110, 121, 0.08)');
      radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update stars
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Spotlight interaction: repel slightly when mouse gets close
        const dx = mouseCoords.current.x - p.x;
        const dy = mouseCoords.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 130) {
          const force = (130 - distance) / 130;
          const forceX = (dx / distance) * force * 1.5;
          const forceY = (dy / distance) * force * 1.5;
          p.x -= forceX;
          p.y -= forceY;
        }

        // Render dot
        ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="bg-mesh-container" aria-hidden="true">
      <div className="bg-mesh-blob blob-1"></div>
      <div className="bg-mesh-blob blob-2"></div>
      <div className="bg-mesh-blob blob-3"></div>
      <div ref={gridRef} className="bg-mesh-grid"></div>
      <canvas ref={canvasRef} className="bg-canvas-particles"></canvas>
    </div>
  );
}
