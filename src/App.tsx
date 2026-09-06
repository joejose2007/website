import React, { useState, useEffect } from 'react';
import { RoomId } from './types';
import { sounds } from './utils/audio';
import { Preloader } from './components/Preloader';
import { Navigation } from './components/Navigation';
import { CorridorView } from './components/CorridorView';
import { NotebookView } from './components/NotebookView';
import { StudioRoom } from './components/rooms/StudioRoom';
import { WorkshopRoom } from './components/rooms/WorkshopRoom';
import { GalleryRoom } from './components/rooms/GalleryRoom';
import { DeskRoom } from './components/rooms/DeskRoom';
import { BlueprintMapModal } from './components/BlueprintMapModal';
import { LinuxTerminalModal } from './components/LinuxTerminalModal';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentRoom, setCurrentRoom] = useState<RoomId>('corridor');
  const [viewMode, setViewMode] = useState<'corridor' | 'notebook'>('corridor');
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(sounds.getIsMuted());

    // Keyboard shortcut handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        sounds.playPencilScribble();
        setIsTerminalOpen((prev) => !prev);
      } else if (e.key === 'm' || e.key === 'M') {
        if (!['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
          sounds.playPaperClick();
          setIsMapOpen((prev) => !prev);
        }
      } else if (e.key === 'Escape') {
        setIsMapOpen(false);
        setIsTerminalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const handleSelectRoom = (room: RoomId) => {
    setCurrentRoom(room);
    if (viewMode === 'notebook' && room === 'corridor') {
      setViewMode('corridor');
    }
  };

  const handleToggleViewMode = () => {
    setViewMode((prev) => (prev === 'corridor' ? 'notebook' : 'corridor'));
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#1c1a17] flex flex-col selection:bg-[#ebd7b0] selection:text-[#111]">
      {/* Paper Preloader */}
      {isLoading && <Preloader onLoaded={() => setIsLoading(false)} />}

      {/* Main Navigation Header */}
      <Navigation
        currentRoom={currentRoom}
        onSelectRoom={handleSelectRoom}
        onOpenMap={() => setIsMapOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        viewMode={viewMode}
        onToggleViewMode={handleToggleViewMode}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Exhibition Content Area */}
      <main className="flex-1">
        {viewMode === 'notebook' ? (
          <NotebookView
            onSwitchToCorridor={() => setViewMode('corridor')}
            onOpenTerminal={() => setIsTerminalOpen(true)}
            onOpenMap={() => setIsMapOpen(true)}
          />
        ) : (
          <>
            {currentRoom === 'corridor' && (
              <CorridorView
                onEnterRoom={handleSelectRoom}
                onOpenTerminal={() => setIsTerminalOpen(true)}
                onToggleViewMode={handleToggleViewMode}
              />
            )}

            {currentRoom === 'studio' && (
              <StudioRoom
                onBackToCorridor={() => handleSelectRoom('corridor')}
                onNavigateRoom={handleSelectRoom}
              />
            )}

            {currentRoom === 'workshop' && (
              <WorkshopRoom
                onBackToCorridor={() => handleSelectRoom('corridor')}
                onNavigateRoom={handleSelectRoom}
                onOpenTerminal={() => setIsTerminalOpen(true)}
              />
            )}

            {currentRoom === 'gallery' && (
              <GalleryRoom
                onBackToCorridor={() => handleSelectRoom('corridor')}
                onNavigateRoom={handleSelectRoom}
              />
            )}

            {currentRoom === 'desk' && (
              <DeskRoom onBackToCorridor={() => handleSelectRoom('corridor')} />
            )}
          </>
        )}
      </main>

      {/* Modals */}
      <BlueprintMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        currentRoom={currentRoom}
        onSelectRoom={handleSelectRoom}
      />

      <LinuxTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}
