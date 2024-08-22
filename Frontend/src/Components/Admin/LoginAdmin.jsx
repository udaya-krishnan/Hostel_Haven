import React from 'react'

function LoginAdmin() {
  return (
    <main className="flex-grow bg-bgcolor h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-6 text-headercolor text-center">
          Admin Login
        </h1>
        <form>
          <div className="mb-4">
            <label className="block text-btncolor mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-btncolor"
            />
          </div>
          <div className="mb-6">
            <label className="block text-btncolor mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-btncolor"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-btncolor text-white py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

export default LoginAdmin
