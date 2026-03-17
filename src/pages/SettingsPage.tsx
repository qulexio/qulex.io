import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Shield, Bell, CreditCard, Save, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Profile } from '../types';
import { cn } from '../lib/utils';

export default function SettingsPage({ profile, onUpdate }: { profile: Profile | null, onUpdate: () => void }) {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [role, setRole] = useState(profile?.role || '');
  const [email, setEmail] = useState('');

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setEmail(data.user.email);
    });
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          role: role,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.id);

      if (error) throw error;
      onUpdate();
      alert('Settings saved successfully!');
    } catch (err) {
      console.error('Error saving settings:', err);
      alert('Failed to save settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-text-heading tracking-tight">Settings</h1>
        <p className="text-text-muted">Manage your account preferences and profile information.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                item.id === 'profile' ? "bg-brand/10 text-brand" : "text-text-muted hover:bg-white/5 hover:text-text-heading"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="md:col-span-2 space-y-8">
          <div className="p-8 rounded-2xl border border-border bg-card/50 space-y-6">
            <h2 className="text-xl font-semibold text-text-heading">Profile Information</h2>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-text-muted uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/5 border border-border rounded-xl py-2.5 px-4 text-sm text-text-heading focus:outline-none focus:border-brand transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-text-muted uppercase tracking-wider">Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-white/5 border border-border rounded-xl py-2.5 px-4 text-sm text-text-heading focus:outline-none focus:border-brand transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-text-muted uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full bg-white/5 border border-border rounded-xl py-2.5 px-4 text-sm text-text-muted cursor-not-allowed"
                />
                <p className="text-[10px] text-text-muted/50">Email cannot be changed directly. Contact support for assistance.</p>
              </div>
            </div>

            <div className="pt-6 border-t border-border flex justify-end">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand text-white font-semibold glow-button disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Changes
              </button>
            </div>
          </div>

          <div className="p-8 rounded-2xl border border-red-500/20 bg-red-500/5 space-y-4">
            <h2 className="text-xl font-semibold text-red-400">Danger Zone</h2>
            <p className="text-sm text-text-muted">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="px-6 py-2.5 rounded-xl border border-red-500/50 text-red-400 font-semibold hover:bg-red-500/10 transition-all">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
