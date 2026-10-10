import React, { useState, useMemo } from 'react';
import { 
  CORAL_SPECIES_DATA, 
  CoralSpecies 
} from '../data/coralSpeciesData';
import { 
  Search, 
  ArrowLeft, 
  Compass, 
  Layers, 
  Maximize2, 
  X, 
  Download, 
  Info,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { getAssetUrl } from '../utils/baseUrl';

interface CoralResearchPageProps {
  onBackToPortfolio: () => void;
}

export const CoralResearchPage: React.FC<CoralResearchPageProps> = ({ onBackToPortfolio }) => {
  const [selectedGroup, setSelectedGroup] = useState<'ALL' | 'Corals' | 'Octocorals'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCoral, setSelectedCoral] = useState<CoralSpecies>(CORAL_SPECIES_DATA[0]);
  const [activeTab, setActiveTab] = useState<'Summary' | 'Distribution' | 'Images' | 'Taxonomy'>('Summary');
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState<boolean>(false);

  // Filter logic
  const filteredCorals = useMemo(() => {
    return CORAL_SPECIES_DATA.filter((coral) => {
      const matchesGroup = selectedGroup === 'ALL' || coral.group === selectedGroup;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query || 
        coral.botanicalName.toLowerCase().includes(query) ||
        coral.commonName.toLowerCase().includes(query) ||
        coral.family.toLowerCase().includes(query) ||
        coral.location.toLowerCase().includes(query) ||
        coral.description.toLowerCase().includes(query);

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

  return (
    <div className="min-h-screen bg-[#070e17] text-slate-100 font-sans flex flex-col selection:bg-[#c5a880] selection:text-slate-950">
      
      {/* 1. Header Banner - "Works of JS Yogesh Kumar" */}
      <header className="w-full bg-[#0a1626] border-b border-[#1b2a3d] shadow-lg sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onBackToPortfolio}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#132235] hover:bg-[#1d324f] text-[#c5a880] border border-[#233854] text-xs font-semibold uppercase tracking-wider transition-colors"
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
                Coral Taxonomy & Subsurface Specimen Archive • Zoological Survey of India
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="bg-[#0e1c2e] border border-[#20334c] px-3 py-1 rounded text-xs text-slate-300 font-mono">
              Database: <span className="text-[#e2ba7d] font-bold">{CORAL_SPECIES_DATA.length} Species Records</span>
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
              placeholder="Search botanical name, family, location, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#060c14] border border-[#1d3047] focus:border-[#c5a880] text-sm text-slate-100 pl-9 pr-4 py-2 rounded outline-none transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-thin">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-mono mr-1">Taxa Group:</span>
            {[
              { id: 'ALL', label: 'ALL SPECIES', count: CORAL_SPECIES_DATA.length },
              { id: 'Corals', label: 'CORALS (80)', count: 80 },
              { id: 'Octocorals', label: 'OCTOCORALS (39)', count: 39 }
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

      {/* 3. Main Research Factsheet Interface (Corals of the World Academic Style) */}
      <div className="flex-1 max-w-[1400px] w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar: Species Navigator List & Factsheet Menu */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          
          {/* Factsheet Navigation Panel */}
          <div className="bg-[#0c1828] border border-[#1b2a3d] rounded p-3">
            <h2 className="text-xs uppercase font-mono font-bold tracking-widest text-[#c5a880] mb-2 px-1">
              Species Factsheet Navigation
            </h2>
            <div className="flex flex-col gap-1">
              {(['Summary', 'Distribution', 'Images', 'Taxonomy'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-left px-3 py-2 text-xs font-semibold rounded border transition-colors ${
                    activeTab === tab 
                      ? 'bg-[#15273d] text-[#e2ba7d] border-[#253f61]' 
                      : 'bg-transparent text-slate-300 border-transparent hover:bg-[#101e30]'
                  }`}
                >
                  {tab} Information
                </button>
              ))}
            </div>
          </div>

          {/* Species Catalog Pager & Index */}
          <div className="bg-[#0c1828] border border-[#1b2a3d] rounded p-3 flex-1 flex flex-col min-h-[400px] max-h-[600px]">
            <div className="flex items-center justify-between mb-3 border-b border-[#1b2a3d] pb-2">
              <span className="text-xs font-bold text-slate-200 uppercase font-mono">
                Species Index ({filteredCorals.length})
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevCoral}
                  disabled={currentIndex <= 0}
                  className="p-1 rounded bg-[#132235] disabled:opacity-40 text-slate-200 border border-[#233854]"
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
                  className="p-1 rounded bg-[#132235] disabled:opacity-40 text-slate-200 border border-[#233854]"
                  title="Next Specimen"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* List of Corals */}
            <div className="flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
              {filteredCorals.map((coral, idx) => {
                const isSelected = coral.id === selectedCoral.id;
                return (
                  <button
                    key={coral.id}
                    onClick={() => setSelectedCoral(coral)}
                    className={`w-full text-left p-2 rounded text-xs transition-colors flex items-center gap-2 border ${
                      isSelected 
                        ? 'bg-[#15273d] border-[#c5a880] text-white font-medium' 
                        : 'bg-[#060c14] border-[#132133] text-slate-300 hover:border-[#203652]'
                    }`}
                  >
                    <img 
                      src={getAssetUrl(coral.image)} 
                      alt="" 
                      loading="lazy"
                      decoding="async"
                      className="w-10 h-8 object-cover rounded border border-white/10"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold italic text-slate-100">
                        {coral.botanicalName.split(' (')[0]}
                      </div>
                      <div className="truncate text-[10px] text-slate-400 font-mono">
                        {coral.family}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Content Area: Structured Species Factsheet */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          
          {/* Header Specimen Bar */}
          <div className="bg-[#0c1828] border border-[#1b2a3d] p-5 rounded">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1c2e45] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#c5a880]/20 text-[#e2ba7d] border border-[#c5a880]/30 rounded">
                    {selectedCoral.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Family: <strong className="text-slate-200">{selectedCoral.family}</strong>
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold italic text-white tracking-tight">
                  {selectedCoral.botanicalName}
                </h2>
                <div className="text-xs text-slate-400 mt-0.5">
                  Authority: <span className="text-slate-300 font-mono">{selectedCoral.authority}</span> • Common: <span className="text-[#e2ba7d]">{selectedCoral.commonName}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const cleanName = selectedCoral.botanicalName.split(' (')[0].replace(/[^a-zA-Z0-9_-]/g, '_');
                    const link = document.createElement('a');
                    link.href = getAssetUrl(selectedCoral.downloadImage || selectedCoral.image);
                    link.download = `${selectedCoral.id}_${cleanName}_citation.webp`;
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-3 py-1.5 rounded bg-[#c5a880] hover:bg-white text-slate-950 border border-white/30 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow"
                  title="Download High-Res Citation Specimen Image"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download for Research</span>
                </button>
                <button
                  onClick={() => setIsFullscreenModalOpen(true)}
                  className="px-3 py-1.5 rounded bg-[#15273d] hover:bg-[#1e3857] text-slate-200 border border-[#2b476e] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#e2ba7d]" />
                  <span>Full View</span>
                </button>
              </div>
            </div>

            {/* Factsheet Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
              
              {/* Left Details Column */}
              <div className="lg:col-span-6 flex flex-col gap-4 text-xs">
                
                {activeTab === 'Summary' && (
                  <div className="space-y-3">
                    <div className="bg-[#060c14] p-3 rounded border border-[#152538]">
                      <div className="font-bold text-[#c5a880] uppercase font-mono text-[11px] mb-1">
                        Diagnostic Morphological Characters
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {selectedCoral.description}
                      </p>
                    </div>

                    <div className="bg-[#060c14] p-3 rounded border border-[#152538] space-y-1.5 font-mono">
                      <div><strong className="text-slate-400">Habitat:</strong> <span className="text-slate-200">{selectedCoral.habitat}</span></div>
                      <div><strong className="text-slate-400">Depth Range:</strong> <span className="text-slate-200">{selectedCoral.depth}</span></div>
                      <div><strong className="text-slate-400">Abundance:</strong> <span className="text-slate-200">{selectedCoral.abundance}</span></div>
                      <div><strong className="text-slate-400">Geographic Location:</strong> <span className="text-[#e2ba7d]">{selectedCoral.location}</span></div>
                    </div>

                    <div className="bg-[#060c14] p-3 rounded border border-[#152538]">
                      <div className="font-bold text-[#c5a880] uppercase font-mono text-[11px] mb-1">
                        Taxonomic Identification Key
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {selectedCoral.identification}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'Distribution' && (
                  <div className="bg-[#060c14] p-4 rounded border border-[#152538] space-y-3">
                    <h4 className="font-bold text-[#c5a880] font-mono uppercase">Field Geographic Distribution</h4>
                    <p className="text-slate-300 leading-relaxed">
                      Specimen documented at <strong>{selectedCoral.location}</strong>. Commonly cataloged across the Andaman & Nicobar Archipelago shelf marine ecosystems.
                    </p>
                    <div className="p-3 bg-[#0a1420] border border-[#192b42] rounded font-mono text-[11px] space-y-1 text-slate-300">
                      <div>• Latitude / Longitude: 11.67° N, 92.74° E (Andaman Shelf Zone)</div>
                      <div>• Substrate Type: Live reef crest / Submerged hard reef slope</div>
                      <div>• Collector / Photographer: Dr. J.S. Yogesh Kumar</div>
                    </div>
                  </div>
                )}

                {activeTab === 'Images' && (
                  <div className="bg-[#060c14] p-4 rounded border border-[#152538] space-y-3">
                    <h4 className="font-bold text-[#c5a880] font-mono uppercase">Microscopic & Macro Photographic Records</h4>
                    <p className="text-slate-300">
                      High-resolution WebP digital specimen record stored under ID: <code className="text-[#e2ba7d]">{selectedCoral.id}</code>.
                    </p>
                    <div className="text-[11px] font-mono text-slate-400">
                      Clean display view: <code className="text-[#e2ba7d]">{selectedCoral.displayImage || selectedCoral.image}</code>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      Watermarked research download view: <code className="text-[#e2ba7d]">{selectedCoral.downloadImage}</code>
                    </div>
                  </div>
                )}

                {activeTab === 'Taxonomy' && (
                  <div className="bg-[#060c14] p-4 rounded border border-[#152538] space-y-2 font-mono text-xs">
                    <h4 className="font-bold text-[#c5a880] uppercase">Kingdom & Taxonomic Hierarchy</h4>
                    <div className="pl-2 border-l border-[#203652] space-y-1 text-slate-300">
                      <div>Kingdom: Animalia</div>
                      <div>Phylum: Cnidaria</div>
                      <div>Class: Anthozoa</div>
                      <div>Order: {selectedCoral.category}</div>
                      <div>Family: {selectedCoral.family}</div>
                      <div>Genus/Species: <em>{selectedCoral.botanicalName.split(' ')[0]} {selectedCoral.botanicalName.split(' ')[1]}</em></div>
                    </div>
                  </div>
                )}

                <div className="bg-[#0a1524] p-3 rounded border border-[#18293f] text-[11px] text-slate-400 font-mono space-y-1">
                  <div><strong>Taxonomic Reference Citation:</strong></div>
                  <div className="italic text-slate-300">
                    Kumar, J.S.Y. et al. Coral Reef Biodiversity of Andaman & Nicobar Islands. Zoological Survey of India Research Papers.
                  </div>
                </div>

              </div>

              {/* Right Image Display Area */}
              <div className="lg:col-span-6 flex flex-col gap-3">
                <div 
                  onDoubleClick={() => {
                    const cleanName = selectedCoral.botanicalName.split(' (')[0].replace(/[^a-zA-Z0-9_-]/g, '_');
                    const link = document.createElement('a');
                    link.href = getAssetUrl(selectedCoral.downloadImage || selectedCoral.image);
                    link.download = `${selectedCoral.id}_${cleanName}_citation.webp`;
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="relative bg-black rounded border border-[#1d3047] overflow-hidden group cursor-pointer"
                  title="Double-click to download High-Res Citation Specimen Image"
                >
                  <img
                    src={getAssetUrl(selectedCoral.displayImage || selectedCoral.image)}
                    alt={selectedCoral.botanicalName}
                    decoding="async"
                    className="w-full h-[360px] sm:h-[420px] object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 text-xs flex items-center justify-between">
                    <span className="font-mono text-slate-200 italic">
                      {selectedCoral.botanicalName}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const cleanName = selectedCoral.botanicalName.split(' (')[0].replace(/[^a-zA-Z0-9_-]/g, '_');
                          const link = document.createElement('a');
                          link.href = getAssetUrl(selectedCoral.downloadImage || selectedCoral.image);
                          link.download = `${selectedCoral.id}_${cleanName}_citation.webp`;
                          link.target = '_blank';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="px-2 py-1 bg-[#c5a880] hover:bg-white text-slate-950 text-[11px] font-mono font-bold rounded flex items-center gap-1 cursor-pointer transition-colors"
                        title="Download for Research"
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
                        className="px-2 py-1 bg-black/60 hover:bg-black text-white text-[11px] font-mono rounded border border-white/20 flex items-center gap-1 cursor-pointer"
                      >
                        <Maximize2 className="w-3 h-3 text-[#e2ba7d]" />
                        <span>Zoom</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Thumbnail strip of adjacent corals */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                  {filteredCorals.slice(Math.max(0, currentIndex - 2), Math.min(filteredCorals.length, currentIndex + 4)).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCoral(c)}
                      className={`relative flex-shrink-0 w-16 h-12 rounded overflow-hidden border transition-all ${
                        c.id === selectedCoral.id ? 'border-[#c5a880] ring-2 ring-[#c5a880]/50' : 'border-[#1b2b3f] opacity-60 hover:opacity-100'
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

      </div>

      {/* 4. Fullscreen Image Modal */}
      {isFullscreenModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreenModalOpen(false)}
            className="absolute top-4 right-4 p-2 bg-slate-900 text-white rounded-full border border-white/20 hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-5xl w-full flex flex-col items-center gap-4">
            <div 
              onDoubleClick={() => {
                const cleanName = selectedCoral.botanicalName.split(' (')[0].replace(/[^a-zA-Z0-9_-]/g, '_');
                const link = document.createElement('a');
                link.href = getAssetUrl(selectedCoral.downloadImage || selectedCoral.image);
                link.download = `${selectedCoral.id}_${cleanName}_citation.webp`;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="relative cursor-pointer group"
              title="Double-click to download High-Res Citation Specimen Image"
            >
              <img
                src={getAssetUrl(selectedCoral.displayImage || selectedCoral.image)}
                alt={selectedCoral.botanicalName}
                className="max-h-[75vh] w-auto object-contain rounded border border-white/10 shadow-2xl"
              />
            </div>
            <div className="text-center font-mono text-xs text-slate-300 flex flex-col items-center gap-2">
              <div className="text-lg font-bold italic text-[#e2ba7d]">{selectedCoral.botanicalName}</div>
              <div>Authority: {selectedCoral.authority} • Family: {selectedCoral.family}</div>

              <button
                type="button"
                onClick={() => {
                  const cleanName = selectedCoral.botanicalName.split(' (')[0].replace(/[^a-zA-Z0-9_-]/g, '_');
                  const link = document.createElement('a');
                  link.href = getAssetUrl(selectedCoral.downloadImage || selectedCoral.image);
                  link.download = `${selectedCoral.id}_${cleanName}_citation.webp`;
                  link.target = '_blank';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="mt-1 px-4 py-2 rounded bg-[#c5a880] hover:bg-white text-slate-950 font-mono font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download Citation Image</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full bg-[#050a12] border-t border-[#152438] py-4 px-6 text-center text-xs text-slate-400 font-mono">
        Works of Dr. J.S. Yogesh Kumar • Zoological Survey of India Specimen Catalog Archive
      </footer>

    </div>
  );
};

export default CoralResearchPage;
