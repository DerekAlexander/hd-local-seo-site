'use client';

import { Users } from 'lucide-react';

const statusColors = {
  Active: 'bg-green-500/20 text-green-400',
  Pending: 'bg-yellow-500/20 text-yellow-400',
  Review: 'bg-blue-500/20 text-blue-400',
  Inactive: 'bg-gray-500/20 text-gray-400',
};

export default function ClientTable({ clients = [] }) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">Clients</h2>
      </div>
      <div className="divide-y divide-gray-700">
        {clients.length === 0 ? (
          <div className="p-6 text-gray-400 text-center">No clients yet</div>
        ) : (
          clients.map((client) => (
            <div key={client.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-700/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-white font-medium">{client.name}</p>
                  <p className="text-gray-400 text-sm">{client.lastAction}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[client.status] || statusColors.Inactive}`}>
                  {client.status}
                </span>
                <span className="text-white font-medium w-24 text-right">{client.value}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}