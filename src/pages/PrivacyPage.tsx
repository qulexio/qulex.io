import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText, Database, UserCheck } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      id: "collection",
      title: "1. Information We Collect",
      icon: Database,
      content: "We collect information that you provide directly to us, such as when you create an account, configure an Agent, or communicate with our support team. This includes: (a) Account Information (name, email, billing address); (b) Configuration Data (playbooks, tool credentials, integration settings); and (c) Usage Data (IP addresses, browser type, and interaction logs with our Agents)."
    },
    {
      id: "usage",
      title: "2. How We Use Information",
      icon: Eye,
      content: "We use the information we collect to: (a) Provide, maintain, and improve our Platform; (b) Execute autonomous workflows as directed by you; (c) Process transactions and send related information; (d) Send technical notices, updates, and security alerts; and (e) Monitor and analyze trends, usage, and activities in connection with our Service."
    },
    {
      id: "sharing",
      title: "3. Sharing of Information",
      icon: FileText,
      content: "We do not sell your personal data. We may share information as follows: (a) With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf; (b) In response to a request for information if we believe disclosure is in accordance with any applicable law; and (c) With your consent or at your direction."
    },
    {
      id: "security",
      title: "4. Data Security",
      icon: Lock,
      content: "We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. This includes AES-256 encryption at rest and TLS 1.3 for all data in transit. We regularly undergo security audits to ensure our infrastructure meets industry standards."
    },
    {
      id: "ai-privacy",
      title: "5. AI & Data Privacy",
      icon: Shield,
      content: "qulex.io respects the confidentiality of your inputs and outputs. We do not use your private data or Agent execution logs to train our global base models without your explicit, written consent. Your custom playbooks and specialized Agent logic remain your exclusive property."
    },
    {
      id: "rights",
      title: "6. Your Rights & Choices",
      icon: UserCheck,
      content: "Depending on your location, you may have the right to: (a) Access, correct, or delete your personal data; (b) Object to or restrict certain processing; and (c) Receive a copy of your data in a portable format. You can manage your privacy settings and data exports directly through your account dashboard."
    }
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 pt-32 pb-32">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-4 hidden lg:block sticky top-32 h-fit">
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Privacy Policy</h1>
                <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest">Last Updated: March 15, 2026</p>
              </div>
              
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a 
                    key={section.id}
                    href={`#${section.id}`}
                    className="block px-4 py-2 text-sm text-zinc-500 hover:text-emerald-500 hover:bg-emerald-500/5 rounded-lg transition-all border-l border-transparent hover:border-emerald-500/50"
                  >
                    {section.title.split('. ')[1]}
                  </a>
                ))}
              </nav>

              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-4">
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Concerned about your data? Our privacy officer is available for consultation.
                </p>
                <a href="mailto:privacy@qulex.io" className="text-xs font-bold text-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  privacy@qulex.io
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-8 space-y-20">
            {/* Mobile Header */}
            <div className="lg:hidden space-y-4 mb-12">
              <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
              <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest">Last Updated: March 15, 2026</p>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-zinc-400 leading-relaxed mb-16">
                At qulex.io, we believe privacy is a fundamental right. This policy outlines how we handle your data with the transparency and security you expect from a high-performance AI platform.
              </p>

              <div className="space-y-24">
                {sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-32 group">
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-emerald-500/30 transition-colors">
                        <section.icon className="w-6 h-6 text-zinc-500 group-hover:text-emerald-500 transition-colors" />
                      </div>
                      <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">{section.title}</h2>
                        <p className="text-zinc-400 leading-relaxed text-lg">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </section>
                ))}
              </div>

              {/* Trust Badge */}
              <div className="mt-32 pt-12 border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 text-center space-y-2">
                    <div className="text-emerald-500 font-bold">GDPR</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Compliant</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 text-center space-y-2">
                    <div className="text-emerald-500 font-bold">SOC 2</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Type II Certified</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 text-center space-y-2">
                    <div className="text-emerald-500 font-bold">AES-256</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Encryption</div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
