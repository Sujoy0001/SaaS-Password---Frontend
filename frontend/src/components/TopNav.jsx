import React, { useEffect, useState, useRef } from 'react';
import { 
  FiBell,
  FiLogOut,
  FiUser,
  FiMail,
  FiSettings,
  FiHelpCircle
} from 'react-icons/fi';
import { getClientEmail, getClientByEmail, removeToken } from '../context/Auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const TopNav = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: ''
  });
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    const emailFromStorage = getClientEmail();
    if (emailFromStorage) {
      getClientByEmail(emailFromStorage)
        .then((data) => {
          setUserData({
            username: data.username || 'User',
            email: emailFromStorage
          });
        })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white italic">PlugAPI</span>
          </div>

          {/* Right side - Navigation items */}
          <div className="flex items-center gap-4">
            {/* Notification button */}
            <button className="relative px-2 py-1 border-2 border-zinc-800 rounded-md text-gray-400 hover:text-gray-100 hover:bg-zinc-800 transition-colors">
              <FiBell className="h-6 w-auto" />
            </button>

            {/* User profile */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 group focus:text-purple-900"
              >
                <div className="h-9 w-9 p-1 rounded-full bg-zinc-800 border-2 border-zinc-800 flex items-center justify-center">
                  <FiUser className="h-6 w-auto text-gray-400 group-hover:text-white" />
                </div>
                <span className="hidden md:inline text-sm font-medium text-gray-300 group-hover:text-white">
                  {userData.username}
                </span>
              </button>

              {/* Profile dropdown */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-64 bg-zinc-800 rounded-lg shadow-xl border border-zinc-700 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-zinc-700 border border-zinc-600 flex items-center justify-center">
                        <FiUser className="h-5 w-5 text-gray-300" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-gray-100 font-medium truncate">{userData.username}</p>
                        <p className="text-gray-300 text-sm truncate">
                          <FiMail className="inline mr-1" />
                          {userData.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-1">
                    <Link to="#" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-zinc-700">
                      <FiSettings className="mr-3" />
                      Settings
                    </Link>
                    <Link to="#" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-zinc-700">
                      <FiHelpCircle className="mr-3" />
                      Help
                    </Link>
                  </div>
                  
                  <div className="border-t border-gray-700">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:bg-zinc-700"
                    >
                      <FiLogOut className="mr-3" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Logout button (always visible) */}
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center space-x-1 text-sm text-gray-300 hover:text-gray-100 px-3 py-1.5 border-2 border-zinc-800 rounded-md hover:bg-zinc-800 transition-colors"
            >
              <FiLogOut className="h-6 w-auto" />
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;