import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'research', label: 'Research' },
  { id: 'publications', label: 'Publications' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Track scroll position for glass background switch at 40px
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
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

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', ...NAV_ITEMS.map((item) => item.id)];
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileOpen(false);

    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-out pt-[env(safe-area-inset-top)] ${
        isScrolled
          ? 'bg-[#060c1e]/75 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full h-16 flex items-center justify-between">
        
        {/* Brand / Wordmark */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
          className="group flex items-center gap-2 min-w-0 pr-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-md"
        >
          <span className="font-outfit font-bold text-base sm:text-lg text-white tracking-tight truncate transition-colors group-hover:text-sky-400">
            Dr. J.S. Yogesh Kumar
          </span>
        </a>

        {/* Desktop Navigation (min-width: 768px) */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative text-[15px] font-medium transition-colors duration-200 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded ${
                  isActive ? 'text-white' : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}

                {/* Animated Ocean-Blue Underline */}
                {isActive ? (
                  <motion.span
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#38bdf8] rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ) : (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#38bdf8]/90 rounded-full scale-x-0 transition-transform duration-300 origin-left hover:scale-x-100" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button (Base / ~375px) */}
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu-overlay"
          aria-label={isMobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          className="md:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            className="fixed inset-0 z-50 bg-[#060c1e]/90 flex flex-col justify-center items-center px-6 md:hidden"
          >
            {/* Close Button Inside Modal */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close menu"
              className="absolute top-5 right-5 p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Stacked Navigation Links */}
            <nav
              aria-label="Primary Mobile"
              className="flex flex-col items-center gap-6 text-center w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`text-2xl font-outfit font-semibold tracking-wide transition-colors py-2 px-6 rounded-xl w-full ${
                      isActive
                        ? 'text-sky-400 bg-sky-500/10 border border-sky-400/30'
                        : 'text-slate-200 hover:text-white hover:bg-white/5'
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
