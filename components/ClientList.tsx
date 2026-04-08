'use client';

import { MoreVertical } from 'lucide-react';

interface Client {
  id: number;
  name: string;
  contractValue: number;
  status: 'Active' | 'Paused';
  lastUpdate: string;
}

const clients: Client[] = [
  {
    id: 1,
    name: 'Acme Corporation',
    contractValue: 24000,
    status: 'Active',
    lastUpdate: '2026-03-18',
  },
  {
    id: 2,
    name: 'TechStart Inc.',
    contractValue: 18000,
    status: 'Active',
    lastUpdate: '2026-03-17',
  },
  {
    id: 3,
    name: 'Global Media LLC',
    contractValue: 35000,
    status: 'Active',
    lastUpdate: '2026-03-15',
  },
  {
    id: 4,
    name: 'Innovate Labs',
    contractValue: 12000,
    status: 'Paused',
    lastUpdate: '2026-03-10',
  },
  {
    id: 5,
    name: 'Summit Solutions',
    contractValue: 28500,
    status: 'Active',
    lastUpdate: '2026-03-19',
  },
];

const ClientList = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Client List</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Client Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Contract Value
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Last Update
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr
                key={client.id}
                className="border-b border-gray-700/50 last:border-0 hover:bg-gray-750 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-white font-medium">
                  {client.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {formatCurrency(client.contractValue)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      client.status === 'Active'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {client.lastUpdate}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;