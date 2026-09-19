import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE_DATA } from '../data/portfolioData';
import { MapPin, Mail, Phone, Building2, GraduationCap, Award, ExternalLink, ShieldCheck } from 'lucide-react';

export const ExecutiveSummary: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-4 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
            Institutional Credentials & Contact
          </span>
          <h2 className="font-outfit text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Official ZSI Directorate & Contact
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            Reach out for scientific collaboration, taxonomy identification requests, or institutional inquiries at the Zoological Survey of India, Sunderban Regional Centre.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Official Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 glass-panel p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between border-teal-500/30"
        >
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/30">
                <Building2 className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Official Directorate</span>
                <h3 className="font-outfit text-xl font-bold text-white">Zoological Survey of India</h3>
                <p className="text-xs text-slate-400">Sunderban Regional Centre (SbRC), MoEFCC</p>
              </div>
            </div>

            <div className="space-y-4 mb-8 text-sm">
              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Office Address</div>
                  <div className="text-xs text-slate-300 mt-0.5">{PROFILE_DATA.address}</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <Mail className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Email Address</div>
                  <a href={`mailto:${PROFILE_DATA.email}`} className="text-xs text-cyan-300 hover:underline mt-0.5 block">
                    {PROFILE_DATA.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Mobile Contact</div>
                  <a href={`tel:${PROFILE_DATA.mobile}`} className="text-xs text-emerald-300 hover:underline mt-0.5 block">
                    {PROFILE_DATA.mobile}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              Official Government Institution
            </span>
            <span className="text-[10px] font-mono text-slate-500">MoEFCC, Govt. of India</span>
          </div>
        </motion.div>

        {/* Right Column: Academic Degrees & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-6 glass-panel p-8 rounded-3xl relative overflow-hidden"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
              <GraduationCap className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Academic Foundations</span>
              <h3 className="font-outfit text-xl font-bold text-white">Qualifications & Degrees</h3>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-teal-400">2012</span>
                <h4 className="font-bold text-white text-base">Ph.D. in Zoology</h4>
                <p className="text-xs text-slate-400">V.O.C. College, Manonmaniam Sundaranar University, Tamil Nadu</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">Doctorate</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400">2006</span>
                <h4 className="font-bold text-white text-base">M.Phil. in Zoology</h4>
                <p className="text-xs text-slate-400">V.O.C. College, Manonmaniam Sundaranar University, Tamil Nadu</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">M.Phil.</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-400">2004</span>
                <h4 className="font-bold text-white text-base">M.Sc. in Zoology</h4>
                <p className="text-xs text-slate-400">V.O.C. College, Manonmaniam Sundaranar University, Tamil Nadu</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">Master's</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-purple-400">2001</span>
                <h4 className="font-bold text-white text-base">B.Sc. in Zoology</h4>
                <p className="text-xs text-slate-400">Kamaraj College, Manonmaniam Sundaranar University, Tamil Nadu</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">Bachelor's</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
