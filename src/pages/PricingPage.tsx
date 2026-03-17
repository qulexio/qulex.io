import React from 'react';
import { Check, Bot, Zap, Shield, Users, Globe, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const PLANS = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for individuals exploring AI automation.",
    features: [
      "1 Active Agent",
      "100 Tasks / month",
      "Standard Marketplace access",
      "Community support",
      "Basic integrations"
    ],
    cta: "Get Started",
    highlight: false
  },
  {
    name: "Pro",
    price: "$49",
    description: "For high-performance teams scaling operations.",
    features: [
      "5 Active Agents",
      "5,000 Tasks / month",
      "Advanced Agent templates",
      "Priority email support",
      "Custom integrations",
      "API access"
    ],
    cta: "Start Free Trial",
    highlight: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Global infrastructure for large-scale organizations.",
    features: [
      "Unlimited Agents",
      "Unlimited Tasks",
      "Dedicated Account Manager",
      "SLA & Custom Security",
      "On-premise deployment",
      "White-glove onboarding"
    ],
    cta: "Contact Sales",
    highlight: false
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Simple, <span className="text-emerald-500">Transparent</span> Pricing
          </motion.h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Scale your AI workforce without scaling your headcount. Choose the plan that fits your operational needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 rounded-2xl border ${
                plan.highlight 
                  ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_40px_rgba(16,185,129,0.1)]' 
                  : 'border-zinc-800 bg-zinc-900/30'
              } flex flex-col`}
            >
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-zinc-500 text-sm">/month</span>}
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold transition-all active:scale-95 ${
                plan.highlight
                  ? 'bg-emerald-500 text-black hover:bg-emerald-400'
                  : 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700'
              }`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Preview */}
        <div className="mt-32 p-12 rounded-3xl border border-zinc-800 bg-zinc-900/30">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
              <p className="text-zinc-400">Everything you need to know about qulex.io pricing and billing.</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-bold">Can I change plans later?</h4>
                <p className="text-sm text-zinc-500">Yes, you can upgrade or downgrade your plan at any time from your dashboard settings.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold">What counts as a "Task"?</h4>
                <p className="text-sm text-zinc-500">A task is any single autonomous action performed by an agent, such as sending an email, researching a lead, or processing a data row.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
