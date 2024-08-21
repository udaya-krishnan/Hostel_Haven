import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import {
  selectToken,
  selectUser,
} from "../../features/User/auth/authSelectors";
import { Logout } from "../../features/User/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const token = useSelector(selectToken);
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsLogged(true);
    }
  }, [token]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  function LogoutUser() {
    dispatch(Logout());
    navigate("/login");
  }

  function BecomeHost() {
    navigate("/host/join");
  }

  return (
    <>
      <header className="bg-headercolor shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-2xl font-bold text-btncolor">Hostel Haven</div>

          <nav className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-btncolor">
              Home
            </a>
            <a href="#" className="text-btncolor">
              Hostels/Rooms
            </a>
            <a href="#" className="text-btncolor">
              About Us
            </a>
            <a href="#" className="text-btncolor">
              Contact Us
            </a>
            <button
              className="bg-btncolor text-white py-2 px-4 rounded"
              onClick={BecomeHost}
            >
              Become a Host
            </button>
            {!isLogged ? (
              <>
                <a href="/login" className="text-btncolor">
                  Login
                </a>
                <a href="/register" className="text-btncolor">
                  Sign Up
                </a>
              </>
            ) : (
              <div className="relative">
                <div onClick={toggleDropdown} className="cursor-pointer">
                  <img
                    src={
                      userData?.image?.startsWith("http")
                        ? userData.image
                        : `../../../public/profile/${
                            userData?.image || "defaultProfileImage.png"
                          }`
                    }
                    alt="User"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </div>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Profile
                    </a>
                    <a
                      href="/messages"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Messages
                    </a>
                    <a
                      href="/notifications"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Notifications
                    </a>
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={LogoutUser}
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile menu icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-6 h-6 fill-current cursor-pointer text-btncolor md:hidden"
            onClick={toggleSidebar}
          >
            <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
          </svg>
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}

export default Header;
