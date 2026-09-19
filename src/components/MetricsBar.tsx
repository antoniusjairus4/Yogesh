import React from 'react';
import { motion } from 'framer-motion';
import { METRICS } from '../data/portfolioData';
import { ShieldCheck, BookOpen, FileText, Briefcase, Compass } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-teal-400" />,
  BookOpen: <BookOpen className="w-6 h-6 text-cyan-400" />,
  FileText: <FileText className="w-6 h-6 text-indigo-400" />,
  Briefcase: <Briefcase className="w-6 h-6 text-purple-400" />,
  Compass: <Compass className="w-6 h-6 text-emerald-400" />
};

export const MetricsBar: React.FC = () => {
  return (
    <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {METRICS.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col items-start justify-between relative overflow-hidden group"
          >
            {/* Top Icon & Badge */}
            <div className="flex items-center justify-between w-full mb-4">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 group-hover:border-teal-500/40 transition-colors">
                {iconMap[item.iconName]}
              </div>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                CV Metric
              </span>
            </div>

            {/* Value & Labels */}
            <div>
              <div className="text-3xl font-extrabold font-outfit text-white tracking-tight group-hover:text-teal-300 transition-colors">
                {item.value}
              </div>
              <div className="text-sm font-semibold text-slate-200 mt-1">
                {item.label}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {item.sublabel}
              </div>
            </div>

            {/* Accent Corner Glow */}
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-teal-500/10 rounded-full blur-xl group-hover:bg-teal-500/20 transition-all pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
