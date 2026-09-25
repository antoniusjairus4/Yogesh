import React, { useEffect, useRef, useState } from 'react';

export const ThinkingOrbPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [animProgress, setAnimProgress] = useState(0); // 0 to 1 over 5 seconds
  const [, setIsCompleted] = useState(false);

  // Intersection Observer strictly scoped to Page 2
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setIsVisible(true);
          } else if (!entry.isIntersecting) {
            // Reset when leaving view so scrolling down to Page 2 always triggers fresh
            setIsVisible(false);
            setAnimProgress(0);
            setIsCompleted(false);
          }
        });
      },
      { threshold: [0, 0.1, 0.3, 0.7] }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

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
  }, [isVisible]);

  // High-Precision Canvas Renderer matching the attached Plasma Silk Ring Orb image
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;
    let time = 0;

    const render = () => {
      time += 0.02;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const R = w * 0.38;

      ctx.clearRect(0, 0, w, h);

      // 1. Ambient Outer Halo (Neon Purple & Magenta Glow)
      const outerHalo = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.3);
      outerHalo.addColorStop(0, 'rgba(168, 85, 247, 0.28)'); // Violet
      outerHalo.addColorStop(0.5, 'rgba(236, 72, 153, 0.18)'); // Magenta Pink
      outerHalo.addColorStop(0.85, 'rgba(59, 130, 246, 0.12)'); // Sapphire Blue
      outerHalo.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = outerHalo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Set screen blend mode for luminous neon overlap
      ctx.globalCompositeOperation = 'screen';

      // 2. Glowing Silk Aurora Wave Curtains (Top Right Magenta & Top Left Electric Cyan/Blue)
      const numCurtains = 60;
      for (let i = 0; i < numCurtains; i++) {
        const offset = (i / numCurtains) * Math.PI * 2;
        const waveAmp = 14 + Math.sin(time * 1.5 + i * 0.2) * 8;
        const freq = 3 + (i % 3);

        ctx.beginPath();
        for (let a = 0; a <= 360; a += 4) {
          const rad = (a * Math.PI) / 180;
          const rMod = R + Math.sin(rad * freq + time * 1.8 + offset) * waveAmp * Math.sin(rad);

          const x = cx + Math.cos(rad) * rMod;
          const y = cy + Math.sin(rad) * rMod;

          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();

        // Gradient color along curtain sweep (Top-Right = Hot Pink/Magenta, Top-Left = Cyan/Electric Blue)
        const curtainGrad = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
        curtainGrad.addColorStop(0, 'rgba(0, 245, 212, 0.08)'); // Cyan
        curtainGrad.addColorStop(0.35, 'rgba(59, 130, 246, 0.12)'); // Electric Blue
        curtainGrad.addColorStop(0.7, 'rgba(168, 85, 247, 0.15)'); // Violet Purple
        curtainGrad.addColorStop(1, 'rgba(247, 37, 133, 0.18)'); // Magenta Pink

        ctx.strokeStyle = curtainGrad;
        ctx.lineWidth = 0.8 + (i % 2) * 0.6;
        ctx.stroke();
      }

      // 3. Dense Interior Silk Threads (Curving across upper & lower hemispheres)
      const threads = 35;
      for (let t = 0; t < threads; t++) {
        const angle1 = (t * Math.PI * 2) / threads + time * 0.2;
        const angle2 = angle1 + Math.PI * 0.8 + Math.sin(time + t) * 0.3;

        const x1 = cx + Math.cos(angle1) * (R * 0.96);
        const y1 = cy + Math.sin(angle1) * (R * 0.96);
        const x2 = cx + Math.cos(angle2) * (R * 0.96);
        const y2 = cy + Math.sin(angle2) * (R * 0.96);

        const controlX = cx + Math.sin(time * 0.8 + t) * R * 0.45;
        const controlY = cy + Math.cos(time * 0.8 + t) * R * 0.45;

        const threadGrad = ctx.createLinearGradient(x1, y1, x2, y2);
        threadGrad.addColorStop(0, 'rgba(0, 212, 255, 0.22)');
        threadGrad.addColorStop(0.5, 'rgba(192, 132, 252, 0.28)');
        threadGrad.addColorStop(1, 'rgba(244, 63, 94, 0.25)');

        ctx.strokeStyle = threadGrad;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(controlX, controlY, x2, y2);
        ctx.stroke();
      }

      // 4. Razor-Sharp Luminous Perimeter Ring with White-Hot Accent Flares
      ctx.globalCompositeOperation = 'source-over';

      // Perimeter Stroke Gradient
      const ringGrad = ctx.createConicGradient(time * 0.5, cx, cy);
      ringGrad.addColorStop(0, '#f72585'); // Magenta
      ringGrad.addColorStop(0.25, '#7209b7'); // Purple
      ringGrad.addColorStop(0.5, '#3a0ca3'); // Royal Blue
      ringGrad.addColorStop(0.75, '#00f5d4'); // Cyan
      ringGrad.addColorStop(0.9, '#ffffff'); // White Accent Flare
      ringGrad.addColorStop(1, '#f72585'); // Back to Magenta

      ctx.strokeStyle = ringGrad;
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // Outer Specular Neon Edge Glow
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.995, 0, Math.PI * 2);
      ctx.stroke();

      // 5. Translucent Dark Core Vignette
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.72);
      coreGrad.addColorStop(0, 'rgba(2, 6, 23, 0.94)');
      coreGrad.addColorStop(0.65, 'rgba(5, 11, 24, 0.75)');
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.72, 0, Math.PI * 2);
      ctx.fill();

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  // Timeline Calculation: 2 Heartbeats followed by Exponential Scale & Fade
  // Total duration: 5.0 seconds (5000ms)
  let orbScale = 1.0;
  let orbOpacity = 1.0;
  const rotation = animProgress * 720; // 2 smooth rotations

  if (animProgress <= 0.16) {
    // HEARTBEAT 1 (0ms to 800ms) -> Lub-Dub pulse (1.0 -> 1.28 -> 1.0)
    const t = animProgress / 0.16; // 0 to 1
    const pulse = Math.sin(t * Math.PI);
    orbScale = 1.0 + pulse * 0.28;
    orbOpacity = Math.min(1.0, t * 2.5); // Fade in on entrance
  } else if (animProgress <= 0.36) {
    // HEARTBEAT 2 (800ms to 1800ms) -> Stronger thump pulse (1.0 -> 1.52 -> 1.15)
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
      aria-label="Heartbeat Silk Orb Page"
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

          {/* High-Fidelity Plasma Silk Wave Canvas */}
          <canvas
            ref={canvasRef}
            width={540}
            height={540}
            className="relative w-full h-full rounded-full shadow-[0_0_90px_rgba(168,85,247,0.45),_inset_0_0_45px_rgba(255,255,255,0.4)]"
          />
        </div>
      </div>
    </section>
  );
};
