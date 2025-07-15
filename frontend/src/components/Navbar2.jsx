import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LinkIcon,
  UsersIcon,
  ChartBarIcon,
  EnvelopeIcon,
  Bars3Icon,
  XMarkIcon
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper function to determine active link
  const isActive = (path) => {
    return location.pathname === path ? 'text-gray-100 bg-zinc-900' : 'text-gray-300 hover:bg-zinc-800';
  };

  return (
    <nav className="sticky top-0 bg-zinc-950 border-b border-zinc-800 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-auto py-2">
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Desktop navigation */}
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link 
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${isActive(link.path)}`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar2;