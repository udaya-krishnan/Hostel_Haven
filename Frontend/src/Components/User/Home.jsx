import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/User/auth/authSelectors";
// import image from '../../../public/profile'
import roombanner from "../../../public/banner/roombanner.jpg";

const Home = () => {
  // const userData=useSelector(selectUser)
  // console.log(userData);

  return (
    <div
      className="relative bg-cover bg-center h-[600px] flex items-center justify-center"
      style={{ backgroundImage: `url(${roombanner})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold text-white">HOSTEL</h1>
        <p className="text-2xl text-white mt-4">HAVEN</p>
        {/* <div className="flex justify-center mt-6">
          <input
            type="text"
            placeholder="Location"
            className="px-4 w-80 p-2  border border-gray-300 rounded-l-lg"
          />
          <button className="bg-[#3C3633] text-[#EEEDEB] p-4 rounded-lg ml-4">
            Search
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
