import React from "react";
import background from "../../../public/banner/businessman.jpeg";

function LoginHost() {
  return (
    <>
      <main className="flex-grow bg-gray-100">
        <div
          className="h-screen flex justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="flex flex-col md:flex-row bg-black bg-opacity-50 w-full h-full p-6 md:p-20">
           
            <div className="absolute top-0 left-0 p-6 md:p-10">
              <h1 className="text-2xl md:text-4xl font-extrabold text-white">
                HOSTEL HAVEN
              </h1>
            </div>

            
            <div className="text-left text-white md:w-1/2 mr-auto my-auto flex flex-col justify-center h-full">
              <h1 className="text-2xl md:text-4xl font-extrabold mb-2">
                Growing your
              </h1>
              <p className="text-sm md:text-2xl">
                business made easy
              </p>
            </div>
            <div className="bg-bgcolor shadow-md rounded-lg overflow-hidden p-6 md:p-10 w-full md:w-2/5 ml-auto my-auto">
             <h2 className="text-xl md:text-2xl font-bold mb-4 text-btncolor">
                Enter Your Details 
             </h2> 
             <form >
                <div className="mb-4">
                    <label className="block text-btncolor">Name</label>
                    <input type="text" 
                    className="w-full mt-2 px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-btncolor" 
                    placeholder="Enter Your Name"/>
                </div>
             </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default LoginHost;
