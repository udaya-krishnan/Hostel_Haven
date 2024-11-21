import { UserRepository } from "../../../application/interfaces/User/UserRepository";
import { UserDocument } from "../../database/models/UserModel";
import { GusetInfo, User } from "../../../domain/entities/User";
import UserModel from "../../database/models/UserModel";
import { EditUser } from "../../../domain/entities/EditUser";
import PropertyModel, { Property } from "../../database/models/PropertyModel";
import GuestModel from "../../database/models/GuestModel";
import ReservationModel from "../../database/models/ReserveModel";
import PaymentModel from "../../database/models/PaymentModel";
import WishlistModel from "../../database/models/WishlistModel";
import mongoose, { ObjectId } from "mongoose";
import WalletModel from "../../database/models/WalletModel";
import TransactionModel from "../../database/models/TransactionModel";
import ChatModel, { SenderRole } from "../../database/models/ChatModel";
import { Data } from "../../../domain/entities/Chat";
import { fetchHostel } from "../../../presentation/controllers/User/PropertyController";
import {config} from 'dotenv'
import RatingModel from "../../database/models/RatingModel";
import NotificationModel from "../../database/models/NotificationModel";

config()

export class UserRepositoryImpl implements UserRepository {
  async findUser(email: string): Promise<any | null> {
    return UserModel.findOne({ email: email });
  }

