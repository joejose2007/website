import React, { useState } from 'react';
import { ArrowLeft, Mail, Github, Instagram, Copy, Check, Send, Sparkles, Tag, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, PORTFOLIO_KEYWORDS } from '../../data/portfolioData';
import { sounds } from '../../utils/audio';

interface DeskRoomProps {
  onBackToCorridor: () => void;
}

export const DeskRoom: React.FC<DeskRoomProps> = ({ onBackToCorridor }) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');

  const copyToClipboard = (text: string, label: string) => {
    sounds.playPencilScribble();
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playPaperRustle();
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      subject || 'Inquiry from Kraft Portfolio'
    )}&body=${encodeURIComponent(
      `Hello Joe,\n\n${message}\n\nBest regards,\n${senderName || 'Visitor'}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
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
          <span className="text-[11px] font-code text-stone-500 block">CHAMBER 04</span>
          <span className="font-sketch text-2xl font-bold text-[#28241f]">The Desk & Channels</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-[#fdfbf7] sketch-border p-6 sm:p-8 mb-10 bg-kraft-grid relative">
        <div className="washi-tape"></div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-code font-bold px-2 py-0.5 bg-[#ebd7b0] sketch-border-sm">
            📫 CONTACT & COLLABORATION
          </span>
        </div>

        <h2 className="font-sketch text-3xl sm:text-4xl font-bold text-[#28241f] mb-3">
          Get in Touch with Joe Jose
        </h2>

        <p className="text-stone-700 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
          For collaboration, project discussions, internships, technical opportunities, or general inquiries. Whether you want to talk about cybersecurity, Linux configurations, Python scripting, or new project ideas, I'm always eager to connect.
        </p>
      </div>

      {/* Main Grid: Direct Contact Cards + Interactive Letter Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        {/* Left Column: Direct Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email Card */}
          <div className="bg-white sketch-border p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#ebd7b0] sketch-border-sm flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#28241f]" />
                </div>
                <span className="text-xs font-code font-bold text-stone-500">PRIMARY EMAIL</span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                className="sketch-button p-1 text-[11px] font-code bg-[#f2ece0] hover:bg-[#ebd7b0] text-stone-700 flex items-center gap-1"
                title="Copy email to clipboard"
              >
                {copiedItem === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedItem === 'email' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="font-code text-sm sm:text-base font-bold text-[#28241f] hover:text-amber-900 break-all block mt-1"
            >
              {PERSONAL_INFO.email}
            </a>
            <p className="text-xs font-hand text-stone-600 text-base mt-1">
              Direct inbox for technical inquiries & opportunities
            </p>
          </div>

          {/* GitHub Card */}
          <div className="bg-white sketch-border p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#ebd7b0] sketch-border-sm flex items-center justify-center">
                  <Github className="w-4 h-4 text-[#28241f]" />
                </div>
                <span className="text-xs font-code font-bold text-stone-500">GITHUB REPOSITORIES</span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(PERSONAL_INFO.githubHandle, 'github')}
                className="sketch-button p-1 text-[11px] font-code bg-[#f2ece0] hover:bg-[#ebd7b0] text-stone-700 flex items-center gap-1"
                title="Copy GitHub handle"
              >
                {copiedItem === 'github' ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedItem === 'github' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-code text-sm sm:text-base font-bold text-[#28241f] hover:text-amber-900 flex items-center gap-1 mt-1"
            >
              <span>{PERSONAL_INFO.githubHandle}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <p className="text-xs font-hand text-stone-600 text-base mt-1">
              Featured project: MetadataGuard · Open source code
            </p>
          </div>

          {/* Instagram Card */}
          <div className="bg-white sketch-border p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#ebd7b0] sketch-border-sm flex items-center justify-center">
                  <Instagram className="w-4 h-4 text-[#28241f]" />
                </div>
                <span className="text-xs font-code font-bold text-stone-500">INSTAGRAM SOCIAL</span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(PERSONAL_INFO.instagramHandle, 'insta')}
                className="sketch-button p-1 text-[11px] font-code bg-[#f2ece0] hover:bg-[#ebd7b0] text-stone-700 flex items-center gap-1"
                title="Copy Instagram handle"
              >
                {copiedItem === 'insta' ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedItem === 'insta' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <a
              href={PERSONAL_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-code text-sm sm:text-base font-bold text-[#28241f] hover:text-amber-900 flex items-center gap-1 mt-1"
            >
              <span>{PERSONAL_INFO.instagramHandle}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <p className="text-xs font-hand text-stone-600 text-base mt-1">
              Informal window into experiments, projects & the personal side
            </p>
          </div>
        </div>

        {/* Right Column: Hand-drawn Postcard Message Stationery */}
        <div className="lg:col-span-7 bg-[#fffefc] sketch-border-thick p-6 sm:p-8 relative shadow-lg bg-kraft-lined">
          {/* Postcard Stamp Doodle */}
          <div className="absolute top-5 right-5 w-16 h-18 bg-[#ebd7b0] sketch-border-sm flex flex-col items-center justify-center p-1 rotate-3 shadow-xs">
            <div className="text-[9px] font-code text-stone-700 uppercase font-bold tracking-tighter">AIR MAIL</div>
            <div className="text-xl">🐧</div>
            <div className="text-[8px] font-code text-stone-600">LINUX / 25+</div>
          </div>

          <div className="mb-4 pr-18">
            <span className="text-xs font-code font-bold text-stone-500 uppercase tracking-wider block">
              Hand-Drawn Stationery
            </span>
            <h3 className="font-sketch text-2xl sm:text-3xl font-bold text-[#28241f]">
              Dispatch a Message
            </h3>
            <p className="text-xs font-hand text-stone-600 text-base">
              Compose a quick note — will open directly in your mail client
            </p>
          </div>

          <form onSubmit={handleSendEmail} className="space-y-3 font-code text-xs">
            <div>
              <label className="block text-stone-700 font-bold mb-1">Your Name or Organization:</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Alice / Security Team"
                className="w-full p-2.5 bg-white sketch-border-sm focus:outline-none focus:bg-amber-50/40"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">Topic / Subject Line:</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Collaboration on MetadataGuard / Cybersecurity Discussion"
                className="w-full p-2.5 bg-white sketch-border-sm focus:outline-none focus:bg-amber-50/40"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">Message Note:</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your thoughts, questions, or opportunity details..."
                className="w-full p-2.5 bg-white sketch-border-sm focus:outline-none focus:bg-amber-50/40 resize-none font-sans text-sm"
              />
            </div>

            <button
              type="submit"
              className="sketch-button w-full py-3 px-6 bg-[#28241f] text-white hover:bg-stone-800 font-sketch text-xl font-bold tracking-wide flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>TRANSMIT VIA EMAIL TO JOE</span>
            </button>
          </form>
        </div>
      </div>

      {/* Portfolio Keywords Section */}
      <div className="bg-white sketch-border p-6 sm:p-8 mb-10 shadow-sm">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-stone-200">
          <Tag className="w-4 h-4 text-amber-900" />
          <h4 className="font-sketch text-2xl font-bold text-[#28241f]">Portfolio Keywords</h4>
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
          type="button"
          onClick={onBackToCorridor}
          className="sketch-button px-5 py-2.5 bg-[#ebd7b0] text-[#28241f] hover:bg-[#dfc89f] text-xs font-code font-bold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Return to the 3D Corridor
        </button>

        <span className="font-hand text-lg text-stone-600">
          Crafted with care in the Kraft notebook aesthetic
        </span>
      </div>
    </div>
  );
};
