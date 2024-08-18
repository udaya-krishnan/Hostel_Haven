import { Request, Response } from "express";
import { RegisterService } from "../../application/services/RegisterService";
import { UserRepositoryImpl } from "../../infrastructure/repositories/UserRepositoryImpl";
import { generateOtp } from "../../utils/otp"; 
import sendMail from "../../utils/sendMail";


const userRepository = new UserRepositoryImpl();
const registerService = new RegisterService(userRepository);

export const register = async (req: Request, res: Response) => {
  try {

    const { name, email, password, userType } = req.body;
    console.log(name, email, password);
    const userExists=await registerService.find(email)
    if(userExists){
        res.status(200).json({message:"email exists"})
    }else{

        const otp=generateOtp()

        const data = {
            name: name,
            email: email,
            password: password,
            userType: userType,
            otp: otp,
          };
          
          (req.session as any).data = data
          

           await sendMail(email,otp,name)

        return res.status(200).json({otp:otp,message:"otp send success"})
        // const userId = await registerService.execute({ name, email, password, userType });
    }

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
