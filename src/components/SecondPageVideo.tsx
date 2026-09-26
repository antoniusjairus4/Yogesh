import React, { useRef, useEffect } from 'react';

export const SecondPageVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Second page video autoplay policy:", err);
      });
    }
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen bg-slate-950 overflow-hidden flex items-center justify-center">
      {/* Background Video for Page 2 */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/2nd_page.mp4" type="video/mp4" />
        Your browser does not support HTML5 video background.
      </video>

      {/* Subtle Oceanic Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/60 pointer-events-none" />
    </div>
  );
};
