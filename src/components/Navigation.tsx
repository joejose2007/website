import React from 'react';
import { Compass, Volume2, VolumeX, Terminal, BookOpen, Navigation as NavIcon, Github, Mail, Instagram } from 'lucide-react';
import { RoomId } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/audio';

interface NavigationProps {
  currentRoom: RoomId;
  onSelectRoom: (room: RoomId) => void;
  onOpenMap: () => void;
  onOpenTerminal: () => void;
  viewMode: 'corridor' | 'notebook';
  onToggleViewMode: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentRoom,
  onSelectRoom,
  onOpenMap,
  onOpenTerminal,
  viewMode,
  onToggleViewMode,
  isMuted,
  onToggleMute,
}) => {
  const rooms: { id: RoomId; label: string; number: string }[] = [
    { id: 'corridor', label: 'Corridor', number: '00' },
    { id: 'studio', label: 'About & Studio', number: '01' },
    { id: 'workshop', label: 'Skills & Lab', number: '02' },
    { id: 'gallery', label: 'Projects', number: '03' },
    { id: 'desk', label: 'Contact', number: '04' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#f7f4ed]/95 backdrop-blur-xs border-b-2 border-[#28241f] px-3 sm:px-6 py-2.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand Stamp */}
        <div className="flex items-center gap-3">
          <button
            id="nav-brand-button"
            type="button"
            onClick={() => {
              sounds.playPaperClick();
              onSelectRoom('corridor');
            }}
            className="text-left group flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded bg-[#28241f] text-[#f6f3eb] flex items-center justify-center font-sketch text-lg font-bold sketch-border-sm group-hover:scale-105 transition-transform">
              JJ
            </div>
            <div>
              <div className="font-sketch text-xl font-bold tracking-wider leading-none text-[#28241f] group-hover:text-amber-900 transition-colors">
                {PERSONAL_INFO.name}
              </div>
              <div className="text-[10px] font-code text-stone-600 tracking-tight leading-tight">
                PORTFOLIO · KRAFT THEME
              </div>
            </div>
          </button>
        </div>

        {/* Room Navigation Tabs (Desktop & Tablet) */}
        <nav id="nav-rooms-desktop" className="hidden lg:flex items-center gap-1.5 font-code text-xs">
          {rooms.map((room) => {
            const isActive = currentRoom === room.id;
            return (
              <button
                id={`nav-tab-${room.id}`}
                key={room.id}
                type="button"
                onClick={() => {
                  sounds.playDoorEnter();
                  onSelectRoom(room.id);
                }}
                className={`px-3 py-1.5 sketch-border-sm transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#28241f] text-white font-bold shadow-xs -translate-y-0.5'
                    : 'bg-[#f0ece2] hover:bg-[#e4dfd4] text-stone-800'
                }`}
              >
                <span className="text-[9px] opacity-70">{room.number}</span>
                <span>{room.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Control Tools Right Side */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* View Mode Toggle */}
          <button
            id="toggle-view-mode-button"
            type="button"
            onClick={() => {
              sounds.playPaperRustle();
              onToggleViewMode();
            }}
            title={viewMode === 'corridor' ? 'Switch to Notebook Dossier' : 'Switch to 3D Corridor'}
            className="sketch-button px-2.5 py-1 text-xs font-code font-bold bg-[#ebd7b0] hover:bg-[#dfc89f] text-[#28241f] flex items-center gap-1.5"
          >
            {viewMode === 'corridor' ? (
              <>
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Notebook Dossier</span>
              </>
            ) : (
              <>
                <NavIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Corridor Walk</span>
              </>
            )}
          </button>

          {/* Blueprint Map */}
          <button
            id="open-map-button"
            type="button"
            onClick={() => {
              sounds.playPaperClick();
              onOpenMap();
            }}
            title="Open Blueprint Floorplan"
            className="sketch-button p-1.5 sm:px-2.5 sm:py-1 text-xs font-code font-bold bg-[#f2ece0] hover:bg-[#e4ddce] text-stone-800 flex items-center gap-1"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Map</span>
          </button>

          {/* Linux Terminal Quick Launcher */}
          <button
            id="open-terminal-button"
            type="button"
            onClick={() => {
              sounds.playPencilScribble();
              onOpenTerminal();
            }}
            title="Launch Interactive Linux CLI"
            className="sketch-button p-1.5 sm:px-2.5 sm:py-1 text-xs font-code font-bold bg-[#28241f] text-amber-300 hover:bg-[#1a1714] flex items-center gap-1"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CLI</span>
          </button>

          {/* Audio Sound Toggle */}
          <button
            id="toggle-mute-button"
            type="button"
            onClick={onToggleMute}
            title={isMuted ? 'Sound FX Muted (Click to enable)' : 'Sound FX Active (Click to mute)'}
            className="sketch-button p-1.5 text-xs font-code bg-[#f2ece0] hover:bg-[#e4ddce] text-stone-800"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-stone-400" /> : <Volume2 className="w-3.5 h-3.5 text-stone-800" />}
          </button>

          {/* External Social Quick Links */}
          <a
            id="nav-github-link"
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="sketch-button p-1.5 text-stone-800 hover:bg-[#e4ddce] bg-[#f2ece0]"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Mobile Secondary Room Tabs */}
      <div className="lg:hidden flex items-center overflow-x-auto gap-1.5 pt-2 pb-0.5 mt-1 border-t border-stone-300/60 text-xs font-code">
        {rooms.map((room) => {
          const isActive = currentRoom === room.id;
          return (
            <button
              key={room.id}
              type="button"
              onClick={() => {
                sounds.playDoorEnter();
                onSelectRoom(room.id);
              }}
              className={`px-2.5 py-1 sketch-border-sm shrink-0 whitespace-nowrap text-[11px] ${
                isActive
                  ? 'bg-[#28241f] text-white font-bold'
                  : 'bg-[#f0ece2] text-stone-800'
              }`}
            >
              {room.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
