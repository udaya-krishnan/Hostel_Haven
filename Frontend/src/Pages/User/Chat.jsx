import React, { useState } from 'react';
import Header from '../../Layout/UserLayout/Header';
import FriendsList from '../../Layout/UserLayout/FriendsList';
import UserChat from '../../Components/User/UserChat';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/User/auth/authSelectors';
import { fetchUserMessage } from '../../features/User/auth/authAction';

function Chat() {
  const [selectedHostData, setselectedHostData] = useState(null);
  const [messages,setMessages]=useState(null)
  const userData=useSelector(selectUser)
  const dispatch=useDispatch()

  // Function to handle friend selection
  const handleSelectFriend = async(hostData,messages) => {
    console.log(hostData,"hostData form the chat");
    const response=await dispatch(fetchUserMessage({hostId:hostData._id,userId:userData._id}))
    console.log(response,'messages form chat');
    
    setselectedHostData(hostData); 
    setMessages(response.payload.fetch.messages)
  };

  return (
    <>
      <Header />
      <div className="flex" style={{ height: 'calc(100vh - 80px)' }}>
        {/* Adjusting Friends List width */}
        <FriendsList className="w-1/4 bg-gray-100" onSelectFriend={handleSelectFriend} />

        {/* User Chat taking the remaining space */}
        <UserChat className="flex-1 bg-gray-50" selectedHostData={selectedHostData} message={messages} setMessage={setMessages}/>
      </div>
    </>
  );
}

export default Chat;
