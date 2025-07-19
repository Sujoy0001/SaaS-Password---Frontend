import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../context/Auth";
import {
  FiUser,
  FiMail,
  FiTrash2,
  FiSearch,
  FiAlertCircle,
  FiLoader,
  FiRefreshCw,
} from "react-icons/fi";

const UsershowPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingEmail, setDeletingEmail] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [progress, setProgress] = useState(0); // For YouTube-style loading bar

  // YouTube-style loading animation effect
  useEffect(() => {
    if (refreshing) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [refreshing]);

  // Load users on page load
  useEffect(() => {
    const cachedUsers = localStorage.getItem("all_users");
    if (cachedUsers) {
      setUsers(JSON.parse(cachedUsers));
      setLoading(false);
    } else {
      fetchUsers();
    }
  }, []);

  // Fetch all users from API
  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllUsers();

      // Ensure data structure is an array
      const usersData = Array.isArray(data)
        ? data
        : data?.data || data?.users || [];

      setUsers(usersData);
      localStorage.setItem("all_users", JSON.stringify(usersData));
    } catch (err) {
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
      setRefreshing(false);
      setProgress(0);
    }
  };

  // Handle refresh button click
  const handleRefresh = () => {
    setRefreshing(true);
    setProgress(0);
    localStorage.removeItem("all_users");
    setUsers([]);
    fetchUsers();
  };

  // Delete user by email
  const handleDelete = async (userEmail) => {
    try {
      setDeletingEmail(userEmail);

      const userExists = users.some((user) => user.email === userEmail);
      if (!userExists) {
        throw new Error("User not found in local data");
      }

      await deleteUser(userEmail);

      const updatedUsers = users.filter((user) => user.email !== userEmail);
      setUsers(updatedUsers);
      localStorage.setItem("all_users", JSON.stringify(updatedUsers));
    } catch (err) {
      setError(err.toString());
      setTimeout(() => setError(""), 5000);
    } finally {
      setDeletingEmail(null);
    }
  };

  // Filter users by search term
  const filteredUsers = users.filter(
    (user) =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full p-20">
        <FiLoader className="animate-spin text-4xl text-zinc-800 mb-4" />
        <p className="text-gray-400">Loading users...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="max-w-md w-full bg-zinc-950 rounded-lg shadow-xl overflow-hidden border-2 border-zinc-700">
          <div className="p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-6 w-6 text-red-700" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-100">
                  Error Occurred
                </h3>
                <div className="mt-2 text-sm text-gray-300">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 flex justify-end space-x-3">
            <button
              onClick={() => setError("")}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-zinc-700 rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-150"
            >
              Continue
            </button>
            <button
              onClick={fetchUsers}
              className="px-4 py-2 text-sm font-medium text-gray-100 bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="min-h-full text-gray-100">
      {/* YouTube-style loading bar */}
      {refreshing && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-800 z-50">
          <div
            className="h-full bg-red-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="p-0 mb-8">
          <h1 className="text-3xl font-semibold">All Registered Users</h1>
          <p className="text-gray-300 mt-2">
            View and manage all users registered on the platform. You can
            search, view details, or delete users as needed.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="w-full md:w-2/3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600 text-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-100">
              All Users{" "}
              <span className="text-blue-400">({filteredUsers.length})</span>
            </h1>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiRefreshCw className={`${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* User Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id || user.email}
                className="bg-zinc-950 rounded-lg shadow-lg border border-zinc-800 hover:border-zinc-600 transition-colors cursor-pointer"
              >
                <div className="p-3">
                  <div className="flex items-center mb-4">
                    <div className="bg-zinc-500/30 p-3 rounded-full mr-4">
                      <FiUser className="text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-200">
                        {user.username || "No username"}
                      </h3>
                      <div className="flex items-center text-gray-300">
                        <FiMail className="mr-2 text-gray-500" />
                        <span className="break-all">
                          {user.email || "No email"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(user.email)}
                    disabled={deletingEmail === user.email}
                    className="w-auto flex float-end mb-4 items-center justify-center py-2 px-4 bg-red-800 hover:bg-red-600 rounded-md text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {deletingEmail === user.email ? (
                      <>
                        <FiLoader className="animate-spin mr-2" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <FiTrash2 className="mr-2" />
                        Delete User
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-black rounded-lg border border-zinc-800">
              <FiUser className="mx-auto text-gray-600 text-4xl mb-4" />
              <h3 className="text-xl font-medium text-gray-300">
                {searchTerm ? "No users found" : "No users available"}
              </h3>
              <p className="text-gray-500 mt-2">
                {searchTerm
                  ? "Try a different search"
                  : refreshing
                  ? "Refreshing data..."
                  : "Check your server connection"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsershowPage;
