import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Star, 
  Cpu, 
  Zap, 
  Shield, 
  Globe, 
  Loader2,
  TrendingUp,
  MessageSquare,
  Settings,
  Code,
  Users,
  DollarSign,
  Search
} from 'lucide-react';
import { Agent } from '../types';
import { cn } from '../lib/utils';
import { useAgent } from '../hooks/useAgent';
import { SuccessModal } from './SuccessModal';
import { supabase } from '../lib/supabase';

interface AgentCardProps {
  agent: Agent;
  onClick: (id: string) => void;
  key?: string;
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

export function AgentCard({ agent, onClick }: AgentCardProps) {
  const Icon = CATEGORY_ICONS[agent.category] || CATEGORY_ICONS.Default;
  const { deployAgent, loading } = useAgent();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDeploy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('Please log in to deploy agents.');
      return;
    }

    const result = await deployAgent(agent, user.id);
    if (result.success) {
      setShowSuccess(true);
    } else {
      alert(`Deployment failed: ${result.error}`);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        onClick={() => onClick(agent.id)}
        className="group relative bg-zinc-900/40 border border-white/5 rounded-3xl p-6 cursor-pointer transition-all duration-500 hover:border-emerald-500/30 hover:bg-zinc-900/60"
      >
        {/* Glow Effect */}
        <div className="absolute -inset-[1px] bg-gradient-to-br from-emerald-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-md" />
        
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center text-zinc-500 group-hover:text-emerald-500 group-hover:border-emerald-500/20 transition-all duration-500 shadow-inner">
              <Icon className="w-7 h-7" />
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950 border border-white/10">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="text-[10px] font-bold text-zinc-300">{agent.rating || '4.9'}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-500 transition-colors tracking-tight">{agent.name}</h3>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3 min-h-[3rem]">
              {agent.description}
            </p>
          </div>

          {/* Capabilities */}
          <div className="flex flex-wrap gap-2">
            {agent.capabilities?.slice(0, 2).map((capability, idx) => (
              <div key={idx} className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-950 border border-white/5 text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
                {capability}
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600">{agent.category}</span>
              <span className="text-xs font-bold text-emerald-500 mt-0.5">{agent.price}</span>
            </div>
            <button 
              onClick={handleDeploy}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-400 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
            >
              {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
              Deploy
            </button>
          </div>
        </div>
      </motion.div>

      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        agentName={agent.name} 
      />
    </>
  );
}

export function MarketplaceGrid({ agents, onSelectAgent }: { agents: Agent[], onSelectAgent: (id: string) => void }) {
  if (agents.length === 0) {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
          <Cpu className="w-8 h-8 text-text-muted/30" />
        </div>
        <p className="text-text-muted">No agents found. Be the first to create one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} onClick={onSelectAgent} />
      ))}
    </div>
  );
}
