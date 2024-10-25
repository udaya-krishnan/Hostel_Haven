import React, { useState, useEffect } from "react";
import online from "../../../public/icons/online.png";
import { useDispatch, useSelector } from "react-redux";
import { AddGusetInfo, paymentFailed, Razorpay } from "../../features/PaymentAction";
import { RazorpayConfig } from "../../config/Razorpay/Razorpay";
import { selectUser } from "../../features/User/auth/authSelectors";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Reservation = ({
  proData,
  pricePerMonth,
  durationInMonths,
  checkInDate,
  checkOutDate,
}) => {
  const [formData, setFormData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });

  const [selectedDuration, setSelectedDuration] = useState(
    durationInMonths || 1
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const navigate = useNavigate();


  useEffect(() => {
    setTotalPrice(pricePerMonth);
  }, [pricePerMonth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if(userData){
      const res = await dispatch(AddGusetInfo(formData));
    console.log(res,"response");

    setFormData(res.data);
    setShowPaymentForm(true);
    setIsEditing(false);
    }else{
      toast.error("Please log in to continue", {
        hideProgressBar: true,
        className: "custom-toast-error",
        autoClose: 2000,
      });
    }
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDurationChange = (e) => {
    const newDuration = parseInt(e.target.value, 10);
    setSelectedDuration(newDuration);
    setIsDropdownOpen(false);
  };

  const handleEdit = () => {
    setShowPaymentForm(false);
    setIsEditing(true);
  };
  const handlePaymentSelection = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePayNow = async () => {
    if (selectedPaymentMethod === "Razorpay") {
      console.log(`Selected Payment Method: ${selectedPaymentMethod}`);
      console.log(userData, "userData");

      const response = await dispatch(
        Razorpay(
          totalPrice,
          formData._id,
          userData._id,
          proData._id,
          durationInMonths,
          checkInDate,
          checkOutDate
        )
      );
      console.log(response, "asdjksj");

      const { amount, currency, id } = response.order;

      const rzp1 = new window.Razorpay(
        RazorpayConfig(
          amount,
          currency,
          id,
          response.id,
          userData._id,
          selectedPaymentMethod,
          dispatch,
          totalPrice,
          navigate,
          toast
        )
      );

      rzp1.on("payment.failed",async(resp)=>{
        console.log(response.id,"reseponse id");
        rzp1.close();
        
       const res=await dispatch(paymentFailed(amount,response.id,userData._id))
       if(res){

        
        toast.error('Reservation Failed', {
          hideProgressBar: true,
          className: 'custom-toast-success',
          autoClose: 2000
        })
        setTimeout(()=>{
          navigate('/hostelroom')
        },2000)
       }
      })
      rzp1.open();
    } else {
      console.log("No payment method selected");
      alert("Please select a payment method before proceeding.");
    }
  };

  const PaymentForm = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Your details</h2>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">{`${formData.firstName} ${formData.lastName}`}</p>
          <p className="text-sm text-gray-600">{formData.email}</p>
          <p className="text-sm text-gray-600">{formData.mobile}</p>
        </div>
        <button onClick={handleEdit} className="text-blue-600 hover:text-blue-800">
          ✏️ Edit
        </button>
      </div>
      <h3 className="text-lg font-semibold mb-2">Choose payment method to pay</h3>
      <div className="mb-4 bg-gray-100 p-2 rounded flex items-center">
        <span className="text-green-600 mr-2">✔️</span>
        <span className="text-sm">100% safe and secure payments</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <button
          className={`py-2 rounded focus:outline-none ${
            selectedPaymentMethod === "Razorpay" ? "bg-btncolor text-white" : "bg-gray-200"
          }`}
          onClick={() => handlePaymentSelection("Razorpay")}
        >
          Razorpay
        </button>
        <button
          className={`py-2 rounded focus:outline-none ${
            selectedPaymentMethod === "PayPal" ? "bg-btncolor text-white" : "bg-gray-200"
          }`}
          onClick={() => handlePaymentSelection("PayPal")}
        >
          PayPal
        </button>
      </div>
      <button
        className="w-full bg-btncolor text-white py-2 rounded hover:bg-btncolor"
        onClick={handlePayNow}
      >
        Pay Now &gt;
      </button>
      <div className="mt-4 text-center">
        <img src={online} alt="Payment methods" className="inline-block w-48" />
        <p className="text-xs text-gray-600 mt-1">By Pay.com and secured</p>
      </div>
    </div>
  );

  const BookingDetails = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">Your booking details</h3>
      <div className="text-sm mb-4">
        {proData.image && (
          <img
            src={proData.image[0]}
            alt={proData.name}
            className="w-full h-auto object-cover mb-4 rounded-lg"
          />
        )}
        <p>{proData.name}</p>
        <p>{proData.location}</p>
        <p>
          {proData.facilities.bedroom} Bedrooms | {proData.facilities.bathroom} Bathrooms | {proData.facilities.parking} Parking
        </p>
        <div className="mt-4">
          <h4 className="font-bold">Booking Dates</h4>
          <p>Check-in: {new Date(checkInDate).toLocaleDateString()}</p>
          <p>Check-out: {new Date(checkOutDate).toLocaleDateString()}</p>
        </div>
        <div className="mt-4">
          <h4 className="font-bold">Total length of stay</h4>
          <p>{selectedDuration} {selectedDuration > 1 ? "Months" : "Month"}</p>
          {isDropdownOpen && (
            <select
              value={selectedDuration}
              onChange={handleDurationChange}
              className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm"
            >
              <option value={1}>1 Month</option>
              <option value={2}>2 Months</option>
              <option value={3}>3 Months</option>
              <option value={6}>6 Months</option>
              <option value={12}>12 Months</option>
            </select>
          )}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-bold">Your Price Summary</h3>
        <div className="text-sm mt-2">
          <p>Price per month: ₹{pricePerMonth}</p>
          <p className="font-bold">Total: ₹{totalPrice}</p>
        </div>
      </div>
    </div>
  );


  return (
    <div className="container mx-auto p-6">
      {!showPaymentForm || isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Enter Your Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Mobile number *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
          <BookingDetails />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PaymentForm />
          <BookingDetails />
          <ToastContainer position="top-right" />
        </div>
      )}
    </div>
  );
};

export default Reservation;
