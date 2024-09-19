import { Router } from "express";
import { googleRegister, loginUser, otpVerify, register, resendUser, verifyemail,forgotPassword } from "../../controllers/User/AuthController";
import { changepassword, updateProfile, uploadImag } from "../../controllers/User/ProfileController";
import { upload } from "../../../config/multer";
import { fetchHostel, fetchRoom, fetchwishlist, findWish, propertyDetails, removewish, wishlist } from "../../controllers/User/PropertyController";
import { razorpayOrder, verifyRazorpay } from "../../controllers/User/PaymentRazorpay";
import { addGusetInfo } from "../../controllers/User/GusetController";


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
          .post('/changepassword',changepassword)
          .get('/fetchhostel',fetchHostel)
          .get('/fetchroom',fetchRoom)
          .post('/propertydetails',propertyDetails)
          .post('/razorpay',razorpayOrder)
          .post('/razorpayverify',verifyRazorpay)
          .post('/gusetinfo',addGusetInfo)
          .post('/wishlist',wishlist)
          .post('/findwish',findWish)
          .post('/fetchwish',fetchwishlist)
          .post('/removewish',removewish)

export default userRouter