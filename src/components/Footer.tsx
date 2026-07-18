import React from 'react';
import { ArrowRight, ShieldCheck, Mail, Globe, Sparkles } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: 'home' | 'marketplace' | 'sell') => void;
  onOpenBecomeSeller: () => void;
}

export default function Footer({ setCurrentTab, onOpenBecomeSeller }: FooterProps) {
  return (
    <footer className="bg-brand-bg pt-12 pb-24 px-4 sm:px-8 relative overflow-hidden" id="site-footer">
      {/* Sleek, dark-themed glassmorphic card for high visual comfort */}
      <div className="max-w-7xl mx-auto bg-neutral-900/40 backdrop-blur-md text-white rounded-[3rem] p-8 sm:p-16 shadow-2xl relative overflow-hidden border border-brand-border/40 z-10">
        
        {/* Decorative thin accent bar at top of card */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-secondary via-[#1B4D3E] to-brand-secondary"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 relative z-10">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="flex items-baseline gap-1.5 select-none cursor-pointer" onClick={() => setCurrentTab('home')}>
              <span className="font-display font-black text-3xl text-white tracking-tight">
                Knotify
              </span>
              <span className="w-2 h-2 rounded-full bg-brand-primary inline-block"></span>
            </div>
            
            <p className="text-xs sm:text-sm text-brand-secondary/80 font-sans leading-relaxed max-w-sm">
              Knotify helps Covenant University students transform their academic dressing. We connect seniors with incoming students to pass down certified, chapel-approved luxury silk neckwear.
            </p>

            <div className="flex items-center gap-3 pt-2 text-[10px] font-mono text-brand-primary bg-brand-secondary/15 border border-brand-secondary/30 px-4 py-2.5 rounded-full inline-flex font-bold tracking-wider uppercase">
              <ShieldCheck size={14} />
              <span>100% Assembly Approved standards</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-bold block">Product</span>
            <div className="flex flex-col space-y-2.5 text-xs font-semibold text-brand-secondary/80">
              <button 
                onClick={() => setCurrentTab('home')}
                className="hover:text-white transition-colors text-left cursor-pointer"
              >
                Home Showcase
              </button>
              <button 
                onClick={() => setCurrentTab('marketplace')}
                className="hover:text-white transition-colors text-left cursor-pointer"
              >
                Ties Catalog
              </button>
              <button 
                onClick={() => setCurrentTab('sell')}
                className="hover:text-white transition-colors text-left cursor-pointer"
              >
                Become a Seller
              </button>
              <button 
                onClick={() => setCurrentTab('marketplace')}
                className="hover:text-white transition-colors text-left cursor-pointer text-brand-gold font-bold"
              >
                Weekly Drops
              </button>
            </div>
          </div>

          {/* Column 3: Resources Links */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-bold block">Resources</span>
            <div className="flex flex-col space-y-2.5 text-xs font-semibold text-brand-secondary/60">
              <span className="hover:text-white transition-colors cursor-pointer">Chapel Guide</span>
              <span className="hover:text-white transition-colors cursor-pointer">Knot Academy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Hall Handoff Rules</span>
              <span className="hover:text-white transition-colors cursor-pointer">Support Desk</span>
            </div>
          </div>

          {/* Column 4: University Links */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-bold block">University</span>
            <div className="flex flex-col space-y-2.5 text-xs font-semibold text-brand-secondary/60">
              <span className="hover:text-white transition-colors cursor-pointer">Covenant Standard</span>
              <span className="hover:text-white transition-colors cursor-pointer">Peter Hall Guild</span>
              <span className="hover:text-white transition-colors cursor-pointer">Paul Hall Guild</span>
              <span className="hover:text-white transition-colors cursor-pointer">Sartorial Integrity</span>
            </div>
          </div>

        </div>

        {/* Separator line */}
        <div className="border-t border-brand-border/40 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-brand-secondary/60 gap-4 relative z-10">
          <div>
            <span>© 2026 Knotify. Designed for Covenant Scholars.</span>
          </div>
          <div className="flex gap-6 font-bold text-brand-secondary/50">
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
          </div>
        </div>

      </div>

      {/* Giant Watermark Text under the card, made highly subtle to match the premium dark vibe */}
      <div className="absolute -bottom-4 sm:-bottom-8 md:-bottom-12 left-0 right-0 text-center select-none pointer-events-none z-0">
        <span className="font-display font-black text-[5rem] sm:text-[8rem] md:text-[11rem] lg:text-[14rem] text-brand-secondary/[0.03] tracking-[0.15em] uppercase block leading-none">
          Knotify
        </span>
      </div>
    </footer>
  );
}
