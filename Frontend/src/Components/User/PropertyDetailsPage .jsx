import React, { useEffect, useState } from "react";
import { FaRegHeart, FaBed, FaShower, FaBicycle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { popertyDetails } from "../../features/User/auth/authAction";

const PropertyDetailsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const propertyId = queryParams.get("propertyid");
  const [proData, setProData] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [thumbnailImages, setThumbnailImages] = useState([]);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(popertyDetails(propertyId));
        const data = response.data;
        console.log("Fetched Property Data:", data); // Debugging log
        setProData(data);
        if (data.image && data.image.length > 0) {
          setMainImage(data.image[0]); // Set the first image as the main image initially
          setThumbnailImages([data.image[0], ...data.image.slice(1)]); // Include the main image in the thumbnails
        }
      } catch (error) {
        console.error("Error fetching property details:", error); // Error log
      }
    };
    fetchData();
  }, [dispatch, propertyId]);

 
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("1 Month");
  const [durationInMonths, setDurationInMonths] = useState(1);

  
  const durations = [
    { label: "1 Month", value: 1 },
    { label: "2 Months", value: 2 },
    { label: "6 Months", value: 6 },
    { label: "12 Months", value: 12 }
  ];

  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  
  const handleSelect = (duration) => {
    setSelectedDuration(duration.label);
    setDurationInMonths(duration.value);
    setIsOpen(false); 
  };

  if (!proData) {
    return <div>Loading...</div>;
  }

  const facilities = proData.facilities[0] || {};

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

  const reserve=()=>{
    // alert("hai")
    alert(pricePerMonth)
    alert(durationInMonths)
    navigate('/reservation', { state: { proData, durationInMonths, selectedDuration, totalPrice, pricePerMonth } });

  }

  return (
    <div className="container mx-auto p-6">
      {/* Property Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="col-span-2">
          <img
            src={mainImage || "https://via.placeholder.com/600x400"}
            alt="Main property"
            className="rounded-lg w-11/12 h-96 object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {thumbnailImages.slice(1).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Property thumbnail ${index + 1}`}
              className="rounded-lg cursor-pointer w-96 h-44"
              onClick={() => handleThumbnailClick(image)} // Update main image and swap with clicked image
            />
          ))}
        </div>
      </div>

      {/* Property Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-semibold text-gray-800">
            {proData.name}
          </h1>
          <p className="text-gray-600">{proData.location}</p>

          {/* Property Icons and Details */}
          <div className="flex space-x-8 my-4">
            {facilities.rooms > 0 && (
              <div className="flex items-center space-x-2">
                <FaBed className="text-gray-600" />
                <span>{facilities.rooms} Bedrooms</span>
              </div>
            )}
            {facilities.bathrooms > 0 && (
              <div className="flex items-center space-x-2">
                <FaShower className="text-gray-600" />
                <span>{facilities.bathrooms} Bathrooms</span>
              </div>
            )}
            {facilities.parking > 0 && (
              <div className="flex items-center space-x-2">
                <FaBicycle className="text-gray-600" />
                <span>{facilities.parking} Covered Bikes</span>
              </div>
            )}
          </div>

          {/* Property Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Description</h2>
            <p className="text-gray-600 mt-2">{proData.description}</p>
          </div>

          {/* Offered Amenities */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Offered Amenities
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {proData.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Safety and Hygiene */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Safety and Hygiene
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {proData.safety.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="p-6 bg-white shadow-lg rounded-lg">
          {offerPrice ? (
            <>
              {/* Price and Discount Section */}
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">
                  ₹{totalPrice.toLocaleString()}
                </span>
                <FaRegHeart className="text-2xl text-gray-500 cursor-pointer" />
              </div>
              <p className="text-gray-600 line-through">
                ₹{(regularPrice * durationInMonths).toLocaleString()}
              </p>
              <p className="text-green-400 font-semibold">
                {discountPercentage}% Off
              </p>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">
                  ₹{totalPrice.toLocaleString()}
                </span>
                <FaRegHeart className="text-2xl text-gray-500 cursor-pointer" />
              </div>
              <p className="text-gray-600">No Offer Price Available</p>
            </>
          )}

          {/* Duration Button */}
          <div className="relative">
            {/* Button to toggle dropdown */}
            <button
              onClick={toggleDropdown}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md w-full text-center"
            >
              {selectedDuration}
            </button>

            {/* Dropdown menu (shows when isOpen is true) */}
            {isOpen && (
              <div className="absolute mt-2 bg-white shadow-lg rounded-md w-full z-10">
                {durations.map((duration, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(duration)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {duration.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Total Price Information */}
          <div className="mt-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full text-center"
            
            onClick={reserve}
            >
              Reserve Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
