import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SCUBA_PHOTOS, 
  ScubaPhoto 
} from '../data/scubaData';
import { 
  Search, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Layers, 
  Maximize2,
  Info
} from 'lucide-react';

export const ScubaGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Corals' | 'Fauna' | 'Expeditions'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Keyboard navigation for Lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;

      if (e.key === 'Escape') {
        setActivePhotoIndex(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      } else if (e.key === 'ArrowRight') {
        handleNextPhoto();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex]);

  // Filtered dataset based on Category & Search Query
  const filteredPhotos = useMemo(() => {
    return SCUBA_PHOTOS.filter((photo) => {
      const matchesCategory = selectedCategory === 'All' || photo.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        photo.title.toLowerCase().includes(q) ||
        (photo.scientificName && photo.scientificName.toLowerCase().includes(q)) ||
        (photo.location && photo.location.toLowerCase().includes(q)) ||
        photo.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenLightbox = (photo: ScubaPhoto) => {
    const index = filteredPhotos.findIndex((p) => p.id === photo.id);
    if (index !== -1) {
      setActivePhotoIndex(index);
    }
  };

  const handlePrevPhoto = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1));
  };

  const handleNextPhoto = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0));
  };

  const currentPhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <section id="scuba-gallery" className="relative w-full pt-16 pb-28 border-t border-white/10 mt-16">
      
      {/* Ambient Ocean Gradient Backdrop for this section */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#030d1a] to-slate-950" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10 pb-6 border-b border-white/10">
          <h2 className="font-outfit font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            SCUBA Diving Visuals &amp; Subsurface Archive
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mt-3 font-normal leading-relaxed">
            Explore underwater marine fauna, taxonomically documented corals, gorgonians, and deep-sea benthic expedition photography collected across Indian Ocean marine reserves.
          </p>
        </div>

        {/* Category Filters & Search Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {[
              { id: 'All', label: 'All Discoveries', count: SCUBA_PHOTOS.length },
              { id: 'Corals', label: 'Corals & Octocorals', count: SCUBA_PHOTOS.filter(p => p.category === 'Corals').length },
              { id: 'Fauna', label: 'Marine Fauna', count: SCUBA_PHOTOS.filter(p => p.category === 'Fauna').length },
              { id: 'Expeditions', label: 'Reef Expeditions', count: SCUBA_PHOTOS.filter(p => p.category === 'Expeditions').length },
            ].map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`px-5 py-3 rounded-2xl font-outfit font-bold text-sm sm:text-base tracking-wide transition-all shrink-0 cursor-pointer flex items-center gap-2.5 border ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.45)] scale-105'
                      : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-white/10 hover:border-white/20'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                    isActive ? 'bg-slate-950/25 text-slate-950' : 'bg-slate-800 text-cyan-400'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search species, taxonomy, location..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            )}
          </div>

        </div>

        {/* Empty State */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-white/10 my-8">
            <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-1">No matching marine photographs found</h3>
            <p className="text-slate-400 text-sm">Try broadening your search query or switching categories.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-xs font-bold hover:bg-cyan-500/30 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* PROMINENT, LARGER 2-COLUMN & 3-COLUMN MASONRY PHOTO POOL GRID */
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
          >
            {filteredPhotos.map((photo, idx) => (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: Math.min(idx * 0.04, 0.6) }}
                onClick={() => handleOpenLightbox(photo)}
                className="group relative bg-slate-950 border border-white/15 rounded-3xl overflow-hidden cursor-pointer hover:border-cyan-400/70 transition-all duration-500 shadow-xl hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] flex flex-col w-full"
              >
                {/* LARGER Image Aspect Container */}
                <div className="relative h-[320px] sm:h-[380px] lg:h-[420px] w-full overflow-hidden bg-black shrink-0">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle edge shadow gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-75 group-hover:opacity-40 transition-opacity duration-300" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                    {photo.depth ? (
                      <span className="px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md text-xs font-mono font-bold text-cyan-300 border border-cyan-500/40 shadow-lg">
                        Depth: {photo.depth}
                      </span>
                    ) : <span />}

                    <div className="p-2.5 rounded-xl bg-slate-950/85 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20 shadow-lg">
                      <Maximize2 className="w-4 h-4 text-cyan-400" />
                    </div>
                  </div>
                </div>

                {/* LARGER Card Metadata Banner */}
                <div className="p-6 sm:p-7 bg-slate-950 border-t border-white/10 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-cyan-400/30">
                        {photo.category}
                      </span>
                      {photo.location && (
                        <span className="text-xs text-slate-300 flex items-center gap-1.5 font-medium truncate max-w-[180px]">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="truncate">{photo.location}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-outfit font-black text-xl sm:text-2xl text-white group-hover:text-cyan-300 transition-colors leading-snug mb-1">
                      {photo.title}
                    </h3>

                    {photo.scientificName && (
                      <p className="text-sm text-cyan-200/90 italic font-serif font-semibold mb-3">
                        {photo.scientificName}
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2 font-normal">
                      {photo.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activePhotoIndex !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActivePhotoIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 lg:p-10"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl max-h-[92vh] bg-slate-950 border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.95)] flex flex-col lg:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhotoIndex(null)}
                aria-label="Close image modal"
                className="absolute top-4 right-4 z-30 p-3 rounded-full bg-slate-900/90 text-slate-300 hover:text-white border border-white/20 hover:border-white/40 transition-all cursor-pointer shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevPhoto}
                aria-label="Previous photograph"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/80 text-white hover:bg-cyan-500 hover:text-slate-950 border border-white/20 transition-all cursor-pointer shadow-xl"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNextPhoto}
                aria-label="Next photograph"
                className="absolute right-16 lg:right-4 top-4 lg:top-1/2 lg:-translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/80 text-white hover:bg-cyan-500 hover:text-slate-950 border border-white/20 transition-all cursor-pointer shadow-xl"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image View Stage */}
              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[360px] lg:min-h-[560px] overflow-hidden p-4">
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.title}
                  className="max-w-full max-h-[76vh] object-contain rounded-xl shadow-2xl"
                />

                <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md text-xs font-mono font-bold text-cyan-400 border border-white/10">
                  {activePhotoIndex + 1} / {filteredPhotos.length}
                </div>
              </div>

              {/* Metadata Details Sidebar */}
              <div className="w-full lg:w-96 p-6 sm:p-8 bg-slate-950 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-md bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-cyan-400/30">
                      {currentPhoto.category}
                    </span>
                    {currentPhoto.depth && (
                      <span className="px-3 py-1 rounded-md bg-slate-900 text-cyan-400 text-xs font-mono font-bold border border-slate-800">
                        Depth: {currentPhoto.depth}
                      </span>
                    )}
                  </div>

                  <h2 className="font-outfit font-black text-2xl sm:text-3xl text-white mb-2 leading-tight">
                    {currentPhoto.title}
                  </h2>

                  {currentPhoto.scientificName && (
                    <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 mb-4">
                      <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider mb-0.5">
                        Scientific Taxonomy
                      </div>
                      <div className="text-base font-serif italic text-cyan-200 font-bold">
                        {currentPhoto.scientificName}
                      </div>
                    </div>
                  )}

                  {currentPhoto.location && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 mb-4 font-medium">
                      <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{currentPhoto.location}</span>
                    </div>
                  )}

                  <div className="border-t border-white/10 pt-4 mt-2">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-cyan-400" />
                      Field Observation Notes
                    </h4>
                    <p className="text-sm text-slate-200 leading-relaxed font-normal">
                      {currentPhoto.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 text-xs text-slate-500 flex items-center justify-between font-mono">
                  <span>Dr. Y.K. Field Archive</span>
                  <span>Use ← → keys to browse</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
