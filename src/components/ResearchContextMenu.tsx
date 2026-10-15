import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Copy, Info, Check, ShieldCheck } from 'lucide-react';
import { getAssetUrl } from '../utils/baseUrl';

export interface ResearchContextMenuProps {
  x: number;
  y: number;
  specimenId: string;
  scientificName: string;
  authority?: string;
  family?: string;
  category?: string;
  downloadPath?: string;
  onClose: () => void;
  onViewDetails?: () => void;
}

export const ResearchContextMenu: React.FC<ResearchContextMenuProps> = ({
  x,
  y,
  specimenId,
  scientificName,
  authority = 'Zoological Survey of India',
  family,
  category,
  downloadPath,
  onClose,
  onViewDetails
}) => {
  const [copied, setCopied] = useState(false);
  const [menuPos, setMenuPos] = useState({ left: x, top: y });
  const menuRef = useRef<HTMLDivElement>(null);

  // Position calculation to ensure menu stays within viewport
  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;

      let adjustedLeft = x;
      let adjustedTop = y;

      if (x + rect.width > viewportW - 12) {
        adjustedLeft = viewportW - rect.width - 12;
      }
      if (y + rect.height > viewportH - 12) {
        adjustedTop = viewportH - rect.height - 12;
      }

      setMenuPos({ left: Math.max(12, adjustedLeft), top: Math.max(12, adjustedTop) });
    }
  }, [x, y]);

  // Handle click outside & Escape key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanName = scientificName.split(' (')[0].replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${specimenId}_${cleanName}_citation.webp`;
    
    // Default download path logic matching Dual-Folder structure
    const targetUrl = downloadPath 
      ? getAssetUrl(downloadPath)
      : getAssetUrl(`/specimens/downloads/${specimenId.startsWith('octo') ? 'octocoral' : specimenId.startsWith('mollusc') ? 'mollusca' : 'coral'}_${specimenId.replace(/^(coral-|octo-|mollusc-)/, '')}.webp`);

    const link = document.createElement('a');
    link.href = targetUrl;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onClose();
  };

  const handleCopyCitation = (e: React.MouseEvent) => {
    e.stopPropagation();
    const citationString = `"${scientificName}" (${authority}) — Catalog: ${specimenId} ${family ? `| Family: ${family}` : ''} | Marine Biodiversity & Coral Taxonomy Lab, Dr. J.S. Yogesh Kumar`;
    
    navigator.clipboard.writeText(citationString);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.94, y: -4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        style={{ left: menuPos.left, top: menuPos.top }}
        className="fixed z-[9999] min-w-[240px] max-w-[280px] bg-[#091624]/95 border border-[#234263] backdrop-blur-2xl shadow-2xl rounded-2xl p-2 text-xs font-sans text-slate-200 select-none"
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Header Header Info */}
        <div className="px-3 py-2 border-b border-[#1b3450] mb-1.5 flex items-center justify-between">
          <div className="truncate pr-2">
            <div className="font-serif italic font-semibold text-slate-100 truncate text-sm">
              {scientificName}
            </div>
            <div className="text-[10px] font-mono text-[#c5a880] truncate">
              ID: {specimenId} {category ? `• ${category}` : ''}
            </div>
          </div>
          <span title="Protected Academic Asset">
            <ShieldCheck className="w-4 h-4 text-[#c5a880] shrink-0" />
          </span>
        </div>

        {/* Menu Actions List */}
        <div className="space-y-0.5 font-mono">
          <button
            type="button"
            onClick={handleDownload}
            className="w-full px-3 py-2 rounded-xl text-left flex items-center gap-2.5 text-slate-200 hover:bg-[#183659] hover:text-white transition-all cursor-pointer group"
          >
            <Download className="w-4 h-4 text-[#c5a880] group-hover:scale-110 transition-transform" />
            <span className="font-medium text-xs">Download Cited Specimen (WebP)</span>
          </button>

          <button
            type="button"
            onClick={handleCopyCitation}
            className="w-full px-3 py-2 rounded-xl text-left flex items-center gap-2.5 text-slate-200 hover:bg-[#183659] hover:text-white transition-all cursor-pointer group"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="font-medium text-xs text-emerald-400">Citation Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400 group-hover:text-slate-200 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-xs">Copy Taxonomic Citation</span>
              </>
            )}
          </button>

          {onViewDetails && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails();
                onClose();
              }}
              className="w-full px-3 py-2 rounded-xl text-left flex items-center gap-2.5 text-slate-200 hover:bg-[#183659] hover:text-white transition-all cursor-pointer group"
            >
              <Info className="w-4 h-4 text-slate-400 group-hover:text-slate-200 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-xs">View Specimen Details</span>
            </button>
          )}
        </div>

        {/* Footer Attribution Badge */}
        <div className="mt-1.5 pt-1.5 border-t border-[#1b3450] px-2 text-[9.5px] font-mono text-slate-400 text-center italic">
          Dr. J.S. Yogesh Kumar Research Archive
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};
