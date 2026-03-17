import React, { useState, useEffect } from 'react';
import { supabase, getRedirectUrl } from '../lib/supabase';
import { cn } from '../lib/utils';
import { Loader2, Mail, Lock, User, ArrowLeft, Github, Chrome } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthPageProps {
  onAuthSuccess: () => void;
  onBack?: () => void;
  initialMode?: 'login' | 'signup';
}

export default function AuthPage({ 
  onAuthSuccess, 
  onBack,
  initialMode = 'login'
}: AuthPageProps) {
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    /**
     * CROSS-WINDOW COMMUNICATION PATTERN
     * This listener waits for a message from the AuthCallbackPage (mini-tab).
     * Once received, it triggers the success flow in the main window.
     */
    const handleMessage = (event: MessageEvent) => {
      // Security: Validate origin matches our application
      const currentOrigin = window.location.origin;
      const eventOrigin = event.origin;
      
      const isAllowedOrigin = 
        eventOrigin === currentOrigin || 
        eventOrigin.replace('://www.', '://') === currentOrigin.replace('://www.', '://');

      if (!isAllowedOrigin) return;

      // Check for our specific auth success message
      if (event.data?.type === 'SUPABASE_AUTH_SUCCESS') {
        console.log('[Auth] Received success signal from popup');
        setLoading(false);
        onAuthSuccess();
      }
    };

    window.addEventListener('message', handleMessage);

    /**
     * FALLBACK MECHANISM
     * If the postMessage fails (e.g. cross-origin issues or closed tab),
     * we periodically check the session state while the loading spinner is active.
     */
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log('[Auth] Fallback: Session detected via polling');
          setLoading(false);
          onAuthSuccess();
          clearInterval(interval);
        }
      }, 2000);
    }

    return () => {
      window.removeEventListener('message', handleMessage);
      if (interval) clearInterval(interval);
    };
  }, [onAuthSuccess, loading]);

  /**
   * SIGN IN WITH POPUP PATTERN
   * Instead of a full page redirect, we open a mini-tab to keep the user's 
   * current state in the main application.
   */
  const handleSocialAuth = async (provider: 'google' | 'github') => {
    setLoading(true);
    setError(null);
    try {
      const redirectTo = getRedirectUrl();
      console.log(`[Auth] Initiating ${provider} auth with redirect:`, redirectTo);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
          skipBrowserRedirect: true, // Crucial: Prevents main window from redirecting
        },
      });
      
      if (error) throw error;

      if (data?.url) {
        // Calculate popup position (centered)
        const width = 600;
        const height = 700;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        
        // Open the OAuth provider's URL in a mini-tab
        const authWindow = window.open(
          data.url,
          'supabase_auth',
          `width=${width},height=${height},left=${left},top=${top},status=no,menubar=no,toolbar=no`
        );

        if (!authWindow) {
          setError('Popup blocked. Please allow popups for this site to continue.');
          setLoading(false);
        }
      }
    } catch (err: any) {
      console.error('[Auth] Social auth error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
            emailRedirectTo: getRedirectUrl(),
          },
        });
        if (signUpError) throw signUpError;
        setMessage('Check your email for the confirmation link!');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        onAuthSuccess();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center p-4 font-sans">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] relative z-10"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to landing
          </button>
          
          <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-4 shadow-xl">
            <div className="w-6 h-6 bg-emerald-500 rounded-lg animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isSignUp ? 'Create an account' : 'Welcome back'}
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            {isSignUp ? 'Join the autonomous future' : 'Sign in to your dashboard'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl space-y-6">
          {/* Social Auth */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocialAuth('google')}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-all active:scale-95 text-sm font-medium"
            >
              <Chrome className="w-4 h-4" />
              Google
            </button>
            <button
              onClick={() => handleSocialAuth('github')}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-all active:scale-95 text-sm font-medium"
            >
              <Github className="w-4 h-4" />
              GitHub
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
              <span className="bg-[#0c0c0e] px-4 text-zinc-600">Or continue with email</span>
            </div>
          </div>

          {/* Email Auth Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <AnimatePresence mode="wait">
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1.5"
                >
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-700"
                      placeholder="Elon Musk"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-700"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Password</label>
                {!isSignUp && (
                  <button type="button" className="text-[10px] font-bold text-emerald-500 hover:text-emerald-400 transition-colors">
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-700"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-[11px] text-red-400 text-center"
              >
                {error}
              </motion.div>
            )}

            {message && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 text-center"
              >
                {message}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-zinc-100 text-zinc-950 font-bold text-sm hover:bg-zinc-200 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
                setMessage(null);
              }}
              className="text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-zinc-600 mt-8 uppercase tracking-widest font-medium">
          Protected by Supabase Auth
        </p>
      </motion.div>
    </div>
  );
}
