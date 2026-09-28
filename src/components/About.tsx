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
  FileText,
  ArrowRight,
  RotateCw,
  ExternalLink
} from 'lucide-react';
import { ScubaGallery } from './ScubaGallery';
import FlipCard from './FlipCard';
import FolderFloat from './FolderFloat';
import { PDF_PUBLICATIONS } from '../data/pdfPublicationsData';
import { PROFILE_DATA } from '../data/portfolioData';
import { getAssetUrl } from '../utils/baseUrl';


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
          <source src={getAssetUrl("/videos/2nd_page.mp4")} type="video/mp4" />
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
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-outfit font-black text-base tracking-wide border border-white/80 cursor-pointer tactile-btn"
              >
                <span>View Featured Newspaper Clippings</span>
                <span className="text-lg">→</span>
              </button>
            </motion.div>
          )}

          {/* SCUBA Diving Visuals & Coral Image Pool */}
          <ScubaGallery onViewScubaArchive={onViewScubaArchive} />

          {/* Page 4 Featured Research Publications Section */}
          {onViewResearchPage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-20 pt-12 border-t border-white/10"
            >
              {/* Section Header */}
              <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e0ad5b]/10 border border-[#e0ad5b]/30 text-[#e0ad5b] text-xs font-semibold uppercase tracking-wider mb-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Academic Output &amp; Reprints</span>
                  </div>
                  <h3 className="font-outfit font-black text-2xl sm:text-4xl text-white tracking-tight">
                    Featured Research Publications
                  </h3>
                  <p className="text-slate-300 text-sm mt-1 font-normal">
                    Selected SCI peer-reviewed papers &amp; taxonomy monographs
                  </p>
                </div>

                <button
                  onClick={onViewResearchPage}
                  className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#e0ad5b]/90 hover:bg-[#e0ad5b] text-slate-950 font-outfit font-bold text-xs tracking-wider uppercase cursor-pointer tactile-btn"
                >
                  <span>View All Papers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 3 Featured Paper Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {PDF_PUBLICATIONS.slice(0, 3).map((paper) => (
                  <div key={paper.id} className="w-full h-[360px]">
                    <FlipCard
                      axis="y"
                      flipOnClick={true}
                      draggable={true}
                      tilt={true}
                      tiltMax={10}
                      glare={true}
                      glareOpacity={0.18}
                      hoverScale={1.02}
                      perspective={1100}
                      stiffness={180}
                      damping={22}
                      radius={16}
                      background="#0a181c"
                      color="#f8fafc"
                      shadow={true}
                      shadowColor="#000000"
                      shadowOpacity={0.5}
                      ariaLabel={`Research paper: ${paper.title}`}
                      className="w-full h-full"
                      front={
                        <div className="w-full h-full p-6 flex flex-col justify-between bg-[#0a181c]/95 backdrop-blur-md border border-[#173841]/80 hover:border-[#e0ad5b]/80 rounded-2xl transition-all duration-300 shadow-[0_12px_32px_rgba(0,0,0,0.75)]">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <span className="px-2.5 py-0.5 rounded-md bg-[#10242a] text-[#e0ad5b] text-[11px] font-mono font-semibold border border-[#1b434e] uppercase tracking-wider">
                                {paper.category}
                              </span>
                              <span className="text-xs font-mono font-medium text-slate-400">
                                {paper.year}
                              </span>
                            </div>

                            <h4 className="font-serif font-bold text-base text-[#f3f1ec] leading-snug mb-2 line-clamp-3">
                              {paper.title}
                            </h4>

                            <p className="text-xs font-mono text-slate-300 font-medium mb-1 truncate">
                              {paper.authors}
                            </p>
                            <p className="text-xs font-serif italic text-slate-400 truncate mb-3">
                              {paper.journal}
                            </p>

                            <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 font-normal">
                              {paper.description}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-[#173841]/70 flex items-center justify-center">
                            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#e0ad5b]/90 font-medium tracking-wide">
                              <RotateCw className="w-3.5 h-3.5" />
                              <span>Click card to reveal PDF</span>
                            </div>
                          </div>
                        </div>
                      }
                      back={
                        <div className="w-full h-full p-6 flex flex-col items-center justify-center bg-[#061215] border border-[#e0ad5b]/70 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.85)] text-center">
                          <a
                            href={paper.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-no-flip
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (paper.pdfUrl) {
                                window.open(paper.pdfUrl, '_blank', 'noopener,noreferrer');
                              }
                            }}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#e0ad5b] hover:bg-white text-[#050e11] font-mono font-black text-xs uppercase tracking-wider cursor-pointer tactile-btn"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Open PDF</span>
                          </a>
                        </div>
                      }
                    />
                  </div>
                ))}
              </div>

              {/* Bottom Centered Small Button to View All Papers */}
              <div className="text-center pt-2">
                <button
                  onClick={onViewResearchPage}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e0ad5b] hover:bg-white text-slate-950 font-outfit font-extrabold text-xs uppercase tracking-widest cursor-pointer border border-white/50 tactile-btn"
                >
                  <span>Explore Full Research Publications Library</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Footer Contact Section with Interactive FolderFloat */}
          <motion.div
            id="contact"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-32 pt-16 border-t border-white/10 flex flex-col items-center justify-center text-center pb-32"
          >
            <h3 className="font-outfit font-black text-2xl sm:text-4xl text-white tracking-tight mb-2">
              Contact &amp; Academic Profiles
            </h3>
            <p className="text-slate-300 text-sm max-w-xl mb-2 font-normal">
              Click the directory folder below to reveal direct contact channels, phone, email, and scientific research networks.
            </p>

            <div className="relative mt-44 sm:mt-52 mb-12 flex items-center justify-center min-h-[340px]">
              <FolderFloat
                label="Contact Profiles"
                sublabel="Click to reveal 5 links"
                trigger="click"
                closeOnSelect={false}
                physics={false}
                drift={0}
                width={320}
                height={190}
                spread={520}
                lift={100}
                tilt={1}
                folderColor="#112932"
                frontColor="#0b1b21"
                paperColor="#e0ad5b"
                itemColor="#0d242c"
                itemTextColor="#f8fafc"
                labelColor="#e0ad5b"
                items={[
                  { label: `📱 Phone: ${PROFILE_DATA.mobile}`, value: "tel:+919476006830" },
                  { label: `✉️ Email: ${PROFILE_DATA.email}`, value: `mailto:${PROFILE_DATA.email}` },
                  { label: "💼 LinkedIn Profile", value: PROFILE_DATA.linkedIn },
                  { label: "🔬 ResearchGate Profile", value: PROFILE_DATA.researchGate },
                  { label: "🏛️ ZSI Scientist Profile", value: PROFILE_DATA.zsiProfile }
                ]}
                onSelect={(value) => {
                  if (!value) return;
                  if (value.startsWith('tel:') || value.startsWith('mailto:')) {
                    window.location.href = value;
                  } else if (value.startsWith('http://') || value.startsWith('https://')) {
                    window.open(value, '_blank', 'noopener,noreferrer');
                  }
                }}
              />
            </div>
          </motion.div>



        </div>
      </div>

    </div>
  );
};


