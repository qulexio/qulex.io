import React, { ReactNode, useState } from 'react';
import { Bot, Globe, Users, ChevronDown, Zap, Shield, Target, Layers, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const PRODUCT_LINKS = [
  { title: "Agent Builder", desc: "Create custom agents for any playbook", icon: <Bot className="w-4 h-4" />, href: "/marketplace" },
  { title: "AI Workforces", desc: "Deploy teams of agents that collaborate", icon: <Layers className="w-4 h-4" />, href: "/marketplace" },
  { title: "Marketplace", desc: "100+ pre-built agents for GTM & Ops", icon: <Zap className="w-4 h-4" />, href: "/marketplace" },
  { title: "Integrations", desc: "Connect with Salesforce, Slack & 200+ apps", icon: <Globe className="w-4 h-4" />, href: "/integrations" },
];

const SOLUTION_LINKS = [
  { title: "Sales & BDR", desc: "Automate prospecting, research & outreach", icon: <Target className="w-4 h-4" /> },
  { title: "Marketing", desc: "Scale content, SEO, and social on autopilot", icon: <Zap className="w-4 h-4" /> },
  { title: "Customer Success", desc: "Handle tickets and proactive account health", icon: <Users className="w-4 h-4" /> },
  { title: "Recruiting", desc: "Automate sourcing and initial screening", icon: <Shield className="w-4 h-4" /> },
];

export default function PageLayout({ children, onAuth }: { children: ReactNode, onAuth: (mode: 'login' | 'signup') => void }) {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav 
        className="fixed top-0 w-full z-50 border-b border-zinc-800/50 bg-[#09090b]/80 backdrop-blur-md"
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-3 font-bold text-xl tracking-tight group">
              <span className="text-xl font-bold text-zinc-100 tracking-tight">qulex.io</span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-zinc-400">
              {/* Product Dropdown */}
              <div 
                className="relative px-4 py-2 rounded-lg hover:bg-zinc-900/50 hover:text-zinc-100 transition-all cursor-pointer group"
                onMouseEnter={() => setActiveDropdown('product')}
              >
                <div className="flex items-center gap-1.5">
                  Product <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'product' ? 'rotate-180' : ''}`} />
                </div>
                <AnimatePresence>
                  {activeDropdown === 'product' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-80 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl"
                    >
                      <div className="grid gap-2">
                        {PRODUCT_LINKS.map((link, idx) => (
                          <Link 
                            key={idx} 
                            to={link.href}
                            className="flex items-start gap-4 p-3 rounded-xl hover:bg-zinc-900 transition-colors group/item"
                          >
                            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover/item:text-emerald-500 transition-colors">
                              {link.icon}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-zinc-100">{link.title}</div>
                              <div className="text-xs text-zinc-500 mt-0.5">{link.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Solutions Dropdown */}
              <div 
                className="relative px-4 py-2 rounded-lg hover:bg-zinc-900/50 hover:text-zinc-100 transition-all cursor-pointer group"
                onMouseEnter={() => setActiveDropdown('solutions')}
              >
                <div className="flex items-center gap-1.5">
                  Solutions <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
                </div>
                <AnimatePresence>
                  {activeDropdown === 'solutions' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-80 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl"
                    >
                      <div className="grid gap-2">
                        {SOLUTION_LINKS.map((link, idx) => (
                          <Link 
                            key={idx} 
                            to="/marketplace"
                            className="flex items-start gap-4 p-3 rounded-xl hover:bg-zinc-900 transition-colors group/item cursor-pointer"
                          >
                            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover/item:text-emerald-500 transition-colors">
                              {link.icon}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-zinc-100">{link.title}</div>
                              <div className="text-xs text-zinc-500 mt-0.5">{link.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/pricing" className="px-4 py-2 rounded-lg hover:bg-zinc-900/50 hover:text-zinc-100 transition-all">Pricing</Link>
              <Link to="/about" className="px-4 py-2 rounded-lg hover:bg-zinc-900/50 hover:text-zinc-100 transition-all">About</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => onAuth('login')}
              className="hidden sm:block text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              Log in
            </button>
            <button 
              onClick={() => onAuth('signup')}
              className="px-5 py-2.5 bg-emerald-500 text-black rounded-xl text-sm font-bold hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-95"
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
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-zinc-800 bg-zinc-950 overflow-hidden"
            >
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Product</div>
                  <div className="grid gap-4">
                    {PRODUCT_LINKS.map((link, idx) => (
                      <Link key={idx} to={link.href} className="flex items-center gap-3 text-sm font-medium text-zinc-300">
                        {link.icon} {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Solutions</div>
                  <div className="grid gap-4">
                    {SOLUTION_LINKS.map((link, idx) => (
                      <Link key={idx} to="/marketplace" className="flex items-center gap-3 text-sm font-medium text-zinc-300">
                        {link.icon} {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Company</div>
                  <div className="grid gap-4">
                    <Link to="/pricing" className="text-sm font-medium text-zinc-300">Pricing</Link>
                    <Link to="/about" className="text-sm font-medium text-zinc-300">About</Link>
                    <Link to="/trust" className="text-sm font-medium text-zinc-300">Trust Center</Link>
                  </div>
                </div>
                <div className="pt-6 border-t border-zinc-900">
                  <button 
                    onClick={() => onAuth('login')}
                    className="w-full py-3 text-center text-sm font-medium text-zinc-400"
                  >
                    Log in
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {children}
      </main>

      {/* Operational Footer */}
      <footer className="border-t border-zinc-800 bg-[#09090b] pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
            {/* Brand Column */}
            <div className="col-span-2 space-y-6">
              <Link to="/" className="flex items-center gap-3 font-bold text-lg tracking-tight text-zinc-100">
                <span className="text-lg font-bold text-zinc-100 tracking-tight">qulex.io</span>
              </Link>
              <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
                The operational platform for high-performance teams. Deploy specialized AI agents that handle your GTM, Data, and Ops playbooks on autopilot.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-100 cursor-pointer transition-colors">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-100 cursor-pointer transition-colors">
                  <Users className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Product Column */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/marketplace" className="text-zinc-400 hover:text-emerald-500 transition-colors">AI Agents</Link></li>
                <li><Link to="/marketplace" className="text-zinc-400 hover:text-emerald-500 transition-colors">Marketplace</Link></li>
                <li><Link to="/integrations" className="text-zinc-400 hover:text-emerald-500 transition-colors">Integrations</Link></li>
                <li><Link to="/enterprise" className="text-zinc-400 hover:text-emerald-500 transition-colors">Enterprise</Link></li>
                <li><Link to="/pricing" className="text-zinc-400 hover:text-emerald-500 transition-colors">Pricing</Link></li>
              </ul>
            </div>

            {/* Support Column */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/docs" className="text-zinc-400 hover:text-emerald-500 transition-colors">Documentation</Link></li>
                <li><Link to="/api" className="text-zinc-400 hover:text-emerald-500 transition-colors">API Reference</Link></li>
                <li><Link to="/changelog" className="text-zinc-400 hover:text-emerald-500 transition-colors">Changelog</Link></li>
                <li><Link to="/community" className="text-zinc-400 hover:text-emerald-500 transition-colors">Community</Link></li>
                <li><Link to="/status" className="text-zinc-400 hover:text-emerald-500 transition-colors">Status</Link></li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-zinc-400 hover:text-emerald-500 transition-colors">About</Link></li>
                <li><Link to="/careers" className="text-zinc-400 hover:text-emerald-500 transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="text-zinc-400 hover:text-emerald-500 transition-colors">Blog</Link></li>
                <li><Link to="/trust" className="text-zinc-400 hover:text-emerald-500 transition-colors">Trust Center</Link></li>
                <li><Link to="/contact" className="text-zinc-400 hover:text-emerald-500 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/privacy" className="text-zinc-400 hover:text-emerald-500 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-zinc-400 hover:text-emerald-500 transition-colors">Terms of Service</Link></li>
                <li><Link to="/security" className="text-zinc-400 hover:text-emerald-500 transition-colors">Security</Link></li>
                <li><Link to="/cookies" className="text-zinc-400 hover:text-emerald-500 transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-zinc-800/50">
            <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
              <span>© 2026 qulex.io</span>
              <span className="w-1 h-1 rounded-full bg-zinc-800" />
              <span>Built for high-performance teams</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
