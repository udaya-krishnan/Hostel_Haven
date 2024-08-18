import { Router } from "express";
import { register } from "../controllers/AuthController";


const userRouter=Router()

userRouter.post('/register',register)

export default userRouter