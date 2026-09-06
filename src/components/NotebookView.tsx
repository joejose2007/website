import React, { useState, useEffect } from 'react';
import { BookOpen, Navigation, ArrowUp, Terminal, Compass, Shield, Code, Cpu, ExternalLink, Mail, Github, Instagram, CheckCircle2 } from 'lucide-react';
import {
  PERSONAL_INFO,
  CORE_STRENGTHS,
  EDUCATION_AREAS,
  CYBERSECURITY_DOMAINS,
  LINUX_DETAILS,
  PYTHON_PROGRAMMING,
  TECHNICAL_SKILLS,
  PROJECTS,
  OSINT_DETAILS,
  AI_AUTOMATION_DETAILS,
  NETWORKING_DETAILS,
  EXPERIMENTATION_PHILOSOPHY,
  CAREER_INTERESTS,
  CURRENTLY_LEARNING,
  BUILDING_TOWARD,
  PORTFOLIO_KEYWORDS,
} from '../data/portfolioData';
import { LinuxDistroExplorer } from './interactive/LinuxDistroExplorer';
import { MetadataGuardDemo } from './interactive/MetadataGuardDemo';
import { NetworkVisualizerDemo } from './interactive/NetworkVisualizerDemo';
import { sounds } from '../utils/audio';
import { getStoredAvatar, getDefaultPortraitFallback } from '../utils/avatarStorage';

interface NotebookViewProps {
  onSwitchToCorridor: () => void;
  onOpenTerminal: () => void;
  onOpenMap: () => void;
}

