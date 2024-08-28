import React from "react";
import {useDispatch} from 'react-redux'
import {Logout} from '../../features/Admin/auth/authSlice'



const Header = () => {

  const dispatch=useDispatch()

  function logoout(){
    dispatch(Logout())
  }

  return (
    <div className="bg-white p-4 w-full flex items-center justify-between border-b shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="text-xl font-semibold">Hostel Haven</div>
      <div className="flex items-center space-x-4">
        {/* Uncomment if needed */}
        {/* <input type="text" placeholder="Search" className="p-2 border rounded" /> */}
        {/* <div>Monday, 6th March</div> */}
        {/* <button className="bg-gray-200 p-2 rounded">Card</button> */}
        <button className="bg-gray-200 p-2 rounded" 
        onClick={logoout}
        >Logout</button>
      </div>
    </div>
  );
};

export default Header;
