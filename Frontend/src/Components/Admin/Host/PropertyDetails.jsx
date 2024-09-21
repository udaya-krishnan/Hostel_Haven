import React, { useEffect, useState } from 'react';
import Sidebar from '../../../Layout/AdminLayout/Sidebar';
import Header from '../../../Layout/AdminLayout/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { property, approveProperty, rejectProperty } from '../../../features/Admin/auth/authAction';
import { Toaster, toast } from 'sonner'; // Import Sonner components

function PropertyDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const [proData, setProData] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const propertyId = queryParams.get('propertyid');

  useEffect(() => {
    const pro = async () => {
      const response = await dispatch(property(propertyId));
      setProData(response.property);
    };
    pro();
  }, [dispatch, propertyId]);

  // Function to handle property approval
  const handleApprove = async () => {
    try {
      const response = await dispatch(approveProperty(propertyId));
      setProData(response.property); // Update the property data after approval

      // Show success toast notification
      toast.success('Property approved successfully!');
    } catch (error) {
      toast.error('Error approving property'); // Show error toast notification
      console.error('Error approving property:', error);
    }
  };

  // Function to handle property rejection
  const handleReject = async () => {
    try {
      const response = await dispatch(rejectProperty(propertyId));
      setProData(response.property); // Update the property data after rejection

      // Show success toast notification
      toast.success('Property rejected successfully!');
    } catch (error) {
      toast.error('Error rejecting property'); // Show error toast notification
      console.error('Error rejecting property:', error);
    }
  };

  // Function to go back to the previous page
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (!proData) {
    return <div>Loading...</div>; // Show a loading state while data is being fetched
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <Toaster position="top-right" richColors /> {/* Add the Toaster component */}
        <div className="p-6 mt-20">
          <div className="bg-white ml-64 p-6 rounded-xl w-94 shadow mt-4">
            <h2 className="text-2xl font-bold mb-6">Property Details</h2>

            {/* Property Images */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              {proData.image && proData.image.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Property Image ${index + 1}`}
                  className="w-full h-40 object-cover rounded-md"
                />
              ))}
            </div>

            {/* Certificate and License Number */}
            <div className="flex items-center mb-6">
              <img
                src={proData.certificate}
                alt="Certificate"
                className="w-24 h-24 object-cover rounded-md mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">License Number</h3>
                <p className="text-gray-600">{proData.license_number}</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Amenities</h3>
              <ul className="list-disc list-inside text-gray-600">
                {proData.amenities && proData.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>

            {/* Safety Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Safety Features</h3>
              <ul className="list-disc list-inside text-gray-600">
                {proData.safety && proData.safety.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Location */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Location</h3>
              <p className="text-gray-600">{proData.location}</p>
            </div>

            {/* Status and Buttons */}
            <div className="mt-6">
              {proData.propertyVerified === 'approved' && (
                <div className="text-green-600 font-semibold">
                  This property has been approved.
                </div>
              )}
              {proData.propertyVerified === 'rejected' && (
                <div className="text-red-600 font-semibold">
                  This property has been rejected.
                </div>
              )}

              {/* Conditionally render buttons if property is neither approved nor rejected */}
              {proData.propertyVerified === 'pending' && (
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={handleApprove}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={handleReject}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>

            {/* Back Button */}
            <div className="mt-6">
              <button
                onClick={handleBack}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
