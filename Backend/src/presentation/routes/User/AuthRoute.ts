import { Router } from "express";
import { googleRegister, loginUser, otpVerify, register, resendUser, verifyemail,forgotPassword } from "../../controllers/User/AuthController";


const userRouter=Router()

userRouter.post('/register',register)
          .post('/verify',otpVerify)
          .post('/login',loginUser)
          .get('/resend',resendUser)
          .post('/google',googleRegister)
          .post('/verifyemail',verifyemail)
          .post('/forgot',forgotPassword)

export default userRouter