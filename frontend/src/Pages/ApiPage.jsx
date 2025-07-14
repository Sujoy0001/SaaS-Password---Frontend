// src/pages/ApiPage.jsx
import React, { useEffect, useState } from "react";
import { getClientByEmail } from "../context/Api";
import { FiExternalLink, FiUser, FiMail, FiKey, FiMap } from "react-icons/fi";

const ApiPage = () => {
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const data = await getClientByEmail();
        setClientData(data);
      } catch (err) {
        console.error("API fetch error:", err);
        setError("Failed to fetch client data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to show loading state (better UX)
    const timer = setTimeout(() => {
      fetchClientData();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-300">Loading client data...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
          <p className="text-red-400 text-center">
            <span className="font-bold">Error:</span> {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-400 mb-2">Client Dashboard</h1>
          <p className="text-gray-400">View and manage your client information</p>
        </header>

        {clientData ? (
          <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="bg-blue-500 p-3 rounded-full mr-4">
                  <FiUser className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{clientData.username}</h2>
                  <p className="text-gray-400">{clientData.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FiKey className="text-blue-400 mr-2" />
                    <h3 className="font-semibold">Client ID</h3>
                  </div>
                  <p className="text-gray-300 break-all">{clientData.id}</p>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FiMail className="text-blue-400 mr-2" />
                    <h3 className="font-semibold">Email Verified</h3>
                  </div>
                  <p className="text-gray-300">
                    {clientData.emailVerified ? (
                      <span className="text-green-400">Verified</span>
                    ) : (
                      <span className="text-yellow-400">Pending verification</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <FiMap className="text-blue-400 mr-2" />
                  <h3 className="text-lg font-semibold">API Routes</h3>
                </div>

                {clientData.routes && typeof clientData.routes === "object" ? (
                  <div className="space-y-3">
                    {Object.entries(clientData.routes).map(([key, value], index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-gray-600 p-3 rounded hover:bg-gray-500 transition duration-200"
                      >
                        <span className="font-medium text-gray-200">{key}</span>
                        <a
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 flex items-center"
                        >
                          {new URL(value).hostname}
                          <FiExternalLink className="ml-2" />
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 italic">No routes available.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <p className="text-gray-400">No client data found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiPage;