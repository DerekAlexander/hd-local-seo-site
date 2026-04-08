'use client';

import { useState, useEffect } from 'react';
import StatCard from './components/StatCard';
import ClientTable from './components/ClientTable';
import RevenueChart from './components/RevenueChart';
import { Users, DollarSign, UserPlus, CheckCircle } from 'lucide-react';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [clients, setClients] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/dashboard').then((res) => res.json()),
      fetch('/api/clients').then((res) => res.json()),
      fetch('/api/revenue').then((res) => res.json()),
    ])
      .then(([dashData, clientsData, revenueData]) => {
        setData(dashData);
        setClients(clientsData.clients || []);
        setRevenue(revenueData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading dashboard data:', err);
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back! Here's your business at a glance.</p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Actual Revenue"
          value={data?.actualRevenue || '$0'}
          icon={DollarSign}
          trend="up"
          trendValue="0"
        />
        <StatCard
          title="Potential Revenue"
          value={data?.potentialRevenue || '$0'}
          icon={DollarSign}
          trend="up"
          trendValue="100"
        />
        <StatCard
          title="Active Clients"
          value={data?.activeClients || '0'}
          icon={Users}
          trend="up"
          trendValue="0"
        />
        <StatCard
          title="Automation"
          value={data?.automationSuccess || '0 jobs'}
          icon={CheckCircle}
          trend="up"
          trendValue="0"
        />
      </div>

      {/* Client Table */}
      <div className="mb-8">
        <ClientTable clients={clients.slice(0, 5)} />
      </div>

      {/* Revenue Chart */}
      <div>
        <RevenueChart data={revenue} />
      </div>
    </div>
  );
}