import React, { useState } from 'react';
import Header from '../../Layout/HostLayout/Header';
import HostChat from '../../Components/Host/HostChat';
import HostFriendsList from '../../Layout/HostLayout/HostFriendsList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHostMessage } from '../../features/Host/auth/authAction';
import { selectHost } from '../../features/Host/auth/authSelectors';

function HostChatPage() {
  const [selectedUserData, setselectedUserData] = useState(null);
  const [messages,setMessages]=useState(null)
  const hostData=useSelector(selectHost)
  const dispatch=useDispatch()

  // Function to handle friend selection
  const handleSelectFriend = async(userData,messages) => {
    const response=await dispatch(fetchHostMessage({hostId:hostData._id,userId:userData._id}))
    console.log(userData,"hostData form the chat");
    setselectedUserData(userData); 
    setMessages(response.payload.fetch.messages)
  };

  return (
    <>
      <Header />
      <div className="flex pt-16" style={{ height: 'calc(100vh - 5px)' }}>
        {/* Adjusting Friends List width */}
        <HostFriendsList className="w-1/4 bg-gray-100" onSelectFriend={handleSelectFriend} />

        {/* User Chat taking the remaining space */}
        <HostChat className="flex-1 bg-gray-50" selectedUserData={selectedUserData} setselectedUserData={setselectedUserData} message={messages} setMessage={setMessages}/>
      </div>
    </>
  );
}

export default HostChatPage;
