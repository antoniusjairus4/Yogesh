import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SecondPageVideo } from './components/SecondPageVideo';

export const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Measure scroll through a 200vh track while keeping the viewport locked at 100vh
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"]
  });

  // Page 1 (Hero): Recedes back into depth, blurs, and fades out
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.82]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.5], ["blur(0px)", "blur(30px)"]);

  // Page 2 (2nd Page Video): Emerges from inside (scale 0.65 -> 1, opacity 0 -> 1)
  const secondPageScale = useTransform(scrollYProgress, [0.1, 0.6], [0.65, 1]);
  const secondPageOpacity = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

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

      {/* Outer 200vh Scroll Track */}
      <div ref={trackRef} className="relative h-[200vh] w-full">
        
        {/* Sticky 100vh Viewport Window */}
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

          {/* Page 2: 2nd Page Video (Emerges from inside center - Pure Video, No Text) */}
          <motion.div
            style={{
              scale: secondPageScale,
              opacity: secondPageOpacity,
            }}
            className="absolute inset-0 z-20 w-full h-full overflow-hidden origin-center rounded-none shadow-2xl"
          >
            <SecondPageVideo />
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default App;
