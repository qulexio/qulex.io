import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '@clerk/clerk-react';
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
  Search,
  ArrowUpRight
} from 'lucide-react';
import { Agent } from '../types';
import { cn } from '../lib/utils';
import { useAgent } from '../hooks/useAgent';
import { SuccessModal } from './SuccessModal';

interface AgentCardProps {
  agent: Agent;
  onClick: (id: string) => void;
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
  const { userId } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDeploy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userId) {
      alert('Please log in to deploy agents.');
      return;
    }

    const result = await deployAgent(agent, userId);
    if (result.success) {
      setShowSuccess(true);
    } else {
      alert(`Deployment failed: ${result.error}`);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => onClick(agent.id)}
        className="group relative bg-[#09090b] border border-zinc-800 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/40"
      >
        <div className="space-y-5">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-[#10b981] group-hover:border-[#10b981]/20 transition-all duration-300">
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800">
              <Star className="w-2.5 h-2.5 text-yellow-500 fill-current" />
              <span className="text-[10px] font-bold text-zinc-400">{agent.rating || '4.9'}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-medium text-zinc-100 group-hover:text-[#10b981] transition-colors tracking-tight">{agent.name}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 min-h-[2.5rem]">
              {agent.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {agent.capabilities?.slice(0, 2).map((capability, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
                {capability}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-800/50 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">{agent.category}</span>
              <span className="text-xs font-bold text-[#10b981] mt-0.5">{agent.price}</span>
            </div>
            <button 
              onClick={handleDeploy}
              disabled={loading}
              className="px-4 py-1.5 rounded-lg bg-[#10b981] text-black text-[10px] font-bold uppercase tracking-widest hover:bg-[#059669] transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
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
        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto">
          <Cpu className="w-6 h-6 text-zinc-700" />
        </div>
        <p className="text-zinc-500 text-sm">No agents found matching your criteria.</p>
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
