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
      {/* Background Video for Page 2 - Full Edge-to-Edge with scaling to remove black void bars */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover object-center transform scale-105 sm:scale-110 origin-center filter brightness-100 contrast-105"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/2nd_page.mp4" type="video/mp4" />
        Your browser does not support HTML5 video background.
      </video>
    </div>
  );
};
