import React, { useRef, useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { getAssetUrl } from './utils/baseUrl';

const FeaturedMedia = React.lazy(() => import('./components/FeaturedMedia'));
const ResearchPage = React.lazy(() => import('./components/ResearchPage'));
const ScubaArchivePage = React.lazy(() => import('./components/ScubaArchivePage'));

const PageFallback: React.FC = () => (
  <div className="w-full h-full min-h-[400px] bg-[#050b14] flex flex-col items-center justify-center gap-4 text-slate-300">
    <div className="w-10 h-10 border-2 border-[#c5a880] border-t-transparent rounded-full animate-spin" />
    <span className="text-xs font-mono tracking-widest text-[#c5a880] uppercase">Loading Content...</span>
  </div>
);

export const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [activePage, setActivePage] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollToScuba, setScrollToScuba] = useState(false);
  const [selectedScubaPhotoId, setSelectedScubaPhotoId] = useState<string | null>(null);

  const touchStartY = useRef<number | null>(null);
  const TRANSITION_DURATION = 1100;

  const handleNavigateTo = (targetPage: 1 | 2 | 3 | 4 | 5, navId?: string) => {
    if (navId === 'scuba') {
      setScrollToScuba(true);
    } else {
      setScrollToScuba(false);
    }

    if (activePage === targetPage) {
      if (navId === 'scuba') {
        const el = document.getElementById('scuba-gallery');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (navId === 'contact') {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (navId === 'career') {
        const el = document.getElementById('career');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (isTransitioning) return;
    setIsTransitioning(true);
    setActivePage(targetPage);
    setTimeout(() => {
      setIsTransitioning(false);
      if (navId === 'career') {
        const el = document.getElementById('career');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (navId === 'scuba') {
        const el = document.getElementById('scuba-gallery');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (navId === 'contact') {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }, TRANSITION_DURATION);
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
            scale: activePage === 1 ? 1 : 0.96,
            opacity: activePage === 1 ? 1 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ willChange: 'transform, opacity' }}
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
            scale: activePage === 2 ? 1 : 0.95,
            opacity: activePage === 2 ? 1 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ willChange: 'transform, opacity' }}
          className={`absolute inset-0 z-20 w-full h-full overflow-hidden origin-center transform-gpu ${
            activePage === 2 ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <About 
            onScrollBackToHero={() => handleNavigateTo(1)} 
            onViewPressArchives={() => handleNavigateTo(3)}
            onViewResearchPage={() => handleNavigateTo(4)}
            onViewScubaArchive={(photoId) => {
              setSelectedScubaPhotoId(photoId || null);
              handleNavigateTo(5);
            }}
            scrollToScubaSection={scrollToScuba}
          />
        </motion.div>

        {/* Page 3: Featured in... Newspapers & Press Coverage (z-30) */}
        <motion.div
          initial={false}
          animate={{
            scale: activePage === 3 ? 1 : 0.95,
            opacity: activePage === 3 ? 1 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ willChange: 'transform, opacity' }}
          className={`absolute inset-0 z-30 w-full h-full overflow-hidden origin-center transform-gpu ${
            activePage === 3 ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <Suspense fallback={<PageFallback />}>
            <FeaturedMedia 
              onScrollBackToAbout={() => handleNavigateTo(2)} 
            />
          </Suspense>
        </motion.div>

        {/* Fixed Library Background for Page 4 (Viewport-fixed, unaffected by scroll transforms) */}
        <div 
          className={`fixed inset-0 pointer-events-none transition-opacity duration-700 z-35 overflow-hidden ${
            activePage === 4 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={getAssetUrl("/background_paper_publication.webp")} 
            alt="Library Background" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60 pointer-events-none" />
        </div>

        {/* Page 4: Scientific Research & Academic Publications Demo Page (z-40) */}
        <motion.div
          initial={false}
          animate={{
            scale: activePage === 4 ? 1 : 0.95,
            opacity: activePage === 4 ? 1 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ willChange: 'transform, opacity' }}
          className={`absolute inset-0 z-40 w-full h-full overflow-y-auto origin-center transform-gpu ${
            activePage === 4 ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <Suspense fallback={<PageFallback />}>
            <ResearchPage 
              onBackToPortfolio={() => handleNavigateTo(2)} 
            />
          </Suspense>
        </motion.div>

        {/* Fixed Shipwreck Underwater Background for Page 5 (Viewport-fixed, unaffected by scroll transforms) */}
        <div 
          className={`fixed inset-0 pointer-events-none transition-opacity duration-700 z-42 overflow-hidden ${
            activePage === 5 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={getAssetUrl("/scuba_archive_bg.webp")} 
            alt="Underwater Shipwreck Background" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/70 pointer-events-none" />
        </div>

        {/* Page 5: Full Subsurface SCUBA Image Archive Page (z-45) */}
        <motion.div
          initial={false}
          animate={{
            scale: activePage === 5 ? 1 : 0.95,
            opacity: activePage === 5 ? 1 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ willChange: 'transform, opacity' }}
          className={`absolute inset-0 z-45 w-full h-full overflow-y-auto origin-center transform-gpu ${
            activePage === 5 ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <Suspense fallback={<PageFallback />}>
            <ScubaArchivePage 
              onBackToPortfolio={() => handleNavigateTo(2)} 
              initialPhotoId={selectedScubaPhotoId}
            />
          </Suspense>
        </motion.div>

      </main>
    </div>
  );
};

export default App;
