import React, { useState } from "react";
import breakfast from "../../../../../public/icons/breakfast.jpeg";
import dinner from "../../../../../public/icons/dinner.jpeg";
import lunch from "../../../../../public/icons/lunch.jpeg";

function Addproperty3({ handleBack, handleNext, formData, handleAccommodationChange }) {
  const [selected, setSelected] = useState(formData.propertyAccommodation || null);

  const handleCardClick = (type) => {
    setSelected(type);
  };

  const handleNextOk = () => {
    if (selected) {
      handleAccommodationChange(selected);
    } else {
      handleNext();
    }
  };

  const mealTypes = [
    { type: "breakfast", image: breakfast, label: "Breakfast" },
    { type: "lunch", image: lunch, label: "Breakfast & Lunch" },
    { type: "dinner", image: dinner, label: "Breakfast, Lunch & Dinner" }
  ];

  return (
    <div className="flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-md">
        <h1 className="text-4xl text-btncolor font-extrabold text-center">
          Add Accommodation
        </h1>

        {/* Container for Cards */}
        <div className="flex mt-10 gap-4 flex-wrap justify-center">
          {mealTypes.map(({ type, image, label }) => (
            <div
              key={type}
              className={`cursor-pointer flex flex-col items-center rounded-xl transition-all duration-300 p-4 m-2 w-full sm:w-48 ${
                selected === type ? "bg-btncolor" : "bg-orange-200"
              }`}
              onClick={() => handleCardClick(type)}
            >
              <div className="w-full h-32 flex items-center justify-center rounded-xl overflow-hidden">
                <img
                  src={image}
                  alt={label}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>
              <span className={`mt-2 text-lg font-semibold ${selected === type ? "text-white" : "text-btncolor"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Button Container */}
        <div className="flex justify-center items-center mt-10 space-x-4 p-4">
          <button className="px-6 py-2 rounded-lg bg-white border-2 border-btncolor text-btncolor text-sm md:text-base" onClick={handleBack}>
            Back
          </button>
          <button className="px-6 py-2 rounded-lg bg-btncolor text-white text-sm md:text-base" onClick={handleNextOk}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addproperty3;