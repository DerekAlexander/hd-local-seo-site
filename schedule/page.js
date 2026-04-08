'use client';

import { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, Play, Pause, Trash2, Plus } from 'lucide-react';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

// Default data while loading
const defaultCronJobs = [
  {
    id: 1,
    name: 'Morning Report',
    description: 'Daily 8 AM briefing to Discord #gmail-jobs',
    schedule: 'Daily @ 8:00 AM CST',
    time: '08:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    status: 'active',
    lastRun: '2026-03-19 08:00:15 UTC',
    nextRun: '2026-03-20 08:00:00 UTC',
    output: '#gmail-jobs',
    model: 'openrouter/hunter-alpha',
  },
  {
    id: 2,
    name: 'Daily Lead Gen',
    description: 'Find 5-10 SEO prospects from different industries',
    schedule: 'Daily @ 8:30 AM CST',
    time: '08:30',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    status: 'active',
    lastRun: '2026-03-19 08:30:22 UTC',
    nextRun: '2026-03-20 08:30:00 UTC',
    output: '#gmail-jobs',
    model: 'openrouter/hunter-alpha',
  },
  {
    id: 3,
    name: 'Daily Twitter Scraper',
    description: 'Follow 10 new indie hackers + scrape 10 accounts for app ideas',
    schedule: 'Daily @ 8:30 AM CST',
    time: '08:30',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    status: 'active',
    lastRun: '-',
    nextRun: '2026-03-20 08:30:00 UTC',
    output: '#gmail-jobs',
    model: 'openrouter/auto',
  },
  {
    id: 4,
    name: 'Extract App Ideas',
    description: 'Generate 10 app ideas from Twitter scrape content',
    schedule: 'Daily @ 8:45 AM CST',
    time: '08:45',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    status: 'active',
    lastRun: '-',
    nextRun: '2026-03-20 08:45:00 UTC',
    output: '#gmail-jobs + app-ideas-backlog.md',
    model: 'openrouter/auto',
  },
];

function TimelineGrid() {
  return (
    <div className="mb-8">
      <h3 className="text-gray-400 text-sm font-semibold mb-4">WEEKLY TIMELINE</h3>
      <div className="overflow-x-auto">
        <div className="grid gap-1" style={{ gridTemplateColumns: `80px repeat(7, 1fr)` }}>
          {/* Hour labels */}
          <div className="text-gray-500 text-xs font-semibold p-2">Time</div>
          {weekDays.map((day) => (
            <div key={day} className="text-gray-400 text-xs font-semibold p-2 text-center">
              {day}
            </div>
          ))}

          {/* 8 AM row */}
          <div className="text-gray-500 text-xs p-2">08:00</div>
          {weekDays.map((day, idx) => (
            <div
              key={`8-${day}`}
              className="bg-blue-500/30 border border-blue-500/50 rounded p-1 text-center text-xs text-blue-300 font-medium"
            >
              📊
            </div>
          ))}

          {/* 8:30 row */}
          <div className="text-gray-500 text-xs p-2">08:30</div>
          {weekDays.map((day, idx) => (
            <div
              key={`8:30-${day}`}
              className="bg-green-500/30 border border-green-500/50 rounded p-1 text-center text-xs text-green-300 font-medium"
            >
              🎯
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500/30 border border-blue-500/50 rounded"></div>
          <span className="text-gray-400">Morning Report</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500/30 border border-green-500/50 rounded"></div>
          <span className="text-gray-400">Daily Lead Gen</span>
        </div>
      </div>
    </div>
  );
}

function JobCard({ job, onPause, onDelete }) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-gray-600 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">{job.name}</h3>
          <p className="text-gray-400 text-sm">{job.description}</p>
        </div>
        <div className="flex items-center gap-2">
          {job.status === 'active' ? (
            <span className="flex items-center gap-1 text-green-400 text-xs font-medium bg-green-500/20 px-2 py-1 rounded-full">
              <CheckCircle className="w-3 h-3" />
              Active
            </span>
          ) : (
            <span className="flex items-center gap-1 text-gray-400 text-xs font-medium bg-gray-500/20 px-2 py-1 rounded-full">
              <Pause className="w-3 h-3" />
              Paused
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-500 text-xs mb-1">Schedule</p>
          <p className="text-white font-medium">{job.schedule}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Output</p>
          <p className="text-white font-medium">{job.output}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Last Run</p>
          <p className="text-white font-medium text-sm">{job.lastRun}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Next Run</p>
          <p className="text-white font-medium text-sm">{job.nextRun}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-500 text-xs mb-2">Model</p>
        <p className="text-blue-400 text-sm font-medium">{job.model}</p>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-gray-700">
        <button
          onClick={() => onPause(job.id)}
          className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-300 text-xs transition-colors"
        >
          <Pause className="w-3 h-3" />
          Pause
        </button>
        <button
          onClick={() => onDelete(job.id)}
          className="flex items-center gap-2 px-3 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs transition-colors"
        >
          <Trash2 className="w-3 h-3" />
          Delete
        </button>
        <button className="ml-auto flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs transition-colors">
          <Play className="w-3 h-3" />
          Run Now
        </button>
      </div>
    </div>
  );
}

export default function SchedulePage() {
  const [jobs, setJobs] = useState(defaultCronJobs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load real data from JSON file
    fetch('/data/status.json')
      .then((res) => res.json())
      .then((data) => {
        if (data.cronJobs) {
          setJobs(data.cronJobs);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load cron jobs:', err);
        setLoading(false);
      });
  }, []);

  const handlePause = (id) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status: job.status === 'active' ? 'paused' : 'active' } : job
      )
    );
  };

  const handleDelete = (id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const activeJobs = jobs.filter((j) => j.status === 'active').length;
  const totalJobs = jobs.length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <Clock className="w-8 h-8" />
              Schedule
            </h1>
            <p className="text-gray-400 mt-1">Weekly cron jobs and automation</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Plus className="w-5 h-5" />
            Add Job
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <p className="text-gray-400 text-xs">Active</p>
            <p className="text-2xl font-bold text-green-400">{activeJobs}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <p className="text-gray-400 text-xs">Total</p>
            <p className="text-2xl font-bold text-blue-400">{totalJobs}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <p className="text-gray-400 text-xs">Timezone</p>
            <p className="text-lg font-bold text-white">America/Chicago</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <TimelineGrid />

      {/* Jobs List */}
      <div className="mb-8">
        <h3 className="text-gray-400 text-sm font-semibold mb-4">ALL JOBS</h3>
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onPause={handlePause} onDelete={handleDelete} />
          ))}
        </div>
      </div>

      {/* Cron Expressions Reference */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h4 className="text-white font-semibold mb-4">Cron Reference</h4>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-blue-300 font-medium mb-2">Morning Report</p>
            <p className="text-gray-400 font-mono">0 8 * * *</p>
            <p className="text-gray-500 text-xs mt-1">Every day at 8:00 AM</p>
          </div>
          <div>
            <p className="text-green-300 font-medium mb-2">Daily Lead Gen</p>
            <p className="text-gray-400 font-mono">30 8 * * *</p>
            <p className="text-gray-500 text-xs mt-1">Every day at 8:30 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
}