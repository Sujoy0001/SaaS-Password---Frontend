import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../context/Api";
import { FiUser, FiMail, FiTrash2, FiSearch, FiAlertCircle, FiLoader } from "react-icons/fi";

const UsershowPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        
        // Handle different response formats
        let usersData = [];
        if (Array.isArray(data)) {
          usersData = data;
        } else if (data?.data) {
          usersData = data.data;
        } else if (data?.users) {
          usersData = data.users;
        } else {
          throw new Error("Invalid users data format");
        }

        setUsers(usersData);
        setError("");
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      setDeletingId(userId);
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
        <FiLoader className="animate-spin text-4xl text-blue-500 mb-4" />
        <p className="text-gray-400">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 p-4">
        <div className="max-w-md w-full bg-gray-800 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <FiAlertCircle className="text-red-400 mr-2" />
            <h3 className="text-lg font-medium text-red-400">Error</h3>
          </div>
          <p className="text-gray-300 mb-4">{error}</p>
          <div className="flex space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Retry
            </button>
            <button
              onClick={() => setError("")}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">
            All Users <span className="text-blue-400">({filteredUsers.length})</span>
          </h1>
        </div>

        {/* User Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 hover:border-gray-600 transition-colors">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-900/20 p-3 rounded-full mr-4">
                      <FiUser className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {user.username || "No username"}
                      </h3>
                      <p className="text-sm text-gray-400">ID: {user.id}</p>
                    </div>
                  </div>

                  <div className="flex items-center mb-6 text-gray-300">
                    <FiMail className="mr-2 text-gray-500" />
                    <span className="break-all">{user.email || "No email"}</span>
                  </div>

                  <button
                    onClick={() => handleDelete(user.id)}
                    disabled={deletingId === user.id}
                    className="w-full flex items-center justify-center py-2 px-4 bg-red-700 hover:bg-red-600 rounded-md text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {deletingId === user.id ? (
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
            <div className="col-span-full text-center py-12 bg-gray-800/50 rounded-lg border border-gray-700">
              <FiUser className="mx-auto text-gray-600 text-4xl mb-4" />
              <h3 className="text-xl font-medium text-gray-300">
                {searchTerm ? "No users found" : "No users available"}
              </h3>
              <p className="text-gray-500 mt-2">
                {searchTerm ? "Try a different search" : "Check your server connection"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsershowPage;