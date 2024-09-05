import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectHost } from "../../../features/Host/auth/authSelectors";
import { fetchproperty } from "../../../features/Host/auth/authAction";

// Enum for property verification status
 const PropertyVerified ={
    Approved :'approved',
    Pending : 'pending',
    Rejected : 'rejected'
}

function CardProperty() {

    const hostData = useSelector(selectHost);
    const [properties, setProperty] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPro = async () => {
            const response = await dispatch(fetchproperty(hostData._id));
            console.log('res', response);      
            setProperty(response.property);
        }

        fetchPro();
    }, [dispatch, hostData._id]);

    return (
        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4 justify-start p-4 ml-10 ">
            {properties.map((property, index) => {
                let discountPercentage;

             
                console.log(property);
                

                // Only calculate discount if `offerPrice` is available and less than the original price
                if (property.offerPrice && property.offerPrice < property.regularPrice) {
                    console.log('offer pice');
                    
                    discountPercentage = Math.round(
                        ((property.regularPrice - property.offerPrice) / property.regularPrice) * 100
                    );
                }else{
                    console.log('no offer price');
                }

                // Determine the verification message based on propertyVerified status
                let verificationMessage = '';
                let verificationClass = '';

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
                            <h2 className="text-lg font-bold text-gray-800">{property.name}</h2>
                            <p className="text-sm text-gray-500">{property.location}</p>

                            {/* Verification Message */}
                            <p
                                className={`mt-2 text-sm font-semibold ${verificationClass}`}
                            >
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

                            {/* Buttons (Modify, View Policies) aligned using flex */}
                            <div className="flex mt-4 space-x-3 justify-center">
                                <button className="px-4 py-2 bg-btncolor text-white text-sm rounded-lg hover:bg-btncolor">
                                    Modify
                                </button>
                                <button className="px-4 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600">
                                    Avalible
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default CardProperty;
