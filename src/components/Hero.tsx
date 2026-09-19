import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PROFILE_DATA } from '../data/portfolioData';
import { ShieldCheck, Award, Compass, FileText, RotateCcw } from 'lucide-react';

interface HeroProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isVideoEnded: boolean;
  setIsVideoEnded: (ended: boolean) => void;
  handleReplay: () => void;
}

export const Hero: React.FC<HeroProps> = ({ videoRef, isVideoEnded, setIsVideoEnded, handleReplay }) => {

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        console.log("Autoplay policy handled");
      });
    }
  }, [videoRef]);

  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center pt-20 pb-10 px-6 overflow-hidden bg-slate-950">
      
      {/* Video Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105 transform scale-110 origin-center"
          autoPlay
          muted
          playsInline
          loop={false}
          poster="./poster.png"
          onEnded={() => setIsVideoEnded(true)}
        >
          <source src="./Yogesh_landing.mp4" type="video/mp4" />
          Your browser does not support HTML5 video background.
        </video>

        {/* Ambient Dark Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-transparent" />
      </div>

      {/* Hero Content Overlay (Matching Screenshot Exactly) */}
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col justify-center items-center text-center my-auto">
        
        {/* Top Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-6"
        >
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30 backdrop-blur-md shadow-sm shadow-teal-500/10">
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
            Scientist E & Officer-in-Charge
          </span>

          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
            <Award className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
            Zoological Survey of India (ZSI)
          </span>

          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
            PADI Dive Master (DM-494151)
          </span>
        </motion.div>

        {/* Name Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-4"
        >
          <h1 className="font-outfit font-extrabold text-5xl sm:text-7xl text-white tracking-tight leading-[1.1]">
            Dr. J.S. Yogesh <br className="sm:hidden" />
            <span className="text-gradient-ocean">Kumar</span>
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mb-6"
        >
          <p className="text-lg sm:text-xl font-serif text-teal-200/90 font-medium leading-relaxed">
            {PROFILE_DATA.heroTagline}
          </p>
        </motion.div>

        {/* Description Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-2xl w-full mb-6"
        >
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80 backdrop-blur-md text-left sm:text-center">
            {PROFILE_DATA.bioSummary}
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl mb-8"
        >
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm text-left">
            <div className="text-2xl font-bold font-outfit text-teal-300">80+</div>
            <div className="text-[11px] text-slate-400 font-medium">Total Publications</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm text-left">
            <div className="text-2xl font-bold font-outfit text-teal-300">37</div>
            <div className="text-[11px] text-slate-400 font-medium">SCI Indexed Papers</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm text-left">
            <div className="text-2xl font-bold font-outfit text-teal-300">14</div>
            <div className="text-[11px] text-slate-400 font-medium">Funded Research Projects</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm text-left">
            <div className="text-2xl font-bold font-outfit text-teal-300">11</div>
            <div className="text-[11px] text-slate-400 font-medium">Career Milestones</div>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <button
            className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center gap-2"
            id="explore-focus-btn"
          >
            <FileText className="w-4 h-4 text-slate-950" />
            <span>Explore Research Focus</span>
          </button>

          <button
            className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-slate-900/80 text-teal-300 border border-teal-500/30 hover:bg-slate-800 hover:border-teal-400 transition-all duration-300 flex items-center gap-2 backdrop-blur-md"
            id="scuba-master-btn"
          >
            <Compass className="w-4 h-4 text-teal-400" />
            <span>SCUBA Dive Master</span>
          </button>
        </motion.div>
      </div>

    </section>
  );
};
