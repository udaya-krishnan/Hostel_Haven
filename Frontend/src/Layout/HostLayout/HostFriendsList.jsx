import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchConnection } from '../../features/User/auth/authAction';
// import { selectUser } from '../../features/User/auth/authSelectors';
import { selectHost } from '../../features/Host/auth/authSelectors';
import { fetchHostConnection } from '../../features/Host/auth/authAction';

const HostFriendsList = ({ onSelectFriend }) => {
  const dispatch = useDispatch();
  const hostData = useSelector(selectHost);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchConnections = async () => {
      const res = await dispatch(fetchHostConnection(hostData._id));
      console.log(res,"respomse");
      
      setConnections(res.payload.response); // Set the connection data
    };
    fetchConnections();
  }, [dispatch, hostData._id]);

  const getTime = (time) => {
    const date = new Date(time); // Parse timestamp
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <h2 className="text-lg font-bold mb-4">All Messages</h2>
      <ul>
        {connections.map((connect, index) => (
          <li 
            key={index} 
            className="flex items-center space-x-4 p-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => onSelectFriend(connect.user_id,connect.messages)} // Select the clicked friend
          >
            
            <div className="w-12 h-12 bg-gray-400 rounded-full">
              <img
                src={connect.user_id.image || 'https://via.placeholder.com/50'}
                alt={connect.user_id.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            {/* User/Host Details */}
            <div>
              <p className="font-medium">{connect.user_id.name}</p>
              {connect.messages.length > 0 ? (
                <p className="text-sm text-gray-500">
                  Last message: {getTime(connect.messages[connect.messages.length - 1].timestamp)}
                </p>
              ) : (
                <p className="text-sm text-gray-500">No messages yet</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HostFriendsList;
