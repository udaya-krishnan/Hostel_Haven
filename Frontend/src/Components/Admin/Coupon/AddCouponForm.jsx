import React from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { CouponSchema } from "../../../utils/validation";
import { addCoupon } from "../../../features/Admin/auth/authAction";

const AddCouponForm = ({ allCoupons, setCoupons }) => {
  const dispatch = useDispatch();
  
  const formik = useFormik({
    initialValues: {
      couponName: "",
      expDate: "",
      minAmount: "",
      maxAmount: "",
    },
    validationSchema: CouponSchema, 
    onSubmit: async (values, { resetForm }) => {
      const isUnique = !allCoupons.some(
        (item) => item.name.toLowerCase() === values.couponName.toLowerCase()
      );

      if (isUnique) {
        try {
          console.log(values);
         const res=await dispatch(addCoupon(values))
         console.log(res,'response');
         setCoupons(res.allcoupon)
          toast.success("Coupon added successfully!");
          resetForm();
        } catch (error) {
          toast.error("Failed to add coupon!");
        }
      } else {
        toast.error("This coupon already exists!");
      }
    },
  });

  return (
    <div className="bg-white p-6 rounded-xl w-10/12 shadow mt-4 ml-10 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-center mb-4">Add Coupon</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="mb-4 flex flex-col items-center"
      >
        <input
          type="text"
          name="couponName"
          placeholder="Enter coupon name"
          className="px-4 py-2 border rounded-lg w-72"
          value={formik.values.couponName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.couponName && formik.errors.couponName ? (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.couponName}
          </div>
        ) : null}

        <label className="mt-4 text-gray-700" htmlFor="expDate">
          Expiration Date
        </label>
        <input
          type="date"
          name="expDate"
          id="expDate"
          className="px-4 py-2 border rounded-lg w-72"
          value={formik.values.expDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          min={new Date().toISOString().split("T")[0]} // Set minimum to today's date
        />
        {formik.touched.expDate && formik.errors.expDate ? (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.expDate}
          </div>
        ) : null}

        <input
          type="number"
          name="minAmount"
          placeholder="Enter minimum amount"
          className="px-4 py-2 border rounded-lg w-72 mt-4"
          value={formik.values.minAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.minAmount && formik.errors.minAmount ? (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.minAmount}
          </div>
        ) : null}

        <input
          type="number"
          name="maxAmount"
          placeholder="Enter maximum amount"
          className="px-4 py-2 border rounded-lg w-72 mt-4"
          value={formik.values.maxAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.maxAmount && formik.errors.maxAmount ? (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.maxAmount}
          </div>
        ) : null}

        <button
          type="submit"
          className="bg-btncolor text-white text-base px-4 py-2 rounded-lg mt-4 w-full"
        >
          Add Coupon
        </button>
      </form>
    </div>
  );
};

export default AddCouponForm;
