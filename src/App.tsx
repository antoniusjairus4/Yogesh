import React, { useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';

export const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  const handleReplayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => {
        setIsVideoEnded(false);
      }).catch((err) => {
        console.log("Playback replay error:", err);
      });
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-slate-950 overflow-hidden relative">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Single Screen Landing Page */}
      <main className="relative h-full w-full flex-grow overflow-hidden">
        <Hero 
          videoRef={videoRef}
          isVideoEnded={isVideoEnded}
          setIsVideoEnded={setIsVideoEnded}
          handleReplay={handleReplayVideo}
        />
      </main>
    </div>
  );
};

export default App;
