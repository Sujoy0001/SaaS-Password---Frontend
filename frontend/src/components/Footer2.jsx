import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 border-t border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main footer links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-4 md:mb-0">
            <Link to="/index" className="text-gray-400 hover:text-white text-sm transition-colors">
              Home
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Docs
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Guides
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Help
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
              Contact
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Legal
            </Link>
          </div>

          {/* Status indicator */}
          <div className="flex items-center text-sm text-green-400">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2"></span>
            All systems normal
          </div>
        </div>

        {/* Copyright and company info */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <div className="mb-2 md:mb-0">
            © {new Date().getFullYear()}, PlugAPI Inc.
          </div>
          <div className="flex items-center space-x-4">
            <span>v1.0.0</span>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;