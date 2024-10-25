import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectHost } from "../../../features/Host/auth/authSelectors";
import { fetchProperty, available } from "../../../features/Host/auth/authAction";
import { useNavigate } from "react-router-dom";

// Enum for property verification status
const PropertyVerified = {
  Approved: "approved",
  Pending: "pending",
  Rejected: "rejected",
};

function CardProperty({ setFormData, updateNext }) {
  const hostData = useSelector(selectHost);
  const [properties, setProperty] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null); // State to track dropdown visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPro = async () => {
      const response = await dispatch(fetchProperty(hostData._id));
      console.log("res", response);
      setProperty(response.payload.property);
    };

    fetchPro();
  }, [dispatch, hostData._id]);

  function modify(id) {
    const selectedProperty = properties.find((property) => property._id === id);
    if (selectedProperty) {
      const data = {
        propertyName: selectedProperty.name,
        propertyLocation: selectedProperty.location,
        propertyLatitude: selectedProperty.latitude,
        propertyLongitude: selectedProperty.longitude,
        propertyDescription: selectedProperty.description,
        propertyLicense: selectedProperty.license_number,
        propertyCertificate: selectedProperty.certificate,
        propertyImages: selectedProperty.image,
        propertyPrice: selectedProperty.regularPrice,
        propertyOffer: selectedProperty.offerPrice,
        propertyType: selectedProperty.property_type,
        propertyAccommodation: selectedProperty.accommodation,
        propertyForWhom: selectedProperty.forwhom,
        propertyFacilities: selectedProperty.facilities,
        propertyAmenities: selectedProperty.amenities,
        propertySafety: selectedProperty.safety,
        propertyPolicies: selectedProperty.policies,
        propertyId: selectedProperty._id,
      };
      console.log(data);
      setFormData(data);
      updateNext();
    }
  }

  async function toggleAvailability(id, isAvailable) {
    const res = await dispatch(available({ id: id, hostId: hostData._id }));
    const updatedProperties = properties.map((property) =>
      property._id === id
        ? { ...property, available: !isAvailable }
        : property
    );
    setProperty(updatedProperties);
  }

  function toggleDropdown(propertyId) {
    setDropdownOpen((prev) => (prev === propertyId ? null : propertyId));
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-start p-4">
      {properties.map((property, index) => {
        let discountPercentage;

        if (property.offerPrice && property.offerPrice < property.regularPrice) {
          discountPercentage = Math.round(
            ((property.regularPrice - property.offerPrice) / property.regularPrice) * 100
          );
        }

        let verificationMessage = "";
        let verificationClass = "";

        switch (property.propertyVerified) {
          case PropertyVerified.Approved:
            verificationMessage = "Approved";
            verificationClass = "text-green-500";
            break;
          case PropertyVerified.Pending:
            verificationMessage = "Pending";
            verificationClass = "text-yellow-500";
            break;
          case PropertyVerified.Rejected:
            verificationMessage = "Rejected";
            verificationClass = "text-red-500";
            break;
          default:
            verificationMessage = "Unknown";
            verificationClass = "text-gray-500";
            break;
        }

        return (
          <div
            key={index}
            className="max-w-xs w-full p-4 rounded-lg shadow-md bg-white mb-6 flex flex-col relative"
          >
            {/* Property Image */}
            <img
              src={property.image[0]}
              alt={property.name}
              className="w-full h-48 object-cover rounded-md"
            />

            {/* Three dots icon for dropdown */}
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => toggleDropdown(property._id)}
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 10a2 2 0 114-0 2 2 0 01-4 0zm-6 0a2 2 0 114-0 2 2 0 01-4 0zm12 0a2 2 0 114-0 2 2 0 01-4 0z"></path>
              </svg>
            </div>

            {/* Dropdown menu */}
            {dropdownOpen === property._id && (
              <div className="absolute top-10 right-0 w-32 bg-white border rounded-md shadow-lg z-10">
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    navigate('/host/rate', { state: { proId: property._id } });
                    console.log("Review clicked for", property._id);
                    setDropdownOpen(null); // Close dropdown
                  }}
                >
                  Review
                </button>
              </div>
            )}

            {/* Property Details */}
            <div className="mt-3 flex flex-col flex-grow">
              <h2 className="text-lg font-bold text-gray-800">
                {property.name}
              </h2>
              <p className="text-sm text-gray-500">{property.location}</p>

              <p className={`mt-2 text-sm font-semibold ${verificationClass}`}>
                {verificationMessage}
              </p>

              <div className="flex items-center mt-1">
                <span className="text-lg font-bold text-gray-700 mr-2">
                  ₹{property.offerPrice || property.regularPrice}
                </span>
                {property.offerPrice && property.offerPrice < property.regularPrice && (
                  <span className="text-sm line-through text-gray-500">
                    ₹{property.regularPrice}
                  </span>
                )}
              </div>

              {property.offerPrice && property.offerPrice < property.regularPrice && (
                <p className="text-xs text-green-600">
                  Save {discountPercentage}% off!
                </p>
              )}

              {/* Buttons (Modify, Available/Unavailable) */}
              <div className="flex mt-4 space-x-3 justify-center">
                <button
                  className="px-4 py-2 bg-btncolor text-white text-sm rounded-lg hover:bg-btncolor"
                  onClick={() => modify(property._id)}
                >
                  Modify
                </button>

                {property.available ? (
                  <button
                    className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                    onClick={() => toggleAvailability(property._id, property.available)}
                  >
                    Unavailable
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
                    onClick={() => toggleAvailability(property._id, property.available)}
                  >
                    Available
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CardProperty;