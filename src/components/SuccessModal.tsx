import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X, ArrowRight } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
}

export function SuccessModal({ isOpen, onClose, agentName }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-brand/10 blur-[80px] -z-10" />
            
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-brand/20 flex items-center justify-center text-brand">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Deployment Successful</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  <span className="text-white font-bold">{agentName}</span> has been successfully deployed to your workforce. You can now start assigning tasks.
                </p>
              </div>

              <div className="w-full pt-4 space-y-3">
                <button 
                  onClick={onClose}
                  className="w-full py-4 bg-brand text-white rounded-xl font-bold text-sm hover:bg-brand-hover transition-all flex items-center justify-center gap-2 group"
                >
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={onClose}
                  className="w-full py-4 bg-white/5 border border-white/10 text-zinc-400 rounded-xl font-bold text-sm hover:bg-white/10 transition-all"
                >
                  Close
                </button>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
