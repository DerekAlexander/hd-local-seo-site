'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const defaultWorkflows = [
  {
    id: 1,
    name: 'Morning Report',
    description: 'Daily 8 AM briefing to Discord #gmail-jobs',
    status: 'running',
    lastRun: '2026-03-19T08:00:00Z',
    nextRun: '2026-03-20T08:00:00Z',
  },
];

const statusConfig = {
  active: { color: 'text-green-400', bg: 'bg-green-500/20', icon: CheckCircle },
  running: { color: 'text-green-400', bg: 'bg-green-500/20', icon: CheckCircle },
  idle: { color: 'text-gray-400', bg: 'bg-gray-500/20', icon: Clock },
  paused: { color: 'text-gray-400', bg: 'bg-gray-500/20', icon: Clock },
  error: { color: 'text-red-400', bg: 'bg-red-500/20', icon: AlertCircle },
};

export default function AutomationPage() {
  const [items, setItems] = useState(defaultWorkflows);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load real data from JSON file
    fetch('/data/status.json')
      .then((res) => res.json())
      .then((data) => {
        if (data.cronJobs) {
          // Convert cron jobs to workflow format
          const workflows = data.cronJobs.map(job => ({
            id: job.id,
            name: job.name,
            description: job.description,
            status: job.status,
            lastRun: job.lastRun,
            nextRun: job.nextRun,
          }));
          setItems(workflows);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load automation data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Automation</h1>
        <p className="text-gray-400 mt-1">Monitor and control automated workflows</p>
      </div>

      <div className="space-y-4">
        {items.map((workflow) => {
          const status = statusConfig[workflow.status];
          const StatusIcon = status.icon;

          return (
            <div key={workflow.id} className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{workflow.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                      <StatusIcon className="w-3 h-3 inline mr-1" />
                      {workflow.status}
                    </span>
                  </div>
                  <p className="text-gray-400">{workflow.description}</p>
                  <div className="flex items-center gap-6 mt-3 text-sm text-gray-500">
                    <span>Last run: {workflow.lastRun ? new Date(workflow.lastRun).toLocaleString() : 'Never'}</span>
                    {workflow.nextRun && (
                      <span>Next: {new Date(workflow.nextRun).toLocaleString()}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white">
                    <Play className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white">
                    <Pause className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white">
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}