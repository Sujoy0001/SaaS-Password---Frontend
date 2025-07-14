// src/pages/ApiPage.jsx

import React, { useEffect, useState } from "react";
import { getClientByEmail } from "../context/Auth";
import {
  FiExternalLink,
  FiUser,
  FiKey,
  FiMap,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";

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
        setError(err.message || "Failed to fetch client data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchClientData();
    }, 300); // shorter delay for faster UX

    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-center">
          <FiLoader className="animate-spin text-blue-500 text-4xl mb-4 mx-auto" />
          <p className="text-gray-400">Loading client data...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="bg-gray-900 border-l-4 border-red-500 p-6 rounded-lg shadow max-w-md w-full">
          <div className="flex items-center mb-2">
            <FiAlertCircle className="text-red-400 mr-2" />
            <h3 className="text-lg font-medium text-red-400">Error</h3>
          </div>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-400 mb-2">Client Dashboard</h1>
          <p className="text-gray-400">View your client information and API routes</p>
        </header>

        {clientData ? (
          <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden">
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

              <div className="bg-gray-800 p-4 rounded-lg mb-8">
                <div className="flex items-center mb-2">
                  <FiKey className="text-blue-400 mr-2" />
                  <h3 className="font-semibold">Client ID</h3>
                </div>
                <p className="text-gray-300 break-all">{clientData.id}</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <FiMap className="text-blue-400 mr-2" />
                  <h3 className="text-lg font-semibold">API Routes</h3>
                </div>

                {clientData.routes && typeof clientData.routes === "object" ? (
                  <div className="space-y-3">
                    {Object.entries(clientData.routes).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center bg-gray-700 p-3 rounded hover:bg-gray-600 transition-colors duration-200"
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
          <div className="bg-gray-900 p-6 rounded-lg text-center">
            <p className="text-gray-400">No client data found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiPage;
