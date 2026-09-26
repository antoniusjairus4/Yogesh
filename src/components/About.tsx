import React from 'react';
import { motion } from 'framer-motion';
import { 
  FULL_CAREER_TIMELINE, 
  ACADEMIC_QUALIFICATIONS, 
  SCUBA_CREDENTIALS 
} from '../data/portfolioData';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  Camera, 
  Medal, 
  Compass, 
  MapPin, 
  Calendar,
  Sparkles
} from 'lucide-react';

const getCredentialIcon = (iconName: string) => {
  switch (iconName) {
    case 'Award': return <Award className="w-5 h-5 text-sky-400" />;
    case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-teal-400" />;
    case 'Camera': return <Camera className="w-5 h-5 text-indigo-400" />;
    case 'Medal': return <Medal className="w-5 h-5 text-amber-400" />;
    default: return <Compass className="w-5 h-5 text-sky-400" />;
  }
};

export const About: React.FC = () => {
  return (
    <section id="career" className="relative w-full min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100 overflow-hidden">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1120px] mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs sm:text-sm font-semibold tracking-wide mb-4">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Career Roadmap & Scientific Credentials</span>
          </div>

          <h2 className="font-outfit font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            Chronological Scientific Journey
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From marine invertebrate research in Thoothukudi to leading the Sunderban Regional Centre as Scientist E &amp; Officer-in-Charge at ZSI.
          </p>
        </motion.div>

        {/* --- 1. Chronological Career Timeline (11 Positions) --- */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-4">
            <Briefcase className="w-6 h-6 text-sky-400" />
            <h3 className="font-outfit font-bold text-2xl text-white tracking-tight">
              11-Position Career Milestones
            </h3>
          </div>

          <div className="relative border-l-2 border-sky-500/20 ml-3 sm:ml-6 space-y-8">
            {FULL_CAREER_TIMELINE.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative pl-6 sm:pl-10 group"
              >
                {/* Timeline Dot Indicator */}
                <span className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                  index === 0 
                    ? 'bg-sky-400 border-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.9)] ring-4 ring-sky-500/20' 
                    : 'bg-slate-900 border-sky-500/50 group-hover:border-sky-400 group-hover:bg-sky-400'
                }`} />

                <div className="apple-liquid-glass p-5 sm:p-6 hover:border-sky-400/40 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/15 border border-sky-400/30 text-sky-300">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                    {index === 0 && (
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-400/40 uppercase tracking-wider">
                        Current Designation
                      </span>
                    )}
                  </div>

                  <h4 className="font-outfit font-bold text-lg sm:text-xl text-white mb-1.5 group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </h4>

                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-300 mb-3">
                    <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>{item.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal border-t border-white/5 pt-3">
                    <strong className="text-slate-100 font-semibold">Key Focus:</strong> {item.focus}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Two-Column Grid: Academic Qualifications + SCUBA & Credentials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* --- 2. Academic Qualifications --- */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <GraduationCap className="w-6 h-6 text-teal-400" />
              <h3 className="font-outfit font-bold text-2xl text-white tracking-tight">
                Academic Qualifications
              </h3>
            </div>

            <div className="space-y-4">
              {ACADEMIC_QUALIFICATIONS.map((qual, idx) => (
                <div key={idx} className="apple-liquid-glass p-5 hover:border-teal-400/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-outfit font-bold text-base sm:text-lg text-white">
                      {qual.degree}
                    </h4>
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-teal-500/15 border border-teal-400/30 text-teal-300">
                      {qual.year}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mb-1">
                    {qual.institution}
                  </p>
                  <p className="text-xs text-teal-400/90 font-medium">
                    Specialization: {qual.field}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* --- 3. SCUBA & Technical Credentials --- */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <Compass className="w-6 h-6 text-sky-400" />
              <h3 className="font-outfit font-bold text-2xl text-white tracking-tight">
                SCUBA &amp; Technical Credentials
              </h3>
            </div>

            <div className="space-y-4">
              {SCUBA_CREDENTIALS.map((cred, idx) => (
                <div key={idx} className="apple-liquid-glass p-5 flex items-start gap-4 hover:border-sky-400/40 transition-all duration-300">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0">
                    {getCredentialIcon(cred.iconName)}
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-base sm:text-lg text-white mb-1">
                      {cred.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {cred.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
