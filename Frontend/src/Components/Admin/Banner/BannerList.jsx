import React, { useState } from "react";
import Sidebar from "../../../Layout/AdminLayout/Sidebar";
import Header from "../../../Layout/AdminLayout/Header";
// import EditBannerForm from "./EditBannerForm";
// import AddBannerForm from "./AddBannerForm";
// import { Toaster, ToastContainer } from "react-hot-toast";

function BannerListing() {
  // Dummy data for banners
  const [banners, setBanners] = useState([
    { _id: 1, title: "Summer Sale", status: "Active", image: "https://png.pngtree.com/template/20220425/ourmid/pngtree-colored-flat-travel-booking-booking-hostel-composition-with-booking-the-hostel-image_1439525.jpg" },
    { _id: 2, title: "Winter Discount", status: "Inactive", image: "/path/to/winter-discount.jpg" },
    { _id: 3, title: "New Arrivals", status: "Active", image: "/path/to/new-arrivals.jpg" },
    { _id: 4, title: "Black Friday Deals", status: "Inactive", image: "/path/to/black-friday.jpg" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBanner, setSelectedBanner] = useState(null);

  // Dummy functions for banner actions
  const action = (id) => {
    // Logic to change banner status
    const updatedBanners = banners.map((banner) =>
      banner._id === id
        ? { ...banner, status: banner.status === "Active" ? "Inactive" : "Active" }
        : banner
    );
    setBanners(updatedBanners);
  };

  const handleEditClick = (banner) => {
    setSelectedBanner(banner);
  };

  const paginate = (page) => {
    // Pagination logic (if needed)
    console.log("Paginating to page", page);
  };

  // Dummy pagination count
  const totalPages = 1;
  const currentPage = 1;

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        {/* Header */}
        <Header />
        
        <div className="p-6 mt-20 flex">
          <div className="bg-white ml-64 p-4 rounded-xl w-6/12 shadow mt-4">
            {/* Search bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by banner title"
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
                  <th className="px-4 py-2 text-left">Image</th>
                  <th className="px-4 py-2 text-left">Banner Title</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-16 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner, index) => (
                  <tr
                    key={banner._id ? `banner-${banner._id}` : `index-${index}`}
                    className="border-t hover:bg-gray-100"
                  >
                    <td className="px-4 py-2 text-left">{index + 1}</td>
                    
                    {/* Display the banner image */}
                    <td className="px-4 py-2 text-left">
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>

                    <td className="px-4 py-2 text-left">{banner.title}</td>
                    <td
                      className={`px-4 py-2 text-left ${
                        banner.status === "Inactive" ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {banner.status}
                    </td>
                    <td className="px-4 py-2 text-left">
                      <div className="flex items-center gap-2">
                        {banner.status === "Inactive" ? (
                          <button
                            className="bg-btncolor text-white text-base px-3 py-1 rounded-lg w-24"
                            onClick={() => action(banner._id)}
                          >
                            Activate
                          </button>
                        ) : (
                          <button
                            className="bg-btncolor text-white text-base px-3 py-1 rounded-lg w-24"
                            onClick={() => action(banner._id)}
                          >
                            Deactivate
                          </button>
                        )}
                        {/* Edit Button */}
                        <button
                          className="bg-gray-300 text-black text-base px-3 py-1 rounded-lg w-24"
                          onClick={() => handleEditClick(banner)}
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
                    currentPage === index + 1
                      ? "bg-btncolor text-white"
                      : "bg-gray-200 text-black"
                  } mx-1 px-3 py-1 rounded`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Right-side form (Add or Edit form) */}
          {/* <div className="ml-4 w-4/12">
            {selectedBanner ? (
              <EditBannerForm
                selectedBanner={selectedBanner}
                setBanners={setBanners}
                updateBanner={(updatedBanner) =>
                  setBanners((prev) =>
                    prev.map((banner) =>
                      banner._id === updatedBanner._id
                        ? updatedBanner
                        : banner
                    )
                  )
                }
                setSelectedBanner={setSelectedBanner}
              />
            ) : (
              <AddBannerForm
                setBanners={setBanners}
                allBanners={banners}
                addBanner={(newBanner) =>
                  setBanners((prev) => [...prev, newBanner])
                }
              />
            )}
          </div> */}
        </div>
      </div>

      {/* Toast Notifications */}
      {/* <Toaster />
      <ToastContainer /> */}
    </div>
  );
}

export default BannerListing;
