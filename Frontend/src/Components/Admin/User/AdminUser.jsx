import React, { useEffect, useState } from "react";
import Sidebar from "../../../Layout/AdminLayout/Sidebar";
import Header from "../../../Layout/AdminLayout/Header";
import { useDispatch } from "react-redux";
import { actionUser, fetchinguser } from "../../../features/Admin/auth/authAction";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
// import AdminUserDetails from "../../Pages/Admin/AdminUserDetails";
import { useNavigate } from "react-router-dom";

function AdminUser() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6; // Minimum users per page

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await dispatch(fetchinguser());
        setUserData(data.userData);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  const action = async (id) => {
    try {
      toast(
        ({ closeToast }) => (
          <div>
            <p>Are you sure you want to change the user's status?</p>
            <button
              className="bg-btncolor text-white px-3 py-1 rounded mr-2"
              onClick={async () => {
                closeToast();
                try {
                  const userId = await dispatch(actionUser(id));
                  setUserData((prevUserData) =>
                    prevUserData.map((user) =>
                      user._id === userId.id
                        ? { ...user, is_blocked: !user.is_blocked }
                        : user
                    )
                  );
                } catch (error) {
                  console.error("Failed to update user status", error);
                  toast.error("Failed to update user status.");
                }
              }}
            >
              Confirm
            </button>
            <button
              className="bg-gray-300 text-black px-3 py-1 rounded"
              onClick={closeToast}
            >
              Cancel
            </button>
          </div>
        ),
        { autoClose: false }
      );
    } catch (error) {
      console.error("Failed to update user status", error);
    }
  };

  const filteredUsers = userData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="p-6 mt-20">
          <div className="bg-white ml-64 p-4 rounded-xl w-94 shadow mt-4">
            {/* Search bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by name or email"
                className="px-4 py-2 border rounded-lg w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
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
                {currentUsers.map((user) => {
                  const date = new Date(user.createdAt);
                  const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  };
                  const formattedDate = date.toLocaleDateString(
                    "en-US",
                    options
                  );

                  return (
                    <tr key={user._id} className="border-t">
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{formattedDate}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded ${
                            user.is_blocked
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {user.is_blocked ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          {user.is_blocked ? (
                            <button
                              className="bg-btncolor text-white text-base px-4 py-2 rounded-lg w-24"
                              onClick={() => action(user._id)}
                            >
                              Unblock
                            </button>
                          ) : (
                            <button
                              className="bg-btncolor text-white text-base px-4 py-2 rounded-lg w-24"
                              onClick={() => action(user._id)}
                            >
                              Block
                            </button>
                          )}
                          <button className="bg-btncolor text-white text-base px-5 py-2 rounded-lg"
                            onClick={()=>navigate(`/admin/userdetails?user_id=${user._id}`)}
                          >
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination controls */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 mx-1 ${
                    currentPage === index + 1
                      ? "bg-btncolor text-white"
                      : "bg-gray-200"
                  } rounded`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminUser;
