import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentTab: 'home' | 'marketplace';
  setCurrentTab: (tab: 'home' | 'marketplace') => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Showcase Mode Notice Banner */}
      <div className="bg-[#1F3E2B] text-[#FFFEF2] text-[10px] sm:text-xs font-mono tracking-wider py-2 px-4 text-center border-b border-[#FFFEF2]/10 flex items-center justify-center gap-2 select-none">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
        <span className="font-medium">
          Showcase Exhibition Mode &bull; Neckwear Catalog Preview (Payments & Checkout Inactive)
        </span>
      </div>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFEF2]/95 backdrop-blur-md border-b border-brand-border/20 shadow-xs py-3.5'
            : 'bg-[#FFFEF2] border-b border-brand-border/10 py-4'
        }`}
        id="main-navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11 sm:h-12">

            {/* Left: Knotify brand logo with tie icon */}
            <button
              onClick={() => {
                setCurrentTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 cursor-pointer select-none group"
              id="nav-logo-trigger"
            >
              <img src="/logo.svg" alt="Knotify Logo" className="w-7 h-7 sm:w-8 sm:h-8 object-contain transition-transform group-hover:scale-105" />
              <span className="font-display font-black text-2xl sm:text-3xl text-brand-primary tracking-tight group-hover:text-brand-secondary transition-colors">
                Knotify
              </span>
              <span className="w-2 h-2 rounded-full bg-brand-secondary inline-block"></span>
            </button>

            {/* Center/Right: Home + View Store CTA */}
            <div className="flex items-center gap-6">
              {/* Desktop navigation */}
              <nav className="hidden md:flex items-center gap-6 select-none">
                <button
                  onClick={() => {
                    setCurrentTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-xs font-mono tracking-[0.18em] uppercase transition-all duration-200 py-1 cursor-pointer font-medium ${
                    currentTab === 'home'
                      ? 'text-brand-secondary font-bold border-b-2 border-brand-secondary'
                      : 'text-neutral-600 hover:text-brand-secondary'
                  }`}
                >
                  Home
                </button>

                <button
                  onClick={() => {
                    setCurrentTab('marketplace');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 bg-brand-secondary hover:bg-brand-accent text-[#FFFEF2] rounded-xs px-5 py-2.5 transition-all duration-300 cursor-pointer text-xs font-mono tracking-widest uppercase font-bold shadow-xs hover:scale-[1.02]"
                  id="btn-nav-primary-cta"
                >
                  <span>View Store</span>
                  <ArrowRight size={12} />
                </button>
              </nav>

              {/* Mobile Hamburger toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-neutral-700 hover:text-brand-secondary transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-b border-brand-border/20 bg-[#FFFEF2] px-4 pt-3 pb-6"
            >
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => {
                    setCurrentTab('home');
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-xs font-mono tracking-[0.2em] uppercase py-3 px-3 rounded-xs text-left font-bold ${
                    currentTab === 'home'
                      ? 'text-brand-secondary bg-brand-secondary/5 border-l-2 border-brand-secondary'
                      : 'text-neutral-700 hover:text-brand-secondary'
                  }`}
                >
                  Home
                </button>

                <button
                  onClick={() => {
                    setCurrentTab('marketplace');
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3 bg-brand-secondary text-[#FFFEF2] font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-xs"
                >
                  <span>View Store</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
