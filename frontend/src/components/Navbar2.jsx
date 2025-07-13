// src/components/Navbar2.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar2 = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4">
      <div className="flex space-x-6">
        <Link to="/index" className="hover:text-gray-300">
          API Links
        </Link>
        <Link to="user/all" className="hover:text-gray-300">
          All Users
        </Link>
        <Link to="overview" className="hover:text-gray-300">
          Overview
        </Link>
      </div>
    </nav>
  );
};

export default Navbar2;
