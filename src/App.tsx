import React, { useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PROFILE_DATA, RESEARCH_PILLARS, CAREER_SNAPSHOT } from './data/portfolioData';
import { BookOpen, Award, Briefcase, Mail, MapPin, Phone, ShieldCheck, Compass, FileText } from 'lucide-react';

export const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  const handleReplayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => {
        setIsVideoEnded(false);
      }).catch((err) => {
        console.log("Playback replay error:", err);
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-slate-950 overflow-x-hidden">
      {/* Fixed Top Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <main className="relative w-full">
        <Hero 
          videoRef={videoRef}
          isVideoEnded={isVideoEnded}
          setIsVideoEnded={setIsVideoEnded}
          handleReplay={handleReplayVideo}
        />

        {/* Section 1: About */}
        <section id="about" className="scroll-mt-20 py-20 px-4 sm:px-6 max-w-[1200px] mx-auto w-full">
          <div className="text-center mb-12">
            <span className="glass-badge inline-block text-sky-400 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-3">
              Executive Profile
            </span>
            <h2 className="font-outfit font-bold text-3xl sm:text-5xl text-white tracking-tight">
              About Dr. Yogesh Kumar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Bio Card */}
            <div className="apple-liquid-glass p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-outfit font-semibold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-sky-400" />
                  Leadership &amp; Expertise
                </h3>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-4">
                  {PROFILE_DATA.officialTitle} at {PROFILE_DATA.institution}, under {PROFILE_DATA.ministry}.
                </p>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Specializing in Octocorallia &amp; Gorgonian taxonomy, marine biodiversity assessment, and climate change impacts on coral reefs across India's coastal regions.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                <span className="text-xs bg-sky-500/15 border border-sky-400/30 text-sky-300 px-3 py-1 rounded-full font-medium">
                  {PROFILE_DATA.padiYear}
                </span>
                <span className="text-xs bg-teal-500/15 border border-teal-400/30 text-teal-300 px-3 py-1 rounded-full font-medium">
                  ZSI Scientist E
                </span>
              </div>
            </div>

            {/* Career Timeline Highlights */}
            <div className="apple-liquid-glass p-6 sm:p-8">
              <h3 className="text-xl font-outfit font-semibold text-white mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-sky-400" />
                Career Snapshot
              </h3>
              <div className="space-y-6">
                {CAREER_SNAPSHOT.map((item, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-sky-400/40">
                    <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                    <span className="text-xs font-semibold text-sky-400 tracking-wide uppercase">
                      {item.period}
                    </span>
                    <h4 className="text-base font-semibold text-white mt-0.5">{item.title}</h4>
                    <p className="text-xs text-slate-400 mb-1">{item.location}</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.focus}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Research */}
        <section id="research" className="scroll-mt-20 py-20 px-4 sm:px-6 max-w-[1200px] mx-auto w-full">
          <div className="text-center mb-12">
            <span className="glass-badge inline-block text-sky-400 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-3">
              Scientific Initiatives
            </span>
            <h2 className="font-outfit font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Research Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESEARCH_PILLARS.map((pillar) => (
              <div key={pillar.id} className="apple-liquid-glass p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/20">
                      {pillar.agency}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{pillar.period}</span>
                  </div>
                  <h3 className="text-xl font-outfit font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-xs font-medium text-teal-300 mb-4">{pillar.role}</p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">{pillar.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {pillar.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs bg-slate-800/80 text-slate-300 px-2.5 py-1 rounded-md border border-white/5">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Publications */}
        <section id="publications" className="scroll-mt-20 py-20 px-4 sm:px-6 max-w-[1200px] mx-auto w-full">
          <div className="text-center mb-12">
            <span className="glass-badge inline-block text-sky-400 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-3">
              Academic Output
            </span>
            <h2 className="font-outfit font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Publications &amp; Books
            </h2>
          </div>

          <div className="apple-liquid-glass p-8 text-center max-w-3xl mx-auto">
            <BookOpen className="w-12 h-12 text-sky-400 mx-auto mb-4" />
            <h3 className="text-2xl font-outfit font-bold text-white mb-2">80+ Peer-Reviewed Publications</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Including 37 SCI Indexed journal papers, comprehensive taxonomic treatises on Gorgonians, books on Sunderban faunal diversity, and policy chapters for coastal ecosystem conservation.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold font-outfit text-sky-400">37</div>
                <div className="text-xs text-slate-300 mt-1">SCI Journals</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold font-outfit text-teal-400">80+</div>
                <div className="text-xs text-slate-300 mt-1">Total Papers &amp; Books</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl col-span-2 sm:col-span-1">
                <div className="text-2xl font-bold font-outfit text-indigo-400">2007-2026</div>
                <div className="text-xs text-slate-300 mt-1">Active Output</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Projects */}
        <section id="projects" className="scroll-mt-20 py-20 px-4 sm:px-6 max-w-[1200px] mx-auto w-full">
          <div className="text-center mb-12">
            <span className="glass-badge inline-block text-sky-400 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-3">
              Grants &amp; Fieldwork
            </span>
            <h2 className="font-outfit font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Funded Projects &amp; SCUBA Expeditions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="apple-liquid-glass p-6 sm:p-8">
              <Briefcase className="w-8 h-8 text-sky-400 mb-4" />
              <h3 className="text-xl font-outfit font-bold text-white mb-2">14 Funded Research Grants</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Principal Investigator on competitive research projects funded by DST-SERB, ANRF, and MoEFCC targeting marine taxonomy, coral health, and climate adaptation strategies.
              </p>
            </div>
            <div className="apple-liquid-glass p-6 sm:p-8">
              <Compass className="w-8 h-8 text-teal-400 mb-4" />
              <h3 className="text-xl font-outfit font-bold text-white mb-2">SCUBA &amp; Benthic Transects</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                PADI Certified Dive Master (DM-494151, since 2007) executing underwater Line Intersect Transect (LIT) surveys, coral bleaching monitoring, and marine underwater videography.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Contact */}
        <section id="contact" className="scroll-mt-20 py-20 px-4 sm:px-6 max-w-[1200px] mx-auto w-full">
          <div className="text-center mb-12">
            <span className="glass-badge inline-block text-sky-400 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-3">
              Get in Touch
            </span>
            <h2 className="font-outfit font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Contact &amp; Official Address
            </h2>
          </div>

          <div className="apple-liquid-glass p-8 max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-sky-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Office Address</h4>
                  <p className="text-white text-sm sm:text-base mt-1">{PROFILE_DATA.institution}</p>
                  <p className="text-slate-300 text-xs sm:text-sm mt-0.5">{PROFILE_DATA.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-white/10">
                <Mail className="w-6 h-6 text-sky-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Email</h4>
                  <a href={`mailto:${PROFILE_DATA.email}`} className="text-sky-300 hover:text-white text-sm sm:text-base transition-colors font-medium mt-1 inline-block">
                    {PROFILE_DATA.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-white/10">
                <Phone className="w-6 h-6 text-sky-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Mobile</h4>
                  <a href={`tel:${PROFILE_DATA.mobile}`} className="text-sky-300 hover:text-white text-sm sm:text-base transition-colors font-medium mt-1 inline-block">
                    {PROFILE_DATA.mobile}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} {PROFILE_DATA.name} • Zoological Survey of India (ZSI)</p>
      </footer>
    </div>
  );
};

export default App;
