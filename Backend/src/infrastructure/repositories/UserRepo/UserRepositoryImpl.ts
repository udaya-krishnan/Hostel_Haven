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
import mongoose, { ObjectId } from "mongoose";

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
    };
  
    // If the search value is not empty, add a regex condition for name or location
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },  // Case-insensitive search for name
        { location: { $regex: search, $options: "i" } },  // Case-insensitive search for location
      ];
    }
  
    // Fetch the properties based on the filter
    return await PropertyModel.find(filter);
  }
  

  async fetchroom(search:string): Promise<any | null> {
    return await PropertyModel.find({
      property_type: "room",
      propertyVerified: "approved",
    });
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

    return createReservation._id;
  }

  async payment(
    reservationId: string,
    userId: string,
    payment_method: string,
    amount: string,
    paymentStatus: string
  ): Promise<any | null> {
    const createPayment = await PaymentModel.create({
      reservation_id: reservationId,
      user_id: userId,
      payment_method: payment_method,
      payment_status: paymentStatus,
      amount: amount,
    });
    console.log(createPayment._id, "payment id");

    const updatereservation = await ReservationModel.findByIdAndUpdate(
      { _id: reservationId },
      {
        $set: {
          payment_Id: createPayment._id,
        },
      }
    );
    return createPayment._id;
  }

  async wishlist(userId: string, proId: string): Promise<any | null> {
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
    const wishlist = await WishlistModel.find({ userId: id })
      .populate("propertyId")
      .exec();
    return wishlist;
  }

  async removewish(id: string): Promise<any | null> {
    const remove = await WishlistModel.findByIdAndDelete({ _id: id });
    return remove;
  }

  async fetchwish(id: string, userId: string): Promise<any | null> {
    console.log(id, userId);

    const data = await WishlistModel.findOne({
      userId: id,
      propertyId: userId,
    });
    console.log(data, "form repo");

    return data;
  }

  async paymentfailed(
    amount: string,
    reservationId: string,
    userId: string
  ): Promise<any | null> {
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
  }

  async fetchreservation(id: string): Promise<any | null> {
    const data = await ReservationModel.find({ user_id: id })
      .populate("property_id")
      .populate("payment_Id")
      .populate("guest_info");
    return data;
  }

  async bookingdetails(id: string): Promise<any | null> {
    const data = await ReservationModel.findOne({ _id: id })
      .populate("property_id")
      .populate("payment_Id")
      .populate("guest_info");
    return data;
  }

  async retrypayment(id: string): Promise<any | null> {
    const update=await PaymentModel.findByIdAndUpdate({_id:id},{
      $set:{
        payment_status:"success"
      }
    })

    return update
  }
}
