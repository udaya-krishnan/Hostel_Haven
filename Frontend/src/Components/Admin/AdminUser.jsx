import React, { useEffect, useState } from "react";
import Sidebar from "../../Layout/AdminLayout/Sidebar";
import Header from "../../Layout/AdminLayout/Header";
import { useDispatch } from "react-redux";
import { fetchinguser } from "../../features/Admin/auth/authAction";

function AdminUser() {

  const dispatch=useDispatch()
  const [userData,setUserData]=useState([])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await dispatch(fetchinguser());
    
        setUserData(data.userData)
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData()
  }, [])

  function action(id){
    
  }
 

  return (
    <div className="flex">
      {/* Sidebar will be fixed and takes space on the left */}
      <Sidebar />
      {/* Main content area */}
      <div className="flex-1 bg-gray-100">
        {/* Header */}
        <Header />
        {/* Content Area */}
        <div className="p-6 mt-20">
          <div className="bg-white ml-64 p-4 rounded-xl w-94 shadow mt-4">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Join Date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => {
                  const date = new Date(user.createdAt);
                  const options = { year: "numeric", month: "long", day: "numeric" };
                  const formattedDate = date.toLocaleDateString("en-US", options);

                  return (
                    <tr key={user._id} className="border-t">
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{formattedDate}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded ${
                            user.isBlocked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                          }`}
                        >
                          {user.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td className="px-4 py-2"> 
                        {userData.isBlocked===true? <button className="bg-btncolor mr-4 text-white text-base px-6 rounded-lg" >UnBlock</button>:
                         <button className="bg-btncolor mr-4 text-white text-base px-6 rounded-lg" >Block</button>}

                        <button  className="bg-btncolor ml-2 text-white px-5 rounded-lg">Details</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUser;
