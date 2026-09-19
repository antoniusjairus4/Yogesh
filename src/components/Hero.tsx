import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PROFILE_DATA } from '../data/portfolioData';

interface HeroProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isVideoEnded: boolean;
  setIsVideoEnded: (ended: boolean) => void;
  handleReplay: () => void;
}

const FULL_NAME = "Dr. J.S. Yogesh Kumar";

export const Hero: React.FC<HeroProps> = ({ videoRef, setIsVideoEnded }) => {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);

  // Typewriter effect on mount / refresh
  useEffect(() => {
    let index = 0;
    setDisplayedLength(0);
    setIsTypingDone(false);

    const timer = setInterval(() => {
      index++;
      setDisplayedLength(index);
      if (index >= FULL_NAME.length) {
        clearInterval(timer);
        setIsTypingDone(true);
      }
    }, 75);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        console.log("Autoplay policy handled");
      });
    }
  }, [videoRef]);

  // Compute words and global character indices
  const words = FULL_NAME.split(" ");
  let globalCharIndexTracker = 0;

  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 overflow-hidden bg-slate-950">
      
      {/* Video Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105 transform scale-110 origin-center"
          autoPlay
          muted
          playsInline
          loop={false}
          poster="./poster.png"
          onEnded={() => setIsVideoEnded(true)}
        >
          <source src="./Yogesh_landing.mp4" type="video/mp4" />
          Your browser does not support HTML5 video background.
        </video>

        {/* Ambient Dark Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-transparent" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col justify-center items-center text-center my-auto">
        
        {/* Name Heading with 3-Letter Active Wave Typewriter Typing Animation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 w-full text-center"
        >
          <h1 className="font-outfit font-black text-5xl xs:text-6xl sm:text-8xl md:text-9xl text-white tracking-tight leading-[1.05] flex flex-wrap justify-center items-center gap-x-3.5 sm:gap-x-6">
            {words.map((word, wIdx) => {
              const wordStartIdx = globalCharIndexTracker;
              globalCharIndexTracker += word.length + 1;

              return (
                <span key={wIdx} className="inline-block whitespace-nowrap">
                  {word.split("").map((char, cIdx) => {
                    const globalCharIdx = wordStartIdx + cIdx;
                    const isTyped = globalCharIdx < displayedLength;

                    if (!isTyped) return null;

                    // Calculate distance from active typing head
                    const distFromHead = (displayedLength - 1) - globalCharIdx;
                    const isWaveActive = !isTypingDone && distFromHead >= 0 && distFromHead < 3;

                    return (
                      <span
                        key={cIdx}
                        className={`transition-all duration-500 ease-in-out ${
                          isWaveActive ? "char-wave-active" : "name-hover-word"
                        }`}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              );
            })}

            {!isTypingDone && (
              <span className="inline-block w-1 sm:w-2 h-10 sm:h-16 md:h-20 bg-sky-400 animate-pulse ml-1 align-middle rounded-full" />
            )}
          </h1>
        </motion.div>

        {/* Professional Executive Sub-Titles below the Name */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-2 mb-6 text-slate-300 text-xs sm:text-base font-medium tracking-wide"
        >
          <span>Scientist E &amp; Officer-in-Charge</span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span>Zoological Survey of India (ZSI)</span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span>PADI Dive Master (DM-494151)</span>
        </motion.div>


        {/* Apple Liquid Glass Unified Wrapper Container (Bio Paragraph + 4 Metrics) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="max-w-3xl w-full mb-8 apple-liquid-glass p-6 sm:p-8 text-center"
        >
          {/* Bio Summary Paragraph */}
          <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed mb-6 font-sans font-normal max-w-2xl mx-auto">
            {PROFILE_DATA.bioSummary}
          </p>

          <div className="w-full h-px bg-white/10 my-6" />

          {/* 4 Metric Stats inside the Liquid Glass Wrapper */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-x-0 sm:divide-x divide-white/10">
            <div className="flex flex-col items-center justify-center p-2">
              <div className="text-2xl sm:text-3xl font-extrabold font-outfit text-white tracking-tight">80+</div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1">Total Publications</div>
            </div>

            <div className="flex flex-col items-center justify-center p-2">
              <div className="text-2xl sm:text-3xl font-extrabold font-outfit text-white tracking-tight">37</div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1">SCI Indexed Papers</div>
            </div>

            <div className="flex flex-col items-center justify-center p-2">
              <div className="text-2xl sm:text-3xl font-extrabold font-outfit text-white tracking-tight">14</div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1">Funded Projects</div>
            </div>

            <div className="flex flex-col items-center justify-center p-2">
              <div className="text-2xl sm:text-3xl font-extrabold font-outfit text-white tracking-tight">11</div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1">Career Milestones</div>
            </div>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-950/50 border border-blue-400/30 hover:scale-[1.02] active:scale-95 transition-all duration-300"
            id="explore-focus-btn"
          >
            <span>Explore Research Focus</span>
          </button>

          <button
            className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-slate-900/90 text-slate-200 border border-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-500 transition-all duration-300 backdrop-blur-md"
            id="scuba-master-btn"
          >
            <span>SCUBA Dive Master</span>
          </button>
        </motion.div>
      </div>

    </section>
  );
};
