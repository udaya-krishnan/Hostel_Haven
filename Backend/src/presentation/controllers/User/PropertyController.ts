import { UserRepositoryImpl } from "../../../infrastructure/repositories/UserRepo/UserRepositoryImpl";
import { Response,Request } from "express";
import { PropertyService } from "../../../application/services/UserService/PropertyService";
import { log } from "console";

const userRepository=new UserRepositoryImpl()

const propertyerivice=new PropertyService(userRepository)

export const fetchHostel = async (req: Request, res: Response) => {
    try {
        // Ensure search is a string or set it to an empty string if undefined
        const search = typeof req.query.search === 'string' ? req.query.search : '';
        
        const hostels = await propertyerivice.fetchhostel(search);
        res.status(200).json({ hostels });
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({ message: 'An error occurred while fetching hostels' });
    }
}

export const fetchRoom=async(req:Request,res:Response)=>{
    try {
        // Ensure search is a string or set it to an empty string if undefined
        const search = typeof req.query.search === 'string' ? req.query.search : '';
        
        const rooms = await propertyerivice.fetchroom(search);
        res.status(200).json({ rooms });
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({ message: 'An error occurred while fetching hostels' });
    }
}

export const propertyDetails=async(req:Request,res:Response)=>{
    try {
        const id = typeof req.query.id === 'string' ? req.query.id : '';
        const data=await propertyerivice.propertydetails(id)
        res.status(200).json({data:data})
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const wishlist=async(req:Request,res:Response)=>{
    try {
        console.log('hai herte');
        
        const {id,proId}=req.body
        console.log(id,proId,"dsjsdjsd");
        
        const wish=await propertyerivice.wishlist(id,proId)
        console.log(wish);
        if(wish.message=="remove"){
            res.status(200).json({message:"remove"})
        }else{
            res.status(200).json({message:"added"})
        }

    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const findWish=async(req:Request,res:Response)=>{
    try {
        const userId=req.body.userId
        // const proId=req.body.proId
        console.log(userId);
        
        const wish=await propertyerivice.findwish(userId)
        console.log(wish,"wish");
        
       res.status(200).json({wish:wish})
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const fetchwishlist=async(req:Request,res:Response)=>{
    try {
        
        console.log('wish controller');
        
        const id=req.body.id

        const  wishlist=await propertyerivice.fetchwishlist(id)
        console.log(wishlist,"wsissjsdjf");
        

        res.status(200).json({wishlist:wishlist})
        
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const removewish=async (req:Request,res:Response)=>{
    try {
        const id=req.body.id
        const userId=req.body.userId

        const remove=await propertyerivice.removewish(id)
        if(remove){
            const wishlist=await propertyerivice.fetchwishlist(userId)

            res.status(200).json({wishlist:wishlist})
        }

    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const fetchwish=async(req:Request,res:Response)=>{
    try {
        const {id,userId}=req.body
        const find=await propertyerivice.fetchwish(id,userId)
        console.log(find);
        
        if(find){
            res.status(200).json({message:true})
        }else{
            res.status(200).json({message:false})
        }
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const fetchNearMe = async (req: Request, res: Response) => {
  try {
    const lat = req.query.lat;
    const lng = req.query.lng;

    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    const latitude = parseFloat(lat as string); 
    const longitude = parseFloat(lng as string);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ message: 'Invalid latitude or longitude' });
    }
    const data = await userRepository.fetchnearme(latitude, longitude);

    return res.status(200).json({hostels:data});

  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const rateProperty=async(req:Request,res:Response)=>{
    try {

        const {userId,proId,rate,review}=req.body

        const response=await userRepository.rateProperty(userId,proId,rate,review)

        if(response){
            res.status(201).json({response:response})
        }
        
    } catch (error:any) {
        console.error(error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
    }
}



export const fetchReivew=async(req:Request,res:Response)=>{
    try {

        const proId=typeof req.query.proId === 'string' ? req.query.proId : '';

        const response=await userRepository.fetchReview(proId)

        if(response){
            res.status(201).json({response:response})
        }
        
    } catch (error:any) {
        console.error(error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

