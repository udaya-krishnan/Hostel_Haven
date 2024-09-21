import React from "react";
import Sidebar from "../../Layout/AdminLayout/Sidebar";
import Header from "../../Layout/AdminLayout/Header";

function Dashboard() {
  // Sample user data


  return (
    <div className="flex b">
      {/* Sidebar will be fixed and takes space on the left */}
      <Sidebar />
      {/* Main content area */}
      <div className="flex-1  bg-gray-100">
        {/* Header */}
        <Header />
        {/* Content Area */}
        <div className="p-6 mt-20">
          <div className="bg-white ml-64 p-4 rounded-xl w-94 shadow mt-4">
          Chart 
          </div>
          {/* Add other components like ProductivityChart, ProjectsInProgress here */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
