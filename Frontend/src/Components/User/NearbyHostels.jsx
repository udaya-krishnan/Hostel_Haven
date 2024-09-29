import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchHostel, fetchRoom } from '../../features/User/auth/authAction';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import the skeleton styles

const NearbyHostels = () => {
  const [hostels, setHostels] = useState([]);  // Initialize hostels as an empty array
  const [rooms, setRooms] = useState([]);  // Initialize rooms as an empty array
  const [loading, setLoading] = useState(true); // Track loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHostels = async () => {
      setLoading(true);
      const response = await dispatch(fetchHostel({ search: "" }));
      console.log(response, "response");
      
      setHostels(response?.payload?.hostels || []); 
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    fetchHostels();
  }, [dispatch]);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      const response = await dispatch(fetchRoom({ search: "" }));
      console.log(response, "response");
      
      setRooms(response?.payload?.rooms || []); 
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    fetchRooms();
  }, [dispatch]);

  return (
    <div className="container mx-auto py-12">
      {/* Hostels Section */}
      <h2 className="text-3xl font-bold text-[#3C3633] mb-8">Hostels</h2>
      <div className="grid grid-cols-4 gap-6">
        {loading ? (
          // Render skeletons while loading
          Array(4).fill().map((_, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg">
              {/* Skeleton for image */}
              <Skeleton height={192} className="rounded-t-lg" />
              
              <div className="p-4">
                {/* Skeleton for price */}
                <Skeleton width={100} height={20} />
                <Skeleton width={50} height={20} style={{ marginTop: '0.5rem' }} />
                
                {/* Skeleton for location */}
                <Skeleton width={150} height={20} style={{ marginTop: '1rem' }} />
              </div>
            </div>
          ))
        ) : (
          hostels.length > 0 ? (
            hostels.map((hostel) => {
              const { image, regularPrice, offerPrice, location, _id } = hostel;

              // Calculate the discount percentage if both offerPrice and regularPrice are available
              const discountPercentage = offerPrice ? Math.round(((regularPrice - offerPrice) / regularPrice) * 100) : null;

              return (
                <div key={_id} className="bg-white shadow-lg rounded-lg cursor-pointer"
                  onClick={() => navigate(`/propertydetails?propertyid=${_id}`)}
                >
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
          )
        )}
      </div>

      {/* Rooms Section */}
      <h2 className="text-3xl font-bold text-[#3C3633] mb-8 mt-8 ">Rooms</h2>
      <div className="grid grid-cols-4 gap-6">
        {loading ? (
          // Render skeletons while loading
          Array(4).fill().map((_, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg">
              {/* Skeleton for image */}
              <Skeleton height={192} className="rounded-t-lg" />
              
              <div className="p-4">
                {/* Skeleton for price */}
                <Skeleton width={100} height={20} />
                <Skeleton width={50} height={20} style={{ marginTop: '0.5rem' }} />
                
                {/* Skeleton for location */}
                <Skeleton width={150} height={20} style={{ marginTop: '1rem' }} />
              </div>
            </div>
          ))
        ) : (
          rooms.length > 0 ? (
            rooms.map((room) => {
              const { image, regularPrice, offerPrice, location, _id } = room;

              // Calculate the discount percentage if both offerPrice and regularPrice are available
              const discountPercentage = offerPrice ? Math.round(((regularPrice - offerPrice) / regularPrice) * 100) : null;

              return (
                <div key={_id} className="bg-white shadow-lg rounded-lg cursor-pointer"
                  onClick={() => navigate(`/propertydetails?propertyid=${_id}`)}
                >
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
          )
        )}
      </div>
    </div>
  );
};

export default NearbyHostels;
