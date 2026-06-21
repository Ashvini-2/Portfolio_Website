import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Background from './components/Background';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import FloatingDock from './components/FloatingDock';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Interactive starfield background */}
      <Background />

      {/* Cybernetic glowing cursor trail */}
      <CustomCursor />

      {isLoading ? (
        <Loader onLoadFinished={() => setIsLoading(false)} />
      ) : (
        <div className="portfolio-app-wrapper">
          {/* Sticky Navbar with scroll progress */}
          <Navbar />

          {/* Primary Floating Navigation Dock */}
          <FloatingDock />

          <main id="main-content">
            {/* Sections separated by Awwwards-style cyber dividers */}
            <Hero />
            <div className="cyber-divider" aria-hidden="true"></div>
            
            <About />
            <div className="cyber-divider" aria-hidden="true"></div>
            
            <Skills />
            <div className="cyber-divider" aria-hidden="true"></div>
            
            <Projects />
            <div className="cyber-divider" aria-hidden="true"></div>
            
            <Certifications />
            <div className="cyber-divider" aria-hidden="true"></div>
            
            <Contact />
          </main>

          {/* Footer with branding and socials */}
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
