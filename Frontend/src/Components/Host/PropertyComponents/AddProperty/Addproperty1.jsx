import React, { useState } from "react";
import hostroom from "../../../../../public/icons/hostalroom3.jpeg";
import room from "../../../../../public/icons/Details1.jpg";
import { Toaster, toast } from "sonner";

function AddProperty1({ handleBack, formData, handlePropertyTypeChange }) {
  const [selected, setSelected] = useState(formData.propertyType || null);

  const handleNext = () => {
    if (selected) {
      handlePropertyTypeChange(selected); // directly pass the selected type
    } else {
      toast.error("Please select a property type.");
    }
  };

  return (
    <div className="flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-md">
        <h1 className="text-4xl text-btncolor font-extrabold text-center">
          What kind of place will you
          <br />
          host?
        </h1>
        <div className="flex mt-10 gap-4 flex-wrap justify-center">
          {["hostel", "room"].map((type) => (
            <div
              key={type}
              className={`cursor-pointer flex flex-col items-center rounded-xl transition-all duration-300 p-4 m-2 w-full md:w-48 ${
                selected === type ? "bg-btncolor" : "bg-orange-200"
              }`}
              onClick={() => setSelected(type)}
            >
              <div className="w-full h-32 flex items-center justify-center rounded-xl overflow-hidden">
                <img
                  src={type === "hostel" ? hostroom : room}
                  alt={type.charAt(0).toUpperCase() + type.slice(1)}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>
              <span
                className={`mt-2 text-lg font-semibold ${
                  selected === type ? "text-white" : "text-btncolor"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-10 space-x-4 p-4">
          <button
            className="px-6 py-2 rounded-lg bg-white border-2 border-btncolor text-btncolor text-sm md:text-base"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-btncolor text-white text-sm md:text-base"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default AddProperty1;