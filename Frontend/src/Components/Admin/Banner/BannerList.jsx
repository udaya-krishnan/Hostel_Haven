import React, { useEffect, useState } from "react";
import Sidebar from "../../../Layout/AdminLayout/Sidebar";
import Header from "../../../Layout/AdminLayout/Header";
import { useDispatch } from "react-redux";
import { editBanner, fetchBanner } from "../../../features/Admin/auth/authAction";

function BannerListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBannerId, setSelectedBannerId] = useState(null);
  const [banners, setBanners] = useState([]);
  const [editContent, setEditContent] = useState("");
  const [editImage, setEditImage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      const res = await dispatch(fetchBanner());
      setBanners(res.allbanner);
    };

    fetch();
  }, [dispatch]);

  const handleEditClick = (banner) => {
    setSelectedBannerId(banner._id);
    setEditContent(banner.content);
    setEditImage(banner.image);
  };

  const handleSaveClick = (id) => {
    const updatedBanner = banners.find((banner) => banner._id === id);
    const formData = new FormData();
    formData.append("content", editContent || updatedBanner.content);
    if (editImage) {
      console.log("imgae added ");
      
      formData.append("image", editImage); 
    }

    formData.append("id",id)

    console.log(formData,"form data");
    
    dispatch(editBanner(formData));
    const updatedBanners = banners.map((banner) =>
      banner._id === id
        ? { ...banner, content: editContent, image: editImage || banner.image } 
        : banner
    );
    setBanners(updatedBanners);
    setSelectedBannerId(null);
  };
  

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditImage(imageUrl);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        {/* Header */}
        <Header />

        <div className="p-6 mt-20 flex">
          <div className="bg-white ml-64 p-4 rounded-xl w-full shadow mt-4">
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
                  <th className="px-4 py-2 text-left">Content</th>
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

                    {/* Display or edit the banner image */}
                    <td className="px-4 py-2 text-left">
                      {selectedBannerId === banner._id ? (
                        <div className="flex items-center">
                          <img
                            src={editImage}
                            alt="Banner"
                            className="w-16 h-16 object-cover rounded mr-2"
                          />
                          <label className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer">
                            Upload
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      ) : (
                        <img
                          src={banner.image}
                          alt={banner.content}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                    </td>

                    {/* Display or edit the banner content */}
                    <td className="px-4 py-2 text-left">
                      {selectedBannerId === banner._id ? (
                        <input
                          type="text"
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="border px-2 py-1 rounded-lg w-full"
                        />
                      ) : (
                        banner.content
                      )}
                    </td>

                    <td className="px-4 py-2 text-left">
                      <div className="flex items-center gap-2">
                        {selectedBannerId === banner._id ? (
                          <button
                            className="bg-green-500 text-white text-base px-3 py-1 rounded-lg"
                            onClick={() => handleSaveClick(banner._id)}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="bg-gray-300 text-black text-base px-3 py-1 rounded-lg"
                            onClick={() => handleEditClick(banner)}
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerListing;
