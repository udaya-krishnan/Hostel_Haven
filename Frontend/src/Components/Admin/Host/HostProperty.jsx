import React, { useEffect, useState } from 'react';
import Sidebar from '../../../Layout/AdminLayout/Sidebar';
import Header from '../../../Layout/AdminLayout/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchHostProperty } from '../../../features/Admin/auth/authAction';


function HostProperty() {
  // Dummy data for the host properties
  const dispatch=useDispatch()
  const [properties,setProperty]=useState([])
  const navigate=useNavigate()
  const loaction=useLocation()
  const queryParams=new URLSearchParams(loaction.search)
  const host_id=queryParams.get('host_id')

  useEffect(()=>{
    const fetchProperty=async()=>{
      console.log(host_id);
      
        const response=await dispatch(fetchHostProperty(host_id))
        console.log(response,"responsive");
        
        setProperty(response.property)
    }
    fetchProperty()
  },[])
//   const properties = [
//     {
//       id: 1,
//       name: 'Cozy Apartment',
//       image: 'https://via.placeholder.com/150',
//       description: 'A cozy apartment in the heart of the city.',
//       location: 'New York, USA',
//     },
//     {
//       id: 2,
//       name: 'Luxury Villa',
//       image: 'https://via.placeholder.com/150',
//       description: 'A luxurious villa with ocean views.',
//       location: 'Los Angeles, USA',
//     },
//     {
//       id: 3,
//       name: 'Mountain Cabin',
//       image: 'https://via.placeholder.com/150',
//       description: 'A peaceful cabin in the mountains.',
//       location: 'Aspen, USA',
//     },
//   ];



  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="p-6 mt-20">
          <div className="bg-white ml-64 p-4 rounded-xl w-94 shadow mt-4">
            <h2 className="text-2xl font-bold mb-4">Host Properties</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {properties.map((property) => (
                <div key={property._id} className="border rounded-lg shadow-md p-3">
                  <img
                    src={property.image[0]}
                    alt={property.name}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                  <h3 className="text-lg font-semibold">{property.name}</h3>
                  <p className="text-gray-600 text-sm">{property.description}</p>
                  <p className="text-gray-500 text-xs mt-1">{property.location}</p>
                  <button className="mt-2 bg-btncolor text-white py-1 px-3 rounded text-sm"
                  onClick={()=> navigate(`/admin/propertydetails?propertyid=${property._id}`)}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostProperty;
