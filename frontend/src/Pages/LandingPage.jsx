import React from 'react';
import { ArrowRightOnRectangleIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start px-8 md:px-20 py-16 text-white">
      {/* Main content */}
      <div className="flex-1 md:pr-12 mb-12 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Protect Your APIs Instantly with <span className="text-blue-500">LockAPI</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-4 max-w-2xl">
          LockAPI is a powerful API security platform that seamlessly integrates into your workflow.
          Gain enterprise-level protection without complex setup or costly infrastructure.
        </p>

        <p className="text-lg md:text-xl text-gray-300 mb-4 max-w-2xl">
          Secure your endpoints with real-time threat detection, detailed usage analytics,
          and advanced access controls – all in one place.
        </p>

        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
          Start protecting your APIs today and ensure your business data remains safe from unauthorized access and malicious attacks.
        </p>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <Link to="/register">
                <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold shadow-lg transition">
                    <UserPlusIcon className="h-6 w-6 mr-3" />
                    Get Started Free
                </button>
            </Link>
            <Link to="/login">
                <button className="flex items-center justify-center border border-gray-600 hover:bg-gray-800 px-8 py-4 rounded-lg font-semibold transition">
                    <ArrowRightOnRectangleIcon className="h-6 w-6 mr-3" />
                    Log in
                </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
