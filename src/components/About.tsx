import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  CHRONOLOGICAL_CAREER_PAST_TO_PRESENT,
  FIELD_PHOTOS 
} from '../data/portfolioData';
import { 
  Briefcase, 
  MapPin, 
  Calendar,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const About: React.FC = () => {
  const timelineScrollRef = useRef<HTMLDivElement>(null);

  const scrollTimeline = (direction: 'left' | 'right') => {
    if (timelineScrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      timelineScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950 text-slate-100">
      
      {/* 1. STATIONARY BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          className="w-full h-full object-cover object-center transform scale-105 sm:scale-110 origin-center filter brightness-90 contrast-105"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/2nd_page.mp4" type="video/mp4" />
          Your browser does not support HTML5 video background.
        </video>

        {/* Ambient Oceanic Glass Overlay */}
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[3px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-slate-950/90" />
      </div>

      {/* 2. SCROLLABLE FOREGROUND CONTENT */}
      <div className="relative z-10 w-full h-full overflow-y-auto pt-24 pb-32 px-4 sm:px-6 lg:px-8 scroll-smooth">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-outfit font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
              Chronological Scientific Journey
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed opacity-90">
              From marine invertebrate research in Thoothukudi to leading the Sunderban Regional Centre as Scientist E &amp; Officer-in-Charge at ZSI.
            </p>
          </motion.div>

          {/* --- 5 FIELD RESEARCH IMAGES SHOWCASE --- */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
              <ImageIcon className="w-6 h-6 text-teal-400" />
              <h3 className="font-outfit font-bold text-2xl text-white tracking-tight">
                Field Expeditions &amp; Research Portfolio
              </h3>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {FIELD_PHOTOS.map((photo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="apple-liquid-glass overflow-hidden rounded-2xl group hover:border-teal-400/50 transition-all duration-300 flex flex-col h-full w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[360px] shrink-0"
                >
                  <div className="relative h-56 sm:h-60 w-full overflow-hidden shrink-0">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-950/80 backdrop-blur-md text-teal-300 border border-teal-400/30">
                      {photo.tag}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <h4 className="font-outfit font-bold text-lg text-white mb-2 group-hover:text-teal-300 transition-colors">
                        {photo.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- 11-POSITION HORIZONTAL SCROLL TIMELINE (PAST TO PRESENT) --- */}
          <div className="mb-24">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-sky-400" />
                <h3 className="font-outfit font-bold text-2xl text-white tracking-tight">
                  11-Position Career Journey (2006 → Present)
                </h3>
              </div>

              {/* Navigation Scroll Buttons */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => scrollTimeline('left')}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors border border-white/10 cursor-pointer"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollTimeline('right')}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors border border-white/10 cursor-pointer"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Horizontal Timeline Track */}
            <div
              ref={timelineScrollRef}
              className="flex overflow-x-auto gap-6 pb-6 pt-2 scroll-smooth snap-x snap-mandatory no-scrollbar sm:custom-scrollbar relative"
            >
              {CHRONOLOGICAL_CAREER_PAST_TO_PRESENT.map((item, index) => {
                const isCurrent = index === CHRONOLOGICAL_CAREER_PAST_TO_PRESENT.length - 1;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    className="snap-center shrink-0 w-[300px] sm:w-[360px] flex flex-col group"
                  >
                    {/* Step Number & Horizontal Indicator Line */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        isCurrent
                          ? 'bg-teal-500/30 text-teal-300 border border-teal-400/50 shadow-[0_0_10px_rgba(45,212,191,0.4)]'
                          : 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
                      }`}>
                        Step {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="h-[2px] flex-grow bg-gradient-to-r from-sky-400/40 to-transparent rounded-full" />
                    </div>

                    {/* Card Container */}
                    <div className={`apple-liquid-glass p-6 flex flex-col justify-between h-full transition-all duration-300 ${
                      isCurrent ? 'border-teal-400/60 shadow-[0_0_20px_rgba(45,212,191,0.2)]' : 'hover:border-sky-400/50'
                    }`}>
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/15 border border-sky-400/30 text-sky-300">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.period}
                          </span>
                          {isCurrent && (
                            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-400/40 uppercase tracking-wider">
                              Current Rank
                            </span>
                          )}
                        </div>

                        <h4 className="font-outfit font-bold text-lg sm:text-xl text-white mb-2 group-hover:text-sky-300 transition-colors">
                          {item.title}
                        </h4>

                        <div className="flex items-start gap-1.5 text-xs sm:text-sm text-slate-300 mb-4">
                          <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item.location}</span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal border-t border-white/10 pt-3 mt-auto">
                        <strong className="text-slate-100 font-semibold">Key Focus:</strong> {item.focus}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
