import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Loader2, 
  ArrowRight, 
  Tag, 
  Users, 
  Star, 
  ChevronDown, 
  Zap, 
  Shield, 
  Clock,
  Plus,
  Cpu,
  DollarSign
} from 'lucide-react';
import { MarketplaceGrid } from '../components/MarketplaceGrid';
import AgentDetailOverlay from '../components/AgentDetailOverlay';
import { fetchAgents, subscribeToNewAgents } from '../lib/database';
import { Agent } from '../types';
import { cn } from '../lib/utils';
import { ORIGINAL_AGENTS } from '../constants/agents';
import { useAgent } from '../hooks/useAgent';
import { useAuth } from '@clerk/clerk-react';

const CATEGORIES = [
  'All', 
  'Social Media',
  'Automation',
  'E-commerce',
  'Sales', 
  'Marketing', 
  'Customer Support', 
  'Operations', 
  'Engineering', 
];

const FAQ_ITEMS = [
  {
    q: "How do I connect my own API keys?",
    a: "You can securely add your API keys in the Settings panel. We support OpenAI, Anthropic, Twitter, and more. Your keys are encrypted at rest."
  },
  {
    q: "Can I customize the agent's behavior?",
    a: "Yes, every agent comes with a configuration panel where you can define specific goals, tone of voice, and operational constraints."
  },
  {
    q: "What happens if an agent makes a mistake?",
    a: "You can enable 'Human-in-the-loop' mode, which requires your approval before the agent executes any critical external actions."
  }
];

export default function MarketplacePage({ onSelectAgent }: { onSelectAgent: (id: string) => void }) {
  const [dbAgents, setDbAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { deployAgent } = useAgent();
  const { userId } = useAuth();

  useEffect(() => {
    const loadAgents = async () => {
      const data = await fetchAgents();
      setDbAgents(data);
      setLoading(false);
    };

    loadAgents();

    const subscription = subscribeToNewAgents((newAgent) => {
      setDbAgents((prev) => [newAgent, ...prev]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSelectAgent = (id: string) => {
    const agent = allAgents.find(a => a.id === id);
    if (agent) {
      setSelectedAgent(agent);
      setIsOverlayOpen(true);
    }
  };

  const handleDeploy = async (agent: Agent) => {
    if (!userId) {
      onSelectAgent(agent.id); // Trigger auth flow
      return;
    }
    const result = await deployAgent(agent, userId);
    if (result.success) {
      setIsOverlayOpen(false);
    } else {
      alert(`Deployment failed: ${result.error}`);
    }
  };

  // Merge original agents with database agents
  const allAgents = [...ORIGINAL_AGENTS, ...dbAgents];

  const filteredAgents = allAgents.filter(agent => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = agent.name.toLowerCase().includes(searchLower) ||
                          agent.description.toLowerCase().includes(searchLower) ||
                          agent.category.toLowerCase().includes(searchLower) ||
                          agent.capabilities?.some(cap => cap.toLowerCase().includes(searchLower));
    const matchesCategory = selectedCategory === 'All' || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      {/* Hero Section - Modern Marketplace Style */}
      <div className="relative rounded-[2.5rem] overflow-hidden border border-zinc-800 bg-zinc-900/20 p-12 md:p-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/10 via-transparent to-purple-500/5" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#10b981]/10 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-3xl space-y-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-[10px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            The Agent Store
          </div>
          
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[0.85]">
              HIRE YOUR NEXT <br />
              <span className="text-[#10b981]">AI WORKFORCE</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-xl leading-relaxed">
              Discover specialized AI agents built by experts. Automate your GTM, Ops, and Engineering playbooks in minutes.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 pt-4">
            <div className="flex items-center gap-3 text-zinc-400 text-sm font-medium">
              <Users className="w-5 h-5 text-[#10b981]" />
              <span>10k+ Active Agents</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400 text-sm font-medium">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>4.9/5 Avg. Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="sticky top-16 z-30 bg-[#09090b]/80 backdrop-blur-md py-6 -mx-6 px-6 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8">
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-[#10b981] transition-colors" />
            <input 
              type="text"
              placeholder="Search by role, tool, or capability..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#10b981]/50 transition-all placeholder:text-zinc-700"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border",
                  selectedCategory === cat 
                    ? "bg-[#10b981] border-[#10b981] text-black" 
                    : "bg-zinc-900/50 text-zinc-500 hover:text-zinc-300 border-zinc-800 hover:bg-zinc-900"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="space-y-10">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
            <Tag className="w-5 h-5 text-[#10b981]" />
            {selectedCategory === 'All' ? 'Featured Agents' : `${selectedCategory} Agents`}
          </h2>
          <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">{filteredAgents.length} results found</span>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-8 h-8 text-[#10b981] animate-spin" />
            <p className="text-sm text-zinc-500 font-mono uppercase tracking-widest">Initializing Marketplace...</p>
          </div>
        ) : (
          <MarketplaceGrid agents={filteredAgents} onSelectAgent={handleSelectAgent} />
        )}
      </div>

      {/* Why Qulex Agents? */}
      <section className="py-20 border-t border-zinc-900">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold text-white tracking-tight">Why Qulex Agents?</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">Built on top of world-class infrastructure to ensure your business never stops moving.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: 'High Speed', desc: 'Sub-second latency for real-time decision making and task execution.' },
            { icon: DollarSign, title: 'Low Cost', desc: 'Optimized token usage and efficient workflows to minimize operational overhead.' },
            { icon: Clock, title: '24/7 Autonomy', desc: 'Agents that never sleep, monitoring your business and taking action around the clock.' },
          ].map((feature, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-zinc-900/20 border border-zinc-800 space-y-4 group hover:border-zinc-700 transition-all">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#10b981] group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-white">{feature.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-zinc-900 max-w-3xl mx-auto w-full">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-zinc-800 bg-zinc-900/20 overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-800/30 transition-colors"
              >
                <span className="text-sm font-medium text-zinc-200">{item.q}</span>
                <ChevronDown className={cn("w-4 h-4 text-zinc-500 transition-transform", openFaq === idx && "rotate-180")} />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-sm text-zinc-500 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="rounded-[2.5rem] border border-[#10b981]/20 bg-[#10b981]/5 p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#10b981]/10 via-transparent to-transparent opacity-50" />
        <div className="relative z-10 space-y-6">
          <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Can't find what you're looking for?</h3>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg">
            Our team can build custom agents tailored to your specific business processes and toolstack.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#10b981] text-black font-bold text-sm hover:bg-[#059669] transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            Request Custom Agent
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Detail Overlay */}
      <AgentDetailOverlay 
        agent={selectedAgent}
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        onDeploy={handleDeploy}
      />
    </div>
  );
}
