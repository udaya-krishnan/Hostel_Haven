import React, { useState, useEffect } from "react";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(
    localStorage.getItem("activeItem") || "dashboard"
  );

  useEffect(() => {
    localStorage.setItem("activeItem", activeItem);
  }, [activeItem]);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="bg-gray-100 p-4 min-h-screen mt-5 flex">
      <div className="bg-white h-auto w-64 p-6 mt-20 rounded-xl shadow-lg fixed">
        <ul>
          <li className="mb-2 relative group">
            <a
              href="/admin/dashboard"
              onClick={() => handleItemClick("dashboard")}
              className={`flex items-center p-2 rounded ${
                activeItem === "dashboard"
                  ? "bg-gray-200 text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 576 512"
              >
                <path
                  fill="#3c3633"
                  d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                />
              </svg>
              <span className="ml-2">Dashboard</span>
              <span className="absolute left-10 w-32 p-2 bg-gray-700 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Dashboard
              </span>
            </a>
          </li>
          <li className="mb-2 relative group">
            <a
              href="/admin/user"
              onClick={() => handleItemClick("user")}
              className={`flex items-center p-2 rounded ${
                activeItem === "user"
                  ? "bg-gray-200 text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#3c3633"
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                />
              </svg>
              <span className="ml-2">User list</span>
              <span className="absolute left-10 w-32 p-2 bg-gray-700 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                User list
              </span>
            </a>
          </li>
          <li className="mb-2 relative group">
            <a
              href="/admin/host"
              onClick={() => handleItemClick("host")}
              className={`flex items-center p-2 rounded ${
                activeItem === "host"
                  ? "bg-gray-200 text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#3c3633"
                  d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7l131.7 0c0 0 0 0 .1 0l5.5 0 112 0 5.5 0c0 0 0 0 .1 0l131.7 0c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2L224 304l-19.7 0c-12.4 0-20.1 13.6-13.7 24.2z"
                />
              </svg>
              <span className="ml-2">Host list</span>
              <span className="absolute left-10 w-32 p-2 bg-gray-700 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Host list
              </span>
            </a>
          </li>
          <li className="mb-2 relative group">
            <a
              href="/admin/amenities"
              onClick={() => handleItemClick("amenities")}
              className={`flex items-center p-2 rounded ${
                activeItem === "amenities"
                  ? "bg-gray-200 text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 640 512"
              >
                <path
                  fill="#3c3633"
                  d="M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"
                />
              </svg>
              <span className="ml-2">Amenities</span>
              <span className="absolute left-10 w-32 p-2 bg-gray-700 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Amenities
              </span>
            </a>
          </li>
          <li className="mb-2 relative group">
            <a
              href="/admin/safety"
              onClick={() => handleItemClick("safety")}
              className={`flex items-center p-2 rounded ${
                activeItem === "safety"
                  ? "bg-gray-200 text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#3c3633"
                  d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z"
                />
              </svg>
              <span className="ml-2">Safety</span>
              <span className="absolute left-10 w-32 p-2 bg-gray-700 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Safety
              </span>
            </a>
          </li>
          <li className="mb-2 relative group">
            <a
              href="/admin/banner"
              onClick={() => handleItemClick("Banner")}
              className={`flex items-center p-2 rounded ${
                activeItem === "Banner"
                  ? "bg-gray-200 text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 576 512"
              >
                <path
                  fill="#3c3633"
                  d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM229.5 173.3l72 144c5.9 11.9 1.1 26.3-10.7 32.2s-26.3 1.1-32.2-10.7L253.2 328l-90.3 0-5.4 10.7c-5.9 11.9-20.3 16.7-32.2 10.7s-16.7-20.3-10.7-32.2l72-144c4.1-8.1 12.4-13.3 21.5-13.3s17.4 5.1 21.5 13.3zM208 237.7L186.8 280l42.3 0L208 237.7zM392 256a24 24 0 1 0 0 48 24 24 0 1 0 0-48zm24-43.9l0-28.1c0-13.3 10.7-24 24-24s24 10.7 24 24l0 96 0 48c0 13.3-10.7 24-24 24c-6.6 0-12.6-2.7-17-7c-9.4 4.5-19.9 7-31 7c-39.8 0-72-32.2-72-72s32.2-72 72-72c8.4 0 16.5 1.4 24 4.1z"
                />
              </svg>
              <span className="ml-2">Banner</span>
              <span className="absolute left-10 w-32 p-2 bg-gray-700 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Banner
              </span>
            </a>
          </li>
          <li className="mb-2 relative group">
            <a
              href="/admin/coupon"
              onClick={() => handleItemClick("Coupon")}
              className={`flex items-center p-2 rounded ${
                activeItem === "Coupon"
                  ? "bg-gray-200 text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6" viewBox="0 0 576 512">
                <path
                  fill="#3c3633"
                  d="M64 64C28.7 64 0 92.7 0 128l0 64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320l0 64c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-64c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6l0-64c0-35.3-28.7-64-64-64L64 64zm64 112l0 160c0 8.8 7.2 16 16 16l288 0c8.8 0 16-7.2 16-16l0-160c0-8.8-7.2-16-16-16l-288 0c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32l320 0c17.7 0 32 14.3 32 32l0 192c0 17.7-14.3 32-32 32l-320 0c-17.7 0-32-14.3-32-32l0-192z"
                />
              </svg>
              <span className="ml-2">Coupon</span>
              <span className="absolute left-10 w-32 p-2 bg-gray-700 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Coupon
              </span>
            </a>
          </li>
          <li className="mb-2 relative group">
            <a
              href="/admin/review"
              onClick={() => handleItemClick("Review")}
              className={`flex items-center p-2 rounded ${
                activeItem === "Review"
                  ? "bg-gray-200 text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg"
               className="h-6 w-6"
               viewBox="0 0 576 512"><path fill="#3c3633" d="M288 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L288.1 86.9l-.1 .3 0 289.2zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L288.1 439.8 159.8 508.3C149 514 135.9 513.1 126 506s-14.9-19.3-12.9-31.3L137.8 329 33.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L195 150.3 259.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L438.5 329l24.6 145.7z"/></svg>
              <span className="ml-2">Review & Feedback</span>
              <span className="absolute left-10 w-40 p-2 bg-gray-700 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Review & Feedback
              </span>
            </a>
          </li>
          <li className="mb-2 relative group">
            <a
              href="/admin/wallet"
              onClick={() => handleItemClick("Wallet")}
              className={`flex items-center p-2 rounded ${
                activeItem === "Wallet"
                  ? "bg-gray-200 text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
             <svg xmlns="http://www.w3.org/2000/svg"
               className="h-6 w-6"
              viewBox="0 0 512 512"><path fill="#3c3633" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L80 128c-8.8 0-16-7.2-16-16s7.2-16 16-16l368 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
              <span className="ml-2">Wallet</span>
              <span className="absolute left-10 w-32 p-2 bg-gray-700 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Wallet
              </span>
            </a>
          </li>
          <li className="mb-2 relative group">
            <a
              href="/admin/notification"
              onClick={() => handleItemClick("Notification")}
              className={`flex items-center p-2 rounded ${
                activeItem === "Notification"
                  ? "bg-gray-200 text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
            <svg xmlns="http://www.w3.org/2000/svg"  className="h-6 w-6" viewBox="0 0 448 512"><path fill="#3c3633" d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>
              <span className="ml-2">Notification</span>
              <span className="absolute left-10 w-32 p-2 bg-gray-700 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Notification
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
