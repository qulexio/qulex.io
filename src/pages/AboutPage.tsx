import React from 'react';
import { motion } from 'motion/react';
import { Bot, Target, Users, Zap, Globe, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Mission */}
        <div className="max-w-3xl mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-emerald-500 font-mono text-xs uppercase tracking-[0.3em] mb-6"
          >
            Our Mission
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-8"
          >
            We're building the <span className="text-emerald-500">AI Workforce</span> of the future.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-400 leading-relaxed"
          >
            At qulex.io, we believe that humans shouldn't spend their lives doing repetitive, operational tasks. Our goal is to provide every high-performance team with a fleet of specialized AI agents that handle the heavy lifting of GTM, Data, and Operations.
          </motion.p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-12 mb-32">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-500">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Operational Excellence</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              We don't just build "chatbots". We build autonomous agents that execute complex playbooks with precision and speed.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-500">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Trust & Security</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Enterprise-grade security is at our core. Your data is your own, and our agents operate within the strictest privacy boundaries.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-500">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Human-Centric AI</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Our agents are designed to augment human teams, not replace them. We empower people to focus on strategy and creativity.
            </p>
          </div>
        </div>

        {/* Team / Stats */}
        <div className="p-12 rounded-3xl border border-zinc-800 bg-zinc-900/30 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">The qulex.io Story</h2>
            <p className="text-zinc-400 leading-relaxed">
              Founded in 2024 by a team of engineers and operators from top tech companies, qulex.io was born out of the frustration of seeing talented teams buried in manual data entry and outreach.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Today, we power thousands of agents across the globe, helping companies scale their GTM results without scaling their headcount.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-center">
              <div className="text-3xl font-bold text-emerald-500">2024</div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-2">Founded</div>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-center">
              <div className="text-3xl font-bold text-emerald-500">50+</div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-2">Engineers</div>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-center">
              <div className="text-3xl font-bold text-emerald-500">12k+</div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-2">Active Agents</div>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-center">
              <div className="text-3xl font-bold text-emerald-500">99.9%</div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-2">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
