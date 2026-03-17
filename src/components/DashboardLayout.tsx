import React, { ReactNode } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Bot, 
  Settings, 
  LogOut,
  Search,
  Bell,
  User
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Profile } from '../types';
import { supabase } from '../lib/supabase';

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: Profile | null;
}

const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
  { id: 'agents', label: 'My Agents', icon: Bot },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function DashboardLayout({ children, activeTab, setActiveTab, profile }: DashboardLayoutProps) {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="flex min-h-screen bg-bg text-text-muted">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border flex flex-col fixed h-full bg-bg z-20">
        <div className="p-6 flex items-center gap-3">
          <span className="text-lg font-bold text-text-heading tracking-tight">qulex.io</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                activeTab === item.id 
                  ? "bg-brand/10 text-brand" 
                  : "text-text-muted hover:bg-white/5 hover:text-text-heading"
              )}
            >
              <item.icon className={cn(
                "w-4 h-4 transition-colors",
                activeTab === item.id ? "text-brand" : "text-text-muted group-hover:text-text-heading"
              )} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border space-y-4">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center border border-brand/30 overflow-hidden">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <User className="w-4 h-4 text-brand" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-text-heading truncate">
                {profile?.full_name || 'User'}
              </p>
              <p className="text-[10px] text-text-muted truncate">
                {profile?.role || 'Member'}
              </p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-text-muted hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-16 border-bottom border-border flex items-center justify-between px-8 sticky top-0 bg-bg/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-border flex-shrink-0">
              <img 
                src="https://ylnbfmlrkacuirkhkksl.supabase.co/storage/v1/object/public/qulexio/qulex.io.png" 
                alt="Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search agents, tools, or docs..." 
                className="w-full bg-white/5 border border-border rounded-lg py-1.5 pl-10 pr-4 text-sm text-text-heading focus:outline-none focus:border-brand/50 transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-text-muted hover:text-text-heading transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand rounded-full border-2 border-bg" />
            </button>
            <div className="h-6 w-px bg-border mx-2" />
            <button className="px-4 py-1.5 rounded-lg bg-brand text-white text-sm font-semibold glow-button">
              New Agent
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
