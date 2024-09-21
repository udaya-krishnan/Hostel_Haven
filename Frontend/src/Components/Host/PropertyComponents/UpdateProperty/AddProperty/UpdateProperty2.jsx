import React, { useState } from "react";

function UpdateProperty2({ updateBack, updateNext, formData, updateChange }) {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const regularPrice = parseFloat(formData.propertyPrice);
    const offerPrice = parseFloat(formData.propertyOffer);

    // Check for valid regular price
    if (!formData.propertyPrice || isNaN(regularPrice) || regularPrice <= 0) {
      newErrors.propertyPrice =
        "Regular price is required and must be a positive number.";
    }

    // Check for valid offer price
    if (formData.propertyOffer) {
      if (isNaN(offerPrice) || offerPrice <= 0) {
        newErrors.propertyOffer = "Offer price must be a positive number.";
      } else if (offerPrice >= regularPrice) {
        newErrors.propertyOffer =
          "Offer price must be less than the regular price.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validateForm()) {
      updateNext();
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="mt-24 p-6 rounded-lg">
        <h1 className="text-4xl mb-5 text-btncolor font-extrabold text-center">
          Add Your Price
        </h1>
        <span className="text-sm text-gray-600 block mb-5 text-center">
          When making a booking, an administrative fee of 10% of the total
          amount will be charged.
        </span>

        {/* Container for Inputs */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center mb-4">
            <label
              htmlFor="regularPrice"
              className="text-lg font-semibold mb-2 text-btncolor"
            >
              Regular Price
            </label>
            <input
              type="text"
              id="regularPrice"
              name="propertyPrice"
              value={formData.propertyPrice}
              onChange={updateChange}
              className={`w-full max-w-xs h-10 px-3 border rounded-lg ${
                errors.propertyPrice ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter regular price"
              pattern="\d*\.?\d*"
            />
            {errors.propertyPrice && (
              <span className="text-red-500 text-sm">
                {errors.propertyPrice}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center mb-4">
            <label
              htmlFor="offerPrice"
              className="text-lg font-semibold mb-2 text-btncolor"
            >
              Offer Price
            </label>
            <input
              type="text"
              id="offerPrice"
              name="propertyOffer"
              value={formData.propertyOffer}
              onChange={updateChange}
              className={`w-full max-w-xs h-10 px-3 border rounded-lg ${
                errors.propertyOffer ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter offer price"
              pattern="\d*\.?\d*"
            />
            {errors.propertyOffer && (
              <span className="text-red-500 text-sm">
                {errors.propertyOffer}
              </span>
            )}
          </div>
        </div>

        {/* Button Container */}
        <div className="flex justify-between mt-8">
          <button
            className="px-6 py-2 rounded-lg bg-white border-2 border-btncolor text-btncolor"
            onClick={updateBack}
          >
            Back
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-btncolor text-white"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProperty2;
