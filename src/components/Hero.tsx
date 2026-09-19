import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PROFILE_DATA } from '../data/portfolioData';
import { Play, RotateCcw, ShieldCheck, Award, Compass, FileText, ChevronDown, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isVideoEnded: boolean;
  setIsVideoEnded: (ended: boolean) => void;
  handleReplay: () => void;
}

export const Hero: React.FC<HeroProps> = ({ videoRef, isVideoEnded, setIsVideoEnded, handleReplay }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay policy fallback if browser restricts
        console.log("Autoplay handled cleanly");
      });
    }
  }, [videoRef]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden bg-slate-950">
      
      {/* Video Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-75 contrast-110"
          autoPlay
          muted
          playsInline
          loop={false}
          poster="./poster.png"
          onEnded={() => setIsVideoEnded(true)}
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="./Yogesh_landing.mp4" type="video/mp4" />
          Your browser does not support HTML5 video background.
        </video>

        {/* Ambient Overlay Gradients for Superior Contrast & Cinematic Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto text-left w-full mt-4">
        
        {/* Top Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-2 mb-6"
        >
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30 backdrop-blur-md shadow-md shadow-teal-500/10">
            <ShieldCheck className="w-4 h-4 mr-1.5 text-teal-400" />
            Scientist E & Officer-in-Charge
          </span>

          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
            <Award className="w-4 h-4 mr-1.5 text-cyan-400" />
            Zoological Survey of India (ZSI)
          </span>

          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
            <Compass className="w-4 h-4 mr-1.5 text-indigo-400" />
            PADI Dive Master (DM-494151)
          </span>
        </motion.div>

        {/* Main Name Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-outfit font-extrabold text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.1] mb-4">
            <span className="block text-slate-100">Dr. J.S. Yogesh</span>
            <span className="text-gradient-ocean inline-block">Kumar</span>
          </h1>

          <p className="text-lg sm:text-2xl font-serif text-teal-200/90 font-medium max-w-3xl mb-6 leading-relaxed">
            {PROFILE_DATA.heroTagline}
          </p>
        </motion.div>

        {/* Detailed Scientific Profile Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl"
        >
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 backdrop-blur-md">
            {PROFILE_DATA.bioSummary}
          </p>

          {/* Quick Highlight Metrics Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <div className="p-3 rounded-xl bg-slate-900/70 border border-teal-500/20 backdrop-blur-sm">
              <div className="text-2xl font-bold font-outfit text-teal-300">80+</div>
              <div className="text-xs text-slate-400 font-medium">Total Publications</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/70 border border-cyan-500/20 backdrop-blur-sm">
              <div className="text-2xl font-bold font-outfit text-cyan-300">37</div>
              <div className="text-xs text-slate-400 font-medium">SCI Indexed Papers</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/70 border border-indigo-500/20 backdrop-blur-sm">
              <div className="text-2xl font-bold font-outfit text-indigo-300">14</div>
              <div className="text-xs text-slate-400 font-medium">Funded Research Projects</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/70 border border-emerald-500/20 backdrop-blur-sm">
              <div className="text-2xl font-bold font-outfit text-emerald-300">11</div>
              <div className="text-xs text-slate-400 font-medium">Career Milestones</div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center gap-4"
        >
          <a
            href="#research-pillars"
            className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 text-slate-950 shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center gap-2"
            id="explore-research-btn"
          >
            <FileText className="w-4 h-4 text-slate-950" />
            <span>Explore Research Focus</span>
          </a>

          <a
            href="#scuba-credentials"
            className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/80 text-teal-300 border border-teal-500/30 hover:bg-slate-800/90 hover:border-teal-400 transition-all duration-300 flex items-center gap-2 backdrop-blur-md"
            id="scuba-credentials-btn"
          >
            <Compass className="w-4 h-4 text-teal-400" />
            <span>SCUBA Dive Master</span>
          </a>

          {isVideoEnded && (
            <button
              onClick={handleReplay}
              className="px-5 py-3.5 rounded-xl text-xs font-semibold bg-slate-900/90 text-slate-300 border border-slate-700 hover:text-teal-300 hover:border-teal-500/50 transition-all duration-300 flex items-center gap-2 backdrop-blur-md"
              id="hero-replay-btn"
            >
              <RotateCcw className="w-4 h-4 text-teal-400" />
              <span>Replay Video (Runs Once)</span>
            </button>
          )}
        </motion.div>
      </div>

      {/* Video Status Indicator & Scroll Prompt */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 backdrop-blur-md">
          <span className={`w-2 h-2 rounded-full ${isVideoEnded ? 'bg-slate-500' : 'bg-teal-400 animate-ping'}`} />
          <span>{isVideoEnded ? 'Background Video Finished (Stopped)' : 'Background Video Playing Once'}</span>
        </div>
        <ChevronDown className="w-5 h-5 text-teal-400/80 animate-bounce" />
      </div>
    </section>
  );
};
