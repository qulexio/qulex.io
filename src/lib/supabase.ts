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

export const getSiteUrl = () => {
  // Use the platform-injected APP_URL if available, otherwise fallback to window.location.origin
  let url = 
    process.env.APP_URL || 
    import.meta.env.VITE_APP_URL || 
    window.location.origin;
  
  // Ensure the URL is properly formatted (no trailing slash)
  url = url.replace(/\/$/, "");
  
  // Log the detected site URL for debugging
  console.log('Detected Site URL for OAuth:', url);
  
  // If we are on a .run.app but the URL is localhost, something is wrong
  if (window.location.hostname.includes('.run.app') && url.includes('localhost')) {
    console.warn('WARNING: Site URL detected as localhost while running in cloud. Using window.location.origin instead.');
    url = window.location.origin.replace(/\/$/, "");
  }
  
  return url;
};
