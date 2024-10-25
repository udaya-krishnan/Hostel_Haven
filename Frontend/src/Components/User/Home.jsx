import React from "react";
import roombanner from "../../../public/banner/roombanner.jpg";

const Home = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[300px] sm:h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center"
      style={{ backgroundImage: `url(${roombanner})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Text content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
          HOSTEL
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl text-white mt-4">
          HAVEN
        </p>

        {/* Search Bar */}
        {/* Uncomment below to enable search bar */}
        {/* <div className="flex justify-center mt-6 flex-col sm:flex-row">
          <input
            type="text"
            placeholder="Location"
            className="px-4 w-full sm:w-80 p-2 border border-gray-300 rounded-l-lg"
          />
          <button className="bg-[#3C3633] text-[#EEEDEB] p-4 sm:rounded-l-none rounded-lg sm:ml-4 mt-4 sm:mt-0">
            Search
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
