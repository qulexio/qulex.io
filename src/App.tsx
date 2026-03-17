import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { Profile } from './types';
import OnboardingForm from './components/OnboardingForm';
import DashboardLayout from './components/DashboardLayout';
import DashboardPage from './components/DashboardPage';
import AgentDetailPage from './components/AgentDetailPage';
import MarketplacePage from './pages/MarketplacePage';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import SettingsPage from './pages/SettingsPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import TrustCenterPage from './pages/TrustCenterPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import DocsPage from './pages/DocsPage';
import PageLayout from './components/PageLayout';
import AuthCallbackPage from './pages/AuthCallbackPage';
import { Loader2, AlertCircle, ExternalLink, RefreshCcw } from 'lucide-react';

// Error Boundary Component
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false, error: null };
  public props: ErrorBoundaryProps;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.props = props;
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 rounded-2xl border border-red-500/20 bg-red-500/5 space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Something went wrong</h1>
              <p className="text-zinc-400 text-sm leading-relaxed">
                The application encountered an unexpected error. This might be due to missing configuration or a temporary issue.
              </p>
            </div>
            {this.state.error && (
              <div className="p-4 rounded-xl bg-black/40 border border-red-500/10 text-left overflow-auto max-h-40">
                <p className="text-[10px] font-mono text-red-400 break-all">{this.state.error.toString()}</p>
              </div>
            )}
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-3 rounded-xl bg-zinc-100 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all"
            >
              <RefreshCcw className="w-4 h-4" />
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [activeTab, setActiveTab] = useState('marketplace');

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // Initial session check
    const initSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Initial session check:', session?.user?.id);
        setSession(session);
        if (session) {
          await fetchProfile(session.user.id);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('Error during initial session check:', err);
        setLoading(false);
      }
    };

    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed event:', _event, 'User:', session?.user?.id);
      
      // Safety net: If we are in a popup and just signed in, notify opener and close
      // This handles cases where the OAuth redirect might have gone to the root instead of /auth/callback
      if ((_event === 'SIGNED_IN' || _event === 'INITIAL_SESSION') && session) {
        if (window.opener && window.opener !== window) {
          console.log('[App] Detected session in popup, notifying opener...');
          try {
            window.opener.postMessage({ type: 'SUPABASE_AUTH_SUCCESS' }, '*');
            window.close();
          } catch (e) {
            console.error('[App] Failed to notify opener:', e);
          }
        }
      }

      // Only update if the session actually changed to avoid flicker
      setSession(session);
      
      if (session) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      setProfile(data);
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Configuration Required</h1>
            <p className="text-zinc-400 text-sm leading-relaxed">
              To use the full features of qulex.io, you need to connect your Supabase project.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-zinc-800 text-left space-y-3">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Required Environment Variables:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs font-mono text-zinc-100">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                VITE_SUPABASE_URL
              </li>
              <li className="flex items-center gap-2 text-xs font-mono text-zinc-100">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                VITE_SUPABASE_ANON_KEY
              </li>
            </ul>
          </div>
          <div className="pt-4 space-y-3">
            <a 
              href="https://supabase.com/dashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-500 text-black font-semibold flex items-center justify-center gap-2"
            >
              Open Supabase Dashboard
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  const handleAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const renderDashboardContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage profile={profile} />;
      case 'marketplace':
        return <MarketplacePage onSelectAgent={(id) => console.log('Selected agent:', id)} />;
      case 'settings':
        return <SettingsPage profile={profile} onUpdate={() => session && fetchProfile(session.user.id)} />;
      case 'agents':
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-zinc-700" />
            </div>
            <h2 className="text-xl font-bold text-zinc-100">No agents deployed yet</h2>
            <p className="text-zinc-500 max-w-xs">Head over to the marketplace to deploy your first autonomous agent.</p>
            <button 
              onClick={() => setActiveTab('marketplace')}
              className="px-6 py-2 bg-emerald-500 text-black rounded-lg font-bold text-sm"
            >
              Browse Marketplace
            </button>
          </div>
        );
      default:
        return <DashboardPage profile={profile} />;
    }
  };

  // Handle root path logic
  const renderRoot = () => {
    // 1. No session: Show Landing or Auth
    if (!session) {
      if (showAuth) {
        return (
          <AuthPage 
            onAuthSuccess={() => {
              setShowAuth(false);
            }} 
            onBack={() => setShowAuth(false)} 
            initialMode={authMode}
          />
        );
      }
      return <LandingPage onAuth={handleAuth} />;
    }

    // 2. Session exists: Show Dashboard
    // We skip the onboarding check for now as requested by the user.
    return (
      <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab} profile={profile}>
        {renderDashboardContent()}
      </DashboardLayout>
    );
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Main Application Route */}
          <Route path="/" element={renderRoot()} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />

          {/* Other Public Pages */}
          <Route path="/pricing" element={<PageLayout onAuth={handleAuth}><PricingPage /></PageLayout>} />
          <Route path="/about" element={<PageLayout onAuth={handleAuth}><AboutPage /></PageLayout>} />
          <Route path="/trust" element={<PageLayout onAuth={handleAuth}><TrustCenterPage /></PageLayout>} />
          <Route path="/privacy" element={<PageLayout onAuth={handleAuth}><PrivacyPage /></PageLayout>} />
          <Route path="/terms" element={<PageLayout onAuth={handleAuth}><TermsPage /></PageLayout>} />
          <Route path="/docs" element={<PageLayout onAuth={handleAuth}><DocsPage /></PageLayout>} />
          <Route path="/marketplace" element={<PageLayout onAuth={handleAuth}><MarketplacePage onSelectAgent={(id) => handleAuth('signup')} /></PageLayout>} />
          
          {/* Fallbacks for missing pages to maintain logical flow */}
          <Route path="/integrations" element={<PageLayout onAuth={handleAuth}><DocsPage /></PageLayout>} />
          <Route path="/enterprise" element={<PageLayout onAuth={handleAuth}><PricingPage /></PageLayout>} />
          <Route path="/api" element={<PageLayout onAuth={handleAuth}><DocsPage /></PageLayout>} />
          <Route path="/changelog" element={<PageLayout onAuth={handleAuth}><AboutPage /></PageLayout>} />
          <Route path="/community" element={<PageLayout onAuth={handleAuth}><AboutPage /></PageLayout>} />
          <Route path="/status" element={<PageLayout onAuth={handleAuth}><TrustCenterPage /></PageLayout>} />
          <Route path="/careers" element={<PageLayout onAuth={handleAuth}><AboutPage /></PageLayout>} />
          <Route path="/blog" element={<PageLayout onAuth={handleAuth}><AboutPage /></PageLayout>} />
          <Route path="/contact" element={<PageLayout onAuth={handleAuth}><AboutPage /></PageLayout>} />
          <Route path="/security" element={<PageLayout onAuth={handleAuth}><TrustCenterPage /></PageLayout>} />
          <Route path="/cookies" element={<PageLayout onAuth={handleAuth}><PrivacyPage /></PageLayout>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
