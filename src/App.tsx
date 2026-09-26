import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';

export const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Measure scroll through a 250vh track while keeping the view locked in a 100vh frame
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"]
  });

  // Page 1 (Hero): Recedes back into depth, blurs, and fades out
  const heroScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.82]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.45], ["blur(0px)", "blur(24px)"]);

  // Page 2 (About): Emerges from inside (scale 0.7 -> 1, opacity 0 -> 1)
  const aboutScale = useTransform(scrollYProgress, [0.15, 0.55], [0.75, 1]);
  const aboutOpacity = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);

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
    <div className="w-full bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Outer 250vh Scroll Track */}
      <div ref={trackRef} className="relative h-[250vh] w-full">
        
        {/* Sticky 100vh Viewport Window (Page 1 stays pinned while Page 2 emerges) */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* Page 1: Hero Section (Background Depth Layer) */}
          <motion.div
            style={{
              scale: heroScale,
              opacity: heroOpacity,
              filter: heroBlur
            }}
            className="absolute inset-0 z-10 w-full h-full flex items-center justify-center origin-center pointer-events-auto"
          >
            <Hero 
              videoRef={videoRef}
              isVideoEnded={isVideoEnded}
              setIsVideoEnded={setIsVideoEnded}
              handleReplay={handleReplayVideo}
            />
          </motion.div>

          {/* Page 2: About & Chronological Career (Emerges from inside/center) */}
          <motion.div
            style={{
              scale: aboutScale,
              opacity: aboutOpacity,
            }}
            className="absolute inset-0 z-20 w-full h-full overflow-y-auto pt-16 bg-slate-950/90 backdrop-blur-2xl origin-center"
          >
            <About />
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default App;


