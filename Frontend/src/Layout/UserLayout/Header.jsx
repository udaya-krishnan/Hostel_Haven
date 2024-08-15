import React, { useState } from 'react';
import Sidebar from './Sidebar'

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="bg-headercolor shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-2xl font-bold text-btncolor">Hostel Haven</div>
          <nav className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-btncolor">Home</a>
            <a href="#" className="text-btncolor">Hostels/Rooms</a>
            <a href="#" className="text-btncolor">About Us</a>
            <a href="#" className="text-btncolor">Contact Us</a>
            <button className="bg-btncolor text-white py-2 px-4 rounded">Become a Host</button>
          </nav>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-6 h-6 fill-current cursor-pointer text-btncolor md:hidden"
            onClick={toggleSidebar}
          >
            <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
          </svg>
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}

export default Header;
