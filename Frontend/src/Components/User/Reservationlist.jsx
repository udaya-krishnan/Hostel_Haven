import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fethreservation } from "../../features/User/auth/authAction";
import { selectUser } from "../../features/User/auth/authSelectors";
import { useNavigate } from "react-router-dom";

function Reservationlist() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const dispatch = useDispatch();
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  const userData = useSelector(selectUser);

  useEffect(() => {
    const fetch = async () => {
      if (userData) {
        const res = await dispatch(fethreservation(userData._id));
        setReservations(res.payload.reservation);
      }
    };
    fetch();
  }, [userData, dispatch]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const currentDate = new Date();

  // Filter and sort reservations based on active tab
  const filteredReservations = reservations
    .filter((reservation) => {
      if (activeTab === "upcoming") {
        return (
          reservation?.payment_Id?.payment_status === "success" &&
          new Date(reservation.check_out_date) > currentDate
        );
      } else if (activeTab === "past") {
        return (
          reservation?.payment_Id?.payment_status === "success" &&
          new Date(reservation.check_out_date) <= currentDate
        );
      } else {
        return reservation?.payment_Id?.payment_status === "Failed";
      }
    })
    .sort((a, b) => {
      if (activeTab === "failed") {
        return new Date(b.createdAt) - new Date(a.createdAt); // Sort by createdAt, descending order
      }
      return 0; // No sorting for other tabs
    });

  return (
    <div className="p-8">
      <h1 className="text-3xl text-btncolor font-bold mb-6">Reservations</h1>

      {/* Tabs */}
      <div className="flex space-x-6 border-b">
        <button
          className={`py-2 px-4 ${
            activeTab === "upcoming"
              ? "border-b-2 border-black font-semibold"
              : ""
          }`}
          onClick={() => handleTabChange("upcoming")}
        >
          Payment Success (Upcoming)
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "past" ? "border-b-2 border-black font-semibold" : ""
          }`}
          onClick={() => handleTabChange("past")}
        >
          Payment Success (Past)
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "failed" ? "border-b-2 border-black font-semibold" : ""
          }`}
          onClick={() => handleTabChange("failed")}
        >
          Payment Failed
        </button>
      </div>

      {/* Reservations List */}
      <div className="mt-6">
        {filteredReservations.map((reservation) => (
          <div
            key={reservation._id}
            className="flex items-center justify-between p-4 bg-white shadow rounded-lg mb-4"
          >
            <div className="flex items-center">
              <img
                src={reservation.property_id.image[0]}
                alt={reservation.title}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div>
                <h2 className="text-lg font-bold text-btncolor">
                  {reservation.property_id.name}
                </h2>

                <p className="text-sm text-gray-500">
                  Check In:{" "}
                  {new Date(reservation.check_in_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  Check Out:{" "}
                  {new Date(reservation.check_out_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  Duration: {reservation.month} Month
                </p>
                <p className="text-sm font-bold">₹ {reservation.total_price}</p>

                {/* Payment Status with Conditional Color */}
                <p
                  className={`text-sm font-bold ${
                    reservation.payment_Id.payment_status === "Failed"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  Payment: {reservation.payment_Id.payment_status}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                className="px-4 py-2 bg-btncolor text-white rounded-lg cursor-pointer"
                onClick={() =>
                  navigate(`/reservationdetails?id=${reservation._id}`)
                }
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reservationlist;
