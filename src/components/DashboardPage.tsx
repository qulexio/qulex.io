import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  Rocket, 
  ArrowUpRight,
  Plus,
  Zap,
  Shield,
  Globe,
  Cpu
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';

const SAMPLE_AGENTS = [
  {
    id: 1,
    name: 'Nexus-7',
    category: 'Data Analysis',
    icon: Cpu,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    description: 'Advanced pattern recognition and data synthesis agent.'
  },
  {
    id: 2,
    name: 'Aura-1',
    category: 'Creative Design',
    icon: Zap,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    description: 'Generative design assistant for modern UI/UX workflows.'
  },
  {
    id: 3,
    name: 'Sentinel',
    category: 'Security',
    icon: Shield,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    description: 'Real-time threat detection and automated response system.'
  },
  {
    id: 4,
    name: 'Atlas',
    category: 'Global Ops',
    icon: Globe,
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    description: 'Logistics and supply chain optimization specialist.'
  }
];

import { Profile } from '../types';

export default function DashboardPage({ profile }: { profile: Profile | null }) {
  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-text-heading tracking-tight">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'Guest'}
          </h1>
          <p className="text-text-muted">
            Here's what's happening with your agents today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-text-muted bg-white/5 px-3 py-1.5 rounded-lg border border-border">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          System Online
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Agents', value: '12', icon: Users, trend: '+2 this week' },
          { label: 'Total Spent/Earned', value: '$4,280.50', icon: CreditCard, trend: '+$840.00' },
          { label: 'Account Status', value: 'Pro Tier', icon: TrendingUp, trend: 'Active' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl border border-border bg-card/50 hover:border-brand/50 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-white/5 text-text-muted group-hover:text-brand transition-colors">
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                {stat.trend}
              </span>
            </div>
            <p className="text-sm text-text-muted font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-text-heading mt-1 tracking-tight">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Discovery Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-heading flex items-center gap-2">
            <Rocket className="w-5 h-5 text-brand" />
            Discover Agents
          </h2>
          <button className="text-sm text-brand hover:text-brand-hover font-medium transition-colors flex items-center gap-1">
            View Marketplace
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_AGENTS.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="glass-card p-6 rounded-2xl flex flex-col h-full group cursor-pointer"
            >
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300", agent.bg)}>
                <agent.icon className={cn("w-6 h-6", agent.color)} />
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-text-heading">{agent.name}</h3>
                  <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">{agent.category}</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {agent.description}
                </p>
              </div>

              <button className="mt-6 w-full py-2 rounded-lg bg-white/5 border border-border text-text-heading text-sm font-semibold hover:bg-brand hover:border-brand transition-all duration-300 flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Deploy
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Activity Section (Extra for completeness) */}
      <div className="p-8 rounded-2xl border border-border bg-card/30">
        <h3 className="text-lg font-semibold text-text-heading mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Nexus-7 deployed', time: '2 hours ago', status: 'Success' },
            { action: 'Credits topped up', time: '5 hours ago', status: 'Completed' },
            { action: 'Sentinel updated', time: '1 day ago', status: 'Success' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand" />
                <span className="text-sm text-text-heading font-medium">{item.action}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-text-muted">{item.time}</span>
                <span className="text-[10px] font-mono text-emerald-400">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
