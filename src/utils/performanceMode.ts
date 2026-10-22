import { useState, useEffect } from 'react';

export type PerformanceTier = 'mobile' | 'standard' | 'high';

export interface PerformanceConfig {
  isMobile: boolean;
  isTablet: boolean;
  hasCoarsePointer: boolean;
  prefersReducedMotion: boolean;
  tier: PerformanceTier;
  maxDpr: number;
}

export function getPerformanceConfig(): PerformanceConfig {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      hasCoarsePointer: false,
      prefersReducedMotion: false,
      tier: 'standard',
      maxDpr: 1.5,
    };
  }

  const width = window.innerWidth;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Adaptive DPR: Mobile should not exceed 1.25, desktop max 2.0
  const nativeDpr = window.devicePixelRatio || 1;
  const maxDpr = isMobile 
    ? Math.min(nativeDpr, 1.2) 
    : isTablet 
      ? Math.min(nativeDpr, 1.5) 
      : Math.min(nativeDpr, 2.0);

  let tier: PerformanceTier = 'high';
  if (isMobile || prefersReducedMotion) {
    tier = 'mobile';
  } else if (isTablet || (navigator as any).hardwareConcurrency <= 4) {
    tier = 'standard';
  }

  return {
    isMobile,
    isTablet,
    hasCoarsePointer,
    prefersReducedMotion,
    tier,
    maxDpr,
  };
}

export function usePerformanceMode(): PerformanceConfig {
  const [config, setConfig] = useState<PerformanceConfig>(getPerformanceConfig);

  useEffect(() => {
    let timeoutId: number;

    const handleResizeOrChange = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setConfig(getPerformanceConfig());
      }, 150);
    };

    window.addEventListener('resize', handleResizeOrChange, { passive: true });
    
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(pointer: coarse)');
    
    motionQuery.addEventListener('change', handleResizeOrChange);
    pointerQuery.addEventListener('change', handleResizeOrChange);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResizeOrChange);
      motionQuery.removeEventListener('change', handleResizeOrChange);
      pointerQuery.removeEventListener('change', handleResizeOrChange);
    };
  }, []);

  return config;
}
