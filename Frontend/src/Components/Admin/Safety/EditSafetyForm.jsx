// EditSafetyForm.js

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateSafety } from "../../../features/Admin/auth/authAction";
import { toast } from "sonner";

function EditSafetyForm({ selectedSafety, setSafetyMeasures }) {
  const dispatch = useDispatch();
  const [safetyName, setSafetyName] = useState(selectedSafety.name || "");

  useEffect(() => {
    setSafetyName(selectedSafety.name || "");
  }, [selectedSafety]);

  const handleUpdateSafety = async (e) => {
    e.preventDefault();
    if (!safetyName) {
      toast.error("Safety measure name is required");
      return;
    }
    try {
      await dispatch(updateSafety(selectedSafety._id, safetyName));

      // Correctly update the state with the new name
      setSafetyMeasures((prevMeasures) =>
        prevMeasures.map((measure) =>
          measure._id === selectedSafety._id ? { ...measure, name: safetyName } : measure
        )
      );
      setSafetyName("")
      toast.success("Safety measure updated successfully");
    } catch (error) {
      console.error("Failed to update safety measure", error);
      toast.error("Failed to update safety measure");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl  mt-4 shadow">
      <h2 className="text-xl font-bold mb-4">Edit Safety </h2>
      <form onSubmit={handleUpdateSafety}>
        <input
          type="text"
          placeholder="Enter safety measure name"
          className="px-4 py-2 border rounded-lg w-full mb-4"
          value={safetyName}
          onChange={(e) => setSafetyName(e.target.value)}
        />
        <button
          type="submit"
          className="bg-btncolor text-white text-base px-3 py-2 rounded-lg w-full"
        >
          Update Safety
        </button>
      </form>
    </div>
  );
}

export default EditSafetyForm;
