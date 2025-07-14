import React from 'react';
import { GitHub, Linkedin, Twitter, Youtube } from 'react-feather';

const Footer = () => {
  return (
    <footer className="text-gray-300 py-4 px-8 sm:px-6 lg:px-8">
      <div className="w-full md:max-w-6xl mx-auto grid grid-cols-3 md:grid-cols-4 gap-8">
        {/* Products Column */}
        <div>
          <h3 className="text-white font-medium mb-4">Products</h3>
          <ul className="space-y-3">
            {['Auth', 'Admin', 'Tokenss', 'Docs', 'Analytics', 'Secure'].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-white transition-colors text-sm">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Column */}
        <div>
          <h3 className="text-white font-medium mb-4">Resources</h3>
          <ul className="space-y-3">
            {['Community', 'Docs', 'Guides', 'Help', 'Resources', 'Solution Partners'].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-white transition-colors text-sm">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h3 className="text-white font-medium mb-4">Company</h3>
          <ul className="space-y-3">
            {['About', 'Blog','Contact Us','Partners', 'Privacy Policy', 'Legal'].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-white transition-colors text-sm">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Column */}
        <div>
          <h3 className="text-white font-medium mb-4">Social</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <GitHub className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 pt-4 border-t border-gray-800 text-sm text-gray-500">
        © {new Date().getFullYear()} PlugAPI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;