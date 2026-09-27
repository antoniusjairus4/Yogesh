import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SCUBA_PHOTOS, 
  ScubaPhoto 
} from '../data/scubaData';
import FlexCarousel, { FlexCarouselItem } from './FlexCarousel';
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

  // Map filtered photos for FlexCarousel
  const carouselItems = useMemo<FlexCarouselItem[]>(() => {
    return filteredPhotos.map((photo) => ({
      src: photo.url,
      alt: photo.title,
      title: photo.title,
      subtitle: photo.scientificName || (photo.location ? `${photo.location} · ${photo.category}` : photo.category)
    }));
  }, [filteredPhotos]);

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
    <section id="scuba-gallery" className="relative w-full pt-16 pb-28 border-t border-white/10 mt-16 text-slate-100">
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header Section */}
        <div className="mb-10 pb-6 border-b border-slate-800/80">
          <h2 className="font-outfit font-black text-3xl sm:text-4xl lg:text-5xl text-slate-100 tracking-tight leading-snug">
            SCUBA Diving Visuals &amp; Subsurface Image Archive
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mt-3 font-normal leading-relaxed font-sans">
            Explore underwater marine fauna, taxonomically documented corals, gorgonians, and deep-sea benthic expedition photography collected across Indian Ocean marine reserves.
          </p>
        </div>

        {/* Category Filters & Search Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
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
                  className={`px-4 py-2.5 rounded-xl font-sans font-medium text-sm tracking-wide transition-colors shrink-0 cursor-pointer flex items-center gap-2 border ${
                    isActive
                      ? 'bg-slate-200 text-slate-950 font-semibold border-slate-200 shadow-sm'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-800'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    isActive ? 'bg-slate-950/15 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search species, taxonomy, location..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-slate-600 transition-colors font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

        {/* FlexCarousel Interactive WebGL Showcase */}
        {carouselItems.length > 0 && (
          <div className="mb-12 w-full h-[460px] sm:h-[520px] relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950/80 shadow-2xl">
            <FlexCarousel
              items={carouselItems}
              preset="liquid"
              intro="rise"
              cardHeight={0.52}
              gap={14}
              squeeze={0.2}
              focusOnClick
              captions
              onSelect={(index) => {
                if (filteredPhotos[index]) {
                  handleOpenLightbox(filteredPhotos[index]);
                }
              }}
            />
          </div>
        )}

        {/* Empty State */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800 my-8">
            <Layers className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-medium text-slate-200 mb-1">No matching marine photographs found</h3>
            <p className="text-slate-400 text-sm font-sans">Try broadening your search query or switching categories.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* CLEAN UNIFORM EDITORIAL GRID */
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full"
          >
            {filteredPhotos.map((photo, idx) => (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.03, 0.4) }}
                onClick={() => handleOpenLightbox(photo)}
                className="group relative bg-slate-900/90 border border-slate-800/80 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1.5 hover:border-slate-700 transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col w-full h-full"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden bg-slate-950 shrink-0 w-full h-[260px] sm:h-[280px] lg:h-[300px]">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  
                  {/* Subtle edge shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent opacity-80" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none z-10">
                    {photo.depth ? (
                      <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-sm text-xs font-mono font-medium text-slate-200 border border-white/10 shadow-sm">
                        Depth: {photo.depth}
                      </span>
                    ) : <span />}

                    <div className="p-2 rounded-md bg-slate-950/80 text-slate-300 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10 shadow-sm">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Card Metadata Banner */}
                <div className="p-5 sm:p-6 bg-slate-900/90 flex flex-col justify-between flex-grow border-t border-slate-800/80">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 text-xs font-medium uppercase tracking-wide border border-slate-700/60">
                        {photo.category}
                      </span>
                      {photo.location && (
                        <span className="text-xs text-slate-400 flex items-center gap-1.5 font-normal truncate max-w-[160px]">
                          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="truncate">{photo.location}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-semibold text-lg sm:text-xl text-slate-100 group-hover:text-white transition-colors leading-snug mb-1">
                      {photo.title}
                    </h3>

                    {photo.scientificName && (
                      <p className="text-sm text-slate-400 italic font-serif font-normal mb-2">
                        {photo.scientificName}
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal font-sans line-clamp-3">
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
            transition={{ duration: 0.2 }}
            onClick={() => setActivePhotoIndex(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl max-h-[92vh] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhotoIndex(null)}
                aria-label="Close image modal"
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevPhoto}
                aria-label="Previous photograph"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNextPhoto}
                aria-label="Next photograph"
                className="absolute right-16 lg:right-4 top-4 lg:top-1/2 lg:-translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image View Stage */}
              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[360px] lg:min-h-[560px] overflow-hidden p-4">
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.title}
                  className="max-w-full max-h-[76vh] object-contain rounded-lg shadow-xl"
                />

                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-md bg-slate-900/90 backdrop-blur-sm text-xs font-mono font-medium text-slate-300 border border-slate-800">
                  {activePhotoIndex + 1} / {filteredPhotos.length}
                </div>
              </div>

              {/* Metadata Details Sidebar */}
              <div className="w-full lg:w-96 p-6 sm:p-8 bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-medium uppercase tracking-wide border border-slate-700">
                      {currentPhoto.category}
                    </span>
                    {currentPhoto.depth && (
                      <span className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 text-xs font-mono font-medium border border-slate-800">
                        Depth: {currentPhoto.depth}
                      </span>
                    )}
                  </div>

                  <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-slate-100 mb-2 leading-tight">
                    {currentPhoto.title}
                  </h2>

                  {currentPhoto.scientificName && (
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 mb-4">
                      <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wide mb-0.5">
                        Scientific Taxonomy
                      </div>
                      <div className="text-base font-serif italic text-slate-200 font-medium">
                        {currentPhoto.scientificName}
                      </div>
                    </div>
                  )}

                  {currentPhoto.location && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-4 font-normal">
                      <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>{currentPhoto.location}</span>
                    </div>
                  )}

                  <div className="border-t border-slate-800 pt-4 mt-2">
                    <h4 className="text-xs uppercase tracking-wide font-medium text-slate-400 mb-2 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                      Field Observation Notes
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed font-normal font-sans">
                      {currentPhoto.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between font-mono">
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

export default ScubaGallery;
