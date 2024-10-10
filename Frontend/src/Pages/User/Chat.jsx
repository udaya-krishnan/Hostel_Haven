import React, { useState } from 'react';
import Header from '../../Layout/UserLayout/Header';
import FriendsList from '../../Layout/UserLayout/FriendsList';
import UserChat from '../../Components/User/UserChat';

function Chat() {
  const [selectedHostId, setSelectedHostId] = useState(null);
  const [messages,setMessages]=useState(null)

  // Function to handle friend selection
  const handleSelectFriend = (hostId,messages) => {
    setSelectedHostId(hostId); // Update selected friend
    setMessages(messages)
  };

  return (
    <>
      <Header />
      <div className="flex" style={{ height: 'calc(100vh - 80px)' }}>
        {/* Adjusting Friends List width */}
        <FriendsList className="w-1/4 bg-gray-100" onSelectFriend={handleSelectFriend} />

        {/* User Chat taking the remaining space */}
        <UserChat className="flex-1 bg-gray-50" selectedHostId={selectedHostId} message={messages}/>
      </div>
    </>
  );
}

export default Chat;
