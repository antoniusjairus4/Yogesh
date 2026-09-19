import React from 'react';
import { motion } from 'framer-motion';
import { RESEARCH_PILLARS } from '../data/portfolioData';
import { Activity, Microscope, Trees as TreePalms, Waves, ArrowUpRight, CheckCircle } from 'lucide-react';

const pillarIconMap: Record<string, React.ReactNode> = {
  Activity: <Activity className="w-6 h-6 text-teal-400" />,
  Microscope: <Microscope className="w-6 h-6 text-cyan-400" />,
  TreePalms: <TreePalms className="w-6 h-6 text-emerald-400" />,
  Waves: <Waves className="w-6 h-6 text-blue-400" />
};

export const ResearchPillars: React.FC = () => {
  return (
    <section id="research-pillars" className="py-24 px-4 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-3">
            Core Scientific Focus
          </span>
          <h2 className="font-outfit text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Major Research Pillars & Initiatives
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            Leading national marine research programs funded by ANRF-DST, DST-SERB, and MoEFCC to preserve India's coral reefs, Sunderbans biodiversity, and octocoral taxonomy.
          </p>
        </motion.div>
      </div>

      {/* Grid of Research Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {RESEARCH_PILLARS.map((pillar, idx) => (
          <motion.div
            key={pillar.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="glass-panel glass-panel-hover p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Header inside card */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 group-hover:border-teal-400/50 transition-colors shadow-inner">
                  {pillarIconMap[pillar.icon]}
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                    {pillar.agency}
                  </span>
                  <div className="text-xs text-slate-400 font-mono mt-1">
                    {pillar.period}
                  </div>
                </div>
              </div>

              {/* Title & Category */}
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                {pillar.category}
              </div>
              <h3 className="font-outfit text-2xl font-bold text-white mb-4 group-hover:text-teal-300 transition-colors leading-snug">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {pillar.description}
              </p>
            </div>

            {/* Tag Badges */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
              {pillar.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-900/90 text-slate-300 border border-slate-800 flex items-center gap-1"
                >
                  <CheckCircle className="w-3 h-3 text-teal-400" />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
