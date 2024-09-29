import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

function FilterSidebar({ show, onClose, onApplyFilters }) {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedSafetyFeatures, setSelectedSafetyFeatures] = useState([]);

  const handleAmenitiesChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleSafetyChange = (feature) => {
    if (selectedSafetyFeatures.includes(feature)) {
      setSelectedSafetyFeatures(selectedSafetyFeatures.filter((s) => s !== feature));
    } else {
      setSelectedSafetyFeatures([...selectedSafetyFeatures, feature]);
    }
  };

  const handleApplyFilters = () => {
    const filters = {
      priceRange,
      gender: selectedGender,
      amenities: selectedAmenities,
      safetyFeatures: selectedSafetyFeatures,
    };
    onApplyFilters(filters);
    onClose(); // Close the sidebar after applying filters
  };

  const handleResetFilters = () => {
    setPriceRange({ min: "", max: "" });
    setSelectedGender("");
    setSelectedAmenities([]);
    setSelectedSafetyFeatures([]);
    // No need to call onClose here
  };

  return (
    <div
      className={`fixed top-0 right-0 w-48 md:w-64 h-5/6 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        show ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button className="absolute top-4 right-4 text-gray-600" onClick={onClose}>
        <FaTimes />
      </button>

      <div className="p-3">
        <h2 className="text-base font-semibold text-[#3C3633] mb-3">
          Property Filter
        </h2>

        {/* Price Range */}
        <div className="mb-3">
          <label className="block text-sm text-gray-700">Price range</label>
          <div className="flex space-x-1">
            <input
              type="number"
              className="border border-gray-300 p-1 rounded-md w-1/2 text-sm"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            />
            <input
              type="number"
              className="border border-gray-300 p-1 rounded-md w-1/2 text-sm"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            />
          </div>
        </div>

        {/* Gender Filter */}
        <div className="mb-3">
          <h3 className="text-sm text-gray-700 mb-2">For Whom</h3>
          <div className="flex flex-wrap">
            {["Men", "Women", "Co-ed", "Adults", "Every One"].map((gender) => (
              <button
                key={gender}
                className={`${
                  selectedGender === gender ? "bg-[#3C3633] text-white" : "bg-gray-300"
                } px-3 py-1 text-sm rounded-md m-1`}
                onClick={() => setSelectedGender(gender)}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities Filter */}
        <div className="mb-3">
          <h3 className="text-sm text-gray-700">Amenities</h3>
          <div className="flex flex-wrap">
            {["WiFi", "AC", "TV", "Washer"].map((amenity) => (
              <button
                key={amenity}
                className={`${
                  selectedAmenities.includes(amenity) ? "bg-[#3C3633] text-white" : "bg-gray-300"
                } px-3 py-1 text-sm rounded-md m-1`}
                onClick={() => handleAmenitiesChange(amenity)}
              >
                {amenity}
              </button>
            ))}
          </div>
        </div>

        {/* Safety Features */}
        <div className="mb-3">
          <h3 className="text-sm text-gray-700">Safety Features</h3>
          <div className="flex flex-wrap">
            {["Sanitizers", "Fire Throwers", "Daily Cleaner", "No Smoking","No Alcohol"].map(
              (feature) => (
                <button
                  key={feature}
                  className={`${
                    selectedSafetyFeatures.includes(feature) ? "bg-[#3C3633] text-white" : "bg-gray-300"
                  } px-3 py-1 text-sm rounded-md m-1`}
                  onClick={() => handleSafetyChange(feature)}
                >
                  {feature}
                </button>
              )
            )}
          </div>
        </div>

        {/* Apply and Reset Filter Buttons */}
        <div className="flex justify-between">
          <button
            className="bg-[#3C3633] text-white px-3 py-1 text-sm rounded-md"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 text-sm rounded-md"
            onClick={handleResetFilters}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
