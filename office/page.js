'use client';

import { useState, useEffect } from 'react';
import { Coffee, Users, Monitor, Clock, AlertCircle, CheckCircle, Zap, RotateCw } from 'lucide-react';

const workstations = [
  // COORDINATION
  {
    id: 'rawr-bot',
    name: 'Rawr Bot',
    role: 'Coordinator',
    desk: 'Main Desk',
    status: 'working',
    task: 'Routing tasks to audit team...',
    progress: 0,
    lastAction: 'Live',
    team: 'Coordination',
  },
  // AUDIT TEAM
  {
    id: 'tech-auditor',
    name: 'Technical Auditor',
    role: 'Tech SEO',
    desk: 'Desk A1',
    status: 'idle',
    task: 'Ready for next audit',
    progress: 0,
    lastAction: '2026-03-20 07:00 UTC',
    team: 'Audit',
  },
  {
    id: 'onpage-auditor',
    name: 'On-Page Auditor',
    role: 'On-Page SEO',
    desk: 'Desk A2',
    status: 'idle',
    task: 'Waiting for assignments',
    progress: 0,
    lastAction: '2026-03-20 06:30 UTC',
    team: 'Audit',
  },
  {
    id: 'content-auditor',
    name: 'Content Auditor',
    role: 'Content',
    desk: 'Desk A3',
    status: 'working',
    task: 'E-E-A-T analysis for Bandera Jewelers',
    progress: 65,
    lastAction: 'Live',
    team: 'Audit',
  },
  {
    id: 'local-auditor',
    name: 'Local Auditor',
    role: 'Local SEO',
    desk: 'Desk A4',
    status: 'idle',
    task: 'Standing by for local audits',
    progress: 0,
    lastAction: '2026-03-20 08:00 UTC',
    team: 'Audit',
  },
  {
    id: 'schema-auditor',
    name: 'Schema Auditor',
    role: 'Schema',
    desk: 'Desk A5',
    status: 'idle',
    task: 'Schema templates ready',
    progress: 0,
    lastAction: '2026-03-20 07:30 UTC',
    team: 'Audit',
  },
  // WEBSITE TEAM
  {
    id: 'designer',
    name: 'Designer',
    role: 'UI Designer',
    desk: 'Desk W1',
    status: 'working',
    task: 'Design specs for Alexander\'s Roofing site',
    progress: 85,
    lastAction: 'Live',
    team: 'Website',
  },
  {
    id: 'developer',
    name: 'Developer',
    role: 'Full-Stack',
    desk: 'Desk W2',
    status: 'working',
    task: 'Next.js deployment to Vercel',
    progress: 72,
    lastAction: 'Live',
    team: 'Website',
  },
  {
    id: 'qa-agent',
    name: 'QA Agent',
    role: 'Tester',
    desk: 'Desk W3',
    status: 'idle',
    task: 'Testing suite prepared',
    progress: 0,
    lastAction: '2026-03-20 07:15 UTC',
    team: 'Website',
  },
  // OPERATIONS
  {
    id: 'monitoring',
    name: 'Monitoring Agent',
    role: 'Watcher',
    desk: 'Dashboard',
    status: 'working',
    task: 'Tracking 3 active clients + keywords',
    progress: 100,
    lastAction: 'Live',
    team: 'Operations',
  },
  {
    id: 'reporting',
    name: 'Reporting Agent',
    role: 'Reporter',
    desk: 'Analytics',
    status: 'idle',
    task: 'Next report: March 21 8:00 AM',
    progress: 0,
    lastAction: '2026-03-20 08:00 UTC',
    team: 'Operations',
  },
  {
    id: 'citation-builder',
    name: 'Citation Builder',
    role: 'Citations',
    desk: 'Desk O1',
    status: 'idle',
    task: 'Ready for citation work',
    progress: 0,
    lastAction: '2026-03-20 07:45 UTC',
    team: 'Operations',
  },
];

const statusConfig = {
  working: { color: 'bg-green-500/20 text-green-400', icon: Zap, light: 'bg-green-500' },
  idle: { color: 'bg-gray-500/20 text-gray-400', icon: Coffee, light: 'bg-gray-500' },
  error: { color: 'bg-red-500/20 text-red-400', icon: AlertCircle, light: 'bg-red-500' },
};

