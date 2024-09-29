import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  bookingDetails,
  continuePayment,
} from "../../features/User/auth/authAction";
import formatDate from "../../utils/Date";

import { RetryPay } from "../../config/Razorpay/Razorpay";
import { toast, ToastContainer } from "react-toastify";

const BookingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [Details, setDetails] = useState();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      const res = await dispatch(bookingDetails(id));
      setDetails(res.payload.data);
      console.log(Details, "details");
    };
    fetch();
  }, [id, dispatch]);

  const handleRetryPayment = async () => {
    const response = await dispatch(continuePayment(Details.total_price));
    console.log(response);

    const { amount, currency, id } = response.order;

    const rzp1 = new window.Razorpay(
      RetryPay(
        amount,
        currency,
        id,
        Details?.payment_Id?._id,
        dispatch,
        navigate,
        toast,
        Details?.property_id?._id
      )
    );

    rzp1.open();
  };

  const handleCancelReservation = async () => {};

  const currentDate = new Date();
  const checkInDate = new Date(Details?.check_in_date);

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex justify-center items-center">
      <button
        className="absolute top-24 left-4 p-2 bg-btncolor text-white rounded-lg shadow-md flex items-center"
        onClick={() => {
          console.log("back");
          navigate("/reservationlist");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-4 h-4 mr-2"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
        Back to List
      </button>
      <div className="relative max-w-4xl w-full">
        {/* Back to Route Button with SVG Icon */}

        {/* Conditionally render Download Invoice Button */}
        {Details?.payment_Id?.payment_status === "success" &&
          Details?.booking_status === "Approved" && (
            <button className="absolute top-0 right-0 mt-4 mr-4 p-2 bg-btncolor text-white rounded-lg shadow-md">
              Download invoice
            </button>
          )}

        <div className="grid grid-cols-2 gap-4">
          {/* Hotel Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <img
                src={Details?.property_id?.image[0]}
                alt="Hotel"
                className="w-24 h-24 rounded-md"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">
                  {Details?.property_id?.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {Details?.property_id?.location}
                </p>
                <p className="text-sm text-gray-600">
                  1 Bedroom | 1 Bathroom | 1 Parking
                </p>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Your booking details</h3>
            <div className="mb-2">
              <p className="text-sm font-semibold">Check-in</p>
              <p className="text-sm">{formatDate(Details?.check_in_date)}</p>
            </div>
            <div className="mb-2">
              <p className="text-sm font-semibold">Check-out</p>
              <p className="text-sm">{formatDate(Details?.check_out_date)}</p>
            </div>
            <div className="text-sm">
              Total length of stay: {Details?.month} Month
            </div>
            <div className="text-sm mt-2">You Selected 1 Room for 1 adult</div>

            {/* Conditional Messages */}

            {Details?.payment_Id?.payment_status === "success" &&
              checkInDate >= currentDate && (
                <>
                  {Details?.booking_status === "Approved" ? (
                    <p className="mt-4 text-green-600 font-bold">
                      Payment was successful, your reservation is confirmed.
                    </p>
                  ) : (
                    <p className="mt-4 text-green-600 font-bold">
                      Payment was successful.
                    </p>
                  )}
                </>
              )}

            {Details?.payment_Id?.payment_status === "Failed" &&
              checkInDate >= currentDate && (
                <button
                  className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg cursor-pointer"
                  onClick={handleRetryPayment}
                >
                  Retry Payment
                </button>
              )}

            {Details?.payment_Id?.payment_status === "Failed" &&
              checkInDate < currentDate && (
                <p className="mt-4 text-red-600 font-bold">
                  Payment failed and check-in time has passed.
                </p>
              )}

            {Details?.payment_Id?.payment_status === "success" &&
              checkInDate < currentDate &&
              Details?.booking_status !== "Approved" && (
                <p className="mt-4 text-red-600 font-bold">
                  Your payment was successful, but the reservation was not
                  approved. You will be refunded.
                </p>
              )}

            {Details?.payment_Id?.payment_status === "success" &&
              checkInDate < currentDate &&
              Details?.booking_status === "Rejected" && (
                <p className="mt-4 text-red-600 font-bold">
                  Your payment was successful, but the reservation was rejected.
                  You will be refunded.
                </p>
              )}
          </div>

          {/* Price Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Price</h3>
            <div className="text-sm mb-2">
              ₹ {Details?.property_id?.offerPrice} For 1 Month
            </div>
            <div className="text-sm mb-2">
              ₹ {Details?.property_id?.offerPrice} x {Details?.month} Stay
            </div>
            <div className="text-lg font-semibold">
              Total: ₹ {Details?.total_price}
            </div>
          </div>

          {/* Hostel Amenities */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">
              Hostel Amenities & Safety
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Details?.property_id?.amenities.map((ameni, index) => (
                <p key={index}>{ameni}</p>
              ))}
              {Details?.property_id?.safety.map((safe, index) => (
                <p key={index}>{safe}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
