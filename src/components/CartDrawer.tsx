import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  CheckCircle, 
  ArrowRight, 
  User, 
  Phone, 
  Home, 
  ExternalLink, 
  Smile, 
  Percent, 
  Lock,
  Mail,
  ShieldCheck,
  Clipboard,
  Check,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, COVENANT_HALLS } from '../types';
import TiePlaceholder from './TiePlaceholder';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onAddReservation: (reservation: {
    id: string;
    name: string;
    phone: string;
    email?: string;
    color: string;
    quantity: number;
    hall: string;
    productNames: string;
    deposit: number;
    outstanding: number;
    status: 'Reserved' | 'Ready for Pickup' | 'Collected';
    pickupPoint: string;
    dateAdded: string;
  }) => void;
  currentUser: any;
  onOpenAuth: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddReservation,
  currentUser,
  onOpenAuth,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'success'>('cart');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerHall, setBuyerHall] = useState(COVENANT_HALLS[0] || 'Daniel Hall');
  const [copiedId, setCopiedId] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  // Pre-fill user details if logged in
  React.useEffect(() => {
    if (currentUser) {
      setBuyerName(currentUser.name || '');
      setBuyerPhone(currentUser.telegramPhone || '');
      setBuyerEmail(currentUser.email || '');
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  // Pricing calculations
  const totalItems = cartItems.reduce((acc, item) => acc + (item?.quantity ?? 0), 0);
  const totalValue = cartItems.reduce((acc, item) => acc + (item?.product?.price ?? 0) * (item?.quantity ?? 0), 0);
  const totalDeposit = cartItems.reduce((acc, item) => acc + (item?.product?.deposit ?? 0) * (item?.quantity ?? 0), 0);
  const outstandingBalance = totalValue - totalDeposit;

  // Determine assigned pickup point based on residence hall (Stage 10 logic)
  const getAssignedPickupPoint = (hall: string) => {
    if (hall === 'Daniel Hall' || hall === 'Joseph Hall') {
      return 'Pickup Point A (Near Joseph Hall)';
    } else if (hall === 'Peter Hall' || hall === 'Paul Hall') {
      return 'Pickup Point B (Near Paul Hall)';
    } else if (hall === 'Esther Hall') {
      return 'Pickup Point C (Near Esther Hall Entrance)';
    } else if (hall === 'Lydia Hall' || hall === 'Mary Hall') {
      return 'Pickup Point D (Near Lydia Hall Entrance)';
    }
    return 'Main Administration Station';
  };

  const handleStartCheckout = () => {
    if (cartItems.length > 0) {
      if (!currentUser) {
        onOpenAuth();
      } else {
        setCheckoutStep('form');
      }
    }
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (buyerName && buyerPhone) {
      const uniqueId = `KNT-2027-${Math.floor(10000 + Math.random() * 90000)}`;
      setGeneratedId(uniqueId);

      const preferredColor = cartItems.map(item => item.product.color).join(', ');
      const productNames = cartItems.map(item => `${item.product.name} (x${item.quantity})`).join(', ');

      const pickupPoint = getAssignedPickupPoint(buyerHall);

      // Create new reservation record for local operations simulation (Stage 8)
      onAddReservation({
        id: uniqueId,
        name: buyerName,
        phone: buyerPhone,
        email: buyerEmail || undefined,
        color: preferredColor,
        quantity: totalItems,
        hall: buyerHall,
        productNames: productNames,
        deposit: totalDeposit,
        outstanding: outstandingBalance,
        status: 'Reserved',
        pickupPoint: pickupPoint,
        dateAdded: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });

      setCheckoutStep('success');
    }
  };

  const handleResetDrawer = () => {
    setCheckoutStep('cart');
    onClearCart();
    setBuyerName('');
    setBuyerPhone('');
    setBuyerEmail('');
    onClose();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-container">
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
            id="cart-drawer-panel"
          >
            <div className="flex h-full flex-col overflow-y-scroll bg-brand-bg shadow-2xl">
              
              {/* CART HEADER */}
              <div className="flex items-center justify-between border-b border-brand-border px-6 py-5 bg-[#121212]">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={15} className="text-brand-primary" />
                  <h2 className="text-sm font-mono tracking-widest uppercase font-bold text-brand-primary">
                    {checkoutStep === 'success' ? 'RESERVATION CONFIRMED' : 'RESERVATION BAG'}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-none p-1.5 text-brand-primary border border-brand-border hover:bg-neutral-900 transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              {/* STEP: RESERVATION BAG LIST */}
              {checkoutStep === 'cart' && (
                <div className="flex flex-1 flex-col justify-between" id="step-cart">
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center h-full">
                      <div className="w-12 h-12 rounded-none bg-neutral-900 border border-brand-border/60 flex items-center justify-center text-brand-secondary mb-4">
                        <ShoppingBag size={20} />
                      </div>
                      <h3 className="font-mono tracking-widest uppercase font-bold text-xs text-brand-primary">YOUR BAG IS EMPTY</h3>
                      <p className="text-xs text-brand-secondary mt-2 max-w-xs leading-relaxed font-sans">
                        Add a compliant Covenant tie to make your secure, risk-free reservation.
                      </p>
                      <button
                        onClick={onClose}
                        className="mt-6 px-6 py-2.5 bg-[#F5F2EB] hover:bg-white text-black font-mono tracking-widest uppercase text-[10px] font-bold rounded-full transition-colors cursor-pointer"
                      >
                        Keep Browsing
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Product Items List */}
                      <div className="divide-y divide-brand-border/40 px-6 overflow-y-auto max-h-[50vh]">
                        {cartItems.map((item) => (
                          <div key={item.product.id} className="flex py-5 gap-4 text-left" id={`cart-item-${item.product.id}`}>
                            <div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-brand-border bg-[#121212]">
                              {item.product.image ? (
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  className="h-full w-full object-cover grayscale-[10%]"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <TiePlaceholder
                                  color={item.product.color}
                                  category={item.product.category}
                                  name={item.product.name}
                                  className="w-full h-full"
                                />
                              )}
                            </div>

                            <div className="flex flex-1 flex-col justify-between text-left">
                              <div>
                                <h4 className="text-xs font-bold font-sans text-brand-primary leading-tight line-clamp-1 uppercase">
                                  {item.product.name}
                                </h4>
                                <p className="text-[10px] text-brand-secondary font-mono mt-1">
                                  {item?.product?.category} • Deposit: ₦{(item?.product?.deposit ?? 0).toLocaleString()}
                                </p>
                              </div>

                              <div className="flex items-center justify-between mt-2">
                                <span className="font-mono text-xs font-bold text-brand-primary">
                                  ₦{((item?.product?.price ?? 0) * (item?.quantity ?? 0)).toLocaleString()}
                                </span>

                                <div className="flex items-center gap-3">
                                  {/* Quantity Incrementor */}
                                  <div className="flex items-center border border-brand-border bg-neutral-900 py-0.5 px-1 rounded-full">
                                    <button
                                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                      className="w-5 h-5 flex items-center justify-center font-mono text-xs text-brand-primary disabled:opacity-30 cursor-pointer"
                                    >
                                      -
                                    </button>
                                    <span className="w-6 text-center font-mono text-[11px] font-bold text-brand-primary">{item.quantity}</span>
                                    <button
                                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                      className="w-5 h-5 flex items-center justify-center font-mono text-xs text-brand-primary disabled:opacity-30 cursor-pointer"
                                    >
                                      +
                                    </button>
                                  </div>

                                  <button
                                    onClick={() => onRemoveItem(item.product.id)}
                                    className="p-1 text-neutral-500 hover:text-brand-primary hover:bg-neutral-900 rounded-none border border-transparent hover:border-brand-border/40 transition-all"
                                    title="Delete product"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Summary, Coupons & Pricing Footer */}
                      <div className="border-t border-brand-border bg-brand-bg p-6 space-y-4">
                        <div className="space-y-2 text-[11px] font-mono uppercase tracking-wider">
                          <div className="flex justify-between text-brand-secondary font-sans">
                            <span>Total Tie Value</span>
                            <span className="font-mono">₦{(totalValue ?? 0).toLocaleString()}</span>
                          </div>
                          
                          <div className="flex justify-between text-emerald-400 font-semibold border-b border-brand-border/30 pb-2">
                            <span>RESERVATION DEPOSIT DUE TODAY</span>
                            <span className="font-mono">₦{(totalDeposit ?? 0).toLocaleString()}</span>
                          </div>

                          <div className="flex justify-between text-brand-secondary font-sans pt-1">
                            <span>OUTSTANDING BALANCE (AT CAMPUS PICKUP)</span>
                            <span className="font-mono">₦{(outstandingBalance ?? 0).toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Stage 6 Message */}
                        <div className="bg-neutral-900/60 p-4 rounded-xl border border-brand-border text-[11px] font-sans leading-relaxed text-brand-secondary text-left">
                          <p className="font-bold text-white mb-1 flex items-center gap-1.5">
                            <ShieldCheck size={13} className="text-[#8EB89B]" />
                            Low-Risk Deposit Process
                          </p>
                          You’re reserving your tie, not taking a gamble. Paying a small reservation deposit secures your premium neckwear safely before resumption. This helps us estimate exact campus demand.
                        </div>

                        <button
                          onClick={handleStartCheckout}
                          className="w-full py-4 bg-[#F5F2EB] hover:bg-white text-black font-mono tracking-widest uppercase text-xs font-bold rounded-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                          id="btn-cart-checkout"
                        >
                          PROCEED TO RESERVE
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* STEP: CUSTOMER DETAILS FORM */}
              {checkoutStep === 'form' && (
                <div className="flex flex-1 flex-col justify-between p-6" id="step-form">
                  <div className="text-left space-y-6">
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-brand-primary bg-neutral-900 px-2.5 py-1 rounded-none border border-brand-border font-bold uppercase">
                        SECURE RESERVATION
                      </span>
                      <h3 className="font-display font-black text-lg uppercase text-brand-primary mt-4">Personal Details</h3>
                      <p className="text-xs text-brand-secondary mt-1 font-sans">
                        Provide your registration details so we can package your tie and route you to the correct hall pickup point automatically.
                      </p>
                    </div>

                    <form onSubmit={handleConfirmReservation} className="space-y-4" id="checkout-form">
                      {/* Name input */}
                      <div>
                        <label className="block text-[10px] font-mono font-bold text-brand-secondary uppercase tracking-widest mb-1.5">
                          FULL NAME
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                            <User size={12} />
                          </span>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Daniel Adebayo"
                            value={buyerName}
                            onChange={(e) => setBuyerName(e.target.value)}
                            className="w-full pl-8 pr-4 py-3 bg-neutral-900 text-brand-primary font-mono text-xs rounded-none border border-brand-border focus:border-brand-primary focus:outline-none transition-all uppercase"
                            id="input-checkout-name"
                          />
                        </div>
                      </div>

                      {/* Phone input */}
                      <div>
                        <label className="block text-[10px] font-mono font-bold text-brand-secondary uppercase tracking-widest mb-1.5">
                          PHONE / WHATSAPP NUMBER
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                            <Phone size={12} />
                          </span>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. 08012345678"
                            value={buyerPhone}
                            onChange={(e) => setBuyerPhone(e.target.value)}
                            className="w-full pl-8 pr-4 py-3 bg-neutral-900 text-brand-primary font-mono text-xs rounded-none border border-brand-border focus:border-brand-primary focus:outline-none transition-all"
                            id="input-checkout-phone"
                          />
                        </div>
                      </div>

                      {/* Email input (optional) */}
                      <div>
                        <label className="block text-[10px] font-mono font-bold text-brand-secondary uppercase tracking-widest mb-1.5">
                          EMAIL ADDRESS (OPTIONAL)
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                            <Mail size={12} />
                          </span>
                          <input
                            type="email"
                            placeholder="e.g. daniel@student.covenant.edu.ng"
                            value={buyerEmail}
                            onChange={(e) => setBuyerEmail(e.target.value)}
                            className="w-full pl-8 pr-4 py-3 bg-neutral-900 text-brand-primary font-mono text-xs rounded-none border border-brand-border focus:border-brand-primary focus:outline-none transition-all"
                            id="input-checkout-email"
                          />
                        </div>
                      </div>

                      {/* Residence Hall Selector */}
                      <div>
                        <label className="block text-[10px] font-mono font-bold text-brand-secondary uppercase tracking-widest mb-1.5">
                          RESIDENCE HALL
                        </label>
                        <select
                          value={buyerHall}
                          onChange={(e) => setBuyerHall(e.target.value)}
                          className="w-full px-4 py-3 bg-neutral-900 text-brand-primary font-mono text-xs rounded-none border border-brand-border focus:border-brand-primary focus:outline-none transition-all cursor-pointer"
                        >
                          {COVENANT_HALLS.map((hall) => (
                            <option key={hall} value={hall}>
                              {hall}
                            </option>
                          ))}
                        </select>
                        <p className="text-[10px] text-neutral-500 font-sans mt-1">
                          We will assign you the closest pickup point near your hall to eliminate queues.
                        </p>
                      </div>

                      {/* Cost Summary Info */}
                      <div className="bg-[#121212] p-4 rounded-xl border border-brand-border text-left font-mono text-xs space-y-1.5">
                        <div className="flex justify-between text-neutral-400">
                          <span>Deposit Today:</span>
                          <span className="text-white font-bold">₦{(totalDeposit ?? 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-neutral-400">
                          <span>Due at Resumption:</span>
                          <span className="text-brand-secondary">₦{(outstandingBalance ?? 0).toLocaleString()}</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-[#F5F2EB] hover:bg-white text-black font-mono tracking-widest uppercase text-xs font-bold rounded-none transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                        id="btn-checkout-confirm"
                      >
                        RESERVE FOR ₦{(totalDeposit ?? 0).toLocaleString()}
                      </button>
                    </form>
                  </div>

                  <button
                    onClick={() => setCheckoutStep('cart')}
                    className="w-full py-3 border border-brand-border hover:bg-neutral-900 text-brand-secondary font-mono tracking-widest text-[10px] uppercase font-bold rounded-none transition-colors mt-6 cursor-pointer"
                  >
                    Back to shopping bag
                  </button>
                </div>
              )}

              {/* STEP: SUCCESS PAGE COORDINATES (Stage 7 Requirements) */}
              {checkoutStep === 'success' && (
                <div className="flex flex-1 flex-col items-center justify-between p-6 overflow-y-auto" id="step-success">
                  <div className="w-full text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-2">
                      <CheckCircle size={24} />
                    </div>

                    <span className="text-[9px] font-mono tracking-widest text-emerald-400 bg-emerald-500/5 px-2.5 py-1 rounded-none border border-emerald-500/20 font-bold uppercase inline-block">
                      RESERVATION CONFIRMED
                    </span>

                    <h3 className="font-display font-black text-xl uppercase text-white leading-tight">Secure Place Held</h3>
                    
                    <p className="text-xs text-brand-secondary font-sans leading-relaxed px-2">
                      Welcome to Covenant, <strong>{buyerName}</strong>! Your premium compliant neckwear is reserved.
                    </p>

                    {/* Reservation Number Panel */}
                    <div className="bg-neutral-900/80 border border-brand-border rounded-2xl p-4 text-left w-full space-y-3">
                      <div className="flex items-center justify-between border-b border-brand-border/40 pb-2">
                        <span className="text-[10px] font-mono text-neutral-400">RESERVATION ID</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-white tracking-wider">{generatedId}</span>
                          <button 
                            onClick={copyToClipboard}
                            className="p-1 hover:bg-neutral-800 rounded transition-colors text-brand-primary"
                            title="Copy ID"
                          >
                            {copiedId ? <Check size={12} className="text-emerald-400" /> : <Clipboard size={12} />}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono uppercase text-brand-secondary">
                        <div>
                          <p className="text-[9px] text-neutral-500">STATUS</p>
                          <p className="text-white font-bold text-xs mt-0.5">RESERVED</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-neutral-500">DEPOSIT PAID</p>
                          <p className="text-emerald-400 font-bold text-xs mt-0.5">₦{(totalDeposit ?? 0).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-neutral-500">ASSIGNED PICKUP POINT</p>
                          <p className="text-brand-primary font-bold text-[10px] mt-0.5 leading-tight truncate" title={getAssignedPickupPoint(buyerHall)}>
                            {getAssignedPickupPoint(buyerHall).split('(')[0]}
                          </p>
                        </div>
                        <div>
                          <p className="text-[9px] text-neutral-500">OUTSTANDING BALANCE</p>
                          <p className="text-white font-bold text-xs mt-0.5">₦{(outstandingBalance ?? 0).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Stage 7 "Keep Your Reservation Safe" */}
                    <div className="bg-[#121212] border border-brand-border/50 rounded-2xl p-4 text-left w-full space-y-3">
                      <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-primary flex items-center gap-1.5">
                        <ShieldCheck size={12} className="text-brand-primary" />
                        KEEP YOUR RESERVATION SAFE
                      </p>
                      
                      <div className="space-y-2 text-[11px] font-sans text-brand-secondary leading-tight">
                        <div className="flex items-start gap-2">
                          <Check size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                          <span><strong>Screenshot</strong> this confirmation page now</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                          <span>Save your confirmation email details</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                          <span>Add Knotify details to your resumption list</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                          <span>Keep your phone number active for coordinate updates</span>
                        </div>
                      </div>

                      <p className="text-[9px] text-neutral-500 italic mt-2 leading-tight">
                        If you lose your reservation number, don't worry. We can retrieve your order easily using your registered phone number at pickup!
                      </p>
                    </div>
                  </div>

                  <div className="w-full pt-4">
                    <button
                      onClick={handleResetDrawer}
                      className="w-full py-4 bg-white hover:bg-[#F5F2EB] text-black font-mono tracking-widest uppercase text-xs font-bold rounded-none transition-all cursor-pointer"
                      id="btn-success-done"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
