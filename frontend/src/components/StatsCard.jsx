import React from 'react';
import { UsersIcon, ShieldCheckIcon, ChartBarIcon, BoltIcon } from '@heroicons/react/24/outline';

const StatsCard = ({ stats }) => {
  return (
    <div className="md:py-20 px-10 rounded-xl h-full shadow-md w-full md:w-80">
      <h2 className="text-xl font-bold text-white mb-4">Platform Stats</h2>
      <div className="space-y-4">
        <StatItem icon={<UsersIcon className="h-6 w-6 text-blue-400" />} label="Users" value={stats?.total_users ?? '...'} />
        <StatItem icon={<ShieldCheckIcon className="h-6 w-6 text-blue-400" />} label="APIs Secured" value={stats?.total_apis_secured ?? '...'} />
        <StatItem icon={<ChartBarIcon className="h-6 w-6 text-blue-400" />} label="API Calls Today" value={stats?.api_calls_today ?? '...'} />
        <StatItem icon={<BoltIcon className="h-6 w-6 text-blue-400" />} label="Blocked Threats" value={stats?.blocked_threats ?? '...'} />
      </div>
    </div>
  );
};

const StatItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <div className="p-2 bg-blue-600 bg-opacity-20 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-white text-lg font-semibold">{value}</p>
    </div>
  </div>
);

export default StatsCard;
