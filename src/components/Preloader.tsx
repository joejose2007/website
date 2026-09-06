import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/audio';

interface PreloaderProps {
  onLoaded: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Opening sketchbook...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsDone(true);
          setTimeout(() => {
            sounds.playPaperRustle();
            onLoaded();
          }, 450);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 15) + 8;
        if (next > 30 && next < 60) {
          setStatusText('Inking Linux distributions...');
        } else if (next >= 60 && next < 85) {
          setStatusText('Rendering network visualizer...');
        } else if (next >= 85) {
          setStatusText('Welcome to Joe Jose\'s Portfolio!');
        }
        return next > 100 ? 100 : next;
      });
    }, 90);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#f5f1e8] bg-kraft-grid transition-opacity duration-500 ${
        isDone ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center p-8 max-w-sm mx-auto bg-[#fdfbf7] sketch-border-thick shadow-2xl relative">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#ebd7b0] sketch-border flex items-center justify-center text-3xl mb-4 animate-bounce">
          📓
        </div>

        <h1 className="font-sketch text-3xl font-bold text-[#28241f] mb-1">
          JOE JOSE
        </h1>
        <p className="text-xs font-code text-stone-600 mb-4">
          PORTFOLIO · KRAFT THEME
        </p>

        {/* Percentage Counter */}
        <div className="font-hand text-4xl text-[#28241f] font-bold mb-2">
          {progress}%
        </div>

        {/* Progress sketch bar */}
        <div className="w-full h-3 bg-[#e8e2d4] sketch-border-sm p-0.5 mb-3 overflow-hidden">
          <div
            className="h-full bg-[#28241f] transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="font-hand text-lg text-stone-600 italic">
          {statusText}
        </div>
      </div>
    </div>
  );
};
