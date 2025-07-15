import React, { useEffect, useState } from 'react';
import { UsersIcon, ShieldCheckIcon, ChartBarIcon, BoltIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const StatsCard = ({ stats }) => {
  const [animatedStats, setAnimatedStats] = useState({
    total_users: 0,
    total_apis_secured: 0,
    api_calls_today: 0,
    blocked_threats: 0
  });

  useEffect(() => {
    const targetStats = {
      total_users: stats?.total_users || 342,
      total_apis_secured: stats?.total_apis_secured || 1250,
      api_calls_today: stats?.api_calls_today || 1740,
      blocked_threats: stats?.blocked_threats || 273
    };

    const duration = 2;
    const startTime = Date.now();

    const animate = () => {
      const progress = Math.min(1, (Date.now() - startTime) / (duration * 5000));
      
      setAnimatedStats({
        total_users: Math.floor(progress * targetStats.total_users),
        total_apis_secured: Math.floor(progress * targetStats.total_apis_secured),
        api_calls_today: Math.floor(progress * targetStats.api_calls_today),
        blocked_threats: Math.floor(progress * targetStats.blocked_threats)
      });

      if (progress < 1) requestAnimationFrame(animate);
    };

    animate();
  }, [stats]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full py-12 px-4 sm:px-6 lg:px-8 shadow-sm"
    >
      <div className="p-0">
        <h2 className="text-3xl font-bold text-gray-200 text-center mb-2">Trusted by Thousands</h2>
        <p className="text-gray-500 text-center mb-12 italic">
          Powering authentication for top development teams worldwide
        </p>
        
        <div className="grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-4 md:gap-8 lg:gap-8">
          <StatItem 
            icon={<UsersIcon className="h-8 w-8 text-gray-200" />}
            label="Total Users"
            value={animatedStats.total_users.toLocaleString()}
            delay={0.1}
          />
          <StatItem 
            icon={<ShieldCheckIcon className="h-8 w-8 text-gray-200" />}
            label="Total APIs Create"
            value={animatedStats.total_apis_secured.toLocaleString()}
            delay={0.2}
          />
          <StatItem 
            icon={<ChartBarIcon className="h-8 w-8 text-gray-200" />}
            label="API Calls Today"
            value={animatedStats.api_calls_today.toLocaleString()}
            delay={0.3}
          />
          <StatItem 
            icon={<BoltIcon className="h-8 w-8 text-gray-200" />}
            label="Blocked Threats"
            value={animatedStats.blocked_threats.toLocaleString()}
            delay={0.4}
          />
        </div>
      </div>
    </motion.div>
  );
};

const StatItem = ({ icon, label, value, delay }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay }}
    className="p-6 transition-colors duration-300"
  >
    <div className="flex flex-col items-center text-center p-5 rounded-lg cursor-pointer hover:bg-zinc-900">
      <div className="p-3 mb-4 rounded-full bg-zinc-800">
        {icon}
      </div>
      <h3 className="text-4xl font-bold text-gray-300 mb-2">
        {value}
      </h3>
      <p className="text-blue-400 text-lg">
        {label}
      </p>
    </div>
  </motion.div>
);

export default StatsCard;