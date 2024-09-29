import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"; // Import react-toastify
import Swal from "sweetalert2"; // Import SweetAlert2
import "react-toastify/dist/ReactToastify.css"; // Import the toastify styles
import {
  actionReservation,
  fetchreservation,
} from "../../features/Host/auth/authAction";
import { selectHost } from "../../features/Host/auth/authSelectors";

function ReservationList() {
  const [activeTab, setActiveTab] = useState("pending");
  const hostData = useSelector(selectHost);
  const [reservationCard, setReservation] = useState([]);
  const dispatch = useDispatch();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchres = async () => {
      const res = await dispatch(fetchreservation(hostData._id));
      setReservation(res.reservation);
      console.log(res.reservation, "Reservations fetched");
    };
    fetchres();
  }, [dispatch, hostData._id]);

  const action = async (actionType, id) => {
    // Use Swal.fire for confirmation dialog
    const confirmation = await Swal.fire({
      title: `Are you sure you want to ${actionType.toLowerCase()} this reservation?`,
      showCancelButton: true,
      confirmButtonColor: "#3C3633",
      cancelButtonColor: "#E0CCBE",
      
      confirmButtonText: `Yes, ${actionType.toLowerCase()} it!`,
      customClass: {
        popup: 'swal-popup-custom',
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button',
        title: 'swal-title-custom', 
      },
    });
    
    

    if (confirmation.isConfirmed) {
      const res = await dispatch(actionReservation(actionType, id));

      if (res.message === "reservation action changed") {
        toast.success(`Reservation has been ${actionType.toLowerCase()}!`, {
          position: "top-right",
        });

        // Update the reservation status in local state
        setReservation((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation._id === id
              ? { ...reservation, booking_status: actionType }
              : reservation
          )
        );
      } else {
        toast.error(`Failed to ${actionType.toLowerCase()} the reservation.`, {
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className="p-8">
      {/* Fixed Heading */}
      <div className="fixed top-16 left-0 right-0 bg-white z-40 p-4 shadow-md">
        <h1 className="text-3xl font-bold mb-6">Reservations</h1>

        {/* Tabs */}
        <div className="flex space-x-6 border-b">
          <button
            className={`py-2 px-4 ${
              activeTab === "pending"
                ? "border-b-2 border-black font-semibold"
                : ""
            }`}
            onClick={() => handleTabChange("pending")}
          >
            Pending
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "Approved"
                ? "border-b-2 border-black font-semibold"
                : ""
            }`}
            onClick={() => handleTabChange("Approved")}
          >
            Approved
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "Rejected"
                ? "border-b-2 border-black font-semibold"
                : ""
            }`}
            onClick={() => handleTabChange("Rejected")}
          >
            Rejected
          </button>
        </div>
      </div>

      {/* Reservation List */}
      <div className="mt-44">
        {reservationCard
          .filter((reservation) => reservation.booking_status === activeTab)
          .sort((a, b) => {
            const paymentStatusA =
              a.payment_Id?.payment_status === "success" ? 1 : 0;
            const paymentStatusB =
              b.payment_Id?.payment_status === "success" ? 1 : 0;
            return paymentStatusB - paymentStatusA; // Sort in descending order
          })
          .map((reservation) => (
            <div
              key={reservation._id}
              className="flex items-center justify-between p-4 bg-white shadow rounded-lg mb-4"
            >
              <div className="flex items-center">
                <img
                  src={reservation.property_id?.image?.[0]}
                  alt={reservation.title}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div>
                  <h2 className="text-lg font-bold">
                    {reservation.property_id?.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Check-in Date:{" "}
                    {new Date(reservation.check_in_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Check-out Date:{" "}
                    {new Date(reservation.check_out_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Duration: {reservation.month} Month
                  </p>
                  <p className="text-sm text-gray-500">
                    Guests: {reservation.guest_count}
                  </p>
                  <p className="text-sm text-gray-500">
                    By:{" "}
                    {reservation.guest_info?.firstName +
                      " " +
                      reservation.guest_info?.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    Mobile: {reservation.guest_info?.mobile}
                  </p>
                  <p className="text-sm text-gray-500">
                    Email: {reservation.guest_info?.email}
                  </p>

                  {reservation.payment_Id?.payment_status === "success" ? (
                    <div className="text-sm text-gray-500">
                      Payment Status:{" "}
                      <span className="text-green-500">Completed</span>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">
                      Payment Status:{" "}
                      <span className="text-red-500">Failure</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-3">
                {reservation.payment_Id?.payment_status === "success" &&
                reservation.booking_status === "pending" ? (
                  <>
                    <button
                      className="px-4 py-2 bg-btncolor text-white rounded-lg"
                      onClick={() => action("Approved", reservation._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="px-4 py-2 border border-gray-400 text-gray-500 rounded-lg"
                      onClick={() => action("Rejected", reservation._id)}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span
                    className={`px-4 py-2 text-white rounded-lg ${
                      reservation.booking_status === "Approved"
                        ? "bg-btncolor"
                        : "bg-red-500"
                    }`}
                  >
                    {reservation.booking_status}
                  </span>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ReservationList;
