import mongoose, { Document, ObjectId, Schema } from "mongoose";

// Define the Property interface


export enum PropertyVerified{
    Approved='approved',
    Pending='pending',
    Rejected="rejected"
}


export interface Property {
    host_id: ObjectId,
    property_type: string,
    name: string,
    description: string,
    location: string,
    latitude: string,
    longitude: string,
    regularPrice: string,
    offerPrice: string,
    rating: string,
    accommodation:string,
    image: string[],   
    amenities: string[],
    safety: string[], 
    facilities: object, 
    license_number: string,
    certificate: string, 
    propertyVerified: PropertyVerified,
    is_blocked: boolean,
}

// Extend the Property interface for the Mongoose document
export interface PropertyDocument extends Property, Document {
    _id: string
}


const PropertySchema: Schema<PropertyDocument> = new Schema({
    host_id: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    property_type: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    regularPrice: { type: String, required: true },
    accommodation:{type:String,required:false},
    offerPrice: { type: String, required: false },
    rating: { type: String, required: false },
    image: [{ type: String, required: true }], 
    amenities: [{ type: String, required: true }],
    safety: [{ type: String, required: true }], 
    facilities: [{ type: Object, required: true }], 
    license_number: { type: String, required: true },
    certificate: { type: String, required: true },
    propertyVerified: { type: String,enum:PropertyVerified, default: PropertyVerified.Pending }, 
    is_blocked: { type: Boolean, default: false }, 
}, {
    timestamps: true, 
});


const PropertyModel = mongoose.model<PropertyDocument>('Property', PropertySchema);
export default PropertyModel;
