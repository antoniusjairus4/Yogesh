import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { FeaturedMedia } from './components/FeaturedMedia';
import { ResearchPage } from './components/ResearchPage';

export const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [activePage, setActivePage] = useState<1 | 2 | 3 | 4>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollToScuba, setScrollToScuba] = useState(false);

  const touchStartY = useRef<number | null>(null);
  const TRANSITION_DURATION = 1100;

  const handleNavigateTo = (targetPage: 1 | 2 | 3 | 4) => {
    setScrollToScuba(false);
    if (activePage === targetPage || isTransitioning) return;
    setIsTransitioning(true);
    setActivePage(targetPage);
    setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
  };

  // Intercept wheel/touch gestures on Page 1 -> Page 2 transition
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return;

      if (activePage === 1 && e.deltaY > 15) {
        e.preventDefault();
        handleNavigateTo(2);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null || isTransitioning) return;

      const currentY = e.touches[0].clientY;
      const diffY = touchStartY.current - currentY;

      if (diffY > 35 && activePage === 1) {
        handleNavigateTo(2);
        touchStartY.current = null;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [activePage, isTransitioning]);

  const handleReplayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => {
        setIsVideoEnded(false);
      }).catch((err) => {
        console.log("Playback replay error:", err);
      });
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-slate-100 font-sans selection:bg-orange-500 selection:text-white overflow-hidden fixed inset-0">
      {/* Top Navigation Bar (z-50) */}
      <Navbar activePage={activePage} onNavigatePage={handleNavigateTo} />

      {/* Locked 100vh Viewport Container */}
      <main className="relative w-full h-full overflow-hidden flex items-center justify-center">
        
        {/* Page 1: Hero Section (z-10) */}
        <motion.div
          initial={false}
          animate={{
            scale: activePage === 1 ? 1 : 0.94,
            opacity: activePage === 1 ? 1 : 0,
            filter: activePage === 1 ? 'blur(0px)' : 'blur(16px)',
          }}
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ willChange: 'transform, opacity, filter' }}
          className={`absolute inset-0 z-10 w-full h-full flex items-center justify-center origin-center transform-gpu ${
            activePage === 1 ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <Hero 
            videoRef={videoRef}
            isVideoEnded={isVideoEnded}
            setIsVideoEnded={setIsVideoEnded}
            handleReplay={handleReplayVideo}
            onDiveDeeper={() => handleNavigateTo(2)}
          />
        </motion.div>

        {/* Hardware-Accelerated Frosted Blur Overlay (z-15) */}
        <motion.div
          initial={false}
          animate={{
            opacity: isTransitioning ? 0.85 : 0,
            backdropFilter: isTransitioning ? 'blur(12px)' : 'blur(0px)',
          }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-15 bg-black/50 pointer-events-none transform-gpu"
        />

        {/* Page 2: About & Career Portfolio + SCUBA Gallery (z-20) */}
        <motion.div
          initial={false}
          animate={{
            scale: activePage === 2 ? 1 : 0.9,
            opacity: activePage === 2 ? 1 : 0,
            filter: activePage === 2 ? 'blur(0px)' : 'blur(12px)',
          }}
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ willChange: 'transform, opacity, filter' }}
          className={`absolute inset-0 z-20 w-full h-full overflow-hidden origin-center transform-gpu ${
            activePage === 2 ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <About 
            onScrollBackToHero={() => handleNavigateTo(1)} 
            onViewPressArchives={() => handleNavigateTo(3)}
            onViewResearchPage={() => handleNavigateTo(4)}
            scrollToScubaSection={scrollToScuba}
          />
        </motion.div>

        {/* Page 3: Featured in... Newspapers & Press Coverage (z-30) */}
        <motion.div
          initial={false}
          animate={{
            scale: activePage === 3 ? 1 : 0.9,
            opacity: activePage === 3 ? 1 : 0,
            filter: activePage === 3 ? 'blur(0px)' : 'blur(12px)',
          }}
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ willChange: 'transform, opacity, filter' }}
          className={`absolute inset-0 z-30 w-full h-full overflow-hidden origin-center transform-gpu ${
            activePage === 3 ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <FeaturedMedia 
            onScrollBackToAbout={() => handleNavigateTo(2)} 
          />
        </motion.div>

        {/* Fixed Library Background for Page 4 (Viewport-fixed, unaffected by scroll transforms) */}
        <div 
          className={`fixed inset-0 pointer-events-none transition-opacity duration-700 z-35 overflow-hidden ${
            activePage === 4 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src="/background_paper_publication.png" 
            alt="Library Background" 
            className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60 pointer-events-none" />
        </div>

        {/* Page 4: Scientific Research & Academic Publications Demo Page (z-40) */}
        <motion.div
          initial={false}
          animate={{
            scale: activePage === 4 ? 1 : 0.9,
            opacity: activePage === 4 ? 1 : 0,
            filter: activePage === 4 ? 'blur(0px)' : 'blur(12px)',
          }}
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ willChange: 'transform, opacity, filter' }}
          className={`absolute inset-0 z-40 w-full h-full overflow-y-auto origin-center transform-gpu ${
            activePage === 4 ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <ResearchPage 
            onBackToPortfolio={() => handleNavigateTo(2)} 
          />
        </motion.div>

      </main>
    </div>
  );
};

export default App;
