import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, Minimize2, Maximize2, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, PORTFOLIO_KEYWORDS, PROJECTS } from '../data/portfolioData';
import { sounds } from '../utils/audio';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'system' | 'ascii';
}

interface LinuxTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LinuxTerminalModal: React.FC<LinuxTerminalModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'Joe Linux Kernel v6.10-arch1-1 (tty1)', type: 'system' },
    { text: 'Welcome to Joe Jose\'s interactive Linux environment. Type "help" to view available commands.', type: 'system' },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    sounds.playPencilScribble();
    const newLines: TerminalLine[] = [{ text: `joe@workstation:~$ ${cmd}`, type: 'input' }];
    const parts = cmd.toLowerCase().split(' ');
    const root = parts[0];

    switch (root) {
      case 'help':
        newLines.push({
          type: 'output',
          text: `Available commands:
  whoami        Display current identity & role
  about         Read Joe's introduction & philosophy
  neofetch      Display system specs & profile card in ASCII
  skills        List core technical & cybersecurity competencies
  projects      Show featured projects (MetadataGuard, etc.)
  distros       List Linux distributions explored
  contact       Display contact details & social handles
  clear         Clear the terminal screen
  motto         Display Joe's engineering motto
  exit          Close terminal window`,
        });
        break;

      case 'whoami':
        newLines.push({
          type: 'output',
          text: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`,
        });
        break;

      case 'about':
      case 'cat':
        newLines.push({
          type: 'output',
          text: `${PERSONAL_INFO.bio}\n\nMotto: "${PERSONAL_INFO.motto}"`,
        });
        break;

      case 'neofetch':
        newLines.push({
          type: 'ascii',
          text: `       /\\
      /  \\         User: joe@arch-workstation
     /\\   \\        OS: Arch Linux x86_64 / Debian / 25+ Distros
    /      \\       Host: B.Tech Computer Science & Engineering
   /   ,,   \\      Kernel: 6.10.2-security-hardened
  /   |  |  -\\     Uptime: Lifelong Curiosity
 /_-''    ''-_\\    Shell: zsh 5.9 / Python 3.12
                   Focus: Cybersecurity · NetSec · Forensics · OSINT
                   GitHub: ${PERSONAL_INFO.githubHandle}
                   Email: ${PERSONAL_INFO.email}`,
        });
        break;

      case 'skills':
        newLines.push({
          type: 'output',
          text: `TECHNICAL SKILLS:
• Programming: Python, Shell Scripting, Automation, Software Dev
• Cybersecurity: Pen Testing, Network Monitoring, Metadata Analysis, Digital Forensics, OSINT
• Operating Systems: Linux (25+ distros), Windows, System Administration
• Tools: Git, GitHub, Docker, Linux Terminal, WireShark, Nmap
• AI: AI-assisted development, AI/ML experimentation, Local AI Models`,
        });
        break;

      case 'projects':
        newLines.push({
          type: 'output',
          text: PROJECTS.map(p => `• [${p.title}] - ${p.subtitle}\n  ${p.description}`).join('\n\n'),
        });
        break;

      case 'distros':
        newLines.push({
          type: 'output',
          text: `25+ Linux Distributions Explored:
Arch Linux, Kali Linux, Parrot Security OS, Debian, Fedora, Void Linux,
Alpine Linux, Tails OS, NixOS, Ubuntu, Linux Mint, Manjaro, Pop!_OS,
openSUSE Tumbleweed, Puppy Linux, CentOS/Rocky, Gentoo, BlackArch, and more.`,
        });
        break;

      case 'contact':
        newLines.push({
          type: 'output',
          text: `Email: ${PERSONAL_INFO.email}
GitHub: ${PERSONAL_INFO.githubHandle} (${PERSONAL_INFO.githubUrl})
Instagram: ${PERSONAL_INFO.instagramHandle}`,
        });
        break;

      case 'motto':
        newLines.push({
          type: 'output',
          text: `"${PERSONAL_INFO.motto}"`,
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
        onClose();
        return;

      case 'sudo':
        newLines.push({
          type: 'error',
          text: 'joe is not in the sudoers file. This incident will be reported.',
        });
        break;

      default:
        newLines.push({
          type: 'error',
          text: `command not found: ${cmd}. Type "help" for a list of available commands.`,
        });
        break;
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-3xl bg-[#1e1c19] text-[#e8e4dc] sketch-border shadow-2xl overflow-hidden flex flex-col h-[520px]">
        {/* Terminal Header */}
        <div className="bg-[#2d2a25] px-4 py-2.5 flex items-center justify-between border-b border-[#3e3a33]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <span className="font-code text-xs text-stone-300 ml-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              joe@arch-workstation:~ (bash)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-code text-stone-400 hidden sm:inline">Press Esc or type "exit" to close</span>
            <button
              type="button"
              onClick={onClose}
              className="p-1 hover:bg-[#3e3a33] rounded text-stone-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Body */}
        <div className="flex-1 p-4 overflow-y-auto font-code text-xs space-y-2 select-text">
          {history.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              {line.type === 'input' && (
                <span className="text-amber-400 font-bold">{line.text}</span>
              )}
              {line.type === 'system' && (
                <span className="text-stone-400 italic">{line.text}</span>
              )}
              {line.type === 'error' && (
                <span className="text-rose-400">{line.text}</span>
              )}
              {line.type === 'ascii' && (
                <span className="text-cyan-400 font-mono text-[11px] block">{line.text}</span>
              )}
              {line.type === 'output' && (
                <span className="text-stone-200">{line.text}</span>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input prompt */}
        <form onSubmit={handleCommand} className="p-3 bg-[#24211d] border-t border-[#3e3a33] flex items-center gap-2">
          <span className="text-amber-400 font-code text-xs font-bold shrink-0">joe@workstation:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type 'help', 'neofetch', 'projects', 'distros'..."
            className="flex-1 bg-transparent font-code text-xs text-white focus:outline-none placeholder:text-stone-500"
          />
        </form>
      </div>
    </div>
  );
};
