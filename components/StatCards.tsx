'use client';

import { Users, DollarSign, UserPlus, CheckCircle } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: 'users' | 'dollar' | 'leads' | 'success';
  trend?: {
    value: number;
    positive: boolean;
  };
}

const iconMap = {
  users: Users,
  dollar: DollarSign,
  leads: UserPlus,
  success: CheckCircle,
};

const StatCards = () => {
  const stats: StatCardProps[] = [
    {
      title: 'Active Clients',
      value: 24,
      icon: 'users',
      trend: { value: 12, positive: true },
    },
    {
      title: 'Pipeline Value',
      value: '$127,500',
      icon: 'dollar',
      trend: { value: 8, positive: true },
    },
    {
      title: 'Leads This Month',
      value: 47,
      icon: 'leads',
      trend: { value: 23, positive: true },
    },
    {
      title: 'Automation Success',
      value: '94.2%',
      icon: 'success',
      trend: { value: 3, positive: true },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.icon];
        return (
          <div
            key={index}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                <Icon className="w-6 h-6 text-blue-400" />
              </div>
              {stat.trend && (
                <span
                  className={`text-sm font-medium ${
                    stat.trend.positive ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {stat.trend.positive ? '+' : '-'}
                  {stat.trend.value}%
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatCards;