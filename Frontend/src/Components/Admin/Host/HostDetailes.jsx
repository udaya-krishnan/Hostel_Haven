import React, { useEffect, useState } from 'react';
import Sidebar from '../../../Layout/AdminLayout/Sidebar';
import Header from '../../../Layout/AdminLayout/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hostdetails } from '../../../features/Admin/auth/authAction';

function HostDetailes() {
  const location = useLocation();  
  const queryParams = new URLSearchParams(location.search);
  const hostId = queryParams.get('host_id');
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const [hostData, setData] = useState({});
  const [place, setPlace] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (hostId) {
        try {
          const data = await dispatch(hostdetails(hostId));
          setData(data.hostData);
        } catch (error) {
          console.error('Failed to fetch user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, [hostId, dispatch]); 

  useEffect(() => {
    if (hostData.latitude && hostData.longitude) {
      const fetchPlace = async () => {
        try {
          const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${hostData.latitude}&lon=${hostData.longitude}`;
          const response = await fetch(url);
          const data = await response.json();
          setPlace(data.display_name);
        } catch (error) {
          console.error('Error fetching place:', error);
        }
      };

      fetchPlace();
    }
  }, [hostData.latitude, hostData.longitude]); 

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="p-6 mt-20">
          <div className="bg-white ml-64 p-4 rounded-xl w-94 shadow mt-4">
            <div className="flex items-center ">
              <img
                src={
                    hostData?.image?.startsWith("http")
                    ? hostData.image
                    : `../../../public/profile/${hostData?.image || "anony.webp"}`
                }
                alt="User Profile"
                className="w-24 h-24 rounded-full object-cover mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{hostData.name}</h2>
                <p className="text-gray-600">{hostData.email}</p>
                <p className="text-gray-600">{hostData.location}</p>
              </div>
              <button className='bg-btncolor text-white py-2 px-5 ml-auto'
              onClick={()=>navigate(`/admin/hostproperty?host_id=${hostData._id}`)}
              >Property</button> {/* ml-auto added */}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Address</h3>
              <p className="text-gray-600">{place}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">About</h3>
              <p className="text-gray-600">{hostData.about}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostDetailes;
