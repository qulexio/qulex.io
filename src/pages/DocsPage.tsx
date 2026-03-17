import React from 'react';
import { motion } from 'motion/react';
import { Book, Code, Zap, Layers, Share2, Terminal } from 'lucide-react';

const DOC_SECTIONS = [
  {
    title: "Getting Started",
    icon: <Zap className="w-5 h-5" />,
    items: ["Introduction", "Quick Start Guide", "Agent Architecture", "Best Practices"]
  },
  {
    title: "Agent Playbooks",
    icon: <Layers className="w-5 h-5" />,
    items: ["Sales BDR Playbook", "Data Analysis Workflows", "DevOps Automation", "Custom Playbooks"]
  },
  {
    title: "API & Integrations",
    icon: <Terminal className="w-5 h-5" />,
    items: ["Authentication", "Webhooks", "REST API Reference", "SDKs (Python/JS)"]
  }
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[280px_1fr] gap-16">
          {/* Sidebar */}
          <aside className="hidden lg:block space-y-10 sticky top-32 h-fit">
            {DOC_SECTIONS.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                  {section.icon}
                  <span>{section.title}</span>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, iIdx) => (
                    <li key={iIdx}>
                      <a href="#" className="text-sm text-zinc-400 hover:text-emerald-500 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>

          {/* Content */}
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Documentation</h1>
              <p className="text-xl text-zinc-400 leading-relaxed">
                Learn how to deploy and manage your autonomous AI workforce with qulex.io.
              </p>
            </motion.div>

            <div className="prose prose-invert max-w-none space-y-12 text-zinc-400 leading-relaxed">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-zinc-100">What is an Autonomous Agent?</h2>
                <p>
                  Unlike traditional chatbots, qulex.io agents are autonomous entities capable of executing multi-step playbooks. They can research leads, process datasets, and interact with your existing tools (CRM, Slack, Email) without constant human supervision.
                </p>
              </section>

              <section className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-4">
                <h3 className="text-lg font-bold text-emerald-500 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Core Concepts
                </h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Playbooks:</strong> Structured sets of instructions and logic that define an agent's behavior.</li>
                  <li><strong>Actions:</strong> Individual tasks an agent can perform (e.g., "Send Email", "Query Database").</li>
                  <li><strong>Memory:</strong> The ability for agents to retain context across different sessions and tasks.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-zinc-100">Quick Start</h2>
                <p>
                  To get started with your first agent, follow these three steps:
                </p>
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <strong>Select a Template:</strong> Browse the Marketplace and choose a pre-trained agent template (e.g., Sales BDR).
                  </li>
                  <li>
                    <strong>Connect Integrations:</strong> Link your CRM or communication tools to give the agent the necessary access.
                  </li>
                  <li>
                    <strong>Deploy Playbook:</strong> Review the default playbook, make any necessary adjustments, and hit "Deploy".
                  </li>
                </ol>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
