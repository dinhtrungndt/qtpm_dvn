import React, { useState } from 'react';

const Lockscreen = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Password submitted!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-sm animate-fadeIn">
        {/* Logo/Title */}
        <div className="text-center mb-6 animate-slideDown">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
            DVN Technology
          </h1>
        </div>

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 animate-slideUp border border-gray-100">
          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <div className="relative group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Username */}
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-5">
            John Doe
          </h2>

          {/* Password Form */}
          <div className="space-y-4">
            <div className="relative group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-400 text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              />
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-blue-600 transition-all duration-300 disabled:opacity-50 hover:scale-110"
              >
                <svg
                  className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isLoading ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Helper Text */}
            <div className="text-center space-y-1.5">
              <p className="text-gray-600 text-xs">
                Enter your password to retrieve your session
              </p>
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors inline-block hover:underline"
              >
                Or sign in as a different user
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-600 text-xs animate-fadeIn">
          <p>
            Copyright © 2014-2025{' '}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 font-semibold transition-colors hover:underline"
            >
              DVN Technology
            </a>
          </p>
          <p className="mt-0.5 text-gray-500">All rights reserved</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out 0.2s both;
        }
      `}</style>
    </div>
  );
};

export default Lockscreen;
