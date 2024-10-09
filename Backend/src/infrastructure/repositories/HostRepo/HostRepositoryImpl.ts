import { HostRepository } from "../../../application/interfaces/Host/HostRepository";
import { EditHost } from "../../../domain/entities/EditHost";
import UserModel from "../../database/models/UserModel";
import AmenitesModel from "../../database/models/AmenitesModel";
import SafetyModel from "../../database/models/SafetyModel";
import PropertyModel from "../../database/models/PropertyModel";
import ReservationModel from "../../database/models/ReserveModel";
import { ObjectId, Transaction } from "mongodb";
import PaymentModel from "../../database/models/PaymentModel";
import WalletModel from "../../database/models/WalletModel";
import TransactionModel from "../../database/models/TransactionModel";
  
export class HostRepositoryImpl implements HostRepository {
  async findHost(email: string): Promise<any | null> {
    return UserModel.findOne({ email: email });
  } 

  async ruleChange(email: string): Promise<any | null> {
    return UserModel.findOneAndUpdate(
      { email: email },
      {
        userType: "host",
      },
      { new: true }
    ).select("-password");
  }

  async edit(values: EditHost): Promise<any | null> {
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

  async fetchamenities(): Promise<any | null> {
    return await AmenitesModel.find({ is_blocked: false });
  }

  async fetchsafety(): Promise<any | null> {
    return await SafetyModel.find({ is_blocked: false });
  }

  async addProperty(data: any): Promise<any | null> {
    return await PropertyModel.create({
      name: data.name,
      description: data.description,
      property_type: data.property_type,
      host_id: data.host_id,
      location: data.location,
      latitude: data.latitude,
      longitude: data.longitude,
      regularPrice: data.regularPrice,
      offerPrice: data.offerPrice || "",
      image: data.image,
      amenities: data.amenities,
      safety: data.safety,
      policies: data.policies,
      facilities: data.facilities,
      accommodation: data.accommodation,
      forwhom: data.forwhom,
      license_number: data.license_number,
      certificate: data.certificate,
    });
  }

  async fetchproperty(id: string): Promise<any | null> {
    return await PropertyModel.find({ host_id: id });
  }

  async updateproperty(data: any, id: string): Promise<any | null> {

    if(data.image.length===5){
      return await PropertyModel.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            name: data.name,
            description: data.description,
            property_type: data.property_type,
            location: data.location,
            latitude: data.latitude,
            longitude: data.longitude,
            regularPrice: data.regularPrice,
            offerPrice: data.offerPrice || "",
            image: data.image,
            amenities: data.amenities,
            safety: data.safety,
            policies: data.policies,
            facilities: data.facilities,
            accommodation: data.accommodation,
            forwhom: data.forwhom,
          },
        }
      );
    }else{
      return await PropertyModel.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            name: data.name,
            description: data.description,
            property_type: data.property_type,
            location: data.location,
            latitude: data.latitude,
            longitude: data.longitude,
            regularPrice: data.regularPrice,
            offerPrice: data.offerPrice || "",
            amenities: data.amenities,
            safety: data.safety,
            policies: data.policies,
            facilities: data.facilities,
            accommodation: data.accommodation,
            forwhom: data.forwhom,
          },
        }
      );
    }
    
  }

  async available(id: string): Promise<any | null> {
    const fin = await PropertyModel.findById({ _id: id });
    if (fin?.available === true) {
      return await PropertyModel.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            available: false,
          },
        }
      );
    } else {
      return await PropertyModel.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            available: true,
          },
        }
      );
    }
  }


  async fetchreservation(id: string): Promise<any | null> {
    try {
      const properties = await PropertyModel.find({
        host_id: new ObjectId(id),
      });
      console.log("Properties:", properties);
  
      if (!properties.length) {
        console.log("No properties found for this host.");
        return [];
      }
  
      const propertyIds = properties.map((property) => property._id);
  
      console.log(propertyIds,"ishishfihdf");
      
      const reservations = await ReservationModel.find({
        property_id: { $in: propertyIds },
      })
        .populate('user_id', 'name')  // Populating user details
        .populate('property_id', 'name location image')
        .populate('guest_info','firstName lastName email mobile') 
        .populate('payment_Id') 
  
      console.log("Reservations:", reservations);
  
      return reservations;
    } catch (error) {
      console.error("Error fetching reservations:", error);
      return null;
    }
  }

  async actionreservation(action: any, id: any): Promise<any | null> {
    const updateAction=await ReservationModel.findByIdAndUpdate({_id:id},{
      $set:{
        booking_status:action                                                 
      }

      
    })

    if(action==='Approved'){
      const property=await PropertyModel.findByIdAndUpdate({_id:updateAction?.payment_Id},{
        $inc:{
          'facilities.bedroom':-1
        }
      })
    }

    return updateAction
  }

  async fetchpayment(id: string): Promise<any | null> {
   

    const findwallet=await WalletModel.findOne({user_Id:id})

    if(findwallet){
      const allTransactions=await TransactionModel.find({wallet_Id:findwallet._id})

      return [findwallet,allTransactions]
    }else{
      return ["No Wallet",'No Transactions']
    }


  }

  async addAmount(hostId: string, amount: number): Promise<any | null> {
 
    const findWallet = await WalletModel.findOne({ user_Id: hostId });
    
    let walletId: string;
  
    if (findWallet) {
   
      walletId = findWallet._id;
      await WalletModel.findByIdAndUpdate(walletId, { $inc: { balance: amount } });
    } else {
     
      const createWallet = await WalletModel.create({
        user_Id: hostId,
        balance: amount
      });
      walletId = createWallet._id;
    }
  

    const createTransaction = TransactionModel.create({
      amount,
      wallet_Id: walletId,
      transaction_type: "Credited"
    });
  
   
    await Promise.all([createTransaction]);
  
    return  walletId
  }


  
  
  
}
