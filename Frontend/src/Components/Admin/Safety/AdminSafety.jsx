import React, { useEffect, useState } from "react";
import Sidebar from "../../../Layout/AdminLayout/Sidebar";
import Header from "../../../Layout/AdminLayout/Header";
import { useDispatch } from "react-redux";
import { fetchSafetyMeasures, actionSafety, addSafety, updateSafety } from "../../../features/Admin/auth/authAction";
import { toast, ToastContainer } from "react-toastify";
import { Toaster } from "sonner";
import AddSafetyForm from "./AddSafetyForm";
import EditSafetyForm from "./EditSafetyForm";

function AdminSafety() {
  const dispatch = useDispatch();
  const [allSafetyMeasures, setSafetyMeasures] = useState([]);
  const [selectedSafety, setSelectedSafety] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const safetyPerPage = 6;

  useEffect(() => {
    const fetchSafetyData = async () => {
      const data = await dispatch(fetchSafetyMeasures());
      setSafetyMeasures(data.data);
    };
    fetchSafetyData();
  }, [dispatch]);

  const handleAction = async (id) => {
    try {
      toast(
        ({ closeToast }) => (
          <div>
            <p>Are you sure you want to change the safety measure status?</p>
            <button
              className="bg-btncolor text-white px-3 py-1 rounded mr-2"
              onClick={async () => {
                closeToast();
                try {
                  const safetyId = await dispatch(actionSafety(id));
                  setSafetyMeasures((prevSafety) =>
                    prevSafety.map((safety) =>
                      safety._id === safetyId.id ? { ...safety, is_blocked: !safety.is_blocked } : safety
                    )
                  );
                } catch (error) {
                  console.error("Failed to update safety measure status", error);
                  toast.error("Failed to update safety measure status.");
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
      console.error("Failed to update safety measure status", error);
    }
  };

  const handleEditClick = (safety) => {
    setSelectedSafety(safety);
  };

  const filteredSafetyMeasures = allSafetyMeasures.filter((safety) =>
    safety.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastSafety = currentPage * safetyPerPage;
  const indexOfFirstSafety = indexOfLastSafety - safetyPerPage;
  const currentSafety = filteredSafetyMeasures.slice(indexOfFirstSafety, indexOfLastSafety);

  const totalPages = Math.ceil(filteredSafetyMeasures.length / safetyPerPage);

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
                placeholder="Search by name"
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
                  <th className="px-4 py-2 text-left">Safety </th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-16 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentSafety.map((safety, index) => (
                  <tr
                    key={safety._id ? `safety-${safety._id}` : `index-${index}`}
                    className="border-t hover:bg-gray-100"
                  >
                    <td className="px-4 py-2 text-left">{index + 1}</td>
                    <td className="px-4 py-2 text-left">{safety.name}</td>
                    <td className={`px-4 py-2 text-left ${safety.is_blocked ? "text-red-500" : "text-green-500"}`}>
                      {safety.is_blocked ? "Not Active" : "Active"}
                    </td>
                    <td className="px-4 py-2 text-left">
                      <div className="flex items-center gap-2">
                        {safety.is_blocked ? (
                          <button
                            className="bg-btncolor text-white text-base px-3 py-1 rounded-lg w-24"
                            onClick={() => handleAction(safety._id)}
                          >
                            UnList
                          </button>
                        ) : (
                          <button
                            className="bg-btncolor text-white text-base px-3 py-1 rounded-lg w-24"
                            onClick={() => handleAction(safety._id)}
                          >
                            List
                          </button>
                        )}
                        {/* Edit Button */}
                        <button
                          className="bg-gray-300 text-black text-base px-3 py-1 rounded-lg w-24"
                          onClick={() => handleEditClick(safety)}
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`${
                    currentPage === index + 1 ? "bg-btncolor text-white" : "bg-gray-200 text-black"
                  } mx-1 px-3 py-1 rounded`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="w-4/12 ml-2">
            {selectedSafety ? (
              <EditSafetyForm
                selectedSafety={selectedSafety}
                setSafetyMeasures={setSafetyMeasures}
                updateSafety={updateSafety} // Passing update function
              />
            ) : (
              <AddSafetyForm setSafetyMeasures={setSafetyMeasures} />
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminSafety;
