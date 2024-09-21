
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

function EditAmenityForm({ selectedAmenity, setAmenities, updateAmenities,setSelectedAmenity }) {
    const dispatch=useDispatch()
  const [name, setName] = useState(selectedAmenity ? selectedAmenity.name : "");

  useEffect(() => {
    if (selectedAmenity) {
      setName(selectedAmenity.name);
    }
  }, [selectedAmenity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedAmenity) {
      try {
        await dispatch(updateAmenities({ id:selectedAmenity._id, name:name }))
        setAmenities((prevAmenities) =>
          prevAmenities.map((amenity) =>
            amenity._id === selectedAmenity._id ? { ...amenity, name } : amenity
          )
        );
        setSelectedAmenity(null); 
        toast.success("Amenity updated successfully!");
      } catch (error) {
        toast.error("Failed to update the amenity.");
      }
    }
  };



  return (
    <div className="bg-white p-6 rounded-xl w-10/12 shadow mt-4 ml-10 h-60">
    <form onSubmit={handleSubmit} >
      <h2 className="text-lg font-bold mb-4">Edit Amenity</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Amenity Name"
          className="px-4 py-2 border rounded-lg w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setSelectedAmenity(null)} // Close the form
          className="bg-gray-300 text-black px-3 py-1 rounded mr-2"
        >
          Cancel
        </button>
        <button type="submit" className="bg-btncolor text-white px-3 py-1 rounded">
          Update
        </button>
      </div>
    </form>
    </div>
  );
}

export default EditAmenityForm;
