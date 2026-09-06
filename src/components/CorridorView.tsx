import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, BookOpen, Wrench, Image as ImageIcon, Mail, Terminal, Sparkles } from 'lucide-react';
import { RoomId } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/audio';

interface CorridorViewProps {
  onEnterRoom: (room: RoomId) => void;
  onOpenTerminal: () => void;
  onToggleViewMode: () => void;
}

export const CorridorView: React.FC<CorridorViewProps> = ({
  onEnterRoom,
  onOpenTerminal,
  onToggleViewMode,
}) => {
  const [corridorStep, setCorridorStep] = useState<number>(0);

  const portals: {
    room: RoomId;
    title: string;
    tag: string;
    desc: string;
    icon: React.ReactNode;
    color: string;
    doodle: string;
    badge: string;
  }[] = [
    {
      room: 'studio',
      title: 'The Studio',
      tag: 'ROOM 01 · ABOUT & EDUCATION',
      desc: 'Meet Joe Jose, discover his engineering philosophy, B.Tech CSE degree foundation, and core analytical strengths.',
      icon: <BookOpen className="w-8 h-8 text-[#28241f]" />,
      color: 'bg-[#faf6ee]',
      doodle: '🐧',
      badge: 'B.Tech CSE & Philosophy',
    },
    {
      room: 'workshop',
      title: 'The Workshop',
      tag: 'ROOM 02 · CYBERSECURITY & LINUX',
      desc: 'Explore cybersecurity domains, penetration testing concepts, 25+ Linux distributions logbook, and technical skill matrices.',
      icon: <Wrench className="w-8 h-8 text-[#28241f]" />,
      color: 'bg-[#faf6ee]',
      doodle: '🔐',
      badge: '25+ Linux Distros Explored',
    },
    {
      room: 'gallery',
      title: 'The Gallery',
      tag: 'ROOM 03 · FEATURED PROJECTS',
      desc: 'Interactive walkthrough of MetadataGuard (with live metadata analyzer), Local Network Monitor, and Network Visualizer.',
      icon: <ImageIcon className="w-8 h-8 text-[#28241f]" />,
      color: 'bg-[#faf6ee]',
      doodle: '🛡️',
      badge: 'Interactive Live Demos',
    },
    {
      room: 'desk',
      title: 'The Desk',
      tag: 'ROOM 04 · CONTACT & SOCIALS',
      desc: 'Direct email stationery (birdalen1@gmail.com), GitHub repositories, Instagram connection, and portfolio keywords.',
      icon: <Mail className="w-8 h-8 text-[#28241f]" />,
      color: 'bg-[#faf6ee]',
      doodle: '✉️',
      badge: 'birdalen1@gmail.com',
    },
  ];

  const handleNext = () => {
    sounds.playPaperRustle();
    setCorridorStep((prev) => (prev + 1) % portals.length);
  };

  const handlePrev = () => {
    sounds.playPaperRustle();
    setCorridorStep((prev) => (prev - 1 + portals.length) % portals.length);
  };

  const currentPortal = portals[corridorStep];

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col justify-between overflow-hidden bg-[#f5f1e8] bg-kraft-grid">
      {/* Hand-drawn sketch ceiling & vanishing lines */}
      <div className="absolute inset-0 pointer-events-none opacity-35 overflow-hidden">
        {/* Perspective floorboards */}
        <div className="absolute bottom-0 left-0 right-0 h-48 border-t-2 border-[#28241f]/30">
          <div className="w-full h-full flex justify-around">
            <div className="w-px h-full bg-[#28241f]/20 rotate-[-45deg] origin-top"></div>
            <div className="w-px h-full bg-[#28241f]/20 rotate-[-25deg] origin-top"></div>
            <div className="w-px h-full bg-[#28241f]/20 rotate-[0deg] origin-top"></div>
            <div className="w-px h-full bg-[#28241f]/20 rotate-[25deg] origin-top"></div>
            <div className="w-px h-full bg-[#28241f]/20 rotate-[45deg] origin-top"></div>
          </div>
        </div>
      </div>

      {/* Top Welcome Signpost */}
      <div className="relative z-10 pt-6 px-4 text-center max-w-3xl mx-auto">
        <div className="inline-block washi-tape bg-white/90 sketch-border px-5 py-3 shadow-md mb-2">
          <div className="font-hand text-lg text-amber-900 font-bold -mb-1">
            ✦ The Kraft Interactive Corridor ✦
          </div>
          <h1 className="font-sketch text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-[#28241f]">
            {PERSONAL_INFO.name}
          </h1>
          <p className="font-code text-xs sm:text-sm text-stone-700 mt-1 max-w-xl mx-auto">
            {PERSONAL_INFO.title}
          </p>
        </div>

        {/* Motto strip */}
        <div className="mt-2 text-stone-600 font-hand text-base sm:text-lg italic">
          "{PERSONAL_INFO.motto}"
        </div>
      </div>

      {/* Perspective Corridor Stage with Doorway / Portal */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 max-w-4xl mx-auto w-full">
        {/* Navigation Step Arrows */}
        <button
          id="corridor-prev-btn"
          type="button"
          onClick={handlePrev}
          title="Previous Corridor Door"
          className="sketch-button p-3 bg-white/90 hover:bg-[#f0ebe0] text-[#28241f] mr-2 sm:mr-6 z-20 shrink-0 shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Active Portal / Door Frame */}
        <div id="corridor-portal-frame" className="w-full max-w-lg bg-[#fdfbf7] sketch-border-thick p-6 sm:p-8 shadow-2xl relative transition-all transform duration-200">
          {/* Top Hanging nail and wire doodle */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#28241f]"></div>
            <div className="w-0.5 h-4 bg-[#28241f]"></div>
          </div>

          {/* Badge & Room Number */}
          <div className="flex items-center justify-between border-b-2 border-dashed border-[#28241f] pb-3 mb-4">
            <span className="font-code text-xs font-bold text-stone-600">
              {currentPortal.tag}
            </span>
            <span className="font-code text-[11px] px-2.5 py-0.5 bg-[#ebd7b0] text-[#28241f] sketch-border-sm font-bold">
              {currentPortal.badge}
            </span>
          </div>

          {/* Door Frame Body */}
          <div className="text-center py-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#f4efe4] sketch-border flex items-center justify-center shadow-inner mb-4 hover:scale-105 transition-transform">
              {currentPortal.icon}
            </div>

            <div className="text-3xl mb-2">{currentPortal.doodle}</div>

            <h2 className="font-sketch text-3xl sm:text-4xl font-bold text-[#28241f] tracking-wide mb-2">
              {currentPortal.title}
            </h2>

            <p className="font-sans text-xs sm:text-sm text-stone-700 leading-relaxed max-w-md mx-auto mb-6">
              {currentPortal.desc}
            </p>

            {/* Enter Room Button */}
            <button
              id={`enter-room-${currentPortal.room}-btn`}
              type="button"
              onClick={() => {
                sounds.playDoorEnter();
                onEnterRoom(currentPortal.room);
              }}
              className="sketch-button w-full py-3 px-6 bg-[#28241f] text-white hover:bg-stone-800 font-sketch text-xl sm:text-2xl font-bold tracking-wider flex items-center justify-center gap-2 group"
            >
              <span>ENTER {currentPortal.title.toUpperCase()}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform text-amber-300" />
            </button>
          </div>

          {/* Doorway step dots */}
          <div className="flex justify-center items-center gap-2 mt-4 pt-3 border-t border-stone-200">
            {portals.map((p, idx) => (
              <button
                id={`corridor-step-dot-${idx}`}
                key={p.room}
                type="button"
                onClick={() => {
                  sounds.playPaperClick();
                  setCorridorStep(idx);
                }}
                className={`w-3 h-3 rounded-full border border-[#28241f] transition-all ${
                  corridorStep === idx ? 'bg-[#28241f] scale-125' : 'bg-[#e4dfd4]'
                }`}
                title={`Step to ${p.title}`}
              />
            ))}
          </div>
        </div>

        {/* Next Corridor Arrow */}
        <button
          id="corridor-next-btn"
          type="button"
          onClick={handleNext}
          title="Next Corridor Door"
          className="sketch-button p-3 bg-white/90 hover:bg-[#f0ebe0] text-[#28241f] ml-2 sm:mr-0 sm:ml-6 z-20 shrink-0 shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Corridor Footer Quick Strip */}
      <div className="relative z-10 p-4 border-t-2 border-[#28241f] bg-[#f0ecdf]/90 backdrop-blur-xs">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-code text-stone-700">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
            <span>Corridor Active: 4 exhibition chambers available</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenTerminal}
              className="hover:underline flex items-center gap-1 font-bold text-[#28241f]"
            >
              <Terminal className="w-3.5 h-3.5 text-stone-800" /> Open Linux Terminal
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={onToggleViewMode}
              className="hover:underline flex items-center gap-1 font-bold text-[#28241f]"
            >
              <BookOpen className="w-3.5 h-3.5 text-stone-800" /> Read in Notebook Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
