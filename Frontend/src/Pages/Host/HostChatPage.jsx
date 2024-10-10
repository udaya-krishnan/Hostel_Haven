import React from 'react';
import Header from '../../Layout/HostLayout/Header';
import HostFriendsList from '../../Layout/HostLayout/HostFriendsList';
import HostChat from '../../Components/Host/HostChat';

function HostChatPage() {
  return (
    <>
  <Header />
  <div className="flex" style={{ height: 'calc(100vh - 0px)', paddingTop: '75px' }}>
    {/* Friends List with full height */}
    <HostFriendsList className="w-1/4 bg-gray-100 h-full" />

    {/* Chat section with full height */}
    <HostChat className="flex-1 bg-gray-50 h-full" />
  </div>
</>

  );
}

export default HostChatPage;
