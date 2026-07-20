import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  User, 
  Home, 
  Mail, 
  Sparkles,
  ShoppingBag,
  Clock,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { COVENANT_HALLS } from '../types';

interface BecomeSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddListing?: (newProduct: any) => void;
}

export default function BecomeSellerModal({
  isOpen,
  onClose,
}: BecomeSellerModalProps) {
  // Waitlist form states
  const [fullName, setFullName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [selectedHall, setSelectedHall] = useState(COVENANT_HALLS[0]);
  const [estQuantity, setEstQuantity] = useState('1-3');
  const [whatsapp, setWhatsapp] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !studentEmail || !whatsapp) return;

    setIsLoading(true);
    // Simulate API registration delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setFullName('');
    setStudentEmail('');
    setSelectedHall(COVENANT_HALLS[0]);
    setEstQuantity('1-3');
    setWhatsapp('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6" id="become-seller-modal">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.98, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative bg-brand-bg w-full max-w-xl rounded-[2.2rem] overflow-hidden shadow-2xl border border-brand-border z-10 p-6 sm:p-10 max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-brand-secondary hover:text-brand-primary hover:bg-neutral-900 rounded-full transition-all duration-200 cursor-pointer"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {!isSubmitted ? (
          <div className="text-left space-y-6">
            
            {/* Elegant Header Area */}
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F2EB] text-[#0A0A0A] rounded-full text-[9px] font-mono tracking-widest uppercase font-bold">
                <Sparkles size={10} />
                <span>Peer-to-Peer Wardrobe Exchange</span>
              </span>
              
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-primary leading-tight uppercase">
                Sartorial Seller Access
              </h2>
              
              <div className="bg-neutral-900 rounded-2xl p-4 border border-brand-border text-[11px] sm:text-xs text-brand-secondary leading-relaxed space-y-2">
                <p>
                  <strong>Why we are launching:</strong> To preserve academic excellence and simplify campus transitions, we are opening direct student listings soon. Senior students will be able to hand down high-standard, chapel-vetted ties to incoming freshmen.
                </p>
                <p className="flex items-center gap-1 text-brand-primary font-medium">
                  <Clock size={11} />
                  <span>Calibrating lobby drop-off verification protocols with Hall Counselors.</span>
                </p>
              </div>
            </div>

            {/* Waitlist Form */}
            <form onSubmit={handleSubmit} className="space-y-4" id="waitlist-form">
              <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-brand-secondary border-b border-brand-border/60 pb-1">
                Request Early Vendor Invitation
              </p>

              <div className="space-y-3">
                {/* Full Name */}
                <div>
                  <label className="block text-[9px] font-mono font-bold text-brand-secondary uppercase tracking-widest mb-1">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-secondary/60">
                      <User size={12} />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samuel Adebayo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-neutral-900 text-brand-primary text-xs rounded-full border border-neutral-800 focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 focus:outline-none transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Covenant Student Email */}
                <div>
                  <label className="block text-[9px] font-mono font-bold text-brand-secondary uppercase tracking-widest mb-1">
                    Covenant Student Email
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-secondary/60">
                      <Mail size={12} />
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="e.g. adebayo.samuel@stu.cu.edu.ng"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-neutral-900 text-brand-primary text-xs rounded-full border border-neutral-800 focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 focus:outline-none transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Residence Hall Selector */}
                  <div>
                    <label className="block text-[9px] font-mono font-bold text-brand-secondary uppercase tracking-widest mb-1">
                      Residence Hall
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-secondary/60">
                        <Home size={12} />
                      </span>
                      <select
                        value={selectedHall}
                        onChange={(e) => setSelectedHall(e.target.value)}
                        className="w-full pl-9 pr-8 py-2.5 bg-neutral-900 text-brand-primary text-xs rounded-full border border-neutral-800 focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 focus:outline-none transition-all font-sans cursor-pointer appearance-none"
                      >
                        {COVENANT_HALLS.map((hall) => (
                          <option key={hall} value={hall}>{hall}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Quantity to sell */}
                  <div>
                    <label className="block text-[9px] font-mono font-bold text-brand-secondary uppercase tracking-widest mb-1">
                      Est. Neckwear Count
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-secondary/60">
                        <ShoppingBag size={12} />
                      </span>
                      <select
                        value={estQuantity}
                        onChange={(e) => setEstQuantity(e.target.value)}
                        className="w-full pl-9 pr-8 py-2.5 bg-neutral-900 text-brand-primary text-xs rounded-full border border-neutral-800 focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 focus:outline-none transition-all font-sans cursor-pointer appearance-none"
                      >
                        <option value="1-3">1 to 3 Ties</option>
                        <option value="4-7">4 to 7 Ties</option>
                        <option value="8+">8+ Premium Ties</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Phone Number */}
                <div>
                  <label className="block text-[9px] font-mono font-bold text-brand-secondary uppercase tracking-widest mb-1">
                    WhatsApp Contact Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 08123456789"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-900 text-brand-primary text-xs rounded-full border border-neutral-800 focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 focus:outline-none transition-all font-sans"
                  />
                  <span className="text-[10px] text-brand-secondary mt-1 block font-sans">
                    Required for physical peer-to-peer validation of tie guidelines.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-brand-border/40 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-brand-secondary border border-brand-border rounded-full font-sans text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2.5 bg-[#F5F2EB] hover:bg-white text-black rounded-full font-mono tracking-wider text-[11px] uppercase font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 shadow-md disabled:opacity-50"
                  id="btn-seller-waitlist-submit"
                >
                  {isLoading ? 'Requesting...' : 'Request Invitation'}
                  <ArrowRight size={12} />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* SUCCESS STATE */
          <div className="text-center py-6 space-y-6" id="waitlist-success">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary mx-auto"
            >
              <CheckCircle size={32} strokeWidth={1.5} />
            </motion.div>

            <div className="space-y-2">
              <span className="inline-block text-[9px] font-mono tracking-widest text-brand-primary bg-neutral-900 px-3 py-1 rounded-full font-bold uppercase border border-brand-border/60">
                Lobby Queue Position Reserved
              </span>
              
              <h3 className="font-display font-bold text-2xl uppercase text-brand-primary">
                You're in Batch #1
              </h3>
              
              <p className="text-xs text-brand-secondary max-w-sm mx-auto leading-relaxed font-sans">
                Excellent, <strong>{fullName}</strong>. Your waitlist position has been secured for <strong>{selectedHall}</strong>. We've recorded your estimated inventory of {estQuantity} ties.
              </p>
            </div>

            <div className="bg-neutral-900 border border-brand-border/50 rounded-2xl p-4 text-left max-w-sm mx-auto text-[11px] font-mono text-brand-secondary space-y-1">
              <p className="font-bold text-brand-primary border-b border-brand-border/40 pb-1 mb-2 uppercase text-[9px] tracking-wider">
                Registration Coordinates
              </p>
              <p>Hostel lobby: <span className="text-brand-primary font-bold">{selectedHall}</span></p>
              <p>Email target: <span className="text-brand-primary font-bold">{studentEmail}</span></p>
              <p>Queue status: <span className="text-brand-primary font-bold">Priority Invitation Pending</span></p>
            </div>

            <p className="text-[10px] text-brand-secondary max-w-xs mx-auto">
              We will send confirmation keys directly to your student email once verification starts in your hall lobby.
            </p>

            <button
              onClick={handleReset}
              className="px-8 py-3 bg-[#F5F2EB] hover:bg-white text-black font-mono tracking-widest uppercase text-xs rounded-full transition-all duration-300 cursor-pointer font-bold shadow-md"
              id="btn-waitlist-success-close"
            >
              Return to Catalog
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
