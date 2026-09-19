import React, { useRef, useState } from 'react';
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
    <div className="h-screen w-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-slate-950 overflow-hidden">
      {/* Main Single Hero Screen View without top header */}
      <main className="relative h-full w-full flex-grow">
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
