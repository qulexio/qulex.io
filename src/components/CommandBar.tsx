import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Plus, 
  Settings, 
  BookOpen, 
  Zap, 
  Cpu, 
  Shield, 
  Command,
  ArrowRight,
  LayoutDashboard,
  ShoppingBag
} from 'lucide-react';
import { cn } from '../lib/utils';

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: any;
  action: () => void;
  category: 'Actions' | 'Agents' | 'Resources';
}

export default function CommandBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const ACTIONS: CommandItem[] = [
    { id: 'dashboard', title: 'Go to Dashboard', subtitle: 'View your agent overview', icon: LayoutDashboard, category: 'Actions', action: () => navigate('/dashboard') },
    { id: 'marketplace', title: 'Browse Marketplace', subtitle: 'Find new agents to deploy', icon: ShoppingBag, category: 'Actions', action: () => navigate('/marketplace') },
    { id: 'deploy', title: 'Deploy New Agent', subtitle: 'Create and launch a new autonomous agent', icon: Plus, category: 'Actions', action: () => navigate('/marketplace') },
    { id: 'settings', title: 'Go to Settings', subtitle: 'Manage your account and preferences', icon: Settings, category: 'Actions', action: () => navigate('/dashboard') }, // Assuming settings is a tab in dashboard
    { id: 'docs', title: 'View Documentation', subtitle: 'Learn how to build and scale agents', icon: BookOpen, category: 'Actions', action: () => navigate('/docs') },
  ];

  const AGENTS: CommandItem[] = [
    { id: 'agent-1', title: 'RevenueFlow', subtitle: 'Active • Processing leads', icon: Zap, category: 'Agents', action: () => navigate('/dashboard') },
    { id: 'agent-2', title: 'Nexus-7', subtitle: 'Idle • Data sync', icon: Cpu, category: 'Agents', action: () => navigate('/dashboard') },
    { id: 'agent-3', title: 'Sentinel', subtitle: 'Error • Connection timeout', icon: Shield, category: 'Agents', action: () => navigate('/dashboard') },
  ];

  const filteredItems = [...ACTIONS, ...AGENTS].filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.subtitle?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleOpen = () => setIsOpen(prev => !prev);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-bar', handleOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-bar', handleOpen);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
        setIsOpen(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
            onKeyDown={handleKeyDown}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-zinc-800">
              <Search className="w-5 h-5 text-zinc-500" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                className="flex-1 bg-transparent border-none text-zinc-100 placeholder:text-zinc-600 focus:ring-0 text-base"
              />
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-zinc-800 bg-zinc-800/50 text-[10px] text-zinc-500 font-sans">
                <span className="text-xs">esc</span>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto p-2 no-scrollbar">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-sm text-zinc-500">No results found for "{search}"</p>
                </div>
              ) : (
                <div className="space-y-4 pb-2">
                  {/* Grouped Items */}
                  {['Actions', 'Agents'].map((category) => {
                    const items = filteredItems.filter(item => item.category === category);
                    if (items.length === 0) return null;

                    return (
                      <div key={category} className="space-y-1">
                        <div className="px-3 py-2">
                          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{category}</p>
                        </div>
                        {items.map((item) => {
                          const globalIndex = filteredItems.indexOf(item);
                          const isSelected = selectedIndex === globalIndex;

                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                item.action();
                                setIsOpen(false);
                              }}
                              onMouseEnter={() => setSelectedIndex(globalIndex)}
                              className={cn(
                                "w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all text-left group",
                                isSelected ? "bg-[#10b981]/10 text-zinc-100" : "text-zinc-400 hover:bg-zinc-800/50"
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <div className={cn(
                                  "w-8 h-8 rounded-md flex items-center justify-center border transition-colors",
                                  isSelected ? "bg-[#10b981]/20 border-[#10b981]/30 text-[#10b981]" : "bg-zinc-800 border-zinc-700 text-zinc-500"
                                )}>
                                  <item.icon className="w-4 h-4" />
                                </div>
                                <div className="space-y-0.5">
                                  <p className={cn(
                                    "text-sm font-medium transition-colors",
                                    isSelected ? "text-zinc-100" : "text-zinc-300"
                                  )}>{item.title}</p>
                                  {item.subtitle && (
                                    <p className="text-[10px] text-zinc-500">{item.subtitle}</p>
                                  )}
                                </div>
                              </div>
                              {isSelected && (
                                <div className="flex items-center gap-2 text-[10px] font-bold text-[#10b981] uppercase tracking-widest animate-in fade-in slide-in-from-right-2 duration-200">
                                  <span>Execute</span>
                                  <ArrowRight className="w-3 h-3" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded border border-zinc-800 bg-zinc-800 text-[10px] text-zinc-500 font-sans">↑↓</kbd>
                  <span className="text-[10px] text-zinc-600 uppercase tracking-wider">Navigate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded border border-zinc-800 bg-zinc-800 text-[10px] text-zinc-500 font-sans">↵</kbd>
                  <span className="text-[10px] text-zinc-600 uppercase tracking-wider">Select</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-zinc-700">
                <Command className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Qulex Command</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
