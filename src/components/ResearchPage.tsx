import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PDF_PUBLICATIONS, PdfPublication } from '../data/pdfPublicationsData';
import { 
  FileText, 
  Search, 
  X, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  BookOpen, 
  Layers, 
  Download, 
  ArrowLeft,
  Eye,
  Maximize2,
  Sparkles,
  Award,
  Filter
} from 'lucide-react';

interface ResearchPageProps {
  onBackToPortfolio: () => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({ onBackToPortfolio }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPdf, setSelectedPdf] = useState<PdfPublication | null>(null);

  // Keyboard navigation & modal shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPdf && e.key === 'Escape') {
        setSelectedPdf(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPdf]);

  // Categories list
  const categories = [
    'All',
    'Octocorals',
    'Corals & Black Corals',
    'Sea Slugs & Molluscs',
    'Marine Mammals & Turtles',
    'Reef Fishes & Seahorses',
    'Invertebrates',
    'Oceanography & Ecology',
    'Shipwrecks'
  ];

  // Filtered dataset
  const filteredPapers = PDF_PUBLICATIONS.filter((paper) => {
    const matchesCat = selectedCategory === 'All' || paper.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || 
      paper.title.toLowerCase().includes(q) ||
      paper.journal.toLowerCase().includes(q) ||
      paper.authors.toLowerCase().includes(q) ||
      paper.location.toLowerCase().includes(q) ||
      paper.year.includes(q) ||
      paper.description.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="relative w-full min-h-screen bg-transparent text-stone-200 z-20 font-sans selection:bg-[#c5a880] selection:text-[#050505] pt-20 pb-36 px-4 sm:px-8 lg:px-12">
      
      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-800/80">
          <button
            onClick={onBackToPortfolio}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141416]/90 hover:bg-[#1a1a1e] text-stone-300 hover:text-white border border-stone-800 transition-all text-xs font-mono font-medium cursor-pointer shadow-md backdrop-blur-md hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 text-[#c5a880]" />
            <span>Back to Scientific Journey</span>
          </button>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161410] border border-[#c5a880]/40 text-[#c5a880] text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{PDF_PUBLICATIONS.length} Full-Text Research Papers (PDFs)</span>
          </div>
        </div>

        {/* Page Header & Inline Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#c5a880]/40 bg-[#121215]/90 text-[#c5a880] text-[11px] font-mono tracking-widest uppercase mb-4 shadow-md backdrop-blur-md">
            <BookOpen className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Peer-Reviewed SCI Publications &amp; Monograph Reprints</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="font-serif font-bold text-4xl sm:text-6xl text-[#f3f1ec] tracking-tight leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              Research and Publications
            </h1>

            {/* Search Input Box placed inline next to title */}
            <div className="relative w-full md:w-80 lg:w-96 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search paper title, species, journal, year..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#121215]/90 backdrop-blur-md border border-stone-800 text-stone-200 placeholder-stone-500 text-xs font-mono focus:outline-none focus:border-[#c5a880] transition-colors shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Category Filter Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-10 border-b border-stone-800/80 custom-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const count = cat === 'All' 
              ? PDF_PUBLICATIONS.length 
              : PDF_PUBLICATIONS.filter(p => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-medium tracking-wide transition-all shrink-0 cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#c5a880] text-[#050505] font-bold border-[#c5a880] shadow-lg scale-105'
                    : 'bg-[#121215]/90 backdrop-blur-md text-stone-300 hover:text-white border-stone-800 hover:border-stone-700'
                }`}
              >
                <span>{cat}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  isActive ? 'bg-[#050505]/20 text-[#050505] font-bold' : 'bg-stone-800 text-stone-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Empty Search Result */}
        {filteredPapers.length === 0 ? (
          <div className="text-center py-20 bg-[#121215]/60 rounded-3xl border border-stone-800 my-8">
            <FileText className="w-12 h-12 text-stone-600 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-medium text-stone-200 mb-1">No research papers match your query</h3>
            <p className="text-stone-400 text-xs font-mono">Try clearing your search query or selecting a different category filter.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#c5a880] text-[#050505] font-mono text-xs font-bold hover:bg-[#b0936c] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* 3-COLUMN PUBLICATIONS CARDS GRID WITH POPUP "OPEN" MINI BUTTON ON HOVER */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPapers.map((paper, idx) => {
              // Helper to format long author lists cleanly as first author et al.
              const formattedAuthors = (() => {
                if (!paper.authors) return '';
                const parts = paper.authors.split(',').map(s => s.trim()).filter(Boolean);
                if (parts.length > 2) {
                  return `${parts[0]} et al.`;
                }
                return paper.authors;
              })();

              return (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.4) }}
                  onClick={() => setSelectedPdf(paper)}
                  className="group relative bg-[#121215]/90 backdrop-blur-md border border-stone-800 hover:border-[#c5a880]/80 rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.85)] w-full h-full overflow-hidden"
                >
                  <div>
                    {/* Consolidated Category Tag & Year Row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#1a1a1e] text-[#c5a880] text-[11px] font-mono font-medium border border-stone-800 uppercase tracking-wider">
                        {paper.category}
                      </span>
                      <span className="text-xs font-mono font-medium text-stone-400">
                        {paper.year}
                      </span>
                    </div>

                    {/* Paper Title */}
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-[#f3f1ec] group-hover:text-[#c5a880] transition-colors leading-snug mb-2">
                      {paper.title}
                    </h3>

                    {/* Authors & Journal */}
                    <div className="space-y-1 mb-3">
                      <p className="text-xs font-mono text-stone-300 font-medium">
                        {formattedAuthors}
                      </p>
                      <p className="text-xs font-serif italic text-stone-400 truncate">
                        {paper.journal}
                      </p>
                    </div>

                    {/* Subtler Location Line */}
                    {paper.location && (
                      <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono mb-3">
                        <MapPin className="w-3.5 h-3.5 text-[#c5a880]/80 shrink-0" />
                        <span className="truncate">{paper.location}</span>
                      </div>
                    )}

                    {/* Clean 1-2 Line Description */}
                    <p className="text-xs text-stone-400 leading-relaxed line-clamp-2 font-normal font-sans mb-5">
                      {paper.description}
                    </p>
                  </div>

                  {/* Clean Footer Row with OPEN PDF Button */}
                  <div className="pt-3 border-t border-stone-800/80 flex items-center justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(paper.pdfUrl, '_blank');
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#c5a880] hover:bg-white text-[#050505] font-mono font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-lg group-hover:scale-105 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open PDF</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      {/* EMBEDDED PDF VIEWER MODAL */}
      <AnimatePresence>
        {selectedPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedPdf(null)}
            className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.96, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl h-[92vh] bg-[#121215] border border-stone-700 rounded-2xl overflow-hidden flex flex-col lg:flex-row text-stone-200 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPdf(null)}
                className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-[#1a1a1e] hover:bg-[#26262b] text-stone-300 hover:text-white border border-stone-700 transition-colors cursor-pointer"
                aria-label="Close PDF view"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Embedded PDF Viewer Frame */}
              <div className="lg:w-3/4 w-full h-[60vh] lg:h-full bg-black relative flex flex-col border-b lg:border-b-0 lg:border-r border-stone-800">
                <iframe
                  src={selectedPdf.pdfUrl}
                  title={selectedPdf.title}
                  className="w-full h-full border-0 bg-white"
                />
              </div>

              {/* Right Column: PDF Metadata & Download Sidebar */}
              <div className="lg:w-1/4 w-full p-6 bg-[#121215] flex flex-col justify-between overflow-y-auto custom-scrollbar">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#1a1a1e] border border-stone-800 text-[#c5a880] text-xs font-mono uppercase tracking-wider mb-4">
                    {selectedPdf.category}
                  </div>

                  <h2 className="font-serif font-bold text-xl text-[#f3f1ec] mb-3 leading-snug">
                    {selectedPdf.title}
                  </h2>

                  <div className="space-y-2 mb-6 border-b border-stone-800 pb-4 text-xs font-mono">
                    <div>
                      <span className="text-stone-500 block">Authors:</span>
                      <span className="text-stone-200 font-medium">{selectedPdf.authors}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Journal / Source:</span>
                      <span className="text-stone-300 italic">{selectedPdf.journal} ({selectedPdf.year})</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Location:</span>
                      <span className="text-stone-300">{selectedPdf.location}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs text-[#c5a880] uppercase tracking-wider mb-2 font-bold">
                      Abstract &amp; Summary
                    </h4>
                    <p className="text-xs text-stone-300 leading-relaxed font-sans font-normal">
                      {selectedPdf.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-800 mt-6 space-y-3">
                  <a
                    href={selectedPdf.pdfUrl}
                    download={selectedPdf.filename}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#c5a880] hover:bg-white text-[#050505] font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF File</span>
                  </a>

                  <a
                    href={selectedPdf.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1a1a1e] hover:bg-[#26262b] text-stone-300 hover:text-white font-mono text-xs border border-stone-700 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 text-[#c5a880]" />
                    <span>Open in Full Tab</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ResearchPage;
