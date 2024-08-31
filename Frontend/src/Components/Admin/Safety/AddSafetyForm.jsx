// AddSafetyForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSafety } from "../../../features/Admin/auth/authAction";
import { toast } from "sonner";

function AddSafetyForm({ setSafetyMeasures }) {
  const dispatch = useDispatch();
  const [safetyName, setSafetyName] = useState("");

  const handleAddSafety = async (e) => {
    e.preventDefault();
    if (!safetyName) {
      toast.error("Safety measure name is required");
      return;
    }
    try {
      const newSafety = await dispatch(addSafety(safetyName));
      setSafetyMeasures(newSafety.allData);
      setSafetyName("");
      toast.success("Safety measure added successfully");
    } catch (error) {
      console.error("Failed to add safety measure", error);
      toast.error("Failed to add safety measure");
    }
  };

  return (
    <div className="bg-white p-4 mt-4 h-60 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Add Safety </h2>
      <form onSubmit={handleAddSafety}>
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
          Add Safety
        </button>
      </form>
    </div>
  );
}

export default AddSafetyForm;
