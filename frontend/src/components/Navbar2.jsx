import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LinkIcon,
  UsersIcon,
  ChartBarIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

// Navigation configuration - easily add/remove links here
const NAV_LINKS = [
  {
    path: '/index',
    name: 'API Links',
    icon: LinkIcon
  },
  {
    path: '/index/users',
    name: 'All Users',
    icon: UsersIcon
  },
  {
    path: '/index/overview',
    name: 'Overview',
    icon: ChartBarIcon
  },
  {
    path: '/index/contact',
    name: 'Contact',
    icon: EnvelopeIcon
  },
];

const Navbar2 = () => {
  const location = useLocation();

  // Helper function to determine active link
  const isActive = (path) => {
    return location.pathname === path ? 'text-gray-100 bg-zinc-900' : 'text-gray-300 hover:bg-zinc-800';
  };

  return (
    <nav className="sticky top-0 bg-zinc-950 border-b border-zinc-800 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          <div className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive(link.path)}`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {link.name}
                </Link>
              );
            })}
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            {/* Placeholder for future user dropdown */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;