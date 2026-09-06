import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Github, ExternalLink, Shield, Network, Eye, CheckCircle2, FileSearch, Sparkles } from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../../data/portfolioData';
import { MetadataGuardDemo } from '../interactive/MetadataGuardDemo';
import { NetworkVisualizerDemo } from '../interactive/NetworkVisualizerDemo';
import { RoomId } from '../../types';
import { sounds } from '../../utils/audio';

interface GalleryRoomProps {
  onBackToCorridor: () => void;
  onNavigateRoom: (room: RoomId) => void;
}

export const GalleryRoom: React.FC<GalleryRoomProps> = ({ onBackToCorridor, onNavigateRoom }) => {
  const metadataGuard = PROJECTS.find(p => p.id === 'metadataguard')!;
  const localMonitor = PROJECTS.find(p => p.id === 'local-network-monitor')!;
  const visualizer = PROJECTS.find(p => p.id === 'network-visualizer')!;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div id="projects-chamber" className="max-w-5xl mx-auto px-4 py-6 sm:py-8 scroll-mt-24">
      {/* Top Navigation */}
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
          <span className="text-[11px] font-code text-stone-500 block">CHAMBER 03</span>
          <span className="font-sketch text-2xl font-bold text-[#28241f]">The Gallery & Projects</span>
        </div>
      </div>

      {/* Gallery Introduction */}
      <div className="bg-[#fdfbf7] sketch-border p-6 sm:p-8 mb-10 bg-kraft-grid relative">
        <div className="washi-tape"></div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-code font-bold px-2 py-0.5 bg-[#ebd7b0] sketch-border-sm">
            🚀 PRACTICAL PROJECTS & EXPERIMENTS
          </span>
        </div>

        <h2 className="font-sketch text-3xl sm:text-4xl font-bold text-[#28241f] mb-3">
          The Gallery of Systems & Tools
        </h2>

        <p className="text-stone-700 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
          Welcome to the project exhibition. Rather than building static toys, I focus on projects that explore real security and networking concepts — inspecting metadata leaks, mapping network devices, and demystifying hidden communication layers.
        </p>
      </div>

      {/* PROJECT 1: MetadataGuard (Featured with Live Interactive Demo) */}
      <div className="bg-white sketch-border p-6 sm:p-8 mb-12 shadow-lg relative">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b-2 border-[#28241f] pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-code font-bold px-2 py-0.5 bg-[#28241f] text-amber-300 sketch-border-sm">
                FEATURED PROJECT
              </span>
              <span className="text-xs font-code text-stone-500">{metadataGuard.category}</span>
            </div>
            <h3 className="font-sketch text-3xl sm:text-4xl font-bold text-[#28241f] mt-1">
              {metadataGuard.title}
            </h3>
            <p className="text-xs font-hand text-xl text-amber-900 font-bold -mt-1">
              {metadataGuard.subtitle}
            </p>
          </div>

          {metadataGuard.github && (
            <a
              href={metadataGuard.github}
              target="_blank"
              rel="noopener noreferrer"
              className="sketch-button px-3.5 py-2 bg-[#ebd7b0] hover:bg-[#dfc89f] text-xs font-code font-bold flex items-center gap-2"
            >
              <Github className="w-4 h-4" /> View on GitHub
            </a>
          )}
        </div>

        <div className="mb-6">
          <p className="text-sm sm:text-base text-stone-700 font-sans leading-relaxed mb-4">
            {metadataGuard.description}
          </p>

          <div className="mb-4">
            <h4 className="font-code text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
              Core Security & Forensic Concepts:
            </h4>
            <div className="flex flex-wrap gap-2">
              {metadataGuard.concepts.map((concept, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-[#fbf9f4] sketch-border-sm text-xs font-code text-stone-800"
                >
                  ✓ {concept}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Live Interactive Metadata Demo */}
        <MetadataGuardDemo />
      </div>

      {/* PROJECT 2: Local Network Monitor */}
      <div className="bg-[#fcfbf9] sketch-border p-6 sm:p-8 mb-12 shadow-md">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b-2 border-[#28241f] pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-code font-bold px-2 py-0.5 bg-[#f0ece2] sketch-border-sm text-stone-800">
                CONCEPT & TOOL ARCHITECTURE
              </span>
              <span className="text-xs font-code text-stone-500">{localMonitor.category}</span>
            </div>
            <h3 className="font-sketch text-3xl font-bold text-[#28241f] mt-1">
              {localMonitor.title}
            </h3>
            <p className="text-xs font-hand text-xl text-amber-900 font-bold -mt-1">
              {localMonitor.subtitle}
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-stone-700 font-sans leading-relaxed mb-6">
          {localMonitor.description}
        </p>

        {/* Capabilities Grid */}
        <div className="mb-6">
          <h4 className="font-code text-xs font-bold uppercase tracking-wider text-stone-600 mb-3">
            Potential Capabilities:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {localMonitor.potentialCapabilities?.map((cap, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-white sketch-border-sm text-xs font-code text-stone-800 flex items-start gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECT 3: Network Visualizer (With Interactive Topology Demo) */}
      <div className="bg-white sketch-border p-6 sm:p-8 mb-12 shadow-lg">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b-2 border-[#28241f] pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-code font-bold px-2 py-0.5 bg-[#28241f] text-white sketch-border-sm">
                VISUAL TOPOLOGY
              </span>
              <span className="text-xs font-code text-stone-500">{visualizer.category}</span>
            </div>
            <h3 className="font-sketch text-3xl sm:text-4xl font-bold text-[#28241f] mt-1">
              {visualizer.title}
            </h3>
            <p className="text-xs font-hand text-xl text-amber-900 font-bold -mt-1">
              {visualizer.subtitle}
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-stone-700 font-sans leading-relaxed mb-4">
          {visualizer.description}
        </p>

        <div className="p-3.5 bg-[#f6f1e5] sketch-border-sm mb-6 border-l-4 border-l-[#28241f]">
          <div className="text-xs font-code font-bold text-stone-600 uppercase tracking-wider mb-1">
            Intuitive Topological Flow:
          </div>
          <div className="font-hand text-xl sm:text-2xl text-[#28241f] font-bold">
            Device → Router → Device → Device
          </div>
        </div>

        {/* Live Interactive Network Visualizer */}
        <NetworkVisualizerDemo />
      </div>

      {/* GitHub Repository Showcase Banner */}
      <div className="bg-[#28241f] text-white sketch-border p-6 sm:p-8 mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-amber-300 font-hand text-xl">Open Source & Continuous Learning</div>
          <h4 className="font-sketch text-2xl sm:text-3xl font-bold">
            Explore All Repositories on GitHub
          </h4>
          <p className="text-stone-300 font-code text-xs mt-1">
            Visit {PERSONAL_INFO.githubHandle} to review source code, automation scripts, and experiments.
          </p>
        </div>

        <a
          href={PERSONAL_INFO.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="sketch-button px-5 py-2.5 bg-[#ebd7b0] text-[#28241f] hover:bg-white text-xs font-code font-bold flex items-center gap-2 shrink-0"
        >
          <Github className="w-4 h-4" /> Open GitHub Profile
        </a>
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-[#28241f]">
        <button
          type="button"
          onClick={() => {
            sounds.playDoorEnter();
            onNavigateRoom('workshop');
          }}
          className="sketch-button px-4 py-2 bg-white hover:bg-[#ebd7b0] text-xs font-code font-bold flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Prev: Chamber 02 - The Workshop
        </button>

        <button
          type="button"
          onClick={() => {
            sounds.playDoorEnter();
            onNavigateRoom('desk');
          }}
          className="sketch-button px-5 py-2.5 bg-[#28241f] text-white hover:bg-stone-800 text-xs font-code font-bold flex items-center gap-2"
        >
          <span>Next: Chamber 04 - The Desk (Contact)</span>
          <ArrowRight className="w-4 h-4 text-amber-300" />
        </button>
      </div>
    </div>
  );
};
