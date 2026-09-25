import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Sparkles } from 'lucide-react';

export const ThinkingOrbPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [animProgress, setAnimProgress] = useState(0); // 0 to 1 over 5 seconds
  const [isCompleted, setIsCompleted] = useState(false);
  const [key, setKey] = useState(0);

  // Intersection Observer strictly scoped to Page 2
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setIsVisible(true);
          }
        });
      },
      { threshold: [0.1, 0.3, 0.7] }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [key]);

  // Animation Sequence (2 Heartbeats followed by Expansion & Fade)
  useEffect(() => {
    if (!isVisible) return;

    let animationFrameId: number;
    const startTime = performance.now();
    const DURATION = 5000; // 5 seconds

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

  // High-fidelity Canvas Renderer matching the attached Plasma Ring Orb image
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;
    let time = 0;

    const render = () => {
      time += 0.025;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const baseRadius = w * 0.36;

      ctx.clearRect(0, 0, w, h);

      // Additive glowing composite mode for vivid energy ribbons
      ctx.globalCompositeOperation = 'screen';

      // 1. Outer Neon Aura Glow
      const bgGlow = ctx.createRadialGradient(cx, cy, baseRadius * 0.5, cx, cy, baseRadius * 1.25);
      bgGlow.addColorStop(0, 'rgba(123, 44, 191, 0.25)'); // Violet
      bgGlow.addColorStop(0.5, 'rgba(0, 180, 216, 0.2)'); // Sapphire
      bgGlow.addColorStop(0.85, 'rgba(247, 37, 133, 0.15)'); // Magenta
      bgGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = bgGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // 2. Multilayered Swirling Energy Waves (Ribbons & Plasma Filaments)
      const ribbons = [
        { color: 'rgba(0, 180, 216, 0.85)', speed: 1.2, freq: 4, amp: 18, width: 3.5 }, // Electric Sapphire
        { color: 'rgba(123, 44, 191, 0.85)', speed: -0.9, freq: 6, amp: 22, width: 3.0 }, // Deep Violet
        { color: 'rgba(247, 37, 133, 0.75)', speed: 1.5, freq: 5, amp: 15, width: 2.5 }, // Neon Magenta
        { color: 'rgba(0, 245, 212, 0.9)', speed: -1.4, freq: 8, amp: 12, width: 2.0 }, // Cyan White
        { color: 'rgba(255, 255, 255, 0.95)', speed: 2.0, freq: 10, amp: 8, width: 1.5 }, // White Core Pulse
      ];

      ribbons.forEach((r, idx) => {
        ctx.strokeStyle = r.color;
        ctx.lineWidth = r.width;
        ctx.beginPath();

        const steps = 360;
        for (let i = 0; i <= steps; i++) {
          const angle = (i * Math.PI) / 180;
          const wave1 = Math.sin(angle * r.freq + time * r.speed + idx);
          const wave2 = Math.cos(angle * (r.freq * 0.5) - time * 0.8);
          const currentR = baseRadius + wave1 * r.amp + wave2 * (r.amp * 0.5);

          const x = cx + Math.cos(angle) * currentR;
          const y = cy + Math.sin(angle) * currentR;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.stroke();
      });

      // 3. Dense Inner Plasma Filament Mesh (Fine lines connecting perimeter)
      ctx.lineWidth = 0.5;
      const numFilaments = 40;
      for (let i = 0; i < numFilaments; i++) {
        const angle1 = (i * Math.PI * 2) / numFilaments + time * 0.3;
        const angle2 = angle1 + Math.PI * 0.75 + Math.sin(time + i) * 0.4;

        const r1 = baseRadius + Math.sin(angle1 * 3 + time) * 12;
        const r2 = baseRadius + Math.cos(angle2 * 4 - time) * 14;

        const x1 = cx + Math.cos(angle1) * r1;
        const y1 = cy + Math.sin(angle1) * r1;
        const x2 = cx + Math.cos(angle2) * r2;
        const y2 = cy + Math.sin(angle2) * r2;

        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, 'rgba(0, 180, 216, 0.35)');
        grad.addColorStop(0.5, 'rgba(123, 44, 191, 0.25)');
        grad.addColorStop(1, 'rgba(247, 37, 133, 0.35)');

        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(cx + Math.sin(time + i) * 30, cy + Math.cos(time + i) * 30, x2, y2);
        ctx.stroke();
      }

      // 4. Dark Specular Hollow Center
      ctx.globalCompositeOperation = 'source-over';
      const centerCore = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius * 0.75);
      centerCore.addColorStop(0, 'rgba(3, 7, 18, 0.95)');
      centerCore.addColorStop(0.7, 'rgba(5, 11, 24, 0.7)');
      centerCore.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = centerCore;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 0.75, 0, Math.PI * 2);
      ctx.fill();

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

  // Timeline Calculation: 2 Heartbeats followed by Exponential Scale & Fade
  // Total duration: 5.0 seconds (5000ms)
  let orbScale = 1.0;
  let orbOpacity = 1.0;
  const rotation = animProgress * 720; // 2 smooth rotations

  if (animProgress <= 0.16) {
    // HEARTBEAT 1 (0ms to 800ms) -> Lub-Dub pulse (1.0 -> 1.3 -> 1.0)
    const t = animProgress / 0.16; // 0 to 1
    const pulse = Math.sin(t * Math.PI);
    orbScale = 1.0 + pulse * 0.28;
    orbOpacity = Math.min(1.0, t * 2.5); // Fade in on entrance
  } else if (animProgress <= 0.36) {
    // HEARTBEAT 2 (800ms to 1800ms) -> Stronger thump pulse (1.0 -> 1.55 -> 1.15)
    const t = (animProgress - 0.16) / 0.2; // 0 to 1
    const pulse = Math.sin(t * Math.PI);
    orbScale = 1.0 + pulse * 0.52;
    orbOpacity = 1.0;
  } else {
    // EXPANSION & FADE OUT (1800ms to 5000ms) -> Exponential swell + Smooth Fade Out
    const t = (animProgress - 0.36) / 0.64; // 0 to 1
    const easeExp = Math.pow(t, 2.8);
    orbScale = 1.15 + easeExp * 48; // Expands outward from 1.15x to 49.0x

    // Smooth fade out so screen becomes completely blank
    if (t > 0.4) {
      orbOpacity = Math.max(0, 1 - (t - 0.4) / 0.6);
    } else {
      orbOpacity = 1.0;
    }
  }

  return (
    <section
      id="page-2"
      ref={containerRef}
      className="relative w-full h-screen snap-start flex-shrink-0 overflow-hidden select-none bg-gradient-to-b from-[#020408] via-[#001b3a] to-[#040a17]"
      aria-label="Heartbeat Plasma Orb Page"
    >
      {/* Deep Sea / Prussian Blue Ambient Background (Strictly contained in Page 2) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#003153]/35 via-[#050b18] to-[#020408] pointer-events-none" />

      {/* Subtle Background Particle Grid */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00b4d8_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      {/* CENTERED ORB CONTAINER - STRICTLY ABSOLUTE & SCOPED TO PAGE 2 */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10 overflow-hidden">
        <div
          style={{
            transform: `rotate(${rotation}deg) scale(${orbScale})`,
            opacity: orbOpacity,
            willChange: 'transform, opacity',
          }}
          className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] flex items-center justify-center transition-transform duration-75 ease-out"
        >
          {/* Outer Liquid Neon Glass Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00b4d8]/40 via-[#7b2cbf]/40 to-[#f72585]/40 blur-3xl opacity-80 animate-pulse" />

          {/* High-Fidelity Plasma Wave Canvas */}
          <canvas
            ref={canvasRef}
            width={540}
            height={540}
            className="relative w-full h-full rounded-full shadow-[0_0_90px_rgba(0,180,216,0.45),_inset_0_0_45px_rgba(255,255,255,0.4)]"
          />
        </div>
      </div>

      {/* REPLAY CONTROLLER & BLANK SCREEN BADGE */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-3 bg-[#060d24]/90 backdrop-blur-xl border border-sky-400/30 px-5 py-2.5 rounded-full shadow-2xl shadow-sky-950/70"
            >
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-sky-200 uppercase">
                <Sparkles className="w-4 h-4 text-sky-400" />
                Heartbeat Orb Expanded • Screen Blank
              </div>

              <button
                onClick={handleReplay}
                className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-300 hover:to-indigo-400 text-slate-950 text-xs font-bold rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Replay Heartbeat
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
