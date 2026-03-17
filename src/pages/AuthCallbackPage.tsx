import React, { useEffect } from 'react';
import { supabase } from '../lib/supabase';

/**
 * AUTH CALLBACK PAGE
 * This page is the target of the OAuth redirect (e.g., https://qulex.io/auth/callback).
 * Its primary responsibility is to:
 * 1. Finalize the Supabase session.
 * 2. Notify the main window (opener) that auth is complete.
 * 3. Close itself (the mini-tab).
 */
export default function AuthCallbackPage() {
  useEffect(() => {
    console.log('[Callback] AuthCallbackPage mounted. URL:', window.location.href);
    
    /**
     * Supabase OAuth flow returns tokens in the URL hash fragment (#).
     * The Supabase client automatically parses this fragment when initialized
     * or when onAuthStateChange is called.
     */
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`[Callback] Auth Event: ${event}`, session ? 'Session found' : 'No session');
      
      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session) {
        console.log('[Callback] Success! User:', session.user.email);
        
        // Check if we are in a popup
        const isPopup = window.opener && window.opener !== window;
        
        if (isPopup) {
          console.log('[Callback] In popup, notifying opener...');
          try {
            // Notify the main window
            window.opener.postMessage({ type: 'SUPABASE_AUTH_SUCCESS' }, '*');
            
            // Close the popup
            console.log('[Callback] Closing popup...');
            window.close();
            
            // Fallback if window.close() fails
            setTimeout(() => {
              if (!window.closed) {
                console.warn('[Callback] window.close() failed, providing manual close option');
              }
            }, 2000);
          } catch (err) {
            console.error('[Callback] Error communicating with opener:', err);
            // If postMessage fails, we still want to try closing or redirecting
            window.close();
            window.location.href = '/dashboard';
          }
        } else {
          // Not in a popup, just redirect to dashboard
          console.log('[Callback] Not in popup, redirecting to /dashboard');
          window.location.href = '/dashboard';
        }
      }
    });

    // Handle errors in the URL (e.g. user denied access)
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const errorDescription = urlParams.get('error_description');
    
    if (error) {
      console.error('[Callback] OAuth Error:', error, errorDescription);
      if (window.opener) {
        window.opener.postMessage({ type: 'SUPABASE_AUTH_ERROR', error: errorDescription || error }, '*');
        window.close();
      } else {
        window.location.href = '/?error=' + encodeURIComponent(errorDescription || error);
      }
    }

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="text-center space-y-6 max-w-sm">
        {/* Loading Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin mx-auto" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold tracking-tight">Completing Sign-in</h1>
          <p className="text-zinc-500 text-sm leading-relaxed">
            We're securely connecting your account. This window will close automatically.
          </p>
        </div>

        {/* Manual Close Fallback */}
        <button 
          onClick={() => window.close()}
          className="px-6 py-2.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-400 transition-all active:scale-95"
        >
          Close Window
        </button>
      </div>
    </div>
  );
}
