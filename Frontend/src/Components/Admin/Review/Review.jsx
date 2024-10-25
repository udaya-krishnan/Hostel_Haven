import React, { useState, useEffect } from "react";
import Sidebar from "../../../Layout/AdminLayout/Sidebar";
import Header from "../../../Layout/AdminLayout/Header";
import { Rating } from "@mui/material"; // To display star ratings
import { useDispatch } from "react-redux";
import { fetchRating } from "../../../features/Admin/auth/authAction";

function Review() {
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await dispatch(fetchRating());
      console.log(res, "response in the rating");
      setReviews(res.response);
    })();
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="p-6 mt-20">
          <div className="bg-white ml-64 p-4 rounded-xl w-94 shadow mt-4">
            {/* Fixed Header */}
            <h2 className="text-xl font-bold mb-4">Property Ratings & Feedback</h2>

            {/* Scrollable Ratings List */}
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "400px" }} // Adjust the height as needed
            >
              {reviews.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {reviews.map((rating) => (
                    <div key={rating._id} className="p-4 bg-gray-50 shadow rounded-lg">
                      {/* Rating Header */}
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-gray-800">
                          {rating.property_id.name}
                        </h3>
                        <div className="flex items-center">
                          {/* Star rating */}
                          <Rating
                            name="read-only"
                            value={rating.rating_value}
                            precision={0.5}
                            readOnly
                          />
                          <span className="ml-2 text-gray-500">
                            ({rating.rating_value}/5)
                          </span>
                        </div>
                      </div>

                      {/* Rating review */}
                      <p className="text-gray-600">{rating.review}</p>

                      {/* Optional: Date of the review */}
                      <div className="text-xs text-gray-500 mt-2">
                        {new Date(rating.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No ratings available yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
