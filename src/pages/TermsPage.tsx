import React from 'react';
import { motion } from 'motion/react';
import { Shield, Scale, FileText, Lock, Globe, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: Shield,
      content: "By accessing or using qulex.io (the \"Platform\"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law."
    },
    {
      id: "service",
      title: "2. Description of Service",
      icon: Globe,
      content: "qulex.io provides an autonomous AI orchestration platform that allows users to deploy, manage, and scale AI agents (\"Agents\"). These Agents are designed to execute complex workflows, interact with third-party integrations, and process data on behalf of the user. We reserve the right to modify, suspend, or discontinue any part of the Service at any time."
    },
    {
      id: "ai-usage",
      title: "3. AI Usage & Responsibilities",
      icon: Scale,
      content: "Users are solely responsible for the actions, outputs, and consequences of the Agents they deploy. You agree not to use Agents for: (a) generating harmful, illegal, or deceptive content; (b) automated harassment or spam; (c) unauthorized data scraping; or (d) any activity that violates third-party terms of service. qulex.io does not guarantee the accuracy or reliability of AI-generated outputs."
    },
    {
      id: "accounts",
      title: "4. Account Security",
      icon: Lock,
      content: "To access certain features, you must register for an account. You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account."
    },
    {
      id: "ip",
      title: "5. Intellectual Property",
      icon: FileText,
      content: "The Platform, including its original content, features, and functionality, is and will remain the exclusive property of qulex.io and its licensors. Users retain ownership of the specific data and custom playbooks they input into the Platform, but grant qulex.io a non-exclusive, worldwide license to process such data to provide the Service."
    },
    {
      id: "liability",
      title: "6. Limitation of Liability",
      icon: AlertCircle,
      content: "In no event shall qulex.io, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service."
    }
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 pt-32 pb-32">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-4 hidden lg:block sticky top-32 h-fit">
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Terms of Service</h1>
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
                  Have questions about our terms? Our legal team is here to help.
                </p>
                <a href="mailto:legal@qulex.io" className="text-xs font-bold text-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  legal@qulex.io
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-8 space-y-20">
            {/* Mobile Header */}
            <div className="lg:hidden space-y-4 mb-12">
              <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
              <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest">Last Updated: March 15, 2026</p>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-zinc-400 leading-relaxed mb-16">
                Please read these terms of service carefully before using our platform. These terms govern your access to and use of qulex.io and its autonomous AI services.
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

              {/* Final Note */}
              <div className="mt-32 pt-12 border-t border-white/5">
                <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
                  <h3 className="text-lg font-bold text-white mb-4">Summary for Humans</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    We provide powerful AI tools, but you are responsible for how you use them. Don't do illegal things, don't spam, and respect others' privacy. We own the platform, you own your data. We aren't liable if the AI makes a mistake, so always keep a human in the loop for critical decisions.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
