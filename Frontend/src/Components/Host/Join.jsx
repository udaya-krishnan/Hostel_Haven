import React from "react";
import background from "../../../public/banner/businessman.jpeg";

function Join() {
  return (
    <main className="flex-grow bg-gray-100">
  <div
    className="h-screen flex flex-col justify-between bg-cover bg-center "
    style={{ backgroundImage: `url(${background})` }}
  >
  
    <div className="flex justify-start p-6">
      <div className="text-left text-white">
        <h1 className="text-2xl md:text-4xl font-extrabold">
          HOSTEL HAVEN
        </h1>
      </div>
    </div>

 
    <div className="flex justify-center pb-6">
      <button className="w-64 h-14 bg-btncolor text-bgcolor font-extrabold text-2xl rounded-2xl">
        JOIN
      </button>
    </div>
  </div>
</main>

  );
}

export default Join;
