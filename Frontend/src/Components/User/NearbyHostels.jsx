import React from 'react';
import card1 from '../../../public/cards/card1.webp'
import card2 from '../../../public/cards/card2.webp'
import card3 from '../../../public/cards/card3.webp'
import card4 from '../../../public/cards/card4.webp'

const NearbyHostels = () => {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-[#3C3633] mb-8">Nearby Listed Hostels</h2>
      <div className="grid grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-lg">
          <img src={card1} alt="Hostel 1" className="w-full h-48 object-cover rounded-t-lg" />
          <div className="p-4">
            <h3 className="font-semibold text-[#3C3633]">Hostel Name 1</h3>
            <p className="text-[#747264]">Location details</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-lg">
          <img src={card2} alt="Hostel 2" className="w-full h-48 object-cover rounded-t-lg" />
          <div className="p-4">
            <h3 className="font-semibold text-[#3C3633]">Hostel Name 2</h3>
            <p className="text-[#747264]">Location details</p>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-lg">
          <img src={card3} alt="Hostel 3" className="w-full h-48 object-cover rounded-t-lg" />
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
