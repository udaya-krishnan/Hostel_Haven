import React from "react";

function Sidebar({ isOpen, toggleSidebar,isLogged }) {
  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-500 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={toggleSidebar}
    >
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-md p-5 transition-transform duration-500 ${
          isOpen ? "transform translate-x-0" : "transform translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the sidebar
      >
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
          {!isLogged?
          <ul> 
            <li className="mb-2">
            <a href="/register" className="block py-2 px-4 text-btncolor">
              Sign Up
            </a>
          </li>
          <li className="mb-2">
            <a href="/login" className="block py-2 px-4 text-btncolor">
              Log In
            </a>
          </li>
          <li className="mb-2">
            <a href="/" className="block py-2 px-4 text-btncolor">
              Home
            </a>
          </li>
          <li className="mb-2">
            <a href="/hostelroom" className="block py-2 px-4 text-btncolor">
              Hostel/Rooms
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block py-2 px-4 text-btncolor">
              About us
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block py-2 px-4 text-btncolor">
              Contact us
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block py-2 px-4 text-btncolor">
              Help Center
            </a>
          </li>
          </ul>:
          <ul>
              <li className="mb-2">
            <a href="/" className="block py-2 px-4 text-btncolor">
              Home
            </a>
          </li>
          <li className="mb-2">
            <a href="/hostelroom" className="block py-2 px-4 text-btncolor">
              Hostel/Rooms
            </a>
          </li>
          <li className="mb-2">
            <a href="/profile" className="block py-2 px-4 text-btncolor">
            My Profile
            </a>
          </li>
          <li className="mb-2">
            <a href="/reservationlist" className="block py-2 px-4 text-btncolor">
            Reservation
            </a>
          </li>
          <li className="mb-2">
            <a href="/notifications" className="block py-2 px-4 text-btncolor">
            Notifications
            </a>
          </li>
          <li className="mb-2">
            <a href="/wishlist" className="block py-2 px-4 text-btncolor">
            wishlist
            </a>
          </li>
          <li className="mb-2">
            <a href="/chat" className="block py-2 px-4 text-btncolor">
            Messages
            </a>
          </li>
          <li className="mb-2">
            <a href="/wallet" className="block py-2 px-4 text-btncolor">
              Wallet
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block py-2 px-4 text-btncolor">
              About us
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block py-2 px-4 text-btncolor">
              Contact us
            </a>
          </li>
         
          </ul>
          
          }
      </div>
    </div>
  );
}

export default Sidebar;
