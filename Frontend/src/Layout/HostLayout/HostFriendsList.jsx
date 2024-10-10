import React from 'react';

const HostFriendsList = () => {
  const friends = [
    { name: 'John Doberman', date: '12 Mar 2021' },
    { name: 'John Doberman', date: '12 Mar 2021' },
    { name: 'John Doberman', date: '12 Mar 2021' },
  ];

  return (
    <div className="w-1/4 bg-gray-100 p-4 h-full overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">All Messages</h2>
      <ul>
        {friends.map((friend, index) => (
          <li key={index} className="flex items-center space-x-4 p-2 hover:bg-gray-200 cursor-pointer">
            <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
            <div>
              <p className="font-medium">{friend.name}</p>
              <p className="text-sm text-gray-500">{friend.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HostFriendsList;