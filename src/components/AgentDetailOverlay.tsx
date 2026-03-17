import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Check, 
  Zap, 
  Shield, 
  Clock, 
  ArrowRight, 
  Loader2,
  Cpu,
  Globe,
  MessageSquare,
  TrendingUp,
  Settings,
  Code,
  Users,
  DollarSign,
  Search
} from 'lucide-react';
import { Agent } from '../types';
import { cn } from '../lib/utils';

interface AgentDetailOverlayProps {
  agent: Agent | null;
  isOpen: boolean;
  onClose: () => void;
  onDeploy: (agent: Agent) => Promise<void>;
}

const CATEGORY_ICONS: Record<string, any> = {
  'Sales': TrendingUp,
  'Marketing': Zap,
  'Customer Support': MessageSquare,
  'Operations': Settings,
  'Engineering': Code,
  'HR': Users,
  'Finance': DollarSign,
  'Strategy': Search,
  'Default': Cpu
};

export default function AgentDetailOverlay({ agent, isOpen, onClose, onDeploy }: AgentDetailOverlayProps) {
  const [loading, setLoading] = useState(false);

  if (!agent) return null;

  const Icon = CATEGORY_ICONS[agent.category] || CATEGORY_ICONS.Default;

  const handleGetStarted = async () => {
    setLoading(true);
    // Simulate a bit of loading for effect as requested
    await new Promise(resolve => setTimeout(resolve, 1500));
    await onDeploy(agent);
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Visuals & Header */}
            <div className="w-full md:w-2/5 bg-zinc-900/50 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-800">
              <div className="space-y-8">
                <div className="w-20 h-20 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[#10b981] shadow-inner">
                  <Icon className="w-10 h-10" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#10b981]/10 text-[#10b981] text-[10px] font-bold uppercase tracking-widest border border-[#10b981]/20">
                      {agent.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                      v2.4.0
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-tight leading-tight">{agent.name}</h2>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {agent.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Success Rate</p>
                    <p className="text-xl font-bold text-white tracking-tight">99.2%</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Total Runs</p>
                    <p className="text-xl font-bold text-white tracking-tight">12.4k</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 md:pt-0">
                <div className="p-6 rounded-2xl bg-[#10b981]/5 border border-[#10b981]/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-zinc-400">Pricing Summary</p>
                    <p className="text-xl font-bold text-[#10b981]">{agent.price}</p>
                  </div>
                  <button
                    onClick={handleGetStarted}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#10b981] text-black font-bold text-sm hover:bg-[#059669] transition-all disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                    Get Started Now
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side: Details */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12 no-scrollbar">
              {/* How it works */}
              <section className="space-y-6">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-[0.2em]">How it works</h3>
                <div className="space-y-6">
                  {[
                    { step: '01', title: 'Connect your data sources', desc: 'Securely link your CRM, social media, or database.' },
                    { step: '02', title: 'Configure agent parameters', desc: 'Define goals, constraints, and operational windows.' },
                    { step: '03', title: 'Launch autonomous workflows', desc: 'The agent begins processing tasks 24/7 with human-in-the-loop options.' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6 group">
                      <span className="text-2xl font-bold text-zinc-800 group-hover:text-[#10b981] transition-colors duration-500">{item.step}</span>
                      <div className="space-y-1">
                        <h4 className="text-base font-medium text-zinc-100">{item.title}</h4>
                        <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Capabilities */}
              <section className="space-y-6">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-[0.2em]">Core Capabilities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {agent.capabilities?.map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800 group hover:border-zinc-700 transition-all">
                      <div className="w-6 h-6 rounded-full bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{cap}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Integrations */}
              <section className="space-y-6">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-[0.2em]">Integrations</h3>
                <div className="flex flex-wrap gap-3">
                  {['OpenAI', 'Twitter', 'Supabase', 'Stripe', 'Slack'].map((api) => (
                    <div key={api} className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                      {api}
                    </div>
                  ))}
                </div>
              </section>

              {/* Trust Section */}
              <section className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center gap-6">
                <div className="p-3 rounded-xl bg-[#10b981]/10">
                  <Shield className="w-6 h-6 text-[#10b981]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-zinc-100">Enterprise Grade Security</h4>
                  <p className="text-xs text-zinc-500">All data is encrypted at rest and in transit. SOC2 Type II compliant infrastructure.</p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
