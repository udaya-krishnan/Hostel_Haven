import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material"; // Using MUI for the rating stars
import { useDispatch } from "react-redux";
import { fetchReview } from "../../features/User/auth/authAction";

const ReviewList = ({ proId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0); // State for average rating
  const [showAll, setShowAll] = useState(false); // Control showing all reviews or not

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await dispatch(fetchReview(proId));
      const fetchedReviews = res.payload.response || [];
      setReviews(fetchedReviews);

      if (fetchedReviews.length > 0) {
        // Calculate the average rating if there are reviews
        const ratings = fetchedReviews.map(review => review.rating_value);
        const avgRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
        setAverageRating(avgRating);
      } else {
        // If no reviews, set the average rating to 0
        setAverageRating(0);
      }
    })();
  }, [proId, dispatch]);

  // Limit the reviews to the first 4 unless "Show All" is clicked
  const reviewsToShow = showAll ? reviews : reviews.slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Overall Rating */}
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-btncolor">Reviews</h2>
        <div className="flex items-center ml-4">
          <Rating name="read-only" value={averageRating} precision={0.5} readOnly />
          <span className="ml-2 text-lg font-semibold">
            {averageRating > 0 ? averageRating.toFixed(1) : "No Ratings Yet"}
          </span> {/* Display the average or "No Ratings Yet" */}
        </div>
      </div>

      {/* Conditionally Render the Reviews or "No Reviews" Message */}
      {reviews.length > 0 ? (
        <>
          {/* Reviews Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewsToShow.map((review) => (
              <div
                key={review._id}
                className="bg-white p-4 shadow-md rounded-lg flex flex-col items-start"
              >
                <div className="flex items-center mb-3">
                  <img
                    src={review?.user_id?.image}
                    alt={review?.user_id?.name}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{review?.user_id?.name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(review?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{review?.review}</p>

                <Rating name="read-only" value={review.rating_value} readOnly />
              </div>
            ))}
          </div>

          {/* Show All Reviews Button */}
          {reviews.length > 4 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-3 bg-btncolor text-white rounded-md"
              >
                {showAll ? "Show Less" : `Show All ${reviews.length} Reviews`}
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">No reviews available for this property.</p>
      )}
    </div>
  );
};

export default ReviewList;
