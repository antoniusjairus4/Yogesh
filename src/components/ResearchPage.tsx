import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Award, 
  Search, 
  ExternalLink, 
  FileText, 
  Layers, 
  ArrowLeft,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  Bookmark,
  ShieldCheck
} from 'lucide-react';
import { RESEARCH_PILLARS, SCIENTIFIC_PUBLICATIONS, ScientificPublication, ResearchPillar } from '../data/portfolioData';

interface ResearchPageProps {
  onBackToPortfolio: () => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({ onBackToPortfolio }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'projects' | 'publications'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedPublication, setSelectedPublication] = useState<ScientificPublication | null>(null);

  // Filtered publications
  const filteredPublications = useMemo(() => {
    return SCIENTIFIC_PUBLICATIONS.filter((pub: ScientificPublication) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        pub.title.toLowerCase().includes(q) ||
        pub.journal.toLowerCase().includes(q) ||
        pub.year.toString().includes(q) ||
        (pub.doi && pub.doi.toLowerCase().includes(q));

      const matchesDomain = selectedDomain === 'All' || 
        (selectedDomain === 'Corals' && (pub.title.toLowerCase().includes('coral') || pub.journal.toLowerCase().includes('coral'))) ||
        (selectedDomain === 'Fauna' && (pub.title.toLowerCase().includes('fauna') || pub.title.toLowerCase().includes('species') || pub.title.toLowerCase().includes('turtle'))) ||
        (selectedDomain === 'Taxonomy' && (pub.title.toLowerCase().includes('taxonomy') || pub.title.toLowerCase().includes('octocoral') || pub.title.toLowerCase().includes('new record')));

      return matchesSearch && matchesDomain;
    });
  }, [searchQuery, selectedDomain]);

  return (
    <div className="min-h-screen w-full bg-[#040814] text-slate-100 font-sans selection:bg-sky-500 selection:text-white pt-20 pb-32 px-4 sm:px-8 lg:px-12 relative overflow-x-hidden">
      
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-900/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto w-full">
        
        {/* Top Back Navigation & Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 pb-6 border-b border-white/10"
        >
          <button
            onClick={onBackToPortfolio}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all border border-white/15 hover:scale-105 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400" />
            <span>Back to Portfolio</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Dr. J.S. Yogesh Kumar</span>
            <span>/</span>
            <span className="text-sky-400 font-bold">Research &amp; Publications</span>
          </div>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zoological Survey of India • ANRF-DST Grants</span>
          </div>
          <h1 className="font-outfit font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight mb-4">
            Scientific Research &amp; Academic Publications
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-sans font-normal">
            Comprehensive archive of funded marine biodiversity grants, SCI-indexed peer-reviewed journal papers, octocoral taxonomy discoveries, and coral reef conservation research.
          </p>
        </motion.div>

        {/* Executive Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16 p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-2xl"
        >
          <div className="p-4 text-center border-r border-white/10 last:border-0">
            <div className="text-3xl sm:text-4xl font-black font-outfit text-white mb-1">80+</div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium">Total Publications</div>
          </div>
          <div className="p-4 text-center border-r border-white/10 last:border-0">
            <div className="text-3xl sm:text-4xl font-black font-outfit text-sky-400 mb-1">37</div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium">SCI Indexed Papers</div>
          </div>
          <div className="p-4 text-center border-r border-white/10 last:border-0">
            <div className="text-3xl sm:text-4xl font-black font-outfit text-emerald-400 mb-1">14</div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium">Funded Research Projects</div>
          </div>
          <div className="p-4 text-center">
            <div className="text-3xl sm:text-4xl font-black font-outfit text-amber-400 mb-1">2026-30</div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium">ANRF-DST Active Grant</div>
          </div>
        </motion.div>

        {/* SECTION 1: FUNDED RESEARCH PROJECTS */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <div>
              <h2 className="font-outfit font-black text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
                <Award className="w-7 h-7 text-sky-400" />
                <span>Major Funded Research Projects</span>
              </h2>
              <p className="text-slate-400 text-sm mt-1">National &amp; International Research Directives (DST, SERB, MoEFCC, ZSI)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {RESEARCH_PILLARS.map((project: ResearchPillar, idx: number) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
                      {project.role}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {project.period}
                    </span>
                  </div>

                  <h3 className="font-outfit font-black text-xl sm:text-2xl text-white group-hover:text-sky-300 transition-colors mb-3 leading-snug">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium mb-4">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Funding Agency: <strong className="text-white">{project.agency}</strong></span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>ZSI Canning Directive</span>
                  <span className="text-emerald-400 font-bold uppercase tracking-wider">Active Directive</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION 2: SCIENTIFIC PUBLICATIONS ARCHIVE */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
            <div>
              <h2 className="font-outfit font-black text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
                <BookOpen className="w-7 h-7 text-sky-400" />
                <span>Peer-Reviewed Journal Papers</span>
              </h2>
              <p className="text-slate-400 text-sm mt-1">Selected High-Impact SCI &amp; International Research Publications</p>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search papers, DOIs, journals..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                {['All', 'Corals', 'Fauna', 'Taxonomy'].map((domain) => (
                  <button
                    key={domain}
                    onClick={() => setSelectedDomain(domain)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      selectedDomain === domain
                        ? 'bg-sky-500 text-white shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {domain}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Publications Table / List */}
          <div className="space-y-4">
            {filteredPublications.map((pub: ScientificPublication, idx: number) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-slate-900"
              >
                <div className="max-w-4xl">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-sky-500/15 text-sky-400 text-xs font-mono font-bold border border-sky-400/30">
                      {pub.year}
                    </span>
                    <span className="text-xs text-slate-400 font-medium italic">
                      {pub.journal}
                    </span>
                  </div>

                  <h3 className="font-outfit font-bold text-lg text-white group-hover:text-sky-300 transition-colors mb-2 leading-snug">
                    {pub.title}
                  </h3>

                  <p className="text-xs text-slate-400 font-sans">
                    Authors: <span className="text-slate-300 font-medium">{pub.authors}</span>
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                  {pub.doi && (
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-sky-500 text-slate-300 hover:text-white text-xs font-mono font-semibold transition-all border border-slate-700 hover:border-sky-400"
                    >
                      <span>DOI Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};

export default ResearchPage;
