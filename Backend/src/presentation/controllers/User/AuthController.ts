import { Request, Response } from "express";
import { RegisterService } from "../../../application/services/UserService/RegisterService";
import { UserRepositoryImpl } from "../../../infrastructure/repositories/UserRepo/UserRepositoryImpl";
import { generateOtp } from "../../../utils/otp"; 
import sendMail from "../../../utils/sendMail";
import { createToken, verifyToken } from "../../../utils/jwt";
import dotenv from 'dotenv';
import { LoginService } from "../../../application/services/UserService/LoginService";

dotenv.config();

const userRepository = new UserRepositoryImpl();
const registerService = new RegisterService(userRepository);
const loginService = new LoginService(userRepository);

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, userType } = req.body;
    const userExists = await registerService.find(email);
    
    if (userExists) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const otp = generateOtp();
    console.log(otp);
    
    const data = { name, email, password, userType, otp, message: "register" };
    const token = await createToken(data, res);
    
    await sendMail(email, otp, name);
    
    return res.status(201).json({ message: "OTP sent successfully", token });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// export const otpVerify = async (req: Request, res: Response) => {
//   try {
//     const token = req.cookies.accessToken;
//     const decodedData = await verifyToken(token);
//     console.log(decodedData,"decoded data form");
    
//     if (!decodedData) {
//       return res.status(401).json({ message: "Session expired or invalid token" });
//     }

//     const { name, email, password, userType, otp } = decodedData;
    
//     if (otp === req.body.otp) {
//       console.log(otp,'same otp');
      
//       const image = 'anony.webp';
//       const userData = await registerService.execute({ name, email, password, userType, image });
//       const userToken = await createToken({ email, userType: 'user' }, res);
      
//       return res.status(200).json({ message: "OTP verified, registration successful", userData, token: userToken });
//     }

//     return res.status(400).json({ message: "Incorrect OTP" });
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await loginService.execute(email, password);

    if (data === "Email was wrong") {
      return res.status(401).json({ message: "Incorrect email" });
    }

    if (data === "Password was wrong") {
      return res.status(401).json({ message: "Incorrect password" });
    }

    if (data === "Account blocked") {
      return res.status(403).json({ message: "Account blocked" });
    }

    const { name, userType, image, mobile, about, location, work, pinCode, _id } = data;
    const token = await createToken({ name, email, userType, image, mobile, about, location, work, pinCode, _id }, res);
    
    return res.status(200).json({ data: { name, email, userType, image, mobile, about, location, work, pinCode, _id }, token });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};


export const resendUser = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.accessToken;
    const decoded = await verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({ message: "Session expired or invalid token" });
    }

    const otp = generateOtp();
    console.log(otp,'resend otp');
    
    const { exp, ...dataWithoutExp } = decoded; // Remove the "exp" property
    const data = { ...dataWithoutExp, otp }; // Add the OTP to the payload

    await createToken(data, res); // Create a new token with the updated payload
    await sendMail(decoded.email, otp, decoded.name);

    return res.status(200).json({ message: "OTP resent successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const googleRegister = async (req: Request, res: Response) => {
  try {
    const { email, displayName, photoURL } = req.body.data;
    const userType = req.body.userType;
    const user = { email, name: displayName, image: photoURL, userType };
    
    const userExists = await registerService.find(email);
    const token = await createToken(user, res);
    
    if (userExists) {
      return res.status(200).json({ user: userExists, token, message: "User already exists" });
    }

    const newUser = await registerService.GoogleRegister(user);
    
    return res.status(201).json({ user: newUser, token, message: "New user created" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const userExists = await registerService.find(email);

    if (userExists) {
      const otp = generateOtp();
      const data = { otp, email: userExists.email, name: userExists.name, password: userExists.password, userType: userExists.userType, message: "forgot" };
      
      await createToken(data, res);
      await sendMail(email, otp, userExists.name);
      console.log(otp);
      
      return res.status(200).json({ message: "OTP sent successfully" });
    }

    return res.status(404).json({ message: "User not found" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { newPassword } = req.body.data;
    const token = req.cookies.accessToken;
    const decoded = await verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({ message: "Session expired or invalid token" });
    }

    await registerService.forgotpass(decoded.email, newPassword);

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};












export const otpVerify = async (req: Request , res: Response) => {
  try {
    console.log("hai there");
    const token = req.cookies.accessToken
    // console.log(token);
    const decodedData = await verifyToken(token)
    console.log(decodedData);
    
    if (!decodedData) {
      return res.status(400).json({ message: "Session expired or invalid token"  });
    }
    if(decodedData.message==="register"){
     
      const { name, email, password, userType, otp } = decodedData;
  
      // console.log("Session Data:", sessionData);
      
  
      if (otp === req.body.otp) {
        
        let image='anony.webp'
        const userData=await registerService.execute({ name, email, password, userType ,image});
        
        const token =await createToken({email:email,userType:userType},res)
        
        return res.status(200).json({ message: "OTP verified, registration successful",userData:userData,token:token });
      } else {
        console.log('incorrect otp');
        
        return res.status(400).json({ message: "Incorrect OTP" });
      }
    }else if(decodedData.message==="forgot"){
      const {otp,email,password,userType,name}=decodedData;
      if(req.body.otp===otp){
        console.log('verify the otp');
        
        return res.status(200).json({message:"Otp verified "})
      }else{
        return res.status(400).json({ message: "Incorrect OTP" });
      }
    }
    // console.log(decodedData);
    
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
