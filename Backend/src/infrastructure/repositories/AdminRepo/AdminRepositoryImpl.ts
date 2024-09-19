import { AdminRepository } from "../../../application/interfaces/Admin/AdminRepository";
import UserModel from "../../database/models/UserModel";
import AmenitesModel from "../../database/models/AmenitesModel";
import { AmenitiesDocument } from "../../database/models/AmenitesModel";
import SafetyModel from "../../database/models/SafetyModel";
import { SafetyDocument } from "../../database/models/SafetyModel";
import PropertyModel from "../../database/models/PropertyModel";

export class AdminRepositoryImpl implements AdminRepository{

    async fetchingUsers(): Promise<any | null> {
        const userData=await UserModel.find({userType:'user'}).select('-password');
        return userData
    }

    async actionUser(id: string): Promise<any | null> {
        // console.log(id,"id in adminrepositoryimpl");
        
        const findUser=await UserModel.findById({_id:id})
        console.log(findUser);
        
        if(findUser?.is_blocked===true){
            console.log("unblock");
            
             await UserModel.findByIdAndUpdate({_id:id},{
                $set:{
                    is_blocked:false
                }
            })
        }else{
            console.log("block");
            
             await UserModel.findByIdAndUpdate({_id:id},{
                $set:{
                    is_blocked:true
                }
            })
        }

        return findUser?._id
    }

    async fetchingHost(): Promise<any | null> {
        const hostData=await UserModel.find({userType:'host'}).select('-password');
        return hostData
    }

    async userDetails(id:string): Promise<any | null> {
        const userData=await UserModel.findById({_id:id}).select('-password')
        return userData
    }

    async hostDetails(id: string): Promise<any | null> {
        const hostData=await UserModel.findById({_id:id}).select('-password')
        return hostData
    }

    async addamenities(value: string): Promise<any | null> {
        const addamenities:AmenitiesDocument=await AmenitesModel.create({name:value})
        const allAmenties=await AmenitesModel.find()
        return allAmenties
    }

    async fetchamenities(): Promise<any | null> {
   
        
        const data=await AmenitesModel.find()
        return data
    }

    async actionAmenities(id: string): Promise<any | null> {
        const findAmenities=await AmenitesModel.findById({_id:id})
        console.log(findAmenities);
        
        if(findAmenities?.is_blocked===true){
            console.log("unblock");
            
             await AmenitesModel.findByIdAndUpdate({_id:id},{
                $set:{
                    is_blocked:false
                }
            })
        }else{
            console.log("block");
            
             await AmenitesModel.findByIdAndUpdate({_id:id},{
                $set:{
                    is_blocked:true
                }
            })
        }

        return findAmenities?._id
    }
    

    async updateAmenities(id: string, name: string): Promise<any | null> {
        const update=await AmenitesModel.findByIdAndUpdate({_id:id},{
            $set:{name:name}
        })
        return update 
    }

    async addsafety(name: string): Promise<any | null> {
        const addSafety:SafetyDocument=await SafetyModel.create({name:name})
        const allSafety=await SafetyModel.find()
        return allSafety
    }

    async fetchsafety(): Promise<any | null> {
        const data=await SafetyModel.find()
        return data
    }

    async actionSafety(id: string): Promise<any | null> {
        const findSafety=await SafetyModel.findById({_id:id})
        console.log(findSafety);
        
        if(findSafety?.is_blocked===true){
            console.log("unblock");
            
             await SafetyModel.findByIdAndUpdate({_id:id},{
                $set:{
                    is_blocked:false
                }
            })
        }else{
            console.log("block");
            
             await SafetyModel.findByIdAndUpdate({_id:id},{
                $set:{
                    is_blocked:true
                }
            })
        }

        return findSafety?._id
    }

    async updateSafety(id: string, name: string): Promise<any | null> {
        const update=await SafetyModel.findByIdAndUpdate({_id:id},{
            $set:{name:name}
        })
        return update 
    }

    async fetchHostProperty(id: string): Promise<any | null> {
        const fetch=await PropertyModel.find({host_id:id})
        return fetch
    }

    async propertyDetails(id: string): Promise<any | null> {
        const property=await PropertyModel.findById({_id:id})
        return property
    }

    async approveproperty(id: string): Promise<any | null> {
        const property=await PropertyModel.findByIdAndUpdate({_id:id},{
            $set:{
                propertyVerified:'approved'
            }
        },
        {new:true}
    )

    return  property
    }

    async rejectproperty(id: string): Promise<any | null> {
        const property=await PropertyModel.findByIdAndUpdate({_id:id},{
            $set:{
                propertyVerified:'rejected'
            }
        },
        {new:true})

        return property
    }

}