import React from 'react';

function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-btncolor text-white">
    <div className="p-6">
      <nav>
        <ul>
          {/* User Link */}
          <li className="mb-4">
            <a href="/user" className="flex items-center px-4 py-2 hover:bg-headercolor rounded transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="h-6 w-6 mr-3"
                fill="currentColor"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3h-91.4z" />
              </svg>
              User
            </a>
          </li>
  
          {/* Host Link */}
          <li className="mb-4">
            <a href="/host" className="flex items-center px-4 py-2 hover:bg-headercolor rounded transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="h-6 w-6 mr-3"
                fill="currentColor"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3h-91.4z" />
              </svg>
              Host
            </a>
          </li>
  
          {/* Wallet Link */}
          <li className="mb-4">
            <a href="/wallet" className="flex items-center px-4 py-2 hover:bg-headercolor rounded transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-6 w-6 mr-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3V3z" />
              </svg>
              Wallet
            </a>
          </li>
  
          {/* Settings Link */}
          <li className="mb-4">
            <a href="/settings" className="flex items-center px-4 py-2 hover:bg-headercolor rounded transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m-9 0l-3 3m0-6V3h18v12m0 6H3" />
              </svg>
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
  
  );
}

export default Sidebar;
