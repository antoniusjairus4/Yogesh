import React, { useState } from 'react';
import { Download, CheckCircle2, Maximize2, ShieldAlert } from 'lucide-react';
import { CoralSpecies } from '../data/coralSpeciesData';
import { getAssetUrl } from '../utils/baseUrl';

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

  const cleanScientificName = specimen.botanicalName.split(' (')[0].replace(/[^a-zA-Z0-9_-]/g, '_');
  const downloadFilename = `${specimen.id}_${cleanScientificName}_citation.webp`;

  const handleTriggerDownload = (e?: React.MouseEvent | React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (downloadState === 'downloading') return;

    setDownloadState('downloading');

    const downloadUrl = getAssetUrl(specimen.downloadImage || specimen.image);

    // Create programmatic anchor element with download attribute
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
  };

  return (
    <div className={`group relative bg-[#091522] border border-[#1c3047] hover:border-[#c5a880] rounded-xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col ${className}`}>
      
      {/* Image Container with Double-Click Download Listener */}
      <div 
        onDoubleClick={handleTriggerDownload}
        className="relative w-full h-64 sm:h-72 bg-black overflow-hidden cursor-pointer selection:bg-transparent"
        title="Double-click to download High-Res Citation Specimen Image"
      >
        <img
          src={getAssetUrl(specimen.displayImage || specimen.image)}
          alt={specimen.botanicalName}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Action Overlay Buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between pointer-events-none">
          
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
              Double-click card to download
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
      <div className="p-4 flex flex-col gap-2 flex-1 justify-between bg-[#0b1929]">
        <div>
          <div className="text-[11px] font-mono text-slate-400">
            Family: <strong className="text-slate-200">{specimen.family}</strong>
          </div>
          <h3 className="text-base font-bold italic text-slate-100 tracking-tight leading-snug">
            {specimen.botanicalName}
          </h3>
          <div className="text-xs text-slate-400 mt-0.5">
            Authority: <span className="text-slate-300 font-mono">{specimen.authority}</span>
          </div>
        </div>

        {/* Card Footer Download Action */}
        <div className="pt-3 border-t border-[#182b42] flex items-center justify-between text-xs">
          <span className="text-[11px] font-mono text-[#e2ba7d]">
            ID: {specimen.id}
          </span>

          <button
            type="button"
            onClick={handleTriggerDownload}
            className="text-xs font-mono font-bold text-[#c5a880] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Research Download</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default SpecimenCard;
