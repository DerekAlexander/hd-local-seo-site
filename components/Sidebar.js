'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Zap, Settings, BarChart3, Clock, CheckCircle2, TrendingUp } from 'lucide-react';

const navItems = [
  { name: 'Overview', href: '/', icon: Home },
  { name: 'Office', href: '/office', icon: Zap },
  { name: 'Tasks', href: '/tasks', icon: CheckCircle2 },
  { name: 'Schedule', href: '/schedule', icon: Clock },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Leads', href: '/leads', icon: Zap },
  { name: 'Sales', href: '/sales', icon: TrendingUp },
  { name: 'Automation', href: '/automation', icon: BarChart3 },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen p-4">
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold text-white">Mission Control</h1>
        <p className="text-gray-400 text-sm">Dashboard</p>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}