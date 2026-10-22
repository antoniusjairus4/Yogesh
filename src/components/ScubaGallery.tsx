import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  SCUBA_PHOTOS, 
  ScubaPhoto 
} from '../data/scubaData';
import FlexCarousel, { FlexCarouselItem } from './FlexCarousel';
import { 
  Search, 
  X, 
  ArrowRight,
  Sparkles,
  MapPin
} from 'lucide-react';
import { usePerformanceMode } from '../utils/performanceMode';

interface ScubaGalleryProps {
  onViewScubaArchive?: (photoId?: string) => void;
}

export const ScubaGallery: React.FC<ScubaGalleryProps> = ({ onViewScubaArchive }) => {
  const { isMobile } = usePerformanceMode();
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Corals' | 'Fauna' | 'Expeditions'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  // Cap at 8 representative photos for homepage preview showcase
  const curatedPhotos = useMemo(() => {
    return filteredPhotos.slice(0, 8);
  }, [filteredPhotos]);

  // Map curated photos for FlexCarousel using lightweight thumbnails
  const carouselItems = useMemo<FlexCarouselItem[]>(() => {
    return curatedPhotos.map((photo) => ({
      src: photo.thumbnailUrl || photo.url,
      alt: photo.title,
      title: photo.title,
      subtitle: photo.scientificName || (photo.location ? `${photo.location} · ${photo.category}` : photo.category)
    }));
  }, [curatedPhotos]);

  return (
    <section id="scuba-gallery" className="relative w-full pt-16 pb-20 border-t border-white/10 mt-16 text-slate-100">
      
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
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
                  className={`px-4 py-2.5 rounded-xl font-sans text-xs tracking-wide transition-all shrink-0 cursor-pointer flex items-center gap-2 border tactile-btn ${
                    isActive
                      ? 'bg-[#e0ad5b] text-[#050e11] font-bold border-[#e0ad5b] shadow-sm'
                      : 'bg-[#0c1f26]/95 text-slate-100 font-semibold border-[#265360] hover:border-[#e0ad5b]/80 hover:text-white hover:bg-[#122e38]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                    isActive 
                      ? 'bg-[#050e11]/25 text-[#050e11] font-extrabold' 
                      : 'bg-[#183a45] text-slate-200 font-medium border border-[#2d6271]/60'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search species, taxonomy, location..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c1f26]/95 border border-[#265360] text-slate-100 placeholder-slate-400 text-xs font-mono focus:outline-none focus:border-[#e0ad5b] focus:ring-1 focus:ring-[#e0ad5b]/40 transition-all shadow-md"
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

        {/* Mobile-Native Scroll-Snap Carousel (<768px) or Liquid WebGL FlexCarousel (Desktop) */}
        {carouselItems.length > 0 && (
          isMobile ? (
            <div className="mb-10 w-full overflow-hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none px-1">
                {curatedPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => onViewScubaArchive && onViewScubaArchive(photo.id)}
                    className="snap-center shrink-0 w-[280px] bg-[#0c1828] border border-[#1b2f48] hover:border-[#c5a880] rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all active:scale-[0.98]"
                  >
                    <div className="relative h-44 w-full bg-black overflow-hidden">
                      <img
                        src={photo.thumbnailUrl || photo.url}
                        alt={photo.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/75 text-[#c5a880] text-[10px] font-mono border border-white/10 uppercase">
                        {photo.category}
                      </div>
                      {photo.depth && (
                        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/75 text-slate-200 text-[10px] font-mono border border-white/10">
                          {photo.depth}
                        </div>
                      )}
                    </div>
                    <div className="p-3.5">
                      <h4 className="font-serif font-bold text-sm text-white truncate">{photo.title}</h4>
                      {photo.scientificName && (
                        <p className="text-xs text-slate-400 italic truncate mt-0.5">{photo.scientificName}</p>
                      )}
                      <div className="text-[11px] text-[#c5a880] font-mono mt-2 flex items-center justify-between border-t border-white/10 pt-2">
                        <span className="truncate max-w-[170px]">{photo.location || 'Marine Survey'}</span>
                        <span className="text-white/70">View →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-10 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[500px] sm:h-[600px] overflow-hidden bg-transparent border-none">
              <FlexCarousel
                items={carouselItems}
                preset="liquid"
                intro="rise"
                cardHeight={0.56}
                gap={16}
                squeeze={0.2}
                focusOnClick
                captions
                captureWheel={false}
                onSelect={(index) => {
                  if (onViewScubaArchive) {
                    onViewScubaArchive(curatedPhotos[index]?.id);
                  }
                }}
              />
            </div>
          )
        )}

        {/* Callout Button leading to the Full SCUBA Image Archive Page */}
        <div className="mt-6 text-center flex flex-col items-center">
          <a
            href="/expeditions"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
              e.preventDefault();
              if (onViewScubaArchive) onViewScubaArchive();
            }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#e0ad5b] hover:bg-white text-[#050e11] font-outfit font-black text-base tracking-wide border border-white/80 uppercase cursor-pointer tactile-btn no-underline"
          >
            <span>View Image Pool</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

      </div>

    </section>
  );
};

export default ScubaGallery;
