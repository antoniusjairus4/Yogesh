import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SecondPageVideo } from './components/SecondPageVideo';

export const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Smooth scroll progress mapped strictly between Page 1 (0) and Page 2 (1)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"]
  });

  // Page 1 (Hero): Recedes back into depth, blurs, and fades out cleanly
  const heroScale = useTransform(scrollYProgress, [0, 0.9], [1, 0.8], { clamp: true });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0], { clamp: true });
  const heroBlur = useTransform(scrollYProgress, [0, 0.9], ["blur(0px)", "blur(30px)"], { clamp: true });

  // Page 2 (2nd Page Video): Emerges from inside center and locks at 100% full screen
  const secondPageScale = useTransform(scrollYProgress, [0.1, 0.95], [0.65, 1], { clamp: true });
  const secondPageOpacity = useTransform(scrollYProgress, [0.1, 0.95], [0, 1], { clamp: true });

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

      {/* Track capped strictly at 200vh so scrolling terminates cleanly at Page 2 */}
      <div ref={trackRef} className="relative h-[200vh] w-full">
        
        {/* Pinned 100vh Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* Page 1: Hero Section (Background Depth Layer) */}
          <motion.div
            style={{
              scale: heroScale,
              opacity: heroOpacity,
              filter: heroBlur
            }}
            className="absolute inset-0 z-10 w-full h-full flex items-center justify-center origin-center"
          >
            <Hero 
              videoRef={videoRef}
              isVideoEnded={isVideoEnded}
              setIsVideoEnded={setIsVideoEnded}
              handleReplay={handleReplayVideo}
            />
          </motion.div>

          {/* Page 2: 2nd Page Video (Emerges from inside center and locks at full screen) */}
          <motion.div
            style={{
              scale: secondPageScale,
              opacity: secondPageOpacity,
            }}
            className="absolute inset-0 z-20 w-full h-full overflow-hidden origin-center"
          >
            <SecondPageVideo />
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default App;
