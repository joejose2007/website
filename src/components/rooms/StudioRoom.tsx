import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, GraduationCap, Brain, Compass, Zap, Hammer, Shuffle, BookOpen, CheckCircle, Sparkles, Upload, RotateCcw } from 'lucide-react';
import { PERSONAL_INFO, CORE_STRENGTHS, EDUCATION_AREAS, EXPERIMENTATION_PHILOSOPHY, BUILDING_TOWARD } from '../../data/portfolioData';
import { RoomId } from '../../types';
import { sounds } from '../../utils/audio';
import { getStoredAvatar, saveStoredAvatar, clearStoredAvatar, getDefaultPortraitFallback } from '../../utils/avatarStorage';

interface StudioRoomProps {
  onBackToCorridor: () => void;
  onNavigateRoom: (room: RoomId) => void;
}

export const StudioRoom: React.FC<StudioRoomProps> = ({ onBackToCorridor, onNavigateRoom }) => {
  const [avatarSrc, setAvatarSrc] = useState<string>(getStoredAvatar());
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hasCustomAvatar, setHasCustomAvatar] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if custom avatar is stored
    if (typeof window !== 'undefined' && localStorage.getItem('joe_portfolio_avatar_exact')) {
      setHasCustomAvatar(true);
    }

    const handleAvatarUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setAvatarSrc(customEvent.detail);
        setHasCustomAvatar(true);
      }
    };

    window.addEventListener('avatar-updated', handleAvatarUpdate);
    return () => window.removeEventListener('avatar-updated', handleAvatarUpdate);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      saveStoredAvatar(result);
      setAvatarSrc(result);
      setHasCustomAvatar(true);
      sounds.playPaperClick();
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleImageError = () => {
    // If the direct path fails, fall back to default
    if (avatarSrc !== getDefaultPortraitFallback()) {
      setAvatarSrc(getDefaultPortraitFallback());
    }
  };

  const handleResetAvatar = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearStoredAvatar();
    setAvatarSrc(getDefaultPortraitFallback());
    setHasCustomAvatar(false);
    sounds.playPaperRustle();
  };
  const getStrengthIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5 h-5 text-amber-900" />;
      case 'Compass': return <Compass className="w-5 h-5 text-amber-900" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-900" />;
      case 'Hammer': return <Hammer className="w-5 h-5 text-amber-900" />;
      case 'Shuffle': return <Shuffle className="w-5 h-5 text-amber-900" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-amber-900" />;
      default: return <Sparkles className="w-5 h-5 text-amber-900" />;
    }
  };

  return (
    <div id="about-chamber" className="max-w-5xl mx-auto px-4 py-6 sm:py-8 scroll-mt-24">
      {/* Top Header Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 border-b-2 border-[#28241f] pb-4">
        <button
          type="button"
          onClick={() => {
            sounds.playPaperRustle();
            onBackToCorridor();
          }}
          className="sketch-button px-3.5 py-1.5 bg-white hover:bg-[#ebd7b0] text-xs font-code font-bold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Corridor
        </button>

        <div className="text-right">
          <span className="text-[11px] font-code text-stone-500 block">CHAMBER 01</span>
          <span className="font-sketch text-2xl font-bold text-[#28241f]">The Studio</span>
        </div>
      </div>

      {/* Hero Bio & Polaroid Dossier */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
        {/* Left Polaroid Card */}
        <div className="md:col-span-4 flex flex-col items-center">
          <div className="w-full max-w-xs bg-white sketch-border-thick p-4 shadow-xl rotate-[-1.5deg] hover:rotate-0 transition-transform">
            {/* Hand-drawn avatar representation */}
            <div
              id="studio-portrait-container"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full aspect-square bg-[#f5efe2] sketch-border-sm relative overflow-hidden group shadow-inner cursor-pointer transition-all ${
                isDragging ? 'ring-4 ring-amber-500 scale-[1.02]' : ''
              }`}
              title="Click or drop your exact picture here to display with 100% original fidelity"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                id="avatar-file-input"
                onChange={handleFileChange}
              />
              <img
                id="studio-portrait-image"
                src={avatarSrc}
                onError={handleImageError}
                alt="Joe Jose Portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter contrast-[1.02] group-hover:scale-105 transition-transform duration-300"
              />

              {/* Badges and Interactive Overlay */}
              <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
                {hasCustomAvatar && (
                  <button
                    id="reset-avatar-btn"
                    type="button"
                    onClick={handleResetAvatar}
                    title="Reset to default"
                    className="p-1 rounded bg-white/90 hover:bg-white text-stone-700 sketch-border-sm shadow-xs text-[10px]"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                )}
                <div className="text-xs font-hand text-[#28241f] bg-[#fdfbf7]/90 px-2 py-0.5 sketch-border-sm shadow-xs font-bold">
                  #experimenter
                </div>
              </div>

              {/* Hover upload prompt */}
              <div className="absolute inset-0 bg-[#28241f]/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center text-white">
                <Upload className="w-8 h-8 text-amber-300 mb-2 animate-bounce" />
                <span className="font-sketch text-lg font-bold">Upload Exact Picture</span>
                <span className="text-[11px] font-code text-stone-300 mt-1">
                  Click or drag & drop exact picture
                </span>
                <span className="text-[10px] font-code text-amber-200 mt-0.5">
                  100% untouched original
                </span>
              </div>
            </div>

            <div className="pt-3 text-center">
              <div className="font-sketch text-2xl font-bold text-[#28241f] leading-tight">{PERSONAL_INFO.name}</div>
              <div className="text-[11px] font-code text-stone-600 text-center mb-2">
                CS Student · Security Explorer
              </div>
              <div className="border-t border-dashed border-stone-300 pt-2 font-hand text-lg text-stone-800 font-bold">
                "Build, break, investigate."
              </div>
              <div className="text-[10px] font-code text-stone-500 uppercase tracking-widest mt-1">
                25+ Linux Distros Explored
              </div>
            </div>
          </div>
        </div>

        {/* Right Bio Information */}
        <div className="md:col-span-8 bg-[#fdfbf7] sketch-border p-6 sm:p-8 relative bg-kraft-grid">
          <div className="washi-tape"></div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-code font-bold px-2 py-0.5 bg-[#ebd7b0] sketch-border-sm">
              👋 ABOUT ME
            </span>
          </div>

          <h2 className="font-sketch text-3xl sm:text-4xl font-bold text-[#28241f] mb-4">
            Curious Student, Hands-On Builder
          </h2>

          <div className="space-y-4 text-stone-700 leading-relaxed font-sans text-sm sm:text-base">
            <p>
              I'm <strong className="text-[#28241f] font-semibold">{PERSONAL_INFO.name}</strong>, a Computer Science & Engineering student with a strong interest in <strong className="text-[#28241f]">cybersecurity, Linux, networking, digital forensics, AI, and software development</strong>.
            </p>
            <p>
              I enjoy learning by actually experimenting with technology rather than only studying theory. My interests range from understanding how computer networks work and analyzing digital information to configuring Linux systems, exploring security concepts, building small applications, and experimenting with automation.
            </p>
            <p>
              One of the areas I particularly enjoy is <strong className="text-[#28241f]">Linux</strong>. I've explored <strong className="text-[#28241f]">25+ Linux distributions</strong>, experimenting with different desktop environments, system configurations, customization techniques, performance optimization, and security-oriented environments.
            </p>
            <p>
              I'm also interested in cybersecurity and penetration testing. My goal is to gradually build a strong foundation in networking, operating systems, programming, security, and digital forensics and turn that knowledge into practical projects.
            </p>
          </div>

          {/* Motto Quote Strip */}
          <div className="mt-6 p-4 bg-[#f2ecdd] sketch-border-sm border-l-4 border-l-[#28241f]">
            <p className="font-hand text-xl sm:text-2xl text-[#28241f] font-bold">
              "{PERSONAL_INFO.motto}"
            </p>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="bg-white sketch-border p-6 sm:p-8 mb-10 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#28241f] pb-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ebd7b0] sketch-border-sm flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-[#28241f]" />
            </div>
            <div>
              <h3 className="font-sketch text-2xl sm:text-3xl font-bold text-[#28241f]">Academic Foundation</h3>
              <p className="text-xs font-code text-stone-600">{PERSONAL_INFO.educationDegree}</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-[#28241f] text-white text-xs font-code sketch-border-sm font-bold">
            {PERSONAL_INFO.educationStatus.toUpperCase()}
          </span>
        </div>

        <p className="text-sm text-stone-700 leading-relaxed mb-6 font-sans">
          I'm currently developing my foundation in computer science while independently exploring areas beyond the academic curriculum. My academic journey provides the fundamentals, while my personal projects and experimentation allow me to apply those concepts practically.
        </p>

        <div className="mb-2">
          <h4 className="font-code text-xs font-bold uppercase tracking-wider text-stone-600 mb-3">
            Core Curriculum & Independent Study Areas:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {EDUCATION_AREAS.map((area, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-[#fcfbf7] sketch-border-sm flex items-center gap-2 text-xs font-code text-stone-800 hover:bg-[#f6f0e2] transition-colors"
              >
                <CheckCircle className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                <span className="font-medium">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Strengths Section */}
      <div className="mb-10">
        <div className="text-center mb-6">
          <div className="font-hand text-xl text-amber-900 font-bold">What drives my workflow</div>
          <h3 className="font-sketch text-3xl sm:text-4xl font-bold text-[#28241f]">Core Strengths</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {CORE_STRENGTHS.map((strength, idx) => (
            <div
              key={idx}
              className="bg-[#fdfbf7] sketch-border p-5 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#f4efe4] sketch-border-sm flex items-center justify-center mb-3">
                  {getStrengthIcon(strength.icon)}
                </div>
                <h4 className="font-sketch text-xl font-bold text-[#28241f] mb-1">
                  {strength.title}
                </h4>
                <p className="text-xs text-stone-700 font-sans leading-relaxed">
                  {strength.description}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-dashed border-stone-300 text-[10px] font-code text-stone-400">
                0{idx + 1} // STRENGTH
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Through Experimentation */}
      <div className="bg-[#fcfbf9] sketch-border p-6 sm:p-8 mb-10 bg-kraft-lined">
        <h3 className="font-sketch text-2xl sm:text-3xl font-bold text-[#28241f] mb-4">
          {EXPERIMENTATION_PHILOSOPHY.headline}
        </h3>
        <div className="space-y-3 font-hand text-lg sm:text-xl text-stone-800 leading-relaxed">
          {EXPERIMENTATION_PHILOSOPHY.paragraphs.map((para, idx) => (
            <p key={idx} className={idx >= 2 ? 'font-bold text-[#28241f]' : ''}>
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* What I'm Building Toward */}
      <div className="bg-white sketch-border p-6 sm:p-8 mb-10">
        <h3 className="font-sketch text-2xl sm:text-3xl font-bold text-[#28241f] mb-3">
          {BUILDING_TOWARD.headline}
        </h3>
        <p className="text-sm text-stone-700 font-sans leading-relaxed">
          {BUILDING_TOWARD.text}
        </p>
      </div>

      {/* Bottom Navigation Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-[#28241f]">
        <button
          type="button"
          onClick={onBackToCorridor}
          className="sketch-button px-4 py-2 bg-white hover:bg-[#ebd7b0] text-xs font-code font-bold flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Corridor
        </button>

        <button
          type="button"
          onClick={() => {
            sounds.playDoorEnter();
            onNavigateRoom('workshop');
          }}
          className="sketch-button px-5 py-2.5 bg-[#28241f] text-white hover:bg-stone-800 text-xs font-code font-bold flex items-center gap-2"
        >
          <span>Next: Chamber 02 - The Workshop</span>
          <ArrowRight className="w-4 h-4 text-amber-300" />
        </button>
      </div>
    </div>
  );
};
