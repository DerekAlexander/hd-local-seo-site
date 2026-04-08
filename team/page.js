'use client';

import { useState } from 'react';
import { Users, BarChart, Zap, Settings, Shield, Brain, CheckCircle, Code, Layers, Send, FileText, Search, Eye, Mail, Webcam, FileSearch, Calendar, Bot } from 'lucide-react';

const teamHierarchy = {
  ceo: {
    name: 'Derek',
    role: 'CEO / Human',
    description: 'Reviews reports, makes decisions, owns everything',
    icon: Shield,
    tags: ['Boss', 'Decisions'],
    skills: [],
    color: 'from-purple-600 to-purple-800',
  },
  orchestration: [
    {
      name: 'Rawr Bot',
      role: 'Coordinator',
      description: 'Routes tasks to agents, manages conversations',
      icon: Bot,
      tags: ['Orchestration', 'Main AI'],
      skills: ['adaptive-reasoning', 'task-resume', 'context-aware-delegation'],
      color: 'from-blue-600 to-blue-800',
      metric: '< 1 hr routing',
    },
  ],
  auditTeam: [
    {
      name: 'Technical Auditor',
      role: 'Tech SEO',
      description: 'Core Web Vitals, HTTPS, mobile, crawlability',
      icon: Eye,
      tags: ['Performance', 'Crawl'],
      skills: ['seo-1.0.3', 'seo-audit-automation'],
      color: 'from-cyan-600 to-cyan-800',
      metric: '< 2 hrs',
    },
    {
      name: 'On-Page Auditor',
      role: 'On-Page SEO',
      description: 'Meta tags, H1, keyword coverage',
      icon: Layers,
      tags: ['Meta', 'Keywords'],
      skills: ['seo-1.0.3', 'deadlink'],
      color: 'from-blue-600 to-blue-800',
      metric: '< 1.5 hrs',
    },
    {
      name: 'Content Auditor',
      role: 'Content',
      description: 'E-E-A-T, content depth, topic analysis',
      icon: Brain,
      tags: ['E-E-A-T', 'Content'],
      skills: ['seo-1.0.3', 'find-skills'],
      color: 'from-indigo-600 to-indigo-800',
      metric: '< 1.5 hrs',
    },
    {
      name: 'Local Auditor',
      role: 'Local SEO',
      description: 'GBP, citations, NAP, reviews',
      icon: Search,
      tags: ['Local', 'Citations'],
      skills: ['seo-1.0.3', 'gog'],
      color: 'from-green-600 to-green-800',
      metric: '< 1 hr',
    },
    {
      name: 'Schema Auditor',
      role: 'Schema',
      description: 'LocalBusiness, Service, FAQ schemas',
      icon: Code,
      tags: ['Schema', 'JSON-LD'],
      skills: ['seo-1.0.3', 'website'],
      color: 'from-orange-600 to-orange-800',
      metric: '< 1 hr',
    },
  ],
  websiteTeam: [
    {
      name: 'Designer',
      role: 'UI Designer',
      description: 'Design specs, component libraries',
      icon: Zap,
      tags: ['Figma', 'Spec'],
      skills: ['cad-design', 'website'],
      color: 'from-pink-600 to-pink-800',
      metric: '< 4 hrs',
    },
    {
      name: 'Developer',
      role: 'Full-Stack',
      description: 'Next.js builds, Vercel deploys',
      icon: Code,
      tags: ['Next.js', 'Deploy'],
      skills: ['website', 'cad-design'],
      color: 'from-violet-600 to-violet-800',
      metric: '< 8 hrs',
    },
    {
      name: 'QA Agent',
      role: 'Tester',
      description: 'Tests performance, schema, forms',
      icon: CheckCircle,
      tags: ['Testing', 'Lighthouse'],
      skills: ['seo-audit-automation', 'website'],
      color: 'from-emerald-600 to-emerald-800',
      metric: '< 2 hrs',
    },
  ],
  operations: [
    {
      name: 'Monitoring Agent',
      role: 'Watcher',
      description: 'Keyword tracking, traffic alerts',
      icon: BarChart,
      tags: ['Keywords', 'Alerts'],
      skills: ['seo-1.0.3', 'agent-autopilot'],
      color: 'from-red-600 to-red-800',
      metric: '< 1 hr alerts',
    },
    {
      name: 'Reporting Agent',
      role: 'Reporter',
      description: 'Monthly performance reports',
      icon: FileText,
      tags: ['Reports', 'Analytics'],
      skills: ['seo-audit-automation', 'gog'],
      color: 'from-yellow-600 to-yellow-800',
      metric: 'By 1st of month',
    },
    {
      name: 'Citation Builder',
      role: 'Citations',
      description: 'Builds and maintains local citations',
      icon: Send,
      tags: ['NAP', 'Local'],
      skills: ['seo-1.0.3', 'deadlink'],
      color: 'from-teal-600 to-teal-800',
      metric: '< 4 hrs',
    },
  ],
};