  async createUser(user: User): Promise<User> {
    try {
      console.log("userdatails", user);
      const createUser: UserDocument = await UserModel.create(user);
      console.log("created user data ", createUser);

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

  async fetchhostel(search: string): Promise<any | null> {
    // Define a filter object that will be used for the query
    let filter: any = {
      property_type: "hostel",
      propertyVerified: "approved",
      available:true
    };

    // If the search value is not empty, add a regex condition for name or location
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } }, // Case-insensitive search for name
        { location: { $regex: search, $options: "i" } }, // Case-insensitive search for location
      ];
    }

    // Fetch the properties based on the filter
    return await PropertyModel.find(filter).limit(8)
  }

  async fetchroom(search: string): Promise<any | null> {
    let filter: any = {
      property_type: "room",
      propertyVerified: "approved",
      available:true
    };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } }, // Case-insensitive search for name
        { location: { $regex: search, $options: "i" } }, // Case-insensitive search for location
      ];
    }

    return await PropertyModel.find(filter).limit(8)
  }

  async properttdetails(id: string): Promise<any | null> {
    return await PropertyModel.findById({ _id: id });
  }

  async addgusetinfo(data: GusetInfo): Promise<any | null> {
    if (data._id !== "") {
      const findGuest = await GuestModel.findById({ _id: data._id });
      console.log("it is working");

      if (findGuest) {
        return await GuestModel.findByIdAndUpdate(
          data._id,
          {
            $set: {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              mobile: data.mobile,
            },
          },
          { new: true }
        );
      }
    } else {
      const newGuest = await GuestModel.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile,
      });

      return newGuest;
    }
  }

  async reservation(
    totalPrice: string,
    guserId: string,
    userId: string,
    proId: string,
    durationInMonths: string,
    checkInDate: string,
    checkOutDate: string
  ): Promise<any | null> {
    const createReservation = await ReservationModel.create({
      total_price: totalPrice,
      user_id: userId,
      guest_info: guserId,
      property_id: proId,
      month: durationInMonths,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
    });

    const reduceRoom = await PropertyModel.findByIdAndUpdate(
      { _id: proId }, 
      {
        $inc: {
          "facilities.bedroom": -1,
        },
      },
      { new: true } 
    );
    

    return createReservation._id;
  }


  async payment(
    reservationId: string,
    userId: string,
    payment_method: string,
    amount: string,
    paymentStatus: string
  ): Promise<any | null> {
    
    const intAmount = parseInt(amount);
  
    // Calculate the split for admin and host
    const adminAmount = Math.round(intAmount * 0.10); // 10% to admin
    const hostAmount = intAmount - adminAmount;       // 90% to host
  
    // Run initial independent queries in parallel
    const [createPayment, findWallet, findReservation] = await Promise.all([
      PaymentModel.create({
        reservation_id: reservationId,
        user_id: userId,
        payment_method: payment_method,
        payment_status: paymentStatus,
        amount: intAmount,
      }),
      WalletModel.findOne({ user_Id: userId }),
      ReservationModel.findById({ _id: reservationId })
        .populate<{ property_id: Property }>("property_id")
        .exec(),
    ]);
  
    // Ensure the user has a wallet
    const userWallet = await WalletModel.findOneAndUpdate(
      { user_Id: userId },
      { $setOnInsert: { balance: 0 } },  // Only set balance to 0 if creating a new wallet
      { new: true, upsert: true }
    );
    
    // Debit user wallet and link payment to reservation
    await Promise.all([
      TransactionModel.create({
        wallet_Id: userWallet._id,
        amount: intAmount,
        transaction_type: "Debited",
      }),
      ReservationModel.findByIdAndUpdate(
        { _id: reservationId },
        { $set: { payment_Id: createPayment._id } }
      ),
    ]);
  
    // Upsert (create or update) the host wallet and increment balance by 90% of the amount
    const hostWallet = await WalletModel.findOneAndUpdate(
      { user_Id: findReservation?.property_id?.host_id },
      { $inc: { balance: hostAmount } },  // Increment balance by 90%
      { new: true, upsert: true }
    );
  
    // Create transaction for host wallet (90% credited)
    await TransactionModel.create({
      wallet_Id: hostWallet._id,
      amount: hostAmount,
      transaction_type: "Credited",
    });
  
    // Upsert (create or update) the admin wallet
    const adminWallet = await WalletModel.findByIdAndUpdate(
      { _id: process.env.ADMIN_WALLET_ID },  // Assume the admin's email is stored in .env
      { $inc: { balance: adminAmount } },  // Increment balance by 10%
      { new: true, upsert: true }
    );

    console.log(adminWallet,"admin wallet in the wallet session");
    
  
    // Create transaction for admin wallet (10% credited)
    await TransactionModel.create({
      wallet_Id: adminWallet._id,
      amount: adminAmount,
      transaction_type: "Credited",
    });
  
    console.log(createPayment._id, "payment id");
  
    return createPayment._id;
  }
  
  

  async wishlist(userId: string, proId: string): Promise<any | null> {
    try {
      const findUserWish = await WishlistModel.findOne({
        userId: userId,
        propertyId: proId,
      });
      console.log(findUserWish);
  
      if (findUserWish) {
        console.log("remove");
  
        const deletewish = await WishlistModel.deleteOne({
          userId: userId,
          propertyId: proId,
        });
        return { message: "remove" };
      } else {
        console.log("added");
  
        const wishlist = await WishlistModel.create({
          userId: userId,
          propertyId: proId,
        });
        return { message: "added" };
      }
    } catch (error) {
      
    }
  }

  async findWishlist(userId: string): Promise<string[] | null> {
    const findwish = await WishlistModel.find({ userId }).select("propertyId");

    if (findwish.length > 0) {
      // Convert each ObjectId to a string using toString()
      const propertyIds = findwish.map((wish) =>
        (wish.propertyId as mongoose.Types.ObjectId).toString()
      );
      return propertyIds;
    } else {
      return null; // Return null if no wishlist items found
    }
  }

  async fetchwishlist(id: string): Promise<any | null> {
   try {
    const wishlist = await WishlistModel.find({ userId: id })
    .populate("propertyId")
    .exec();
  return wishlist;
   } catch (error) {
    
   }
  }

  async removewish(id: string): Promise<any | null> {
   try {
    const remove = await WishlistModel.findByIdAndDelete({ _id: id });
    return remove;
   } catch (error) {
    
   }
  }

  async fetchwish(id: string, userId: string): Promise<any | null> {
    console.log(id, userId);
try {
  
  const data = await WishlistModel.findOne({
    userId: id,
    propertyId: userId,
  });
  console.log(data, "form repo");

  return data;
} catch (error) {
  
}
  }

  async paymentfailed(
    amount: string,
    reservationId: string,
    userId: string
  ): Promise<any | null> {
    try {
      const createPayment = await PaymentModel.create({
        amount: amount,
        reservation_id: reservationId,
        user_id: userId,
        payment_method: "Razorpay",
        payment_status: "Failed",
      });
  
      const update = await ReservationModel.findByIdAndUpdate(
        { _id: reservationId },
        {
          $set: {
            payment_Id: createPayment._id,
          },
        }
      );
      return createPayment._id;
    } catch (error) {
      
    }
   
  }

  async fetchreservation(id: string): Promise<any | null> {
   try {
    const data = await ReservationModel.find({ user_id: id })
    .populate("property_id")
    .populate("payment_Id")
    .populate("guest_info");
  return data;
   } catch (error) {
    
   }
  }

  async bookingdetails(id: string): Promise<any | null> {
    try {
      const data = await ReservationModel.findOne({ _id: id })
      .populate("property_id")
      .populate("payment_Id")
      .populate("guest_info");
    return data;
    } catch (error) {
      
    }
  }

  async retrypayment(id: string): Promise<any | null> {
   try {
    const update = await PaymentModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          payment_status: "success",
        },
      }
    );

    return update;
   } catch (error) {
    
   }
  }

  async connecthost(userId: string, hostId: string, data: Data): Promise<any | null> {
    try {
      const findConnection = await ChatModel.findOne({ user_id: userId, host_id: hostId });
  
      if (findConnection) {
        await ChatModel.findOneAndUpdate(
          { user_id: userId, host_id: hostId },
          {
            $push: {
              messages: {
                sender_id: userId, 
                sender_role: SenderRole.USER, // Assuming the sender is the user
                recipient_id: hostId, // Host is the recipient
                message: data.message,
                timestamp: new Date(data.time), // Using the time provided in the data
              },
            },
          },
          { new: true } // This returns the updated document
        );
  
        return "Message added to existing chat";
      } else {
        // If no chat connection exists, create a new chat and add the first message
        const createConnection = await ChatModel.create({
          user_id: userId,
          host_id: hostId,
          messages: [
            {
              sender_id: userId, // Assuming the user is sending the message
              sender_role: SenderRole.USER, // Assuming the sender is the user
              recipient_id: hostId, // Host is the recipient
              message: data.message,
              timestamp: data.time, // Using the time provided in the data
            },
          ],
        });
  
        return "New chat created and message added";
      }
    } catch (error) {
      console.error("Error in connecthost:", error);
      throw error;
    }
  }
  
  async fetchHost(hostId: string,userId:string): Promise<any | null> {
    try {
      const fetch=await UserModel.findById({_id:hostId})

      const message = await ChatModel.findOne(
        { user_id: userId, host_id: hostId },
        { _id: 0, messages: 1 } 
      );

      console.log(fetch,message ,"fetch message");
      

      return {fetch,message}
    } catch (error) {
      throw error
    }
  }

  async fetchConnection(userId: string): Promise<any | null> {
    try {
      const fetch=await ChatModel.find({user_id:userId}).populate('host_id')
      console.log(fetch,'fetch');
      
      return fetch
    } catch (error) {
      throw error
    }
  }

   async fetchusermessage(hostId: string, userId: string): Promise<any | null> {
    try {
      const fetch = await ChatModel.findOne(
        { user_id: userId, host_id: hostId },
        { _id: 0, messages: 1 } 
      );

      console.log(fetch,'message fastech');
      
      return fetch
      
    } catch (error) {
      throw error
    }
  }

  async fetchnearme(lat: number, lng: number): Promise<any | null> {
    try {
      const R = 6371; // Earth's radius in kilometers
    const maxDistance = 50000; // Maximum distance in meters

    const properties = await PropertyModel.aggregate([
      {
        $match: {
          property_type: "hostel",
          is_blocked: false
        }
      },
      {
        $addFields: {
          distance: {
            $multiply: [
              R,
              {
                $acos: {
                  $add: [
                    { 
                      $multiply: [
                        { $sin: { $degreesToRadians: { $toDouble: "$latitude" } } }, 
                        { $sin: { $degreesToRadians: lat } }
                      ] 
                    },
                    {
                      $multiply: [
                        { $cos: { $degreesToRadians: { $toDouble: "$latitude" } } },
                        { $cos: { $degreesToRadians: lat } },
                        { $cos: { $subtract: [{ $degreesToRadians: lng }, { $degreesToRadians: { $toDouble: "$longitude" } }] } }
                      ]
                    }
                  ]
                }
              }
            ]
          }
        }
      },
      {
        $match: {
          distance: { $lte: maxDistance / 1000 } // Convert maxDistance to kilometers
        }
      },
      {
        $sort: { distance: 1 } // Sort by nearest distance
      }
    ]);

    return properties;
    } catch (error) {
      
    }
}

