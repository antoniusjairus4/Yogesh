import React, { useRef, useState } from 'react';
import { Header } from './components/Header';
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
      
      {/* Fixed Header */}
      <Header 
        onReplayVideo={handleReplayVideo}
        isVideoFinished={isVideoEnded}
      />

      {/* Main Single Hero Screen View */}
      <main className="flex-grow relative h-full w-full">
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
