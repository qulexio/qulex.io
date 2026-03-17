import React, { useState, useEffect } from 'react';
import { Search, Filter, Sparkles, Loader2, ArrowRight, Tag, Users, Star } from 'lucide-react';
import { MarketplaceGrid } from '../components/MarketplaceGrid';
import { fetchAgents, subscribeToNewAgents } from '../lib/database';
import { Agent } from '../types';
import { cn } from '../lib/utils';
import { ORIGINAL_AGENTS } from '../constants/agents';

const CATEGORIES = [
  'All', 
  'Sales', 
  'Marketing', 
  'Customer Support', 
  'Operations', 
  'Engineering', 
  'HR', 
  'Finance',
  'Strategy'
];

export default function MarketplacePage({ onSelectAgent }: { onSelectAgent: (id: string) => void }) {
  const [dbAgents, setDbAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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
      <div className="relative rounded-[2rem] overflow-hidden border border-white/5 bg-zinc-900/20 p-12 md:p-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/5" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            The Agent Store
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[0.9]">
              HIRE YOUR NEXT <br />
              <span className="text-emerald-500">AI WORKFORCE</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-xl leading-relaxed">
              Discover specialized AI agents built by experts. Automate your GTM, Ops, and Engineering playbooks in minutes.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <Users className="w-4 h-4" />
              <span>10k+ Active Agents</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-zinc-800 self-center" />
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>4.9/5 Avg. Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="sticky top-24 z-30 bg-[#09090b]/80 backdrop-blur-md py-4 -mx-6 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search by role, tool, or capability..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-600"
            />
          </div>
          
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border",
                  selectedCategory === cat 
                    ? "bg-emerald-500 border-emerald-500 text-black" 
                    : "bg-zinc-900/50 text-zinc-500 hover:text-zinc-300 border-white/5 hover:bg-zinc-900"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <Tag className="w-5 h-5 text-emerald-500" />
            {selectedCategory === 'All' ? 'Featured Agents' : `${selectedCategory} Agents`}
          </h2>
          <span className="text-sm text-zinc-500">{filteredAgents.length} results found</span>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            <p className="text-sm text-zinc-500 font-mono uppercase tracking-widest">Initializing Marketplace...</p>
          </div>
        ) : (
          <MarketplaceGrid agents={filteredAgents} onSelectAgent={onSelectAgent} />
        )}
      </div>

      {/* Bottom CTA */}
      <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-12 text-center space-y-6">
        <h3 className="text-2xl font-bold text-white">Can't find what you're looking for?</h3>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Our team can build custom agents tailored to your specific business processes and toolstack.
        </p>
        <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 text-black font-bold text-sm hover:bg-emerald-400 transition-all">
          Request Custom Agent
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
