import React, { useState } from 'react';

function HostChat() {
  const [messages, setMessages] = useState([
    { sender: 'me', text: 'Hello there!', time: '12:01 PM' },
    { sender: 'other', text: 'Hey!', time: '12:02 PM' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'me', text: newMessage, time: 'Just now' }]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex-1 bg-gray-50 flex flex-col justify-between h-full">
      {/* Message body */}
      <div className="p-4 flex-1 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div className={`max-w-xs p-3 rounded-lg text-white ${msg.sender === 'me' ? 'bg-blue-500' : 'bg-gray-400'}`}>
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
    </div>
  );
}

export default HostChat;