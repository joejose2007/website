import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Shield, Terminal, Code, Cpu, Network, FileSearch, Bot, CheckCircle, Sparkles, BookOpen } from 'lucide-react';
import {
  CYBERSECURITY_DOMAINS,
  LINUX_DETAILS,
  PYTHON_PROGRAMMING,
  TECHNICAL_SKILLS,
  OSINT_DETAILS,
  AI_AUTOMATION_DETAILS,
  NETWORKING_DETAILS,
  CAREER_INTERESTS,
  CURRENTLY_LEARNING,
} from '../../data/portfolioData';
import { LinuxDistroExplorer } from '../interactive/LinuxDistroExplorer';
import { RoomId } from '../../types';
import { sounds } from '../../utils/audio';

interface WorkshopRoomProps {
  onBackToCorridor: () => void;
  onNavigateRoom: (room: RoomId) => void;
  onOpenTerminal: () => void;
}

export const WorkshopRoom: React.FC<WorkshopRoomProps> = ({
  onBackToCorridor,
  onNavigateRoom,
  onOpenTerminal,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div id="skills-chamber" className="max-w-5xl mx-auto px-4 py-6 sm:py-8 scroll-mt-24">
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
          <span className="text-[11px] font-code text-stone-500 block">CHAMBER 02</span>
          <span className="font-sketch text-2xl font-bold text-[#28241f]">The Workshop & Lab</span>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="bg-[#fdfbf7] sketch-border p-6 sm:p-8 mb-10 bg-kraft-grid relative">
        <div className="washi-tape"></div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="text-xs font-code font-bold px-2 py-0.5 bg-[#ebd7b0] sketch-border-sm">
            🔐 CYBERSECURITY & LINUX SYSTEMS
          </span>
          <button
            type="button"
            onClick={onOpenTerminal}
            className="sketch-button px-3 py-1 bg-[#28241f] text-amber-300 hover:bg-stone-800 text-xs font-code font-bold flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5" /> Launch Linux Terminal
          </button>
        </div>

        <h2 className="font-sketch text-3xl sm:text-4xl font-bold text-[#28241f] mb-3">
          Cybersecurity & Technical Lab
        </h2>

        <p className="text-stone-700 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
          Cybersecurity is one of my primary areas of interest. I'm interested in understanding how systems become vulnerable, how information can be exposed, how networks communicate, and how security mechanisms can be designed to protect systems.
        </p>
      </div>

      {/* Cybersecurity Domains Grid */}
      <div className="mb-12">
        <div className="mb-6">
          <div className="font-hand text-xl text-amber-900 font-bold">In-depth exploration</div>
          <h3 className="font-sketch text-3xl font-bold text-[#28241f]">Cybersecurity Domains</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CYBERSECURITY_DOMAINS.map((domain, idx) => (
            <div
              key={idx}
              className="bg-white sketch-border p-5 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-stone-200">
                  <Shield className="w-5 h-5 text-amber-900" />
                  <h4 className="font-sketch text-xl font-bold text-[#28241f]">{domain.title}</h4>
                </div>

                <ul className="space-y-1.5 text-xs font-code text-stone-700">
                  {domain.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-800 font-bold shrink-0">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-2 border-t border-dashed border-stone-200 text-[10px] font-code text-stone-400">
                DOMAIN 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Linux & Open Source Section with Interactive Logbook */}
      <div className="mb-12">
        <div className="bg-[#faf6ee] sketch-border p-6 sm:p-8 mb-6 relative">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <div className="text-xs font-code text-stone-600 font-bold uppercase tracking-wider">
                🐧 Operating Systems
              </div>
              <h3 className="font-sketch text-3xl sm:text-4xl font-bold text-[#28241f]">
                Linux & Open Source Exploration
              </h3>
            </div>
            <span className="px-3 py-1 bg-[#28241f] text-amber-300 text-xs font-code sketch-border-sm font-bold">
              25+ DISTRIBUTIONS
            </span>
          </div>

          <blockquote className="p-4 bg-white sketch-border-sm mb-6 border-l-4 border-l-[#28241f] font-hand text-xl text-stone-800">
            "{LINUX_DETAILS.quote}"
          </blockquote>

          <div className="mb-2">
            <h4 className="font-code text-xs font-bold uppercase tracking-wider text-stone-600 mb-3">
              Hands-on Linux Experience Areas:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {LINUX_DETAILS.experienceAreas.map((area, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-white sketch-border-sm text-[11px] font-code text-stone-800 flex items-center gap-1.5"
                >
                  <CheckCircle className="w-3 h-3 text-amber-800 shrink-0" />
                  <span className="truncate">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Embedded Interactive 25+ Distro Logbook */}
        <LinuxDistroExplorer />
      </div>

      {/* Programming with Python */}
      <div className="bg-white sketch-border p-6 sm:p-8 mb-12 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#28241f] pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#ebd7b0] sketch-border-sm flex items-center justify-center">
              <Code className="w-5 h-5 text-[#28241f]" />
            </div>
            <div>
              <h3 className="font-sketch text-2xl sm:text-3xl font-bold text-[#28241f]">Programming: Python</h3>
              <p className="text-xs font-code text-stone-600">Automation, Security Tooling & Data Analysis</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-[#f0ece2] sketch-border-sm text-xs font-code font-bold">
            PRACTICAL UTILITIES
          </span>
        </div>

        <p className="text-sm text-stone-700 font-sans leading-relaxed mb-3">
          {PYTHON_PROGRAMMING.summary}
        </p>

        <p className="text-sm font-hand text-lg text-amber-900 font-bold mb-6">
          "{PYTHON_PROGRAMMING.focus}"
        </p>

        <div>
          <h4 className="font-code text-xs font-bold uppercase tracking-wider text-stone-600 mb-3">
            Key Application Focuses:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {PYTHON_PROGRAMMING.areas.map((area, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-[#fdfbf7] sketch-border-sm text-xs font-code text-stone-800 flex items-center gap-2 hover:bg-[#f6efe0] transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-stone-700"></span>
                <span>{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Skills Categorized Grid */}
      <div className="mb-12">
        <div className="mb-6">
          <div className="font-hand text-xl text-amber-900 font-bold">Proficiencies & Toolchain</div>
          <h3 className="font-sketch text-3xl font-bold text-[#28241f]">Technical Skills Matrix</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {TECHNICAL_SKILLS.map((category, idx) => (
            <div key={idx} className="bg-[#fcfbf9] sketch-border p-5">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-stone-300">
                <Cpu className="w-4 h-4 text-amber-900" />
                <h4 className="font-sketch text-xl font-bold text-[#28241f]">{category.title}</h4>
              </div>
              <ul className="space-y-1.5 text-xs font-code text-stone-700">
                {category.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-1.5">
                    <span className="text-amber-800">✓</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Triad Exploration Panels: OSINT, AI & Automation, Networking */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {/* OSINT Card */}
        <div className="bg-white sketch-border p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-stone-200">
              <FileSearch className="w-5 h-5 text-amber-900" />
              <h4 className="font-sketch text-xl font-bold text-[#28241f]">{OSINT_DETAILS.title}</h4>
            </div>
            <p className="text-xs font-sans text-stone-700 leading-relaxed mb-3">
              {OSINT_DETAILS.description}
            </p>
            <div className="space-y-1 text-xs font-code text-stone-600">
              {OSINT_DETAILS.topics.map((t, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-amber-800 font-bold">·</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI & Automation Card */}
        <div className="bg-white sketch-border p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-stone-200">
              <Bot className="w-5 h-5 text-amber-900" />
              <h4 className="font-sketch text-xl font-bold text-[#28241f]">{AI_AUTOMATION_DETAILS.title}</h4>
            </div>
            <p className="text-xs font-sans text-stone-700 leading-relaxed mb-3">
              {AI_AUTOMATION_DETAILS.description}
            </p>
            <div className="space-y-1 text-xs font-code text-stone-600">
              {AI_AUTOMATION_DETAILS.topics.map((t, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-amber-800 font-bold">·</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Networking Card */}
        <div className="bg-white sketch-border p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-stone-200">
              <Network className="w-5 h-5 text-amber-900" />
              <h4 className="font-sketch text-xl font-bold text-[#28241f]">{NETWORKING_DETAILS.title}</h4>
            </div>
            <p className="text-xs font-sans text-stone-700 leading-relaxed mb-3">
              {NETWORKING_DETAILS.description}
            </p>
            <div className="space-y-1 text-xs font-code text-stone-600">
              {NETWORKING_DETAILS.topics.map((t, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-amber-800 font-bold">·</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Career Interests & Currently Learning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Career Interests */}
        <div className="bg-[#fbf9f4] sketch-border p-6">
          <h4 className="font-sketch text-2xl font-bold text-[#28241f] mb-2">🎯 Career Interests</h4>
          <p className="text-xs font-sans text-stone-600 mb-4">
            Focused on building strong fundamentals to solve advanced security and engineering challenges:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {CAREER_INTERESTS.map((career, i) => (
              <span key={i} className="px-2.5 py-1 bg-white sketch-border-sm text-xs font-code text-stone-800">
                {career}
              </span>
            ))}
          </div>
        </div>

        {/* Currently Learning */}
        <div className="bg-[#fbf9f4] sketch-border p-6">
          <h4 className="font-sketch text-2xl font-bold text-[#28241f] mb-2">📚 Currently Learning</h4>
          <p className="text-xs font-sans text-stone-600 mb-4">
            Continuous daily knowledge expansion across systems, algorithms and networks:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {CURRENTLY_LEARNING.map((item, i) => (
              <span key={i} className="px-2.5 py-1 bg-[#ebd7b0] sketch-border-sm text-xs font-code text-stone-900 font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-[#28241f]">
        <button
          type="button"
          onClick={() => {
            sounds.playDoorEnter();
            onNavigateRoom('studio');
          }}
          className="sketch-button px-4 py-2 bg-white hover:bg-[#ebd7b0] text-xs font-code font-bold flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Prev: Chamber 01 - The Studio
        </button>

        <button
          type="button"
          onClick={() => {
            sounds.playDoorEnter();
            onNavigateRoom('gallery');
          }}
          className="sketch-button px-5 py-2.5 bg-[#28241f] text-white hover:bg-stone-800 text-xs font-code font-bold flex items-center gap-2"
        >
          <span>Next: Chamber 03 - The Gallery</span>
          <ArrowRight className="w-4 h-4 text-amber-300" />
        </button>
      </div>
    </div>
  );
};
