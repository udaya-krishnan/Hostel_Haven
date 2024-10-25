import React, { useState } from "react";
import PropertyMap from "./PropertyMap";
import { Toaster, toast } from "sonner";

function Addproperty9({
  handleNext,
  handleBack,
  handleSubmit,
  formData,
  handleChange,
  handleFileChange,
  handleImageFileChange,
  handleLocationChange,
}) {
  const [propertyLocation, setPropertyLocation] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleLocationUpdate = (location) => {
    setPropertyLocation(location.name);
    handleLocationChange(location);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length < 5) {
      toast.error("Please upload at least 5 images.");
    } else {
      handleImageFileChange(e);
      const filePreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(filePreviews);
    }
  };

  const validateLicenseNumber = () => {
    if (formData.propertyLicense.length !== 21) {
      toast.error("License number must be exactly 21 characters.");
      return false;
    }
    return true;
  };

  const handleFormSubmit = () => {
    if (validateLicenseNumber()) {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between p-4 md:p-8 bg-background mt-14">
      <div className="w-full md:w-2/3 mb-4 md:mb-0">
        <div className="flex flex-col p-4 bg-background rounded-lg shadow">
          <h1 className="text-3xl font-bold text-primary mb-6">
            Add Your Property Details
          </h1>
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-8">
            {/* Image Upload Section */}
            <div className="flex flex-col items-center mb-4 md:mb-0">
              <div className="border border-border rounded p-4">
                <div className="w-24 h-24 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600">Add image</span>
                </div>
                <input
                  type="file"
                  className="mt-4"
                  onChange={handleImageUpload}
                  multiple
                />
              </div>

              {/* Preview Images */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {imagePreviews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Preview ${index}`}
                    className="w-24 h-24 object-cover rounded"
                  />
                ))}
              </div>
            </div>

            {/* Property Details Form */}
            <div className="flex flex-col space-y-4 w-full">
              <input
                type="text"
                placeholder="Property Name"
                name="propertyName"
                value={formData.propertyName}
                onChange={handleChange}
                className="border border-border rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="Property Location"
                name="propertyLocation"
                value={propertyLocation}
                readOnly
                className="border border-border rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="Property License number"
                name="propertyLicense"
                value={formData.propertyLicense}
                onChange={handleChange}
                className="border border-border rounded px-4 py-2"
              />
              <textarea
                placeholder="Description"
                name="propertyDescription"
                value={formData.propertyDescription}
                onChange={handleChange}
                className="border border-border rounded px-4 py-2"
                rows="4"
              ></textarea>

              {/* Document Upload Input */}
              <div className="mt-4">
                <label className="block text-secondary mb-2">
                  Upload Document
                </label>
                <input
                  type="file"
                  className="border border-border rounded px-4 py-2 w-full"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-4 mt-8">
            <button
              className="px-8 py-2 border-2 border-primary text-primary rounded"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className="px-8 py-2 bg-btncolor text-white rounded-lg"
              onClick={handleFormSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/3 md:pl-4">
        <PropertyMap onLocationSelect={handleLocationUpdate} />
      </div>

      <Toaster position="top-right" />
    </div>
  );
}

export default Addproperty9;