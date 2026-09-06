import React, { useState } from 'react';
import {
  ArrowLeft,
  Mail,
  Github,
  Instagram,
  Linkedin,
  Copy,
  Check,
  Tag,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { PERSONAL_INFO, PORTFOLIO_KEYWORDS } from '../../data/portfolioData';
import { sounds } from '../../utils/audio';

interface DeskRoomProps {
  onBackToCorridor: () => void;
}

export const DeskRoom: React.FC<DeskRoomProps> = ({ onBackToCorridor }) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    sounds.playPencilScribble();
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div id="contact-chamber" className="max-w-5xl mx-auto px-4 py-6 sm:py-10 scroll-mt-24">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 border-b-2 border-[#28241f] pb-4">
        <button
          id="contact-back-corridor-top-btn"
          type="button"
          onClick={() => {
            sounds.playPaperRustle();
            onBackToCorridor();
          }}
          className="sketch-button px-3.5 py-1.5 bg-white hover:bg-[#ebd7b0] text-xs font-code font-bold flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Corridor
        </button>

        <div className="text-right">
          <span className="text-[11px] font-code text-stone-500 block">CHAMBER 04</span>
          <span className="font-sketch text-xl sm:text-2xl font-bold text-[#28241f]">
            The Desk & Channels
          </span>
        </div>
      </div>

      {/* Contact Section Header */}
      <div className="mb-10">
        <span className="text-xs font-code font-bold px-2.5 py-1 bg-[#ebd7b0] sketch-border-sm inline-block mb-3">
          CONTACT
        </span>
        <h1 className="font-sketch text-3xl sm:text-5xl font-bold text-[#28241f] tracking-tight mb-3">
          Let&apos;s build something interesting.
        </h1>
        <p className="text-stone-700 font-sans text-sm sm:text-base leading-relaxed max-w-2xl">
          Have a project idea, security inquiry, collaboration opportunity, or just want to discuss
          Linux systems, networking, or open-source software? Connect directly through any of the
          channels below.
        </p>
      </div>

      {/* Direct Contact Channels Grid */}
      <div className="bg-[#fffefc] sketch-border p-6 sm:p-8 mb-10 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-3 border-b border-stone-200">
          <div>
            <h2 className="font-sketch text-2xl sm:text-3xl font-bold text-[#28241f]">
              Direct Channels & Socials
            </h2>
            <p className="text-xs font-code text-stone-600 mt-0.5">
              Select any preferred channel to get in touch directly:
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-code text-stone-700 bg-[#f7f4ed] px-2.5 py-1 sketch-border-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>Open for internships & collaborations</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-code text-xs">
          {/* Email */}
          <div className="p-4 bg-[#fdfbf7] border border-stone-300 rounded-sm hover:border-[#28241f] transition-all hover:shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-stone-800 font-bold">
                  <Mail className="w-4 h-4 text-amber-900" />
                  <span>Email</span>
                </div>
                <button
                  id="copy-email-btn"
                  type="button"
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                  className="sketch-button px-2 py-0.5 text-[10px] bg-white hover:bg-[#ebd7b0] text-stone-700 flex items-center gap-1 cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedItem === 'email' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-700" />
                      <span className="text-emerald-800 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-stone-500 mb-2">Direct mail correspondence</p>
            </div>
            <a
              id="direct-email-link"
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-stone-900 font-bold hover:text-amber-900 break-all block text-xs underline decoration-stone-300 hover:decoration-stone-900 pt-2 border-t border-stone-200"
            >
              {PERSONAL_INFO.email}
            </a>
          </div>

          {/* GitHub */}
          <div className="p-4 bg-[#fdfbf7] border border-stone-300 rounded-sm hover:border-[#28241f] transition-all hover:shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-stone-800 font-bold">
                  <Github className="w-4 h-4 text-stone-900" />
                  <span>GitHub</span>
                </div>
                <a
                  id="github-profile-link"
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sketch-button px-2 py-0.5 text-[10px] bg-white hover:bg-[#ebd7b0] text-stone-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Visit</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <p className="text-[11px] text-stone-500 mb-2">Code repositories & scripts</p>
            </div>
            <span className="text-stone-900 text-xs block font-bold pt-2 border-t border-stone-200">
              {PERSONAL_INFO.githubHandle}
            </span>
          </div>

          {/* Instagram */}
          <div className="p-4 bg-[#fdfbf7] border border-stone-300 rounded-sm hover:border-[#28241f] transition-all hover:shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-stone-800 font-bold">
                  <Instagram className="w-4 h-4 text-pink-700" />
                  <span>Instagram</span>
                </div>
                <a
                  id="instagram-profile-link"
                  href={PERSONAL_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sketch-button px-2 py-0.5 text-[10px] bg-white hover:bg-[#ebd7b0] text-stone-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Visit</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <p className="text-[11px] text-stone-500 mb-2">Personal updates & connection</p>
            </div>
            <span className="text-stone-900 text-xs block font-bold pt-2 border-t border-stone-200">
              {PERSONAL_INFO.instagramHandle}
            </span>
          </div>

          {/* LinkedIn */}
          <div className="p-4 bg-[#fdfbf7] border border-stone-300 rounded-sm hover:border-[#28241f] transition-all hover:shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-stone-800 font-bold">
                  <Linkedin className="w-4 h-4 text-blue-700" />
                  <span>LinkedIn</span>
                </div>
                <a
                  id="linkedin-profile-link"
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sketch-button px-2 py-0.5 text-[10px] bg-white hover:bg-[#ebd7b0] text-stone-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Visit</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <p className="text-[11px] text-stone-500 mb-2">Professional networking</p>
            </div>
            <span className="text-stone-900 text-xs block font-bold pt-2 border-t border-stone-200">
              {PERSONAL_INFO.linkedinHandle}
            </span>
          </div>
        </div>
      </div>

      {/* Portfolio Keywords Section */}
      <div className="bg-white sketch-border p-6 sm:p-8 mb-10 shadow-xs">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-stone-200">
          <Tag className="w-4 h-4 text-amber-900" />
          <h3 className="font-sketch text-2xl font-bold text-[#28241f]">Portfolio Keywords</h3>
        </div>
        <p className="text-xs font-sans text-stone-600 mb-4">
          Core technical domains, specializations, and competencies represented in this portfolio:
        </p>

        <div className="flex flex-wrap gap-2">
          {PORTFOLIO_KEYWORDS.map((kw, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-[#f7f4ed] sketch-border-sm text-xs font-code text-stone-800 hover:bg-[#ebd7b0] transition-colors cursor-default"
            >
              #{kw}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Navigation Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-[#28241f]">
        <button
          id="contact-return-corridor-btn"
          type="button"
          onClick={() => {
            sounds.playPaperRustle();
            onBackToCorridor();
          }}
          className="sketch-button px-5 py-2.5 bg-[#ebd7b0] text-[#28241f] hover:bg-[#dfc89f] text-xs font-code font-bold flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Return to the 3D Corridor
        </button>

        <span className="font-hand text-base sm:text-lg text-stone-600">
          Crafted with care in the Kraft notebook aesthetic
        </span>
      </div>
    </div>
  );
};
