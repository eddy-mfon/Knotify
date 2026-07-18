import React from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  Heart,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import TiePlaceholder from './TiePlaceholder';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: string[];
  products: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  products,
  onToggleWishlist,
  onAddToCart,
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  // Find saved products
  const savedProducts = wishlist
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="wishlist-drawer-container">
      {/* Backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black transition-opacity"
          onClick={onClose}
        />

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="pointer-events-auto w-screen max-w-md bg-brand-bg border-l border-brand-border/40"
            id="wishlist-drawer-panel"
          >
            <div className="flex h-full flex-col overflow-y-scroll bg-brand-bg shadow-2xl">
              
              {/* HEADER */}
              <div className="flex items-center justify-between border-b border-brand-border px-6 py-5 bg-[#121212]">
                <div className="flex items-center gap-2">
                  <Heart size={14} className="text-brand-primary fill-brand-primary" />
                  <h2 className="text-sm font-mono tracking-widest uppercase font-bold text-brand-primary">WISHLIST ({savedProducts.length})</h2>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-none p-1.5 text-brand-primary border border-brand-border hover:bg-neutral-900 transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              {/* LIST OF SAVED ITEMS */}
              <div className="flex-1 flex flex-col justify-between">
                {savedProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-12 text-center h-full my-auto">
                    <div className="w-12 h-12 rounded-none bg-neutral-900 border border-brand-border/60 flex items-center justify-center text-brand-secondary mb-4">
                      <Heart size={20} className="text-neutral-500" />
                    </div>
                    <h3 className="font-mono tracking-widest uppercase font-bold text-xs text-brand-primary">YOUR WISHLIST IS EMPTY</h3>
                    <p className="text-xs text-brand-secondary mt-2 max-w-xs leading-relaxed font-sans">
                      Save your favorite college ties here to track them and purchase later.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-6 px-6 py-2.5 bg-[#F5F2EB] hover:bg-white text-black font-mono tracking-widest uppercase text-[10px] font-bold rounded-full transition-colors cursor-pointer"
                    >
                      Explore Catalog
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Items Grid/List */}
                    <div className="divide-y divide-brand-border/40 px-6 overflow-y-auto max-h-[75vh]">
                      {savedProducts.map((prod) => (
                        <div key={prod.id} className="flex py-5 gap-4 text-left" id={`wishlist-item-${prod.id}`}>
                          <div className="h-24 w-18 flex-shrink-0 overflow-hidden rounded-xl border border-brand-border bg-[#121212]">
                            {prod.image ? (
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="h-full w-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-300"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <TiePlaceholder
                                color={prod.color}
                                category={prod.category}
                                name={prod.name}
                                className="w-full h-full"
                              />
                            )}
                          </div>

                          <div className="flex flex-1 flex-col justify-between text-left py-0.5">
                            <div>
                              <div className="flex items-center gap-1.5 text-[8px] font-mono text-neutral-400 uppercase tracking-widest">
                                <span>{prod.category}</span>
                                <span>&bull;</span>
                                <span className="font-semibold text-neutral-500">{prod.sellerHall}</span>
                              </div>
                              <h4 className="font-sans font-normal text-[12.5px] text-brand-primary tracking-normal leading-snug mt-1 line-clamp-2">
                                {prod.name}
                              </h4>
                              <p className="text-[9px] text-brand-secondary/60 font-mono uppercase tracking-wider mt-0.5">
                                BY {prod.seller}
                              </p>
                              <div className="mt-1.5 flex items-baseline gap-1.5 font-sans text-xs text-brand-secondary font-medium">
                                <span>₦{prod.price.toLocaleString()}</span>
                                {prod.originalPrice > prod.price && (
                                  <span className="font-mono text-[9px] text-brand-secondary/40 line-through">
                                    ₦{prod.originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Actions bar inside the item card */}
                            <div className="flex items-center gap-2 mt-3">
                              <button
                                onClick={() => {
                                  onAddToCart(prod, 1);
                                }}
                                disabled={prod.stock === 0}
                                className={`flex-1 py-2 font-mono tracking-widest uppercase text-[8px] font-bold flex items-center justify-center gap-1 transition-all rounded-none ${
                                  prod.stock === 0
                                    ? 'bg-neutral-900 text-neutral-500 cursor-not-allowed border border-transparent'
                                    : 'bg-[#F5F2EB] text-black hover:bg-white border border-[#F5F2EB] cursor-pointer'
                                }`}
                              >
                                <ShoppingBag size={9} />
                                {prod.stock === 0 ? 'SOLD OUT' : 'ADD TO BAG'}
                              </button>
                              
                              <button
                                onClick={() => onToggleWishlist(prod)}
                                className="p-2 border border-brand-border hover:border-brand-primary hover:bg-[#121212] text-neutral-400 hover:text-brand-primary transition-all rounded-none cursor-pointer"
                                title="Remove from wishlist"
                              >
                                <Trash2 size={10} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer note */}
                    <div className="border-t border-brand-border p-6 bg-[#121212]">
                      <p className="text-[10px] text-center font-mono tracking-wider uppercase text-brand-secondary leading-relaxed">
                        ★ Premium university dress code ties &bull; Hand-inspected quality ★
                      </p>
                    </div>
                  </>
                )}
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