async rateProperty(userId: string, proId: string, rate: number, review: string): Promise<any | null> {
  try {
    const propertyObjectId = new mongoose.Types.ObjectId(proId); // Convert proId to ObjectId

  const [createRating, fetchAvg] = await Promise.all([
    RatingModel.create({
      user_id: userId,
      property_id: propertyObjectId,  // Use the ObjectId
      rating_value: rate,
      review: review
    }),
    RatingModel.aggregate([
      {
        $match: { property_id: propertyObjectId }  // Ensure property_id is an ObjectId
      },
      {
        $group: {
          _id: "$property_id",  // Group by property_id
          averageRating: { $avg: "$rating_value" },  // Calculate the average of rating_value
          totalReviews: { $sum: 1 }  // Count the number of reviews
        }
      }
    ])
  ]);

  console.log(fetchAvg, "fetchAvg");

  // Check if fetchAvg array has at least one result
  if (fetchAvg.length > 0) {                                                
    const avgRating = fetchAvg[0].averageRating;

    // Update the property with the new average rating
    await PropertyModel.findByIdAndUpdate(
      { _id: proId },
      { $set: { avgRating: avgRating } }
    );
  } else {
    console.error("No ratings found for this property.");
  }

  return createRating?._id;
  } catch (error) {
    
  }
}



