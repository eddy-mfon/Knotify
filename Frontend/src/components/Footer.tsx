import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: 'home' | 'marketplace') => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  return (
    <footer className="bg-[#0B2316] text-[#FFFEF2] pt-20 pb-12 px-6 sm:px-12 border-t border-[#FFFEF2]/10 text-left relative overflow-hidden" id="site-footer">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Top Header Row: Brand Name & Call to Action */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#FFFEF2]/15 pb-12">
          <div>
            <div 
              className="flex items-baseline gap-2 cursor-pointer select-none group" 
              onClick={() => {
                setCurrentTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="font-display font-black text-4xl sm:text-6xl text-[#FFFEF2] tracking-tight group-hover:text-emerald-300 transition-colors">
                Knotify
              </span>
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
            </div>
            <p className="text-xs sm:text-sm text-[#FFFEF2]/70 font-sans max-w-md mt-3 leading-relaxed font-light">
              Elevated neckwear engineered for presence, poise, and unshakeable confidence. Designed for campus, chapel, and executive boardrooms.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setCurrentTab('marketplace');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-[#FFFEF2] hover:bg-[#F4F2E6] text-[#0B2316] font-mono text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full transition-all shadow-md cursor-pointer"
            >
              <span>Explore The Store</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Minimal Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-left">
          
          {/* Brand Philosophy */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FFFEF2]/40">Craft & Promise</p>
            <p className="text-xs font-sans text-[#FFFEF2]/70 leading-relaxed font-light">
              Every piece in the Knotify catalog is selected for fabric weight, knot roll dimple stability, and effortless presentation.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FFFEF2]/40">Pages</p>
            <div className="flex flex-col gap-2 text-xs font-mono text-[#FFFEF2]/65">
              <button onClick={() => { setCurrentTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FFFEF2] text-left transition-colors cursor-pointer">Home</button>
              <button onClick={() => { setCurrentTab('marketplace'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FFFEF2] text-left transition-colors cursor-pointer">Store</button>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FFFEF2]/40">Collections</p>
            <div className="flex flex-col gap-2 text-xs font-mono text-[#FFFEF2]/65">
              <span className="hover:text-[#FFFEF2] cursor-pointer" onClick={() => { setCurrentTab('marketplace'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Official Ties</span>
              <span className="hover:text-[#FFFEF2] cursor-pointer" onClick={() => { setCurrentTab('marketplace'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Corporate Line</span>
              <span className="hover:text-[#FFFEF2] cursor-pointer" onClick={() => { setCurrentTab('marketplace'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Vintage Archive</span>
            </div>
          </div>

          {/* Standards */}
          <div className="space-y-2">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FFFEF2]/40">Standard</p>
            <div className="flex items-start gap-2 text-xs text-[#FFFEF2]/65 font-sans leading-relaxed">
              <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
              <span>Full compliance with university chapel and professional corporate dress codes.</span>
            </div>
          </div>

        </div>

        {/* Bottom Rights & Motto Bar */}
        <div className="pt-8 border-t border-[#FFFEF2]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#FFFEF2]/50">
          <div>
            © 2026 Knotify. Premium Neckwear & Style Showcase.
          </div>
          <div className="font-display italic text-sm text-emerald-300/80">
            Dignitas et Elegantia in Omnia
          </div>
        </div>

      </div>
    </footer>
  );
}

