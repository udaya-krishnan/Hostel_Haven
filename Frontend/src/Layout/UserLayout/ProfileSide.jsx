import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadphoto } from "../../features/User/auth/authAction";

function ProfileSide({ change, value, userData }) {
  const fileInputRef = useRef(null);
  const [error, setError] = useState(""); 
  const dispatch=useDispatch()

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
    
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        setError("Please select a valid image file (JPEG, PNG, GIF).");
        return;
      }
      setError("");
      console.log("Selected file:", file);
      dispatch(uploadphoto({file,email:userData.email}))

    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically click the file input
    }
  };

  return (
    <>
      <div className="w-1/3 bg-gray-200 p-6 rounded-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center mb-4 overflow-hidden">
            <img
              src={
                userData?.image?.startsWith("http")
                  ? userData.image
                  : `../../../public/profile/${userData?.image || "anony.webp"}`
              }
              alt="User"
              className="h-full w-full object-cover"
            />
          </div>

          <button
            className="text-sm text-btncolor"
            onClick={handleUploadClick}
          >
            Upload a Photo
          </button>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*" // Accept only image file types
            onChange={handleFileChange}
          />

          {/* Display error message if there's an error */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className="mb-4">
          <h2 className="font-bold text-btncolor">About</h2>
          <p className="text-sm text-gray-600">
            {userData.about}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">{userData.name}</h3>
        
          <p className="text-sm text-green-500">✓ Email Confirmed</p>
          {userData.mobile&&  <p className="text-sm text-green-500">✓ Mobile Confirmed</p>}
        </div>
        <button
          className="bg-gray-300 text-btncolor py-2 px-4 rounded-md w-full"
          onClick={() => change(!value)}
        >
          Change password
        </button>
      </div>
    </>
  );
}

export default ProfileSide;
