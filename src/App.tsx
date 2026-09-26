import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';

export const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [activePage, setActivePage] = useState<1 | 2>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const touchStartY = useRef<number | null>(null);
  const TRANSITION_DURATION = 1100;

  // Intercept wheel/touch gestures on Page 1 -> Page 2 transition
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return;

      if (activePage === 1 && e.deltaY > 15) {
        e.preventDefault();
        setIsTransitioning(true);
        setActivePage(2);
        setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
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
        setIsTransitioning(true);
        setActivePage(2);
        setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
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

  const handleReturnToHero = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActivePage(1);
      setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950 overflow-hidden fixed inset-0">
      {/* Top Navigation Bar (z-50) */}
      <Navbar />

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
            onDiveDeeper={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setActivePage(2);
                setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
              }
            }}
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
          className="absolute inset-0 z-15 bg-slate-950/40 pointer-events-none transform-gpu"
        />

        {/* Page 2: About & Career Portfolio (z-20) */}
        <motion.div
          initial={false}
          animate={{
            scale: activePage === 2 ? 1 : 0.85,
            opacity: activePage === 2 ? 1 : 0,
          }}
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ willChange: 'transform, opacity' }}
          className={`absolute inset-0 z-20 w-full h-full overflow-hidden origin-center transform-gpu ${
            activePage === 2 ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <About onScrollBackToHero={handleReturnToHero} />
        </motion.div>

      </main>
    </div>
  );
};

export default App;
