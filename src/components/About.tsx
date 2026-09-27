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
  BookOpen,
  FileText
} from 'lucide-react';
import { ScubaGallery } from './ScubaGallery';


interface AboutProps {
  onScrollBackToHero?: () => void;
  onViewPressArchives?: () => void;
  onViewResearchPage?: () => void;
  onViewScubaArchive?: (photoId?: string) => void;
  scrollToScubaSection?: boolean;
}

export const About: React.FC<AboutProps> = ({ 
  onScrollBackToHero, 
  onViewPressArchives,
  onViewResearchPage,
  onViewScubaArchive,
  scrollToScubaSection
}) => {
  const scrollableContentRef = useRef<HTMLDivElement>(null);
  const topExpeditionsRef = useRef<HTMLDivElement>(null);
  const timelineSectionRef = useRef<HTMLDivElement>(null);
  const timelineScrollRef = useRef<HTMLDivElement>(null);

  // State to track which photo card is currently hovered for focus blur effect
  const [hoveredPhotoIndex, setHoveredPhotoIndex] = React.useState<number | null>(null);

  // State to track which timeline card is dynamically centered in viewport focus
  const [activeTimelineIndex, setActiveTimelineIndex] = React.useState<number>(0);

  // Scroll to Scuba Section if requested via prop (e.g. Navbar click)
  useEffect(() => {
    if (scrollToScubaSection && scrollableContentRef.current) {
      const target = document.getElementById('scuba-gallery');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [scrollToScubaSection]);

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
  }, [onScrollBackToHero]);

  // Center Card Tracker for Timeline Track:
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
      
      {/* 1. FIXED BACKGROUND VIDEO (Stationary full-bleed behind entire page) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          className="w-full h-full object-cover object-center transform scale-105 sm:scale-110 origin-center filter brightness-110 contrast-105"
          autoPlay
          muted
          loop
          playsInline
          onEnded={(e) => {
            e.currentTarget.currentTime = 0;
            e.currentTarget.play().catch(() => {});
          }}
        >
          <source src="/videos/2nd_page.mp4" type="video/mp4" />
          Your browser does not support HTML5 video background.
        </video>

        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 z-5 bg-gradient-to-b from-slate-950/85 via-slate-950/75 via-[55%] to-slate-950/10 pointer-events-none" />
      </div>

      {/* 2. FOREGROUND SCROLLABLE CONTAINER */}
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
            <h2 className="font-outfit font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight">
              Journey and Field Work
            </h2>
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
                  className={`bg-slate-950 border border-white/10 overflow-hidden rounded-3xl group flex flex-col w-full ${getPhotoCardFocusStyle(idx)}`}
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
                  <div className="p-6 sm:p-7 bg-slate-950 border-t border-white/10 flex flex-col justify-between flex-grow">
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
                    className={`bg-slate-950 border border-white/10 overflow-hidden rounded-3xl group flex flex-col w-full ${getPhotoCardFocusStyle(photoIndex)}`}
                  >
                    <div className="relative h-[280px] sm:h-[340px] lg:h-[380px] w-full overflow-hidden shrink-0">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                    </div>

                    <div className="p-6 bg-slate-950 border-t border-white/10 flex flex-col justify-between flex-grow">
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
            <div className="flex items-center justify-between gap-4 mb-8 border-b border-white/10 pb-5">
              <div>
                <h3 className="font-outfit font-black text-2xl sm:text-4xl text-[#F8FAFC] tracking-tight">
                  Career Timeline
                </h3>
              </div>

              {/* Arrow Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTimelineIndex((prev) => Math.max(0, prev - 1))}
                  disabled={activeTimelineIndex === 0}
                  className={`p-3 rounded-2xl bg-[#050B14] text-[#F8FAFC] transition-all border border-slate-800 shadow-md cursor-pointer ${
                    activeTimelineIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:border-[#9D8DF1]/70 hover:text-[#9D8DF1]'
                  }`}
                  aria-label="Previous position"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveTimelineIndex((prev) => Math.min(CHRONOLOGICAL_CAREER_PAST_TO_PRESENT.length - 1, prev + 1))}
                  disabled={activeTimelineIndex === CHRONOLOGICAL_CAREER_PAST_TO_PRESENT.length - 1}
                  className={`p-3 rounded-2xl bg-[#050B14] text-[#F8FAFC] transition-all border border-slate-800 shadow-md cursor-pointer ${
                    activeTimelineIndex === CHRONOLOGICAL_CAREER_PAST_TO_PRESENT.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:border-[#9D8DF1]/70 hover:text-[#9D8DF1]'
                  }`}
                  aria-label="Next position"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 3D SPATIAL STAGE */}
            <div className="relative w-full h-[460px] sm:h-[500px] overflow-visible flex items-center justify-center perspective-[1200px] transform-gpu my-4 select-none px-4">
              
              {CHRONOLOGICAL_CAREER_PAST_TO_PRESENT.map((item, index) => {
                const offset = index - activeTimelineIndex;
                const absOffset = Math.abs(offset);
                const isCurrent = index === CHRONOLOGICAL_CAREER_PAST_TO_PRESENT.length - 1;
                const isSelected = offset === 0;

                if (absOffset > 2) return null;

                const getXPos = (off: number) => {
                  if (off === 0) return 0;
                  const sign = off < 0 ? -1 : 1;
                  if (Math.abs(off) === 1) return sign * 260;
                  return sign * 450;
                };

                const xPos = getXPos(offset);
                const zPos = absOffset * -120;
                const rotateYPos = offset < 0 ? 22 : offset > 0 ? -22 : 0;
                const scalePos = isSelected ? 1.0 : absOffset === 1 ? 0.88 : 0.74;
                const opacityPos = isSelected ? 1.0 : absOffset === 1 ? 0.80 : 0.45;
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
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => setActiveTimelineIndex(index)}
                    style={{
                      zIndex: zIndexPos,
                      transformStyle: 'preserve-3d',
                      willChange: 'transform, opacity, filter',
                    }}
                    className={`absolute w-[320px] sm:w-[400px] lg:w-[440px] cursor-pointer origin-center transform-gpu ${
                      isSelected ? 'pointer-events-auto' : 'pointer-events-auto hover:opacity-90'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black shrink-0 transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#4CC9F0] border-2 border-white text-[#050B14] shadow-[0_0_12px_rgba(76,201,240,0.4)] scale-110'
                          : 'bg-[#050B14] border border-slate-700 text-[#94A3B8]'
                      }`}>
                        {index + 1}
                      </span>
                      <div className={`h-[2px] flex-grow rounded-full transition-all duration-300 ${
                        isSelected 
                          ? 'bg-[#4CC9F0] shadow-[0_0_10px_rgba(76,201,240,0.3)]' 
                          : 'bg-slate-800'
                      }`} />
                    </div>

                    <div className={`p-7 sm:p-8 rounded-3xl border flex flex-col justify-between h-[340px] sm:h-[370px] transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#050B14] border-[#4CC9F0]/60 shadow-[0_25px_60px_rgba(0,0,0,0.9)] blur-none'
                        : absOffset === 1
                        ? 'bg-[#050B14] border-slate-800/90 blur-[2px] hover:border-[#9D8DF1]/50'
                        : 'bg-[#050B14] border-slate-800/70 blur-[4px] hover:border-[#9D8DF1]/50'
                    }`}>
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F8FAFC]">
                            <Calendar className="w-4 h-4 text-[#4CC9F0]" />
                            <span>{item.period}</span>
                          </div>
                          {isCurrent && (
                            <span className="px-3 py-1 rounded-md text-[11px] font-black bg-[#4CC9F0]/15 text-[#4CC9F0] border border-[#4CC9F0]/40 uppercase tracking-widest shadow-sm">
                              Current Rank
                            </span>
                          )}
                        </div>

                        <h4 className="font-outfit font-black text-xl sm:text-2xl text-[#F8FAFC] mb-3 leading-snug tracking-tight">
                          {item.title}
                        </h4>

                        <div className="flex items-start gap-2 text-xs sm:text-sm text-[#94A3B8] mb-4 font-medium">
                          <MapPin className="w-4.5 h-4.5 text-[#4CC9F0] shrink-0 mt-0.5" />
                          <span className="leading-relaxed text-[#F8FAFC]">{item.location}</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 mt-auto">
                        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-normal">
                          <strong className="text-[#F8FAFC] font-bold block mb-1">Key Focus &amp; Responsibilities:</strong>
                          {item.focus}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Page 3 Callout Banner Button */}
          {onViewPressArchives && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-16 text-center pt-8 border-t border-white/10 flex flex-col items-center gap-4"
            >
              <p className="text-white/80 text-sm font-semibold">
                Explore Press Archives &amp; National News Coverage
              </p>
              <button
                onClick={onViewPressArchives}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-outfit font-black text-base tracking-wide transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_45px_rgba(255,255,255,0.4)] cursor-pointer hover:scale-105 border border-white/80"
              >
                <span>View Featured Newspaper Clippings</span>
                <span className="text-lg">→</span>
              </button>
            </motion.div>
          )}

          {/* SCUBA Diving Visuals & Coral Image Pool */}
          <ScubaGallery onViewScubaArchive={onViewScubaArchive} />

          {/* Page 4 Research Publications Section Card Block */}
          {onViewResearchPage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-20 pt-10 border-t border-white/10"
            >
              <div className="relative overflow-hidden rounded-3xl bg-slate-900/80 border border-amber-500/20 p-8 sm:p-10 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 group hover:border-amber-500/40 transition-all duration-500">
                {/* Ambient background glow */}
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/15 transition-all duration-500" />
                
                <div className="relative z-10 max-w-2xl text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Academic Output &amp; Reprints</span>
                  </div>
                  <h3 className="font-outfit font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight mb-3">
                    Scientific Research &amp; Publications Library
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                    Access 68 peer-reviewed SCI research papers, book chapters, taxonomy monographs, and open-access full-text PDFs spanning marine invertebrate biodiversity and octocoral systematics.
                  </p>
                </div>

                <div className="relative z-10 shrink-0">
                  <button
                    onClick={onViewResearchPage}
                    className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-outfit font-black text-sm sm:text-base tracking-wide transition-all shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] cursor-pointer hover:scale-105 border border-amber-300/40"
                  >
                    <span>Browse 68 Research PDFs</span>
                    <FileText className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}



        </div>
      </div>

    </div>
  );
};


