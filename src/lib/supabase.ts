import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your-project-url');

if (!isSupabaseConfigured) {
  console.warn('Supabase credentials missing or invalid. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

/**
 * Helper to get the correct redirect URL for OAuth.
 * Points to our custom callback route that handles postMessage.
 * Uses window.location.origin to support both preview and custom domains.
 */
export const getRedirectUrl = () => {
  return `${window.location.origin.replace(/\/$/, "")}/auth/callback`;
};
