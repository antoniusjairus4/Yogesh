import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  onScrollClick?: () => void;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ onScrollClick }) => {
  const handleClick = () => {
    if (onScrollClick) {
      onScrollClick();
    } else {
      const page2 = document.getElementById('page-2');
      if (page2) {
        page2.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center pointer-events-auto cursor-pointer"
      onClick={handleClick}
    >
      <div className="group flex flex-col items-center gap-2 text-white transition-all rounded-lg p-2 select-none">
        <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-all group-hover:scale-105">
          Let's Dive Deeper
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
          className="p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/30 group-hover:border-white/60 group-hover:bg-white/20 transition-all shadow-xl shadow-black/50"
        >
          <ChevronDown className="w-4 h-4 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
};
