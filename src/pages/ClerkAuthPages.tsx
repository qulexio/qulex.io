import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SignInPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <button 
          onClick={() => navigate('/')}
          className="group flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors mb-8 text-sm mx-auto"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to landing
        </button>

        <div className="flex justify-center">
          <SignIn 
            appearance={{
              baseTheme: dark,
              elements: {
                rootBox: "mx-auto",
                card: "bg-zinc-900/50 border border-zinc-800 backdrop-blur-xl shadow-2xl rounded-3xl",
                headerTitle: "text-zinc-100 font-bold tracking-tight",
                headerSubtitle: "text-zinc-500",
                socialButtonsBlockButton: "bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-100",
                socialButtonsBlockButtonText: "text-zinc-100 font-medium",
                dividerLine: "bg-zinc-800",
                dividerText: "text-zinc-600 uppercase tracking-widest text-[10px] font-bold",
                formFieldLabel: "text-zinc-500 uppercase tracking-widest text-[10px] font-bold",
                formFieldInput: "bg-zinc-950 border-zinc-800 text-zinc-100 focus:border-emerald-500/50",
                formButtonPrimary: "bg-zinc-100 text-zinc-950 hover:bg-zinc-200 font-bold",
                footerActionText: "text-zinc-500",
                footerActionLink: "text-emerald-500 hover:text-emerald-400 font-bold"
              }
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            forceRedirectUrl="/dashboard"
            fallbackRedirectUrl="/dashboard"
          />
        </div>
      </motion.div>
    </div>
  );
};

export const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <button 
          onClick={() => navigate('/')}
          className="group flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors mb-8 text-sm mx-auto"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to landing
        </button>

        <div className="flex justify-center">
          <SignUp 
            appearance={{
              baseTheme: dark,
              elements: {
                rootBox: "mx-auto",
                card: "bg-zinc-900/50 border border-zinc-800 backdrop-blur-xl shadow-2xl rounded-3xl",
                headerTitle: "text-zinc-100 font-bold tracking-tight",
                headerSubtitle: "text-zinc-500",
                socialButtonsBlockButton: "bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-100",
                socialButtonsBlockButtonText: "text-zinc-100 font-medium",
                dividerLine: "bg-zinc-800",
                dividerText: "text-zinc-600 uppercase tracking-widest text-[10px] font-bold",
                formFieldLabel: "text-zinc-500 uppercase tracking-widest text-[10px] font-bold",
                formFieldInput: "bg-zinc-950 border-zinc-800 text-zinc-100 focus:border-emerald-500/50",
                formButtonPrimary: "bg-zinc-100 text-zinc-950 hover:bg-zinc-200 font-bold",
                footerActionText: "text-zinc-500",
                footerActionLink: "text-emerald-500 hover:text-emerald-400 font-bold"
              }
            }}
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            forceRedirectUrl="/dashboard"
            fallbackRedirectUrl="/dashboard"
          />
        </div>
      </motion.div>
    </div>
  );
};
