import { Request,Response } from "express";
import { HostPropertyService } from "../../../application/services/HostService/HostPropertyService";
import { HostRepositoryImpl } from "../../../infrastructure/repositories/HostRepo/HostRepositoryImpl";
import { PropertyEntities } from "../../../domain/entities/AddProperty";
import { s3BucketForProperty } from "../../../utils/S3bucket";


const hostrepository=new HostRepositoryImpl()
const hostpropertyservice=new HostPropertyService(hostrepository)

export const fetchamenities=async(req:Request,res:Response)=>{
    try {
        const allamenities=await hostpropertyservice.fetchamenities()
        res.status(200).json({allamenities:allamenities})
    } catch (error:any) {
        console.log(error.message)
    }
}


export const fetchsafety=async(req:Request,res:Response)=>{
    try {
        const allsafety=await hostpropertyservice.fetchsafety()
        res.status(200).json({allsafety:allsafety})
    } catch (error:any) {
        console.log(error.messae);
        
    }
}


export const addproperty=async(req:Request,res:Response)=>{
    try {

        console.log(req.body,"body");
        console.log(req.files,"files");

        const {cretificateUrl,imageUrl}= await s3BucketForProperty(req.files)

        
        const findHost=await hostrepository.findHost(req.body.hostId)

        console.log(findHost);
        

        const data:PropertyEntities={
            name:req.body.propertyName,
            location:req.body.propertyLocation,
            description:req.body.propertyDescription,
            latitude:req.body.propertyLatitude,
            longitude:req.body.propertyLongitude,
            license_number:req.body.propertyLicense,
            regularPrice:req.body.propertyPrice,
            offerPrice:req.body.propertyOffer || "",
            property_type:req.body.propertyType,
            accommodation:req.body.propertyAccommodation,
            amenities:JSON.parse(req.body.propertyAmenities),
            facilities:JSON.parse(req.body.propertyFacilities),
            certificate:cretificateUrl||"",
            image:imageUrl,
            host_id:findHost._id,
            safety:JSON.parse(req.body.propertySafety)

        }

        console.log(data);

        const addproperty=await hostrepository.addProperty(data)
        if(addproperty){

            res.status(201).json({message:"property requested"})
        }else{
            console.log('some internal error');
            
        }

        
    } catch (error:any) {
        console.log(error.message);
        
    }
}

export const fetchProperty=async(req:Request,res:Response)=>{
    try {
        console.log(req.body);
        
        const id=req.body.id
        console.log(id);
        
        const property=await hostrepository.fetchproperty(id)

        res.status(200).json({property:property})

    } catch (error:any) {
        console.log(error.message);
        
    }
}