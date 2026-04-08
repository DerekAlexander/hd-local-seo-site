'use client';

import { useState, useEffect } from 'react';
import { Mail, MessageCircle, Trophy, ArrowRight, ArrowLeft } from 'lucide-react';

const columns = [
  { 
    id: 'emailed', 
    title: 'Emailed', 
    icon: Mail, 
    color: 'bg-blue-500',
    next: 'responded',
    prev: null 
  },
  { 
    id: 'responded', 
    title: 'Responded', 
    icon: MessageCircle, 
    color: 'bg-yellow-500',
    next: 'won',
    prev: 'emailed'
  },
  { 
    id: 'won', 
    title: 'Won', 
    icon: Trophy, 
    color: 'bg-green-500',
    next: null,
    prev: 'responded'
  },
];

function LeadCard({ lead, onMove, canMovePrev, canMoveNext }) {
  return (
    <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-white font-medium">{lead.company}</h4>
      </div>
      <p className="text-gray-400 text-xs mb-1">{lead.industry}</p>
      <p className="text-gray-500 text-xs mb-3">{lead.email}</p>
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-xs">Sent: {lead.dateEmailed}</p>
        <div className="flex gap-1">
          {canMovePrev && (
            <button 
              onClick={() => onMove(lead.id, 'prev')}
              className="p-1 hover:bg-gray-600 rounded text-gray-400 hover:text-white"
              title="Move back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          {canMoveNext && (
            <button 
              onClick={() => onMove(lead.id, 'next')}
              className="p-1 hover:bg-gray-600 rounded text-gray-400 hover:text-white"
              title="Move forward"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LeadsPage() {
  const [leads, setLeads] = useState({ emailed: [], responded: [], won: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleMove = async (leadId, direction) => {
    // Find which column the lead is in
    let fromStatus = null;
    let toStatus = null;
    
    for (const col of columns) {
      const lead = leads[col.id]?.find(l => l.id === leadId);
      if (lead) {
        fromStatus = col.id;
        toStatus = direction === 'next' ? col.next : col.prev;
        break;
      }
    }
    
    if (!fromStatus || !toStatus) return;
    
    setSaving(true);
    
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, fromStatus, toStatus }),
      });
      
      const data = await res.json();
      setLeads(data.leadsData);
    } catch (err) {
      console.error('Error moving lead:', err);
    }
    
    setSaving(false);
  };

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
        <h1 className="text-3xl font-bold text-white">Leads</h1>
        <p className="text-gray-400 mt-1">Click arrows to move leads between stages</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {columns.map((col) => (
          <div key={col.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${col.color}`}></div>
              <span className="text-white font-semibold">{col.title}</span>
            </div>
            <p className="text-2xl font-bold text-blue-400">{leads[col.id]?.length || 0}</p>
          </div>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-3 gap-4">
        {columns.map((col) => (
          <div key={col.id} className="bg-gray-800 rounded-xl border border-gray-700">
            <div className="px-4 py-3 border-b border-gray-700 flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${col.color}`}></div>
              <h3 className="font-semibold text-white">{col.title}</h3>
              <span className="ml-auto text-gray-400 text-sm">{leads[col.id]?.length || 0}</span>
            </div>
            <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
              {leads[col.id]?.map((lead) => (
                <LeadCard 
                  key={lead.id} 
                  lead={lead} 
                  onMove={handleMove}
                  canMoveNext={col.next !== null}
                  canMovePrev={col.prev !== null}
                />
              ))}
              {leads[col.id]?.length === 0 && (
                <p className="text-gray-500 text-center text-sm py-8">No leads</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}