async fetchReview(proId:string): Promise<any | null> {
  try {
    const fetch=await RatingModel.find({property_id:proId}).populate('user_id')
  return fetch
  } catch (error) {
    
  }
  
}

async fetchNotifications(): Promise<any | null> {
  try {
    const fetch = await NotificationModel.find({ recipient: { $ne: "hosts" },is_read:false });
    return fetch
  } catch (error) {
    
  }
 

}

async deleteNotification(id: string): Promise<any | null> {
  try {
    const update=await NotificationModel.findById({_id:id},{
      $set:{is_read:true}
    })
  } catch (error) {
    
  }
  
}

async cancelResrevation(resId: string): Promise<any | null> {
  try {
    const update = await ReservationModel.findByIdAndUpdate(
      { _id: resId },
      { $set: { booking_status: 'canceled' } }
    );

    if (update) {
      const [findUserWallet, property, payment] = await Promise.all([
        WalletModel.findOne({ user_Id: update.user_id }),
        PropertyModel.findById({ _id: update.property_id }),
        PaymentModel.findById({ _id: update.payment_Id })
      ]);

      let userWalletId = findUserWallet?._id;

      if (!findUserWallet) {
        // Create a new wallet if the user has no existing wallet
        const newWallet = await WalletModel.create({
          user_Id: update.user_id,
          balance: payment?.amount || 0
        });
        userWalletId = newWallet._id;
      }

      if (!payment) {
        throw new Error("Payment not found");
      }

      // Add amount to the user's wallet
      await WalletModel.findByIdAndUpdate(
        { _id: userWalletId },
        { $inc: { balance: payment?.amount || 0 } }
      );

      // Create transaction for user wallet credit
      await TransactionModel.create({
        wallet_Id: userWalletId,
        amount: payment?.amount,
        transaction_type: 'Credited'
      });

      // Deduct amount from host's wallet
      if (property?.host_id) {
        const hostUpdate = await WalletModel.findOneAndUpdate(
          { user_Id: property.host_id },
          { $inc: { balance: -payment?.amount || 0 } }
        );

        if (hostUpdate) {
          // Create transaction for host wallet debit
          await TransactionModel.create({
            wallet_Id: hostUpdate._id,
            amount: payment?.amount,
            transaction_type: 'Debited'
          });
        }
      }
    }
    return update;
  } catch (error) {
    throw error;
  }
}

}
