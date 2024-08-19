import { Router } from "express";
import { loginUser, otpVerify, register } from "../../controllers/User/AuthController";


const userRouter=Router()

userRouter.post('/register',register)
          .post('/verify',otpVerify)
          .post('/login',loginUser)

export default userRouter