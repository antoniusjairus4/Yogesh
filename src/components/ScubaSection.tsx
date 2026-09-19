import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Award, Camera, Waves, CheckCircle2, ShieldAlert } from 'lucide-react';

export const ScubaSection: React.FC = () => {
  return (
    <section id="scuba-credentials" className="py-20 px-4 bg-slate-900/40 border-y border-teal-500/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: PADI Credential Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass-panel p-8 rounded-3xl relative border-teal-500/30 glow-teal"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-600 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
                  <Compass className="w-8 h-8 text-teal-300 animate-spin-slow" />
                </div>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Certified Professional</span>
                <h3 className="font-outfit text-2xl font-extrabold text-white">PADI Dive Master</h3>
                <p className="text-xs text-slate-400 font-mono">Credential ID: DM – 494151</p>
              </div>
            </div>

            <div className="space-y-4 mb-6 text-sm text-slate-300">
              <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <Award className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">PADI Dive Master (Dec 2007)</div>
                  <div className="text-xs text-slate-400">Barracuda Dive Centre, Goa, India</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <Waves className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Open Water & Advanced Diver</div>
                  <div className="text-xs text-slate-400">Certified 2006 (Coral Reef Ecosystem Monitoring)</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <ShieldAlert className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Rescue Diver & EFR Certified</div>
                  <div className="text-xs text-slate-400">Emergency First Responder (2007)</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-300 font-medium">
              Over 18+ years of deep-water scientific diving experience across Andaman & Nicobar, Lakshadweep, Gulf of Mannar, and Digha waters.
            </div>
          </motion.div>

          {/* Right Column: Underwater Technical Methodologies */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
              Technical Field Expertise
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
              SCUBA & Underwater Benthic Surveying
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Dr. Yogesh utilizes specialized non-destructive underwater sampling techniques to catalog delicate soft corals, gorgonians, and benthic fauna without disrupting reef ecosystems.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center mb-3">
                  <Waves className="w-5 h-5 text-teal-400" />
                </div>
                <h4 className="font-bold text-white text-base mb-1">Line Intersect Transects (LIT)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Quantitative recording of substrate cover, coral mortality, and octocoral density along 20m/50m underwater transects.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-3">
                  <Camera className="w-5 h-5 text-cyan-400" />
                </div>
                <h4 className="font-bold text-white text-base mb-1">Macro Photo & Videography</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  High-definition underwater macro photography for polyp morphology and Gorgonian sclerite analysis.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
                  <Award className="w-5 h-5 text-emerald-400" />
                </div>
                <h4 className="font-bold text-white text-base mb-1">Quadrat Benthic Assessment</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Random photo-quadrat sampling for statistical reef health indexing and coral recruitment mapping.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-3">
                  <Compass className="w-5 h-5 text-indigo-400" />
                </div>
                <h4 className="font-bold text-white text-base mb-1">Coral Restoration & Relocation</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Hands-on coral transplantation and artificial reef monitoring in Gujarat, Andaman, and Gulf of Mannar.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
