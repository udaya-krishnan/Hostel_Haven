import React, { useState } from "react";
import background from "../../../public/banner/login.jpg";
import google from "../../../public/icons/google-brands-solid.svg";
import { Link } from "react-router-dom";

function Register() {
  return (
    <main className="flex-grow bg-gray-100">
      <div
        className="h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="flex flex-col md:flex-row bg-black bg-opacity-50 w-full h-full p-6 md:p-20">
          <div className="text-left text-white md:w-1/2 mr-auto my-auto">
            <h1 className="hidden text-2xl md:text-4xl md:flex font-bold mb-4">
              Unlock Your Ideal Stay at Hostel Haven
            </h1>
            <p className="hidden text-sm md:text-lg md:flex">
              Sign in with your phone number and discover unbeatable deals,
              member-only discounts, and perks from our trusted travel partners.
            </p>
          </div>
          <div className="bg-bgcolor shadow-md rounded-lg overflow-hidden p-6 md:p-10 w-full md:w-2/5 ml-auto my-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-btncolor">
              Create an account
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-btncolor">Name</label>
                <input
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-btncolor"
                  type="text"
                  placeholder="Enter Your Name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-btncolor">Email Address</label>
                <input
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-btncolor"
                  type="text"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-btncolor">Password</label>
                <input
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-btncolor"
                  type="text"
                  placeholder="Enter Your Password"
                />
              </div>
              <button className="w-full bg-btncolor text-white py-2 px-4 rounded">
                Continue
              </button>
              <div className="mt-1 text-center"> {/* Center-align the link */}
                <p className="text-gray-800">
                  <Link to="/login">I already have an account</Link>
                </p>
              </div>
              <div className="text-center my-4">Or Continue With</div>
              <div className="flex justify-center">
                <button className="bg-btncolor text-white py-2 px-4 rounded-3xl flex justify-center items-center">
                  <img
                    src={google}
                    alt="Google Icon"
                    className="w-5 h-5 mr-2"
                  />
                  Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
