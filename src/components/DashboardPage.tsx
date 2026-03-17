import React from 'react';
import { motion } from 'motion/react';
import { useUser } from '@clerk/clerk-react';
import { 
  Plus, 
  Activity, 
  Zap, 
  Cpu, 
  Shield, 
  Globe, 
  MoreHorizontal,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { cn } from '../lib/utils';
import ActivityFeed from './ActivityFeed';

const STATS = [
  { label: 'Tasks Completed', value: '1,284', trend: '+12%' },
  { label: 'API Requests', value: '42.5k', trend: '+5.2%' },
  { label: 'Active Runtime', value: '164h', trend: 'Stable' },
  { label: 'Avg. Latency', value: '124ms', trend: '-18ms' },
];

const ACTIVE_AGENTS = [
  {
    id: '1',
    name: 'RevenueFlow',
    status: 'active',
    task: 'Processing lead generation for Q2 campaign',
    icon: Zap,
    lastActive: '2m ago'
  },
  {
    id: '2',
    name: 'Nexus-7',
    status: 'idle',
    task: 'Waiting for scheduled data sync',
    icon: Cpu,
    lastActive: '15m ago'
  },
  {
    id: '3',
    name: 'Sentinel',
    status: 'error',
    task: 'Connection timeout on secondary node',
    icon: Shield,
    lastActive: '1h ago'
  }
];

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-4">
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-medium text-zinc-100 tracking-tight">
            Good afternoon, {user?.firstName || 'User'}
          </h1>
          <p className="text-zinc-400 text-sm">
            Your autonomous agents are currently performing at peak efficiency.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-black font-semibold rounded-lg text-sm transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <Plus className="w-4 h-4" />
          Deploy New Agent
        </button>
      </section>

      {/* Performance Metrics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 rounded-xl overflow-hidden">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="bg-[#09090b] p-6 space-y-2">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-medium text-zinc-100 tracking-tight">{stat.value}</h3>
              <span className={cn(
                "text-[10px] font-medium",
                stat.trend.startsWith('+') ? "text-[#10b981]" : 
                stat.trend.startsWith('-') ? "text-blue-400" : "text-zinc-500"
              )}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Active Agents Overview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-semibold text-zinc-100 flex items-center gap-2 uppercase tracking-widest">
            <Activity className="w-4 h-4 text-[#10b981]" />
            Active Agents
          </h2>
          <button className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1">
            View all
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/20">
          {ACTIVE_AGENTS.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group flex items-center justify-between p-4 border-b border-zinc-800 last:border-0 hover:bg-white/[0.02] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-zinc-700 transition-colors">
                  <agent.icon className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-zinc-100">{agent.name}</h4>
                    <div className="flex items-center gap-1.5">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        agent.status === 'active' ? "bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.5)]" :
                        agent.status === 'idle' ? "bg-zinc-500" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                      )} />
                      <span className="text-[10px] text-zinc-500 capitalize">{agent.status}</span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 truncate max-w-[200px] md:max-w-md">
                    {agent.task}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="hidden md:block text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
                  Last active: {agent.lastActive}
                </span>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all">
                    Details
                  </button>
                  <button className="p-1 text-zinc-600 hover:text-red-400 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom Grid: Activity & Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Recent Activity */}
        <section className="md:col-span-2 space-y-6">
          <h2 className="text-sm font-semibold text-zinc-100 flex items-center gap-2 uppercase tracking-widest px-1">
            <Clock className="w-4 h-4 text-zinc-500" />
            Recent Activity
          </h2>
          <div className="px-1">
            <ActivityFeed />
          </div>
        </section>

        {/* Quick Access */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-zinc-100 flex items-center gap-2 uppercase tracking-widest px-1">
            <Globe className="w-4 h-4 text-zinc-500" />
            Resources
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {[
              { label: 'API Documentation', link: '#' },
              { label: 'Agent Templates', link: '#' },
              { label: 'Community Hub', link: '#' },
              { label: 'System Status', link: '#' },
            ].map((resource) => (
              <a 
                key={resource.label}
                href={resource.link}
                className="group flex items-center justify-between p-3 rounded-lg border border-zinc-800 hover:border-zinc-700 hover:bg-white/[0.02] transition-all"
              >
                <span className="text-xs text-zinc-400 group-hover:text-zinc-100 transition-colors">{resource.label}</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-600 group-hover:text-[#10b981] transition-colors" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
