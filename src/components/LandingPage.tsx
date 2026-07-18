import React, { useState } from 'react';
import { 
  Heart, 
  ArrowRight,
  Shield,
  Sparkles,
  Users,
  Award,
  ChevronRight,
  Bookmark,
  MessageCircle,
  Send,
  Check,
  AlertTriangle,
  BookOpen,
  HelpCircle,
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Search,
  MapPin,
  FileCheck,
  CheckCircle,
  Loader
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Product, Reservation } from '../types';
import TiePlaceholder from './TiePlaceholder';

interface LandingPageProps {
  onBrowseMarketplace: () => void;
  onBrowseWithFilter: (category: string, search: string) => void;
  onOpenBecomeSeller: () => void;
  products: Product[];
  featuredProducts: Product[];
  onOpenProductDetail: (product: Product) => void;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  isInWishlist: (productId: string) => boolean;
}

export default function LandingPage({
  onBrowseMarketplace,
  onBrowseWithFilter,
  onOpenBecomeSeller,
  products,
  featuredProducts,
  onOpenProductDetail,
  onToggleWishlist,
  onAddToCart,
  isInWishlist,
}: LandingPageProps) {

  // Custom container transition variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 80 }
    }
  };

  // Parallax scroll effects
  const { scrollY } = useScroll();
  
  // Elements move at different rates to create high-end modern depth
  const yKnotifyBg = useTransform(scrollY, [0, 800], [0, 100]);
  const yHeroLeft = useTransform(scrollY, [0, 800], [0, -40]);
  const yHeroRightMain = useTransform(scrollY, [0, 800], [0, -20]);
  const yHeroRightSub = useTransform(scrollY, [0, 800], [0, 30]);
  
  // Floating parallax ambient backgrounds
  const yGlow1 = useTransform(scrollY, [0, 1200], [0, 120]);
  const yGlow2 = useTransform(scrollY, [0, 1800], [0, -150]);
  
  // Manifesto Project Card Parallax Effects
  const yManifesto1 = useTransform(scrollY, [600, 1800], [80, -80]);
  const yManifesto2 = useTransform(scrollY, [1000, 2200], [80, -80]);
  const yManifesto3 = useTransform(scrollY, [1400, 2600], [80, -80]);
  const yManifesto4 = useTransform(scrollY, [1800, 3000], [80, -80]);

  return (
    <div className="w-full pb-16 bg-brand-bg font-sans overflow-x-hidden" id="landing-page-root">
      
      {/* 1. HERO SECTION (Woodcraft Inspired - Elegant Collage with Placeholders for Pictures) */}
      <section className="relative overflow-hidden pt-6 pb-20 md:pb-28 border-b border-brand-border/30 bg-black/40" id="hero-section">
        
        {/* Parallax Background Model Image */}
        <motion.div 
          style={{ y: yHeroRightMain }} 
          className="absolute inset-0 z-0 opacity-75"
        >
          <img src="/models/model1.jpg" alt="Background Model" className="w-full h-full object-cover" />
          {/* Blurred layer overlay over the model image */}
          <div className="absolute inset-0 backdrop-blur-[5px] bg-[#040906]/40" />
          {/* Blend gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#040906]/20 via-[#040906]/60 to-brand-bg" />
        </motion.div>

        {/* Floating parallax ambient glows */}
        <motion.div 
          style={{ y: yGlow1 }} 
          className="absolute top-1/4 left-10 w-72 h-72 bg-brand-secondary/[0.03] rounded-full filter blur-[100px] pointer-events-none z-0"
        />
        <motion.div 
          style={{ y: yGlow2 }} 
          className="absolute top-2/3 right-10 w-[400px] h-[400px] bg-brand-accent/[0.02] rounded-full filter blur-[120px] pointer-events-none z-0"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Giant backdrop header overlay with parallax scrolling */}
          <motion.div style={{ y: yKnotifyBg }} className="w-full text-center select-none mt-2 relative z-0">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="font-display font-extrabold text-[15vw] tracking-tighter leading-none text-[#F5F2EB] uppercase opacity-5 pointer-events-none"
            >
              Knotify
            </motion.h1>
          </motion.div>

          {/* Staggered Asymmetric Media Collage (Woodcraft Style) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-[-6vw] relative z-10" id="hero-collage-grid">
            
            {/* Left Column: Mission Description & Action button */}
            <motion.div style={{ y: yHeroLeft }} className="md:col-span-4 text-left space-y-6 md:pr-4">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F2EB] text-[#0A0A0A] rounded-full text-[9px] font-mono tracking-widest uppercase font-bold">
                  <Sparkles size={10} />
                  <span>Dapper Fresher Style</span>
                </div>
                
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-primary tracking-tight uppercase leading-[1.1]">
                  Ditch the newbie look from day one
                </h2>
                
                <p className="text-xs sm:text-[13px] font-sans text-brand-secondary leading-relaxed">
                  Incoming fresher? Don't stand out for the wrong reasons with awkward, poorly knotted neckwear. Step onto campus with the dapper confidence of a seasoned senior by picking up premium silk ties passed down from elite peers.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                <button
                  onClick={onBrowseMarketplace}
                  className="inline-flex items-center gap-2 bg-[#F5F2EB] hover:bg-white text-[#0A0A0A] rounded-full px-6 py-3 transition-all duration-300 cursor-pointer text-xs font-mono font-bold tracking-wider uppercase group"
                >
                  explore collection
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={onOpenBecomeSeller}
                  className="inline-flex items-center gap-2 border border-brand-primary/30 hover:border-brand-primary text-brand-primary rounded-full px-5 py-3 transition-all duration-300 cursor-pointer text-xs font-sans tracking-wide"
                >
                  Sell Your Tie
                </button>
              </motion.div>

              {/* Micro visual detail: live count / scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="pt-6 border-t border-brand-border/30 flex items-center gap-6 text-[10px] font-mono text-brand-secondary"
                id="hero-micro-indicators"
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="uppercase font-medium tracking-wider text-neutral-300">34 Active Sellers</span>
                </div>
                <span className="opacity-40">•</span>
                <div className="flex items-center gap-1.5 uppercase tracking-wider text-neutral-300">
                  <Clock size={11} className="text-brand-secondary" />
                  <span>Lobby delivery in mins</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Center & Right Column: Beautifully arranged Bento Collage with 5 picture placeholders */}
            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-5 relative mt-8 md:mt-0" id="media-collage-wrapper">
              
              {/* Image 1: Main Model (Prominent Left/Center piece of Bento) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ y: yHeroRightMain }}
                transition={{ duration: 0.8 }}
                className="md:col-span-6 aspect-[4/5] bg-[#121212] rounded-[2.2rem] overflow-hidden shadow-md border border-brand-border relative group cursor-pointer"
                onClick={onBrowseMarketplace}
              >
                <div className="w-full h-full overflow-hidden relative bg-neutral-900">
                  <img
                    src="/models/model2.jpg"
                    alt="Main Sartorial Necktie Model"
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <span className="text-[10px] font-mono tracking-widest text-[#F5F2EB] uppercase font-bold">VETTED HANDOFF ↗</span>
                  </div>
                </div>
              </motion.div>

              {/* Supporting 2x2 Grid of Sartorial details with opposing parallax scrolling */}
              <motion.div style={{ y: yHeroRightSub }} className="md:col-span-6 grid grid-cols-2 gap-4">
                
                {/* Image 2: New Model Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="aspect-square bg-[#121212] rounded-3xl overflow-hidden border border-brand-border relative group cursor-pointer"
                  onClick={() => onBrowseWithFilter('Premium', '')}
                >
                  <div className="w-full h-full overflow-hidden relative">
                    <img
                      src="/models/model.jpg"
                      alt="Dapper Premium Silk Tie"
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                  </div>
                </motion.div>

                {/* Image 3: Model Image 3 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="aspect-square bg-[#121212] rounded-3xl overflow-hidden border border-brand-border relative group cursor-pointer"
                  onClick={() => onBrowseWithFilter('Premium', '')}
                >
                  <div className="w-full h-full overflow-hidden relative">
                    <img
                      src="/models/model3.jpg"
                      alt="Dapper Premium Silk Tie"
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                  </div>
                </motion.div>

                {/* Image 4: Model Image 4 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="aspect-square bg-[#121212] rounded-3xl overflow-hidden border border-brand-border relative group cursor-pointer"
                  onClick={() => onBrowseWithFilter('Premium', '')}
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden relative">
                    <img
                      src="/models/model4.jpg"
                      alt="Dapper Premium Silk Tie"
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                  </div>
                </motion.div>

                {/* Image 5: Model Image 5 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="aspect-square bg-[#121212] rounded-3xl overflow-hidden border border-brand-border relative group cursor-pointer"
                  onClick={() => onBrowseWithFilter('Premium', '')}
                >
                  <div className="w-full h-full overflow-hidden relative">
                    <img
                      src="/models/model6.jpg"
                      alt="Dapper Premium Silk Tie"
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                  </div>
                </motion.div>

              </motion.div>

            </div>

          </div>

        </div>
      </section>

      {/* 2. CONTINUOUS SCROLLING MARQUEE (Woodcraft black bar stripe) */}
      <section className="bg-black text-[#F5F2EB] py-3 overflow-hidden border-y border-neutral-900 select-none animate-fade-in" id="marquee-banner">
        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 text-[10px] font-mono tracking-[0.25em] uppercase font-semibold">
            <span>SARTORIAL ACCENT</span>
            <span>✦</span>
            <span>DAPPER SENIORS STYLE</span>
            <span>✦</span>
            <span>INCOMING FRESHERS SPECIAL</span>
            <span>✦</span>
            <span>BLEND IN INSTANTLY</span>
            <span>✦</span>
            <span>ANTI-NEWBIE AESTHETIC</span>
            <span>✦</span>
            <span>VERIFIED COVENANT VENDORS</span>
            <span>✦</span>
            
            {/* Duplicated for smooth loop */}
            <span>SARTORIAL ACCENT</span>
            <span>✦</span>
            <span>DAPPER SENIORS STYLE</span>
            <span>✦</span>
            <span>INCOMING FRESHERS SPECIAL</span>
            <span>✦</span>
            <span>BLEND IN INSTANTLY</span>
            <span>✦</span>
            <span>ANTI-NEWBIE AESTHETIC</span>
            <span>✦</span>
            <span>VERIFIED COVENANT VENDORS</span>
            <span>✦</span>
          </div>
        </div>
      </section>

      {/* 3. MANIFESTO: REDESIGNED WITH STUNNING EDITORIAL TYPOGRAPHY & LAYOUT */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-28 px-4 sm:px-8 border-b border-brand-border/30 relative overflow-hidden" 
        id="manifesto-section"
      >
        <motion.div style={{ y: yGlow2 }} className="absolute top-0 right-0 w-80 h-80 bg-brand-secondary/5 rounded-full filter blur-[100px] pointer-events-none"></motion.div>
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-20">
            {/* Left Column: Premium Editorial typography */}
            <div className="lg:col-span-6 text-left space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-brand-secondary block">The Manifesto & Charter</span>
              <h3 className="font-display font-black text-4xl sm:text-6xl text-brand-primary tracking-tight leading-[1.05] uppercase">
                Bridging Academic <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-white">Elegance & Access</span>
              </h3>
              <div className="h-0.5 w-24 bg-gradient-to-r from-brand-secondary to-transparent"></div>
            </div>

            {/* Right Column: Mission statement */}
            <div className="lg:col-span-6 text-left lg:pt-10">
              <p className="text-xl sm:text-2xl font-light text-brand-secondary leading-relaxed italic border-l-4 border-brand-secondary pl-6">
                "Our legacy isn't just about passing tests — it's about owning your presence from your very first walk. We build a sustainable culture where elite styling passes from seniors to freshmen."
              </p>
            </div>
          </div>

          {/* Redesigned Pillars: Massive Editorial Project Cards with Parallax Model Slots */}
          <div className="space-y-24 lg:space-y-32" id="manifesto-pillars">
            
            {/* Pillar 1: Veteran Peer Look */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center bg-brand-card/20 border border-brand-border/40 rounded-[3rem] p-6 sm:p-12"
            >
              <div className="lg:col-span-7 aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-neutral-900 border border-brand-border relative group">
                <motion.div style={{ y: yManifesto1 }} className="w-full h-[130%] -mt-[15%] relative">
                  <img 
                    src="/models/model.jpg" 
                    alt="Veteran Peer Look Campaign" 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
              </div>
              <div className="lg:col-span-5 space-y-6 text-left relative z-10">
                <div className="w-12 h-12 rounded-full bg-brand-border/40 text-brand-secondary flex items-center justify-center mb-4">
                  <Shield size={20} />
                </div>
                <h4 className="font-display font-black text-3xl sm:text-4xl text-brand-primary uppercase tracking-tight">Veteran Peer Look</h4>
                <p className="text-base text-brand-secondary leading-relaxed">
                  Look like a veteran from day one. Every necktie is vetted for elegant proportions, mature patterns, and tailored fits so you blend in instantly with stylish seniors. Our standards ensure you never look out of place.
                </p>
                <div className="pt-4 flex items-center gap-4 text-xs font-mono text-brand-primary/60 uppercase tracking-widest">
                  <span className="w-10 h-0.5 bg-brand-primary/30"></span> 01 / Vetted Elegance
                </div>
              </div>
            </motion.div>

            {/* Pillar 2: Peer Heritage */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center bg-brand-card/20 border border-brand-border/40 rounded-[3rem] p-6 sm:p-12"
            >
              <div className="lg:col-span-5 lg:order-1 order-2 space-y-6 text-left relative z-10">
                <div className="w-12 h-12 rounded-full bg-brand-border/40 text-brand-secondary flex items-center justify-center mb-4">
                  <Users size={20} />
                </div>
                <h4 className="font-display font-black text-3xl sm:text-4xl text-brand-primary uppercase tracking-tight">Peer Heritage</h4>
                <p className="text-base text-brand-secondary leading-relaxed">
                  Style meets community legacy. Graduating seniors pass down their premium silk ties and bows directly to incoming freshers, fostering a lasting cycle of confidence and academic brotherhood that defines our campus culture.
                </p>
                <div className="pt-4 flex items-center gap-4 text-xs font-mono text-brand-primary/60 uppercase tracking-widest">
                  <span className="w-10 h-0.5 bg-brand-primary/30"></span> 02 / Campus Legacy
                </div>
              </div>
              <div className="lg:col-span-7 lg:order-2 order-1 aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-neutral-900 border border-brand-border relative group">
                <motion.div style={{ y: yManifesto2 }} className="w-full h-[130%] -mt-[15%] relative">
                  <img 
                    src="/models/model8.jpg" 
                    alt="Peer Heritage Campaign" 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Pillar 3: Sartorial Poise */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center bg-brand-card/20 border border-brand-border/40 rounded-[3rem] p-6 sm:p-12"
            >
              <div className="lg:col-span-7 aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-neutral-900 border border-brand-border relative group">
                <motion.div style={{ y: yManifesto3 }} className="w-full h-[130%] -mt-[15%] relative">
                  <img 
                    src="/models/model3.jpg" 
                    alt="Sartorial Poise Campaign" 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
              </div>
              <div className="lg:col-span-5 space-y-6 text-left relative z-10">
                <div className="w-12 h-12 rounded-full bg-brand-border/40 text-brand-secondary flex items-center justify-center mb-4">
                  <Award size={20} />
                </div>
                <h4 className="font-display font-black text-3xl sm:text-4xl text-brand-primary uppercase tracking-tight">Sartorial Poise</h4>
                <p className="text-base text-brand-secondary leading-relaxed">
                  Affordable university elegance. Skip expensive off-campus stores and long co-op queues—access elite jacquard weaves and premium silk ties at student-friendly rates. True poise doesn't have to break the bank.
                </p>
                <div className="pt-4 flex items-center gap-4 text-xs font-mono text-brand-primary/60 uppercase tracking-widest">
                  <span className="w-10 h-0.5 bg-brand-primary/30"></span> 03 / Elite Quality
                </div>
              </div>
            </motion.div>

            {/* Pillar 4: Secure Handovers */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center bg-brand-card/20 border border-brand-border/40 rounded-[3rem] p-6 sm:p-12"
            >
              <div className="lg:col-span-5 lg:order-1 order-2 space-y-6 text-left relative z-10">
                <div className="w-12 h-12 rounded-full bg-brand-border/40 text-brand-secondary flex items-center justify-center mb-4">
                  <Bookmark size={20} />
                </div>
                <h4 className="font-display font-black text-3xl sm:text-4xl text-brand-primary uppercase tracking-tight">Secure Handovers</h4>
                <p className="text-base text-brand-secondary leading-relaxed">
                  Convenient hall handovers. Inspect fabric texture, pattern, and quality in person directly at your residence hall before completing any payment. Simple, transparent, and completely risk-free for both parties.
                </p>
                <div className="pt-4 flex items-center gap-4 text-xs font-mono text-brand-primary/60 uppercase tracking-widest">
                  <span className="w-10 h-0.5 bg-brand-primary/30"></span> 04 / Safe Exchange
                </div>
              </div>
              <div className="lg:col-span-7 lg:order-2 order-1 aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-neutral-900 border border-brand-border relative group">
                <motion.div style={{ y: yManifesto4 }} className="w-full h-[130%] -mt-[15%] relative">
                  <img 
                    src="/models/model4.jpg" 
                    alt="Secure Handovers Campaign" 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

             {/* 4. CURATED FEATURED TIES: ULTRA-PREMIUM ASYMMETRIC GRID GALLERY */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-28 bg-brand-bg border-b border-brand-border/30 relative overflow-hidden" 
        id="featured-products"
      >
        {/* Decorative background glow */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-secondary/[0.03] rounded-full filter blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-brand-accent/[0.05] rounded-full filter blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-brand-border/40 pb-8">
            <div className="text-left space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-brand-secondary block">The Assemblage Collection</span>
              <h2 className="font-display font-black text-4xl sm:text-5xl text-brand-primary tracking-tight uppercase leading-none">
                Featured Ties
              </h2>
              <p className="text-sm text-brand-secondary max-w-lg leading-relaxed">
                A selection of high-end, handpicked neckwear. Verified against all university administrative standards and chapel dress criteria.
              </p>
            </div>
            <button
              onClick={onBrowseMarketplace}
              className="px-8 py-3.5 bg-brand-primary hover:bg-brand-secondary text-brand-bg rounded-full text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2 self-start md:self-end transition-all duration-300 shadow-md cursor-pointer"
              id="btn-see-all-featured"
            >
              View Catalog
              <span>↗</span>
            </button>
          </div>
  
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" 
            id="featured-grid"
          >
            {featuredProducts.slice(0, 4).map((product) => {
              const originalPrice = product?.originalPrice ?? 0;
              const price = product?.price ?? 0;
              const discountPercent = originalPrice > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
              const isWishlisted = isInWishlist(product.id);
  
              return (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="bg-transparent flex flex-col justify-between cursor-pointer relative group transition-all duration-300"
                  onClick={() => onOpenProductDetail(product)}
                  id={`featured-${product.id}`}
                >
                  
                  {/* Image container with fine aesthetics */}
                  <div className="aspect-[4/5] w-full rounded-lg overflow-hidden bg-brand-light-gray/40 border border-brand-border/20 relative mb-4 flex items-center justify-center">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover grayscale-[5%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <TiePlaceholder
                        color={product.color}
                        category={product.category}
                        name={product.name}
                        className="w-full h-full"
                      />
                    )}
                    
                    {discountPercent > 0 && (
                      <span className="absolute top-3 left-3 bg-[#F5F2EB] text-[#0A0A0A] font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 font-bold rounded-sm shadow-sm">
                        -{discountPercent}%
                      </span>
                    )}
  
                    {/* Wishlist Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product, e);
                      }}
                      className="absolute top-3 right-3 p-1.5 bg-black/40 backdrop-blur-sm rounded-full text-brand-secondary hover:bg-white hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100"
                      aria-label="Add to Wishlist"
                    >
                      <Heart 
                        size={12} 
                        strokeWidth={2.5}
                        className={isWishlisted ? 'fill-brand-primary text-brand-primary' : 'text-brand-secondary'} 
                      />
                    </button>
  
                    {/* Quick Add To Bag Hover bar */}
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product, e);
                        }}
                        className="w-full bg-[#F5F2EB] hover:bg-white text-black text-[9px] font-mono tracking-widest py-3 hover:text-black transition-colors uppercase font-bold"
                      >
                        + QUICK RESERVE
                      </button>
                    </div>
                  </div>
  
                  {/* Text labels inside card */}
                  <div className="text-left space-y-1.5 px-0.5">
                    <div className="text-[9px] font-mono text-brand-secondary/70 uppercase tracking-wider">
                      {product.category} • {product.sellerHall}
                    </div>
  
                    <h3 className="font-sans font-medium text-sm text-brand-primary tracking-tight leading-snug group-hover:text-brand-secondary transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-baseline justify-between pt-2 border-t border-brand-border/10 mt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-xs font-bold text-white">
                          ₦{(product?.price ?? 0).toLocaleString()}
                        </span>
                        {(product?.originalPrice ?? 0) > (product?.price ?? 0) && (
                          <span className="font-mono text-[9px] text-brand-secondary/30 line-through">
                            ₦{(product?.originalPrice ?? 0).toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="text-[9px] font-mono text-brand-secondary/65 tracking-wider uppercase">
                        {product.rating} / 5.0
                      </div>
                    </div>
                  </div>
  
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* 5. THE COMMUNITY SYNDICATE: ELEVATED GRID */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-28 bg-brand-bg border-b border-brand-border/30 relative overflow-hidden" 
        id="community-section"
      >
        {/* Ambient forest green light background with parallax scrolling */}
        <motion.div style={{ y: yGlow1 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-secondary/[0.03] rounded-full filter blur-[150px] pointer-events-none"></motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-brand-secondary block mb-3">
              The Peer Syndicate
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-brand-primary tracking-tight uppercase leading-none">
              Join the Student Guild
            </h2>
            <div className="h-0.5 w-16 bg-brand-secondary/60 mx-auto mt-4 mb-3"></div>
            <p className="text-sm text-brand-secondary max-w-md mx-auto leading-relaxed">
              Get instant updates on peer dress drops, coordinate lobby exchanges in residence halls, and guarantee your compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            
            {/* WhatsApp Premium Card */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-brand-card/40 backdrop-blur-md border border-brand-border/80 hover:border-brand-secondary/40 rounded-[2.5rem] p-10 flex flex-col justify-between text-left transition-all duration-300 relative overflow-hidden group shadow-2xl"
              id="whatsapp-community-card"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-brand-light-gray border border-brand-border flex items-center justify-center text-brand-secondary group-hover:text-white transition-colors duration-300">
                    <MessageCircle size={24} className="stroke-[1.2]" />
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-brand-secondary bg-brand-light-gray border border-brand-border px-3.5 py-1 rounded-full">
                    Peer Handoff Hub
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="font-display font-bold text-2xl text-brand-primary uppercase tracking-tight">
                    WhatsApp Exchange
                  </h3>
                  <p className="text-sm text-brand-secondary leading-relaxed group-hover:text-brand-primary/90 transition-colors">
                    The active daily marketplace. Post your requested colors, communicate directly with sellers in Peter, Paul, or Decatur halls, and complete safe lobby inspect-and-swaps in under five minutes.
                  </p>
                </div>
                
                <div className="pt-2 border-t border-brand-border/40 flex items-center gap-6 text-[10px] font-mono text-brand-secondary/80">
                  <span className="flex items-center gap-2 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    850+ MEMBERS
                  </span>
                  <span>&bull;</span>
                  <span>ACTIVE DAILY</span>
                </div>
              </div>

              <div className="mt-10">
                <a
                  href="https://chat.whatsapp.com/invite/knotify-covenant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-3 bg-brand-primary hover:bg-brand-secondary text-brand-bg rounded-xl px-6 py-4 transition-all duration-300 cursor-pointer text-xs font-mono font-bold tracking-wider uppercase shadow-md"
                >
                  Join WhatsApp Guild
                  <ArrowRight size={13} />
                </a>
              </div>
            </motion.div>

            {/* Telegram Premium Card */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-brand-card/40 backdrop-blur-md border border-brand-border/80 hover:border-brand-secondary/40 rounded-[2.5rem] p-10 flex flex-col justify-between text-left transition-all duration-300 relative overflow-hidden group shadow-2xl"
              id="telegram-community-card"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-brand-light-gray border border-brand-border flex items-center justify-center text-brand-secondary group-hover:text-white transition-colors duration-300">
                    <Send size={22} className="stroke-[1.2] -translate-x-0.5 translate-y-0.5" />
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-brand-secondary bg-brand-light-gray border border-brand-border px-3.5 py-1 rounded-full">
                    Compliance Broadcast
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="font-display font-bold text-2xl text-brand-primary uppercase tracking-tight">
                    Telegram Alerts
                  </h3>
                  <p className="text-sm text-brand-secondary leading-relaxed group-hover:text-brand-primary/90 transition-colors">
                    Official automated feeds. Get notified the second a rare luxury silk or vintage jacquard is listed, receive mid-week chapel dress standard reminders, and keep administrative codes fresh.
                  </p>
                </div>

                <div className="pt-2 border-t border-brand-border/40 flex items-center gap-6 text-[10px] font-mono text-brand-secondary/80">
                  <span className="flex items-center gap-2 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    1,200+ SUBSCRIBERS
                  </span>
                  <span>&bull;</span>
                  <span>STOCK ALERTS</span>
                </div>
              </div>

              <div className="mt-10">
                <a
                  href="https://t.me/knotify_covenant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-3 bg-brand-primary hover:bg-brand-secondary text-brand-bg rounded-xl px-6 py-4 transition-all duration-300 cursor-pointer text-xs font-mono font-bold tracking-wider uppercase shadow-md"
                >
                  Join Telegram Feed
                  <ArrowRight size={13} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 6. OUTCOME-FOCUSED PREMIUM HERO CTA WITH GEOMETRIC PATTERNS */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="py-36 px-4 sm:px-8 bg-neutral-950 relative overflow-hidden bg-[linear-gradient(to_right,#101612_1px,transparent_1px),linear-gradient(to_bottom,#101612_1px,transparent_1px)] bg-[size:40px_40px] border-t border-brand-border/30" 
        id="final-cta"
      >
        {/* Soft, deep ambient glowing spheres with parallax scrolling */}
        <motion.div style={{ y: yGlow1 }} className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-brand-secondary/[0.04] rounded-full filter blur-[120px] pointer-events-none"></motion.div>
        <motion.div style={{ y: yGlow2 }} className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-brand-accent/[0.02] rounded-full filter blur-[100px] pointer-events-none"></motion.div>

        <div className="max-w-5xl mx-auto relative z-10">
          
          <div className="bg-[#090b09] border border-brand-border/40 rounded-[2rem] p-10 sm:p-24 relative overflow-hidden shadow-2xl text-center space-y-8">
            {/* Background Model Image with Dark Overlay */}
            <div className="absolute inset-0 z-0">
              <img src="/models/model8.jpg" alt="Premium Presentation" className="w-full h-full object-cover opacity-20 grayscale" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090b09] via-[#090b09]/80 to-transparent"></div>
            </div>
            
            {/* Extremely subtle grid dot overlay on the container */}
            <div className="absolute inset-0 bg-[radial-gradient(#1B4D3E_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none z-0"></div>
            
            <div className="space-y-4 relative z-10">
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase leading-[1.1]">
                Ditch the Newbie Look. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary via-white to-brand-secondary">
                  Blend in as a Senior.
                </span>
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-brand-secondary/80 max-w-xl mx-auto leading-relaxed relative z-10 font-sans">
              Only <strong className="text-white">92 packs</strong> are left for this cycle. Secure your premium neckwear now because looking like a senior on day one commands instant respect. Pay a <strong className="text-white">₦1,500 deposit</strong> today, avoid crowded public markets, and enjoy direct-to-lobby delivery.
            </p>

            <div className="pt-6 relative z-10">
              <button
                onClick={onBrowseMarketplace}
                className="px-12 py-4.5 bg-[#F5F2EB] hover:bg-white text-black font-mono font-bold text-xs tracking-widest uppercase rounded-full shadow-2xl transition-all duration-300 transform hover:scale-[1.03] active:scale-95 cursor-pointer inline-flex items-center gap-3"
                id="cta-bottom-browse"
              >
                Secure My Senior Pack
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </motion.section>
    </div>
  );
}

