// src/pages/OverviewPage.jsx
import React from 'react';
import { FiUsers, FiSearch, FiTrash2, FiUser, FiMail, FiAlertTriangle, FiCheck } from 'react-icons/fi';

const OverviewPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">User Management System</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive dashboard for managing your application users with search and delete functionality
          </p>
        </header>

        {/* Main Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 mb-6">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="text-blue-400 mb-4">
                <FiUsers className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">User Listing</h3>
              <p className="text-gray-400">
                View all registered users in a clean card layout with essential details including username, email, and user ID.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="text-blue-400 mb-4">
                <FiSearch className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Advanced Search</h3>
              <p className="text-gray-400">
                Quickly find users by searching through usernames or email addresses with real-time filtering.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="text-blue-400 mb-4">
                <FiTrash2 className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">User Management</h3>
              <p className="text-gray-400">
                Securely delete users with confirmation dialogs and visual feedback during the deletion process.
              </p>
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 mb-6">How To Use</h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-blue-900/20 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-400 font-bold text-xl">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Accessing Users</h3>
                <p className="text-gray-400 mb-4">
                  Navigate to the <span className="text-blue-400">Users</span> page to see all registered users. The system automatically loads all available user accounts.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-sm">
                  <div className="flex items-center text-gray-400 mb-2">
                    <FiUser className="mr-2 text-blue-400" />
                    <span>Each user card displays username, email, and ID</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FiMail className="mr-2 text-blue-400" />
                    <span>Email addresses are shown with proper formatting</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-blue-900/20 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-400 font-bold text-xl">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Searching Users</h3>
                <p className="text-gray-400 mb-4">
                  Use the search bar at the top to filter users by their username or email address.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="relative max-w-md">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="pl-10 w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-blue-900/20 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-400 font-bold text-xl">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Deleting Users</h3>
                <p className="text-gray-400 mb-4">
                  To remove a user account, click the "Delete User" button on their card. This action requires confirmation.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col space-y-4">
                  <div className="flex items-center text-gray-400">
                    <FiAlertTriangle className="mr-2 text-yellow-400" />
                    <span>You'll need to confirm the deletion in a popup dialog</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FiCheck className="mr-2 text-green-400" />
                    <span>Successful deletions are immediately reflected in the UI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 mb-6">Troubleshooting</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-red-400 mb-2">Error Loading Users</h3>
              <p className="text-gray-400 mb-3">
                If you see an error message when loading users:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>Check your internet connection</li>
                <li>Ensure the backend server is running</li>
                <li>Try refreshing the page</li>
                <li>Contact support if the issue persists</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-red-400 mb-2">Delete Not Working</h3>
              <p className="text-gray-400 mb-3">
                If you can't delete a user:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>Verify you have proper permissions</li>
                <li>Check if the user still exists</li>
                <li>Look for error messages in the console</li>
                <li>Try again after refreshing the page</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 border-t border-gray-800 pt-8">
          <p>User Management System v1.0</p>
          <p className="mt-2">For support, contact: admin@yourdomain.com</p>
        </footer>
      </div>
    </div>
  );
};

export default OverviewPage;