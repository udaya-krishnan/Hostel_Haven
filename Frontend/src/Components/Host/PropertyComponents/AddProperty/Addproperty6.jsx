import { useEffect, useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchamenities } from "../../../../features/Host/auth/authAction";

function Addproperty6({ handleBack, formData, handleAmenities }) {
  const dispatch = useDispatch();
  const [amenitiesList, setAmenities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(fetchamenities());
      setAmenities(data.allamenities); // Assume data.allamenities returns an array of amenities
    };
    fetchData();
  }, [dispatch]);

  const [selectedAmenities, setSelectedAmenities] = useState(
    formData.propertyAemnities || []
  );

  
  const toggleAmenity = (amenity) => {
    if (selectedAmenities.some((selected) => selected.name === amenity.name)) {
      // If the amenity is already selected, remove it
      setSelectedAmenities((prevState) =>
        prevState.filter((selected) => selected.name !== amenity.name)
      );
    } else {
      // If the amenity is not selected, add it
      setSelectedAmenities((prevState) => [...prevState, amenity]);
    }
  };

  const handleNext = () => {
    if (selectedAmenities.length > 0) {
      handleAmenities(selectedAmenities); 
    } else {
      alert("Please select at least one amenity.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Add amenities available at your place.
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {amenitiesList.map((amenity) => (
          <button
            key={amenity._id}
            className={`w-40 h-20 flex items-center justify-center rounded-lg ${
              selectedAmenities.some(
                (selected) => selected.name === amenity.name
              )
                ? "bg-gray-400 text-white"
                : "bg-gray-100 text-gray-600"
            } hover:bg-gray-200`}
            onClick={() => toggleAmenity(amenity)}
          >
            {amenity.name}
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <button
          className="px-8 py-2 border-2 border-btncolor text-btncolor rounded-lg"
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
    </div>
  );
}

export default Addproperty6;
