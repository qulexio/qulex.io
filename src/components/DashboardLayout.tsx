import React, { ReactNode } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Bot, 
  Settings, 
  LogOut,
  Search,
  Bell,
  User,
  Command
} from 'lucide-react';
import { cn } from '../lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
  { id: 'agents', label: 'My Agents', icon: Bot },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function DashboardLayout({ children, activeTab, setActiveTab }: DashboardLayoutProps) {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex min-h-screen bg-[#09090b] text-zinc-400 font-sans selection:bg-[#10b981]/30 selection:text-[#10b981]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 flex flex-col fixed h-full bg-[#09090b] z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#10b981] flex items-center justify-center">
            <Command className="w-5 h-5 text-black" />
          </div>
          <span className="text-lg font-bold text-zinc-100 tracking-tight">qulex.io</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <div className="px-3 mb-2">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Platform</p>
          </div>
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                activeTab === item.id 
                  ? "bg-zinc-800 text-zinc-100" 
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              )}
            >
              <item.icon className={cn(
                "w-4 h-4 transition-colors",
                activeTab === item.id ? "text-[#10b981]" : "text-zinc-500 group-hover:text-zinc-300"
              )} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          {!isLoaded ? (
            <div className="flex items-center gap-3 px-2 py-2 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-zinc-800" />
              <div className="flex-1 space-y-2">
                <div className="h-2 bg-zinc-800 rounded w-1/2" />
                <div className="h-2 bg-zinc-800 rounded w-1/3" />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2 px-2 py-2 rounded-xl hover:bg-zinc-800/50 transition-all group">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 overflow-hidden shrink-0">
                  {user?.imageUrl ? (
                    <img src={user.imageUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-4 h-4 text-zinc-500" />
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-zinc-100 truncate">
                      {user?.firstName || 'User'}
                    </span>
                    <span className="px-1 py-0.5 rounded-[4px] bg-[#10b981]/10 text-[#10b981] text-[8px] font-bold uppercase tracking-wider border border-[#10b981]/20">
                      Pro
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setActiveTab('settings')}
                  className="p-1.5 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-700 rounded-md transition-all"
                  title="Settings"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={handleSignOut}
                  className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-all"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 sticky top-0 bg-[#09090b]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                readOnly
                onClick={() => window.dispatchEvent(new CustomEvent('open-command-bar'))}
                placeholder="Search agents, tools, or docs..." 
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-1.5 pl-10 pr-4 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700 transition-all placeholder:text-zinc-600 cursor-pointer"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border border-zinc-700 bg-zinc-800 text-[10px] text-zinc-500 font-sans">⌘</kbd>
                <kbd className="px-1.5 py-0.5 rounded border border-zinc-700 bg-zinc-800 text-[10px] text-zinc-500 font-sans">K</kbd>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-zinc-500 hover:text-zinc-100 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#10b981] rounded-full border-2 border-[#09090b]" />
            </button>
            <div className="h-4 w-px bg-zinc-800 mx-2" />
            <button className="px-4 py-1.5 rounded-lg bg-zinc-100 text-zinc-950 text-sm font-bold hover:bg-zinc-200 transition-all">
              Upgrade
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
