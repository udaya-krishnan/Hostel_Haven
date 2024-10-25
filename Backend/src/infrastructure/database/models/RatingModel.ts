import mongoose, { Document, ObjectId, Schema } from "mongoose";

// Define the Rating interface
export interface Rating {
    user_id: ObjectId;
    property_id: ObjectId;
    rating_value: number;  // Rating value (e.g., 1-5 stars)
    review: string;  // Optional user review
}

// Extend the Rating interface for the Mongoose document
export interface RatingDocument extends Rating, Document {
    _id: string;
}

// Define the Rating schema
const RatingSchema: Schema<RatingDocument> = new Schema({
    user_id: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    property_id: { type: mongoose.Types.ObjectId, ref: 'Property', required: true },
    rating_value: { type: Number, required: true, min: 1, max: 5 },  // Assuming rating is between 1-5
    review: { type: String, required: false }
}, {
    timestamps: true  // To track when each rating was created
});

// Create a Mongoose model for Rating
const RatingModel = mongoose.model<RatingDocument>('Rating', RatingSchema);
export default RatingModel;
