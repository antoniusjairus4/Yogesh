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

interface AnimatedStatProps {
  target: number;
  suffix?: string;
  label: string;
  delayMs?: number;
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({ target, suffix = '', label, delayMs = 0 }) => {
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(target);
      setIsFinished(true);
      return;
    }

    let animationFrameId: number;
    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds

    const timer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

        const currentCount = Math.floor(easeProgress * target);
        setCount(currentCount);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setCount(target);
          setIsFinished(true);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delayMs);

    return () => {
      clearTimeout(timer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [target, delayMs]);

  return (
    <div 
      className="flex flex-col items-center justify-center p-3 sm:py-2 sm:px-3 h-full"
      aria-label={`${target}${suffix} ${label}`}
    >
      <div 
        data-target={target}
        data-suffix={suffix}
        className="text-2xl sm:text-3xl font-extrabold font-outfit text-white tracking-tight [font-variant-numeric:tabular-nums] flex items-center justify-center"
      >
        <span className="inline-block min-w-[1.6ch] text-right">{count}</span>
        {suffix && <span className="inline-block ml-0.5">{suffix}</span>}
      </div>
      <div className="text-xs sm:text-[13px] text-slate-200 font-medium mt-1.5 opacity-90">
        {label}
      </div>
    </div>
  );
};

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

      {/* Hero Content Overlay with Shared 760px Alignment Container */}
      <div className="relative z-10 max-w-[760px] mx-auto w-full flex flex-col justify-center items-center text-center my-auto px-2 sm:px-0">
        
        {/* Name Heading with 3-Letter Active Wave Typewriter Typing Animation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 w-full text-center"
        >
          <h1 className="font-outfit font-black text-4xl xs:text-5xl sm:text-7xl md:text-[5rem] text-white tracking-tight leading-[1.12] [text-wrap:balance] py-1 flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-5">
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
              <span className="inline-block w-1 sm:w-2 h-8 sm:h-14 md:h-16 bg-sky-400 animate-pulse ml-1 align-middle rounded-full" />
            )}
          </h1>
        </motion.div>

        {/* Professional Executive Sub-Titles below the Name (Consistent 24px Gap) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-2 mb-6 text-slate-200 text-xs sm:text-base font-medium tracking-wide"
        >
          <span>Scientist E &amp; Officer-in-Charge</span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span>Zoological Survey of India (ZSI)</span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span>PADI Dive Master (DM-494151)</span>
        </motion.div>

        {/* Apple Liquid Glass Unified Wrapper Container (Bio Paragraph + 4 Metrics) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="w-full apple-liquid-glass p-6 sm:p-8 text-center"
        >
          {/* Bio Summary Paragraph - Higher Contrast & 15px Font Size */}
          <p className="text-slate-100 text-sm sm:text-[15px] leading-relaxed mb-6 font-sans font-normal max-w-2xl mx-auto">
            {PROFILE_DATA.bioSummary}
          </p>

          {/* Equal 4-Column Grid with Full-Height Dividers & Animated Stat Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 w-full divide-x-0 sm:divide-x divide-white/15 border-t border-white/10 pt-6">
            <AnimatedStat target={80} suffix="+" label="Total Publications" delayMs={0} />
            <AnimatedStat target={37} suffix="" label="SCI Indexed Papers" delayMs={120} />
            <AnimatedStat target={14} suffix="" label="Funded Projects" delayMs={240} />
            <AnimatedStat target={11} suffix="" label="Career Milestones" delayMs={360} />
          </div>
        </motion.div>


      </div>

    </section>
  );
};
