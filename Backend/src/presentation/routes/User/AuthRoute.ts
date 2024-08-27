import { Router } from "express";
import { googleRegister, loginUser, otpVerify, register, resendUser, verifyemail,forgotPassword } from "../../controllers/User/AuthController";
import { updateProfile, uploadImag } from "../../controllers/User/ProfileController";
import { upload } from "../../../config/multer";


const userRouter=Router()

userRouter.post('/register',register)
          .post('/verify',otpVerify)
          .post('/login',loginUser)
          .get('/resend',resendUser)
          .post('/google',googleRegister)
          .post('/verifyemail',verifyemail)
          .post('/forgot',forgotPassword)
          .post('/editprofile',updateProfile)
          .post('/upload',upload.single("file"),uploadImag)

export default userRouter