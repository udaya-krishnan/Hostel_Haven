import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/User/auth/authSelectors";
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import { findwish, wishlist } from "../../features/User/auth/authAction";

function WishlistsIcon({ proId, wish }) {
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false); // Whether the item is liked

  // Check if the current property is already in the wishlist
  useEffect(() => {
    if (wish && wish.includes(proId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [wish, proId]); // Run when `wish` or `proId` changes

  const handleWishlist = async () => {
    if (userData) {
      try {
        const res = await dispatch(wishlist(userData._id, proId));
        console.log(res, "Wishlist add/remove response");
        
        // Toggle the like state based on the response
        if (res?.message !== "remove") {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      } catch (error) {
        console.error("Error updating wishlist:", error);
      }
    } else {
      toast.error("Please log in to continue", {
        hideProgressBar: true,
        className: "custom-toast-error",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <div
        className="absolute top-4 right-4 text-white text-2xl cursor-pointer"
        onClick={handleWishlist} // Trigger the add/remove wishlist action on click
      >
        {isLiked ? (
          <FaHeart className="text-red-500" /> // Show filled heart icon if liked
        ) : (
          <FaRegHeart /> // Show outlined heart icon if not liked
        )}
      </div>
      <Toaster /> {/* Display toast notifications */}
    </>
  );
}

export default WishlistsIcon;
