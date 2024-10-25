import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';

function Addproperty5({ formData, handleBack, propertyFacilities }) {
  // Initial state for the number of bedrooms, bathrooms, and parking
  const [facilities, setFacilities] = useState(formData.propertyFacilities);

  // Functions to handle increment and decrement actions
  const handleIncrement = (type) => {
    setFacilities((prevState) => ({
      ...prevState,
      [type]: prevState[type] + 1,
    }));
  };

  const handleDecrement = (type) => {
    setFacilities((prevState) => ({
      ...prevState,
      [type]: prevState[type] > 0 ? prevState[type] - 1 : 0,
    }));
  };

  const handleNext = () => {
    if (facilities.rooms > 0 || facilities.bathrooms > 0 || facilities.parking > 0) {
      propertyFacilities(facilities);
    } else {
      toast.error("Please add at least one facility.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add facilities available at your place.
      </h1>
      <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-6 mb-8">
        {/* Bedrooms */}
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <button
            className="text-2xl bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => handleDecrement("rooms")}
          >
            -
          </button>
          <span className="text-xl font-semibold">{facilities.rooms}</span>
          <span className="text-gray-600">Bedrooms</span>
          <button
            className="text-2xl bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => handleIncrement("rooms")}
          >
            +
          </button>
        </div>

        {/* Bathrooms */}
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <button
            className="text-2xl bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => handleDecrement("bathrooms")}
          >
            -
          </button>
          <span className="text-xl font-semibold">{facilities.bathrooms}</span>
          <span className="text-gray-600">Bathrooms</span>
          <button
            className="text-2xl bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => handleIncrement("bathrooms")}
          >
            +
          </button>
        </div>

        {/* Parking */}
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <button
            className="text-2xl bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => handleDecrement("parking")}
          >
            -
          </button>
          <span className="text-xl font-semibold">{facilities.parking}</span>
          <span className="text-gray-600">Parking</span>
          <button
            className="text-2xl bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => handleIncrement("parking")}
          >
            +
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4">
        <button
          className="px-8 py-2 border-2 border-btncolor text-btncolor rounded-lg mb-4 sm:mb-0"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="px-8 py-2 bg-btncolor text-white rounded-lg"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default Addproperty5;