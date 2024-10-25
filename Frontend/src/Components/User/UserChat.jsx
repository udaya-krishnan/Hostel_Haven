import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { connectHost, fetchHost } from '../../features/User/auth/authAction';
import { selectUser } from '../../features/User/auth/authSelectors';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000");

function UserChat({ selectedHostData, message, setMessage }) {
  const [newHost, setNewHost] = useState(null);
  const location = useLocation();
  const userData = useSelector(selectUser);
  const hostId = location.state?.hostId;
  const dispatch = useDispatch();

  // Set initial messages when a host is selected
  const [messages, setMessages] = useState(message || []); // Initialize with empty array

  useEffect(() => {
    if (selectedHostData) {
      setNewHost(null);
    }
  }, [selectedHostData]);

  useEffect(() => {
    if (message) {
      setMessages(Array.isArray(message) ? message : []); // Ensure it's an array
    }
  }, [message]);

  // Fetch host data for the selected host if available
  useEffect(() => {
    const fetch = async () => {
      if (hostId) {
        const res = await dispatch(fetchHost({ hostId, userId: userData._id }));
        setNewHost(res.payload.fetch);
        setMessage(res.payload.message || []); // Ensure it's an array
      }
    };

    fetch();
  }, [hostId, dispatch]);

  const [newMessage, setNewMessage] = useState('');

  const getTime = (time) => {
    const date = new Date(time); 
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    const handleSocketMessage = (data) => {
      if (
        data.receiver === userData._id &&
        (data.sender === selectedHostData?._id || data.sender === newHost?._id)
      ) {
        const newMessage = {
          message: data.data.message,
          recipient_id: data.receiver,
          sender_id: data.sender,
          sender_role: "user",
          timestamp: data.data.time,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    socket.on('message', handleSocketMessage);

    return () => {
      socket.off('message', handleSocketMessage);
    };
  }, [userData._id, selectedHostData, newHost]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const time = new Date();

      setMessages([...messages, { sender_id: userData._id, message: newMessage, timestamp: time }]);

      const data = { message: newMessage, time };

      await dispatch(connectHost({ userId: userData._id, hostId: selectedHostData?._id || newHost._id, data }));
      setNewMessage('');
    }
  };

  return (
    <div className="flex-1 bg-gray-50 flex flex-col justify-between">
      {/* Chat Header */}
      {newHost && (
        <div className="p-4 bg-white shadow-md flex items-center space-x-4">
          <img src={newHost.image} alt={newHost.name} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h2 className="text-lg font-semibold">{newHost.name}</h2>
            <p className="text-sm text-gray-500">{newHost.email}</p>
          </div>
        </div>
      )}

      {selectedHostData && (
        <div className="p-4 bg-white shadow-md flex items-center space-x-4">
          <img src={selectedHostData.image} alt={selectedHostData.name} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h2 className="text-lg font-semibold">{selectedHostData.name}</h2>
            <p className="text-sm text-gray-500">{selectedHostData.email}</p>
          </div>
        </div>
      )}

      {/* Message body */}
      {(!newHost && !selectedHostData) ? (
        <div className="flex flex-col items-center justify-center flex-1">
          <p className="text-lg font-medium text-gray-600">Please select a user or host to start chatting.</p>
          <p className="text-sm text-gray-500 mt-2">You can choose a host from the list to view and send messages.</p>
        </div>
      ) : (
        <>
          <div className="p-4 flex-1 overflow-y-auto">
            {Array.isArray(messages) && messages.length > 0 ? (
              messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender_id === userData._id ? 'justify-end' : 'justify-start'} mb-4`}>
                  <div className={`max-w-xs p-3 rounded-lg text-white ${msg.sender_id === userData._id ? 'bg-blue-500' : 'bg-gray-400'}`}>
                    <p>{msg.message}</p>
                    <p className="text-xs text-gray-200 mt-1">{getTime(msg.timestamp)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No messages yet.</p>
            )}
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
            <button onClick={handleSendMessage} className="p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default UserChat;
