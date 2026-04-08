'use client';

import { useState } from 'react';
import SalesMetrics from '@/app/components/SalesMetrics';
import SalesHistory from '@/app/components/SalesHistory';

export default function SalesPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEntryAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Sales Dashboard</h1>
          <p className="text-gray-400\">Track your daily sales activity and pipeline metrics</p>\n        </div>\n\n        {/* Metrics Section */}\n        <div className=\"mb-8\">\n          <SalesMetrics key={refreshKey} onEntryAdded={handleEntryAdded} />\n        </div>\n\n        {/* History Section */}\n        <div>\n          <SalesHistory key={refreshKey} />\n        </div>\n      </div>\n    </div>\n  );\n}\n