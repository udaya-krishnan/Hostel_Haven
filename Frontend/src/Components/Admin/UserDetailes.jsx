import React, { useEffect, useState } from 'react';
import Sidebar from '../../Layout/AdminLayout/Sidebar';
import Header from '../../Layout/AdminLayout/Header';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userdatails } from '../../features/Admin/auth/authAction';

function UserDetailes() {
  const location = useLocation();  // Correctly use the useLocation hook
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('user_id');
  const dispatch = useDispatch();
  const [userData, setData] = useState({});
  const [place, setPlace] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId) {
        try {
          const data = await dispatch(userdatails(userId));
          setData(data.userData);
        } catch (error) {
          console.error('Failed to fetch user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, [userId, dispatch]); // Add dependencies to re-run effect only when userId or dispatch changes

  useEffect(() => {
    if (userData.latitude && userData.longitude) {
      const fetchPlace = async () => {
        try {
          const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${userData.latitude}&lon=${userData.longitude}`;
          const response = await fetch(url);
          const data = await response.json();
          setPlace(data.display_name);
        } catch (error) {
          console.error('Error fetching place:', error);
        }
      };

      fetchPlace();
    }
  }, [userData.latitude, userData.longitude]); // Add latitude and longitude as dependencies

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="p-6 mt-20">
          <div className="bg-white ml-64 p-4 rounded-xl w-94 shadow mt-4">
            <div className="flex items-center">
              <img
                src={
                  userData?.image?.startsWith("http")
                    ? userData.image
                    : `../../../public/profile/${userData?.image || "anony.webp"}`
                }
                alt="User Profile"
                className="w-24 h-24 rounded-full object-cover mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{userData.name}</h2>
                <p className="text-gray-600">{userData.email}</p>
                <p className="text-gray-600">{userData.location}</p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Address</h3>
              <p className="text-gray-600">{place}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">About</h3>
              <p className="text-gray-600">{userData.about}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailes;
