import { Request,Response } from "express";
import { HostPropertyService } from "../../../application/services/HostService/HostPropertyService";
import { HostRepositoryImpl } from "../../../infrastructure/repositories/HostRepo/HostRepositoryImpl";
import { PropertyEntities } from "../../../domain/entities/AddProperty";
import { s3BucketForProperty } from "../../../utils/S3bucket";
import { io } from "../../../config/Socket";
import { userDetails } from "../Admin/AdminUserController";


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

        const fecility=JSON.parse(req.body.propertyFacilities)
        console.log(fecility,'facitity');
        

        const obj={
            bedroom:parseInt(fecility.rooms),
            bathroom:parseInt(fecility.bathrooms),
            parking:parseInt(fecility.parking)
        }
        

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
            policies:JSON.parse(req.body.propertyPolicies),
            accommodation:req.body.propertyAccommodation,
            forwhom:req.body.propertyForWhom,
            amenities:JSON.parse(req.body.propertyAmenities),
            facilities:obj,
            certificate:cretificateUrl||"",
            image:imageUrl,
            host_id:findHost._id,
            safety:JSON.parse(req.body.propertySafety)

        }

        console.log(data);

        const addproperty=await hostrepository.addProperty(data)
        if(addproperty){
            let message={
                name:findHost.name,
                email:findHost.email,
                subject:`${findHost.email} This host created new Property`
            }
            io.emit("propertycreated",message)
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


export const updateProperty=async (req:Request,res:Response)=>{
    try {
        console.log(req.body);
        console.log(req.files,"hai hehrehrh");
        

        const {imageUrl}= await s3BucketForProperty(req.files)
        const fecility=JSON.parse(req.body.propertyFacilities)
        console.log(fecility,'ffff');
        

        const obj={
            bedroom:parseInt(fecility.rooms),
            bathroom:parseInt(fecility.bathrooms),
            parking:parseInt(fecility.parking)
        }


       
        

        const data={
            name:req.body.propertyName,
            location:req.body.propertyLocation,
            description:req.body.propertyDescription,
            latitude:req.body.propertyLatitude,
            longitude:req.body.propertyLongitude,
            regularPrice:req.body.propertyPrice,
            offerPrice:req.body.propertyOffer || "",
            property_type:req.body.propertyType,
            policies:JSON.parse(req.body.propertyPolicies),
            accommodation:req.body.propertyAccommodation,
            forwhom:req.body.propertyForWhom,
            amenities:JSON.parse(req.body.propertyAmenities),
            facilities:fecility,
            image:imageUrl,
            safety:JSON.parse(req.body.propertySafety)

        }

            const update=await hostrepository.updateproperty(data,req.body.id)

            if(update){
                res.status(201).json({message:"property updated"})
            }



        
    } catch (error:any) {
        console.log(error.message);
        
    }
}


export const availableProperty=async(req:Request,res:Response)=>{
    try {
        const id=req.body.id
        const hostId=req.body.hostId
        const update=await hostrepository.available(id)

        if(update){
            const property=await hostrepository.fetchproperty(hostId)

            res.status(200).json({property:property})
        }
    } catch (error:any) {
        console.log(error.message);
        
    }
}


export const fetchReservation=async(req:Request,res:Response)=>{
    try {
        const id=req.body.hostId
        const response=await hostrepository.fetchreservation(id)

        console.log(response,"hai sdjfsdjfsdjfsd");
        

        res.status(200).json({reservation:response})
    } catch (error:any) {
        console.log(error);
        
    }
}