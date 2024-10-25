import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { connectHost } from '../../features/User/auth/authAction';
import { selectUser } from '../../features/User/auth/authSelectors';
import { selectHost } from '../../features/Host/auth/authSelectors';
import { connectUser } from '../../features/Host/auth/authAction';
import {io} from 'socket.io-client'

const socket = io("http://localhost:3000");

function HostChat({ selectedUserData,setselectedUserData, message ,setMessage }) {
  // const [newHost, setNewHost] = useState(null);
  // const [selectedUser, setSelectedUser] = useState();
  
  // const location = useLocation();
  const hostData = useSelector(selectHost);
  // const userId = location.state?.userId;
  const dispatch = useDispatch();

  // Set initial messages when a host is selected
  const [messages, setMessages] = useState(message || []);
  // console.log(selectedUser,"selected host");
  

  // Update messages when the selected host changes

  const getTime = (time) => {
    const date = new Date(time); 
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    if (message) {
      setMessages(message);  
    }
  }, [message]);

  useEffect(() => {
    socket.on('message', (data) => {
      console.log(data, "soketed data");
      console.log(selectedUserData,"seeced userd");
      
      if (data.receiver === hostData._id&&data.sender===selectedUserData._id) {
        console.log("same host same user");
  
        // Create a new message object
        const newMessage = {
          message: data.data.message,
          recipient_id: data.receiver,
          sender_id: data.sender,
          sender_role: "user",
          timestamp: data.data.time
        };

        console.log(newMessage);
        
  
        // Push the new message into the existing messages array using setMessage
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        console.log(messages,"all messages");
        
      }else{
        console.log('not same');
        
      }
    });
  
    return () => {
      socket.off('message');
    };
  }, [hostData._id, setMessage,selectedUserData]);
  

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

      // Append the new message to the existing messages
      setMessages([...messages, { sender_id: hostData._id, message: newMessage, timestamp:getTime }]);

      const data = {
        message: newMessage,
        time: getTime,
      };

      await dispatch(connectUser({ hostId: hostData._id, userId: selectedUserData?._id, data }));
      setNewMessage('');
    }
  };

  return (
    <div className="flex-1 bg-gray-50 flex flex-col justify-between">
      {/* Chat Header */}
      

      {selectedUserData && (
        <div className="p-4 bg-white shadow-md flex items-center space-x-4">
          <img
            src={selectedUserData.image}
            alt={selectedUserData.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">{selectedUserData.name}</h2>
            <p className="text-sm text-gray-500">{selectedUserData.email}</p>
          </div>
        </div>
      )}

      {/* Message body */}
      {( !selectedUserData) && (
        <div className="flex flex-col items-center justify-center flex-1">
          <p className="text-lg font-medium text-gray-600">
            Please select a user or host to start chatting.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            You can choose a host from the list to view and send messages.
          </p>
        </div>
      )}

      {( selectedUserData) && (
        <>
          <div className="p-4 flex-1 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender_id === hostData._id ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div className={`max-w-xs p-3 rounded-lg text-white ${msg.sender_id === hostData._id  ? 'bg-blue-500' : 'bg-gray-400'}`}>
                  <p>{msg.message}</p>
                  <p className="text-xs text-gray-200 mt-1">{getTime(msg.timestamp)}</p>
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

export default HostChat;