function AgentCard({ agent }) {
  const Icon = agent.icon;
  return (
    <div className={`bg-gradient-to-br ${agent.color} rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all hover:shadow-lg cursor-pointer group`}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-black/30 rounded-lg flex items-center justify-center group-hover:bg-black/50 transition-colors">
          <Icon className="w-6 h-6 text-white" />
        </div>
        {agent.metric && (
          <span className="text-xs font-medium text-white/80 bg-black/30 px-2 py-1 rounded">
            {agent.metric}
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold text-white mb-1">{agent.name}</h3>
      <p className="text-white/70 text-sm font-medium mb-2">{agent.role}</p>
      <p className="text-white/60 text-xs leading-relaxed mb-4">{agent.description}</p>
      
      {/* Skills */}
      {agent.skills && agent.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {agent.skills.map((skill) => (
            <span key={skill} className="text-xs bg-blue-500/30 text-blue-300 px-2 py-1 rounded border border-blue-500/30">
              {skill}
            </span>
          ))}
        </div>
      )}
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {agent.tags.map((tag) => (
          <span key={tag} className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-2">AI Superteam</h1>
        <p className="text-gray-400">Organization chart - who does what + what they use</p>
      </div>

      {/* CEO */}
      <div className="mb-16 flex justify-center">
        <div className={`bg-gradient-to-br ${teamHierarchy.ceo.color} rounded-xl p-8 border border-gray-700 max-w-lg w-full`}>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-black/30 rounded-xl flex items-center justify-center">
              <teamHierarchy.ceo.icon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">{teamHierarchy.ceo.name}</h2>
              <p className="text-white/70 font-medium mb-2">{teamHierarchy.ceo.role}</p>
              <p className="text-white/60 text-sm mb-4">{teamHierarchy.ceo.description}</p>
              <div className="flex gap-2">
                {teamHierarchy.ceo.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-white/10 text-white/80 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical line */}
      <div className="flex justify-center mb-12">
        <div className="w-1 h-12 bg-gradient-to-b from-gray-700 to-transparent"></div>
      </div>

      {/* Dispatch */}
      <div className="mb-16">
        <h3 className="text-gray-400 text-sm font-semibold mb-6 text-center">COORDINATION</h3>
        <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto">
          {teamHierarchy.orchestration.map((agent) => (
            <AgentCard key={agent.name} agent={agent} />
          ))}
        </div>
      </div>

      {/* Vertical line */}
      <div className="flex justify-center mb-12">
        <div className="w-1 h-12 bg-gradient-to-b from-gray-700 to-transparent"></div>
      </div>

      {/* Three main teams */}
      <div className="grid grid-cols-3 gap-12 mb-12">
        {/* Audit Team */}
        <div>
          <h3 className="text-gray-400 text-sm font-semibold mb-6 text-center">AUDIT TEAM</h3>
          <div className="space-y-4">
            {teamHierarchy.auditTeam.map((agent) => (
              <AgentCard key={agent.name} agent={agent} />
            ))}
          </div>
        </div>

        {/* Website Team */}
        <div>
          <h3 className="text-gray-400 text-sm font-semibold mb-6 text-center">WEBSITE TEAM</h3>
          <div className="space-y-4">
            {teamHierarchy.websiteTeam.map((agent) => (
              <AgentCard key={agent.name} agent={agent} />
            ))}
          </div>
        </div>

        {/* Operations */}
        <div>
          <h3 className="text-gray-400 text-sm font-semibold mb-6 text-center">OPERATIONS</h3>
          <div className="space-y-4">
            {teamHierarchy.operations.map((agent) => (
              <AgentCard key={agent.name} agent={agent} />
            ))}
          </div>
        </div>
      </div>

      {/* Available Skills Reference */}
      <div className="mt-16 p-6 bg-gray-800 rounded-xl border border-gray-700">
        <h4 className="text-white font-semibold mb-4">Available Skills</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <p className="text-blue-300 font-medium">seo-1.0.3</p>
            <p className="text-gray-400 text-xs">SEO audits</p>
          </div>
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <p className="text-blue-300 font-medium">seo-audit-automation</p>
            <p className="text-gray-400 text-xs">Audit pipeline</p>
          </div>
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <p className="text-blue-300 font-medium">website</p>
            <p className="text-gray-400 text-xs">Build sites</p>
          </div>
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <p className="text-blue-300 font-medium">gog</p>
            <p className="text-gray-400 text-xs">Google Workspace</p>
          </div>
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <p className="text-blue-300 font-medium">discord</p>
            <p className="text-gray-400 text-xs">Discord ops</p>
          </div>
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <p className="text-blue-300 font-medium">email-outreach</p>
            <p className="text-gray-400 text-xs">Cold emails</p>
          </div>
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <p className="text-blue-300 font-medium">deadlink</p>
            <p className="text-gray-400 text-xs">Link checker</p>
          </div>
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <p className="text-blue-300 font-medium">cad-design</p>
            <p className="text-gray-400 text-xs">3D design</p>
          </div>
        </div>
      </div>
    </div>
  );
}