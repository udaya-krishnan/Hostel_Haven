import React, { useEffect, useState } from "react";
import Sidebar from "../../../Layout/AdminLayout/Sidebar";
import Header from "../../../Layout/AdminLayout/Header";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Toaster } from "sonner";
import AddCouponForm from "./AddCouponForm";
import EditCouponForm from "./EditCouponForm";
import { actionCoupon, fetchCoupons } from "../../../features/Admin/auth/authAction";

function CouponList() {
  const dispatch = useDispatch();
  const [allCoupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const couponsPerPage = 6;

  useEffect(() => {
    const fetchAllData = async () => {
      const data = await dispatch(fetchCoupons());
      console.log(data.allcoupons);
      
      setCoupons(data.allcoupons);
    };
    fetchAllData();
  }, [dispatch]);

  const action = async (id) => {
    try {
      toast(
        ({ closeToast }) => (
          <div>
            <p>Are you sure you want to change the coupon's status?</p>
            <button
              className="bg-btncolor text-white px-3 py-1 rounded mr-2"
              onClick={async () => {
                closeToast();
                try {
                  const couponId = await dispatch(actionCoupon(id));
                  setCoupons((prevCoupons) =>
                    prevCoupons.map((coupon) =>
                      coupon._id === id
                        ? { ...coupon, is_blocked: !coupon.is_blocked }
                        : coupon
                    )
                  );
                } catch (error) {
                  console.error("Failed to update coupon status", error);
                  toast.error("Failed to update coupon status.");
                }
              }}
            >
              Confirm
            </button>
            <button
              className="bg-gray-300 text-black px-3 py-1 rounded"
              onClick={closeToast}
            >
              Cancel
            </button>
          </div>
        ),
        { autoClose: false }
      );
    } catch (error) {
      console.error("Failed to update coupon status", error);
    }
  };

  const handleEditClick = (coupon) => {
    setSelectedCoupon(coupon);
  };

  const filteredCoupons = allCoupons.filter((coupon) =>
    coupon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCoupon = currentPage * couponsPerPage;
  const indexOfFirstCoupon = indexOfLastCoupon - couponsPerPage;
  const currentCoupons = filteredCoupons.slice(
    indexOfFirstCoupon,
    indexOfLastCoupon
  );

  const totalPages = Math.ceil(filteredCoupons.length / couponsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex">
      <Toaster />
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="p-6 mt-20 flex">
          <div className="bg-white ml-64 p-4 rounded-xl w-6/12 shadow mt-4">
            {/* Search bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by name "
                className="px-4 py-2 border rounded-lg w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Table */}
            <table className="w-full  table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-2 py-2 text-left">Code</th>
                  <th className="px-2 py-2 text-left">Coupons</th>
                  <th className="px-2 py-2 text-left">Exp Date</th>
                  <th className="px-2 py-2 text-left">Min</th>
                  <th className="px-2 py-2 text-left">Max</th>
                  <th className="px-2 py-2 text-left">Status</th>
                  <th className="px-2 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentCoupons.map((coupon, index) => (
                  <tr
                    key={coupon._id ? `coupon-${coupon._id}` : `index-${index}`}
                    className="border-t hover:bg-gray-100"
                  >
                    <td className="px-1 py-1 text-left text-sm">
                      {coupon.code}
                    </td>
                    <td className="px-2 py-2 text-left">{coupon.name}</td>
                    <td className="px-2 py-2 text-left">{coupon.expdate}</td>
                    <td className="px-2 py-2 text-left">{coupon.min}</td>
                    <td className="px-2 py-2 text-left">{coupon.max}</td>
                    <td
                      className={`px-4 py-2 text-left ${
                        coupon.is_blocked ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {coupon.is_blocked ? "Not Active" : "Active"}
                    </td>
                    <td className="px-4 py-2 text-left">
                      <div className="flex items-center gap-2">
                        {coupon.is_blocked ? (
                          <button
                            className=" text-white text-base  rounded-lg  flex justify-center items-center"
                            onClick={() => action(coupon._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                              className="w-5 h-5"
                            >
                              <path
                                fill="#ff0000"
                                d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"
                              />
                            </svg>
                          </button>
                        ) : (
                          <button
                            className=" text-white text-base  rounded-lg flex justify-center items-center"
                            onClick={() => action(coupon._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                              className="w-5 h-5"
                            >
                              <path
                                fill="#00ff7b"
                                d="M144 144c0-44.2 35.8-80 80-80c31.9 0 59.4 18.6 72.3 45.7c7.6 16 26.7 22.8 42.6 15.2s22.8-26.7 15.2-42.6C331 33.7 281.5 0 224 0C144.5 0 80 64.5 80 144l0 48-16 0c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-240 0 0-48z"
                              />
                            </svg>
                          </button>
                        )}

                        {/* Edit Button */}
                        <button
                          className=" text-black text-base rounded-lg flex justify-center items-center"
                          onClick={() => handleEditClick(coupon)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="w-5 h-5"
                          >
                            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`${
                    currentPage === index + 1
                      ? "bg-btncolor text-white"
                      : "bg-gray-200 text-black"
                  } mx-1 px-3 py-1 rounded`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <div>
            {selectedCoupon ? (
              <EditCouponForm
                selectedCoupon={selectedCoupon}
                setCoupons={setCoupons}
                setSelectedCoupon={setSelectedCoupon} // Passing update function
              />
            ) : (
              <AddCouponForm setCoupons={setCoupons} allCoupons={allCoupons} />
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CouponList;
