import React from 'react';

const NearbyHostels = () => {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-[#3C3633] mb-8">Nearby Listed Hostels</h2>
      <div className="grid grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-lg">
          <img src="path-to-image1.jpg" alt="Hostel 1" className="w-full h-48 object-cover rounded-t-lg" />
          <div className="p-4">
            <h3 className="font-semibold text-[#3C3633]">Hostel Name 1</h3>
            <p className="text-[#747264]">Location details</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-lg">
          <img src="path-to-image2.jpg" alt="Hostel 2" className="w-full h-48 object-cover rounded-t-lg" />
          <div className="p-4">
            <h3 className="font-semibold text-[#3C3633]">Hostel Name 2</h3>
            <p className="text-[#747264]">Location details</p>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-lg">
          <img src="path-to-image3.jpg" alt="Hostel 3" className="w-full h-48 object-cover rounded-t-lg" />
          <div className="p-4">
            <h3 className="font-semibold text-[#3C3633]">Hostel Name 3</h3>
            <p className="text-[#747264]">Location details</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearbyHostels;
