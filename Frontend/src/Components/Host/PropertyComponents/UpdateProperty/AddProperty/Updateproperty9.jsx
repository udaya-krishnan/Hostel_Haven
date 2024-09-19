import React, { useState, useEffect } from "react";
import PropertyMap from "./UpdatePropertyMap";
import { Toaster, toast } from "sonner";

function Updateproperty9({
  updateNext,
  updateBack,
  updateSubmit,
  formData,
  updateChange,
  updateFileChange,
  updateImageFileChange,
  updateLocationChange,
}) {
  const [propertyLocation, setPropertyLocation] = useState(formData.propertyLocation || "");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imagesToRemove, setImagesToRemove] = useState([]);

  useEffect(() => {
    // Set initial image previews from formData
    if (formData.propertyImages && formData.propertyImages.length > 0) {
      const initialPreviews = formData.propertyImages.map((image) => {
        if (image) {
          return typeof image === "string" ? image : URL.createObjectURL(image);
        } else {
          return null;
        }
      });
      setImagePreviews(initialPreviews);
    }
  }, [formData.propertyImages]);

  const handleLocationUpdate = (location) => {
    setPropertyLocation(location.name);
    updateLocationChange(location);
  };


  const handleImageUpload = (e) => {
     const files = Array.from(e.target.files);
    if (files.length < 5) {
      toast.error("Please upload at least 5 images.");
    } else {
      updateImageFileChange(e);

      // Create previews for selected images
      const filePreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(filePreviews);
    }
  };
  
  const handleFormSubmit = () => {
    updateSubmit();
  };

  const handleImageRemove = (index) => {
    const updatedPreviews = [...imagePreviews];
    const updatedImages = [...formData.propertyImages];

    updatedPreviews[index] = null;
    updatedImages[index] = null;

    setImagePreviews(updatedPreviews);
    updateChange({
      target: {
        name: "propertyImages",
        value: updatedImages,
      },
    });

    setImagesToRemove((prev) => [...prev, index]);
  };

  return (
    <div className="flex justify-between p-8 bg-background">
      <div className="w-2/3">
        <div className="flex flex-col p-8 bg-background">
          <h1 className="text-3xl font-bold text-primary mb-6">
            Update Your Property Details
          </h1>
          <div className="flex space-x-8">
            {/* Image Upload Section */}
            <div className="flex flex-col items-center">
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
              <div className="mt-4 grid grid-cols-3 gap-4">
                {imagePreviews.map((src, index) =>
                  src ? (
                    <div key={index} className="relative">
                      <img
                        src={src}
                        alt={`Preview ${index}`}
                        className="w-24 h-24 object-cover rounded"
                      />
                      {/* Delete Button */}
                      <button
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        onClick={() => handleImageRemove(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ) : null
                )}
              </div>
            </div>

            {/* Property Details Form */}
            <div className="flex flex-col space-y-4 w-full">
              <input
                type="text"
                placeholder="Property Name"
                name="propertyName"
                value={formData.propertyName}
                onChange={updateChange}
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
              <textarea
                placeholder="Description"
                name="propertyDescription"
                value={formData.propertyDescription}
                onChange={updateChange}
                className="border border-border rounded px-4 py-2"
                rows="4"
              ></textarea>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-4 mt-8">
            <button
              className="px-8 py-2 border-2 border-primary text-primary rounded"
              onClick={updateBack}
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
      <div className="w-1/3">
        <PropertyMap onLocationSelect={handleLocationUpdate} />
      </div>

      <Toaster position="top-right" />
    </div>
  );
}

export default Updateproperty9;
