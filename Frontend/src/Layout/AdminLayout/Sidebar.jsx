import React, { useState, useEffect } from "react";

const Sidebar = () => {
  // Retrieve the active menu item from localStorage, or default to "dashboard"
  const [activeItem, setActiveItem] = useState(
    localStorage.getItem("activeItem") || "dashboard"
  );

  // Update localStorage whenever activeItem changes
  useEffect(() => {
    localStorage.setItem("activeItem", activeItem);
  }, [activeItem]);

  // Function to handle item click and set the active item
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="bg-gray-100 p-4 min-h-screen mt-5 flex">
      <div className="bg-white h-auto w-64 p-6 mt-20 rounded-xl shadow-lg fixed">
        <ul>
          <li className="mb-4">
            <a
              href="/admin/dashboard"
              onClick={() => handleItemClick("dashboard")}
              className={`flex items-center p-2 rounded ${
                activeItem === "dashboard"
                  ? "bg-gray-200 text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              <span className="ml-2">Dashboard</span>
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/user"
              onClick={() => handleItemClick("user")}
              className={`flex items-center p-2 rounded ${
                activeItem === "user"
                  ? "bg-gray-200 text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              <span className="ml-2">User list</span>
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/host"
              onClick={() => handleItemClick("host")}
              className={`flex items-center p-2 rounded ${
                activeItem === "host"
                  ? "bg-gray-200 text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              <span className="ml-2">Host list</span>
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/amenities"
              onClick={() => handleItemClick("amenities")}
              className={`flex items-center p-2 rounded ${
                activeItem === "amenities"
                  ? "bg-gray-200 text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              <span className="ml-2">Amenities</span>
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/safety"
              onClick={() => handleItemClick("safety")}
              className={`flex items-center p-2 rounded ${
                activeItem === "safety"
                  ? "bg-gray-200 text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              <span className="ml-2">Safety</span>
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/banner"
              onClick={() => handleItemClick("Banner")}
              className={`flex items-center p-2 rounded ${
                activeItem === "Banner"
                  ? "bg-gray-200 text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              <span className="ml-2">Banner</span>
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/coupon"
              onClick={() => handleItemClick("Coupon")}
              className={`flex items-center p-2 rounded ${
                activeItem === "Coupon"
                  ? "bg-gray-200 text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              <span className="ml-2">Coupon</span>
            </a>
          </li>
          {/* Add more list items as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
