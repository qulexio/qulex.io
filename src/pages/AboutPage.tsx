import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Shield, 
  Cpu, 
  Globe, 
  Layers, 
  Lock, 
  ArrowRight,
  Compass,
  Lightbulb,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-500">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest mb-8"
            >
              <Activity className="w-3 h-3" />
              The Vision
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.85] mb-10"
            >
              Engineering the <br />
              <span className="text-zinc-500">Autonomous Future.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed"
            >
              Qulex is decentralizing AI agency, empowering every individual and enterprise to deploy a high-performance digital workforce in seconds.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-32 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <div className="space-y-6">
              <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-[0.3em]">Our Mission</h2>
              <p className="text-3xl font-medium text-zinc-100 leading-tight">
                We build for the creators, the founders, and the visionaries who refuse to be slowed down by operational friction.
              </p>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Qulex.io is engineered to handle the mundane, high-volume tasks that stifle innovation. By offloading execution to autonomous agents, we enable humans to focus on what they do best: high-level strategy and creative problem-solving.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {[
                { icon: Compass, title: 'Autonomy', desc: 'Agents that think, act, and learn without constant supervision.' },
                { icon: Lightbulb, title: 'Accessibility', desc: 'Powerful AI agency made simple enough for anyone to deploy.' },
                { icon: Cpu, title: 'Intelligence', desc: 'Neural-grade reasoning applied to real-world business logic.' },
              ].map((pillar, i) => (
                <motion.div 
                  key={pillar.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 p-6 rounded-3xl bg-zinc-900/20 border border-zinc-800/50"
                >
                  <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-emerald-500 shrink-0">
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-medium text-zinc-100">{pillar.title}</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed">{pillar.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Technology */}
      <section className="py-32 bg-zinc-950/50 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-[0.3em]">The Stack</h2>
            <h3 className="text-4xl font-bold text-white tracking-tight">Built for the next decade of AI.</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Neural Orchestration', 
                desc: 'Our proprietary engine coordinates multiple LLMs to ensure the highest accuracy for every specific task.',
                icon: Layers
              },
              { 
                title: 'Real-time API Integration', 
                desc: 'Seamlessly connect with your existing tools. Our agents speak the language of the modern web natively.',
                icon: Globe
              },
              { 
                title: 'Secure Data Silos', 
                desc: 'Your data never leaves your environment. We use enterprise-grade isolation for every agent deployment.',
                icon: Lock
              },
            ].map((tech, i) => (
              <div key={tech.title} className="p-10 rounded-[2.5rem] bg-[#09090b] border border-zinc-800 space-y-6 group hover:border-zinc-700 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                  <tech.icon className="w-7 h-7" />
                </div>
                <div className="space-y-3">
                  <h4 className="text-xl font-bold text-white">{tech.title}</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Qulex? */}
      <section className="py-32 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-[0.3em]">Value Proposition</h2>
              <h3 className="text-5xl font-bold text-white tracking-tighter">Why Qulex?</h3>
            </div>
            <p className="text-zinc-500 max-w-md text-right">
              We've optimized every layer of the agent lifecycle to provide a seamless experience from deployment to scale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800 rounded-3xl overflow-hidden">
            {[
              { title: 'Speed', val: 'Seconds', desc: 'Deploy specialized agents in the time it takes to write a prompt.' },
              { title: 'Scale', val: '1 to 1,000', desc: 'Scale your workforce horizontally without increasing operational overhead.' },
              { title: 'Security', val: 'Enterprise', desc: 'End-to-end encryption and SOC2-ready infrastructure by default.' },
            ].map((item) => (
              <div key={item.title} className="bg-[#09090b] p-12 space-y-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em]">{item.title}</p>
                  <p className="text-3xl font-bold text-white tracking-tight">{item.val}</p>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Culture */}
      <section className="py-32 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-[0.3em]">The Team</h2>
              <h3 className="text-4xl font-bold text-white tracking-tight">Built by innovators in London.</h3>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Qulex was founded by a group of engineers and product designers who saw the potential for AI to do more than just answer questions. We believe in a "Remote-first, Intelligence-always" mindset, attracting the best talent from around the globe to solve the hardest problems in autonomy.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#09090b] bg-zinc-800" />
                  ))}
                </div>
                <span className="text-sm text-zinc-500 font-medium">Join 20+ world-class engineers</span>
              </div>
            </div>
            <div className="aspect-square rounded-[3rem] bg-zinc-900 border border-zinc-800 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="w-32 h-32 text-zinc-800 group-hover:text-emerald-500/20 transition-colors duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-[3rem] overflow-hidden border border-emerald-500/20 bg-emerald-500/5 p-20 text-center space-y-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent opacity-50" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">Ready to meet your first agent?</h2>
              <p className="text-zinc-400 max-w-xl mx-auto text-lg">
                Join thousands of high-performance teams already using Qulex to automate their future.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <Link 
                  to="/marketplace" 
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 text-black font-bold text-sm hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                >
                  Explore Marketplace
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/docs" 
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-bold text-sm hover:bg-zinc-800 transition-all"
                >
                  Read Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Micro-details */}
      <footer className="py-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center">
              <Zap className="w-3 h-3 text-black" />
            </div>
            <span className="text-sm font-bold text-white tracking-tight">qulex.io</span>
          </div>
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono">
            © 2026 QULEX TECHNOLOGIES LTD. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
