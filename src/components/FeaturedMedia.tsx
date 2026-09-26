import React, { useState, useEffect } from 'react';
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
  ArrowLeft
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
    <div className="relative w-full h-screen overflow-hidden bg-[#09090b] text-stone-200 z-20 font-sans">
      
      {/* 1. SCROLLABLE CONTAINER (Restrained Print Archive Theme) */}
      <div 
        ref={scrollableRef}
        className="relative z-10 w-full h-full overflow-y-auto pt-24 pb-36 px-4 sm:px-8 lg:px-12 custom-scrollbar bg-[#09090b]"
      >
        <div className="max-w-[1400px] mx-auto w-full">
          
          {/* Header Navigation & Title Section */}
          <div className="mb-10">
            {/* Top Navigation Back Button */}
            {onScrollBackToAbout && (
              <button
                onClick={onScrollBackToAbout}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#141416] hover:bg-[#1a1a1e] text-stone-300 hover:text-white border border-stone-800 transition-colors text-xs font-medium mb-6 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Back to Scientific Journey</span>
              </button>
            )}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-stone-800 bg-[#121215] text-[#c5a880] text-[11px] font-mono tracking-widest uppercase mb-4">
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
            </motion.div>
          </div>

          {/* --- FEATURED SPOTLIGHT HERO CARD (1 FULL WIDTH LANDMARK FEATURE) --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setSelectedFeature(featuredSpotlight)}
            className="group mb-12 rounded-xl bg-[#121215] border border-stone-800 hover:border-[#c5a880]/70 overflow-hidden flex flex-col lg:flex-row cursor-pointer transition-colors duration-300"
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
          </motion.div>

          {/* Section Subheader for the 6-Card Grid */}
          <div className="mb-6 flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#f3f1ec] tracking-tight">
              Press Archives &amp; SCUBA Training Milestones
            </h3>
            <span className="text-xs font-mono text-stone-500">6 Publications</span>
          </div>

          {/* --- PERFECT 3x2 EVEN GRID (6 CARDS) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingFeatures.map((feature, idx) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                onClick={() => setSelectedFeature(feature)}
                className="group relative rounded-xl bg-[#121215] border border-stone-800 hover:border-stone-500 overflow-hidden flex flex-col cursor-pointer transition-colors duration-300"
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
