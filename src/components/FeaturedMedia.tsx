import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NEWSPAPER_FEATURES, NewspaperFeature } from '../data/newspaperData';
import { getAssetUrl } from '../utils/baseUrl';
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
  MousePointerClick,
  FastForward
} from 'lucide-react';

interface FeaturedMediaProps {
  onScrollBackToAbout?: () => void;
}

const PressCard = React.memo<{
  feature: NewspaperFeature;
  idx: number;
  onSelect: (feature: NewspaperFeature) => void;
}>(({ feature, idx, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(feature);
  }, [feature, onSelect]);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.92, rotateX: 8 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          rotateX: 0,
          transition: { duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }
        }
      }}
      onClick={handleClick}
      className="group relative rounded-xl bg-[#121215] border border-stone-800 hover:border-stone-500 overflow-hidden flex flex-col cursor-pointer transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1"
    >
      <div className="relative h-[270px] w-full overflow-hidden bg-[#09090b] shrink-0 border-b border-stone-800">
        <img
          src={feature.image}
          alt={feature.headlineEnglish}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top filter brightness-90 group-hover:brightness-100 transition-all duration-500"
        />
        
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded bg-[#09090b]/90 border border-stone-800 text-stone-200 font-mono text-[11px] tracking-wide">
            {feature.newspaper}
          </span>
          <span className="px-2.5 py-1 rounded bg-[#09090b]/90 border border-stone-800 text-[#c5a880] font-mono text-[11px] tracking-wider uppercase">
            {feature.date}
          </span>
        </div>

        <div className="absolute bottom-3 right-3 p-1.5 rounded bg-[#09090b]/90 text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-stone-800">
          <Maximize2 className="w-4 h-4 text-[#c5a880]" />
        </div>
      </div>

      <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow bg-[#121215]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-stone-400 mb-2.5">
            <MapPin className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
            <span className="truncate">{feature.location}</span>
          </div>

          <h3 className="font-serif font-bold text-base sm:text-lg text-[#f3f1ec] mb-2 leading-snug group-hover:text-[#c5a880] transition-colors">
            {feature.headlineTamil}
          </h3>

          <h4 className="font-sans font-normal text-xs sm:text-sm text-stone-300 mb-3 line-clamp-2 leading-relaxed">
            {feature.headlineEnglish}
          </h4>

          <p className="text-xs text-stone-400 leading-relaxed line-clamp-3 mb-4 font-normal border-t border-stone-800/70 pt-2.5">
            {feature.summary}
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#c5a880] group-hover:text-white transition-colors border-t border-stone-800/50">
          <span>READ ARTICLE &amp; STORY</span>
          <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </motion.div>
  );
});

