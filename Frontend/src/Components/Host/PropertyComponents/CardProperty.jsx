import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectHost } from "../../../features/Host/auth/authSelectors";
import { fetchProperty, available } from "../../../features/Host/auth/authAction";

// Enum for property verification status
const PropertyVerified = {
  Approved: "approved",
  Pending: "pending",
  Rejected: "rejected",
};

function CardProperty({ setFormData, updateNext }) {
  const hostData = useSelector(selectHost);
  const [properties, setProperty] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPro = async () => {
      const response = await dispatch(fetchProperty(hostData._id));
      console.log("res", response);
      setProperty(response.payload.property);
    };

    fetchPro();
  }, [dispatch, hostData._id]);

  // Modify function to filter properties by ID and set form data
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
    const res = await dispatch(available({id:id, hostId:hostData._id}));
    // Update the local state with the new availability status
    const updatedProperties = properties.map((property) =>
      property._id === id
        ? { ...property, available: !isAvailable } // Toggle the availability status
        : property
    );
    setProperty(updatedProperties);
  }

  return (
    <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4 justify-start p-4 ml-10">
      {properties.map((property, index) => {
        let discountPercentage;

        // Calculate discount percentage if offer price is lower than regular price
        if (property.offerPrice && property.offerPrice < property.regularPrice) {
          discountPercentage = Math.round(
            ((property.regularPrice - property.offerPrice) / property.regularPrice) * 100
          );
        }

        // Determine the verification message and class based on propertyVerified status
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
            className="max-w-xs w-60 p-4 rounded-lg shadow-md bg-white mb-6 flex flex-col"
          >
            {/* Property Image */}
            <img
              src={property.image[0]}
              alt={property.name}
              className="w-full h-48 object-cover rounded-md"
            />

            {/* Property Details */}
            <div className="mt-3 flex flex-col flex-grow">
              <h2 className="text-lg font-bold text-gray-800">
                {property.name}
              </h2>
              <p className="text-sm text-gray-500">{property.location}</p>

              {/* Verification Message */}
              <p className={`mt-2 text-sm font-semibold ${verificationClass}`}>
                {verificationMessage}
              </p>

              <div className="flex items-center mt-1">
                {/* Show either the offer price or original price */}
                <span className="text-lg font-bold text-gray-700 mr-2">
                  ₹{property.offerPrice || property.regularPrice}
                </span>
                {/* Display original price if there's an offer */}
                {property.offerPrice && property.offerPrice < property.regularPrice && (
                  <span className="text-sm line-through text-gray-500">
                    ₹{property.regularPrice}
                  </span>
                )}
              </div>

              {/* Show discount only if there's an offer */}
              {property.offerPrice && property.offerPrice < property.regularPrice && (
                <p className="text-xs text-green-600">
                  Save {discountPercentage}% off!
                </p>
              )}

              {/* Buttons (Modify, Available/Unavailable) aligned using flex */}
              <div className="flex mt-4 space-x-3 justify-center">
                <button
                  className="px-4 py-2 bg-btncolor text-white text-sm rounded-lg hover:bg-btncolor"
                  onClick={() => modify(property._id)} // Call modify with the property ID
                >
                  Modify
                </button>

                {/* Conditional button rendering based on availability */}
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
