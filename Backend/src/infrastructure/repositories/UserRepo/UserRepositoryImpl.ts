import { UserRepository } from "../../../application/interfaces/User/UserRepository";
import { UserDocument } from "../../database/models/UserModel";
import { GusetInfo, User } from "../../../domain/entities/User";
import UserModel from "../../database/models/UserModel";
import { EditUser } from "../../../domain/entities/EditUser";
import PropertyModel from "../../database/models/PropertyModel";
import GuestModel from "../../database/models/GuestModel";
import ReservationModel from "../../database/models/ReserveModel";
import PaymentModel from "../../database/models/PaymentModel";
import WishlistModel from "../../database/models/WishlistModel";
import mongoose,{ ObjectId } from "mongoose";



export class UserRepositoryImpl implements UserRepository {
  async findUser(email: string): Promise<any | null> {
    return UserModel.findOne({ email: email });
  }

  async createUser(user: User): Promise<User> {
    try {
      console.log("userdatails", user);
      const createUser: UserDocument = await UserModel.create(user);
      return createUser.toObject() as User;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async googleRegister(user: any): Promise<any | null> {
    const createUser: UserDocument = await UserModel.create(user);
    return createUser.toObject() as User;
  }

  async forgot(email: string, password: string): Promise<any | null> {
    return await UserModel.findOneAndUpdate(
      { email: email },
      {
        password: password,
      }
    );
  }

  async edit(values: EditUser): Promise<any | null> {
    console.log(values, "userrepos");
    return await UserModel.findOneAndUpdate(
      { email: values.email },
      { $set: values },
      { new: true }
    ).select("-password");
  }

  async image(name: string, email: string): Promise<any | null> {
    return await UserModel.findOneAndUpdate(
      { email: email },
      {
        $set: {
          image: name,
        },
      },
      { new: true }
    ).select("-password");
  }

  async changepassword(password: string, email: string): Promise<any | null> {
    return await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { password: password } }
    );
  }

  async fetchhostel(): Promise<any | null> {
    return await PropertyModel.find({
      property_type: "hostel",
      propertyVerified:'approved'
    });
  }

  async fetchroom(): Promise<any | null> {
    return await PropertyModel.find({
      property_type: "room",
      propertyVerified:'approved'
    });
  }

  async properttdetails(id: string): Promise<any | null> {
    return await PropertyModel.findById({ _id: id });
  }

  async addgusetinfo(data: GusetInfo): Promise<any | null> {
    if(data._id!==""){
        const findGuest = await GuestModel.findById({_id:data._id});
    console.log('it is working');
    
    if (findGuest) {
     
      return await GuestModel.findByIdAndUpdate(
        data._id,
        {
          $set: {
            firstName: data.firstName,
            lastName:data.lastName,
            email: data.email,
            mobile: data.mobile,
          },
        },
        { new: true } 
      );
    }

    }else {
    
      const newGuest = await GuestModel.create({
        firstName: data.firstName,
        lastName:data.lastName,
        email: data.email,
        mobile: data.mobile,
      });

      return newGuest; 
    }
  }

  async reservation(totalPrice: string, guserId: string, userId: string, proId: string, durationInMonths: string): Promise<any | null> {
    const createReservation=await ReservationModel.create({
      total_price:totalPrice,
      user_id:userId,
      guest_info:guserId,
      property_id:proId,
      month:durationInMonths
    })

    return createReservation._id
  }

  async payment(reservationId: string, userId: string, payment_method: string, amount: string,paymentStatus:string): Promise<any | null> {
    const createPayment=await PaymentModel.create({
      reservation_id:reservationId,
      user_id:userId,
      payment_method:payment_method,
      payment_status:paymentStatus,
      amount:amount
    })
    return createPayment._id
  }

  async wishlist(userId: string, proId: string): Promise<any | null> {

    const findUserWish=await WishlistModel.findOne({userId:userId,propertyId:proId})
    console.log(findUserWish);
    
    if(findUserWish){
      console.log('remove');
      
      const deletewish=await WishlistModel.deleteOne({userId:userId,propertyId:proId})
      return {message:"remove"}
    }else{
      console.log('added');
      
      const wishlist=await WishlistModel.create({
        userId:userId,
        propertyId:proId
      })
      return {message:"added"}
    }
   
  }

  async findWishlist(userId: string): Promise<string[] | null> {
    const findwish = await WishlistModel.find({ userId }).select("propertyId");
    
    if (findwish.length > 0) {
        // Convert each ObjectId to a string using toString()
        const propertyIds = findwish.map(wish => (wish.propertyId as mongoose.Types.ObjectId).toString());
        return propertyIds;
    } else {
        return null; // Return null if no wishlist items found
    }
}

async fetchwishlist(id: string): Promise<any | null> {
  const wishlist = await WishlistModel.find({ userId:id })
      .populate('propertyId') // This populates the property details
      .exec();
  return wishlist
}

async removewish(id: string, ): Promise<any | null> {
  const remove=await WishlistModel.findByIdAndDelete({_id:id})
  return remove
}

}
