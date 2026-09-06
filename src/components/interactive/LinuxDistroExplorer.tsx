import React, { useState } from 'react';
import { Terminal, Shield, Cpu, Layers, Server, Search, CheckCircle } from 'lucide-react';
import { LINUX_DISTROS_SAMPLES } from '../../data/portfolioData';
import { sounds } from '../../utils/audio';

export const LinuxDistroExplorer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistro, setSelectedDistro] = useState(LINUX_DISTROS_SAMPLES[0]);

  const categories = ['All', 'Security & Pentest', 'Customization & Rolling', 'Everyday', 'Lightweight & Minimal', 'Enterprise & Server'];

  const filteredDistros = LINUX_DISTROS_SAMPLES.filter((distro) => {
    const matchesCat = activeCategory === 'All' || distro.category === activeCategory;
    const matchesSearch = distro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          distro.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          distro.highlight.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSelect = (distro: typeof LINUX_DISTROS_SAMPLES[0]) => {
    sounds.playPaperClick();
    setSelectedDistro(distro);
  };

  return (
    <div className="bg-[#fcfbf9] sketch-border p-5 my-6 bg-kraft-grid relative">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#28241f] pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#28241f]" />
            <h4 className="font-sketch text-2xl font-bold tracking-wide">The 25+ Linux Distro Logbook</h4>
          </div>
          <p className="text-xs font-hand text-stone-600 text-base">
            Documenting hands-on experiments with desktop environments, package managers & security setups
          </p>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search distributions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1 text-xs font-code sketch-border-sm bg-white focus:outline-none focus:bg-amber-50/50 w-48"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5 mb-4 text-xs font-code">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              sounds.playPaperClick();
              setActiveCategory(cat);
            }}
            className={`px-2.5 py-1 sketch-border-sm transition-colors ${
              activeCategory === cat ? 'bg-[#28241f] text-white font-bold' : 'bg-[#f2ece0] hover:bg-[#e4ddce] text-stone-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Two column layout: Left list / Right detail dossier */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Distro Grid/List */}
        <div className="md:col-span-5 max-h-80 overflow-y-auto pr-1 space-y-1.5">
          {filteredDistros.length === 0 ? (
            <div className="p-4 text-center text-xs font-code text-stone-500">No matching distributions found.</div>
          ) : (
            filteredDistros.map((d) => {
              const isSelected = selectedDistro.name === d.name;
              return (
                <button
                  key={d.name}
                  type="button"
                  onClick={() => handleSelect(d)}
                  className={`w-full text-left p-2.5 sketch-border-sm transition-all flex items-center justify-between text-xs font-code ${
                    isSelected ? 'bg-[#ebd7b0] font-bold shadow-sm' : 'bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {d.category === 'Security & Pentest' && <Shield className="w-3.5 h-3.5 shrink-0 text-red-700" />}
                    {d.category === 'Customization & Rolling' && <Cpu className="w-3.5 h-3.5 shrink-0 text-blue-700" />}
                    {d.category === 'Everyday' && <Layers className="w-3.5 h-3.5 shrink-0 text-emerald-700" />}
                    {d.category === 'Enterprise & Server' && <Server className="w-3.5 h-3.5 shrink-0 text-purple-700" />}
                    {d.category === 'Lightweight & Minimal' && <Terminal className="w-3.5 h-3.5 shrink-0 text-amber-700" />}
                    <span className="truncate">{d.name}</span>
                  </div>
                  <span className="text-[10px] text-stone-500 shrink-0 ml-2">{d.category}</span>
                </button>
              );
            })
          )}
        </div>

        {/* Distro Detail Card */}
        <div className="md:col-span-7 bg-white sketch-border p-4 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-2 mb-3">
              <div>
                <h5 className="font-sketch text-2xl font-bold text-[#28241f]">{selectedDistro.name}</h5>
                <span className="inline-block text-[11px] font-code px-2 py-0.5 bg-[#f0ebe0] sketch-border-sm mt-0.5">
                  {selectedDistro.category}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-code text-stone-500 block">Focus Exploration:</span>
                <span className="text-xs font-hand text-base font-bold text-amber-900">{selectedDistro.highlight}</span>
              </div>
            </div>

            <p className="text-xs text-stone-700 font-sans leading-relaxed mb-4">
              {selectedDistro.description}
            </p>

            <div>
              <div className="text-[11px] font-code font-bold uppercase tracking-wider text-stone-600 mb-2">
                Techniques & Configurations Explored:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {selectedDistro.exploredFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 p-1.5 bg-[#faf8f4] sketch-border-sm text-[11px] font-code text-stone-800">
                    <CheckCircle className="w-3 h-3 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-[11px] font-code text-stone-500">
            <span>Verified in physical & virtualized lab environments</span>
            <span className="font-hand text-base text-stone-700">~25+ distros & counting</span>
          </div>
        </div>
      </div>
    </div>
  );
};
