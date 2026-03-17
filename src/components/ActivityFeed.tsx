import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface ActivityItem {
  id: string;
  timestamp: string;
  source: string;
  message: string;
  status: 'success' | 'info' | 'warning';
}

const MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: '1',
    timestamp: '12:30 PM',
    source: 'Content Agent',
    message: 'Researching AI trends for weekly newsletter...',
    status: 'success'
  },
  {
    id: '2',
    timestamp: '12:35 PM',
    source: 'Support Agent',
    message: 'Resolved 5 customer tickets in the last 10 minutes.',
    status: 'success'
  },
  {
    id: '3',
    timestamp: '01:00 PM',
    source: 'System',
    message: '100 Credits refilled via Clerk profile.',
    status: 'info'
  },
  {
    id: '4',
    timestamp: '01:15 PM',
    source: 'RevenueFlow',
    message: 'Initiated outreach sequence for 12 new prospects.',
    status: 'success'
  }
];

export default function ActivityFeed() {
  return (
    <div className="space-y-6">
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-zinc-800" />

        <div className="space-y-8">
          {MOCK_ACTIVITY.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-8 group"
            >
              {/* Dot */}
              <div className={cn(
                "absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full border-2 border-[#09090b] z-10 transition-transform group-hover:scale-125",
                item.status === 'success' ? "bg-[#10b981]" : 
                item.status === 'info' ? "bg-blue-500" : "bg-red-500"
              )} />

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    [{item.timestamp}]
                  </span>
                  <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">
                    {item.source}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-200 transition-colors">
                  {item.message}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
