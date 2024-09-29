import { Request, Response, NextFunction } from "express";
import { createAccess, verifyToken } from "../../utils/jwt";

export const HostMid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Middleware controller initialized');

    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    console.log('Access Token:', accessToken);
    if(accessToken){  
      try {
        const verifyAccessToken = await verifyToken(accessToken);
        console.log('Access Token Verified:', verifyAccessToken);
        return next();
      } catch (error: any) {
        console.log('Access Token verification error:', error.message);
        
        if (error.message === 'jwt expired') {
          console.log('Access token expired, verifying refresh token');
          try {
            const verifyRefreshToken = await  verifyToken(refreshToken);
            console.log('Refresh Token Verified:', verifyRefreshToken);
            // Optionally, generate a new access token
            const newAccessToken =await createAccess(verifyRefreshToken, res);
            console.log(newAccessToken,'settting cookie');
            
  
            
            res.cookie("accessToken", newAccessToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
              maxAge: 3 * 60 * 1000 
            });
  
            return next();
          } catch (refreshError) {
            console.log('Refresh token verification failed:', refreshError);
            return res.status(403).json({ message: "Refresh token expired or invalid" });
          }
        } else {
          // Handle invalid token or other errors
          return res.status(401).json({ message: "Invalid access token" });
        }
      }
    }else if(refreshToken){

      try {
        const verifyRefreshToken = await  verifyToken(refreshToken);
        console.log('Refresh Token Verified:', verifyRefreshToken);

        // Optionally, generate a new access token
        const newAccessToken =await createAccess(verifyRefreshToken, res);
        console.log(newAccessToken,'settting cookie');
        

        
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 30 * 60 * 1000 
        });

        return next();
      } catch (refreshError) {
        console.log('Refresh token verification failed:', refreshError);
        return res.status(403).json({ message: "Refresh token expired or invalid" });
      }

      

    }else{
      return res.status(403).json({ message: "Refresh token expired or invalid" });
    }
    
  
  } catch (error: any) {
    console.error("Middleware Error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
