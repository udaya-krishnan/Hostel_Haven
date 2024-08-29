import React, { useEffect, useState } from "react";
import Sidebar from "../../Layout/AdminLayout/Sidebar";
import Header from "../../Layout/AdminLayout/Header";
import { useDispatch } from "react-redux";
import {
  actionAmenities,
  addAmenities,
  fetchamenities,
} from "../../features/Admin/auth/authAction";
import { toast, ToastContainer } from "react-toastify";
import { Toaster } from "sonner";
import AddAmenityForm from "../../Components/Admin/AddAmenityForm"; // Import the new component

function AdminAmenities() {
  const dispatch = useDispatch();
  const [allAmenities, setAmenities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const amenitiePerPage = 6; 

  useEffect(() => {
    const fetchalldata = async () => {
      const data = await dispatch(fetchamenities());
      setAmenities(data.data);
    };
    fetchalldata();
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
                  const amenitieId = await dispatch(actionAmenities(id));
                  setAmenities((prevAmenitie) =>
                    prevAmenitie.map((amenitie) =>
                      amenitie._id === amenitieId.id
                        ? { ...amenitie, is_blocked: !amenitie.is_blocked }
                        : amenitie
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

  const filteredAmenitie = allAmenities.filter((amenitie) =>
    amenitie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastAmenitie = currentPage * amenitiePerPage;
  const indexOfFirstUser = indexOfLastAmenitie - amenitiePerPage;
  const currentUsers = filteredAmenitie.slice(indexOfFirstUser, indexOfLastAmenitie);

  const totalPages = Math.ceil(filteredAmenitie.length / amenitiePerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex">
      <Toaster />
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="p-6 mt-20 flex">
          <div className="bg-white ml-64 p-4 rounded-xl w-6/12 shadow mt-4">
            {/* Search bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by name "
                className="px-4 py-2 border rounded-lg w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Table */}
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">No</th>
                  <th className="px-4 py-2 text-left">Amenities</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-16 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((amenitie, index) => (
                  <tr
                    key={
                      amenitie._id
                        ? `amenitie-${amenitie._id}`
                        : `index-${index}`
                    }
                    className="border-t hover:bg-gray-100"
                  >
                    <td className="px-4 py-2 text-left">{index + 1}</td>
                    <td className="px-4 py-2 text-left">{amenitie.name}</td>
                    <td
                      className={`px-4 py-2 text-left ${
                        amenitie.is_blocked ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {amenitie.is_blocked ? "Not Active" : "Active"}
                    </td>
                    <td className="px-4 py-2 text-left">
                      <div className="flex items-center gap-2">
                        {amenitie.is_blocked ? (
                          <button
                            className="bg-btncolor text-white text-base px-3 py-1 rounded-lg w-24"
                            onClick={() => action(amenitie._id)}
                          >
                            UnList
                          </button>
                        ) : (
                          <button
                            className="bg-btncolor text-white text-base px-3 py-1 rounded-lg w-24"
                            onClick={() => action(amenitie._id)}
                          >
                            List
                          </button>
                        )}
                        <button className="bg-btncolor text-white text-base px-3 py-1 rounded-lg w-24">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
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

          {/* Add new amenity form component */}
          <AddAmenityForm
            allAmenities={allAmenities}
            setAmenities={setAmenities}
            addAmenities={(amenity) => dispatch(addAmenities(amenity))}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminAmenities;
