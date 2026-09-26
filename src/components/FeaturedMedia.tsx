import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NEWSPAPER_FEATURES, NewspaperFeature } from '../data/newspaperData';
import { 
  Newspaper, 
  Calendar, 
  MapPin, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  Compass, 
  Users, 
  ZoomIn,
  ArrowLeft,
  Star
} from 'lucide-react';

interface FeaturedMediaProps {
  onScrollBackToAbout?: () => void;
}

export const FeaturedMedia: React.FC<FeaturedMediaProps> = ({ onScrollBackToAbout }) => {
  const [selectedFeature, setSelectedFeature] = useState<NewspaperFeature | null>(null);
  const [isZoomedImage, setIsZoomedImage] = useState(false);
  const scrollableRef = React.useRef<HTMLDivElement>(null);

  // The first feature (scan0021 - Sea Turtle Protection) is elevated to Featured Spotlight Hero
  const featuredSpotlight = NEWSPAPER_FEATURES[6]; // scan0021 (Turtle Conservation landmark)
  const remainingFeatures = NEWSPAPER_FEATURES.slice(0, 6); // 6 cards (3x2 grid)

  // Wheel listener to allow scrolling up back to Page 2 (About) when at top of Page 3
  useEffect(() => {
    const el = scrollableRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (selectedFeature) return; // Don't trigger page transition when modal is open
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

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-slate-100 z-20">
      
      {/* 1. SCROLLABLE CONTAINER (Pure Black Theme) */}
      <div 
        ref={scrollableRef}
        className="relative z-10 w-full h-full overflow-y-auto pt-24 pb-36 px-4 sm:px-8 lg:px-12 custom-scrollbar bg-black"
      >
        <div className="max-w-[1400px] mx-auto w-full">
          
          {/* Header Navigation & Title Section */}
          <div className="mb-10">
            {/* Top Navigation Back Button */}
            {onScrollBackToAbout && (
              <button
                onClick={onScrollBackToAbout}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-all text-xs font-semibold mb-6 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-orange-500" />
                <span>Back to Scientific Journey</span>
              </button>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-bold uppercase tracking-widest mb-4">
                <Newspaper className="w-3.5 h-3.5 text-orange-500" />
                <span>Media Coverage &amp; Press Archives</span>
              </div>
              
              <h1 className="font-outfit font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight mb-3 leading-none">
                Featured in...
              </h1>
              
              <h2 className="font-outfit font-bold text-2xl sm:text-3xl text-orange-500 tracking-tight mb-4">
                Newspapers &amp; Press Highlights
              </h2>
              
              <p className="text-white/80 text-sm sm:text-base max-w-3xl leading-relaxed font-normal">
                Exploration of major Tamil and English national news publications documenting Dr. J.S. Yogesh Kumar&apos;s marine ecosystem research, pioneer SCUBA diving training for fishermen youth, and 57-day sea turtle conservation milestones. Click any clipping below for full article translation and details.
              </p>
            </motion.div>
          </div>

          {/* --- FEATURED SPOTLIGHT HERO CARD (1 FULL WIDTH LANDMARK FEATURE) --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => setSelectedFeature(featuredSpotlight)}
            className="group mb-12 rounded-3xl bg-zinc-950 border border-orange-500/50 hover:border-orange-500 overflow-hidden flex flex-col lg:flex-row cursor-pointer transition-all duration-400 ease-out hover:shadow-[0_0_50px_rgba(234,88,12,0.35)]"
          >
            {/* Image Column */}
            <div className="lg:w-1/2 w-full h-[320px] sm:h-[380px] lg:h-auto relative bg-zinc-900 overflow-hidden shrink-0">
              <img
                src={featuredSpotlight.image}
                alt={featuredSpotlight.headlineEnglish}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-zinc-950/90 via-transparent to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-orange-600/90 text-white font-black text-xs tracking-wide uppercase shadow-lg flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                  <span>Featured Headline</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-white font-bold text-xs tracking-wide shadow-lg">
                  {featuredSpotlight.date}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 p-2.5 rounded-full bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20 shadow-lg">
                <ZoomIn className="w-5 h-5 text-orange-400" />
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:w-1/2 w-full p-7 sm:p-9 flex flex-col justify-between bg-zinc-950">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 mb-3">
                  <Newspaper className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>{featuredSpotlight.newspaper}</span>
                  <span className="text-white/30">•</span>
                  <MapPin className="w-3.5 h-3.5 text-white/60 shrink-0" />
                  <span className="text-white/80 truncate">{featuredSpotlight.location}</span>
                </div>

                <h3 className="font-outfit font-black text-2xl sm:text-3xl text-white mb-3 leading-snug group-hover:text-orange-400 transition-colors">
                  {featuredSpotlight.headlineTamil}
                </h3>

                <h4 className="font-bold text-sm sm:text-base text-white/90 mb-4 leading-relaxed">
                  {featuredSpotlight.headlineEnglish}
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal border-t border-white/10 pt-4">
                  {featuredSpotlight.summary}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs sm:text-sm font-bold text-orange-500 group-hover:text-orange-400 transition-colors">
                <span>Read Landmark Sea Turtle Conservation Feature</span>
                <span className="text-lg group-hover:translate-x-1.5 transition-transform">→</span>
              </div>
            </div>
          </motion.div>

          {/* Section Subheader for the 6-Card Grid */}
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-outfit font-bold text-xl sm:text-2xl text-white tracking-tight">
              Press Archives &amp; SCUBA Training Milestones
            </h3>
            <span className="text-xs text-white/60 font-medium">6 Publications</span>
          </div>

          {/* --- PERFECT 3x2 EVEN GRID (6 CARDS) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingFeatures.map((feature, idx) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setSelectedFeature(feature)}
                className="group relative rounded-3xl bg-zinc-950 border border-white/15 hover:border-orange-500/80 overflow-hidden flex flex-col cursor-pointer transition-all duration-400 ease-out hover:shadow-[0_0_40px_rgba(234,88,12,0.3)] hover:-translate-y-2"
              >
                {/* Image Container with Framing */}
                <div className="relative h-[290px] w-full overflow-hidden bg-zinc-900 shrink-0">
                  <img
                    src={feature.image}
                    alt={feature.headlineEnglish}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  
                  {/* Publication Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-white font-bold text-xs tracking-wide shadow-lg">
                      {feature.newspaper}
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-orange-600/90 text-white font-black text-[11px] tracking-wider uppercase shadow-lg">
                      {feature.date}
                    </span>
                  </div>

                  {/* Zoom Icon Hint */}
                  <div className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20 shadow-lg">
                    <ZoomIn className="w-5 h-5 text-orange-400" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow bg-zinc-950">
                  <div>
                    {/* Location Badge */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-white/70 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span className="truncate">{feature.location}</span>
                    </div>

                    {/* Tamil Headline */}
                    <h3 className="font-outfit font-black text-lg sm:text-xl text-white mb-2 leading-snug group-hover:text-orange-400 transition-colors">
                      {feature.headlineTamil}
                    </h3>

                    {/* English Headline */}
                    <h4 className="font-semibold text-xs sm:text-sm text-white/90 mb-4 line-clamp-2 leading-relaxed">
                      {feature.headlineEnglish}
                    </h4>

                    {/* Summary */}
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-6 font-normal border-t border-white/10 pt-3">
                      {feature.summary}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-orange-500 group-hover:text-orange-400 transition-colors">
                    <span>Read Article &amp; Story</span>
                    <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* --- 2. DEDICATED NEWSPAPER ARTICLE READER MODAL ("NEW PAGE" PER CLIPPING) --- */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedFeature(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-hidden"
          >
            {/* Modal Inner Container */}
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl max-h-[92vh] bg-zinc-950 border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row text-slate-100"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-4 right-4 z-50 p-3 rounded-full bg-zinc-900/90 hover:bg-orange-600 text-white transition-all border border-white/20 cursor-pointer shadow-2xl"
                aria-label="Close article view"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left Column: High-Res Scanned Newspaper Preview with Zoom Capability */}
              <div className="lg:w-1/2 w-full bg-zinc-900 relative flex flex-col items-center justify-center p-4 sm:p-6 min-h-[300px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="relative w-full h-full max-h-[500px] lg:max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl group">
                  <img
                    src={selectedFeature.image}
                    alt={selectedFeature.headlineEnglish}
                    className="w-full h-full object-contain max-h-[550px] rounded-xl shadow-2xl transition-transform duration-300"
                  />

                  {/* Zoom Overlay Trigger */}
                  <button
                    onClick={() => setIsZoomedImage(true)}
                    className="absolute bottom-4 left-4 px-4 py-2 rounded-xl bg-black/85 hover:bg-orange-600 text-white text-xs font-bold border border-white/20 flex items-center gap-2 transition-all cursor-pointer shadow-xl"
                  >
                    <ZoomIn className="w-4 h-4 text-orange-400" />
                    <span>Click to Zoom Scan</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Complete Article Analysis & Context */}
              <div className="lg:w-1/2 w-full p-6 sm:p-8 lg:p-10 overflow-y-auto max-h-[60vh] lg:max-h-[92vh] custom-scrollbar flex flex-col justify-between">
                <div>
                  {/* Article Badges Header */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3.5 py-1.5 rounded-xl bg-orange-600/30 border border-orange-500/60 text-white font-bold text-xs">
                      {selectedFeature.newspaper}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-orange-500" />
                      <span>{selectedFeature.date}</span>
                    </div>
                  </div>

                  {/* Headlines */}
                  <h2 className="font-outfit font-black text-2xl sm:text-3xl text-white mb-2 leading-tight">
                    {selectedFeature.headlineTamil}
                  </h2>
                  <h3 className="font-bold text-sm sm:text-base text-orange-400 mb-6 leading-relaxed border-b border-white/10 pb-4">
                    {selectedFeature.headlineEnglish}
                  </h3>

                  {/* Location Info */}
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 mb-6 bg-zinc-900/80 p-3.5 rounded-2xl border border-white/10">
                    <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span><strong className="text-white font-semibold">Location / Coverage Area:</strong> {selectedFeature.location}</span>
                  </div>

                  {/* What This Article Tells (Detailed Overview) */}
                  <div className="mb-6">
                    <h4 className="flex items-center gap-2 font-outfit font-bold text-base text-white mb-2">
                      <Compass className="w-4 h-4 text-orange-500" />
                      <span>What This Article Tells</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal bg-zinc-900/40 p-4 rounded-2xl border border-white/5">
                      {selectedFeature.fullDetails.overview}
                    </p>
                  </div>

                  {/* Key Achievements Documented */}
                  <div className="mb-6">
                    <h4 className="flex items-center gap-2 font-outfit font-bold text-base text-white mb-3">
                      <Award className="w-4 h-4 text-orange-500" />
                      <span>Key Achievements Documented in Press</span>
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedFeature.fullDetails.keyAchievements.map((achieve, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
                          <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                          <span>{achieve}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ecological & Scientific Significance */}
                  <div className="mb-6 p-4 rounded-2xl bg-orange-950/30 border border-orange-500/40">
                    <h4 className="font-outfit font-bold text-sm text-orange-400 mb-1">
                      Ecological &amp; Conservation Impact
                    </h4>
                    <p className="text-xs text-slate-200 leading-relaxed font-normal">
                      {selectedFeature.fullDetails.ecologicalSignificance}
                    </p>
                  </div>

                  {/* Dignitaries & Researchers Mentioned */}
                  <div className="mb-6">
                    <h4 className="flex items-center gap-2 font-outfit font-bold text-xs uppercase tracking-wider text-white/70 mb-2">
                      <Users className="w-3.5 h-3.5 text-orange-500" />
                      <span>Key Personnel &amp; Officials Named</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedFeature.fullDetails.dignitariesInvolved.map((person, i) => (
                        <span key={i} className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-slate-200 text-xs font-medium">
                          {person}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Bottom Navigation */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                  <button
                    onClick={() => navigateFeature('prev')}
                    className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold border border-white/15 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 text-orange-400" />
                    <span>Previous Newspaper</span>
                  </button>

                  <button
                    onClick={() => navigateFeature('next')}
                    className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold border border-white/15 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Next Newspaper</span>
                    <ChevronRight className="w-4 h-4 text-orange-400" />
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
            className="fixed inset-0 z-50 bg-black/98 flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setIsZoomedImage(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-zinc-900 text-white hover:bg-orange-600 transition-colors border border-white/20"
              aria-label="Close zoom view"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-[95vw] max-h-[92vh] overflow-auto custom-scrollbar p-2">
              <img
                src={selectedFeature.image}
                alt={selectedFeature.headlineEnglish}
                className="max-w-none w-auto h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl mx-auto"
              />
            </div>
            <p className="text-xs text-white/70 mt-3 font-semibold">
              Click anywhere or press Esc to return
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
