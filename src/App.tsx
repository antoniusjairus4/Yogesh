import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SecondPageVideo } from './components/SecondPageVideo';

export const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [activePage, setActivePage] = useState<1 | 2>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const touchStartY = useRef<number | null>(null);

  // Wheel & Touch Event Interceptor: Locks screen at 100vh and prevents scrolling past Page 2
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent browser default scroll behavior
      e.preventDefault();

      if (isTransitioning) return;

      if (e.deltaY > 20 && activePage === 1) {
        // Scroll DOWN from Page 1 -> Transition to Page 2
        setIsTransitioning(true);
        setActivePage(2);
        setTimeout(() => setIsTransitioning(false), 800);
      } else if (e.deltaY < -20 && activePage === 2) {
        // Scroll UP from Page 2 -> Transition back to Page 1
        setIsTransitioning(true);
        setActivePage(1);
        setTimeout(() => setIsTransitioning(false), 800);
      }
      // If activePage === 2 and e.deltaY > 0: HARD STOP! Do nothing.
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null || isTransitioning) return;

      const currentY = e.touches[0].clientY;
      const diffY = touchStartY.current - currentY;

      if (diffY > 40 && activePage === 1) {
        // Swipe UP (Scroll DOWN) -> Go to Page 2
        setIsTransitioning(true);
        setActivePage(2);
        setTimeout(() => setIsTransitioning(false), 800);
        touchStartY.current = null;
      } else if (diffY < -40 && activePage === 2) {
        // Swipe DOWN (Scroll UP) -> Go back to Page 1
        setIsTransitioning(true);
        setActivePage(1);
        setTimeout(() => setIsTransitioning(false), 800);
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
    <div className="h-screen w-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950 overflow-hidden fixed inset-0">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Locked 100vh Viewport Container */}
      <main className="relative w-full h-full overflow-hidden flex items-center justify-center">
        
        {/* Page 1: Hero Section (Blurs and recedes on transition to Page 2) */}
        <motion.div
          initial={false}
          animate={{
            scale: activePage === 1 ? 1 : 0.8,
            opacity: activePage === 1 ? 1 : 0,
            filter: activePage === 1 ? 'blur(0px)' : 'blur(30px)',
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute inset-0 z-10 w-full h-full flex items-center justify-center origin-center ${
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
                setTimeout(() => setIsTransitioning(false), 800);
              }
            }}
          />
        </motion.div>

        {/* Page 2: 2nd Page Video (Emerges from inside center - Locked at 100% full screen) */}
        <motion.div
          initial={false}
          animate={{
            scale: activePage === 2 ? 1 : 0.65,
            opacity: activePage === 2 ? 1 : 0,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute inset-0 z-20 w-full h-full overflow-hidden origin-center ${
            activePage === 2 ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <SecondPageVideo />
        </motion.div>

      </main>
    </div>
  );
};

export default App;