export const FeaturedMedia: React.FC<FeaturedMediaProps> = ({ onScrollBackToAbout }) => {
  const [selectedFeature, setSelectedFeature] = useState<NewspaperFeature | null>(null);
  const [isZoomedImage, setIsZoomedImage] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const wallScrollRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const handleSelectFeature = useCallback((feature: NewspaperFeature) => {
    setSelectedFeature(feature);
  }, []);

  const featuredSpotlight = NEWSPAPER_FEATURES.find(f => f.id === 'scan0021') || NEWSPAPER_FEATURES[6];
  const remainingFeatures = NEWSPAPER_FEATURES.filter(f => f.id !== featuredSpotlight.id);

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

  // Direct Wheel & Touch Scroll Controller driving 0.0 -> 1.0 un-crumpling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (selectedFeature) return; // Don't intercept when article modal is open

      // If paper is currently un-crumpling (progress < 1.0)
      if (scrollProgress < 1.0) {
        if (e.deltaY > 0) {
          // Scroll down -> un-crumple paper towards 1.0
          e.preventDefault();
          const step = Math.max(0.04, Math.abs(e.deltaY) / 500);
          setScrollProgress((prev) => Math.min(1.0, prev + step));
        } else if (e.deltaY < 0) {
          // Scroll up -> re-crumple towards 0.0, or back to Page 2
          if (scrollProgress > 0.02) {
            e.preventDefault();
            const step = Math.max(0.04, Math.abs(e.deltaY) / 500);
            setScrollProgress((prev) => Math.max(0, prev - step));
          } else if (onScrollBackToAbout) {
            e.preventDefault();
            onScrollBackToAbout();
          }
        }
      } else {
        // Paper is 100% fully un-crumpled & flat
        // If user scrolls UP and wall content is at top, start folding paper back
        const wallEl = wallScrollRef.current;
        if (wallEl && wallEl.scrollTop <= 5 && e.deltaY < -20) {
          e.preventDefault();
          setScrollProgress(0.95);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (selectedFeature) return;
      const currentY = e.touches[0].clientY;
      const diffY = touchStartY - currentY; // positive = swipe up / scroll down

      if (scrollProgress < 1.0) {
        if (diffY > 8) {
          setScrollProgress((prev) => Math.min(1.0, prev + 0.06));
          touchStartY = currentY;
        } else if (diffY < -8) {
          if (scrollProgress > 0.02) {
            setScrollProgress((prev) => Math.max(0, prev - 0.06));
            touchStartY = currentY;
          } else if (onScrollBackToAbout) {
            onScrollBackToAbout();
          }
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, [scrollProgress, selectedFeature, onScrollBackToAbout]);

  // Keyboard shortcut listener (Escape, Arrow Left, Arrow Right, Down, Up)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedFeature) {
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
        return;
      }

      if (scrollProgress < 1.0) {
        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
          setScrollProgress((prev) => Math.min(1.0, prev + 0.15));
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          if (scrollProgress > 0.05) {
            setScrollProgress((prev) => Math.max(0, prev - 0.15));
          } else if (onScrollBackToAbout) {
            onScrollBackToAbout();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFeature, isZoomedImage, scrollProgress, onScrollBackToAbout]);

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

  // Click handlers for interactive step un-folding
  const handleUnfoldStepClick = () => {
    if (scrollProgress >= 1.0) {
      setScrollProgress(0);
    } else {
      setScrollProgress((prev) => Math.min(1.0, prev + 0.25));
    }
  };

  const handleSkipToWall = () => {
    setScrollProgress(1.0);
  };

  // Continuous 1% -> 100% scroll values:
  const p = isReducedMotion ? 1.0 : scrollProgress;
  const progressPercent = Math.round(p * 100);

  // Background desk image is pitch black during un-crumpling, then fades in smoothly as paper flattens (0.75 -> 1.00)
  const bgImageOpacity = isReducedMotion ? 1 : Math.max(0, Math.min(1, (p - 0.70) / 0.30));

  // 3D Crumpled Paper mesh transformation math:
  // Starts as a 3D crushed ball (scale 0.35, high 3D angles, rounded orb shape), flattens smoothly to crisp paper sheet
  const paperScale = isReducedMotion ? 1 : 0.35 + 0.65 * Math.pow(p, 0.8);
  const paperRotateX = isReducedMotion ? 0 : (1 - p) * 72; // 72deg -> 0deg
  const paperRotateY = isReducedMotion ? 0 : (1 - p) * -42; // -42deg -> 0deg
  const paperRotateZ = isReducedMotion ? 0 : (1 - p) * 28; // 28deg -> 0deg
  const paperRadius = isReducedMotion ? 16 : 16 + (1 - p) * 110; // 126px (crumpled orb) -> 16px (sheet)

  // 3D Origami Panels (unfold from 140deg inward fold down to 0deg flat)
  const panelAngle = isReducedMotion ? 0 : (1 - p) * 140;
  const panelTranslateZ = isReducedMotion ? 0 : (1 - p) * 65;
  const panelOpacity = isReducedMotion ? 0 : Math.max(0, 1 - p * 1.15);

  // Creases & Crinkle shadow line opacity
  const creaseOpacity = isReducedMotion ? 0 : Math.max(0, (1 - p) * 0.95);

  // Stage Fade out when paper reaches 100% flat (0.85 -> 1.00)
  const stageOpacity = isReducedMotion ? 0 : (p >= 0.88 ? Math.max(0, 1 - (p - 0.88) / 0.12) : 1);

  // Press Archive Wall reveal (ONLY visible when paper reaches 85% -> 100%, ZERO overlap before!)
  const wallOpacity = isReducedMotion ? 1 : (p >= 0.85 ? Math.min(1, (p - 0.85) / 0.15) : 0);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden text-stone-200 z-20 font-sans select-none bg-[#050505] touch-none"
    >
      
      {/* RICH ARCHIVAL RESEARCH DESK WORKSPACE BACKGROUND IMAGE (PITCH BLACK UNTIL PAPER UN-CRUMPLES) */}
      <div 
        style={{ opacity: bgImageOpacity }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-700 ease-out"
      >
        <img 
          src={getAssetUrl("/portfolio/research_table_bg.webp")} 
          alt="Research Desk Workspace Surface" 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070605]/85 via-[#070605]/35 to-[#070605]/75" />
      </div>

      {/* FIXED TOP NAVIGATION BAR & REALTIME SCROLL PROGRESS BADGE */}
      <div className="absolute top-0 left-0 right-0 z-40 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-8 py-4 bg-gradient-to-b from-[#050505]/95 via-[#050505]/70 to-transparent pointer-events-auto">
        {onScrollBackToAbout ? (
          <button
            onClick={onScrollBackToAbout}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#141416]/95 hover:bg-[#1a1a1e] text-stone-300 hover:text-white border border-stone-800 transition-colors text-xs font-medium cursor-pointer shadow-md"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Back to Scientific Journey</span>
          </button>
        ) : <div />}

        {/* Realtime 1% -> 100% Un-crumpling Progress Badge & Skip Control */}
        {!isReducedMotion && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleUnfoldStepClick}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161410]/95 hover:bg-[#201d17] border border-[#c5a880]/50 text-[#c5a880] text-xs font-mono tracking-wider shadow-xl transition-colors cursor-pointer"
            >
              <span className={`w-2.5 h-2.5 rounded-full ${p >= 0.95 ? 'bg-emerald-400' : 'bg-[#c5a880] animate-pulse'}`} />
              <span className="font-bold">
                {p >= 0.95 
                  ? 'ARCHIVAL NEWSPAPER UN-CRUMPLED (100%)' 
                  : `UN-CRUMPLING NEWSPAPER: ${progressPercent}% (SCROLL OR CLICK HERE ↓)`}
              </span>
            </button>

            {p < 0.95 && (
              <button
                onClick={handleSkipToWall}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#201c16]/95 hover:bg-[#2c261e] border border-stone-700 text-stone-300 hover:text-white text-xs font-mono transition-colors cursor-pointer shadow-md"
                title="Skip un-crumpling animation"
              >
                <span>Skip to Wall</span>
                <FastForward className="w-3.5 h-3.5 text-[#c5a880]" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3D CRUMPLED PAPER STAGE (PITCH BLACK BACKGROUND ACTIVE 0% -> 85%)          */}
      {/* ========================================================================= */}
      {stageOpacity > 0 && (
        <div 
          style={{ opacity: stageOpacity }}
          className="fixed inset-0 z-10 flex flex-col items-center justify-center perspective-[1400px] px-4 pt-10"
        >
          {/* Scroll Guidance Header */}
          {p < 0.85 && (
            <div className="text-center mb-6 z-30 pointer-events-none">
              <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#f3f1ec] tracking-tight">
                Press Archive
              </h2>
            </div>
          )}

          {/* 3D CRUMPLED PAPER CONTAINER (CLICKABLE TO UN-FOLD) */}
          <motion.div
            onClick={handleUnfoldStepClick}
            style={{
              scale: paperScale,
              rotateX: paperRotateX,
              rotateY: paperRotateY,
              rotateZ: paperRotateZ,
              borderRadius: `${paperRadius}px`,
              transformStyle: 'preserve-3d',
              willChange: 'transform, opacity, border-radius',
            }}
            className="relative w-[340px] sm:w-[560px] lg:w-[760px] h-[360px] sm:h-[490px] bg-[#1a1713] border-2 border-[#c5a880]/70 shadow-[0_40px_120px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col p-6 sm:p-8 transition-shadow duration-300 pointer-events-auto cursor-pointer"
          >
            {/* Heavily Blurred Archival Paper Texture (Newspaper obscured until 100% unfolded) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img 
                src={featuredSpotlight.image} 
                alt="Archival Press Clipping Preview" 
                className="w-full h-full object-cover object-top filter blur-3xl brightness-[0.45] contrast-[1.15] sepia-[0.5] scale-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a] via-[#161410]/80 to-[#241f19]/90 mix-blend-multiply" />
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

            {/* ABSTRACT ARCHIVAL STAMP & PROGRESS SEAL (No text overlays) */}
            <div className="relative z-10 h-full flex flex-col justify-between text-left p-4 pointer-events-none">
              <div className="flex items-center justify-between border-b border-[#c5a880]/30 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded bg-[#09090b]/90 border border-[#c5a880]/50 text-[#c5a880] font-mono text-[10px] sm:text-xs tracking-widest uppercase font-bold">
                    Official Archival Seal
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#c5a880]/70 block font-bold">
                    2006–2022 Records
                  </span>
                </div>
              </div>

              <div className="my-auto text-center py-4">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#c5a880]/40 mx-auto mb-3 flex items-center justify-center">
                  <ScrollText className="w-8 h-8 text-[#c5a880]/60" />
                </div>
                <p className="font-serif italic text-lg sm:text-2xl text-[#c5a880] font-medium tracking-wide">
                  Press Archive Un-folding...
                </p>
              </div>

              <div className="pt-3 border-t border-[#c5a880]/30 flex items-center justify-between text-[11px] font-mono text-stone-300">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Marine Documentation</span>
                </div>
                <div className="px-3.5 py-1 rounded bg-[#c5a880]/20 border border-[#c5a880]/40 text-[#c5a880] font-bold text-[10px] tracking-wider uppercase">
                  {progressPercent}% Un-crumpled
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* FULL PRESS ARCHIVE WALL (REVEALED ANIMATION WHEN PAPER REACHES 100%)       */}
      {/* ========================================================================= */}
      {wallOpacity > 0 && (
        <div 
          ref={wallScrollRef}
          className="relative z-30 w-full h-full overflow-y-auto pt-24 pb-36 px-4 sm:px-8 lg:px-12 custom-scrollbar pointer-events-auto"
        >
          <div className="max-w-[1400px] mx-auto w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: wallOpacity, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full p-2 sm:p-6 transition-colors bg-transparent border-0 shadow-none"
            >
              
              {/* Animated Header Title Section */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-10 text-left"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e0ad5b]/10 border border-[#e0ad5b]/30 text-[#e0ad5b] text-xs font-semibold uppercase tracking-widest mb-3 shadow-md">
                  <FileText className="w-3.5 h-3.5 text-[#e0ad5b]" />
                  <span>MEDIA COVERAGE &amp; PRESS ARCHIVES</span>
                </div>
                
                <h1 className="font-serif font-bold text-4xl sm:text-6xl text-[#f3f1ec] tracking-tight mb-3 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                  National &amp; Regional Press Coverage
                </h1>
                
                <p className="text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed font-normal border-l-2 border-[#e0ad5b]/60 pl-4 py-2 bg-[#090807]/90 rounded-r-lg border-y border-r border-[#e0ad5b]/20 shadow-xl">
                  Archival features across major Tamil and English national news publications documenting Dr. J.S. Yogesh Kumar&apos;s marine biodiversity research, pioneer SCUBA diving training for fishermen youth, and 57-day sea turtle conservation milestones. Click any clipping below for full article translation and details.
                </p>
              </motion.div>

              {/* --- FEATURED SPOTLIGHT HERO CUTOUT CARD (ANIMATES IN FROM UNFOLDED SHEET) --- */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelectedFeature(featuredSpotlight)}
                className="group mb-12 rounded-xl bg-[#121215] border border-stone-800 hover:border-[#c5a880]/70 overflow-hidden flex flex-col lg:flex-row cursor-pointer transition-colors duration-300 shadow-xl"
              >
                {/* Image Column */}
                <div className="lg:w-1/2 w-full h-[320px] sm:h-[380px] lg:h-auto relative bg-[#09090b] overflow-hidden shrink-0 border-b lg:border-b-0 lg:border-r border-stone-800">
                  <img
                    src={featuredSpotlight.image}
                    alt={featuredSpotlight.headlineEnglish}
                    loading="lazy"
                    decoding="async"
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
              </motion.div>

              {/* Section Subheader for 6-Card Grid */}
              <div className="mb-6 flex items-center justify-between border-b border-stone-800 pb-3">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#f3f1ec] tracking-tight">
                  Press Archives &amp; SCUBA Training Milestones
                </h3>
                <span className="text-xs font-mono text-stone-500">{remainingFeatures.length} Publications</span>
              </div>

              {/* --- PERFECT 3x2 EVEN GRID OF ANIMATED NEWSPAPER CUTOUT CARDS --- */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08, delayChildren: 0.25 }
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {remainingFeatures.map((feature, idx) => (
                  <PressCard
                    key={feature.id}
                    feature={feature}
                    idx={idx}
                    onSelect={handleSelectFeature}
                  />
                ))}
              </motion.div>

            </motion.div>
          </div>
        </div>
      )}

      {/* --- 2. DEDICATED NEWSPAPER ARTICLE READER MODAL ("NEW PAGE" PER CLIPPING) --- */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedFeature(null)}
            className="fixed inset-0 z-50 bg-[#09090b]/95 flex items-center justify-center p-3 sm:p-6 overflow-hidden pointer-events-auto"
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
                    <h4 className="flex items-center gap-2 font-serif font-bold text-[#f3f1ec] mb-2 text-base">
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
            className="fixed inset-0 z-50 bg-[#09090b]/98 flex flex-col items-center justify-center p-4 cursor-zoom-out pointer-events-auto"
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

export default FeaturedMedia;
