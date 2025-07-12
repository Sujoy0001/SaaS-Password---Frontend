import React from 'react';

const Footer = () => {
  return (
    <footer className=" border-t border-gray-800 py-6 text-gray-400 text-center text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} LockAPI. All rights reserved.</p>
        <p className="mt-2">Designed with <span role="img" aria-label="heart">❤️</span> by Your Company</p>
      </div>
    </footer>
  );
};

export default Footer;