export const NotebookView: React.FC<NotebookViewProps> = ({
  onSwitchToCorridor,
  onOpenTerminal,
  onOpenMap,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'bio' | 'security' | 'projects' | 'contact'>('all');
  const [avatarSrc, setAvatarSrc] = useState<string>(getStoredAvatar());

  useEffect(() => {
    const handleAvatarUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setAvatarSrc(customEvent.detail);
      }
    };
    window.addEventListener('avatar-updated', handleAvatarUpdate);
    return () => window.removeEventListener('avatar-updated', handleAvatarUpdate);
  }, []);

  const scrollToTop = () => {
    sounds.playPaperRustle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const metadataGuard = PROJECTS.find(p => p.id === 'metadataguard')!;
  const localMonitor = PROJECTS.find(p => p.id === 'local-network-monitor')!;
  const visualizer = PROJECTS.find(p => p.id === 'network-visualizer')!;

  return (
    <div className="min-h-screen bg-[#f4efe4] bg-kraft-grid py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Notebook Dossier Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#fdfbf7] sketch-border p-4 mb-8 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#ebd7b0] sketch-border-sm flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#28241f]" />
            </div>
            <div>
              <h2 className="font-sketch text-xl font-bold text-[#28241f]">The Kraft Notebook Dossier</h2>
              <p className="text-[11px] font-code text-stone-600">Continuous reading mode & complete technical profile</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSwitchToCorridor}
              className="sketch-button px-3 py-1.5 bg-[#28241f] text-white hover:bg-stone-800 text-xs font-code font-bold flex items-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-300" />
              <span>Switch to 3D Corridor</span>
            </button>
          </div>
        </div>

        {/* Sticky Binder Tabs Filter */}
        <div className="flex flex-wrap gap-2 mb-8 text-xs font-code">
          {[
            { id: 'all', label: '📖 Complete Notebook' },
            { id: 'bio', label: '👋 About & Education' },
            { id: 'security', label: '🔐 Security & Linux' },
            { id: 'projects', label: '🚀 Projects & Demos' },
            { id: 'contact', label: '📫 Contact Channels' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                sounds.playPaperClick();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`px-3 py-1.5 sketch-border-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-[#ebd7b0] text-[#28241f] font-bold shadow-xs'
                  : 'bg-white hover:bg-stone-50 text-stone-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notebook Cover / Intro Hero */}
        {(activeTab === 'all' || activeTab === 'bio') && (
          <section id="bio" className="bg-[#fffefc] sketch-border-thick p-6 sm:p-10 mb-12 shadow-xl relative bg-kraft-lined">
            <div className="washi-tape"></div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#28241f] pb-6 mb-6">
              <div className="flex items-center gap-4">
                <div id="notebook-portrait-stamp" className="w-16 h-20 sm:w-20 sm:h-24 bg-white p-1 sketch-border shadow-md rotate-[-2deg] shrink-0 overflow-hidden">
                  <img
                    id="notebook-portrait-img"
                    src={avatarSrc}
                    onError={() => setAvatarSrc(getDefaultPortraitFallback())}
                    alt="Joe Jose"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div>
                  <span className="text-xs font-code font-bold px-2 py-0.5 bg-[#ebd7b0] sketch-border-sm">
                    PORTFOLIO DOSSIER
                  </span>
                  <h1 className="font-sketch text-3xl sm:text-5xl font-bold text-[#28241f] mt-1">
                    {PERSONAL_INFO.name}
                  </h1>
                  <p className="font-code text-xs sm:text-sm text-stone-700 mt-1 max-w-xl">
                    {PERSONAL_INFO.title}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="font-hand text-xl text-amber-900 font-bold">Status</div>
                <div className="font-code text-xs text-stone-600 font-semibold">{PERSONAL_INFO.educationStatus}</div>
                <div className="font-code text-xs text-stone-500">B.Tech CSE</div>
              </div>
            </div>

            {/* Bio Content */}
            <div className="space-y-4 text-stone-800 text-sm sm:text-base leading-relaxed font-sans mb-8">
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

            {/* Motto Banner */}
            <div className="p-4 bg-[#f2ecdd] sketch-border-sm border-l-4 border-l-[#28241f] mb-8">
              <div className="font-hand text-xl sm:text-2xl text-[#28241f] font-bold">
                "{PERSONAL_INFO.motto}"
              </div>
            </div>

            {/* Education Box */}
            <div className="bg-[#fcfbf9] sketch-border p-6 mb-8">
              <h3 className="font-sketch text-2xl font-bold text-[#28241f] mb-2">
                🎓 Education: {PERSONAL_INFO.educationDegree}
              </h3>
              <p className="text-xs text-stone-700 font-sans mb-4">
                Developing core fundamentals in computer science while independently exploring beyond the academic curriculum.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {EDUCATION_AREAS.map((area, idx) => (
                  <div key={idx} className="p-2 bg-white sketch-border-sm text-xs font-code text-stone-800 flex items-center gap-1.5">
                    <span className="text-amber-800 font-bold">✓</span>
                    <span className="truncate">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths */}
            <div className="mb-4">
              <h3 className="font-sketch text-2xl font-bold text-[#28241f] mb-4">
                🧠 Core Strengths
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {CORE_STRENGTHS.map((st, idx) => (
                  <div key={idx} className="p-3 bg-white sketch-border-sm">
                    <h4 className="font-sketch text-lg font-bold text-[#28241f]">{st.title}</h4>
                    <p className="text-xs text-stone-600 font-sans mt-1">{st.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section 2: Cybersecurity & Linux */}
        {(activeTab === 'all' || activeTab === 'security') && (
          <section id="security" className="bg-[#fffefc] sketch-border-thick p-6 sm:p-10 mb-12 shadow-xl relative">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#28241f] pb-4 mb-6">
              <div>
                <span className="text-xs font-code font-bold px-2 py-0.5 bg-[#ebd7b0] sketch-border-sm">
                  SECURITY & SYSTEMS
                </span>
                <h2 className="font-sketch text-3xl sm:text-4xl font-bold text-[#28241f] mt-1">
                  Cybersecurity, Linux & Programming
                </h2>
              </div>

              <button
                type="button"
                onClick={onOpenTerminal}
                className="sketch-button px-3 py-1.5 bg-[#28241f] text-amber-300 hover:bg-stone-800 text-xs font-code font-bold flex items-center gap-1"
              >
                <Terminal className="w-3.5 h-3.5" /> Open Linux Terminal
              </button>
            </div>

            {/* Cyber Domains */}
            <div className="mb-8">
              <h3 className="font-sketch text-2xl font-bold text-[#28241f] mb-4">
                🔐 Cybersecurity Domains
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {CYBERSECURITY_DOMAINS.map((domain, idx) => (
                  <div key={idx} className="p-4 bg-[#fbf9f4] sketch-border-sm">
                    <h4 className="font-sketch text-lg font-bold text-[#28241f] mb-2">{domain.title}</h4>
                    <ul className="space-y-1 text-xs font-code text-stone-700">
                      {domain.items.map((it, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-800">▸</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Linux Section with Interactive Distro Explorer */}
            <div className="mb-8">
              <h3 className="font-sketch text-2xl font-bold text-[#28241f] mb-2">
                🐧 Linux Exploration (25+ Distributions)
              </h3>
              <p className="text-sm font-hand text-xl text-stone-800 mb-4">
                "{LINUX_DETAILS.quote}"
              </p>
              <LinuxDistroExplorer />
            </div>

            {/* Python & Skills Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 bg-[#fbf9f4] sketch-border-sm">
                <h4 className="font-sketch text-2xl font-bold text-[#28241f] mb-2">💻 Python Programming</h4>
                <p className="text-xs text-stone-700 font-sans mb-3">{PYTHON_PROGRAMMING.summary}</p>
                <p className="font-hand text-base text-amber-900 font-bold mb-3">"{PYTHON_PROGRAMMING.focus}"</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {PYTHON_PROGRAMMING.areas.map((a, i) => (
                    <span key={i} className="p-1.5 bg-white sketch-border-sm text-[11px] font-code text-stone-800">
                      • {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-[#fbf9f4] sketch-border-sm">
                <h4 className="font-sketch text-2xl font-bold text-[#28241f] mb-2">🛠️ Technical Skills</h4>
                <div className="space-y-3">
                  {TECHNICAL_SKILLS.map((cat, i) => (
                    <div key={i}>
                      <span className="font-code text-xs font-bold text-stone-700">{cat.title}:</span>
                      <p className="text-xs font-code text-stone-600 mt-0.5">{cat.skills.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 3: Projects */}
        {(activeTab === 'all' || activeTab === 'projects') && (
          <section id="projects" className="bg-[#fffefc] sketch-border-thick p-6 sm:p-10 mb-12 shadow-xl relative">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#28241f] pb-4 mb-6">
              <div>
                <span className="text-xs font-code font-bold px-2 py-0.5 bg-[#ebd7b0] sketch-border-sm">
                  EXHIBITION OF WORKS
                </span>
                <h2 className="font-sketch text-3xl sm:text-4xl font-bold text-[#28241f] mt-1">
                  Projects & Case Studies
                </h2>
              </div>
            </div>

            {/* Project 1: MetadataGuard */}
            <div className="mb-10 pb-8 border-b-2 border-dashed border-stone-300">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="font-sketch text-3xl font-bold text-[#28241f]">{metadataGuard.title}</h3>
                {metadataGuard.github && (
                  <a
                    href={metadataGuard.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sketch-button px-3 py-1 bg-[#ebd7b0] hover:bg-[#dfc89f] text-xs font-code font-bold flex items-center gap-1.5"
                  >
                    <Github className="w-3.5 h-3.5" /> GitHub Repo
                  </a>
                )}
              </div>
              <p className="font-hand text-lg text-amber-900 font-bold -mt-1 mb-3">{metadataGuard.subtitle}</p>
              <p className="text-sm text-stone-700 font-sans leading-relaxed mb-4">{metadataGuard.description}</p>
              
              <div className="flex flex-wrap gap-1.5 mb-4">
                {metadataGuard.concepts.map((c, i) => (
                  <span key={i} className="px-2.5 py-0.5 bg-[#fbf9f4] sketch-border-sm text-xs font-code text-stone-800">
                    ✓ {c}
                  </span>
                ))}
              </div>

              {/* Embedded Interactive MetadataGuard Demo */}
              <MetadataGuardDemo />
            </div>

            {/* Project 2: Local Network Monitor */}
            <div className="mb-10 pb-8 border-b-2 border-dashed border-stone-300">
              <h3 className="font-sketch text-3xl font-bold text-[#28241f]">{localMonitor.title}</h3>
              <p className="font-hand text-lg text-amber-900 font-bold -mt-1 mb-3">{localMonitor.subtitle}</p>
              <p className="text-sm text-stone-700 font-sans leading-relaxed mb-4">{localMonitor.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {localMonitor.potentialCapabilities?.map((cap, i) => (
                  <div key={i} className="p-2 bg-[#fbf9f4] sketch-border-sm text-xs font-code text-stone-800 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-800 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project 3: Network Visualizer */}
            <div>
              <h3 className="font-sketch text-3xl font-bold text-[#28241f]">{visualizer.title}</h3>
              <p className="font-hand text-lg text-amber-900 font-bold -mt-1 mb-3">{visualizer.subtitle}</p>
              <p className="text-sm text-stone-700 font-sans leading-relaxed mb-4">{visualizer.description}</p>
              
              {/* Embedded Interactive Visualizer Demo */}
              <NetworkVisualizerDemo />
            </div>
          </section>
        )}

        {/* Section 4: Contact & Socials */}
        {(activeTab === 'all' || activeTab === 'contact') && (
          <section id="contact" className="bg-[#fffefc] sketch-border-thick p-6 sm:p-10 mb-12 shadow-xl relative">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#28241f] pb-4 mb-6">
              <div>
                <span className="text-xs font-code font-bold px-2 py-0.5 bg-[#ebd7b0] sketch-border-sm">
                  CONNECT
                </span>
                <h2 className="font-sketch text-3xl sm:text-4xl font-bold text-[#28241f] mt-1">
                  Contact Channels & Socials
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-[#fdfbf7] sketch-border-sm">
                <Mail className="w-5 h-5 text-amber-900 mb-2" />
                <div className="font-sketch text-lg font-bold text-[#28241f]">Email</div>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="font-code text-xs text-stone-800 hover:underline block break-all mt-1">
                  {PERSONAL_INFO.email}
                </a>
              </div>

              <div className="p-4 bg-[#fdfbf7] sketch-border-sm">
                <Github className="w-5 h-5 text-amber-900 mb-2" />
                <div className="font-sketch text-lg font-bold text-[#28241f]">GitHub</div>
                <a href={PERSONAL_INFO.githubUrl} target="_blank" rel="noopener noreferrer" className="font-code text-xs text-stone-800 hover:underline block mt-1">
                  {PERSONAL_INFO.githubHandle}
                </a>
              </div>

              <div className="p-4 bg-[#fdfbf7] sketch-border-sm">
                <Instagram className="w-5 h-5 text-amber-900 mb-2" />
                <div className="font-sketch text-lg font-bold text-[#28241f]">Instagram</div>
                <a href={PERSONAL_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-code text-xs text-stone-800 hover:underline block mt-1">
                  {PERSONAL_INFO.instagramHandle}
                </a>
              </div>
            </div>

            {/* Keywords */}
            <div>
              <h4 className="font-sketch text-xl font-bold text-[#28241f] mb-3">Portfolio Keywords</h4>
              <div className="flex flex-wrap gap-1.5">
                {PORTFOLIO_KEYWORDS.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 bg-[#f5efe4] sketch-border-sm text-xs font-code text-stone-800">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back to top strip */}
        <div className="text-center py-6">
          <button
            type="button"
            onClick={scrollToTop}
            className="sketch-button px-4 py-2 bg-white text-xs font-code font-bold inline-flex items-center gap-2"
          >
            <ArrowUp className="w-4 h-4" /> Return to Top of Notebook
          </button>
        </div>
      </div>
    </div>
  );
};
