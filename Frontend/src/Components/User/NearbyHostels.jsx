import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchHostel } from '../../features/User/auth/authAction';

const NearbyHostels = () => {
  const [hostels, setHostels] = useState([]);  // Initialize hostels as an empty array
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHostels = async () => {
      const response = await dispatch(fetchHostel());
      setHostels(response.hostels || []);  // Ensure hostels is an array, even if response.hostels is undefined
    };
    fetchHostels();
  }, [dispatch]);

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-[#3C3633] mb-8">Hostels</h2>
      <div className="grid grid-cols-4 gap-6">
        {hostels.length > 0 ? (
          hostels.map((hostel) => {
            const { image, regularPrice, offerPrice, location, _id } = hostel;

            // Calculate the discount percentage if both offerPrice and regularPrice are available
            const discountPercentage = offerPrice ? Math.round(((regularPrice - offerPrice) / regularPrice) * 100) : null;

            return (
              <div key={_id} className="bg-white shadow-lg rounded-lg">
                {/* Hostel Image */}
                <img 
                  src={image[0]} 
                  alt="Hostel" 
                  className="w-full h-48 object-cover rounded-t-lg" 
                />
                
                <div className="p-4">
                  {/* Prices */}
                  {offerPrice ? (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#3C3633] line-through">${regularPrice}</span>
                      <span className="font-semibold text-red-500">${offerPrice}</span>
                      {discountPercentage && (
                        <span className="text-green-600">{discountPercentage}% off</span>
                      )}
                    </div>
                  ) : (
                    <h3 className="font-semibold text-[#3C3633]">${regularPrice}</h3>
                  )}
                  
                  {/* Location */}
                  <p className="text-[#747264]">{location}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No hostels available.</p>  // Fallback if no hostels are available
        )}
      </div>
    </div>
  );
};

export default NearbyHostels;
