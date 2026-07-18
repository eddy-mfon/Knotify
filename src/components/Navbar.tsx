import React from 'react';
import { ShoppingBag, Heart, PlusCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  currentTab: 'home' | 'marketplace' | 'sell';
  setCurrentTab: (tab: 'home' | 'marketplace' | 'sell') => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenBecomeSeller: () => void;
  currentUser: any;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenBecomeSeller,
  currentUser,
  onOpenAuth,
  onLogout,
}: NavbarProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 w-full bg-brand-bg/95 border-b border-brand-border/50 backdrop-blur-md transition-all duration-300"
      id="main-navbar"
    >
      {/* Top Banner */}
      <div className="bg-black text-white text-[9px] py-2 px-4 sm:px-8 font-mono tracking-widest uppercase flex justify-between items-center">
        <span className="font-semibold">FREE COVENANT LOBBY DELIVERY FOR STUDENTS</span>
        <span className="hidden sm:inline-block tracking-[0.15em] opacity-80">DAILY CHAPEL DRESS CODE APPROVED • VERIFIED SELLERS</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left Brand Logo (Woodcraft Inspired - Lowercase, bold display font) */}
          <div 
            className="flex items-baseline cursor-pointer select-none gap-1" 
            onClick={() => setCurrentTab('home')}
            id="brand-logo"
          >
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-brand-primary tracking-tight leading-none">
              Knotify
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary inline-block"></span>
          </div>

          {/* Center/Right Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8" id="desktop-nav">
            <button
              onClick={() => setCurrentTab('home')}
              className={`text-[12px] font-sans tracking-wide transition-colors duration-200 py-1 cursor-pointer ${
                currentTab === 'home' 
                  ? 'text-brand-primary font-bold border-b-2 border-brand-primary' 
                  : 'text-brand-secondary hover:text-brand-primary'
              }`}
              id="nav-link-home"
            >
              Home
            </button>
            <button
              onClick={() => setCurrentTab('marketplace')}
              className={`text-[12px] font-sans tracking-wide transition-colors duration-200 py-1 cursor-pointer ${
                currentTab === 'marketplace' 
                  ? 'text-brand-primary font-bold border-b-2 border-brand-primary' 
                  : 'text-brand-secondary hover:text-brand-primary'
              }`}
              id="nav-link-marketplace"
            >
              Collection
            </button>
            <button
              onClick={() => setCurrentTab('sell')}
              className={`text-[12px] font-sans tracking-wide transition-colors duration-200 py-1 cursor-pointer ${
                currentTab === 'sell'
                  ? 'text-brand-primary font-bold border-b-2 border-brand-primary'
                  : 'text-brand-secondary hover:text-brand-primary'
              }`}
              id="nav-link-sell"
            >
              Sell Tie
            </button>

            {/* Wishlist Link inside navbar */}
            <button
              onClick={onOpenWishlist}
              className="text-[12px] font-sans tracking-wide text-brand-secondary hover:text-brand-primary transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
              id="nav-link-wishlist"
            >
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="bg-black text-white text-[9px] font-mono rounded-full px-1.5 py-0.5 font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action Controls (Woodcraft Pill Shop Button) */}
          <div className="flex items-center space-x-2 sm:space-x-4" id="navbar-actions">
            {/* Become Seller - Mobile Indicator */}
            <button
              onClick={() => setCurrentTab('sell')}
              className={`md:hidden p-2 transition-colors ${
                currentTab === 'sell' ? 'text-brand-primary' : 'text-brand-secondary hover:text-brand-primary'
              }`}
              title="Become a Seller"
              id="mobile-btn-sell"
            >
              <PlusCircle size={18} strokeWidth={1.5} />
            </button>

            {/* Wishlist Button - Mobile only */}
            <button
              onClick={onOpenWishlist}
              className="md:hidden p-2 text-brand-secondary hover:text-brand-primary transition-colors relative"
              aria-label="Wishlist"
              id="btn-wishlist"
            >
              <Heart size={18} strokeWidth={1.5} className={wishlistCount > 0 ? 'fill-brand-primary text-brand-primary' : ''} />
            </button>

            {/* User Session Profile State */}
            {currentUser ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="hidden sm:inline-block text-[11px] font-mono text-neutral-400 max-w-[80px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
                <button
                  onClick={onLogout}
                  className="text-[10px] sm:text-[11px] font-mono font-bold text-neutral-300 hover:text-white border border-brand-border/45 px-2.5 sm:px-3 py-1.5 rounded-full hover:bg-neutral-900 transition-all cursor-pointer"
                  id="btn-navbar-logout"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="text-[10px] sm:text-[11px] font-mono font-bold text-neutral-300 hover:text-white border border-brand-border/45 px-3 sm:px-3.5 py-1.5 rounded-full hover:bg-neutral-900 transition-all cursor-pointer"
                id="btn-navbar-login"
              >
                Sign In
              </button>
            )}

            {/* Woodcraft Pill Button: shop ↗ */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-brand-primary hover:bg-[#EAE9E4] text-[#0A0A0A] rounded-full px-5 py-2.5 transition-all duration-300 cursor-pointer text-xs font-mono font-medium tracking-wider"
              aria-label="Shopping Cart"
              id="btn-cart"
            >
              <span>shop</span>
              {cartCount > 0 && (
                <span className="font-bold text-[10px] bg-[#0A0A0A] text-[#F5F2EB] px-1.5 py-0.2 rounded-full font-sans">
                  {cartCount}
                </span>
              )}
              <span className="font-mono text-[10px]">↗</span>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
