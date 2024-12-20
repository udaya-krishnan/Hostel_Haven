import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadPhoto } from "../../features/User/auth/authAction";
import { toast, Toaster } from 'sonner';

function ProfileSide({ change, value, userData }) {
  const fileInputRef = useRef(null);
  const [error, setError] = useState(""); 
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        setError("Please select a valid image file (JPEG, PNG, GIF).");
        toast.error("Please select a valid image file (JPEG, PNG, GIF).");
        return;
      }
      setError("");

      toast.promise(
        new Promise((resolve, reject) => {
          dispatch(uploadPhoto({ file, email: userData.email }))
            .then(() => {
              resolve();
              console.log("Selected file:", file);
            })
            .catch(() => {
              reject();
            });
        }),
        {
          loading: "Uploading photo...",
          success: "Photo uploaded successfully!",
          error: "Failed to upload photo. Please try again.",
        }
      );
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically click the file input
    }
  };

  return (
    <div className="w-full lg:w-1/3 bg-gray-200 p-6 rounded-lg">
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

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      <div className="mb-4">
        <h2 className="font-bold text-btncolor">About</h2>
        <p className="text-sm text-gray-600">
          {userData?.about}
        </p>
      </div>
      <div className="mb-4">
        <h3 className="font-bold">{userData?.name}</h3>
        <p className="text-sm text-green-500">✓ Email Confirmed</p>
        {userData?.mobile && <p className="text-sm text-green-500">✓ Mobile Confirmed</p>}
      </div>
      <button
        className="bg-gray-300 text-btncolor py-2 px-4 rounded-md w-full"
        onClick={() => change(!value)}
      >
        Change password
      </button>
      <Toaster />
    </div>
  );
}

export default ProfileSide;