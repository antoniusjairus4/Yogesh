import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Sparkles } from 'lucide-react';

export const ThinkingOrbPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [animProgress, setAnimProgress] = useState(0); // 0 to 1 over 5 seconds
  const [isCompleted, setIsCompleted] = useState(false);
  const [key, setKey] = useState(0); // To allow replaying

  // Intersection Observer to trigger animation when Page 2 enters full view
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            setIsVisible(true);
          }
        });
      },
      { threshold: [0.1, 0.4, 0.8] }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [key]);

  // 5-Second Animation Sequence Loop
  useEffect(() => {
    if (!isVisible) return;

    let animationFrameId: number;
    const startTime = performance.now();
    const DURATION = 5000; // 5 seconds exact

    setIsCompleted(false);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / DURATION, 1);

      setAnimProgress(progress);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setIsCompleted(true);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, key]);

  // Canvas Shader-like Plasma Orb Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;
    let time = 0;

    const render = () => {
      time += 0.03;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = w * 0.42;

      ctx.clearRect(0, 0, w, h);

      // Base spherical glow gradient
      const outerGlow = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius);
      outerGlow.addColorStop(0, 'rgba(0, 245, 212, 0.9)'); // Prussian Cyan
      outerGlow.addColorStop(0.3, 'rgba(0, 180, 216, 0.7)'); // Azure Sapphire
      outerGlow.addColorStop(0.6, 'rgba(0, 49, 83, 0.8)'); // Prussian Blue
      outerGlow.addColorStop(0.85, 'rgba(123, 44, 191, 0.5)'); // Deep Violet
      outerGlow.addColorStop(1, 'rgba(5, 11, 24, 0)');

      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Swirling internal fluid energy nodes
      const colors = [
        'rgba(0, 245, 212, 0.65)',
        'rgba(0, 180, 216, 0.6)',
        'rgba(123, 44, 191, 0.55)',
        'rgba(247, 37, 133, 0.45)',
        'rgba(0, 49, 83, 0.8)',
      ];

      for (let i = 0; i < 5; i++) {
        const angle = time * (0.8 + i * 0.3) + (i * Math.PI * 2) / 5;
        const dist = radius * 0.35 * Math.sin(time * 0.5 + i);
        const ox = cx + Math.cos(angle) * dist;
        const oy = cy + Math.sin(angle) * dist;
        const nodeRadius = radius * (0.35 + 0.1 * Math.cos(time + i));

        const nodeGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, nodeRadius);
        nodeGrad.addColorStop(0, colors[i]);
        nodeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = nodeGrad;
        ctx.beginPath();
        ctx.arc(ox, oy, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Outer glassy specular rim highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.98, -Math.PI * 0.75, -Math.PI * 0.25);
      ctx.stroke();

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  const handleReplay = () => {
    setIsVisible(false);
    setAnimProgress(0);
    setIsCompleted(false);
    setKey((prev) => prev + 1);
    setTimeout(() => {
      setIsVisible(true);
    }, 50);
  };

  // Math for 5-second scale & rotation
  // Cubic ease-in curve for exponential expansion
  const easeInExp = Math.pow(animProgress, 3);
  // Scale expands from 1.0x to 45.0x (completely engulfs 4K screens)
  const orbScale = 1 + easeInExp * 45;
  // Rotates 3 full turns (1080 deg) in 5 seconds
  const orbRotation = animProgress * 1080;
  // Opacity fades smoothly near the 4.8s mark so screen is blank dark navy/black
  const orbOpacity = animProgress > 0.92 ? 1 - (animProgress - 0.92) / 0.08 : 1;

  return (
    <section
      id="page-2"
      ref={containerRef}
      className="relative w-full h-screen snap-start flex-shrink-0 overflow-hidden select-none bg-gradient-to-b from-[#020408] via-[#001b3a] to-[#040a17]"
      aria-label="Thinking Orb Page"
    >
      {/* Background Ambient Layers (Black + Prussian Blue + Deep Navy) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#003153]/30 via-[#050b18] to-[#020408] pointer-events-none" />

      {/* Floating Deep-Sea Background Grid / Particle Accents */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00f5d4_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      {/* CENTERED ANIMATED THINKING ORB CONTAINER */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-10 overflow-hidden">
        <div
          style={{
            transform: `rotate(${orbRotation}deg) scale(${orbScale})`,
            opacity: orbOpacity,
            willChange: 'transform, opacity',
          }}
          className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] flex items-center justify-center transition-transform ease-linear"
        >
          {/* Glass Outer Glow Aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00f5d4]/40 via-[#00b4d8]/30 to-[#7b2cbf]/50 blur-3xl opacity-80 animate-pulse" />

          {/* Canvas Orb Core */}
          <canvas
            ref={canvasRef}
            width={500}
            height={500}
            className="relative w-full h-full rounded-full shadow-[0_0_100px_rgba(0,245,212,0.5),_inset_0_0_50px_rgba(255,255,255,0.4)]"
          />
        </div>
      </div>

      {/* SCREEN BLANK INDICATOR & REPLAY CONTROLLER */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-3 bg-[#060d24]/90 backdrop-blur-xl border border-[#00f5d4]/30 px-5 py-2.5 rounded-full shadow-2xl shadow-cyan-950/60"
            >
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-200 uppercase">
                <Sparkles className="w-4 h-4 text-[#00f5d4]" />
                Orb Expanded • Screen Blank
              </div>

              <button
                onClick={handleReplay}
                className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#00b4d8] to-[#00f5d4] hover:from-[#00f5d4] hover:to-[#00b4d8] text-slate-950 text-xs font-bold rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Replay (5s)
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
