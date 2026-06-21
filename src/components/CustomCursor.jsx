import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const spotlightRef = useRef(null);
  const mouseCoords = useRef({ x: 0, y: 0 });
  const outerCoords = useRef({ x: 0, y: 0 });
  const spotlightCoords = useRef({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };
      setIsHidden(false);
    };

    const onMouseLeave = () => {
      setIsHidden(true);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // Track active interactions globally
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive = target.closest('a') || 
                            target.closest('button') || 
                            target.closest('.social-icon-link') || 
                            target.classList.contains('nav-link-btn') || 
                            target.classList.contains('btn');
      
      const isCard = target.closest('.glass-card') || 
                     target.closest('.project-card') || 
                     target.closest('.skill-card');

      setIsHovered(!!isInteractive);
      setIsCardHovered(!!isCard);
    };

    window.addEventListener('mouseover', handleMouseOver);

    // High performance animation loop (60 FPS)
    let animFrame;
    const updatePosition = () => {
      const ease = 0.15; // Spring ease factor
      const spotlightEase = 0.055; // Slower, heavier ease for organic depth
      
      outerCoords.current.x += (mouseCoords.current.x - outerCoords.current.x) * ease;
      outerCoords.current.y += (mouseCoords.current.y - outerCoords.current.y) * ease;

      spotlightCoords.current.x += (mouseCoords.current.x - spotlightCoords.current.x) * spotlightEase;
      spotlightCoords.current.y += (mouseCoords.current.y - spotlightCoords.current.y) * spotlightEase;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${outerCoords.current.x - 20}px, ${outerCoords.current.y - 20}px, 0)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${mouseCoords.current.x - 4}px, ${mouseCoords.current.y - 4}px, 0)`;
      }
      if (spotlightRef.current) {
        // Spotlight size is 800px, so offset by 400px to center it
        spotlightRef.current.style.transform = `translate3d(${spotlightCoords.current.x - 400}px, ${spotlightCoords.current.y - 400}px, 0)`;
      }

      animFrame = requestAnimationFrame(updatePosition);
    };

    animFrame = requestAnimationFrame(updatePosition);

    // Hide default system cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animFrame);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Global electric blue interactive spotlight */}
      <div 
        ref={spotlightRef}
        className={`cursor-spotlight ${isHidden ? 'hidden' : ''}`}
        aria-hidden="true"
      ></div>

      <div 
        ref={outerRef} 
        className={`custom-cursor-outer ${isHovered ? 'hovered' : ''} ${isCardHovered ? 'card-hovered' : ''} ${isHidden ? 'hidden' : ''}`}
        aria-hidden="true"
      ></div>
      <div 
        ref={innerRef} 
        className={`custom-cursor-inner ${isHovered ? 'hovered' : ''} ${isHidden ? 'hidden' : ''}`}
        aria-hidden="true"
      ></div>
    </>
  );
}
