import { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Truck,
  HelpCircle,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import TiePlaceholder from './TiePlaceholder';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  onDirectBuy: (product: Product) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  onDirectBuy,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'info' | 'faqs'>('info');

  const originalPrice = product?.originalPrice ?? 0;
  const price = product?.price ?? 0;
  const deposit = product?.deposit ?? 0;
  const discountPercent = originalPrice > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const outstandingBalance = price - deposit;

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCartAndClose = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10" id="product-detail-modal">
      {/* Background Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative bg-brand-bg w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-brand-border/80 z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-hidden"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 bg-black/60 text-white rounded-full border border-brand-border/60 hover:bg-neutral-900 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Left Side: Product Image Display & Specs/Tabs (Huge visual focus) */}
        <div className="md:col-span-6 bg-neutral-950/40 relative p-6 border-b md:border-b-0 md:border-r border-brand-border/60 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-[80vh]">
          <div className="space-y-6">
            <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden border border-brand-border/50 bg-[#121212] relative">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover grayscale-[5%] hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  id="detail-main-image"
                />
              ) : (
                <TiePlaceholder
                  color={product.color}
                  category={product.category}
                  name={product.name}
                  className="w-full h-full"
                />
              )}

              {/* Premium Compliance Badge */}
              <div className="absolute top-4 left-4 bg-[#1B4D3E] text-white font-mono text-[9px] tracking-widest uppercase px-3 py-1.5 font-bold rounded-xl shadow-lg border border-brand-border/20 flex items-center gap-1">
                <CheckCircle size={10} className="text-[#8EB89B]" />
                CHAPEL COMPLIANT
              </div>
            </div>

            {/* TAB SELECTORS: Pickup Info vs FAQs */}
            <div className="flex border-b border-brand-border/40 text-xs font-mono tracking-widest uppercase">
              <button
                onClick={() => setActiveTab('info')}
                className={`py-2 pr-4 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'info' ? 'border-brand-primary text-brand-primary font-bold' : 'border-transparent text-neutral-500 hover:text-white'
                }`}
              >
                Pickup Process
              </button>
              <button
                onClick={() => setActiveTab('faqs')}
                className={`py-2 px-4 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'faqs' ? 'border-brand-primary text-brand-primary font-bold' : 'border-transparent text-neutral-500 hover:text-white'
                }`}
              >
                FAQs
              </button>
            </div>

            {/* TAB CONTENT */}
            <div className="text-left">
              {activeTab === 'info' ? (
                <div className="space-y-4" id="pickup-tab-content">
                  <div className="flex gap-3 bg-neutral-900/60 p-4 rounded-2xl border border-brand-border/40">
                    <Truck size={16} className="text-brand-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">1. Secure Reservation</h4>
                      <p className="text-[11px] text-brand-secondary mt-1 font-sans leading-relaxed">
                        Pay a safe deposit of ₦{(product?.deposit ?? 0).toLocaleString()} today. We handle ironed preparation, custom ziplock pouching, and stock assignment.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 bg-neutral-900/60 p-4 rounded-2xl border border-brand-border/40">
                    <CheckCircle size={16} className="text-brand-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">2. Hall Resumption Delivery</h4>
                      <p className="text-[11px] text-brand-secondary mt-1 font-sans leading-relaxed">
                        Walk to your assigned pickup station near your Residence Hall. Verify your physical tie packaging before paying the outstanding balance.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1" id="faqs-tab-content">
                  <div className="p-3 bg-neutral-900/40 rounded-xl border border-brand-border/30 text-left">
                    <p className="text-[11px] font-mono text-brand-primary uppercase tracking-wider">Do I pay the full amount now?</p>
                    <p className="text-xs text-brand-secondary font-sans mt-1">No, pay only the ₦{(product?.deposit ?? 0).toLocaleString()} reservation deposit to secure your tie. The remaining balance is paid upon resumption pickup.</p>
                  </div>
                  <div className="p-3 bg-neutral-900/40 rounded-xl border border-brand-border/30 text-left">
                    <p className="text-[11px] font-mono text-brand-primary uppercase tracking-wider">Where do I collect my order?</p>
                    <p className="text-xs text-brand-secondary font-sans mt-1">We operate multiple stations close to the male/female halls during resumption week. You will receive an email/WhatsApp with your assigned coordinates.</p>
                  </div>
                  <div className="p-3 bg-neutral-900/40 rounded-xl border border-brand-border/30 text-left">
                    <p className="text-[11px] font-mono text-brand-primary uppercase tracking-wider">Is this tie strictly chapel compliant?</p>
                    <p className="text-xs text-brand-secondary font-sans mt-1">Yes, our plain ties meet all official Covenant University rules for Wednesday and Sunday Chapel services perfectly.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Simple Luxury Product Meta & Purchase Configuration */}
        <div className="md:col-span-6 p-8 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-[80vh]" id="detail-panel-right">
          <div className="space-y-6 text-left my-auto">
            <div>
              {/* Category label */}
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-brand-secondary block mb-1">
                {product.category}
              </span>

              {/* Product Title */}
              <h2 className="font-display font-black text-2xl uppercase text-white leading-tight">
                {product.name}
              </h2>
            </div>

            {/* Material info */}
            <div className="bg-neutral-900/40 p-4 rounded-2xl border border-brand-border/40">
              <span className="text-[9px] font-mono text-brand-primary uppercase block tracking-widest mb-1 font-bold">
                Material Information
              </span>
              <p className="text-[11px] text-brand-secondary leading-relaxed font-sans">
                {product.materials}
              </p>
            </div>

            {/* Pricing Details */}
            <div className="pt-2 border-t border-brand-border/40 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[9px] font-mono text-brand-secondary uppercase block tracking-widest mb-1">
                  RESERVATION DEPOSIT
                </span>
                <span className="font-mono text-xl font-black text-white">
                  ₦{(product?.deposit ?? 0).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-brand-secondary uppercase block tracking-widest mb-1">
                  OUTSTANDING BALANCE
                </span>
                <span className="font-mono text-xl font-semibold text-brand-secondary">
                  ₦{(outstandingBalance ?? 0).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Total Price Tracker */}
            <div className="bg-neutral-900/20 px-4 py-3 rounded-xl border border-brand-border/20 flex justify-between items-center">
              <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">Total Value</span>
              <span className="text-xs font-mono font-bold text-neutral-300">₦{(product?.price ?? 0).toLocaleString()}</span>
            </div>

            {/* Minimal Quantity Selector */}
            <div className="flex items-center justify-between pt-4 border-t border-brand-border/40">
              <span className="text-[10px] font-mono text-brand-secondary uppercase tracking-wider">
                Quantity
              </span>
              <div className="flex items-center border border-brand-border bg-neutral-900/60 py-1 px-3 rounded-full">
                <button
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="w-6 h-6 flex items-center justify-center font-mono text-sm text-white disabled:opacity-20 cursor-pointer"
                >
                  -
                </button>
                <span className="w-10 text-center font-mono text-xs font-bold text-white">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  disabled={quantity >= product.stock}
                  className="w-6 h-6 flex items-center justify-center font-mono text-sm text-white disabled:opacity-20 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Quick Action Purchase Buttons */}
          <div className="space-y-3 pt-6 border-t border-brand-border/40 mt-6">
            <button
              onClick={handleAddToCartAndClose}
              className="w-full py-4 bg-transparent hover:bg-neutral-900 text-white border border-brand-border/80 font-mono tracking-widest uppercase text-xs rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer font-bold"
              id="btn-modal-add-cart"
            >
              <ShoppingBag size={14} />
              ADD TO BAG
            </button>
            
            <button
              onClick={() => {
                onDirectBuy(product);
                onClose();
              }}
              className="w-full py-4 bg-white hover:bg-[#F5F2EB] text-neutral-950 font-mono tracking-widest uppercase text-xs rounded-full transition-all flex items-center justify-center gap-1 cursor-pointer font-black shadow-lg"
              id="btn-modal-buy-now"
            >
              RESERVE NOW
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
