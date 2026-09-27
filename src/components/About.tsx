import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CHRONOLOGICAL_CAREER_PAST_TO_PRESENT,
  FIELD_PHOTOS 
} from '../data/portfolioData';
import { 
  MapPin, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowDown
} from 'lucide-react';

interface AboutProps {
  onScrollBackToHero?: () => void;
  onScrollToNextPage?: () => void;
}

export const About: React.FC<AboutProps> = ({ onScrollBackToHero, onScrollToNextPage }) => {
  const scrollableContentRef = useRef<HTMLDivElement>(null);
  const topExpeditionsRef = useRef<HTMLDivElement>(null);
  const timelineSectionRef = useRef<HTMLDivElement>(null);
  const timelineScrollRef = useRef<HTMLDivElement>(null);

  // State to track which photo card is currently hovered for focus blur effect
  const [hoveredPhotoIndex, setHoveredPhotoIndex] = React.useState<number | null>(null);

  // State to track which timeline card is dynamically centered in viewport focus
  const [activeTimelineIndex, setActiveTimelineIndex] = React.useState<number>(0);

  // Natural Vertical Scroll Listener:
  useEffect(() => {
    const contentEl = scrollableContentRef.current;
    if (!contentEl) return;

    const handleWheel = (e: WheelEvent) => {
      // Scroll up to Hero when at top of About page
      if (e.deltaY < -15 && contentEl.scrollTop <= 5) {
        if (onScrollBackToHero) {
          e.preventDefault();
          onScrollBackToHero();
        }
      }
    };

    contentEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      contentEl.removeEventListener('wheel', handleWheel);
    };
  }, [onScrollBackToHero, onScrollToNextPage]);

  // Center Card Tracker for Timeline Track:
  // Dynamically determines which horizontal card is aligned in the track center
  useEffect(() => {
    const scrollEl = timelineScrollRef.current;
    if (!scrollEl) return;

    const updateActiveIndex = () => {
      const containerCenter = scrollEl.scrollLeft + scrollEl.clientWidth / 2;
      const children = Array.from(scrollEl.children) as HTMLElement[];
      if (children.length === 0) return;

      let closestIndex = 0;
      let minDistance = Infinity;

      children.forEach((child, i) => {
        const childCenter = child.offsetLeft + child.clientWidth / 2;
        const distance = Math.abs(containerCenter - childCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      });

      setActiveTimelineIndex(closestIndex);
    };

    updateActiveIndex();
    scrollEl.addEventListener('scroll', updateActiveIndex, { passive: true });
    window.addEventListener('resize', updateActiveIndex, { passive: true });

    return () => {
      scrollEl.removeEventListener('scroll', updateActiveIndex);
      window.removeEventListener('resize', updateActiveIndex);
    };
  }, []);

  const scrollToCardIndex = (index: number) => {
    const scrollEl = timelineScrollRef.current;
    if (!scrollEl) return;
    const children = Array.from(scrollEl.children) as HTMLElement[];
    const targetIndex = Math.max(0, Math.min(children.length - 1, index));
    if (children[targetIndex]) {
      const card = children[targetIndex];
      const targetScrollLeft = card.offsetLeft - (scrollEl.clientWidth - card.clientWidth) / 2;
      scrollEl.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
    }
  };

  // Helper for dynamic hover blur focus styling across all 5 photo cards
  const getPhotoCardFocusStyle = (photoIndex: number) => {
    const isHovered = hoveredPhotoIndex === photoIndex;
    const isBlurred = hoveredPhotoIndex !== null && !isHovered;

    if (isBlurred) {
      return 'blur-[6px] opacity-40 scale-[0.97] brightness-75 grayscale-[20%] border-white/10 transition-all duration-500 ease-out cursor-pointer';
    }
    if (isHovered) {
      return 'blur-none opacity-100 scale-[1.03] border-white/50 shadow-[0_0_35px_rgba(255,255,255,0.12)] z-20 transition-all duration-500 ease-out cursor-pointer';
    }
    return 'blur-none opacity-100 scale-100 border-white/15 hover:border-white/40 transition-all duration-500 ease-out cursor-pointer';
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950 text-slate-100 z-20">
      
      {/* 1. STATIONARY BACKGROUND VIDEO (Fixed edge-to-edge) */}
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

        {/* Dark Glass Overlay for High Contrast & Readability */}
        <div className="absolute inset-0 z-5 bg-slate-950/75 backdrop-blur-[3px]" />
        <div className="absolute inset-0 z-5 bg-gradient-to-b from-slate-950/95 via-slate-950/60 to-slate-950/95" />
      </div>

      {/* 2. FOREGROUND SCROLLABLE CONTENT */}
      <div 
        ref={scrollableContentRef} 
        className="relative z-10 w-full h-full overflow-y-auto pt-24 pb-36 px-4 sm:px-8 lg:px-12 scroll-smooth custom-scrollbar"
      >
        <div className="max-w-[1400px] mx-auto w-full">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-10 pt-2"
          >
            <h2 className="font-outfit font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight mb-4">
              Scientific Journey &amp; Field Work
            </h2>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed opacity-90 max-w-2xl mx-auto">
              Scroll down to view the large field expedition photos and explore all 11 chronological career positions.
            </p>
            
            {/* Scroll Down Indicator */}
            <div className="flex items-center justify-center gap-2 text-xs text-white/90 mt-4 font-semibold animate-pulse">
              <span>Scroll down to explore</span>
              <ArrowDown className="w-4 h-4 text-orange-500" />
            </div>
          </motion.div>

          {/* --- 5 FIELD EXPEDITIONS IMAGES GRID (MUCH LARGER & PROMINENT) --- */}
          <div ref={topExpeditionsRef} className="mb-24">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div>
                <h3 className="font-outfit font-black text-2xl sm:text-3xl text-white tracking-tight">
                  Field Expeditions &amp; Deep-Sea Documentation
                </h3>
              </div>
            </div>

            {/* Row 1: 2 HUGE Showcase Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {FIELD_PHOTOS.slice(0, 2).map((photo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  onMouseEnter={() => setHoveredPhotoIndex(idx)}
                  onMouseLeave={() => setHoveredPhotoIndex(null)}
                  className={`apple-liquid-glass overflow-hidden rounded-3xl group flex flex-col w-full ${getPhotoCardFocusStyle(idx)}`}
                >
                  {/* Image Container */}
                  <div className="relative h-[340px] sm:h-[420px] lg:h-[480px] w-full overflow-hidden shrink-0">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  </div>

                  {/* Caption */}
                  <div className="p-6 sm:p-7 bg-slate-950/80 backdrop-blur-xl border-t border-white/10 flex flex-col justify-between flex-grow">
                    <h4 className="font-outfit font-black text-xl sm:text-2xl text-white mb-2 transition-colors">
                      {photo.title}
                    </h4>
                    <p className="text-sm text-slate-200 leading-relaxed font-normal">
                      {photo.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Row 2: 3 Large Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FIELD_PHOTOS.slice(2, 5).map((photo, idx) => {
                const photoIndex = idx + 2;
                return (
                  <motion.div
                    key={photoIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: photoIndex * 0.1 }}
                    onMouseEnter={() => setHoveredPhotoIndex(photoIndex)}
                    onMouseLeave={() => setHoveredPhotoIndex(null)}
                    className={`apple-liquid-glass overflow-hidden rounded-3xl group flex flex-col w-full ${getPhotoCardFocusStyle(photoIndex)}`}
                  >
                    <div className="relative h-[280px] sm:h-[340px] lg:h-[380px] w-full overflow-hidden shrink-0">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                    </div>

                    <div className="p-6 bg-slate-950/80 backdrop-blur-xl border-t border-white/10 flex flex-col justify-between flex-grow">
                      <h4 className="font-outfit font-bold text-lg sm:text-xl text-white mb-2 transition-colors">
                        {photo.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        {photo.caption}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* --- 11-POSITION FUTURISTIC 3D COVERFLOW SPATIAL SLIDER --- */}
          <div ref={timelineSectionRef} className="py-8 my-12 relative">
            
            {/* Timeline Header & HUD Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-white/10 pb-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/20 border border-orange-500/50 text-orange-400 text-xs font-mono tracking-wider uppercase mb-2">
                  <span>Interactive 3D Spatial Showcase</span>
                </div>
                <h3 className="font-outfit font-black text-2xl sm:text-4xl text-white tracking-tight">
                  11-Position Scientific Career Journey
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-medium mt-1">
                  2006 (SDMRI JRF) → 2022–Present (Scientist E &amp; Officer-in-Charge)
                </p>
              </div>

              {/* HUD Position Counter & Controls */}
              <div className="flex items-center gap-4">
                {/* Step Counter Pill */}
                <div className="px-4 py-2 rounded-2xl bg-slate-900/90 border border-white/20 text-white font-mono text-xs font-bold tracking-wider flex items-center gap-2 shadow-xl backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                  <span>POSITION {String(activeTimelineIndex + 1).padStart(2, '0')} / 11</span>
                </div>

                {/* Arrow Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTimelineIndex((prev) => Math.max(0, prev - 1))}
                    disabled={activeTimelineIndex === 0}
                    className={`p-3 rounded-2xl bg-slate-900/90 text-white transition-all border border-white/20 shadow-xl backdrop-blur-md cursor-pointer ${
                      activeTimelineIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-orange-600/40 hover:border-orange-500'
                    }`}
                    aria-label="Previous position"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={() => setActiveTimelineIndex((prev) => Math.min(CHRONOLOGICAL_CAREER_PAST_TO_PRESENT.length - 1, prev + 1))}
                    disabled={activeTimelineIndex === CHRONOLOGICAL_CAREER_PAST_TO_PRESENT.length - 1}
                    className={`p-3 rounded-2xl bg-slate-900/90 text-white transition-all border border-white/20 shadow-xl backdrop-blur-md cursor-pointer ${
                      activeTimelineIndex === CHRONOLOGICAL_CAREER_PAST_TO_PRESENT.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-orange-600/40 hover:border-orange-500'
                    }`}
                    aria-label="Next position"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* 3D SPATIAL STAGE (Hardware Accelerated Perspective Depth) */}
            <div className="relative w-full h-[460px] sm:h-[500px] overflow-hidden flex items-center justify-center perspective-[1200px] transform-gpu my-4 select-none">
              
              {CHRONOLOGICAL_CAREER_PAST_TO_PRESENT.map((item, index) => {
                const offset = index - activeTimelineIndex;
                const absOffset = Math.abs(offset);
                const isCurrent = index === CHRONOLOGICAL_CAREER_PAST_TO_PRESENT.length - 1;
                const isSelected = offset === 0;

                // Render cards within range [-3, 3] for maximum performance & visual elegance
                if (absOffset > 3) return null;

                // 3D Spatial Math:
                const xPos = offset * 340; // Horizontal displacement (px)
                const zPos = absOffset * -160; // Depth displacement (px)
                const rotateYPos = offset < 0 ? 25 : offset > 0 ? -25 : 0; // 3D Y-rotation angle
                const scalePos = isSelected ? 1.05 : Math.max(0.72, 1 - absOffset * 0.14);
                const opacityPos = isSelected ? 1 : absOffset === 1 ? 0.65 : absOffset === 2 ? 0.3 : 0;
                const zIndexPos = 30 - absOffset * 5;

                return (
                  <motion.div
                    key={index}
                    initial={false}
                    animate={{
                      x: xPos,
                      z: zPos,
                      rotateY: rotateYPos,
                      scale: scalePos,
                      opacity: opacityPos,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => setActiveTimelineIndex(index)}
                    style={{
                      zIndex: zIndexPos,
                      transformStyle: 'preserve-3d',
                      willChange: 'transform, opacity',
                    }}
                    className={`absolute w-[330px] sm:w-[420px] lg:w-[460px] cursor-pointer origin-center transform-gpu ${
                      isSelected ? 'pointer-events-auto' : 'pointer-events-auto hover:opacity-90'
                    }`}
                  >
                    {/* Top Step Number Indicator Line */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0 transition-all duration-300 ${
                        isSelected
                          ? 'bg-orange-600 border-2 border-orange-400 shadow-[0_0_20px_rgba(234,88,12,0.8)] scale-110'
                          : 'bg-slate-900 border border-white/20'
                      }`}>
                        {index + 1}
                      </span>
                      <div className={`h-[2px] flex-grow rounded-full transition-all duration-300 ${
                        isSelected 
                          ? 'bg-gradient-to-r from-orange-500 via-orange-500/50 to-transparent shadow-[0_0_12px_rgba(234,88,12,0.5)]' 
                          : 'bg-white/10'
                      }`} />
                    </div>

                    {/* Obsidian Glass 3D Card Surface */}
                    <div className={`p-7 sm:p-8 rounded-3xl backdrop-blur-2xl border flex flex-col justify-between h-[340px] sm:h-[370px] transition-all duration-300 ${
                      isSelected
                        ? 'bg-slate-950/95 border-orange-500/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]'
                        : 'bg-slate-950/80 border-white/15 hover:border-white/40'
                    }`}>
                      <div>
                        {/* Period Tag & Rank Badge */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                          <div className="inline-flex items-center gap-2 text-xs font-bold text-white">
                            <Calendar className="w-4 h-4 text-orange-500" />
                            <span>{item.period}</span>
                          </div>
                          {isCurrent && (
                            <span className="px-3 py-1 rounded-md text-[11px] font-black bg-orange-600/30 text-white border border-orange-500/70 uppercase tracking-widest shadow-md">
                              Current Rank
                            </span>
                          )}
                        </div>

                        {/* Position Title */}
                        <h4 className="font-outfit font-black text-xl sm:text-2xl text-white mb-3 leading-snug tracking-tight">
                          {item.title}
                        </h4>

                        {/* Location */}
                        <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 mb-4 font-medium">
                          <MapPin className="w-4.5 h-4.5 text-orange-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed text-white">{item.location}</span>
                        </div>
                      </div>

                      {/* Key Focus Box */}
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mt-auto">
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                          <strong className="text-white font-bold block mb-1">Key Focus &amp; Responsibilities:</strong>
                          {item.focus}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* FUTURISTIC 11-NODE SPINE TIMELINE PROGRESS BAR */}
            <div className="mt-6 pt-4 border-t border-white/10 max-w-4xl mx-auto w-full px-4">
              <div className="relative flex items-center justify-between">
                {/* Background Line */}
                <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2 z-0" />
                
                {/* Active Progress Line */}
                <motion.div 
                  className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-orange-500 to-orange-400 -translate-y-1/2 z-0 shadow-[0_0_10px_rgba(234,88,12,0.8)]"
                  initial={false}
                  animate={{
                    width: `${(activeTimelineIndex / (CHRONOLOGICAL_CAREER_PAST_TO_PRESENT.length - 1)) * 100}%`
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* 11 Node Buttons */}
                {CHRONOLOGICAL_CAREER_PAST_TO_PRESENT.map((_, nodeIdx) => {
                  const isActive = nodeIdx === activeTimelineIndex;
                  const isPassed = nodeIdx < activeTimelineIndex;

                  return (
                    <button
                      key={nodeIdx}
                      onClick={() => setActiveTimelineIndex(nodeIdx)}
                      className={`relative z-10 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer ${
                        isActive
                          ? 'w-8 h-8 bg-orange-600 border-2 border-orange-400 text-white font-black text-xs shadow-[0_0_15px_rgba(234,88,12,0.8)] scale-110'
                          : isPassed
                          ? 'w-6 h-6 bg-orange-500/60 border border-orange-400 text-white font-bold text-[10px]'
                          : 'w-6 h-6 bg-slate-900 border border-white/20 text-white/50 hover:border-white/50 text-[10px]'
                      }`}
                      aria-label={`Jump to position ${nodeIdx + 1}`}
                    >
                      {nodeIdx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Page 3 Transition Callout Banner */}
          {onScrollToNextPage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-16 text-center pt-8 border-t border-white/10"
            >
              <p className="text-white/80 text-sm mb-4 font-semibold">
                Explore Press Archives &amp; National News Coverage
              </p>
              <button
                onClick={onScrollToNextPage}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-outfit font-black text-base tracking-wide transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_45px_rgba(255,255,255,0.4)] cursor-pointer hover:scale-105 border border-white/80"
              >
                <span>View Featured Newspaper Clippings</span>
                <span className="text-lg">→</span>
              </button>
            </motion.div>
          )}

        </div>
      </div>

    </div>
  );
};