function Workstation({ agent, onClick }) {
  const status = statusConfig[agent.status] || statusConfig.idle;
  const StatusIcon = status.icon;

  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all cursor-pointer hover:shadow-lg overflow-hidden group"
    >
      {/* Monitor Bezel */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-4">
        <div className={`rounded-lg p-4 bg-black border-2 ${status.light === 'bg-green-500' ? 'border-green-500' : status.light === 'bg-red-500' ? 'border-red-500' : 'border-gray-700'}`}>
          {/* Status LED */}
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-3 h-3 rounded-full ${status.light} animate-pulse`}></div>
            <span className={`text-xs font-medium ${status.color}`}>{agent.status.toUpperCase()}</span>
          </div>

          {/* Agent Name */}
          <h3 className="text-lg font-bold text-white mb-1">{agent.name}</h3>
          <p className="text-gray-400 text-xs mb-3">{agent.role}</p>

          {/* Current Task */}
          <div className="mb-3">
            <p className="text-gray-500 text-xs mb-1">Current Task:</p>
            <p className="text-white text-xs leading-relaxed h-8 overflow-hidden">{agent.task}</p>
          </div>

          {/* Progress Bar */}
          {agent.progress > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-500 text-xs">Progress</span>
                <span className="text-blue-400 text-xs font-medium">{agent.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
                  style={{ width: `${agent.progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Last Action */}
          <p className="text-gray-500 text-xs">Last: {agent.lastAction}</p>
        </div>
      </div>

      {/* Desk Label */}
      <div className="px-4 py-2 bg-gray-900 border-t border-gray-700 text-center">
        <p className="text-gray-400 text-xs font-medium">{agent.desk}</p>
      </div>
    </div>
  );
}

export default function OfficePage() {
  const [agents, setAgents] = useState(workstations);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load real data from JSON file
    fetch('/data/status.json')
      .then((res) => res.json())
      .then((data) => {
        if (data.workstations) {
          setAgents(data.workstations);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load workstations:', err);
        setLoading(false);
      });
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      // Simulate random status updates
      setAgents((prev) =>
        prev.map((agent) => ({
          ...agent,
          lastAction: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'UTC',
          }) + ' UTC',
          progress: Math.min(100, agent.progress + Math.floor(Math.random() * 10)),
        }))
      );
      setRefreshing(false);
    }, 500);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <Users className="w-8 h-8" />
              The Office
            </h1>
            <p className="text-gray-400 mt-1">Your AI team working in real time</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <RotateCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <p className="text-gray-400 text-xs">Working</p>
            <p className="text-2xl font-bold text-green-400">{agents.filter((a) => a.status === 'working').length}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <p className="text-gray-400 text-xs">Idle</p>
            <p className="text-2xl font-bold text-gray-400">{agents.filter((a) => a.status === 'idle').length}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <p className="text-gray-400 text-xs">Total</p>
            <p className="text-2xl font-bold text-blue-400">{agents.length}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <p className="text-gray-400 text-xs">Teams</p>
            <p className="text-2xl font-bold text-purple-400">4</p>
          </div>
        </div>
      </div>

      {/* Team Sections */}
      {['Coordination', 'Audit', 'Website', 'Operations'].map((teamName) => {
        const teamAgents = agents.filter((a) => a.team === teamName);
        if (teamAgents.length === 0) return null;
        return (
          <div key={teamName} className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              {teamName}
              <span className="text-sm text-gray-500">({teamAgents.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamAgents.map((agent) => (
                <Workstation key={agent.id} agent={agent} onClick={() => setSelectedAgent(agent)} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Selected Agent Detail */}
      {selectedAgent && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">{selectedAgent.name}</h2>
            <button
              onClick={() => setSelectedAgent(null)}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 text-sm mb-2">Role</p>
              <p className="text-white text-lg font-semibold">{selectedAgent.role}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Desk</p>
              <p className="text-white text-lg font-semibold">{selectedAgent.desk}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Status</p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    selectedAgent.status === 'working' ? 'bg-green-500' : 'bg-gray-500'
                  } animate-pulse`}
                ></div>
                <span className="text-white text-lg font-semibold capitalize">{selectedAgent.status}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Last Action</p>
              <p className="text-white text-lg font-semibold">{selectedAgent.lastAction}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-gray-400 text-sm mb-2">Current Work</p>
            <p className="text-white text-lg">{selectedAgent.task}</p>
            {selectedAgent.progress > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Progress</span>
                  <span className="text-blue-400 font-medium">{selectedAgent.progress}%</span>
                </div>
                <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 transition-all"
                    style={{ width: `${selectedAgent.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}