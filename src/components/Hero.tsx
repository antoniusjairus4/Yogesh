import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PROFILE_DATA } from '../data/portfolioData';
import { ScrollIndicator } from './ScrollIndicator';

interface HeroProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isVideoEnded: boolean;
  setIsVideoEnded: (ended: boolean) => void;
  handleReplay: () => void;
  onDiveDeeper?: () => void;
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

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    let animationFrameId: number;
    let startTimestamp: number | null = null;
    const duration = 2000;

    const timer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        const currentCount = Math.floor(easeProgress * target);
        setCount(currentCount);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setCount(target);
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
      className="flex flex-col items-center justify-center p-2.5 sm:py-2 sm:px-3 h-full"
      aria-label={`${target}${suffix} ${label}`}
    >
      <div 
        data-target={target}
        data-suffix={suffix}
        className="text-xl sm:text-2xl font-extrabold font-outfit text-white tracking-tight [font-variant-numeric:tabular-nums] flex items-center justify-center"
      >
        <span className="inline-block min-w-[1.6ch] text-right">{count}</span>
        {suffix && <span className="inline-block ml-0.5">{suffix}</span>}
      </div>
      <div className="text-[11px] sm:text-xs text-slate-200 font-medium mt-1 opacity-90">
        {label}
      </div>
    </div>
  );
};

export const Hero: React.FC<HeroProps> = ({ videoRef, setIsVideoEnded, onDiveDeeper }) => {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);

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

  const words = FULL_NAME.split(" ");
  let globalCharIndexTracker = 0;

  return (
    <section id="hero" className="relative w-full h-screen min-h-screen snap-start flex-shrink-0 flex items-center justify-center py-16 sm:py-20 px-4 sm:px-8 overflow-hidden bg-slate-950">
      
      {/* Video Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105 transform scale-110 origin-center"
          autoPlay
          muted
          playsInline
          loop={false}
          poster="/poster.png"
          onEnded={() => setIsVideoEnded(true)}
        >
          <source src="/Yogesh_landing.mp4" type="video/mp4" />
          Your browser does not support HTML5 video background.
        </video>

        {/* Ambient Dark Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-transparent" />
      </div>

      {/* Hero Content Container (2-Column Flex Layout on Desktop) */}
      <div className="relative z-10 max-w-[1120px] mx-auto w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 my-auto px-2 sm:px-0 pt-10 lg:pt-0">
        
        {/* Left Column: Executive Portrait Raw Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="shrink-0 flex justify-center items-center relative group"
        >
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl">
            <img
              src="/landing_img.JPG"
              alt="Dr. J.S. Yogesh Kumar"
              className="w-56 h-72 sm:w-68 sm:h-88 md:w-76 md:h-96 lg:w-84 lg:h-[26rem] xl:w-96 xl:h-[30rem] object-cover object-top transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>

        {/* Right Column: Title, Subtitle, and Liquid Glass Card */}
        <div className="flex-grow max-w-[720px] w-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          
          {/* Name Heading with Typewriter Animation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 w-full text-center lg:text-left"
          >
            <h1 className="font-outfit font-black text-3xl xs:text-4xl sm:text-6xl md:text-6xl lg:text-[4.2rem] text-white tracking-tight leading-[1.1] py-1 flex flex-wrap justify-center lg:justify-start items-center gap-x-2.5 sm:gap-x-4">
              {words.map((word, wIdx) => {
                const wordStartIdx = globalCharIndexTracker;
                globalCharIndexTracker += word.length + 1;

                return (
                  <span key={wIdx} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, cIdx) => {
                      const globalCharIdx = wordStartIdx + cIdx;
                      const isTyped = globalCharIdx < displayedLength;

                      if (!isTyped) return null;

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
                <span className="inline-block w-1 sm:w-2 h-7 sm:h-12 bg-sky-400 animate-pulse ml-1 align-middle rounded-full" />
              )}
            </h1>
          </motion.div>

          {/* Subtitles */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1.5 mb-5 text-slate-200 text-xs sm:text-sm font-medium tracking-wide"
          >
            <span>Scientist E &amp; Officer-in-Charge</span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span>Zoological Survey of India (ZSI)</span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span>PADI Dive Master (DM-494151)</span>
          </motion.div>

          {/* Liquid Glass Card (Image REMOVED as requested with red X) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="w-full apple-liquid-glass p-5 sm:p-6 text-center lg:text-left"
          >
            <p className="text-slate-100 text-xs sm:text-sm leading-relaxed mb-4 font-sans font-normal">
              {PROFILE_DATA.bioSummary}
            </p>

            {/* Equal 4-Column Grid with Animated Stat Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 w-full divide-x-0 sm:divide-x divide-white/15 border-t border-white/10 pt-4">
              <AnimatedStat target={80} suffix="+" label="Total Publications" delayMs={0} />
              <AnimatedStat target={37} suffix="" label="SCI Indexed Papers" delayMs={120} />
              <AnimatedStat target={14} suffix="" label="Funded Projects" delayMs={240} />
              <AnimatedStat target={11} suffix="" label="Career Milestones" delayMs={360} />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <ScrollIndicator />

    </section>
  );
};
