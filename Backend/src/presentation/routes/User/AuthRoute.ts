import { Router } from "express";
import { googleRegister, loginUser, otpVerify, register, resendUser } from "../../controllers/User/AuthController";


const userRouter=Router()

userRouter.post('/register',register)
          .post('/verify',otpVerify)
          .post('/login',loginUser)
          .get('/resend',resendUser)
          .post('/google',googleRegister)

export default userRouter