import React, { useState, useMemo } from 'react';
import { 
  CORAL_SPECIES_DATA, 
  CoralSpecies 
} from '../data/coralSpeciesData';
import { 
  Search, 
  ArrowLeft, 
  Maximize2, 
  X, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { getAssetUrl } from '../utils/baseUrl';
import { ResearchContextMenu } from './ResearchContextMenu';

interface CoralResearchPageProps {
  onBackToPortfolio: () => void;
}

export const CoralResearchPage: React.FC<CoralResearchPageProps> = ({ onBackToPortfolio }) => {
  const [selectedGroup, setSelectedGroup] = useState<'ALL' | 'Corals' | 'Octocorals' | 'Mollusca'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCoral, setSelectedCoral] = useState<CoralSpecies>(CORAL_SPECIES_DATA[0]);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState<boolean>(false);
  const [modalMenuPos, setModalMenuPos] = useState<{ x: number; y: number } | null>(null);

  // Filter logic
  const filteredCorals = useMemo(() => {
    return CORAL_SPECIES_DATA.filter((coral) => {
      const matchesGroup = selectedGroup === 'ALL' || coral.group === selectedGroup;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query || 
        coral.id.toLowerCase().includes(query) ||
        coral.group.toLowerCase().includes(query);

      return matchesGroup && matchesSearch;
    });
  }, [selectedGroup, searchQuery]);

  // Update selected coral if current selected item is filtered out
  React.useEffect(() => {
    if (filteredCorals.length > 0 && !filteredCorals.find(c => c.id === selectedCoral.id)) {
      setSelectedCoral(filteredCorals[0]);
    }
  }, [filteredCorals, selectedCoral.id]);

  const currentIndex = filteredCorals.findIndex(c => c.id === selectedCoral.id);

  const handleNextCoral = () => {
    if (currentIndex < filteredCorals.length - 1) {
      setSelectedCoral(filteredCorals[currentIndex + 1]);
    }
  };

  const handlePrevCoral = () => {
    if (currentIndex > 0) {
      setSelectedCoral(filteredCorals[currentIndex - 1]);
    }
  };

  const handleDownload = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const filename = `${selectedCoral.id}_specimen.webp`;
    const link = document.createElement('a');
    link.href = getAssetUrl(selectedCoral.downloadImage || selectedCoral.image);
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#070e17] text-slate-100 font-sans flex flex-col selection:bg-[#c5a880] selection:text-slate-950">
      
      {/* 1. Header Banner - "Works of JS Yogesh Kumar" */}
      <header className="w-full bg-[#0a1626] border-b border-[#1b2a3d] shadow-lg sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onBackToPortfolio}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#132235] hover:bg-[#1d324f] text-[#c5a880] border border-[#233854] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              title="Return to Main Portfolio"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </button>
            <div className="h-6 w-px bg-white/10 hidden sm:block" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span className="text-[#e2ba7d] font-outfit uppercase tracking-wider">Works of Dr. J.S. Yogesh Kumar</span>
              </h1>
              <p className="text-[11px] text-slate-400 font-mono">
                Marine Specimen Image Archive • Zoological Survey of India
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="bg-[#0e1c2e] border border-[#20334c] px-3 py-1 rounded text-xs text-slate-300 font-mono">
              Database: <span className="text-[#e2ba7d] font-bold">{CORAL_SPECIES_DATA.length} Specimens</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Top Filter & Search Controls Bar */}
      <div className="w-full bg-[#0c1828] border-b border-[#1b2a3d] px-4 sm:px-6 py-3">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by specimen ID or group..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#060c14] border border-[#1d3047] focus:border-[#c5a880] text-sm text-slate-100 pl-9 pr-4 py-2 rounded outline-none transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-thin">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-mono mr-1">Taxa Group:</span>
            {[
              { id: 'ALL', label: `ALL (${CORAL_SPECIES_DATA.length})` },
              { id: 'Corals', label: `CORALS (${CORAL_SPECIES_DATA.filter(c => c.group === 'Corals').length})` },
              { id: 'Octocorals', label: `OCTORALS (${CORAL_SPECIES_DATA.filter(c => c.group === 'Octocorals').length})` },
              { id: 'Mollusca', label: `MOLLUSCA (${CORAL_SPECIES_DATA.filter(c => c.group === 'Mollusca').length})` }
            ].map((tab) => {
              const active = selectedGroup === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedGroup(tab.id as any)}
                  className={`px-4 py-1.5 text-xs rounded-md font-bold uppercase tracking-wide transition-all border cursor-pointer ${
                    active 
                      ? 'bg-[#c5a880] text-slate-950 border-[#c5a880] shadow-md' 
                      : 'bg-[#060c14] text-slate-300 border-[#1c2e45] hover:border-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* 3. Main Specimen Image Gallery Interface */}
      <div className="flex-1 max-w-[1400px] w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar: Thumbnail Catalog & Navigator */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          
          <div className="bg-[#0c1828] border border-[#1b2a3d] rounded p-3 flex-1 flex flex-col min-h-[460px] max-h-[720px]">
            <div className="flex items-center justify-between mb-3 border-b border-[#1b2a3d] pb-2">
              <span className="text-xs font-bold text-slate-200 uppercase font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#e2ba7d]" />
                <span>Specimens ({filteredCorals.length})</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevCoral}
                  disabled={currentIndex <= 0}
                  className="p-1 rounded bg-[#132235] disabled:opacity-40 text-slate-200 border border-[#233854] cursor-pointer"
                  title="Previous Specimen"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono px-1 text-slate-400">
                  {currentIndex + 1}/{filteredCorals.length}
                </span>
                <button
                  onClick={handleNextCoral}
                  disabled={currentIndex >= filteredCorals.length - 1}
                  className="p-1 rounded bg-[#132235] disabled:opacity-40 text-slate-200 border border-[#233854] cursor-pointer"
                  title="Next Specimen"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* List of Specimen Thumbnails */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
              {filteredCorals.map((coral, idx) => {
                const isSelected = coral.id === selectedCoral.id;
                return (
                  <button
                    key={coral.id}
                    onClick={() => setSelectedCoral(coral)}
                    className={`w-full text-left p-2 rounded text-xs transition-colors flex items-center gap-3 border cursor-pointer ${
                      isSelected 
                        ? 'bg-[#15273d] border-[#c5a880] text-white font-medium shadow-md' 
                        : 'bg-[#060c14] border-[#132133] text-slate-300 hover:border-[#203652] hover:bg-[#0a1524]'
                    }`}
                  >
                    <img 
                      src={getAssetUrl(coral.image)} 
                      alt="" 
                      loading="lazy"
                      decoding="async"
                      className="w-14 h-11 object-cover rounded border border-white/10 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-xs font-bold text-slate-200">
                        {coral.group} #{String(idx + 1).padStart(3, '0')}
                      </div>
                      <div className="text-[10px] text-[#c5a880] font-mono">
                        {coral.id}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Content Area: Pure Specimen Image Presentation */}
        <div className="lg:col-span-9 flex flex-col gap-4">
          
          <div className="bg-[#0c1828] border border-[#1b2a3d] p-4 sm:p-5 rounded flex flex-col gap-4">
            
            {/* Top Specimen Action Bar */}
            <div className="flex items-center justify-between border-b border-[#1c2e45] pb-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-mono font-bold bg-[#c5a880]/20 text-[#e2ba7d] border border-[#c5a880]/30 rounded uppercase tracking-wider">
                  {selectedCoral.group}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Specimen #{String(currentIndex + 1).padStart(3, '0')} of {filteredCorals.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-3.5 py-1.5 rounded bg-[#c5a880] hover:bg-white text-slate-950 border border-white/30 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow"
                  title="Download Watermarked Specimen Image"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Image</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsFullscreenModalOpen(true)}
                  className="px-3.5 py-1.5 rounded bg-[#15273d] hover:bg-[#1e3857] text-slate-200 border border-[#2b476e] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Open Fullscreen View"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#e2ba7d]" />
                  <span>Full View</span>
                </button>
              </div>
            </div>

            {/* Main Featured Image Display */}
            <div className="flex flex-col gap-3">
              <div 
                className="relative bg-black rounded-lg border border-[#1d3047] overflow-hidden group cursor-pointer flex items-center justify-center min-h-[440px] sm:min-h-[520px] max-h-[640px]"
                title="Right-click for options or double-click to download"
              >
                <img
                  src={getAssetUrl(selectedCoral.displayImage || selectedCoral.image)}
                  alt="Marine Specimen"
                  decoding="async"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  className="w-full h-[440px] sm:h-[520px] max-h-[640px] object-contain select-none -webkit-user-drag-none"
                />

                {/* Glass Shield Overlay */}
                <div 
                  onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setModalMenuPos({ x: e.clientX, y: e.clientY });
                  }}
                  onDoubleClick={handleDownload}
                  onDragStart={(e) => e.preventDefault()}
                  className="absolute inset-0 z-10 select-none bg-transparent cursor-pointer -webkit-user-drag-none"
                />

                {/* Bottom Overlay Actions */}
                <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-xs flex items-center justify-between">
                  <span className="font-mono text-slate-300 text-xs">
                    Dr. J.S. Yogesh Kumar Specimen Archive
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="px-2.5 py-1 bg-[#c5a880] hover:bg-white text-slate-950 text-xs font-mono font-bold rounded flex items-center gap-1 cursor-pointer transition-colors"
                      title="Download Image"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFullscreenModalOpen(true);
                      }}
                      className="px-2.5 py-1 bg-black/60 hover:bg-black text-white text-xs font-mono rounded border border-white/20 flex items-center gap-1 cursor-pointer transition-colors"
                      title="Zoom Image"
                    >
                      <Maximize2 className="w-3 h-3 text-[#e2ba7d]" />
                      <span>Zoom</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Adjacent Thumbnails Carousel */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin pt-1">
                {filteredCorals.slice(Math.max(0, currentIndex - 3), Math.min(filteredCorals.length, currentIndex + 5)).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCoral(c)}
                    className={`relative flex-shrink-0 w-20 h-14 rounded overflow-hidden border transition-all cursor-pointer ${
                      c.id === selectedCoral.id ? 'border-[#c5a880] ring-2 ring-[#c5a880]/50 scale-105' : 'border-[#1b2b3f] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={getAssetUrl(c.image)} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* 4. Fullscreen Image Modal */}
      {isFullscreenModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreenModalOpen(false)}
            className="absolute top-4 right-4 p-2 bg-slate-900 text-white rounded-full border border-white/20 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-5xl w-full flex flex-col items-center gap-4">
            <div 
              className="relative cursor-pointer group"
              title="Right-click for options or double-click to download"
            >
              <img
                src={getAssetUrl(selectedCoral.displayImage || selectedCoral.image)}
                alt="Specimen Full View"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                className="max-h-[80vh] w-auto object-contain rounded border border-white/10 shadow-2xl select-none -webkit-user-drag-none"
              />

              {/* Glass Shield Overlay */}
              <div 
                onContextMenu={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setModalMenuPos({ x: e.clientX, y: e.clientY });
                }}
                onDoubleClick={handleDownload}
                onDragStart={(e) => e.preventDefault()}
                className="absolute inset-0 z-10 select-none bg-transparent cursor-pointer -webkit-user-drag-none"
              />
            </div>
            <div className="text-center font-mono text-xs text-slate-300 flex flex-col items-center gap-2">
              <div className="text-sm font-semibold text-[#e2ba7d]">
                Dr. J.S. Yogesh Kumar Specimen Archive • {selectedCoral.group} #{String(currentIndex + 1).padStart(3, '0')}
              </div>

              <button
                type="button"
                onClick={handleDownload}
                className="mt-1 px-4 py-2 rounded bg-[#c5a880] hover:bg-white text-slate-950 font-mono font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download Specimen Image</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Context Menu Portal for Preview Modals */}
      {modalMenuPos && (
        <ResearchContextMenu
          x={modalMenuPos.x}
          y={modalMenuPos.y}
          specimenId={selectedCoral.id}
          scientificName={selectedCoral.group}
          downloadPath={selectedCoral.downloadImage || selectedCoral.image}
          onClose={() => setModalMenuPos(null)}
          onViewDetails={() => setIsFullscreenModalOpen(true)}
        />
      )}

      {/* Footer */}
      <footer className="w-full bg-[#050a12] border-t border-[#152438] py-4 px-6 text-center text-xs text-slate-400 font-mono">
        Works of Dr. J.S. Yogesh Kumar • Marine Specimen Archive
      </footer>

    </div>
  );
};

export default CoralResearchPage;
