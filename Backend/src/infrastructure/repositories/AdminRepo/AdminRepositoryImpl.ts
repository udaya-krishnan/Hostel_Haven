import { AdminRepository } from "../../../application/interfaces/Admin/AdminRepository";
import UserModel from "../../database/models/UserModel";
import AmenitesModel from "../../database/models/AmenitesModel";
import { AmenitiesDocument } from "../../database/models/AmenitesModel";

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
    


}