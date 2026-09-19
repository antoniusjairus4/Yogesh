import React from 'react';
import { Waves, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 py-12 px-4 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Affiliation */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
            <Waves className="w-4 h-4 text-teal-400" />
          </div>
          <div>
            <div className="font-bold text-white text-sm">Dr. J.S. Yogesh Kumar</div>
            <div className="text-[11px] text-slate-400">Scientist E & Officer-in-Charge | ZSI Sunderban Regional Centre, MoEFCC</div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center space-x-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium bg-slate-900 text-slate-300 border border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400 mr-1.5" />
            Official Government Portfolio
          </span>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Dr. J.S. Yogesh Kumar. All rights reserved.</p>
          <p className="mt-0.5 text-slate-600">Zoological Survey of India, Ministry of Environment, Forest & Climate Change.</p>
        </div>

      </div>
    </footer>
  );
};
