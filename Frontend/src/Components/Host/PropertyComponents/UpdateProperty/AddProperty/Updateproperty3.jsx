import React, { useState } from "react";
import breakfast from "../../../../../../public/icons/breakfast.jpeg";
import dinner from "../../../../../../public/icons/dinner.jpeg";
import lunch from "../../../../../../public/icons/lunch.jpeg";

function Updateproperty3({ updateBack, updateNext, formData, updateAccommodationChange }) {
  const [selected, setSelected] = useState(formData.propertyAccommodation || null);

  const handleCardClick = (type) => {
    setSelected(type);
  };

  const handleNextOk = () => {
    if (selected) {
      updateAccommodationChange(selected);
    } else {
      updateNext();
    }
  };

  
  const mealTypes = [
    { type: "breakfast", image: breakfast, label: "Breakfast" },
    { type: "lunch", image: lunch, label: "Breakfast & Lunch" },
    { type: "dinner", image: dinner, label: "Breakfast, Lunch & Dinner" }
  ];

  return (
    <div className="flex justify-center items-center">
      <div className="mt-24">
        <h1 className="text-4xl text-btncolor font-extrabold text-center">
          Add Accommodation
        </h1>

        {/* Container for Cards */}
        <div className="flex mt-10 gap-10 justify-center">
          {mealTypes.map(({ type, image, label }) => (
            <div
              key={type}
              className={`cursor-pointer flex flex-col items-center rounded-xl transition-all duration-300 p-2 ${
                selected === type ? "bg-btncolor" : "bg-orange-200"
              }`}
              onClick={() => handleCardClick(type)}
              style={{ width: "200px", height: "fit-content" }}
            >
              <div className="w-full h-32 flex items-center justify-center rounded-xl overflow-hidden">
                <img
                  src={image}
                  alt={label}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>
              <span className={`mt-2 text-xl font-semibold ${selected === type ? "text-white" : "text-btncolor"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Button Container */}
        <div className="flex justify-center items-center mt-10 space-x-4 p-4">
          <button className="px-8 py-2 rounded-lg bg-white border-2 border-btncolor text-btncolor" onClick={updateBack}>
            Back
          </button>
          <button className="px-8 py-2 rounded-lg bg-btncolor text-white" onClick={handleNextOk}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Updateproperty3;
