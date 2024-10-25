import React, { useEffect, useState } from 'react';
import Sidebar from '../../../Layout/AdminLayout/Sidebar';
import Header from '../../../Layout/AdminLayout/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchHostProperty } from '../../../features/Admin/auth/authAction';

function HostProperty() {
  const dispatch = useDispatch();
  const [properties, setProperties] = useState([]);
  const [sortedProperties, setSortedProperties] = useState([]);
  const [sortStatus, setSortStatus] = useState(''); // New state for sorting
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const host_id = queryParams.get('host_id');

  useEffect(() => {
    const fetchProperty = async () => {
      console.log(host_id);

      const response = await dispatch(fetchHostProperty(host_id));
      console.log(response, 'response');
      
      setProperties(response.property);
      setSortedProperties(response.property); // Initialize sorted properties
    };
    fetchProperty();
  }, [dispatch, host_id]);

  // Function to handle sorting by verification status
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortStatus(value);

    // Sort properties based on the selected status
    const sorted = [...properties].sort((a, b) => {
      if (value === 'approved') {
        return a.propertyVerified === 'approved' ? -1 : 1;
      } else if (value === 'rejected') {
        return a.propertyVerified === 'rejected' ? -1 : 1;
      } else if (value === 'pending') {
        return a.propertyVerified === 'pending' ? -1 : 1;
      }
      return 0; // Default order
    });

    setSortedProperties(sorted);
  };

  // Back button function
  const handleBack = () => {
    navigate(-1); // Change this to the appropriate route
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="p-6 mt-20">
          <div className="bg-white ml-64 p-4 rounded-xl w-94 shadow mt-4">
            <h2 className="text-2xl font-bold mb-4">Host Properties</h2>
            
            {/* Back Button */}
            <button
              className="mb-4 bg-gray-600 text-white py-2 px-4 rounded-md"
              onClick={handleBack}
            >
              Back
            </button>

            {/* Sort Dropdown */}
            <div className="mb-4">
              <label htmlFor="sort" className="block mb-2 text-gray-700">Sort by Status:</label>
              <select
                id="sort"
                value={sortStatus}
                onChange={handleSortChange}
                className="p-2 border rounded-md"
              >
                <option value="">All</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Property List */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sortedProperties.length > 0 ? (
                sortedProperties.map((property) => (
                  <div key={property._id} className="border rounded-lg shadow-md p-3">
                    <img
                      src={property.image[0]}
                      alt={property.name}
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <h3 className="text-lg font-semibold">{property.name}</h3>
                    <p className="text-gray-600 text-sm">{property.description}</p>
                    <p className="text-gray-500 text-xs mt-1">{property.location}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      Status: {property.propertyVerified}
                    </p>
                    <button
                      className="mt-2 bg-btncolor text-white py-1 px-3 rounded text-sm"
                      onClick={() =>
                        navigate(`/admin/propertydetails?propertyid=${property._id}`)
                      }
                    >
                      View Details
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No properties available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostProperty;
