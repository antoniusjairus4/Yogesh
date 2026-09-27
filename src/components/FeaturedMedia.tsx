import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NEWSPAPER_FEATURES, NewspaperFeature } from '../data/newspaperData';
import { 
  FileText, 
  Calendar, 
  MapPin, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  Compass, 
  Users, 
  Maximize2,
  ArrowLeft,
  Anchor,
  BookOpen,
  Sparkles,
  ScrollText,
  RotateCw,
  MousePointerClick
} from 'lucide-react';

interface FeaturedMediaProps {
  onScrollBackToAbout?: () => void;
}

export const FeaturedMedia: React.FC<FeaturedMediaProps> = ({ onScrollBackToAbout }) => {
  const [selectedFeature, setSelectedFeature] = useState<NewspaperFeature | null>(null);
  const [isZoomedImage, setIsZoomedImage] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);

  // Scroll progress state continuous from 0.0 (0%) to 1.0 (100%)
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Landmark feature (scan0021 - Sea Turtle Protection) is elevated to Featured Spotlight Hero
  const featuredSpotlight = NEWSPAPER_FEATURES[6]; // scan0021 (Turtle Conservation landmark)
  const remainingFeatures = NEWSPAPER_FEATURES.slice(0, 6); // 6 cards (3x2 grid)

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Track scroll position of scrollableRef to drive scrollProgress (0.0 to 1.0)
  useEffect(() => {
    const el = scrollableRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (isReducedMotion) {
        setScrollProgress(1);
        return;
      }
      // Total scroll distance (in pixels) required for complete 3D paper un-crumpling
      const maxUnfoldScroll = 700;
      const currentScroll = el.scrollTop;
      const progress = Math.min(1, Math.max(0, currentScroll / maxUnfoldScroll));
      setScrollProgress(progress);
    };

    handleScroll();
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [isReducedMotion]);

  // Backward navigation listener when user scrolls UP at top of Page 3
  useEffect(() => {
    const el = scrollableRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (selectedFeature) return; // Don't trigger page transition when modal is open

      // If scrolling UP at top of Page 3 -> navigate back to Page 2 (About)
      if (e.deltaY < -15 && el.scrollTop <= 5) {
        if (onScrollBackToAbout) {
          e.preventDefault();
          onScrollBackToAbout();
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, [onScrollBackToAbout, selectedFeature]);

  // Keyboard shortcut listener (Escape, Arrow Left, Arrow Right)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedFeature) return;
      if (e.key === 'Escape') {
        if (isZoomedImage) {
          setIsZoomedImage(false);
        } else {
          setSelectedFeature(null);
        }
      } else if (e.key === 'ArrowLeft') {
        navigateFeature('prev');
      } else if (e.key === 'ArrowRight') {
        navigateFeature('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFeature, isZoomedImage]);

  const navigateFeature = (direction: 'prev' | 'next') => {
    if (!selectedFeature) return;
    const currentIndex = NEWSPAPER_FEATURES.findIndex(f => f.id === selectedFeature.id);
    if (currentIndex === -1) return;

    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex < 0) nextIndex = NEWSPAPER_FEATURES.length - 1;
    if (nextIndex >= NEWSPAPER_FEATURES.length) nextIndex = 0;

    setSelectedFeature(NEWSPAPER_FEATURES[nextIndex]);
    setIsZoomedImage(false);
  };

  // Click handler to advance un-folding step smoothly
  const handleUnfoldStepClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!scrollableRef.current) return;
    const current = scrollableRef.current.scrollTop;
    const targetScroll = current >= 650 ? 0 : current + 350;
    scrollableRef.current.scrollTo({
      top: Math.min(700, targetScroll),
      behavior: 'smooth'
    });
  };

  // Continuous 1% -> 100% scroll values:
  const p = isReducedMotion ? 1 : scrollProgress;
  const progressPercent = Math.round(p * 100);

  // Unfolding progress phase (0.0 to 1.0 until 85% scroll)
  const unfoldPhase = isReducedMotion ? 1 : Math.min(1, p / 0.85);

  // 3D Crumpled Paper mesh transformation math:
  // Starts as a 3D crushed ball (scale 0.35, high 3D angles, rounded orb shape), flattens smoothly to crisp paper sheet
  const paperScale = isReducedMotion ? 1 : 0.35 + 0.65 * Math.pow(unfoldPhase, 0.8);
  const paperRotateX = isReducedMotion ? 0 : (1 - unfoldPhase) * 72; // 72deg -> 0deg
  const paperRotateY = isReducedMotion ? 0 : (1 - unfoldPhase) * -42; // -42deg -> 0deg
  const paperRotateZ = isReducedMotion ? 0 : (1 - unfoldPhase) * 28; // 28deg -> 0deg
  const paperRadius = isReducedMotion ? 16 : 16 + (1 - unfoldPhase) * 110; // 126px (crumpled orb) -> 16px (sheet)

  // 3D Origami Panels (unfold from 140deg inward fold down to 0deg flat)
  const panelAngle = isReducedMotion ? 0 : (1 - unfoldPhase) * 140;
  const panelTranslateZ = isReducedMotion ? 0 : (1 - unfoldPhase) * 65;
  const panelOpacity = isReducedMotion ? 0 : Math.max(0, 1 - unfoldPhase * 1.15);

  // Creases & Crinkle shadow line opacity
  const creaseOpacity = isReducedMotion ? 0 : Math.max(0, (1 - unfoldPhase) * 0.95);

  // Stage Fade out when paper reaches 100% flat (0.85 -> 1.00)
  const stageOpacity = isReducedMotion ? 0 : (p >= 0.85 ? Math.max(0, 1 - (p - 0.85) / 0.15) : 1);

  // Press Archive Wall reveal (ONLY visible when paper reaches 75% -> 100%, ZERO overlap before!)
  const wallOpacity = isReducedMotion ? 1 : (p >= 0.75 ? Math.min(1, (p - 0.75) / 0.25) : 0);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden text-stone-200 z-20 font-sans select-none bg-[#070605]"
    >
      
      {/* RICH ARCHIVAL RESEARCH DESK WORKSPACE BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src="/research_table_bg.jpg" 
          alt="Research Desk Workspace Surface" 
          className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070605]/85 via-[#070605]/35 to-[#070605]/75" />
      </div>

      {/* FIXED TOP NAVIGATION BAR & REALTIME SCROLL PROGRESS BADGE */}
      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-8 py-4 bg-gradient-to-b from-[#070605]/95 via-[#070605]/70 to-transparent pointer-events-auto">
        {onScrollBackToAbout ? (
          <button
            onClick={onScrollBackToAbout}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#141416]/90 hover:bg-[#1a1a1e] text-stone-300 hover:text-white border border-stone-800 transition-colors text-xs font-medium cursor-pointer shadow-md backdrop-blur-md"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Back to Scientific Journey</span>
          </button>
        ) : <div />}

        {/* Realtime 1% -> 100% Un-crumpling Progress Badge */}
        {!isReducedMotion && (
          <button
            onClick={handleUnfoldStepClick}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#161410]/95 hover:bg-[#201d17] border border-[#c5a880]/50 text-[#c5a880] text-xs font-mono tracking-wider shadow-xl backdrop-blur-md transition-colors cursor-pointer"
          >
            <span className={`w-2.5 h-2.5 rounded-full ${p >= 0.95 ? 'bg-emerald-400' : 'bg-[#c5a880] animate-pulse'}`} />
            <span className="font-bold">
              {p >= 0.95 
                ? 'ARCHIVAL NEWSPAPER UN-CRUMPLED (100%)' 
                : `UN-CRUMPLING NEWSPAPER: ${progressPercent}% (SCROLL DOWN OR CLICK HERE ↓)`}
            </span>
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3D CRUMPLED PAPER STAGE (STICKY VIEWPORT - 100% PASS-THROUGH POINTERS)     */}
      {/* ========================================================================= */}
      {stageOpacity > 0 && (
        <div 
          style={{ opacity: stageOpacity }}
          className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none perspective-[1400px] px-4 pt-10"
        >
          {/* Scroll Guidance Header */}
          {p < 0.85 && (
            <div className="text-center mb-6 z-30 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a1714]/90 border border-[#c5a880]/40 text-[#c5a880] text-xs font-mono tracking-widest uppercase mb-3 shadow-lg">
                <ScrollText className="w-4 h-4 text-[#c5a880]" />
                <span>3D CRUMPLED ARCHIVAL PRESS SHEET</span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-4xl text-[#f3f1ec] tracking-tight">
                Dr. J.S. Yogesh Kumar&apos;s Press Archive
              </h2>
              <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c5a880]/20 border border-[#c5a880]/50 text-[#c5a880] text-xs font-mono">
                <RotateCw className="w-3.5 h-3.5 animate-spin text-[#c5a880]" />
                <span>Scroll down or click anywhere to un-crumple paper (1% → 100%)</span>
              </div>
            </div>
          )}

          {/* 3D CRUMPLED PAPER CONTAINER (PASS THROUGH POINTER EVENTS TO SCROLLBAR) */}
          <motion.div
            style={{
              scale: paperScale,
              rotateX: paperRotateX,
              rotateY: paperRotateY,
              rotateZ: paperRotateZ,
              borderRadius: `${paperRadius}px`,
              transformStyle: 'preserve-3d',
              willChange: 'transform, opacity, border-radius',
            }}
            className="relative w-[340px] sm:w-[560px] lg:w-[760px] h-[360px] sm:h-[490px] bg-[#1a1713] border-2 border-[#c5a880]/70 shadow-[0_40px_120px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col p-6 sm:p-8 transition-shadow duration-300 pointer-events-none"
          >
            {/* Scanned Landmark Newspaper Image Backdrop */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img 
                src={featuredSpotlight.image} 
                alt="Archival Press Clipping Preview" 
                className="w-full h-full object-cover object-top filter brightness-[0.75] contrast-[1.1] sepia-[0.35]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a] via-[#161410]/70 to-[#241f19]/80 mix-blend-multiply" />
            </div>

            {/* Deep Crumple Crease & Shadow Overlay */}
            <div 
              style={{ opacity: creaseOpacity }} 
              className="absolute inset-0 pointer-events-none z-20"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_47%,rgba(0,0,0,0.98)_50%,transparent_53%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_47%,rgba(0,0,0,0.98)_50%,transparent_53%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_47%,rgba(0,0,0,0.92)_50%,transparent_53%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.95)_100%)]" />
              <div className="absolute top-1/2 left-0 right-0 h-[6px] bg-black/95 -translate-y-1/2" />
              <div className="absolute left-1/2 top-0 bottom-0 w-[6px] bg-black/95 -translate-x-1/2" />
            </div>

            {/* 4 ARTICULATED 3D ORIGAMI PAPER PANELS (Unfold from 140deg inward down to 0deg) */}
            <motion.div
              style={{
                rotateX: panelAngle,
                rotateY: -panelAngle,
                translateZ: panelTranslateZ,
                transformOrigin: 'top left',
                opacity: panelOpacity,
              }}
              className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#221e18] border-r-2 border-b-2 border-[#c5a880]/60 shadow-2xl z-30 flex items-center justify-center p-3 pointer-events-none"
            >
              <div className="text-center font-mono text-xs text-[#c5a880]">
                <Anchor className="w-6 h-6 text-[#c5a880]/80 mx-auto mb-1" />
                <p className="font-bold text-stone-200">ZSI FIELD LOG 2006</p>
                <p className="text-[10px] text-stone-400">SCUBA Diving Records</p>
              </div>
            </motion.div>

            <motion.div
              style={{
                rotateX: panelAngle,
                rotateY: panelAngle,
                translateZ: panelTranslateZ,
                transformOrigin: 'top right',
                opacity: panelOpacity,
              }}
              className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#1e1a14] border-l-2 border-b-2 border-[#c5a880]/60 shadow-2xl z-30 flex items-center justify-center p-3 pointer-events-none"
            >
              <div className="text-center font-mono text-xs text-[#c5a880]">
                <FileText className="w-6 h-6 text-[#c5a880]/80 mx-auto mb-1" />
                <p className="font-bold text-stone-200">TAMIL DAILIES</p>
                <p className="text-[10px] text-stone-400">Dinakaran &amp; Thanthi</p>
              </div>
            </motion.div>

            <motion.div
              style={{
                rotateX: -panelAngle,
                rotateY: -panelAngle,
                translateZ: panelTranslateZ,
                transformOrigin: 'bottom left',
                opacity: panelOpacity,
              }}
              className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#201c16] border-r-2 border-t-2 border-[#c5a880]/60 shadow-2xl z-30 flex items-center justify-center p-3 pointer-events-none"
            >
              <div className="text-center font-mono text-xs text-[#c5a880]">
                <BookOpen className="w-6 h-6 text-[#c5a880]/80 mx-auto mb-1" />
                <p className="font-bold text-stone-200">CORAL REEF SURVEY</p>
                <p className="text-[10px] text-stone-400">Gulf of Mannar &amp; Andaman</p>
              </div>
            </motion.div>

            <motion.div
              style={{
                rotateX: -panelAngle,
                rotateY: panelAngle,
                translateZ: panelTranslateZ,
                transformOrigin: 'bottom right',
                opacity: panelOpacity,
              }}
              className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#1c1812] border-l-2 border-t-2 border-[#c5a880]/60 shadow-2xl z-30 flex items-center justify-center p-3 pointer-events-none"
            >
              <div className="text-center font-mono text-xs text-[#c5a880]">
                <Sparkles className="w-6 h-6 text-[#c5a880]/80 mx-auto mb-1" />
                <p className="font-bold text-stone-200">SEA TURTLE PROJECT</p>
                <p className="text-[10px] text-stone-400">57-Day Hatchling Record</p>
              </div>
            </motion.div>

            {/* REAL NEWSPAPER HEADLINES PRINTED ON THE SHEET */}
            <div className="relative z-10 h-full flex flex-col justify-between text-left p-2 pointer-events-none">
              <div className="flex items-center justify-between border-b border-[#c5a880]/40 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#09090b]/90 border border-[#c5a880]/60 text-[#c5a880] font-mono text-[10px] sm:text-xs tracking-wider uppercase font-bold">
                    Official ZSI Press Record
                  </span>
                  <span className="text-[10px] font-mono text-stone-300 hidden sm:inline">
                    {featuredSpotlight.date}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#c5a880] block font-bold">
                    {featuredSpotlight.newspaper}
                  </span>
                </div>
              </div>

              <div className="my-auto py-2">
                <h3 className="font-serif font-bold text-xl sm:text-3xl text-amber-50 drop-shadow-md leading-tight mb-2">
                  {featuredSpotlight.headlineTamil}
                </h3>
                <h4 className="font-serif italic text-xs sm:text-base text-[#c5a880] font-medium leading-snug max-w-xl">
                  {featuredSpotlight.headlineEnglish}
                </h4>
              </div>

              <div className="pt-3 border-t border-[#c5a880]/40 flex items-center justify-between text-[11px] font-mono text-stone-300">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span className="truncate max-w-[200px] sm:max-w-xs">{featuredSpotlight.location}</span>
                </div>
                <div className="px-3 py-1 rounded bg-[#c5a880]/20 border border-[#c5a880]/40 text-[#c5a880] font-bold text-[10px] tracking-wider uppercase">
                  {progressPercent}% Un-crumpled
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MAIN NATIVE SCROLL CONTAINER DRIVING 3D UN-CRUMPLING & PRESS ARCHIVE WALL  */}
      {/* ========================================================================= */}
      <div 
        ref={scrollableRef}
        onClick={p < 0.85 ? handleUnfoldStepClick : undefined}
        className={`relative z-20 w-full h-full overflow-y-auto pt-24 pb-36 px-4 sm:px-8 lg:px-12 custom-scrollbar ${
          p < 0.85 ? 'cursor-pointer' : 'cursor-default'
        }`}
      >
        <div className="max-w-[1400px] mx-auto w-full">
          
          {/* SPACER FOR 3D UN-CRUMPLING SCROLL RANGE (0% -> 85%) */}
          <div className="h-[700px] w-full pointer-events-none" />

          {/* ========================================================================= */}
          {/* PRESS ARCHIVE WALL (REVEALED ONLY AT 85% -> 100% - ZERO OVERLAP!)          */}
          {/* ========================================================================= */}
          {wallOpacity > 0 && (
            <motion.div 
              style={{
                opacity: wallOpacity,
                willChange: 'opacity',
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full rounded-2xl p-6 sm:p-10 transition-colors bg-[#12110e] border border-[#c5a880]/30 shadow-[0_20px_60px_rgba(0,0,0,0.85)] pointer-events-auto"
            >
              
              {/* Header Title Section */}
              <div className="mb-10">
                <div className="text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-stone-800 bg-[#121215] text-[#c5a880] text-[11px] font-mono tracking-widest uppercase mb-4 shadow-sm">
                    <FileText className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>Media Coverage &amp; Press Archives</span>
                  </div>
                  
                  <h1 className="font-serif font-bold text-4xl sm:text-6xl lg:text-7xl text-[#f3f1ec] tracking-tight mb-2 leading-none">
                    Featured in...
                  </h1>
                  
                  <h2 className="font-serif font-normal text-xl sm:text-2xl text-[#c5a880] tracking-wide italic mb-4">
                    Newspapers &amp; Press Highlights
                  </h2>
                  
                  <p className="text-stone-400 text-sm sm:text-base max-w-3xl leading-relaxed font-normal border-l-2 border-[#c5a880]/30 pl-4 py-0.5">
                    Exploration of major Tamil and English national news publications documenting Dr. J.S. Yogesh Kumar&apos;s marine ecosystem research, pioneer SCUBA diving training for fishermen youth, and 57-day sea turtle conservation milestones. Click any clipping below for full article translation and details.
                  </p>
                </div>
              </div>

              {/* --- FEATURED SPOTLIGHT HERO CARD (1 FULL WIDTH LANDMARK FEATURE) --- */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFeature(featuredSpotlight);
                }}
                className="group mb-12 rounded-xl bg-[#121215] border border-stone-800 hover:border-[#c5a880]/70 overflow-hidden flex flex-col lg:flex-row cursor-pointer transition-colors duration-300 shadow-xl"
              >
                {/* Image Column */}
                <div className="lg:w-1/2 w-full h-[320px] sm:h-[380px] lg:h-auto relative bg-[#09090b] overflow-hidden shrink-0 border-b lg:border-b-0 lg:border-r border-stone-800">
                  <img
                    src={featuredSpotlight.image}
                    alt={featuredSpotlight.headlineEnglish}
                    className="w-full h-full object-cover object-top filter brightness-90 group-hover:brightness-100 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#121215]/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded bg-[#09090b]/90 border border-[#c5a880]/50 text-[#c5a880] font-mono text-[11px] tracking-wider uppercase">
                      Featured Headline
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#09090b]/90 border border-stone-800 text-stone-300 font-mono text-[11px] tracking-wider uppercase">
                      {featuredSpotlight.date}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 p-2 rounded bg-[#09090b]/90 text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-stone-800">
                    <Maximize2 className="w-4 h-4 text-[#c5a880]" />
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:w-1/2 w-full p-7 sm:p-9 flex flex-col justify-between bg-[#121215]">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#c5a880] mb-3">
                      <FileText className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                      <span>{featuredSpotlight.newspaper}</span>
                      <span className="text-stone-600">•</span>
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="text-stone-400 truncate">{featuredSpotlight.location}</span>
                    </div>

                    <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#f3f1ec] mb-3 leading-snug group-hover:text-[#c5a880] transition-colors">
                      {featuredSpotlight.headlineTamil}
                    </h3>

                    <h4 className="font-sans font-medium text-sm sm:text-base text-stone-300 mb-4 leading-relaxed">
                      {featuredSpotlight.headlineEnglish}
                    </h4>

                    <p className="text-xs sm:text-sm text-stone-400 leading-relaxed mb-6 font-normal border-t border-stone-800/80 pt-4">
                      {featuredSpotlight.summary}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-mono font-medium text-[#c5a880] group-hover:text-white transition-colors border-t border-stone-800/50">
                    <span>READ LANDMARK SEA TURTLE CONSERVATION FEATURE</span>
                    <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>

              {/* Section Subheader for 6-Card Grid */}
              <div className="mb-6 flex items-center justify-between border-b border-stone-800 pb-3">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#f3f1ec] tracking-tight">
                  Press Archives &amp; SCUBA Training Milestones
                </h3>
                <span className="text-xs font-mono text-stone-500">6 Publications</span>
              </div>

              {/* --- PERFECT 3x2 EVEN GRID (6 CARDS) --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFeature(feature);
                    }}
                    className="group relative rounded-xl bg-[#121215] border border-stone-800 hover:border-stone-500 overflow-hidden flex flex-col cursor-pointer transition-colors duration-300 shadow-md"
                  >
                    {/* Image Container with Framing */}
                    <div className="relative h-[270px] w-full overflow-hidden bg-[#09090b] shrink-0 border-b border-stone-800">
                      <img
                        src={feature.image}
                        alt={feature.headlineEnglish}
                        className="w-full h-full object-cover object-top filter brightness-90 group-hover:brightness-100 transition-all duration-500"
                      />
                      
                      {/* Publication Badge */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded bg-[#09090b]/90 border border-stone-800 text-stone-200 font-mono text-[11px] tracking-wide">
                          {feature.newspaper}
                        </span>
                        <span className="px-2.5 py-1 rounded bg-[#09090b]/90 border border-stone-800 text-[#c5a880] font-mono text-[11px] tracking-wider uppercase">
                          {feature.date}
                        </span>
                      </div>

                      {/* Zoom Icon Hint */}
                      <div className="absolute bottom-3 right-3 p-1.5 rounded bg-[#09090b]/90 text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-stone-800">
                        <Maximize2 className="w-4 h-4 text-[#c5a880]" />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow bg-[#121215]">
                      <div>
                        {/* Location Badge */}
                        <div className="flex items-center gap-2 text-xs font-mono text-stone-400 mb-2.5">
                          <MapPin className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                          <span className="truncate">{feature.location}</span>
                        </div>

                        {/* Tamil Headline */}
                        <h3 className="font-serif font-bold text-base sm:text-lg text-[#f3f1ec] mb-2 leading-snug group-hover:text-[#c5a880] transition-colors">
                          {feature.headlineTamil}
                        </h3>

                        {/* English Headline */}
                        <h4 className="font-sans font-normal text-xs sm:text-sm text-stone-300 mb-3 line-clamp-2 leading-relaxed">
                          {feature.headlineEnglish}
                        </h4>

                        {/* Summary */}
                        <p className="text-xs text-stone-400 leading-relaxed line-clamp-3 mb-4 font-normal border-t border-stone-800/70 pt-2.5">
                          {feature.summary}
                        </p>
                      </div>

                      {/* Action Link */}
                      <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#c5a880] group-hover:text-white transition-colors border-t border-stone-800/50">
                        <span>READ ARTICLE &amp; STORY</span>
                        <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          )}

        </div>
      </div>

      {/* --- 2. DEDICATED NEWSPAPER ARTICLE READER MODAL ("NEW PAGE" PER CLIPPING) --- */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedFeature(null)}
            className="fixed inset-0 z-50 bg-[#09090b]/95 flex items-center justify-center p-3 sm:p-6 overflow-hidden"
          >
            {/* Modal Inner Container */}
            <motion.div
              initial={{ scale: 0.96, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl max-h-[92vh] bg-[#121215] border border-stone-700 rounded-xl overflow-hidden flex flex-col lg:flex-row text-stone-200"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-4 right-4 z-50 p-2.5 rounded bg-[#1a1a1e] hover:bg-[#26262b] text-stone-300 hover:text-white border border-stone-700 transition-colors cursor-pointer"
                aria-label="Close article view"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: High-Res Scanned Newspaper Preview */}
              <div className="lg:w-1/2 w-full bg-[#09090b] relative flex flex-col items-center justify-center p-4 sm:p-6 min-h-[300px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-stone-800">
                <div className="relative w-full h-full max-h-[500px] lg:max-h-[75vh] flex items-center justify-center overflow-hidden rounded group">
                  <img
                    src={selectedFeature.image}
                    alt={selectedFeature.headlineEnglish}
                    className="w-full h-full object-contain max-h-[550px] rounded border border-stone-800"
                  />

                  {/* Zoom Overlay Trigger */}
                  <button
                    onClick={() => setIsZoomedImage(true)}
                    className="absolute bottom-4 left-4 px-3 py-1.5 rounded bg-[#121215] hover:bg-[#1a1a1e] text-stone-200 text-xs font-mono border border-stone-700 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>Zoom Scan Image</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Complete Article Analysis & Context */}
              <div className="lg:w-1/2 w-full p-6 sm:p-8 lg:p-9 overflow-y-auto max-h-[60vh] lg:max-h-[92vh] custom-scrollbar flex flex-col justify-between bg-[#121215]">
                <div>
                  {/* Article Badges Header */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded bg-[#1a1a1e] border border-stone-700 text-[#c5a880] font-mono text-xs">
                      {selectedFeature.newspaper}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-stone-400">
                      <Calendar className="w-3.5 h-3.5 text-[#c5a880]" />
                      <span>{selectedFeature.date}</span>
                    </div>
                  </div>

                  {/* Headlines */}
                  <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#f3f1ec] mb-2 leading-tight">
                    {selectedFeature.headlineTamil}
                  </h2>
                  <h3 className="font-serif italic text-sm sm:text-base text-[#c5a880] mb-5 leading-relaxed border-b border-stone-800 pb-4">
                    {selectedFeature.headlineEnglish}
                  </h3>

                  {/* Location Info */}
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-stone-300 mb-6 bg-[#1a1a1e] p-3 rounded border border-stone-800">
                    <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                    <span><strong className="text-stone-200 font-medium">Location / Coverage Area:</strong> {selectedFeature.location}</span>
                  </div>

                  {/* What This Article Tells (Detailed Overview) */}
                  <div className="mb-6">
                    <h4 className="flex items-center gap-2 font-serif font-bold text-base text-[#f3f1ec] mb-2">
                      <Compass className="w-4 h-4 text-[#c5a880]" />
                      <span>What This Article Tells</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal bg-[#09090b] p-4 rounded border border-stone-800">
                      {selectedFeature.fullDetails.overview}
                    </p>
                  </div>

                  {/* Key Achievements Documented */}
                  <div className="mb-6">
                    <h4 className="flex items-center gap-2 font-serif font-bold text-base text-[#f3f1ec] mb-3">
                      <Award className="w-4 h-4 text-[#c5a880]" />
                      <span>Key Achievements Documented in Press</span>
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedFeature.fullDetails.keyAchievements.map((achieve, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-stone-300 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] shrink-0 mt-2" />
                          <span>{achieve}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ecological & Scientific Significance */}
                  <div className="mb-6 p-4 rounded bg-[#1a1815] border border-[#c5a880]/30">
                    <h4 className="font-serif font-bold text-sm text-[#c5a880] mb-1">
                      Ecological &amp; Conservation Impact
                    </h4>
                    <p className="text-xs text-stone-300 leading-relaxed font-normal">
                      {selectedFeature.fullDetails.ecologicalSignificance}
                    </p>
                  </div>

                  {/* Dignitaries & Researchers Mentioned */}
                  <div className="mb-6">
                    <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-stone-400 mb-2">
                      <Users className="w-3.5 h-3.5 text-[#c5a880]" />
                      <span>Key Personnel &amp; Officials Named</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedFeature.fullDetails.dignitariesInvolved.map((person, i) => (
                        <span key={i} className="px-2.5 py-1 rounded bg-[#09090b] border border-stone-800 text-stone-300 text-xs font-mono">
                          {person}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Bottom Navigation */}
                <div className="pt-5 border-t border-stone-800 flex items-center justify-between gap-4">
                  <button
                    onClick={() => navigateFeature('prev')}
                    className="px-3.5 py-2 rounded bg-[#1a1a1e] hover:bg-[#26262b] text-stone-300 text-xs font-mono border border-stone-700 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 text-[#c5a880]" />
                    <span>PREVIOUS NEWSPAPER</span>
                  </button>

                  <button
                    onClick={() => navigateFeature('next')}
                    className="px-3.5 py-2 rounded bg-[#1a1a1e] hover:bg-[#26262b] text-stone-300 text-xs font-mono border border-stone-700 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>NEXT NEWSPAPER</span>
                    <ChevronRight className="w-4 h-4 text-[#c5a880]" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 3. FULL-SCREEN IMAGE ZOOM MODAL --- */}
      <AnimatePresence>
        {isZoomedImage && selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomedImage(false)}
            className="fixed inset-0 z-50 bg-[#09090b]/98 flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setIsZoomedImage(false)}
              className="absolute top-6 right-6 p-2.5 rounded bg-[#1a1a1e] text-stone-300 hover:text-white transition-colors border border-stone-700"
              aria-label="Close zoom view"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-w-[95vw] max-h-[92vh] overflow-auto custom-scrollbar p-2">
              <img
                src={selectedFeature.image}
                alt={selectedFeature.headlineEnglish}
                className="max-w-none w-auto h-auto max-h-[90vh] object-contain rounded border border-stone-700 mx-auto"
              />
            </div>
            <p className="text-xs font-mono text-stone-400 mt-3">
              Click anywhere or press Esc to return
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
