import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Waves } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'career', label: 'Career' },
  { id: 'research', label: 'Research' },
  { id: 'publications', label: 'Publications' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('career');

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open & listen for Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };

    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    setActiveTab(id);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-out pt-[env(safe-area-inset-top)] bg-[#040917]/95 backdrop-blur-xl border-b border-sky-400/30 shadow-[0_8px_30px_rgba(0,0,0,0.7)]"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 w-full h-16 sm:h-18 flex items-center justify-between">
        
        {/* Brand / Wordmark with Oceanic Crest Icon */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('career');
          }}
          className="group flex items-center gap-2.5 min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg py-1 px-2 -ml-2 hover:bg-white/5 transition-colors"
        >
          <div className="p-1.5 rounded-lg bg-sky-500/20 border border-sky-400/40 shrink-0 text-sky-400 group-hover:scale-105 transition-transform">
            <Waves className="w-5 h-5" />
          </div>
          <span className="font-outfit font-black text-base sm:text-xl text-white tracking-tight truncate transition-colors group-hover:text-sky-300">
            Dr. J.S. Yogesh Kumar
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-8 sm:gap-10">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative text-base font-bold tracking-wide transition-colors duration-200 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded ${
                  isActive ? 'text-sky-300' : 'text-slate-200 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu-overlay"
          aria-label={isMobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          className="md:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-100 hover:text-white bg-white/10 rounded-xl hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          {isMobileOpen ? <X className="w-6 h-6 text-sky-400" /> : <Menu className="w-6 h-6 text-sky-400" />}
        </button>
      </div>

      {/* Mobile Full-Screen Glass Overlay Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-menu-overlay"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 z-50 bg-[#040917]/95 flex flex-col justify-center items-center px-6 md:hidden"
          >
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close menu"
              className="absolute top-5 right-5 p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <X className="w-6 h-6" />
            </button>

            <nav
              aria-label="Primary Mobile"
              className="flex flex-col items-center gap-6 text-center w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeTab === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`text-2xl font-outfit font-bold tracking-wide transition-colors py-2.5 px-6 rounded-xl w-full ${
                      isActive
                        ? 'text-sky-300 bg-sky-500/20 border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
