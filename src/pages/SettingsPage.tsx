import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useUser } from '@clerk/clerk-react';
import { User, Shield, Bell, CreditCard, Save, Loader2, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Profile } from '../types';
import { cn } from '../lib/utils';

export default function SettingsPage({ profile, onUpdate }: { profile: Profile | null, onUpdate: () => void }) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || user?.fullName || '');
  const [role, setRole] = useState(profile?.role || '');

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || user?.fullName || '');
      setRole(profile.role || '');
    }
  }, [profile, user]);

  const handleSave = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: fullName,
          role: role,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      onUpdate();
      // Using a custom notification would be better, but for now console log or simple state
      console.log('Settings saved successfully!');
    } catch (err) {
      console.error('Error saving settings:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-medium text-zinc-100 tracking-tight">Settings</h1>
        <p className="text-zinc-400 text-sm">Manage your account preferences and profile information.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Navigation */}
        <div className="space-y-1">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'billing', label: 'Billing', icon: CreditCard },
          ].map((item) => (
            <button
              key={item.id}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group",
                item.id === 'profile' 
                  ? "bg-zinc-800 text-zinc-100" 
                  : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
              )}
            >
              <item.icon className={cn(
                "w-4 h-4 transition-colors",
                item.id === 'profile' ? "text-[#10b981]" : "text-zinc-600 group-hover:text-zinc-400"
              )} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="md:col-span-3 space-y-8">
          <section className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/20 space-y-8">
            <div className="space-y-1">
              <h2 className="text-lg font-medium text-zinc-100">Profile Information</h2>
              <p className="text-xs text-zinc-500">This information will be displayed on your public profile.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-2 px-4 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700 transition-all placeholder:text-zinc-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Role / Occupation</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. AI Engineer"
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-2 px-4 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700 transition-all placeholder:text-zinc-700"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    disabled
                    value={user?.primaryEmailAddress?.emailAddress || ''}
                    className="w-full bg-zinc-900/30 border border-zinc-800/50 rounded-lg py-2 px-4 text-sm text-zinc-600 cursor-not-allowed"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Shield className="w-3 h-3 text-zinc-700" />
                  </div>
                </div>
                <p className="text-[10px] text-zinc-600 italic">Managed via Clerk Authentication.</p>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 flex justify-end">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-zinc-100 text-zinc-950 font-bold text-sm hover:bg-zinc-200 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Changes
              </button>
            </div>
          </section>

          <section className="p-8 rounded-2xl border border-red-900/20 bg-red-900/5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-lg font-medium text-red-400">Danger Zone</h2>
                <p className="text-xs text-zinc-500">Permanent actions that cannot be undone.</p>
              </div>
            </div>
            
            <div className="p-4 rounded-xl border border-red-900/20 bg-red-900/5 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-zinc-200">Delete Account</p>
                <p className="text-xs text-zinc-500 max-w-md">Once you delete your account, all of your agents, data, and configurations will be permanently removed.</p>
              </div>
              <button className="px-4 py-2 rounded-lg border border-red-500/50 text-red-400 font-bold text-xs hover:bg-red-500/10 transition-all whitespace-nowrap">
                Delete Account
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
