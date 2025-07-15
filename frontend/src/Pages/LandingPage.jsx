import React from 'react';
import { ArrowRightOnRectangleIcon, UserPlusIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="relative min-h-full overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center px-8 md:px-20 py-20 text-gray-100">
        <div className="flex-1 md:pr-12 mb-12 md:mb-0 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Plug & Play <span className="text-purple-500 px-2">User Authentication</span> API
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8">
            LockAPI provides ready-to-use authentication endpoints – integrate secure user management in minutes without backend code.
          </p>

          <div className="flex flex-row justify-start items-center gap-5 md:flex-row md:items-start md:gap-0 md:space-y-0 md:space-x-6 mb-12">
            <Link to="/register">
              <button className="flex items-center justify-center bg-gray-100 text-black hover:bg-gray-200 px-8 py-3.5 rounded-lg font-semibold transition-all duration-300">
                <UserPlusIcon className="h-5 w-5 mr-3" />
                Get API Keys
              </button>
            </Link>

            <Link to="/login">
              <button className="flex items-center justify-center border border-zinc-700 hover:bg-zinc-900 px-8 py-3.5 rounded-lg font-semibold transition-all duration-300">
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                Login
              </button>
            </Link>
          </div>
        </div>

        {/* Code snippet panel - positioned bottom-right */}
        <div className="w-full md:w-96 bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
          <div className="bg-zinc-800 px-4 py-2 text-sm font-mono text-gray-400 border-b border-zinc-700">
            auth-example.js
          </div>
          <div className="p-4 font-mono text-sm text-gray-300">
            <div className="text-blue-400">import</div>
            <div className="ml-4">axios.<span className="text-purple-400">post</span>(</div>
            <div className="ml-8 text-green-400">'https://api.lockapi.dev/login'</div>
            <div className="ml-8">&#123; email, password &#125;</div>
            <div className="ml-4">).<span className="text-yellow-400">then</span>(res ={'>'} &#123;</div>
            <div className="ml-8"><span className="text-blue-400">const</span> &#123; token &#125; = res.<span className="text-purple-400">data</span></div>
            <div className="ml-8">localStorage.<span className="text-purple-400">setItem</span>(<span className="text-green-400">'authToken'</span>, token)</div>
            <div className="ml-4">&#125;)</div>
          </div>
        </div>
      </div>

      <div className="mx-5 md:mx-0 p-8 md:p-12 my-0 rounded-xl border border-zinc-800">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-100 mb-4">Why Choose PlugAPI</h2>
          <p className="text-gray-400 max-w-2xl">The simplest way to add authentication to your projects</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start bg-zinc-900 p-2 rounded-lg cursor-pointer">
              <div className="bg-black p-3 rounded-lg mr-4 border border-zinc-800">
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <h3 className="text-gray-100 font-medium text-lg mb-0">Instant API key delivery</h3>
                <p className="text-gray-400">Get your keys immediately after signup</p>
              </div>
            </div>

            <div className="flex items-start bg-zinc-900 p-2 rounded-lg cursor-pointer">
              <div className="bg-black p-3 rounded-lg mr-4 border border-zinc-800">
                <span className="text-xl">🔒</span>
              </div>
              <div>
                <h3 className="text-gray-100 font-medium text-lg">Secure JWT authentication</h3>
                <p className="text-gray-400">Enterprise-grade security with JSON Web Tokens</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start bg-zinc-900 p-2 rounded-lg cursor-pointer">
              <div className="bg-black p-3 rounded-lg mr-4 border border-zinc-800">
                <span className="text-xl">🚀</span>
              </div>
              <div>
                <h3 className="text-gray-100 font-medium text-lg">Works with popular frameworks</h3>
                <p className="text-gray-400">React, Vue, Node, Django and more</p>
              </div>
            </div>

            <div className="flex items-start bg-zinc-900 p-2 rounded-lg cursor-pointer">
              <div className="bg-black p-3 rounded-lg mr-4 border border-zinc-800">
                <span className="text-xl">📦</span>
              </div>
              <div>
                <h3 className="text-gray-100 font-medium text-lg">Zero backend code</h3>
                <p className="text-gray-400">Eliminate the need to write authentication logic</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default LandingPage;