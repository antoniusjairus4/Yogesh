import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CHRONOLOGICAL_CAREER_PAST_TO_PRESENT,
  FIELD_PHOTOS 
} from '../data/portfolioData';
import { 
  Briefcase, 
  MapPin, 
  Calendar,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  MoveRight,
  Sparkles
} from 'lucide-react';

interface AboutProps {
  onScrollBackToHero?: () => void;
}

export const About: React.FC<AboutProps> = ({ onScrollBackToHero }) => {
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const timelineScrollRef = useRef<HTMLDivElement>(null);

  // Convert vertical wheel scrolling directly into horizontal timeline scroll
  useEffect(() => {
    const pageEl = pageContainerRef.current;
    const timelineEl = timelineScrollRef.current;

    if (!pageEl || !timelineEl) return;

    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY || e.deltaX;
      if (Math.abs(delta) < 5) return;

      const isAtLeft = timelineEl.scrollLeft <= 5;
      const isAtRight = timelineEl.scrollLeft + timelineEl.clientWidth >= timelineEl.scrollWidth - 10;

      if (delta < 0 && isAtLeft) {
        // User scrolled UP at the start of timeline -> Trigger transition back to Hero
        if (onScrollBackToHero) {
          e.preventDefault();
          onScrollBackToHero();
        }
      } else if ((delta > 0 && !isAtRight) || (delta < 0 && !isAtLeft)) {
        // Intercept vertical scroll and translate to horizontal timeline movement
        e.preventDefault();
        timelineEl.scrollLeft += delta * 1.8;
      }
    };

    pageEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      pageEl.removeEventListener('wheel', handleWheel);
    };
  }, [onScrollBackToHero]);

  const scrollTimeline = (direction: 'left' | 'right') => {
    if (timelineScrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      timelineScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div ref={pageContainerRef} className="relative w-full h-screen overflow-hidden bg-slate-950 text-slate-100 z-20">
      
      {/* 1. STATIONARY BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          className="w-full h-full object-cover object-center transform scale-105 sm:scale-110 origin-center filter brightness-90 contrast-105"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/2nd_page.mp4" type="video/mp4" />
          Your browser does not support HTML5 video background.
        </video>

        {/* Dark Glass Overlay for High Contrast */}
        <div className="absolute inset-0 z-5 bg-slate-950/75 backdrop-blur-[3px]" />
        <div className="absolute inset-0 z-5 bg-gradient-to-b from-slate-950/95 via-slate-950/60 to-slate-950/95" />
      </div>

      {/* 2. FOREGROUND CONTENT OVERLAY */}
      <div className="relative z-10 w-full h-full overflow-y-auto pt-16 sm:pt-18 pb-20 px-4 sm:px-8 scroll-smooth custom-scrollbar">
        <div className="max-w-[1280px] mx-auto w-full">
          
          {/* Header (Moved upward slightly) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 pt-2"
          >
            <h2 className="font-outfit font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight mb-2">
              Chronological Scientific Journey
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed opacity-90">
              Scroll vertically to navigate horizontally across Dr. Yogesh's 11 career milestones (2006 → Present).
            </p>
          </motion.div>

          {/* --- 5 FIELD RESEARCH IMAGES GRID (Shifted Upward) --- */}
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-teal-400" />
                <h3 className="font-outfit font-bold text-base sm:text-lg text-white tracking-tight">
                  Field Expeditions &amp; Research Portfolio
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3.5 sm:gap-4">
              {FIELD_PHOTOS.map((photo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="apple-liquid-glass overflow-hidden rounded-xl group hover:border-teal-400/50 transition-all duration-300 flex flex-col w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-12px)] max-w-[340px] shrink-0"
                >
                  <div className="relative h-36 sm:h-40 w-full overflow-hidden shrink-0">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-teal-300 border border-teal-400/30">
                      {photo.tag}
                    </div>
                  </div>

                  <div className="p-3 flex flex-col justify-between flex-grow">
                    <h4 className="font-outfit font-bold text-xs sm:text-sm text-white mb-1 group-hover:text-teal-300 transition-colors">
                      {photo.title}
                    </h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                      {photo.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- SLEEK 11-POSITION HORIZONTAL TIMELINE (Magnifies & Centers into Viewport) --- */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 p-4 sm:p-6 rounded-3xl bg-[#060d1f]/80 backdrop-blur-2xl border border-sky-400/25 shadow-[0_0_40px_rgba(0,0,0,0.6)] hover:border-sky-400/40 transition-all duration-500 transform-gpu"
          >
            <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-400/30">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-outfit font-black text-lg sm:text-2xl text-white tracking-tight">
                    11-Position Scientific Career Journey
                  </h3>
                  <p className="text-xs text-sky-300/80 font-medium">
                    2006 (SDMRI JRF) → 2022–Present (Scientist E &amp; Officer-in-Charge)
                  </p>
                </div>
              </div>

              {/* Scroll Controls & Sleek Indicator */}
              <div className="flex items-center gap-3">
                <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-sky-300/90 font-semibold bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>Scroll vertically to navigate</span>
                  <MoveRight className="w-4 h-4 text-sky-400 animate-pulse ml-0.5" />
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => scrollTimeline('left')}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-sky-500/20 text-slate-200 hover:text-white transition-colors border border-white/15 hover:border-sky-400/40 cursor-pointer shadow-md"
                    aria-label="Scroll timeline left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollTimeline('right')}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-sky-500/20 text-slate-200 hover:text-white transition-colors border border-white/15 hover:border-sky-400/40 cursor-pointer shadow-md"
                    aria-label="Scroll timeline right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Horizontal Timeline Track */}
            <div
              ref={timelineScrollRef}
              className="flex overflow-x-auto gap-5 pb-4 pt-1 scroll-smooth snap-x snap-mandatory custom-horizontal-scrollbar relative"
            >
              {CHRONOLOGICAL_CAREER_PAST_TO_PRESENT.map((item, index) => {
                const isCurrent = index === CHRONOLOGICAL_CAREER_PAST_TO_PRESENT.length - 1;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    className="snap-center shrink-0 w-[295px] sm:w-[350px] flex flex-col group"
                  >
                    {/* Sleek Step Badge & Indicator Bar */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide ${
                        isCurrent
                          ? 'bg-teal-500/25 text-teal-300 border border-teal-400/60 shadow-[0_0_12px_rgba(45,212,191,0.5)]'
                          : 'bg-sky-500/20 text-sky-300 border border-sky-400/40'
                      }`}>
                        Step {String(index + 1).padStart(2, '0')} / 11
                      </span>
                      <div className="h-[2px] flex-grow bg-gradient-to-r from-sky-400/50 via-sky-400/20 to-transparent rounded-full" />
                    </div>

                    {/* Sleek Obsidian Glass Card */}
                    <div className={`p-5 sm:p-6 rounded-2xl bg-[#0b152d]/85 backdrop-blur-xl border transition-all duration-300 flex flex-col justify-between h-full min-h-[210px] ${
                      isCurrent 
                        ? 'border-teal-400/70 shadow-[0_0_25px_rgba(45,212,191,0.25)] bg-[#0b1b36]/90' 
                        : 'border-white/15 hover:border-sky-400/60 hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:-translate-y-1'
                    }`}>
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/15 border border-sky-400/30 text-sky-300">
                            <Calendar className="w-3.5 h-3.5 text-sky-400" />
                            {item.period}
                          </span>
                          {isCurrent && (
                            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-teal-500/25 text-teal-300 border border-teal-400/50 uppercase tracking-widest shadow-sm">
                              Current Rank
                            </span>
                          )}
                        </div>

                        <h4 className="font-outfit font-black text-base sm:text-lg text-white mb-1.5 group-hover:text-sky-300 transition-colors leading-snug tracking-tight">
                          {item.title}
                        </h4>

                        <div className="flex items-start gap-1.5 text-xs text-slate-300 mb-3.5 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item.location}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed font-normal border-t border-white/10 pt-3 mt-auto">
                        <strong className="text-slate-100 font-semibold">Key Focus:</strong> {item.focus}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>

    </div>
  );
};
