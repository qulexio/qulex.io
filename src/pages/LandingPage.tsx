import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Bot, 
  Zap, 
  Shield, 
  Users, 
  BarChart3,
  Globe,
  Menu,
  X,
  Play,
  CheckCircle2,
  Cpu,
  Layers,
  Target,
  MessageSquare,
  Search,
  Database,
  Terminal,
  Activity,
  Settings
} from 'lucide-react';
import { cn } from '../lib/utils';

const LOGOS = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1200px-IBM_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1200px-LinkedIn_Logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1200px-Microsoft_logo_%282012%29.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png"
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Define the Playbook",
    desc: "Describe your workflow in plain English or upload your SOPs. Our engine translates them into executable agent logic.",
    icon: <Cpu className="w-6 h-6" />
  },
  {
    step: "02",
    title: "Connect your Stack",
    desc: "Securely link your CRM, Slack, and 200+ enterprise apps. Agents use these tools just like a human team member would.",
    icon: <Layers className="w-6 h-6" />
  },
  {
    step: "03",
    title: "Deploy & Collaborate",
    desc: "Agents run 24/7, handling high-volume tasks autonomously and notifying you only when human judgment is required.",
    icon: <Zap className="w-6 h-6" />
  },
  {
    step: "04",
    title: "Learn & Optimize",
    desc: "Every interaction is logged and analyzed. Agents learn from your feedback, becoming more efficient with every task.",
    icon: <Target className="w-6 h-6" />
  }
];

const AGENT_SHOWCASE = [
  {
    name: "BDR Agent",
    role: "Sales Development",
    desc: "Researches prospects, verifies emails, and writes hyper-personalized outreach at scale.",
    impact: "3.5x Pipeline",
    tags: ["Salesforce", "LinkedIn", "Gmail"]
  },
  {
    name: "Research Agent",
    role: "Market Intelligence",
    desc: "Monitors competitors, synthesizes news, and provides daily actionable insights.",
    impact: "10x Faster",
    tags: ["Web Search", "PDFs", "Notion"]
  },
  {
    name: "Ops Agent",
    role: "Data Management",
    desc: "Cleans CRM data, enriches leads, and automates complex multi-step workflows.",
    impact: "99% Accuracy",
    tags: ["HubSpot", "Slack", "Zapier"]
  }
];

