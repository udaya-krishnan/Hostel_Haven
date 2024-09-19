import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actionReservation, fetchreservation } from '../../features/Host/auth/authAction';
import { selectHost } from '../../features/Host/auth/authSelectors';

function ReservationList() {
    const [activeTab, setActiveTab] = useState("pending");
    const hostData=useSelector(selectHost)
    const [reservationCard,setReservation]=useState([])
    const dispatch=useDispatch()
  
    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };

    useEffect(()=>{
        const fetchres=async()=>{
            const res=await dispatch(fetchreservation(hostData._id))
            setReservation(res.reservation)
            console.log(res.reservation,"hai sjhdfh");
            
        }
        fetchres()
    },[])


  const action =async(action,id)=>{
    console.log(action,id);

   const res= await dispatch(actionReservation(action,id))

  }
  
    // Sample reservation data
    // const reservations = [
    //   {
    //     id: 1,
    //     image: "https://via.placeholder.com/100", // Replace with actual image URL
    //     title: "Fully Furnished Apartment",
    //     checkIn: "12 Mar 2021",
    //     duration: "Long (2 - 5 Years)",
    //     guests: "4 Adults",
    //     guestName: "John Doe",
    //     status: "upcoming",
    //   },
    //   {
    //     id: 2,
    //     image: "https://via.placeholder.com/100", // Replace with actual image URL
    //     title: "Double Flat with 3 Rooms",
    //     checkIn: "12 Mar 2021",
    //     duration: "Long (2 - 5 Years)",
    //     guests: "4 Adults",
    //     guestName: "Harry Potter",
    //     status: "upcoming",
    //   },
    // ];
  
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Reservations</h1>
  
        {/* Tabs */}
        <div className="flex space-x-6 border-b">
          <button
            className={`py-2 px-4 ${
              activeTab === "pending" ? "border-b-2 border-black font-semibold" : ""
            }`}
            onClick={() => handleTabChange("pending")}
          >
            Pending
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "success" ? "border-b-2 border-black font-semibold" : ""
            }`}
            onClick={() => handleTabChange("success")}
          >
            Past
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "rejected" ? "border-b-2 border-black font-semibold" : ""
            }`}
            onClick={() => handleTabChange("rejected")}
          >
            Rejected
          </button>
        </div>
  
        {/* Reservation List */}
        <div className="mt-6">
          {reservationCard
            .filter((reservation) => reservation.booking_status === activeTab)
            .map((reservation) => (
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
                    <h2 className="text-lg font-bold">{reservation.property_id.name}</h2>
                    <p className="text-sm text-gray-500">
                      {/* Check In: {reservation.checkIn} */}
                    </p>
                    <p className="text-sm text-gray-500">Duration: {reservation.month} Month</p>
                    <p className="text-sm text-gray-500">Guests: {reservation.guest_count}</p>
                    <p className="text-sm text-gray-500">By: {reservation.guest_info.firstName+" "+reservation.guest_info.lastName}</p>
                    <p className="text-sm text-gray-500">Mobile: {reservation.guest_info.mobile}</p>
                    <p className="text-sm text-gray-500">Email: {reservation.guest_info.email}</p>
                  </div>
                </div>
  
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-btncolor text-white rounded-lg"
                  onClick={()=>action('Approved',reservation._id)}>
                    Approve
                  </button>
                  <button className="px-4 py-2 border border-gray-400 text-gray-500 rounded-lg"
                  onClick={()=>action('Rejected',reservation._id)}>
                    Reject
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };
export default ReservationList
