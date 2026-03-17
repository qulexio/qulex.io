import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  User, 
  Building2, 
  Target, 
  Zap, 
  Layers, 
  Share2,
  Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';

type OnboardingData = {
  role: string;
  company_size: string;
  primary_goal: string;
  technical_level: string;
  use_case: string[];
  referral_source: string;
};

const ROLES = [
  'Product Manager',
  'Software Engineer',
  'Designer',
  'Founder / CEO',
  'Marketing',
  'Sales',
  'Other'
];

const COMPANY_SIZES = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '500+ employees'
];

const TECH_LEVELS = [
  { label: 'Beginner', description: 'Just starting out with technical tools' },
  { label: 'Intermediate', description: 'Comfortable with APIs and basic scripting' },
  { label: 'Advanced', description: 'Experienced developer or technical lead' },
  { label: 'Expert', description: 'Building complex systems and architectures' }
];

const USE_CASES = [
  'Internal Tools',
  'Customer Dashboards',
  'Data Visualization',
  'Process Automation',
  'Legacy Modernization',
  'Prototyping'
];

const REFERRAL_SOURCES = [
  'Twitter / X',
  'LinkedIn',
  'Product Hunt',
  'Google Search',
  'Friend / Colleague',
  'Other'
];

export default function OnboardingForm({ onComplete }: { onComplete?: () => void }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>({
    role: '',
    company_size: '',
    primary_goal: '',
    technical_level: '',
    use_case: [],
    referral_source: ''
  });

  const totalSteps = 6;

  const nextStep = () => {
    console.log('Moving to next step:', step + 1);
    setStep((s) => Math.min(s + 1, totalSteps));
  };
  const prevStep = () => {
    console.log('Moving to previous step:', step - 1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleUpdate = (field: keyof OnboardingData, value: any) => {
    console.log(`Updating ${field}:`, value);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleUseCase = (useCase: string) => {
    setFormData((prev) => ({
      ...prev,
      use_case: prev.use_case.includes(useCase)
        ? prev.use_case.filter((u) => u !== useCase)
        : [...prev.use_case, useCase]
    }));
  };

  const handleSubmit = async () => {
    console.log('Submitting onboarding data:', formData);
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.warn('No authenticated user found. Simulating submission...');
        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        console.log('Updating profile for user:', user.id);
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            ...formData,
            onboarding_completed: true,
            updated_at: new Date().toISOString()
          });

        if (error) throw error;
        console.log('Profile updated successfully');
      }
      
      setCompleted(true);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to save onboarding data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-text-heading">What is your role?</h2>
              <p className="text-text-muted">Help us tailor the experience to your daily workflow.</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {ROLES.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    handleUpdate('role', role);
                    nextStep();
                  }}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left",
                    formData.role === role 
                      ? "border-brand bg-brand/10 text-text-heading" 
                      : "border-border bg-card/50 text-text-muted hover:border-brand/50 hover:bg-card"
                  )}
                >
                  <span className="font-medium">{role}</span>
                  {formData.role === role && <Check className="w-4 h-4 text-brand" />}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-text-heading">Company size</h2>
              <p className="text-text-muted">We have different solutions for teams of all sizes.</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {COMPANY_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    handleUpdate('company_size', size);
                    nextStep();
                  }}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left",
                    formData.company_size === size 
                      ? "border-brand bg-brand/10 text-text-heading" 
                      : "border-border bg-card/50 text-text-muted hover:border-brand/50 hover:bg-card"
                  )}
                >
                  <span className="font-medium">{size}</span>
                  {formData.company_size === size && <Check className="w-4 h-4 text-brand" />}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-text-heading">What's your primary goal?</h2>
              <p className="text-text-muted">Tell us what you're hoping to achieve with Qulex.</p>
            </div>
            <textarea
              value={formData.primary_goal}
              onChange={(e) => handleUpdate('primary_goal', e.target.value)}
              placeholder="I want to build a custom CRM for my sales team..."
              className="w-full h-40 p-4 rounded-xl border border-border bg-card/50 text-text-heading placeholder:text-text-muted focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all resize-none"
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-text-heading">Technical level</h2>
              <p className="text-text-muted">This helps us suggest the right building blocks.</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {TECH_LEVELS.map((level) => (
                <button
                  key={level.label}
                  type="button"
                  onClick={() => {
                    handleUpdate('technical_level', level.label);
                    nextStep();
                  }}
                  className={cn(
                    "flex flex-col p-4 rounded-xl border transition-all duration-200 text-left",
                    formData.technical_level === level.label 
                      ? "border-brand bg-brand/10" 
                      : "border-border bg-card/50 hover:border-brand/50 hover:bg-card"
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={cn("font-semibold", formData.technical_level === level.label ? "text-text-heading" : "text-text-muted")}>
                      {level.label}
                    </span>
                    {formData.technical_level === level.label && <Check className="w-4 h-4 text-brand" />}
                  </div>
                  <span className="text-sm text-text-muted">{level.description}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-text-heading">Select your use cases</h2>
              <p className="text-text-muted">Pick as many as you like. You can change these later.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {USE_CASES.map((useCase) => (
                <button
                  key={useCase}
                  type="button"
                  onClick={() => toggleUseCase(useCase)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 text-left",
                    formData.use_case.includes(useCase) 
                      ? "border-brand bg-brand/10 text-text-heading" 
                      : "border-border bg-card/50 text-text-muted hover:border-brand/50 hover:bg-card"
                  )}
                >
                  <div className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                    formData.use_case.includes(useCase) ? "bg-brand border-brand" : "border-border"
                  )}>
                    {formData.use_case.includes(useCase) && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="font-medium text-sm">{useCase}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-text-heading">How did you hear about us?</h2>
              <p className="text-text-muted">Last step! We're curious how you found your way here.</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {REFERRAL_SOURCES.map((source) => (
                <button
                  key={source}
                  type="button"
                  onClick={() => handleUpdate('referral_source', source)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left",
                    formData.referral_source === source 
                      ? "border-brand bg-brand/10 text-text-heading" 
                      : "border-border bg-card/50 text-text-muted hover:border-brand/50 hover:bg-card"
                  )}
                >
                  <span className="font-medium">{source}</span>
                  {formData.referral_source === source && <Check className="w-4 h-4 text-brand" />}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (completed) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full p-8 rounded-2xl border border-border bg-card text-center space-y-6"
      >
        <div className="w-16 h-16 bg-brand/20 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-brand" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-text-heading">You're all set!</h2>
          <p className="text-text-muted">Welcome to Qulex. We've customized your workspace based on your preferences.</p>
        </div>
        <button 
          type="button"
          onClick={() => {
            console.log('Success screen: Go to Dashboard clicked');
            if (onComplete) {
              onComplete();
            } else {
              window.location.href = '/';
            }
          }}
          className="w-full py-3 px-6 rounded-xl bg-brand text-white font-semibold glow-button"
        >
          Go to Dashboard
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-xl w-full px-4">
      {/* Progress Bar */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-brand"
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
          Step {step} of {totalSteps}
        </span>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="p-8 rounded-2xl border border-border bg-card shadow-2xl"
          >
            {renderStep()}

            <div className="mt-10 flex items-center justify-between pt-6 border-t border-border">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  step === 1 ? "opacity-0 pointer-events-none" : "text-text-muted hover:text-text-heading"
                )}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>

              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={
                    (step === 1 && !formData.role) ||
                    (step === 2 && !formData.company_size) ||
                    (step === 3 && !formData.primary_goal) ||
                    (step === 4 && !formData.technical_level) ||
                    (step === 5 && formData.use_case.length === 0)
                  }
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand text-white font-semibold glow-button disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || !formData.referral_source}
                  className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-brand text-white font-semibold glow-button disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Complete Setup"
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Step Indicators */}
      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div 
            key={i}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-colors duration-300",
              i + 1 === step ? "bg-brand" : i + 1 < step ? "bg-brand/40" : "bg-border"
            )}
          />
        ))}
      </div>
    </div>
  );
}
