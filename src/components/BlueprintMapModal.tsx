import React from 'react';
import { Compass, X, MapPin, ArrowRight, BookOpen, Wrench, Image as ImageIcon, Mail, Navigation } from 'lucide-react';
import { RoomId } from '../types';
import { sounds } from '../utils/audio';

interface BlueprintMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoom: RoomId;
  onSelectRoom: (room: RoomId) => void;
}

export const BlueprintMapModal: React.FC<BlueprintMapModalProps> = ({
  isOpen,
  onClose,
  currentRoom,
  onSelectRoom,
}) => {
  if (!isOpen) return null;

  const rooms: { id: RoomId; title: string; subtitle: string; icon: React.ReactNode; color: string; desc: string }[] = [
    {
      id: 'corridor',
      title: 'The Corridor',
      subtitle: 'Central Hub & Gallery Walk',
      icon: <Navigation className="w-5 h-5" />,
      color: 'bg-[#f4efe4]',
      desc: 'The hand-drawn perspective 3D hallway connecting all rooms.',
    },
    {
      id: 'studio',
      title: 'The Studio',
      subtitle: 'About Me & Education',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'bg-[#faf6ee]',
      desc: 'Joe Jose biography, B.Tech CSE foundation, strengths & learning philosophy.',
    },
    {
      id: 'workshop',
      title: 'The Workshop',
      subtitle: 'Cybersecurity & Linux Lab',
      icon: <Wrench className="w-5 h-5" />,
      color: 'bg-[#faf6ee]',
      desc: 'Cybersecurity domains, 25+ Linux Distros logbook, Python & Technical Skills.',
    },
    {
      id: 'gallery',
      title: 'The Gallery',
      subtitle: 'Projects & Case Studies',
      icon: <ImageIcon className="w-5 h-5" />,
      color: 'bg-[#faf6ee]',
      desc: 'MetadataGuard, Local Network Monitor, Network Visualizer with live demos.',
    },
    {
      id: 'desk',
      title: 'The Desk',
      subtitle: 'Contact & Network Hub',
      icon: <Mail className="w-5 h-5" />,
      color: 'bg-[#faf6ee]',
      desc: 'Direct email stationery, GitHub, Instagram & portfolio keywords.',
    },
  ];

  const handleRoomClick = (id: RoomId) => {
    sounds.playDoorEnter();
    onSelectRoom(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-[#fdfbf7] sketch-border shadow-2xl p-6 relative bg-kraft-grid">
        <div className="flex items-center justify-between border-b-2 border-[#28241f] pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#ebd7b0] sketch-border-sm flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#28241f]" />
            </div>
            <div>
              <h3 className="font-sketch text-2xl font-bold tracking-wide">Floorplan & Map Navigator</h3>
              <p className="text-xs font-hand text-stone-600 text-base -mt-1">Architectural layout of Joe Jose's portfolio spaces</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="sketch-button p-1.5 bg-[#f2ece0] hover:bg-[#e4ddce] text-stone-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Blueprint Visual Grid */}
        <div className="border-2 border-dashed border-[#28241f] p-4 bg-[#f8f5ee] mb-4">
          <div className="text-[11px] font-code uppercase tracking-wider text-stone-500 mb-3 flex items-center justify-between">
            <span>Blueprint Schematic</span>
            <span className="flex items-center gap-1 text-stone-700">
              <MapPin className="w-3.5 h-3.5 text-red-600 animate-bounce" /> Current Location: {currentRoom.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {rooms.map((room) => {
              const isCurrent = room.id === currentRoom;
              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => handleRoomClick(room.id)}
                  className={`p-3 sketch-border-sm text-left transition-all relative ${
                    isCurrent
                      ? 'bg-[#ebd7b0] ring-2 ring-[#28241f] shadow-md'
                      : 'bg-white hover:bg-stone-50'
                  }`}
                >
                  {isCurrent && (
                    <span className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-code bg-[#28241f] text-white px-2 py-0.5 sketch-border-sm font-bold">
                      <MapPin className="w-3 h-3 text-amber-400" /> YOU ARE HERE
                    </span>
                  )}

                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 bg-[#f0ebe0] sketch-border-sm text-[#28241f]">
                      {room.icon}
                    </div>
                    <div>
                      <h4 className="font-sketch text-lg font-bold text-[#28241f]">{room.title}</h4>
                      <p className="text-[10px] font-code text-stone-500 -mt-0.5">{room.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-xs font-hand text-stone-700 text-base mt-1 line-clamp-2">
                    {room.desc}
                  </p>

                  <div className="mt-2 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-code font-bold text-stone-800 hover:text-amber-800">
                      Teleport <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-code text-stone-500">
          <span>Click any zone to transition smoothly</span>
          <span className="font-hand text-base text-stone-700">Drafted in Kraft architectural notation</span>
        </div>
      </div>
    </div>
  );
};