export default function LandingPage({ onAuth }: { onAuth: (mode: 'login' | 'signup') => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-emerald-500/30 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-3 font-bold text-xl tracking-tight group">
              <span className="text-xl font-bold text-zinc-100 tracking-tight">qulex.io</span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-500">
              <a href="#how-it-works" className="hover:text-zinc-100 transition-colors">How it works</a>
              <Link to="/marketplace" className="hover:text-zinc-100 transition-colors">Marketplace</Link>
              <Link to="/pricing" className="hover:text-zinc-100 transition-colors">Pricing</Link>
              <Link to="/about" className="hover:text-zinc-100 transition-colors">About</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => onAuth('login')}
              className="hidden sm:block text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-100 transition-colors"
            >
              Log in
            </button>
            <button 
              onClick={() => onAuth('signup')}
              className="px-6 py-3 bg-emerald-500 text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)] active:scale-95"
            >
              Get Started
            </button>
            <button 
              className="lg:hidden p-2 text-zinc-400 hover:text-zinc-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/5 bg-[#050505] p-6 space-y-6">
            <div className="grid gap-4">
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-zinc-400">How it works</a>
              <Link to="/marketplace" className="text-sm font-bold uppercase tracking-widest text-zinc-400">Marketplace</Link>
              <Link to="/pricing" className="text-sm font-bold uppercase tracking-widest text-zinc-400">Pricing</Link>
              <Link to="/about" className="text-sm font-bold uppercase tracking-widest text-zinc-400">About</Link>
            </div>
            <div className="pt-6 border-t border-white/5">
              <button 
                onClick={() => onAuth('login')}
                className="w-full py-3 text-center text-sm font-bold uppercase tracking-widest text-zinc-500"
              >
                Log in
              </button>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section - Editorial Style */}
        <section className="relative pt-40 pb-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center space-y-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] max-w-5xl mx-auto"
              >
                HIRE YOUR FIRST <br />
                <span className="text-emerald-500">AI WORKFORCE</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium"
              >
                Stop building tools. Start hiring agents. qulex.io provides specialized AI agents that execute your entire GTM and Ops playbooks on autopilot.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
              >
                <button 
                  onClick={() => onAuth('signup')}
                  className="w-full sm:w-auto px-10 py-5 bg-emerald-500 text-black rounded-full font-bold uppercase tracking-widest text-sm hover:bg-emerald-400 transition-all shadow-[0_10px_40px_rgba(16,185,129,0.3)] active:scale-95"
                >
                  Start Hiring Free
                </button>
                <button className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-zinc-100 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  <Play className="w-4 h-4 fill-current" />
                  Watch Demo
                </button>
              </motion.div>
            </div>

            {/* Hero Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-24 relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-purple-500/20 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000" />
              <div className="relative rounded-[2rem] border border-white/10 bg-[#0A0A0A] p-4 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
                <div className="rounded-2xl border border-white/5 bg-zinc-950 aspect-[16/8] flex items-center justify-center relative overflow-hidden">
                  {/* Mock Dashboard Elements */}
                  <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
                    <div className="flex gap-4">
                      <div className="w-32 h-8 rounded-lg bg-white/5 animate-pulse" />
                      <div className="w-24 h-8 rounded-lg bg-white/5 animate-pulse" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20" />
                  </div>
                  <div className="grid grid-cols-3 gap-8 w-full px-12">
                    <div className="h-40 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center">
                      <BarChart3 className="w-12 h-12 text-emerald-500/20" />
                    </div>
                    <div className="h-40 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center">
                      <Users className="w-12 h-12 text-emerald-500/20" />
                    </div>
                    <div className="h-40 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center">
                      <Zap className="w-12 h-12 text-emerald-500/20" />
                    </div>
                  </div>
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center space-y-2">
                    <p className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-600">Operational Intelligence Platform v2.0</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-20 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-12">
              Trusted by high-performance teams at
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all">
              {LOGOS.map((logo, i) => (
                <img key={i} src={logo} alt="Partner" className="h-6 md:h-8 object-contain" referrerPolicy="no-referrer" />
              ))}
            </div>
          </div>
        </section>

        {/* How it Works - Brutalist Style */}
        <section id="how-it-works" className="py-32 bg-[#050505]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-12">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                    FROM PLAYBOOK TO <br />
                    <span className="text-emerald-500">PRODUCTION</span>
                  </h2>
                  <p className="text-zinc-400 text-lg max-w-md">
                    Deploying an AI workforce shouldn't be a project. With qulex.io, it's a 3-step process.
                  </p>
                </div>
                
                <div className="space-y-12">
                  {WORKFLOW_STEPS.map((step, i) => (
                    <div key={i} className="flex gap-8 group">
                      <div className="text-5xl font-bold text-white/5 group-hover:text-emerald-500/20 transition-colors duration-500">
                        {step.step}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-zinc-100">{step.title}</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-3xl border border-white/10 bg-zinc-900/30 p-4 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-50" />
                  
                  {/* Mock Agent Interface */}
                  <div className="relative h-full flex flex-col bg-zinc-950 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Agent: BDR_Outreach_v4</span>
                      </div>
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-white/5" />
                        <div className="w-2 h-2 rounded-full bg-white/5" />
                        <div className="w-2 h-2 rounded-full bg-white/5" />
                      </div>
                    </div>

                    {/* Playbook Steps */}
                    <div className="flex-1 p-4 space-y-3 overflow-hidden">
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                        <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                          <Search className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-bold text-zinc-300">Researching Prospect</div>
                          <div className="h-1 w-full bg-zinc-900 rounded-full mt-1.5 overflow-hidden">
                            <motion.div 
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="h-full bg-emerald-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/5 opacity-50">
                        <div className="w-6 h-6 rounded bg-zinc-900 flex items-center justify-center text-zinc-500">
                          <Database className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-bold text-zinc-500">Enriching CRM Data</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/5 opacity-50">
                        <div className="w-6 h-6 rounded bg-zinc-900 flex items-center justify-center text-zinc-500">
                          <MessageSquare className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-bold text-zinc-500">Drafting Personalized Email</div>
                        </div>
                      </div>
                    </div>

                    {/* Terminal / Logs */}
                    <div className="h-32 bg-black/40 border-t border-white/5 p-3 font-mono text-[9px] space-y-1.5">
                      <div className="flex gap-2 text-emerald-500/70">
                        <span>[10:15:02]</span>
                        <span>INFO: Fetching LinkedIn profile for 'John Doe'</span>
                      </div>
                      <div className="flex gap-2 text-emerald-500/70">
                        <span>[10:15:04]</span>
                        <span>SUCCESS: Found 3 relevant case studies</span>
                      </div>
                      <div className="flex gap-2 text-zinc-600">
                        <span>[10:15:05]</span>
                        <span>WAIT: Analyzing company annual report...</span>
                      </div>
                      <div className="flex gap-2 text-emerald-500/70">
                        <span>[10:15:08]</span>
                        <span>INFO: Generating outreach sequence</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Accents */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full" />
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500/10 blur-2xl rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Agent Showcase - Technical Grid Style */}
        <section className="py-32 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">SPECIALIZED AGENTS</h2>
              <p className="text-zinc-500 max-w-xl mx-auto">
                Our marketplace features agents trained on millions of successful business interactions.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-1">
              {AGENT_SHOWCASE.map((agent, i) => (
                <div key={i} className="group relative p-10 bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-500">
                  <div className="space-y-8">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="text-2xl font-bold text-zinc-100">{agent.name}</h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">{agent.role}</p>
                      </div>
                      <div className="text-xs font-mono text-zinc-600">{agent.impact}</div>
                    </div>
                    
                    <p className="text-zinc-400 text-sm leading-relaxed min-h-[60px]">
                      {agent.desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {agent.tags.map((tag, j) => (
                        <span key={j} className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-medium text-zinc-500">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all duration-300">
                      View Playbook
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Capabilities - Hardware Style */}
        <section className="py-32 bg-[#080808]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent">
                  <div className="bg-[#0A0A0A] rounded-[1.4rem] p-8 space-y-8">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Security Protocol Active</span>
                      </div>
                      <div className="text-[10px] font-mono text-zinc-600">AES-256-GCM</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Encryption", val: "Enterprise" },
                        { label: "Compliance", val: "SOC2 Type II" },
                        { label: "Uptime", val: "99.99%" },
                        { label: "Latency", val: "120ms" }
                      ].map((stat, i) => (
                        <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{stat.label}</p>
                          <p className="text-sm font-bold text-zinc-100">{stat.val}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-4">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">Privacy First Architecture</span>
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        Your data is never used to train global models. Each agent operates in a secure, isolated environment with strict PII filtering.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8 order-1 lg:order-2">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                  ENTERPRISE-GRADE <br />
                  <span className="text-emerald-500">RELIABILITY</span>
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  We built qulex.io for the most demanding environments. Our platform combines the power of autonomous agents with the security controls your IT team requires.
                </p>
                <ul className="space-y-4">
                  {[
                    "Isolated compute for every agent",
                    "Role-based access control (RBAC)",
                    "Comprehensive audit logging",
                    "Custom data retention policies"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA - Immersive Style */}
        <section className="py-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-12">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              READY TO SCALE <br />
              <span className="text-emerald-500">WITHOUT LIMITS?</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Join 1,000+ high-performance teams who have already deployed their first AI workforce.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <button 
                onClick={() => onAuth('signup')}
                className="w-full sm:w-auto px-12 py-6 bg-emerald-500 text-black rounded-full font-bold uppercase tracking-widest text-sm hover:bg-emerald-400 transition-all shadow-[0_20px_60px_rgba(16,185,129,0.3)] active:scale-95"
              >
                Get Started Now
              </button>
              <button className="w-full sm:w-auto px-12 py-6 bg-white/5 border border-white/10 text-zinc-100 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Operational Footer */}
      <footer className="border-t border-white/5 bg-[#050505] pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-16 mb-32">
            <div className="col-span-2 space-y-8">
              <Link to="/" className="flex items-center gap-3 font-bold text-xl tracking-tight text-zinc-100">
                <span className="text-xl font-bold text-zinc-100 tracking-tight">qulex.io</span>
              </Link>
              <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
                The operational platform for high-performance teams. Deploy specialized AI agents that handle your GTM, Data, and Ops playbooks on autopilot.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 hover:text-zinc-100 cursor-pointer transition-colors">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 hover:text-zinc-100 cursor-pointer transition-colors">
                  <Users className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">Product</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/marketplace" className="text-zinc-500 hover:text-emerald-500 transition-colors">Agent Builder</Link></li>
                <li><Link to="/marketplace" className="text-zinc-500 hover:text-emerald-500 transition-colors">Marketplace</Link></li>
                <li><Link to="/integrations" className="text-zinc-500 hover:text-emerald-500 transition-colors">Integrations</Link></li>
                <li><Link to="/pricing" className="text-zinc-500 hover:text-emerald-500 transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">Support</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/docs" className="text-zinc-500 hover:text-emerald-500 transition-colors">Documentation</Link></li>
                <li><Link to="/api" className="text-zinc-500 hover:text-emerald-500 transition-colors">API Reference</Link></li>
                <li><Link to="/changelog" className="text-zinc-500 hover:text-emerald-500 transition-colors">Changelog</Link></li>
                <li><Link to="/status" className="text-zinc-500 hover:text-emerald-500 transition-colors">Status</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">Company</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/about" className="text-zinc-500 hover:text-emerald-500 transition-colors">About</Link></li>
                <li><Link to="/careers" className="text-zinc-500 hover:text-emerald-500 transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="text-zinc-500 hover:text-emerald-500 transition-colors">Blog</Link></li>
                <li><Link to="/trust" className="text-zinc-500 hover:text-emerald-500 transition-colors">Trust Center</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">Legal</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/privacy" className="text-zinc-500 hover:text-emerald-500 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-zinc-500 hover:text-emerald-500 transition-colors">Terms of Service</Link></li>
                <li><Link to="/security" className="text-zinc-500 hover:text-emerald-500 transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/5">
            <div className="flex items-center gap-6 text-[10px] font-mono text-zinc-700 uppercase tracking-[0.2em]">
              <span>© 2026 qulex.io</span>
              <span className="w-1 h-1 rounded-full bg-zinc-800" />
              <span>Built for high-performance teams</span>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
