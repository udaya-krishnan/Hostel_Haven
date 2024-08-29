// components/AddAmenityForm.jsx

import React from "react";
import { useFormik } from "formik";
import { amenities } from "../../utils/validation";
import { toast } from "sonner";

const AddAmenityForm = ({ allAmenities, setAmenities, addAmenities }) => {
  const formik = useFormik({
    initialValues: {
      amenity: "",
    },
    validationSchema: amenities,
    onSubmit: async (values, { resetForm }) => {
      const isUnique = !allAmenities.some(
        (item) => item.name.toLowerCase() === values.amenity.toLowerCase()
      );

      if (isUnique) {
        try {
          const data = await addAmenities(values.amenity);
          setAmenities(data.allData);
          toast.success("Amenity added successfully!");
          resetForm();
        } catch (error) {
          toast.error("Failed to add amenity!");
        }
      } else {
        toast.error("This amenity already exists!");
      }
    },
  });

  return (
    <div className="bg-white p-6 rounded-xl w-1/4 shadow mt-4 ml-10 h-60">
      <h2 className="text-xl font-semibold text-center mb-4">Add Amenities</h2>
      <form onSubmit={formik.handleSubmit} className="mb-4">
        <input
          type="text"
          name="amenity"
          placeholder="Enter amenity name"
          className="px-4 py-2 border rounded-lg w-full"
          value={formik.values.amenity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.amenity && formik.errors.amenity ? (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.amenity}
          </div>
        ) : null}
        <button
          type="submit"
          className="bg-btncolor text-white text-base px-4 py-2 rounded-lg mt-4 w-full"
        >
          Add Amenity
        </button>
      </form>
    </div>
  );
};

export default AddAmenityForm;
