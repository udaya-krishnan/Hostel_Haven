import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { connectHost, fetchHost } from '../../features/User/auth/authAction';
import { selectUser } from '../../features/User/auth/authSelectors';

function UserChat({ selectedHostId, message }) {
  const [newHost, setNewHost] = useState(null);
  const [selectedHost, setSelectedHost] = useState(selectedHostId|null);

  const location = useLocation();
  const userData = useSelector(selectUser);
  const hostId = location.state?.hostId;
  const dispatch = useDispatch();

  console.log(selectedHost,'selected host');
  
  
  // Set initial messages when a host is selected
  const [messages, setMessages] = useState(message || []);

  useEffect(() => {
    if (message) {
      setMessages(message);  // Update the messages when the host is selected
    }
  }, [message]);

  useEffect(() => {
    const fetch = async () => {
      if (hostId) {
        const res = await dispatch(fetchHost(hostId));
        setNewHost(res.payload.response);
      }
    };

    fetch();
  }, [hostId, dispatch]);

  const [newMessage, setNewMessage] = useState('');

  // Function to format the current time
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const time = getCurrentTime();
      const getTime = new Date();

      setMessages([...messages, { sender: 'me', text: newMessage, time }]);

      const data = {
        message: newMessage,
        time: getTime,
      };

      await dispatch(connectHost({ userId: userData._id, hostId: hostId, data }));
      setNewMessage('');
    }
  };

  return (
    <div className="flex-1 bg-gray-50 flex flex-col justify-between">
      {/* Chat Header */}
      {newHost && (
        <div className="p-4 bg-white shadow-md flex items-center space-x-4">
          <img
            src={newHost.image}
            alt={newHost.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">{newHost.name}</h2>
            <p className="text-sm text-gray-500">{newHost.email}</p>
          </div>
        </div>
      )}

      {selectedHost && (
        <div className="p-4 bg-white shadow-md flex items-center space-x-4">
          <img
            src={selectedHost.image}
            alt={selectedHost.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">{selectedHost.name}</h2>
            <p className="text-sm text-gray-500">{selectedHost.email}</p>
          </div>
        </div>
      )}

      {/* Message body */}
      {(!newHost && !selectedHost) && (
        <div className="flex flex-col items-center justify-center flex-1">
          <p className="text-lg font-medium text-gray-600">
            Please select a user or host to start chatting.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            You can choose a host from the list to view and send messages.
          </p>
        </div>
      )}

      {(newHost || selectedHost) && (
        <>
          <div className="p-4 flex-1 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender_id === userData._id ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div className={`max-w-xs p-3 rounded-lg text-white ${msg.sender_id === userData._id  ? 'bg-blue-500' : 'bg-gray-400'}`}>
                  <p>{msg.text}</p>
                  <p className="text-xs text-gray-200 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input for typing new message */}
          <div className="p-4 bg-white flex items-center space-x-2 border-t border-gray-200">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:outline-none"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default UserChat;
