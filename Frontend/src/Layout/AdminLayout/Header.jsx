import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Logout } from "../../features/Admin/auth/authSlice";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch=useDispatch()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout=()=>{
    dispatch(Logout())
  }

  return (
    <header className="bg-btncolor py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-50">HOSTEL HAVEN</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C8.67 7.165 8 8.388 8 10v4.159c0 .538-.214 1.055-.595 1.437L6 17h9m0 0v1a3 3 0 11-6 0v-1m0 0H5"
            />
          </svg>
          <span className="absolute top-0 right-0 inline-block w-2.5 h-2.5 bg-red-600 rounded-full"></span>
        </button>

        {/* Profile Photo */}
        <div className="relative">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="h-10 w-10 rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <a
                href="/account"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Account
              </a>
              <a
               onClick={logout}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
