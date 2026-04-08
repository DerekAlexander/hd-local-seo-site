'use client';

import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

export default function SalesHistory() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    const stored = JSON.parse(localStorage.getItem('sales_entries') || '[]');
    setEntries(stored.sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  const deleteEntry = (index) => {
    const entries = JSON.parse(localStorage.getItem('sales_entries') || '[]');
    entries.splice(index, 1);
    localStorage.setItem('sales_entries', JSON.stringify(entries));
    loadEntries();
  };

  if (entries.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-12 text-center">
        <p className="text-gray-400">No entries yet. Add your first daily entry above.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Entry History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-700 text-gray-300 text-xs font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-center">Emails</th>
              <th className="px-6 py-3 text-center">Replies</th>
              <th className="px-6 py-3 text-center">Calls</th>
              <th className="px-6 py-3 text-center">Meetings</th>
              <th className="px-6 py-3 text-center">Closes</th>
              <th className="px-6 py-3 text-center">Value</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {entries.map((entry, idx) => (
              <tr key={idx} className="hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 text-white">
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-6 py-4 text-center text-gray-300">{entry.emails}</td>
                <td className="px-6 py-4 text-center text-gray-300">{entry.replies}</td>
                <td className="px-6 py-4 text-center text-gray-300">{entry.calls}</td>
                <td className="px-6 py-4 text-center text-gray-300">{entry.meetings}</td>
                <td className="px-6 py-4 text-center text-green-400 font-semibold">{entry.closes}</td>
                <td className="px-6 py-4 text-center text-blue-400 font-semibold">
                  ${entry.dealValue.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => deleteEntry(idx)}
                    className="text-red-400 hover:text-red-300 transition-colors p-1"
                    title="Delete entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
