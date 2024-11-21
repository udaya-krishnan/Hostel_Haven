import React, { useEffect, useState } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaBed,
  FaShower,
  FaBicycle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  connectHost,
  fetchwish,
  popertyDetails,
  wishlist,
} from "../../features/User/auth/authAction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { selectUser } from "../../features/User/auth/authSelectors";
import { Toaster, toast } from "sonner";
import ReviewList from "./ReviewList";

const PropertyDetailsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const propertyId = queryParams.get("propertyid");
  const [proData, setProData] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [thumbnailImages, setThumbnailImages] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [wishlists, setWishlist] = useState(false);
  const userData = useSelector(selectUser);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [durationInMonths, setDurationInMonths] = useState(0); // State for duration

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(popertyDetails(propertyId));
        const data = response.payload.data;
        setProData(data);
        if (data.image && data.image.length > 0) {
          setMainImage(data.image[0]);
          setThumbnailImages([data.image[0], ...data.image.slice(1)]);
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };
    fetchData();
  }, [dispatch, propertyId]);

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      try {
        if (userData && proData) {
          const res = await dispatch(fetchwish(proData._id, userData._id));
          setWishlist(res.message);
        }
      } catch (error) {
        console.error("Error fetching wishlist status", error);
      }
    };
    fetchWishlistStatus();
  }, [userData, proData]);

  const onwish = async (id) => {
    if (userData) {
      try {
        const res = await dispatch(wishlist(id, userData._id));
        if (res?.message !== "remove") {
          setWishlist(true);
        } else {
          setWishlist(false);
        }
      } catch (error) {
        console.error("Error updating wishlist", error);
      }
    } else {
      toast.error("Please log in to continue", {
        hideProgressBar: true,
        className: "custom-toast-error",
        autoClose: 2000,
      });
    }
  };

  const handleContactHost = async () => {
    if (userData) {
      navigate("/chat", { state: { hostId: proData.host_id } });
      // const response=await dispatch(connectHost({userId:userData._id,proId:proData._id}))
      // console.log(response);

      // if(response){
      //   navigate('/chat')
      // }
    } else {
      toast.error("Please log in to continue", {
        hideProgressBar: true,
        className: "custom-toast-error",
        autoClose: 2000,
      });
    }
  };

  const handleDateChange = (update) => {
    const [start, end] = update;
    if (start && !end) {
      setDateRange([start, null]);
    } else if (start && end) {
      setDateRange([start, end]);

      // Calculate duration in months
      const months =
        end.getMonth() -
        start.getMonth() +
        12 * (end.getFullYear() - start.getFullYear());
      setDurationInMonths(months);
    } else {
      setDateRange([null, null]);
      setDurationInMonths(0); // Reset duration when dates are cleared
    }
  };

  const filterEndDate = (date) => {
    if (!startDate) return true;
    const day = startDate.getDate();
    return date.getDate() === day && date > startDate;
  };

  const handleConfirmDates = () => {
    if (userData) {
      if (startDate && endDate) {
        navigate("/reservation", {
          state: {
            proData,
            pricePerMonth: totalPrice,
            durationInMonths: durationInMonths,
            checkInDate: startDate,
            checkOutDate: endDate,
          },
        });
      } else {
      }
    } else {
      toast.error("Please log in to continue", {
        hideProgressBar: true,
        className: "custom-toast-error",
        autoClose: 2000,
      });
    }
  };

  const CustomInput = ({ value, onClick }) => (
    <div
      className="flex justify-between items-center border border-gray-300 rounded-md p-2 cursor-pointer w-full" // Ensure it takes full width
      onClick={onClick}
    >
      <span className="flex-1 text-center">{value || "Select dates"}</span>
      <span>▼</span>
    </div>
  );

  if (!proData) {
    return <div>Loading...</div>;
  }

  const facilities = proData.facilities;

  const regularPrice = parseFloat(proData.regularPrice.replace(/₹|,/g, ""));
  const offerPrice = proData.offerPrice
    ? parseFloat(proData.offerPrice.replace(/₹|,/g, ""))
    : null;

  const discountPercentage = offerPrice
    ? Math.round(((regularPrice - offerPrice) / regularPrice) * 100)
    : 0;

  const pricePerMonth = offerPrice || regularPrice;
  const totalPrice = pricePerMonth * durationInMonths;

  const handleThumbnailClick = (clickedImage) => {
    setThumbnailImages(
      thumbnailImages.map((img) => (img === mainImage ? clickedImage : img))
    );
    setMainImage(clickedImage);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-6">
      <Toaster />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="col-span-2">
          <img
            src={mainImage || "https://via.placeholder.com/600x400"}
            alt="Main property"
            className="rounded-lg w-full h-64 md:h-96 object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          {thumbnailImages.slice(1).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Property thumbnail ${index + 1}`}
              className="rounded-lg cursor-pointer w-full h-32 sm:h-44 object-cover"
              onClick={() => handleThumbnailClick(image)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            {proData.name}
          </h1>
          <p className="text-gray-600">{proData.location}</p>

          <div className="flex flex-wrap space-x-4 my-4">
            {facilities.bedroom > 0 && (
              <div className="flex items-center space-x-2">
                <FaBed className="text-gray-600" />
                <span>{facilities.bedroom} Bedrooms</span>
              </div>
            )}
            {facilities.bathroom > 0 && (
              <div className="flex items-center space-x-2">
                <FaShower className="text-gray-600" />
                <span>{facilities.bathroom} Bathrooms</span>
              </div>
            )}
            {facilities.parking > 0 && (
              <div className="flex items-center space-x-2">
                <FaBicycle className="text-gray-600" />
                <span>{facilities.parking} Covered Bikes</span>
              </div>
            )}
          </div>

          {/* Pricing and Date Selection Section (visible on mobile) */}
          <div className="block lg:hidden border border-gray-300 rounded-lg p-4 sm:p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {offerPrice ? (
                <>
                  ₹{offerPrice.toLocaleString()}{" "}
                  <span className="text-sm text-gray-600 line-through">
                    ₹{regularPrice.toLocaleString()}
                  </span>{" "}
                  <span className="text-sm text-red-600">
                    {discountPercentage}% off
                  </span>
                </>
              ) : (
                `₹${regularPrice.toLocaleString()}`
              )}
              <span className="text-sm text-gray-600"> per month</span>
            </h2>

            <div className="mt-4 flex justify-center w-full">
              {" "}
              {/* Ensure the outer div takes full width */}
              <div className="w-full max-w-xs">
                <h2 className="text-md font-semibold text-gray-800 text-center">
                  {facilities.bedroom <= 0
                    ? "No rooms available"
                    : `${facilities.bedroom}  Rooms available`}
                </h2>
                {/* Limit the width for smaller screens like iPhone SE */}
                <h2 className="text-md font-semibold text-gray-800 text-center">
                  Select Check-in and Check-out Dates
                </h2>
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  filterDate={filterEndDate}
                  customInput={<CustomInput />}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>

            {durationInMonths > 0 && (
              <div className="mt-4">
                <h2 className="text-md font-semibold text-gray-800">
                  Duration: {durationInMonths} months
                </h2>
                <h3 className="text-md text-gray-800 mt-2">
                  Total Price: ₹{totalPrice.toLocaleString()}
                </h3>
              </div>
            )}

            {startDate && endDate && facilities.bedroom > 0 && (
              <button
                className="w-full mt-4 bg-btncolor text-white py-2 rounded-lg hover:bg-btncolor-dark transition duration-200"
                onClick={handleConfirmDates}
              >
                Reserve Now
              </button>
            )}

            {/* Add to Wishlist Button */}
            <button
              className="w-full mt-2 border border-btncolor text-btncolor py-2 rounded-lg"
              onClick={() => onwish(proData._id)}
            >
              {wishlists ? (
                <>
                  <FaHeart className="inline-block mr-2" /> Remove from Wishlist
                </>
              ) : (
                <>
                  <FaRegHeart className="inline-block mr-2" /> Add to Wishlist
                </>
              )}
            </button>

            {/* Contact Host Button */}
            <button
              className="w-full mt-4 bg-white text-gray-800 py-2 px-4 rounded-lg border border-gray-400 shadow flex items-center justify-center hover:bg-gray-100 transition duration-200"
              onClick={handleContactHost}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5 mr-2"
              >
                <path
                  fill="#3c3633"
                  d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"
                />
              </svg>
              Contact Host
            </button>
          </div>

          {/* Description Section */}
          <div className="hidden lg:block mt-6">
            <h2 className="text-lg font-semibold text-gray-800">Description</h2>
            <p className="text-gray-600 mt-2">{proData.description}</p>
          </div>

          {/* Amenities Section */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Offered Amenities
            </h2>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-2">
              {proData.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Safety and Hygiene
            </h2>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-2">
              {proData.safety.map((safety, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span>{safety}</span>
                </div>
              ))}
            </div>
          </div>
          <ReviewList proId={proData._id} />
        </div>

        <div className="lg:col-span-1 lg:sticky lg:top-24 relative">
          {/* Pricing and Date Selection Section (visible on larger screens) */}
          <div className="hidden lg:block border border-gray-300 rounded-lg p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {offerPrice ? (
                <>
                  ₹{offerPrice.toLocaleString()}{" "}
                  <span className="text-sm text-gray-600 line-through">
                    ₹{regularPrice.toLocaleString()}
                  </span>{" "}
                  <span className="text-sm text-red-600">
                    {discountPercentage}% off
                  </span>
                </>
              ) : (
                `₹${regularPrice.toLocaleString()}`
              )}
              <span className="text-sm text-gray-600"> per month</span>
            </h2>

            <div className="mt-4">
              <h2 className="text-md font-semibold text-gray-800 text-center">
                {facilities.bedroom <= 0
                  ? "No rooms available"
                  : `${facilities.bedroom}  Rooms available`}
              </h2>

              <h2 className="text-md font-semibold text-gray-800">
                Select Check-in and Check-out Dates
              </h2>
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={handleDateChange}
                minDate={new Date()}
                filterDate={filterEndDate}
                customInput={<CustomInput />}
                dateFormat="dd/MM/yyyy"
              />
            </div>

            {durationInMonths > 0 && (
              <div className="mt-4">
                <h2 className="text-md font-semibold text-gray-800">
                  Duration: {durationInMonths} months
                </h2>
                <h3 className="text-md text-gray-800 mt-2">
                  Total Price: ₹{totalPrice.toLocaleString()}
                </h3>
              </div>
            )}

{startDate && endDate && facilities.bedroom > 0 && (
              <button
                className="w-full mt-4 bg-btncolor text-white py-2 rounded-lg hover:bg-btncolor-dark transition duration-200"
                onClick={handleConfirmDates}
              >
                Reserve Now
              </button>
            )}


            {/* Add to Wishlist Button */}
            <button
              className="w-full mt-2 border border-btncolor text-btncolor py-2 rounded-lg"
              onClick={() => onwish(proData._id)}
            >
              {wishlists ? (
                <>
                  <FaHeart className="inline-block mr-2" /> Remove from Wishlist
                </>
              ) : (
                <>
                  <FaRegHeart className="inline-block mr-2" /> Add to Wishlist
                </>
              )}
            </button>

            {/* Contact Host Button */}
            <button
              className="w-full mt-4 bg-white text-gray-800 py-2 px-4 rounded-lg border border-gray-400 shadow flex items-center justify-center hover:bg-gray-100 transition duration-200"
              onClick={handleContactHost}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5 mr-2"
              >
                <path
                  fill="#3c3633"
                  d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"
                />
              </svg>
              Contact Host
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
