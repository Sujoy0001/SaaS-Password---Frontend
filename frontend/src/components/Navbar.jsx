import React from 'react';
import { LogIn, UserPlus, BookOpen, Info, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  // Function to check if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-500 shadow-sm backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left side - Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <h2 className="text-3xl font-bold text-white italic">
                PlugAPI
              </h2>
            </Link>

            {/* Center - Navigation links */}
            <div className="hidden md:flex items-center space-x-6 ml-8">
              <Link
                to="#"
                className={`flex px-2 py-2 justify-center items-center rounded-md transition-all duration-300 text-sm font-medium ${
                  isActive('/docs')
                    ? 'bg-slate-200 text-black'
                    : 'text-gray-300 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <BookOpen className="h-4" /> Docs
              </Link>

              <Link
                to="#"
                className={`flex px-2 py-2 justify-center items-center rounded-md transition-all duration-300 text-sm font-medium ${
                  isActive('/about')
                    ? 'bg-slate-200 text-black'
                    : 'text-gray-300 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <UserPlus className="h-4" /> About us
              </Link>

              <Link
                to="/contact"
                className={`flex px-2 py-2 justify-center items-center rounded-md transition-all duration-300 text-sm font-semibold ${
                  isActive('/contact')
                    ? 'bg-slate-200 text-black'
                    : 'text-gray-300 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Mail className="h-4" /> Contact us
              </Link>
            </div>
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <button className="px-4 py-2 rounded-md text-gray-200 hover:bg-zinc-900 hover:text-gray-200 transition-all duration-300 text-sm font-medium border-2 border-white">
                Log in
              </button>
            </Link>

            <Link to="/register">
              <button className="px-4 py-2 rounded-md bg-gray-100 text-black text-sm font-medium hover:bg-gray-200 transition-all duration-300 border-2">
                Sign up
              </button>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
