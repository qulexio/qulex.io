import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText, CheckCircle2, Globe } from 'lucide-react';

const COMPLIANCE = [
  { name: "SOC 2 Type II", status: "Certified", icon: <Shield className="w-5 h-5" /> },
  { name: "GDPR", status: "Compliant", icon: <Globe className="w-5 h-5" /> },
  { name: "HIPAA", status: "Ready", icon: <FileText className="w-5 h-5" /> },
  { name: "ISO 27001", status: "In Progress", icon: <Lock className="w-5 h-5" /> }
];

export default function TrustCenterPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Trust & <span className="text-emerald-500">Security</span>
          </motion.h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Security isn't an afterthought at qulex.io—it's the foundation of everything we build. We maintain the highest standards of data protection and compliance.
          </p>
        </div>

        {/* Compliance Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {COMPLIANCE.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-emerald-500">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-xs text-emerald-500 font-mono uppercase tracking-widest mt-1">{item.status}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Security Pillars */}
        <div className="grid md:grid-cols-2 gap-12 mb-32">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-emerald-500">
                <Lock className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Data Encryption</h2>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                All data is encrypted at rest using AES-256 and in transit using TLS 1.3. We use industry-standard key management systems to ensure your secrets stay secret.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-emerald-500">
                <Eye className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Privacy Controls</h2>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Granular access controls allow you to define exactly what each agent and team member can see. We never use your data to train our global models without explicit consent.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/30 space-y-6">
            <h3 className="text-xl font-bold">Security Checklist</h3>
            <ul className="space-y-4">
              {[
                "Single Sign-On (SSO) integration",
                "Regular third-party penetration testing",
                "24/7 security monitoring & alerting",
                "Automated vulnerability scanning",
                "Strict internal access policies (PoLP)",
                "Comprehensive audit logging"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Security */}
        <div className="text-center p-12 rounded-3xl bg-emerald-500 text-black">
          <h2 className="text-3xl font-bold mb-4">Found a vulnerability?</h2>
          <p className="font-medium opacity-80 mb-8 max-w-xl mx-auto">
            We take security seriously. If you've discovered a security issue, please report it to our security team.
          </p>
          <button className="px-8 py-4 bg-black text-white rounded-xl font-bold hover:bg-zinc-900 transition-all">
            Report a Security Issue
          </button>
        </div>
      </div>
    </div>
  );
}
