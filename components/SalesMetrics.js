'use client';

import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Activity, Target, Plus } from 'lucide-react';

export default function SalesMetrics({ onEntryAdded }) {
  const [form, setForm] = useState({
    emails: '',
    replies: '',
    calls: '',
    meetings: '',
    closes: '',
    dealValue: '',
  });

  const [metrics, setMetrics] = useState({
    currentMRR: 3500,
    pipelineValue: 18500,
    thisWeekActivity: 0,
    winRate: 0,
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = () => {
    const entries = JSON.parse(localStorage.getItem('sales_entries') || '[]');
    const today = new Date().toDateString();
    const thisWeekEntries = entries.filter(
      (e) => new Date(e.date).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
    );

    let activity = 0;
    let closes = 0;
    let totalDeals = 0;

    thisWeekEntries.forEach((e) => {
      activity += e.emails + e.replies + e.calls + e.meetings;
      closes += e.closes;
      if (e.closes > 0) totalDeals += 1;
    });

    const winRate = totalDeals > 0 ? ((closes / Math.max(thisWeekEntries.length, 1)) * 100).toFixed(1) : 0;

    setMetrics((prev) => ({
      ...prev,
      thisWeekActivity: activity,
      winRate,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.emails || !form.replies || !form.calls || !form.meetings) {
      alert('Please fill all required fields');
      return;
    }

    const entry = {
      date: new Date().toISOString().split('T')[0],
      emails: parseInt(form.emails),
      replies: parseInt(form.replies),
      calls: parseInt(form.calls),
      meetings: parseInt(form.meetings),
      closes: parseInt(form.closes) || 0,
      dealValue: parseFloat(form.dealValue) || 0,
    };

    const entries = JSON.parse(localStorage.getItem('sales_entries') || '[]');
    entries.push(entry);
    localStorage.setItem('sales_entries', JSON.stringify(entries));

    // Update pipeline
    const pipeline = JSON.parse(localStorage.getItem('sales_pipeline') || '{}');
    pipeline.closes = (pipeline.closes || 0) + entry.closes;
    pipeline.revenue = (pipeline.revenue || 0) + entry.dealValue;
    localStorage.setItem('sales_pipeline', JSON.stringify(pipeline));

    setForm({ emails: '', replies: '', calls: '', meetings: '', closes: '', dealValue: '' });
    setShowForm(false);
    loadMetrics();
    onEntryAdded?.();
  };

  return (
    <div className="space-y-6">
      {/* Quick Entry Form */}
      {showForm && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Daily Entry</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">Emails Sent</label>
              <input
                type="number"
                value={form.emails}
                onChange={(e) => setForm({ ...form, emails: e.target.value })}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2"
                placeholder="0"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Replies</label>
              <input
                type="number"
                value={form.replies}
                onChange={(e) => setForm({ ...form, replies: e.target.value })}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2"
                placeholder="0"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Calls</label>
              <input
                type="number"
                value={form.calls}
                onChange={(e) => setForm({ ...form, calls: e.target.value })}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2"
                placeholder="0"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Meetings</label>
              <input
                type="number"
                value={form.meetings}
                onChange={(e) => setForm({ ...form, meetings: e.target.value })}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2"
                placeholder="0"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Closes</label>
              <input
                type="number"
                value={form.closes}
                onChange={(e) => setForm({ ...form, closes: e.target.value })}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2"
                placeholder="0"
                min="0"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Deal Value ($)</label>
              <input
                type="number"
                value={form.dealValue}
                onChange={(e) => setForm({ ...form, dealValue: e.target.value })}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2"
                placeholder="0"
                min="0"
                step="100"
              />
            </div>
            <div className="col-span-2 md:col-span-3 flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-medium transition-colors"
              >
                Save Entry
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg px-4 py-2 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-sm">Current MRR</p>
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">${metrics.currentMRR.toLocaleString()}</p>
          <p className="text-gray-500 text-xs mt-2">Monthly recurring</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-sm">Pipeline Value</p>
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">${metrics.pipelineValue.toLocaleString()}</p>
          <p className="text-gray-500 text-xs mt-2">Total opportunity</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-sm">This Week Activity</p>
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{metrics.thisWeekActivity}</p>
          <p className="text-gray-500 text-xs mt-2">Actions taken</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-sm">Win Rate</p>
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{metrics.winRate}%</p>
          <p className="text-gray-500 text-xs mt-2">Conversion rate</p>
        </div>
      </div>

      {/* Add Entry Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Daily Entry
        </button>
      )}
    </div>
  );
}
