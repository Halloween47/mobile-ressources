"use client";

import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, Dices, Layers, Tag, Plus, Command, Sparkles, Zap, LayoutList, LayoutGrid } from 'lucide-react';

const App = () => {
  // --- DATA ---
  const initialResources = [
    { 
      id: 1, 
      name: 'Ressources', 
      category: 'Design', 
      desc: 'Banque d\'images haute résolution gratuite.', 
      url: 'https://unsplash.com', 
      featured: true,
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 2, 
      name: 'Linear', 
      category: 'Tech', 
      desc: 'Gestion de projet fluide et rapide.', 
      url: 'https://linear.app', 
      featured: false,
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 3, 
      name: 'ChatGPT', 
      category: 'AI', 
      desc: 'Assistant conversationnel par OpenAI.', 
      url: 'https://chat.openai.com', 
      featured: false,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 4, 
      name: 'Tailwind CSS', 
      category: 'Dev', 
      desc: 'Framework CSS utilitaire-first.', 
      url: 'https://tailwindcss.com', 
      featured: false,
      image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 5, 
      name: 'Figma', 
      category: 'Design', 
      desc: 'L\'outil standard pour l\'UI/UX.', 
      url: 'https://figma.com', 
      featured: true,
      image: 'https://images.unsplash.com/photo-1558655146-d09347e0b7a9?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 6, 
      name: 'Vercel', 
      category: 'Dev', 
      desc: 'Déploiement frontend instantané.', 
      url: 'https://vercel.com', 
      featured: false,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 7, 
      name: 'Midjourney', 
      category: 'AI', 
      desc: 'Génération d\'images par IA.', 
      url: 'https://midjourney.com', 
      featured: true,
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 8, 
      name: 'Notion', 
      category: 'Productivity', 
      desc: 'L\'espace de travail tout-en-un.', 
      url: 'https://notion.so', 
      featured: false,
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 9, 
      name: 'Dribbble', 
      category: 'Design', 
      desc: 'Inspiration pour designers.', 
      url: 'https://dribbble.com', 
      featured: false,
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 10, 
      name: 'Raycast', 
      category: 'Productivity', 
      desc: 'Lanceur d\'applications extensible pour Mac.', 
      url: 'https://raycast.com', 
      featured: true,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
    },
  ];

  // --- STATE ---
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [randomResource, setRandomResource] = useState(initialResources[0]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [viewMode, setViewMode] = useState('list');

  // --- LOGIC ---
  const categories = ['Tous', 'Design', 'Tech', 'AI', 'Dev', 'Productivity'];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shuffleResource = () => {
    let newRandom;
    do {
      newRandom = initialResources[Math.floor(Math.random() * initialResources.length)];
    } while (newRandom.id === randomResource.id);
    setRandomResource(newRandom);
  };

  // Optimisation automatique par React Compiler : useMemo est retiré car il entrait en conflit avec le compilateur
  const filteredResources = initialResources.filter(r => {
    const matchesCategory = activeCategory === 'Tous' || r.category === activeCategory;
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-slate-200 font-sans selection:bg-cyan-500/30 pb-24">
      
      {/* --- HEADER --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-neutral-950/80 backdrop-blur-xl border-white/10 shadow-lg' : 'bg-transparent border-transparent'}`}>
        <div className="max-w-md mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Command size={16} className="text-black" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              TOM Hub <span className="text-cyan-500">.</span>
            </h1>
          </div>
          <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors active:scale-95">
            <Plus size={20} className="text-cyan-400" />
          </button>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-md mx-auto px-5 pt-24">
        
        {/* --- HERO SECTION --- */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
          
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 shadow-2xl h-[340px] flex flex-col justify-between">
            <div className="absolute inset-0 z-0">
                <img 
                    src={randomResource.image} 
                    alt={randomResource.name}
                    className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent"></div>
            </div>

            <div className="relative z-10 p-6 flex justify-between items-start">
              <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-mono tracking-widest uppercase border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md px-2 py-1 rounded-md shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                <Sparkles size={10} />
                Spotlight
              </div>
              <button 
                onClick={shuffleResource}
                className="text-white hover:text-cyan-400 transition-colors p-2 bg-black/20 backdrop-blur-md hover:bg-black/40 rounded-full border border-white/10"
              >
                <Dices size={18} />
              </button>
            </div>

            <div className="relative z-10 p-6">
              <div className="mb-4">
                <h2 className="text-4xl font-bold text-white mb-2 tracking-tight drop-shadow-lg">{randomResource.name}</h2>
                <p className="text-slate-300 text-sm leading-relaxed line-clamp-2 drop-shadow-md">{randomResource.desc}</p>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <a href={randomResource.url} target="_blank" rel="noreferrer" className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-cyan-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  Ouvrir <ExternalLink size={14} />
                </a>
                <div className="px-4 py-3 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl text-xs font-mono text-cyan-400">
                  #{randomResource.category}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* --- SEARCH --- */}
        <div className="relative mb-6">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Rechercher une ressource..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-slate-600"
          />
        </div>

        {/* --- FILTERS --- */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                activeCategory === cat 
                  ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                  : 'bg-neutral-900 border-white/5 text-slate-500 hover:border-white/20 hover:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- VIEW CONTROLS --- */}
        <div className="flex items-center justify-between mb-4 mt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                {activeCategory === 'Tous' ? 'Récemment ajoutés' : activeCategory}
            </span>
          </div>
          
          <div className="flex bg-white/5 rounded-lg p-1 border border-white/5">
            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white/10 text-cyan-400' : 'text-slate-600'}`}>
                <LayoutList size={16} />
            </button>
            <button onClick={() => setViewMode('slide')} className={`p-1.5 rounded-md transition-all ${viewMode === 'slide' ? 'bg-white/10 text-cyan-400' : 'text-slate-600'}`}>
                <LayoutGrid size={16} />
            </button>
          </div>
        </div>

        {/* --- RESOURCES LIST --- */}
        {viewMode === 'list' ? (
            <div className="grid grid-cols-1 gap-3">
            {filteredResources.map(resource => (
                <a key={resource.id} href={resource.url} target="_blank" rel="noreferrer" className="group relative p-4 rounded-2xl border border-white/5 bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 active:scale-[0.98]">
                    <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-white group-hover:text-cyan-400">{resource.name}</h3>
                        </div>
                        <ExternalLink size={14} className="text-slate-700 group-hover:text-white" />
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-1">{resource.desc}</p>
                </a>
            ))}
            </div>
        ) : (
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-8 snap-x snap-mandatory -mx-5 px-5">
                {filteredResources.map(resource => (
                    <a key={resource.id} href={resource.url} target="_blank" rel="noreferrer" className="relative min-w-[85%] h-48 rounded-2xl overflow-hidden snap-center border border-white/10 group shrink-0">
                        <div className="absolute inset-0">
                            <img src={resource.image} alt={resource.name} className="w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
                        </div>
                        <div className="absolute inset-0 p-5 flex flex-col justify-end">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{resource.name}</h3>
                                    <p className="text-xs text-slate-300 line-clamp-1">{resource.desc}</p>
                                </div>
                                <div className="bg-white/10 p-2 rounded-full backdrop-blur-md border border-white/10 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                                    <ExternalLink size={16} />
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        )}
      </main>

      {/* --- TAB BAR --- */}
      <div className="fixed bottom-0 w-full z-40 bg-neutral-950/90 backdrop-blur-xl border-t border-white/5 pb-8 pt-2 px-8 flex justify-between items-center">
        <button className="flex flex-col items-center gap-1 text-cyan-400"><Layers size={22} /><span className="text-[9px] font-bold">HOME</span></button>
        <button className="flex flex-col items-center gap-1 text-slate-600"><Zap size={22} /><span className="text-[9px] font-medium">FEED</span></button>
        <button className="flex flex-col items-center gap-1 text-slate-600"><Tag size={22} /><span className="text-[9px] font-medium">TAGS</span></button>
        <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-white font-bold">A</div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;