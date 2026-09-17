import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowRight, 
  ShoppingBag,
  Sparkles,
  ChevronRight,
  Heart,
} from 'lucide-react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import Lenis from '@studio-freight/lenis';
import { Product } from '../types';
import TiePlaceholder from './TiePlaceholder';
import FAQSection from './FAQSection';

gsap.registerPlugin(ScrollTrigger, Flip);

interface LandingPageProps {
  onBrowseMarketplace: () => void;
  onBrowseWithFilter: (category: string, search: string) => void;
  products: Product[];
  featuredProducts: Product[];
  onOpenProductDetail: (product: Product) => void;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  isInWishlist: (productId: string) => boolean;
  inventorySummary?: {
    totalQuantity: number;
    availableTies: number;
    paidUsers: number;
  };
}

export default function LandingPage({
  onBrowseMarketplace,
  onBrowseWithFilter,
  products,
  featuredProducts,
  onOpenProductDetail,
  onToggleWishlist,
  onAddToCart,
  isInWishlist,
}: LandingPageProps) {

  // GSAP Animation Refs
  const heroLeftRef = useRef<HTMLDivElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);
  const heroLogoRef = useRef<HTMLHeadingElement>(null);
  const heroTaglineRef = useRef<HTMLDivElement>(null);
  const mosaicGridRef = useRef<HTMLDivElement>(null);

  // Section 02 - Nobody tells you which tie to wear
  const problemSectionRef = useRef<HTMLDivElement>(null);
  const problemHeadlineRef = useRef<HTMLHeadingElement>(null);
  const problemLinesRef = useRef<HTMLDivElement>(null);

  // Section 03 - What happens if you don't sort your tie before resumption
  const riskSectionRef = useRef<HTMLDivElement>(null);
  const riskHeadlineRef = useRef<HTMLHeadingElement>(null);
  const riskLinesRef = useRef<HTMLDivElement>(null);

  // Section 04 - Solution category cards & Flip container
  const solutionSectionRef = useRef<HTMLDivElement>(null);
  const categoryGridRef = useRef<HTMLDivElement>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'All' | 'Classic' | 'Essential' | 'Statement'>('All');

  // Section 05 - How We Operate
  const operateSectionRef = useRef<HTMLDivElement>(null);
  const operateStepsRef = useRef<HTMLDivElement>(null);

  // Section 07 - CTA poster
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const ctaContentRef = useRef<HTMLDivElement>(null);

  // Model & Tie imagery mix for Hero Mosaic Grid
  const mosaicCards = [
    { type: 'model', src: '/models/model1.jpg', alt: 'Covenant Fresher Style', label: 'CHAPEL LOOK' },
    { type: 'product', item: products[0] || null, defaultName: 'Plain Black Tie', defaultColor: '#1B1B19' },
    { type: 'model', src: '/models/model2.jpg', alt: 'Student Neckwear Fashion', label: 'ELEGANCE' },
    { type: 'product', item: products[1] || null, defaultName: 'Wine Chapel Tie', defaultColor: '#1F3E2B' },
    { type: 'model', src: '/models/model3.jpg', alt: 'Sunday Service Ready', label: 'VERIFIED' },
    { type: 'product', item: products[2] || null, defaultName: 'Navy Stripe Tie', defaultColor: '#2E5C3E' },
  ];

  const classicTie = products.find(p => p.category?.toLowerCase().includes('classic') || p.name.toLowerCase().includes('plain black')) || products[0];
  const essentialTie = products.find(p => p.category?.toLowerCase().includes('essential') || p.name.toLowerCase().includes('navy') || p.name.toLowerCase().includes('wine')) || products[1] || products[0];
  const statementTie = products.find(p => p.category?.toLowerCase().includes('statement') || p.name.toLowerCase().includes('stripe') || p.name.toLowerCase().includes('pattern')) || products[2] || products[0];

  const categoryCards = [
    {
      id: 'classic',
      tag: '01 / THE CLASSIC',
      badge: 'CHAPEL COMPLIANT',
      badgeBg: 'bg-brand-secondary',
      title: 'Clean. Sharp. Always works.',
      desc: 'For the gentleman who wants to command respect without overthinking it. Plain black, deep navy, or rich wine.',
      vibe: 'Chapel & Formal Standard',
      category: 'Classic',
      filterType: 'Plain',
      product: classicTie,
      color: '#1B1B19',
      borderHighlight: false,
    },
    {
      id: 'essential',
      tag: '02 / THE ESSENTIAL',
      badge: 'POPULAR CHOICE',
      badgeBg: 'bg-brand-secondary',
      title: 'Your daily signature neckwear.',
      desc: 'Start here if you want effortless poise. Structured weave, pre-ironed drape, and verified knot stability.',
      vibe: 'Everyday Presentation',
      category: 'Essential',
      filterType: 'Essential',
      product: essentialTie,
      color: '#1F3E2B',
      borderHighlight: true,
    },
    {
      id: 'statement',
      tag: '03 / THE STATEMENT',
      badge: 'DISTINCTIVE',
      badgeBg: 'bg-brand-primary',
      title: "For when basic isn't your language.",
      desc: 'Subtle textures, micro-stripes, and jacquard weaves for when you take the stage, lectern, or board room.',
      vibe: 'Executive & Gala',
      category: 'Statement',
      filterType: 'Patterned',
      product: statementTie,
      color: '#2E5C3E',
      borderHighlight: false,
    },
  ];

  const filteredCards = categoryCards.filter(c => {
    if (activeCategoryFilter === 'All') return true;
    return c.category === activeCategoryFilter;
  });

  const handleCategoryFilterChange = (filter: 'All' | 'Classic' | 'Essential' | 'Statement') => {
    if (!categoryGridRef.current || filter === activeCategoryFilter) return;
    const state = Flip.getState(categoryGridRef.current.children);
    setActiveCategoryFilter(filter);
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.5,
        ease: 'power3.inOut',
        stagger: 0.06,
        absolute: true,
        onComplete: () => ScrollTrigger.refresh(),
      });
    });
  };

  useEffect(() => {
    // 1. Lenis Smooth Scrolling integrated with GSAP ScrollTrigger
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // 2. ULTRA-IMMERSIVE CINEMATIC HERO GSAP REVEAL SEQUENCE
      const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Ambient background glow in hero
      heroTl.fromTo(
        '#hero-ambient-glow',
        { opacity: 0, scale: 0.8 },
        { opacity: 0.6, scale: 1, duration: 1.6, ease: 'power2.out' },
        0
      );

      // Left panel subtle entrance
      if (heroLeftRef.current) {
        heroTl.fromTo(
          heroLeftRef.current,
          { opacity: 0, x: -24 },
          { opacity: 1, x: 0, duration: 0.8 },
          0.1
        );
      }

      // Pre-title status pill
      heroTl.fromTo(
        '#hero-pill-badge',
        { opacity: 0, y: -16, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.7)' },
        0.2
      );

      // Main Brand Title - Split character reveal
      const logoLetters = document.querySelectorAll('.hero-logo-char');
      if (logoLetters.length > 0) {
        heroTl.fromTo(
          logoLetters,
          { opacity: 0, y: 50, rotateX: -60, filter: 'blur(8px)' },
          { 
            opacity: 1, 
            y: 0, 
            rotateX: 0, 
            filter: 'blur(0px)', 
            duration: 1.1, 
            stagger: 0.045, 
            ease: 'expo.out' 
          },
          0.3
        );
      } else if (heroLogoRef.current) {
        heroTl.fromTo(
          heroLogoRef.current,
          { opacity: 0, y: 40, scale: 0.94, filter: 'blur(6px)' },
          { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.0, ease: 'power4.out' },
          0.3
        );
      }

      // Tagline italic hook & description text
      if (heroTaglineRef.current) {
        heroTl.fromTo(
          heroTaglineRef.current.children,
          { opacity: 0, y: 22, filter: 'blur(4px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.12, ease: 'power3.out' },
          0.65
        );
      }

      // Hero editorial meta bar (footer)
      heroTl.fromTo(
        '#hero-meta-bar',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        0.85
      );

      // Mosaic visual cards stagger with 3D scale and tilt
      if (mosaicGridRef.current) {
        heroTl.fromTo(
          mosaicGridRef.current.querySelectorAll('.mosaic-item'),
          { opacity: 0, scale: 0.88, y: 35, rotateY: 10, filter: 'blur(4px)' },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            rotateY: 0, 
            filter: 'blur(0px)', 
            duration: 1.0, 
            stagger: 0.08, 
            ease: 'power3.out' 
          },
          0.5
        );
      }

      // 3. SECTION 02: "Nobody tells you which tie to wear" - SplitText words reveal + Scrub
      if (problemHeadlineRef.current) {
        const headlineWords = problemHeadlineRef.current.querySelectorAll('.split-word');
        if (headlineWords.length > 0) {
          gsap.fromTo(
            headlineWords,
            { opacity: 0.15, y: 20 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.06,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: problemHeadlineRef.current,
                start: 'top 82%',
                end: 'top 50%',
                scrub: 0.6,
              },
            }
          );
        }
      }

      if (problemLinesRef.current) {
        gsap.fromTo(
          problemLinesRef.current.children,
          { opacity: 0.12, y: 26, filter: 'blur(3px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.18,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: problemLinesRef.current,
              start: 'top 78%',
              end: 'bottom 55%',
              scrub: 0.8,
            },
          }
        );
      }

      // 4. SECTION 03: "What happens if you don't sort your tie before resumption?" - SplitText words + Scrub
      if (riskHeadlineRef.current) {
        const riskWords = riskHeadlineRef.current.querySelectorAll('.split-word');
        if (riskWords.length > 0) {
          gsap.fromTo(
            riskWords,
            { opacity: 0.15, y: 20 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: riskHeadlineRef.current,
                start: 'top 82%',
                end: 'top 48%',
                scrub: 0.6,
              },
            }
          );
        }
      }

      if (riskLinesRef.current) {
        gsap.fromTo(
          riskLinesRef.current.children,
          { opacity: 0.1, y: 28, filter: 'blur(3px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.16,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: riskLinesRef.current,
              start: 'top 75%',
              end: 'bottom 50%',
              scrub: 0.8,
            },
          }
        );
      }

      // 5. SECTION 04: Solution cards reveal
      if (categoryGridRef.current) {
        gsap.fromTo(
          categoryGridRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: categoryGridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 6. SECTION 05: HOW WE OPERATE - Scroll-driven steps reveal with Scrub
      if (operateStepsRef.current) {
        const stepItems = operateStepsRef.current.querySelectorAll('.operate-step');
        stepItems.forEach((step) => {
          const num = step.querySelector('.step-num');
          const content = step.querySelector('.step-content');

          if (num) {
            gsap.fromTo(
              num,
              { opacity: 0.02, scale: 0.85, x: -20 },
              {
                opacity: 0.12,
                scale: 1,
                x: 0,
                scrollTrigger: {
                  trigger: step,
                  start: 'top 85%',
                  end: 'top 45%',
                  scrub: 0.7,
                },
              }
            );
          }

          if (content) {
            gsap.fromTo(
              content,
              { opacity: 0.2, y: 24 },
              {
                opacity: 1,
                y: 0,
                scrollTrigger: {
                  trigger: step,
                  start: 'top 82%',
                  end: 'top 48%',
                  scrub: 0.6,
                },
              }
            );
          }
        });
      }

      // 7. SECTION 07: CTA Poster reveal
      if (ctaContentRef.current) {
        gsap.fromTo(
          ctaContentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaSectionRef.current || ctaContentRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-white text-[#1B1B19] min-h-screen font-sans selection:bg-brand-secondary selection:text-[#FFFEF2]">
      
      {/* ==================================================== */}
      {/* HERO SECTION — PURE WHITE BACKGROUND & CALM COPY */}
      {/* ==================================================== */}
      <section className="p-2 sm:p-4 md:p-6 bg-white relative overflow-hidden" id="editorial-hero-section">
        <div className="max-w-[1600px] mx-auto overflow-hidden rounded-2xl border border-neutral-100 grid grid-cols-1 lg:grid-cols-12 min-h-[auto] lg:min-h-[82vh] bg-white relative z-10 shadow-xs">
          
          {/* LEFT 50% PANEL: Clean Pure White Canvas */}
          <div 
            ref={heroLeftRef}
            className="lg:col-span-6 p-6 xs:p-8 sm:p-12 md:p-16 flex flex-col justify-between text-left relative z-10 bg-white"
          >
            
            {/* Top editorial pill tag */}
            <div id="hero-pill-badge" className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 bg-neutral-100 border border-neutral-200 rounded-full mb-4 sm:mb-6">
              <img src="/logo.svg" alt="Knotify Logo" className="w-4 h-4 object-contain" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-700 font-bold">
                FINE NECKWEAR SHOWCASE
              </span>
            </div>

            {/* Center Block: Main Title + Calm Easygoing Tagline */}
            <div className="my-auto py-4 sm:py-8 space-y-5">
              
              {/* Main Headline Title: Knotify: A Place for your Ties */}
              <h1 
                ref={heroLogoRef}
                className="font-display font-black text-4xl xs:text-5xl sm:text-6xl lg:text-7xl text-brand-primary tracking-tight leading-[1.05] select-none"
              >
                Knotify: A Place for your Ties
              </h1>

              {/* Calm, Friendly Tagline */}
              <div ref={heroTaglineRef} className="space-y-4 max-w-lg">
                <p className="font-display italic text-lg sm:text-xl md:text-2xl text-brand-secondary leading-snug">
                  “Simple, well-made ties for every occasion.”
                </p>
                <p className="text-xs sm:text-sm font-sans text-neutral-600 leading-relaxed font-normal">
                  Finding the right tie shouldn't feel complicated. Explore our curated selection of classic, essential, and signature neckwear — made to fit comfortably and look good every time.
                </p>

                {/* Direct Action Button */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onBrowseMarketplace}
                    className="inline-flex items-center justify-center gap-2.5 bg-brand-primary hover:bg-brand-secondary text-[#FFFEF2] font-mono text-xs font-bold uppercase tracking-widest px-7 py-4 rounded-full shadow-sm transition-all cursor-pointer"
                  >
                    <span>EXPLORE THE COLLECTION</span>
                    <ArrowRight size={13} />
                  </motion.button>
                </div>
              </div>

            </div>

            {/* Bottom Meta Bar */}
            <div id="hero-meta-bar" className="pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs font-mono tracking-widest uppercase text-neutral-500">
              
              <button 
                onClick={onBrowseMarketplace} 
                className="inline-flex items-center gap-2 font-bold text-brand-secondary hover:text-brand-primary transition-colors cursor-pointer group text-xs"
              >
                <span>VIEW STORE CATALOG</span>
                <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="hidden sm:flex items-center gap-2 text-[10px] text-neutral-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>CURATED COLLECTION SHOWCASE</span>
              </div>

              <div className="font-bold text-neutral-800 text-xs">
                KNOTIFY 2026
              </div>

            </div>

          </div>

          {/* RIGHT 50% PANEL: 2-Column Mosaic Photo Grid (Mixing Models + Ties) */}
          <div 
            ref={heroRightRef}
            className="lg:col-span-6 bg-[#1B1B19] p-1 xs:p-1.5 sm:p-2 overflow-hidden relative min-h-[320px] xs:min-h-[400px] sm:min-h-[500px]"
          >
            {/* 2-Column Mosaic Grid Container */}
            <div 
              ref={mosaicGridRef}
              className="grid grid-cols-2 gap-1 xs:gap-1.5 h-full w-full"
            >
              {/* Column 1 Cards */}
              <div className="space-y-1 xs:space-y-1.5 flex flex-col justify-between h-full">
                
                {/* Card 1: Model 1 */}
                <div className="mosaic-item aspect-[4/5] bg-neutral-900 overflow-hidden relative rounded-xs sm:rounded-none">
                  <img src="/models/model1.jpg" alt="Model Styling Chapel Tie" className="w-full h-full object-cover grayscale-[15%] hover:scale-105 transition-transform duration-700" />
                </div>

                {/* Card 2: Tie 1 */}
                <div
                  onClick={() => mosaicCards[1].item && onOpenProductDetail(mosaicCards[1].item)}
                  className="mosaic-item aspect-[4/3] bg-neutral-900 overflow-hidden relative cursor-pointer rounded-xs sm:rounded-none"
                >
                  {mosaicCards[1].item && mosaicCards[1].item.image ? (
                    <img src={mosaicCards[1].item.image} alt={mosaicCards[1].item.name} className="w-full h-full object-cover grayscale-[10%] hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <TiePlaceholder color="#1B1B19" category="Classic" name="Plain Black" className="w-full h-full" />
                  )}
                </div>

                {/* Card 3: Model 2 */}
                <div className="mosaic-item aspect-[4/3] bg-neutral-900 overflow-hidden relative rounded-xs sm:rounded-none">
                  <img src="/models/model2.jpg" alt="Fresher Chapel Look" className="w-full h-full object-cover grayscale-[15%] hover:scale-105 transition-transform duration-700" />
                </div>

              </div>

              {/* Column 2 Cards */}
              <div className="space-y-1 xs:space-y-1.5 flex flex-col justify-between h-full">
                
                {/* Card 4: Tie 2 */}
                <div
                  onClick={() => mosaicCards[3].item && onOpenProductDetail(mosaicCards[3].item)}
                  className="mosaic-item aspect-[4/3] bg-neutral-900 overflow-hidden relative cursor-pointer rounded-xs sm:rounded-none"
                >
                  {mosaicCards[3].item && mosaicCards[3].item.image ? (
                    <img src={mosaicCards[3].item.image} alt={mosaicCards[3].item.name} className="w-full h-full object-cover grayscale-[10%] hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <TiePlaceholder color="#1F3E2B" category="Essential" name="Wine Tie" className="w-full h-full" />
                  )}
                </div>

                {/* Card 5: Model 3 */}
                <div className="mosaic-item aspect-[4/5] bg-neutral-900 overflow-hidden relative rounded-xs sm:rounded-none">
                  <img src="/models/model3.jpg" alt="Editorial Covenant Tie" className="w-full h-full object-cover grayscale-[15%] hover:scale-105 transition-transform duration-700" />
                </div>

                {/* Card 6: Model 4 / Tie 3 */}
                <div className="mosaic-item aspect-[4/3] bg-neutral-900 overflow-hidden relative rounded-xs sm:rounded-none">
                  <img src="/models/model4.jpg" alt="Academic Neckwear" className="w-full h-full object-cover grayscale-[15%] hover:scale-105 transition-transform duration-700" />
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION 02 — PART 1 STORY: NOBODY TELLS YOU WHICH TIE TO WEAR */}
      {/* SplitText word reveal + Scrub text progression */}
      {/* ==================================================== */}
      <section 
        ref={problemSectionRef}
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FFFEF2] border-b border-brand-border/20 relative"
        id="problem-insight-section"
      >
        <div className="max-w-4xl mx-auto text-center space-y-10">

          {/* Headline with SplitText word tokens */}
          <h2 
            ref={problemHeadlineRef}
            className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-brand-primary uppercase tracking-tight leading-tight"
          >
            {'Nobody tells you which tie to wear.'.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-[0.25em] split-word">
                {word}
              </span>
            ))}
          </h2>

          <div className="h-0.5 w-16 bg-brand-secondary/30 mx-auto" />

          {/* Staggered GSAP Scroll & Scrub Narrative */}
          <div 
            ref={problemLinesRef}
            className="space-y-4 text-base sm:text-xl text-brand-primary/80 font-sans max-w-2xl mx-auto leading-relaxed font-light text-left sm:text-center"
          >
            <p>You get admitted.</p>
            <p>You prepare your shirts.</p>
            <p>You get your trousers ready.</p>
            <p>You start counting down to resumption.</p>
            
            <p className="pt-4 font-serif italic text-2xl sm:text-3xl text-brand-secondary font-normal">
              Then you realise:
            </p>
            
            <p className="font-bold text-brand-primary text-lg sm:text-2xl pt-1">
              You still have absolutely no idea which tie you’re supposed to wear.
            </p>

            <p className="text-sm sm:text-base text-brand-primary/70 pt-4 font-sans leading-relaxed">
              Knotify exists for that exact moment. Built by Covenant University students who have been through resumption week, so you can pick your tie with complete confidence.
            </p>
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION 03 — PART 2 STORY: WHAT HAPPENS IF YOU DON'T SORT YOUR TIE BEFORE RESUMPTION? */}
      {/* Exact requested copy with GSAP SplitText words + scroll-driven progression */}
      {/* ==================================================== */}
      <section
        ref={riskSectionRef}
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FDFCF7] border-b border-brand-border/20 relative"
        id="the-risk-section"
      >
        <div className="max-w-4xl mx-auto text-center space-y-10">

          {/* Headline with SplitText word tokens */}
          <h2 
            ref={riskHeadlineRef}
            className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-brand-primary uppercase tracking-tight leading-tight"
          >
            {"What happens if you don't sort your tie before resumption?".split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-[0.25em] split-word">
                {word}
              </span>
            ))}
          </h2>

          <div className="h-0.5 w-16 bg-rose-800/30 mx-auto" />

          {/* Requested story copy with GSAP ScrollTrigger scrub progression */}
          <div 
            ref={riskLinesRef}
            className="space-y-4 text-base sm:text-xl text-brand-primary/80 font-sans max-w-2xl mx-auto leading-relaxed font-light text-left sm:text-center"
          >
            <p className="font-bold text-brand-primary text-xl sm:text-2xl">
              8 AM. Your first class.
            </p>
            
            <p>You put on the tie you bought back home.</p>

            <p className="pt-3 font-serif italic text-2xl sm:text-3xl text-rose-800 font-normal">
              Then you realise:
            </p>

            <p className="font-bold text-rose-900 text-lg sm:text-2xl pt-1">
              It’s wrong.
            </p>

            <p>Your roommate doesn’t have an extra.</p>

            <p className="text-sm sm:text-base text-brand-primary/75 leading-relaxed">
              Now you’re rushing around campus, trying to borrow one or find someone selling the right tie.
            </p>

            <p className="pt-2 font-serif italic text-lg sm:text-xl text-brand-primary">
              And when you finally do?
            </p>

            <p className="font-bold text-brand-primary text-lg sm:text-2xl text-rose-900">
              You pay more than you should have.
            </p>

            <div className="h-px w-12 bg-brand-border/30 mx-auto my-4" />

            <p className="text-sm sm:text-base text-brand-primary/80 font-sans leading-relaxed pt-2">
              Every year, freshers arrive without sorting their ties—and end up scrambling, borrowing, or overpaying.
            </p>

            <p className="text-sm sm:text-base text-brand-secondary font-medium font-sans leading-relaxed">
              Knotify was built so that doesn't have to be you.
            </p>

            <div className="pt-4 space-y-2 text-sm sm:text-base font-semibold text-brand-primary">
              <p>Reserve your tie before you pack your bags.</p>
              <p className="text-brand-secondary">Arrive at Covenant already sorted.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION 04 — CURATED SOLUTION CATEGORIES */}
      {/* Interactive GSAP Flip filter transitions */}
      {/* ==================================================== */}
      <section 
        ref={solutionSectionRef}
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-brand-card/40 border-b border-brand-border/20"
        id="curated-solution-section"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand-secondary font-bold block">
              THE TIE. WITHOUT THE GUESSING.
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-brand-primary uppercase tracking-tight">
              Pick your energy.
            </h2>

            {/* GSAP Flip category filter tabs */}
            <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
              {(['All', 'Classic', 'Essential', 'Statement'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleCategoryFilterChange(filter)}
                  className={`px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                    activeCategoryFilter === filter
                      ? 'bg-brand-primary text-[#FFFEF2] shadow-sm'
                      : 'bg-[#FFFEF2] text-brand-primary/70 hover:text-brand-primary hover:bg-neutral-100 border border-brand-border/20'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Cards container animated with GSAP Flip */}
          <div 
            ref={categoryGridRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
          >
            {filteredCards.map((card) => (
              <motion.div 
                key={card.id}
                layout
                whileHover={{ y: -6, scale: 1.01 }}
                className={`bg-[#FFFEF2] rounded-2xl border p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group ${
                  card.borderHighlight
                    ? 'border-brand-secondary/40 ring-1 ring-brand-secondary/20 relative'
                    : 'border-brand-border/30'
                }`}
              >
                {card.borderHighlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-secondary text-[#FFFEF2] text-[9px] font-mono uppercase tracking-widest px-3 py-0.5 font-bold rounded-full">
                    {card.badge}
                  </div>
                )}
                <div className="space-y-4">
                  <div className="aspect-[4/5] bg-neutral-100 rounded-xl overflow-hidden relative">
                    {card.product && card.product.image ? (
                      <img 
                        src={card.product.image} 
                        alt={card.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <TiePlaceholder color={card.color} category={card.category} name={card.title} className="w-full h-full" />
                    )}
                    {!card.borderHighlight && (
                      <span className={`absolute top-3 left-3 ${card.badgeBg} text-[#FFFEF2] text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 font-bold rounded-full`}>
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-brand-secondary font-bold uppercase tracking-widest block">
                      {card.tag}
                    </span>
                    <h3 className="font-display font-bold text-xl uppercase text-brand-primary mt-1">
                      {card.title}
                    </h3>
                    <p className="text-xs text-brand-primary/70 font-sans mt-2 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-border/20 mt-6 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-secondary">{card.vibe}</span>
                  <button 
                    onClick={() => onBrowseWithFilter(card.filterType, '')} 
                    className="text-xs font-mono uppercase font-bold text-brand-secondary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Explore {card.category}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION 05 — HOW WE OPERATE (SUMMARIZED & IMMERSIVE) */}
      {/* ==================================================== */}
      <section 
        ref={operateSectionRef}
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FFFEF2] border-b border-brand-border/20 relative overflow-hidden" 
        id="how-we-operate-section"
      >
        <div className="max-w-6xl mx-auto space-y-16">

          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-brand-secondary/10 text-brand-secondary px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase font-bold">
              <Sparkles size={11} />
              THE KNOTIFY EXPERIENCE
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-brand-primary uppercase tracking-tight leading-tight">
              Three Steps To Absolute Confidence.
            </h2>
            <p className="text-xs sm:text-sm text-brand-primary/75 font-sans leading-relaxed max-w-xl mx-auto font-light">
              We took the stress out of formal neckwear. Here is how we curate, present, and elevate your presence.
            </p>
          </div>

          {/* Immersive 3-Step Interactive Grid */}
          <div ref={operateStepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">

            {/* STEP 01 */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="bg-brand-card border border-brand-border/40 p-8 rounded-xl flex flex-col justify-between relative group hover:border-brand-secondary/40 shadow-xs transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-5xl text-brand-secondary/20 group-hover:text-brand-secondary/40 transition-colors">01</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest bg-brand-bg px-3 py-1 rounded border border-brand-border font-bold text-brand-primary">
                    CURATION
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl uppercase text-brand-primary leading-tight">
                  Hand-Picked Compliant Weaves
                </h3>
                <p className="text-xs text-brand-primary/75 font-sans leading-relaxed">
                  Every tie in our exhibition is pre-screened for weave density, knot roll dimple stability, and chapel/corporate approval.
                </p>
              </div>

              <div className="pt-6 border-t border-brand-border/20 mt-6 flex items-center justify-between text-[10px] font-mono text-brand-secondary uppercase font-semibold">
                <span>01 &bull; Discovery</span>
                <span>Verified Quality</span>
              </div>
            </motion.div>

            {/* STEP 02 */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="bg-brand-card border border-brand-border/40 p-8 rounded-xl flex flex-col justify-between relative group hover:border-brand-secondary/40 shadow-xs transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-5xl text-brand-secondary/20 group-hover:text-brand-secondary/40 transition-colors">02</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest bg-brand-bg px-3 py-1 rounded border border-brand-border font-bold text-brand-primary">
                    PRESENTATION
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl uppercase text-brand-primary leading-tight">
                  Pre-Ironed & Packaged
                </h3>
                <p className="text-xs text-brand-primary/75 font-sans leading-relaxed">
                  Zero wrinkles. Zero cheap synthetics. Our double-brushed inner wool lining ensures a structured Windsor knot that holds form all day.
                </p>
              </div>

              <div className="pt-6 border-t border-brand-border/20 mt-6 flex items-center justify-between text-[10px] font-mono text-brand-secondary uppercase font-semibold">
                <span>02 &bull; Craft</span>
                <span>Double Lining</span>
              </div>
            </motion.div>

            {/* STEP 03 */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="bg-brand-card border border-brand-border/40 p-8 rounded-xl flex flex-col justify-between relative group hover:border-brand-secondary/40 shadow-xs transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-5xl text-brand-secondary/20 group-hover:text-brand-secondary/40 transition-colors">03</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest bg-brand-bg px-3 py-1 rounded border border-brand-border font-bold text-brand-primary">
                    PRESENCE
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl uppercase text-brand-primary leading-tight">
                  Unshakeable Confidence
                </h3>
                <p className="text-xs text-brand-primary/75 font-sans leading-relaxed">
                  Step into chapel, boardrooms, or presentations knowing your neckwear speaks of quiet authority before you say a single word.
                </p>
              </div>

              <div className="pt-6 border-t border-brand-border/20 mt-6 flex items-center justify-between text-[10px] font-mono text-brand-secondary uppercase font-semibold">
                <span>03 &bull; Authority</span>
                <span>Command Respect</span>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION 06 — PROMINENT FAQs */}
      {/* ==================================================== */}
      <FAQSection />

      {/* ==================================================== */}
      {/* SECTION 07 — FINAL ULTRA-AESTHETIC CAMPAIGN POSTER CTA */}
      {/* ==================================================== */}
      <section 
        ref={ctaSectionRef}
        className="py-28 sm:py-36 bg-[#0B2316] text-[#FFFEF2] px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden" 
        id="final-cta-section"
      >
        
        {/* Subtle Radial Glow & Background Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-60" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div ref={ctaContentRef} className="max-w-4xl mx-auto space-y-8 relative z-10">
          
          <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight leading-[1.05] text-[#FFFEF2]">
            NEW SCHOOL.<br />
            NEW PEOPLE.<br />
            NO NEED TO LOOK LOST.
          </h2>

          <p className="text-sm sm:text-base text-[#FFFEF2]/80 font-sans max-w-xl mx-auto font-light leading-relaxed">
            There's enough to figure out before resumption.
            <br />
            Your tie shouldn't be one of them.
          </p>

          <div className="pt-6 flex items-center justify-center gap-4">
            {/* WhatsApp icon button — left */}
            <a
              href="https://chat.whatsapp.com/Kiwu2BWP1NuE0z0wC61to0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all cursor-pointer shrink-0"
              aria-label="Join WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>

            {/* Find My Tie — center */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onBrowseMarketplace}
              className="inline-flex items-center justify-center gap-3 bg-[#FFFEF2] hover:bg-[#F4F2E6] text-[#0B2316] font-mono text-xs font-bold uppercase tracking-widest px-10 py-4 rounded-full shadow-2xl transition-all cursor-pointer"
            >
              <span>FIND MY TIE →</span>
            </motion.button>

            {/* Telegram icon button — right */}
            <a
              href="https://t.me/+go-lAiSrbJ5hNGVk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all cursor-pointer shrink-0"
              aria-label="Join Telegram"
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
