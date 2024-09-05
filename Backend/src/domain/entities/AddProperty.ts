import { ObjectId } from "mongoose";

export interface PropertyEntities{
    name:string,
    host_id:ObjectId,
    property_type: string,
    description: string,
    location: string,
    latitude: string,
    longitude: string,
    regularPrice: string,
    offerPrice: string,
    accommodation:string,
    image: string[],   
    amenities: string[],
    safety: string[], 
    facilities: string[], 
    license_number: string,
    certificate: string, 
}