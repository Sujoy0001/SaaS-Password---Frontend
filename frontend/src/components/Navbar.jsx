import React from 'react';
import { LogIn, UserPlus } from 'lucide-react'; // Importing icons from lucide-react
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <Navbar />
  );
};

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <h2 className="text-3xl font-extrabold text-white tracking-wide transition-colors duration-300 ease-in-out">
                LockAPI
              </h2>
            </Link>
          </div>

          {/* Right side - Auth buttons with icons */}
          <div className="flex items-center space-x-4">
            {/* Log In Button */}
            <Link to="/login">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
                <LogIn className="h-5 w-5" /> {/* Lucide LogIn icon */}
                <span className="text-base font-medium">Log in</span>
              </button>
            </Link>

            {/* Sign Up Button */}
            <Link to="/register">
              <button className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold shadow-lg hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75">
                <UserPlus className="h-5 w-5" /> {/* Lucide UserPlus icon */}
                <span className="text-base">Sign up</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default App;
