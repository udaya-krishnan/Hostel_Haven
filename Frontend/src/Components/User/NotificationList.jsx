import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { fetchNotifications } from "../../features/User/auth/authAction";

// Establish socket connection
const socket = io("http://localhost:3000");

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await dispatch(fetchNotifications());

      // Sort notifications by createdAt in descending order
      const sortedNotifications = res.payload.fetch.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setNotifications(sortedNotifications);
    })();
  }, [dispatch]);

  useEffect(() => {
    // Listen for 'notification' events from the backend
    socket.on("notification", (data) => {
      console.log("New notification received:", data);

      // Only add the notification if the recipient is not a "host"
      if (data.recipient !== "hosts") {
        setNotifications((prevNotifications) => [
          { message: data.message, recipient: data.recipient, createdAt: new Date() },
          ...prevNotifications,
        ]);
      }
    });

    // Clean up when the component unmounts
    return () => {
      socket.off("notification");
    };
  }, []);

  const handleDelete = (message) => {
    console.log(`Delete notification: ${message}`);
    // Add logic to remove the notification from the state
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.message !== message)
    );
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800">All Notifications</h2>
        {notifications.length > 0 ? (
          <ul className="divide-y divide-gray-300">
            {notifications.map((notification, index) => (
              <li key={index} className="flex justify-between items-center py-4">
                <div>
                  <p className="text-gray-800 font-medium">{notification.message}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  className="text-gray-500 hover:text-red-500 focus:outline-none"
                  onClick={() => handleDelete(notification.message)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center mt-4">No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationList;
