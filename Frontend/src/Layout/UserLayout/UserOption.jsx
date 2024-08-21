import React from 'react';

function UserOption() {
  return (
    <div className="flex items-center bg-[#E0CCBE] rounded-lg p-4 max-w-sm">
      <div className="flex-grow">
        <div className="h-2 bg-gray-700 mb-2 rounded"></div>
        <div className="h-2 bg-gray-700 mb-2 rounded"></div>
        <div className="h-2 bg-gray-700 rounded"></div>
      </div>
      <div className="flex-shrink-0 ml-4">
        <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}

export default UserOption;