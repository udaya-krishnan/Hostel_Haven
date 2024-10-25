import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HostLogout } from "../../features/Host/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectHost } from "../../features/Host/auth/authSelectors";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar
  const hostData = useSelector(selectHost);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  const logout = () => {
    dispatch(HostLogout());
    navigate("/host/login");
  };

  return (
    <>
      <header className="bg-[#DABFAA] py-4 px-6 flex justify-between items-center fixed top-0 w-full z-50 shadow-md">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-800">Hostel Haven</h1>
        </div>

        <nav className="hidden md:flex space-x-8 items-center">
          <Link to="/host/home" className="text-gray-800 hover:text-gray-600">
            Home
          </Link>
          <Link to="/host/property" className="text-gray-800 hover:text-gray-600">
            Properties
          </Link>
          <Link to="/host/about-us" className="text-gray-800 hover:text-gray-600">
            About Us
          </Link>
          <Link to="/host/contact-us" className="text-gray-800 hover:text-gray-600">
            Contact Us
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <div onClick={toggleDropdown} className="cursor-pointer">
              <img
                src={
                  hostData?.image?.startsWith("http")
                    ? hostData.image
                    : `../../../public/profile/${hostData?.image || "anony.webp"}`
                }
                alt="User"
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                <Link
                  to="/host/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Link
                  to="/host/chat"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Messages
                </Link>
                <Link
                  to="/host/reservation"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Reservation
                </Link>
                <Link
                  to="/host/wallet"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Wallet
                </Link>
                <Link
                  to="/host/notifications"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Notifications
                </Link>
                <div
                  onClick={logout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="md:hidden flex items-center">
          <button onClick={toggleSidebar} className="text-gray-800 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Sidebar on the right */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleSidebar}
      >
        <div className={`fixed right-0 top-0 w-64 h-full bg-white shadow-lg z-50 p-4 transition-transform duration-300 transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <Link to="/host/home" className="block mt-7 mb-2 text-gray-800 hover:text-gray-600">
            Home
          </Link>
          <Link to="/host/property" className="block mb-2 text-gray-800 hover:text-gray-600">
            Properties
          </Link>
          <Link to="/host/about-us" className="block mb-2 text-gray-800 hover:text-gray-600">
            About Us
          </Link>
          <Link to="/host/contact-us" className="block mb-2 text-gray-800 hover:text-gray-600">
            Contact Us
          </Link>
          <Link to="/host/profile" className="block mb-2 text-gray-800 hover:text-gray-600">
            My Profile
          </Link>
          <Link to="/host/chat" className="block mb-2 text-gray-800 hover:text-gray-600">
            Messages
          </Link>
          <Link to="/host/reservation" className="block mb-2 text-gray-800 hover:text-gray-600">
            Reservation
          </Link>
          <Link to="/host/wallet" className="block mb-2 text-gray-800 hover:text-gray-600">
            Wallet
          </Link>
          <Link to="/host/notifications" className="block mb-2 text-gray-800 hover:text-gray-600">
            Notifications
          </Link>
          <div
            onClick={logout}
            className="block mb-2 text-gray-800 hover:text-gray-600 cursor-pointer"
          >
            Logout
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;