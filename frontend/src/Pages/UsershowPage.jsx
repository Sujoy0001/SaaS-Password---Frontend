import React, { useEffect, useState } from "react";
import { getAllUsers } from "../context/Auth";
import { 
  MagnifyingGlassIcon,
  ClockIcon,
  CpuChipIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  EllipsisHorizontalIcon
} from "@heroicons/react/24/outline";

const UsersDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        const usersData = Array.isArray(data) ? data : data?.data || data?.users || [];
        setUsers(usersData);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Users Dashboard</h1>
        <div className="flex items-center text-sm text-gray-500">
          <ClockIcon className="h-4 w-4 mr-1" />
          <span>Last 30 days • Updated just now</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Users..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Usage Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Usage</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-gray-400 mr-3" />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-medium">Active Users</span>
                <span className="text-gray-500">{users.length} / ∞</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${Math.min(100, users.length)}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-gray-400 mr-3" />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-medium">API Requests</span>
                <span className="text-gray-500">23K / 1M</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '23%' }}></div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-gray-400 mr-3" />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-medium">Data Storage</span>
                <span className="text-gray-500">2.04 GB / 100 GB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '2.04%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {filteredUsers.slice(0, 2).map(user => (
            <div key={user.id} className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
                <CpuChipIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{user.username || "Anonymous"}</span>
                  <span className="text-sm text-gray-500">Just now</span>
                </div>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Users</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {filteredUsers.slice(0, 5).map(user => (
            <div key={user.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">{user.username || "No username"}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded mr-3">
                  ID: {user.id}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersDashboard;