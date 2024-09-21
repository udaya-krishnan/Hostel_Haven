import mongoose, { Document, Schema, Types } from "mongoose";

export interface Wishlist {
    userId: Types.ObjectId;   
    propertyId: Types.ObjectId; 
}

export interface WishlistDocument extends Wishlist, Document {
    _id: string;
}


const WishlistSchema: Schema<WishlistDocument> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    propertyId: { type: Schema.Types.ObjectId, ref: 'Property', required: true }, 
}, { timestamps: true });


const WishlistModel = mongoose.model<WishlistDocument>("Wishlist", WishlistSchema);

export default WishlistModel;
