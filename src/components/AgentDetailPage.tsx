import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Shield, 
  Layers, 
  Globe, 
  Check, 
  Star, 
  Cpu, 
  Clock, 
  ArrowLeft,
  Share2,
  ExternalLink,
  Play,
  Loader2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Agent } from '../types';
import { getAgentById } from '../lib/database';

interface AgentDetailPageProps {
  agentId: string;
  onBack: () => void;
}

const CATEGORY_ICONS: Record<string, any> = {
  'Data Analysis': Cpu,
  'Creative Design': Zap,
  'Security': Shield,
  'Global Ops': Globe,
  'Default': Cpu
};

export default function AgentDetailPage({ agentId, onBack }: AgentDetailPageProps) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAgent = async () => {
      const data = await getAgentById(agentId);
      setAgent(data);
      setLoading(false);
    };
    loadAgent();
  }, [agentId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-brand animate-spin" />
        <p className="text-sm text-text-muted">Loading agent details...</p>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center p-6">
        <h2 className="text-2xl font-bold text-text-heading">Agent not found</h2>
        <p className="text-text-muted">The agent you are looking for might have been removed or the link is invalid.</p>
        <button onClick={onBack} className="text-brand hover:underline mt-4">Go back to Marketplace</button>
      </div>
    );
  }

  const Icon = CATEGORY_ICONS[agent.category] || CATEGORY_ICONS.Default;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-text-muted hover:text-text-heading transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Back to Marketplace</span>
        </button>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg border border-border hover:bg-white/5 transition-colors">
            <Share2 className="w-4 h-4 text-text-muted" />
          </button>
          <button className="p-2 rounded-lg border border-border hover:bg-white/5 transition-colors">
            <ExternalLink className="w-4 h-4 text-text-muted" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Content */}
        <div className="lg:col-span-2 space-y-16">
          {/* Hero Header */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-bold uppercase tracking-wider">
                Verified
              </span>
              <span className="text-text-muted text-sm flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                {agent.rating} (1.2k reviews)
              </span>
            </div>
            <h1 className="text-5xl font-bold text-text-heading tracking-tight leading-tight">
              {agent.name}
            </h1>
            <p className="text-xl text-text-muted max-w-2xl leading-relaxed">
              {agent.description.split('.')[0]}.
            </p>
          </div>

          {/* Visual Preview */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand/20 to-purple-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative aspect-video rounded-2xl border border-border bg-card overflow-hidden">
              <img 
                src={agent.image_url || `https://picsum.photos/seed/${agent.id}/1200/800`} 
                alt={agent.name}
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                <button className="w-16 h-16 rounded-full bg-brand flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
                  <Play className="w-6 h-6 text-white fill-white ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-text-heading">Overview</h2>
            <p className="text-text-muted leading-relaxed text-lg">
              {agent.description}
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-text-heading">Key Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Real-time Processing', icon: Zap, description: 'Processes data streams with sub-second latency for instant insights.' },
                { title: 'Multi-model Support', icon: Layers, description: 'Seamlessly switches between top-tier LLMs based on task complexity.' },
                { title: 'Secure Encryption', icon: Shield, description: 'Enterprise-grade AES-256 encryption for all data at rest and in transit.' },
                { title: 'Global Deployment', icon: Globe, description: 'Deploy to 20+ regions with a single click for low-latency access worldwide.' }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-2xl border border-border bg-card/30 space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-brand" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-text-heading">{feature.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specs */}
          <div className="p-8 rounded-2xl border border-border bg-card/30 space-y-8">
            <h2 className="text-2xl font-semibold text-text-heading flex items-center gap-2">
              <Cpu className="w-6 h-6 text-brand" />
              Technical Specifications
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-2">
                <p className="text-xs text-text-muted uppercase tracking-wider font-medium">Category</p>
                <p className="text-sm text-text-heading font-medium">{agent.category}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-text-muted uppercase tracking-wider font-medium">Latency</p>
                <p className="text-sm text-text-heading font-medium">&lt; 200ms</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-text-muted uppercase tracking-wider font-medium">Context</p>
                <p className="text-sm text-text-heading font-medium">128k tokens</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-text-muted uppercase tracking-wider font-medium">Updated</p>
                <p className="text-sm text-text-heading font-medium">Recently</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Sidebar */}
        <div className="space-y-8">
          <div className="sticky top-24 space-y-6">
            {/* Pricing Card */}
            <div className="glass-card p-8 rounded-2xl space-y-8">
              <div className="space-y-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-text-heading">${agent.price}</span>
                  <span className="text-text-muted">/month</span>
                </div>
                <p className="text-sm text-text-muted">Cancel anytime. No hidden fees.</p>
              </div>

              <button className="w-full py-4 rounded-xl bg-brand text-white font-bold text-lg glow-button">
                Get Started Now
              </button>

              <div className="space-y-4">
                <p className="text-sm font-semibold text-text-heading uppercase tracking-wider">What's included</p>
                <ul className="space-y-3">
                  {[
                    'Unlimited data processing',
                    'Priority API access',
                    'Custom model fine-tuning',
                    '24/7 Dedicated support',
                    'Advanced analytics dashboard'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                      <Check className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-border/50">
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <Clock className="w-3 h-3" />
                  <span>Setup takes less than 2 minutes</span>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="p-6 rounded-2xl border border-border bg-white/[0.02] text-center space-y-4">
              <p className="text-sm text-text-muted">Need a custom solution?</p>
              <button className="text-sm font-semibold text-brand hover:underline">
                Contact Enterprise Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
