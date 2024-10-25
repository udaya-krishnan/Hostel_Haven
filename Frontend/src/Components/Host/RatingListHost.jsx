import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from '@mui/material'; // Import MUI Rating component
import { useLocation } from 'react-router-dom';
import { fetchRating } from '../../features/Host/auth/authAction';

function RatingListHost() {
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const proId = location.state.proId;
  const [avgRating, setAvgRating] = useState(0); // State to hold the average rating

  useEffect(() => {
    // Fetch the ratings for the current host when the component loads
    (async () => {
      if (proId) {
        const res = await dispatch(fetchRating(proId));
        console.log(res);
        setReviews(res.payload.response);

        // Calculate the average rating
        if (res.payload.response.length > 0) {
          const totalRating = res.payload.response.reduce((sum, rating) => sum + rating.rating_value, 0);
          setAvgRating(totalRating / res.payload.response.length);
        }
      }
    })();
  }, [dispatch, proId]);

  return (
    <div className="p-4 mt-24">
      <h2 className="text-2xl font-bold mb-4">Property Ratings & Feedback</h2>

      {/* Display the average rating at the top */}
      {reviews.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center">
            <h3 className="font-semibold text-gray-800 mr-2">Average Rating:</h3>
            <Rating name="average-rating" value={avgRating} precision={0.5} readOnly />
            <span className="ml-2 text-gray-500">({avgRating.toFixed(1)}/5)</span>
          </div>
        </div>
      )}

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {reviews.map((rating) => (
            <div key={rating._id} className="p-4 bg-white shadow rounded-lg">
              {/* Rating Header */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800">{rating.user_id.name}</h3>
                <div className="flex items-center">
                  {/* Display star rating */}
                  <Rating name="read-only" value={rating.rating_value} precision={0.5} readOnly />
                  <span className="ml-2 text-gray-500">({rating.rating_value}/5)</span>
                </div>
              </div>

              {/* Rating Review */}
              <p className="text-gray-600">{rating.review}</p>

              {/* Optional: Date of the review */}
              <div className="text-xs text-gray-500 mt-2">
                {new Date(rating.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No ratings available for your properties yet.</p>
      )}
    </div>
  );
}

export default RatingListHost;
