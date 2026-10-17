import React, { useState, useCallback } from 'react';
import { Download, CheckCircle2, Maximize2 } from 'lucide-react';
import { CoralSpecies } from '../data/coralSpeciesData';
import { getAssetUrl } from '../utils/baseUrl';
import { ResearchContextMenu } from './ResearchContextMenu';

export interface SpecimenCardProps {
  specimen: CoralSpecies;
  onOpenZoom?: (specimen: CoralSpecies) => void;
  className?: string;
}

export const SpecimenCard: React.FC<SpecimenCardProps> = ({
  specimen,
  onOpenZoom,
  className = ''
}) => {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'completed'>('idle');
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null);

  const cleanScientificName = specimen.botanicalName.split(' (')[0].replace(/[^a-zA-Z0-9_-]/g, '_');
  const downloadFilename = `${specimen.id}_${cleanScientificName}_citation.webp`;

  const handleTriggerDownload = useCallback((e?: React.MouseEvent | React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (downloadState === 'downloading') return;

    setDownloadState('downloading');

    const downloadUrl = getAssetUrl(specimen.downloadImage || specimen.image);

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = downloadFilename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadState('completed');
      setTimeout(() => {
        setDownloadState('idle');
      }, 2500);
    }, 600);
  }, [specimen, downloadFilename, downloadState]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className={`group relative bg-[#091522] border border-[#1c3047] hover:border-[#c5a880] rounded-xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col ${className}`}>
      
      {/* Image Container with Protected Glass Shield */}
      <div 
        className="relative w-full h-64 sm:h-72 bg-black overflow-hidden cursor-pointer selection:bg-transparent"
        title="Right-click for options or double-click to download watermarked specimen"
      >
        <img
          src={getAssetUrl(specimen.displayImage || specimen.image)}
          alt={specimen.botanicalName}
          loading="lazy"
          decoding="async"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none -webkit-user-drag-none"
        />

        {/* Transparent Glass Shield Overlay - Intercepts Native Pointer Events */}
        <div 
          onContextMenu={handleContextMenu}
          onDoubleClick={handleTriggerDownload}
          onDragStart={(e) => e.preventDefault()}
          className="absolute inset-0 z-10 select-none bg-transparent cursor-pointer -webkit-user-drag-none"
        />

        {/* Hover Action Overlay Buttons */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between pointer-events-none">
          
          <div className="flex justify-between items-center w-full pointer-events-auto">
            <span className="px-2.5 py-1 text-[10px] font-mono font-bold bg-[#c5a880]/90 text-slate-950 rounded uppercase tracking-wider">
              {specimen.group} • {specimen.category}
            </span>

            {onOpenZoom && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenZoom(specimen);
                }}
                className="p-2 rounded-lg bg-black/70 hover:bg-black text-[#e2ba7d] border border-white/20 transition-all cursor-pointer"
                title="Zoom Specimen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between pointer-events-auto">
            <span className="text-[11px] font-mono text-slate-300 italic">
              Right-click menu / Double-click
            </span>

            <button
              type="button"
              onClick={handleTriggerDownload}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                downloadState === 'completed'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                  : 'bg-[#c5a880] hover:bg-white text-slate-950 border-white/40'
              }`}
            >
              {downloadState === 'downloading' ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Preparing...</span>
                </>
              ) : downloadState === 'completed' ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Citation</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Card Body Metadata */}
      <div className="p-3 flex items-center justify-between bg-[#0b1929] border-t border-[#182b42]">
        <span className="text-[11px] font-mono text-[#e2ba7d]">
          {specimen.id}
        </span>

        <button
          type="button"
          onClick={handleTriggerDownload}
          className="text-xs font-mono font-bold text-[#c5a880] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download</span>
        </button>
      </div>

      {/* Custom Oceanic Research Context Menu */}
      {menuPos && (
        <ResearchContextMenu
          x={menuPos.x}
          y={menuPos.y}
          specimenId={specimen.id}
          scientificName={specimen.botanicalName}
          authority={specimen.authority}
          family={specimen.family}
          category={specimen.category}
          downloadPath={specimen.downloadImage || specimen.image}
          onClose={() => setMenuPos(null)}
          onViewDetails={onOpenZoom ? () => onOpenZoom(specimen) : undefined}
        />
      )}

    </div>
  );
};

export default SpecimenCard;
