import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchHostel, fetchNearme, fetchRoom } from '../../features/User/auth/authAction';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const NearbyHostels = () => {
  const [hostels, setHostels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const geocodingClient = mbxGeocoding({ accessToken: 'pk.eyJ1IjoidWRheWFuMDA3IiwiYSI6ImNtMG1qZXcxZjAyb2wyanFzbjdsaGI3Z3IifQ.iYebehsGEgCmc6JYXuXxUQ' });

  useEffect(() => {
    const fetchHostels = async () => {
      setLoading(true);
      const response = await dispatch(fetchHostel({ search: "" }));
      setHostels(response?.payload?.hostels || []);
      setTimeout(() => setLoading(false), 2000);
    };
    fetchHostels();
  }, [dispatch]);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      const response = await dispatch(fetchRoom({ search: "" }));
      setRooms(response?.payload?.rooms || []);
      setTimeout(() => setLoading(false), 2000);
    };
    fetchRooms();
  }, [dispatch]);

  const fetchNearbyHostels = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await geocodingClient.reverseGeocode({
          query: [longitude, latitude],
          limit: 5,
          types: ['place']
        }).send();

        const nearbyHostels = await dispatch(fetchNearme({ lat: latitude, lng: longitude }));
        setHostels(nearbyHostels?.payload?.hostels || []);
      } catch (error) {
        console.error('Error fetching nearby hostels:', error);
      }
    });
  };

  return (
    <div className="container mx-auto py-12 px-4 relative">
      <button
        className="absolute top-10 right-4 md:right-0 bg-[#E0CCBE] bg-opacity-80 hover:bg-opacity-100 text-[#3C3633] hover:text-white font-bold py-2 px-4 rounded flex items-center gap-2 transition-all"
        onClick={fetchNearbyHostels}
      >
        Near Me
      </button>

      {/* Hostels Section */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#3C3633] mb-8">Hostels</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          Array(4).fill().map((_, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg">
              <Skeleton height={192} className="rounded-t-lg" />
              <div className="p-4">
                <Skeleton width={100} height={20} />
                <Skeleton width={50} height={20} className="mt-2" />
                <Skeleton width={150} height={20} className="mt-4" />
              </div>
            </div>
          ))
        ) : (
          hostels.length > 0 ? (
            hostels.map((hostel) => {
              const { image, regularPrice, offerPrice, location, _id } = hostel;
              const discountPercentage = offerPrice ? Math.round(((regularPrice - offerPrice) / regularPrice) * 100) : null;

              return (
                <div key={_id} className="bg-white shadow-lg rounded-lg cursor-pointer"
                  onClick={() => navigate(`/propertydetails?propertyid=${_id}`)}
                >
                  <img 
                    src={image[0]} 
                    alt="Hostel" 
                    className="w-full h-48 object-cover rounded-t-lg" 
                  />
                  <div className="p-4">
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
                    <p className="text-[#747264]">{location}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No hostels available.</p>
          )
        )}
      </div>

      {/* Rooms Section */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#3C3633] mb-8 mt-8">Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          Array(4).fill().map((_, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg">
              <Skeleton height={192} className="rounded-t-lg" />
              <div className="p-4">
                <Skeleton width={100} height={20} />
                <Skeleton width={50} height={20} className="mt-2" />
                <Skeleton width={150} height={20} className="mt-4" />
              </div>
            </div>
          ))
        ) : (
          rooms.length > 0 ? (
            rooms.map((room) => {
              const { image, regularPrice, offerPrice, location, _id } = room;
              const discountPercentage = offerPrice ? Math.round(((regularPrice - offerPrice) / regularPrice) * 100) : null;

              return (
                <div key={_id} className="bg-white shadow-lg rounded-lg cursor-pointer"
                  onClick={() => navigate(`/propertydetails?propertyid=${_id}`)}
                >
                  <img 
                    src={image[0]} 
                    alt="Room" 
                    className="w-full h-48 object-cover rounded-t-lg" 
                  />
                  <div className="p-4">
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
                    <p className="text-[#747264]">{location}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No rooms available.</p>
          )
        )}
      </div>
    </div>
  );
};

export default NearbyHostels;
