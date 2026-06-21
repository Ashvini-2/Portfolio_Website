import { useEffect, useState } from 'react';

export default function Loader({ onLoadFinished }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Show the loader for 1.8 seconds, then trigger fade out
    const timer = setTimeout(() => {
      setFade(true);
      const fadeTimer = setTimeout(() => {
        onLoadFinished();
      }, 600); // Match CSS fade-out duration
      return () => clearTimeout(fadeTimer);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onLoadFinished]);

  return (
    <div className={`loader-container ${fade ? 'fade-out' : ''}`} role="alert" aria-busy="true">
      <div className="loader-content">
        <div className="loader-logo">
          <span className="logo-text">AC</span>
          <div className="loader-ring"></div>
        </div>
        <div className="loader-bar-container">
          <div className="loader-progress-bar"></div>
        </div>
        <p className="loader-status">Initializing Portfolio...</p>
      </div>
    </div>
  );
}
