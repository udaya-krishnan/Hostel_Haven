import { AdminRepository } from "../../../application/interfaces/Admin/AdminRepository";
import UserModel from "../../database/models/UserModel";
import AmenitesModel from "../../database/models/AmenitesModel";
import { AmenitiesDocument } from "../../database/models/AmenitesModel";
import SafetyModel from "../../database/models/SafetyModel";
import { SafetyDocument } from "../../database/models/SafetyModel";
import PropertyModel from "../../database/models/PropertyModel";
import CouponModel from "../../database/models/CouponModel";
import { CouponData } from "../../../domain/entities/Coupon";
import BannerModel from "../../database/models/BannerModel";
import { config } from "dotenv";
import WalletModel from "../../database/models/WalletModel";
import TransactionModel from "../../database/models/TransactionModel";
import ReservationModel from "../../database/models/ReserveModel";
import RatingModel from "../../database/models/RatingModel";
import { NotificationData } from "../../../domain/entities/Notification";
import NotificationModel from "../../database/models/NotificationModel";
config()

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


    async addcoupon(data: CouponData): Promise<any | null> {
        const create=await CouponModel.create({
            code:data.code,
            name:data.couponName,
            expdate:data.expDate,
            min:data.minAmount,
            max:data.maxAmount
        })
        const allcoupon=await CouponModel.find({})

        return allcoupon
    }

    async fetchcoupon(): Promise<any | null> {
        const allcoupon=await CouponModel.find({})
        return allcoupon
    }

    async actioncoupon(id: string): Promise<any | null> {
        const findCoupon=await CouponModel.findById({_id:id})
        if(findCoupon?.is_blocked){
            await CouponModel.findByIdAndUpdate({_id:id},{
                $set:{
                    is_blocked:false
                }
            })
        }else{
            await CouponModel.findByIdAndUpdate({_id:id},{
                $set:{
                    is_blocked:true
                }
            })
        }
       
        console.log("updated");
        
        return findCoupon
    }

    
    async editCoupon(id: string, data: any): Promise<any | null> {
        console.log(id,data,"in the repo");
        
        const edit=await CouponModel.findByIdAndUpdate({_id:id},{
           $set:{
            name:data.name,
            min:data.min,
            max:data.max,
            expdate:data.expdate
           } 
        })
        return edit
    }

    async fetchBanner(): Promise<any | null> {
        return await BannerModel.find({})
    }

    async editBanner(id: string, data: any): Promise<any | null> {
        const update=await BannerModel.findByIdAndUpdate({_id:id},{
            image:data?.image,
            content:data?.content
        })

        return update
    }

    async fetchwalletHistory(): Promise<any | null> {
        const walletId=process.env.ADMIN_WALLET_ID

        const [wallet,transation]=await Promise.all([
            WalletModel.findById({_id:walletId}),
            TransactionModel.find({wallet_Id:walletId})
        ])

        return [wallet,transation]
    }

    async fetch(): Promise<any | null> {
        const walletId=process.env.ADMIN_WALLET_ID

        const [totalUser,totalHost,totalProperty,Wallet,reservations]=await Promise.all([
            UserModel.find({userType:'user'}).countDocuments(),
            UserModel.find({userType:'host'}).countDocuments(),
            PropertyModel.find().countDocuments(),
            WalletModel.findById({_id:walletId}),
            ReservationModel.find({})
        ])

        return [totalUser,totalHost,totalProperty,Wallet,reservations]
    }

    async fetchRating(): Promise<any | null> {
        
        const response=await RatingModel.find({}).populate('property_id')
        return response
    }

    async sendNotification(data: NotificationData): Promise<any | null> {
        const sendNoti=await NotificationModel.create({
            message:data.message,
            recipient:data.recipient,
            type:data.messageType
        })

        return sendNoti
    }
}