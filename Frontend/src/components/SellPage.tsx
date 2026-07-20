import React from 'react';
import { motion } from 'motion/react';

export default function SellPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 md:py-32 text-center flex flex-col items-center justify-center min-h-[60vh]" id="sell-page-root">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-8"
      >
        <h1 className="font-display font-light text-6xl sm:text-8xl md:text-9xl text-brand-primary tracking-tight leading-none select-none">
          COMING <br />
          <span className="italic font-normal text-neutral-400">SOON</span>
        </h1>
        
        <p className="font-sans text-xs sm:text-sm md:text-base text-brand-secondary max-w-lg mx-auto leading-relaxed font-light">
          We are finalizing direct peer-to-peer lobby handoff integrations in Covenant University hostels. Soon, you'll be able to clear your wardrobe of excess official neckwear, list them securely, and hand them down to junior students.
        </p>

        <div className="pt-8 flex flex-col items-center gap-4">
          <div className="h-px w-16 bg-brand-primary/30" />
          <span className="font-mono text-[9px] tracking-[0.2em] text-brand-secondary uppercase">
            Preserving the Sartorial Standard
          </span>
        </div>
      </motion.div>
    </div>
  );
}
