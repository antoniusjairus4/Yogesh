import React from 'react';
import { Waves, Play, RotateCcw, ShieldCheck, Mail, MapPin } from 'lucide-react';

interface HeaderProps {
  onReplayVideo?: () => void;
  isVideoFinished?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onReplayVideo, isVideoFinished }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-slate-950/70 backdrop-blur-md border-b border-teal-500/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Identity */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-600 p-[1px] shadow-lg shadow-teal-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Waves className="w-5 h-5 text-teal-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="font-outfit font-bold text-lg text-white leading-tight tracking-wide flex items-center gap-2">
              Dr. J.S. Yogesh Kumar
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30">
                <ShieldCheck className="w-3 h-3 mr-1" /> Scientist E
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-sans truncate max-w-xs sm:max-w-md">
              Zoological Survey of India (ZSI), MoEFCC
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {onReplayVideo && (
            <button
              onClick={onReplayVideo}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border ${
                isVideoFinished 
                  ? 'bg-teal-500/20 text-teal-300 border-teal-400/50 hover:bg-teal-500/30 glow-teal' 
                  : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
              title="Replay landing background video once"
              id="replay-video-btn"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isVideoFinished ? 'animate-spin-slow text-teal-400' : ''}`} />
              <span className="hidden sm:inline">Replay Video</span>
            </button>
          )}

          <a
            href="#contact"
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 hover:from-teal-400 hover:to-cyan-400 transition-all shadow-md shadow-teal-500/20 active:scale-95"
            id="header-contact-btn"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Office</span>
          </a>
        </div>
      </div>
    </header>
  );
};
