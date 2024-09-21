import React from "react";

const NotificationIcon = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.003 6.003 0 00-5-5.917V4a2 2 0 10-4 0v1.083A6.003 6.003 0 004 11v3.159c0 .538-.214 1.055-.595 1.437L2 17h5m5 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
};

export default NotificationIcon;
