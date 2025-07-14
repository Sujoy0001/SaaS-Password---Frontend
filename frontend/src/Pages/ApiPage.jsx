import React, { useEffect, useState } from "react";
import { getClientByEmail } from "../context/Auth";
import {
  FiUser,
  FiKey,
  FiMap,
  FiLoader,
  FiAlertCircle,
  FiRefreshCw,
  FiCopy,
  FiCheck
} from "react-icons/fi";
import { toast } from 'react-toastify';

const ApiPage = () => {
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(false);
  const [copiedEndpoints, setCopiedEndpoints] = useState({});

  useEffect(() => {
    const cachedClient = localStorage.getItem("clientData");
    if (cachedClient) {
      setClientData(JSON.parse(cachedClient));
      setLoading(false);
    } else {
      fetchClientData();
    }
  }, []);

  const fetchClientData = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getClientByEmail();
      setClientData(data);
      localStorage.setItem("clientData", JSON.stringify(data));
      toast.success("Data refreshed successfully");
    } catch (err) {
      setError(err.message || "Failed to fetch client data");
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };


  const copyToClipboard = async (text, endpoint) => {
  try {
    await navigator.clipboard.writeText(text);
    setCopiedEndpoints(prev => ({ ...prev, [endpoint]: true }));
    setTimeout(() => {
      setCopiedEndpoints(prev => ({ ...prev, [endpoint]: false }));
    }, 2000);
  } catch (err) {
    console.error('Copy failed:', err);
    // Fallback for older browsers if needed
  }
};

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <FiLoader className="animate-spin h-12 w-12 text-blue-500 mb-4" />
        <p className="text-gray-400 text-lg">Loading your API dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="max-w-md w-full bg-gray-800 border-l-4 border-red-500 p-6 rounded-lg">
          <div className="flex items-center mb-3">
            <FiAlertCircle className="h-6 w-6 text-red-400 mr-2" />
            <h3 className="text-xl font-medium text-red-400">Error</h3>
          </div>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={fetchClientData}
            className="w-full flex items-center justify-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-gray-100 rounded-md transition-colors"
          >
            <FiRefreshCw className="mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-100">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-2xl sm:text-4xl font-semibold text-gray-100 mb-2">
              Wellcome, <span className="text-purple-950 font-semibold italic">{clientData.username}</span>
            </h1>
            <p className="text-gray-400 italic">
              Below are the available endpoints you can integrate into your projects.
            </p>
          </div>
          <button
            onClick={fetchClientData}
            className="flex items-center text-sm font-semibold text-gray-400 hover:text-gray-100 bg-zinc-900 hover:bg-zinc-800 px-4 py-2.5 rounded-md transition-colors"
          >
            <FiRefreshCw className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </header>

        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 mb-6">
          <h2 className="text-lg font-semibold text-blue-300 mb-2 flex items-center">
            💡 How to use these APIs?
          </h2>
          <p className="text-gray-300 mb-2 ml-8">
            Use these endpoints in your frontend or backend projects to manage user authentication and data without building your own auth system.
          </p>
          <p className="text-gray-300 ml-8">
            Remember to include your API token in the Authorization header for protected routes.
          </p>
        </div>

         {clientData ? (
          <div className="space-y-6">
            {/* API Endpoints Section */}
            <div className="shadow-lg overflow-hidden border rounded-lg border-zinc-700">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-zinc-600/20 p-3 rounded-full mr-4">
                    <FiMap className="h-6 w-6 text-blue-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-100">Available Endpoints</h2>
                </div>

                {clientData.routes && typeof clientData.routes === "object" ? (
                  <div className="space-y-3">
                    {Object.entries(clientData.routes).map(([endpoint, url]) => (
                  
                      <div
                        key={endpoint}
                        className="group flex flex-col sm:flex-row justify-between items-start sm:items-center bg-zinc-800/50 hover:bg-zinc-900 border border-zinc-700 hover:border-zinc-600 p-3 rounded-lg transition-all duration-200"
                      >
                        <div className="mb-2 sm:mb-0 flex-1 min-w-0">
                          <div className="flex items-start">
                            <div className="overflow-hidden">
                              <span className="font-medium text-gray-100 block truncate italic">
                                {endpoint}
                              </span>
                              <span className="text-blue-400/90 text-sm font-mono break-all hover:text-blue-300 transition-colors ml-5">
                                {url}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(url, endpoint);
                          }}
                          className={`
                            flex items-center 
                            text-sm font-medium 
                            ${copiedEndpoints[endpoint] 
                              ? 'text-green-400 bg-green-900/20' 
                              : 'text-gray-300 hover:text-white bg-zinc-900 hover:bg-zinc-800'
                            }
                            px-4 py-2 rounded-lg 
                            border ${copiedEndpoints[endpoint] ? 'border-green-800' : 'border-zinc-700 hover:border-zinc-600'}
                            transition-all duration-200
                            shadow-sm ${copiedEndpoints[endpoint] ? 'shadow-green-900/30' : 'shadow-zinc-900/30 hover:shadow-md'}
                            focus:outline-none focus:ring-2 focus:ring-blue-500/50
                          `}
                          aria-label={`Copy ${endpoint}`}
                          disabled={copiedEndpoints[endpoint]}
                        >
                          {copiedEndpoints[endpoint] ? (
                            <>
                              <FiCheck className="mr-2 flex-shrink-0" />
                              <span className="whitespace-nowrap">Copied!</span>
                            </>
                          ) : (
                            <>
                              <FiCopy className="mr-2 flex-shrink-0" />
                              <span className="whitespace-nowrap">Copy URL</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>No API endpoints available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <p className="text-gray-400">No API data found</p>
            <button
              onClick={fetchClientData}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-gray-100 rounded-md transition-colors"
            >
              Load Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiPage;