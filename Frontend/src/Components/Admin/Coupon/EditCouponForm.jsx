import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications
import { editCoupon } from "../../../features/Admin/auth/authAction";

function EditCouponForm({ selectedCoupon, setCoupons, setSelectedCoupon }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(selectedCoupon ? selectedCoupon.name : "");
  const [min, setMinPrice] = useState(selectedCoupon ? selectedCoupon.min : "");
  const [max, setMaxPrice] = useState(selectedCoupon ? selectedCoupon.max : "");
  const [expdate, setExpirationDate] = useState(selectedCoupon ? selectedCoupon.expdate : "");

  useEffect(() => {
    if (selectedCoupon) {
      setName(selectedCoupon.name);
      setMinPrice(selectedCoupon.min);
      setMaxPrice(selectedCoupon.max);
      setExpirationDate(selectedCoupon.expdate);
    }
  }, [selectedCoupon]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedCoupon) {
      try {
        // Dispatch the update action if using Redux
        console.log(selectedCoupon._id,name,min,max,expdate);
        const id=selectedCoupon._id
        
        await dispatch(editCoupon(id,{name:name,min:min,max:max,expdate:expdate}))
        // await dispatch(updateCoupon({ id: selectedCoupon._id, name, minPrice, maxPrice, expirationDate }));
        setCoupons((prevCoupons) =>
          prevCoupons.map((coupon) =>
            coupon._id === selectedCoupon._id ? { ...coupon, name, min, max, expdate } : coupon
          )
        );
        setSelectedCoupon(null); // Close the form after updating
        toast.success("Coupon updated successfully!");
      } catch (error) {
        toast.error("Failed to update the coupon.");
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl w-10/12 shadow mt-4 ml-10 h-auto">
      <form onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-4">Edit Coupon</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Coupon Name"
            className="px-4 py-2 border rounded-lg w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            placeholder="Min Price"
            className="px-4 py-2 border rounded-lg w-full"
            value={min}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            placeholder="Max Price"
            className="px-4 py-2 border rounded-lg w-full"
            value={max}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="date"
            placeholder="Expiration Date"
            className="px-4 py-2 border rounded-lg w-full"
            value={expdate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setSelectedCoupon(null)} // Close the form
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

export default EditCouponForm;
