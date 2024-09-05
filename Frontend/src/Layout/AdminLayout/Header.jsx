import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Logout } from '../../features/Admin/auth/authSlice';
import NotificationIcon from "./NotificationIcon";

const Header = () => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New property created!" },
    { id: 2, message: "Host updated a property." },
    { id: 3, message: "User booked a room." }
  ]);

  function logout() {
    dispatch(Logout());
  }

  // Toggle the notification dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-white p-4 w-full flex items-center justify-between border-b shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="text-xl font-semibold">Hostel Haven</div>
      <div className="flex items-center space-x-4 relative">
        {/* Notification Icon */}
        <NotificationIcon onClick={toggleDropdown} />

        {/* Dropdown Notification List */}
        {isDropdownOpen && (
          <div className="absolute top-10 right-0 bg-white shadow-lg rounded-lg p-4 w-72">
            <h4 className="font-semibold text-gray-700 mb-2">Notifications</h4>
            <ul className="space-y-2">
              {notifications.length ? (
                notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="p-2 border rounded-lg hover:bg-gray-100 transition duration-150"
                  >
                    {notification.message}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No new notifications</li>
              )}
            </ul>
          </div>
        )}

        {/* Logout Button */}
        <button className="bg-gray-200 p-2 rounded" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
