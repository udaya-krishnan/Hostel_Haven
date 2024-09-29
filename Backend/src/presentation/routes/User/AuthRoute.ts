import { Router } from "express";
import { googleRegister, loginUser, otpVerify, register, resendUser, verifyemail,forgotPassword } from "../../controllers/User/AuthController";
import { changepassword, updateProfile, uploadImag } from "../../controllers/User/ProfileController";
import { upload } from "../../../config/multer";
import { fetchHostel, fetchRoom, fetchwish, fetchwishlist, findWish, propertyDetails, removewish, wishlist } from "../../controllers/User/PropertyController";
import { bookingDetails, continuePayment, fetchReservation, paymentFailed, razorpayOrder, RetryVerify, verifyRazorpay } from "../../controllers/User/PaymentRazorpay";
import { addGusetInfo } from "../../controllers/User/GusetController";
import { UserMid } from "../../../middleware/User/userMiddleware";


const userRouter=Router()

userRouter.post('/register',register)
          .post('/verify',otpVerify)
          .post('/login',loginUser)
          .get('/resend',resendUser)
          .post('/google',googleRegister)
          .post('/verifyemail',verifyemail)
          .patch('/forgot',forgotPassword)
          .put('/editprofile',UserMid,updateProfile)
          .patch('/upload',UserMid,upload.single("file"),uploadImag)
          .patch('/changepassword',UserMid,changepassword)
          .post('/fetchhostel',fetchHostel)
          .post('/fetchroom',fetchRoom)
          .post('/propertydetails',propertyDetails)
          .post('/razorpay',UserMid,razorpayOrder)
          .post('/razorpayverify',UserMid,verifyRazorpay)
          .post('/gusetinfo',UserMid,addGusetInfo)
          .post('/wishlist',UserMid,wishlist)
          .post('/findwish',UserMid,findWish)
          .post('/fetchwish',UserMid,fetchwishlist)
          .delete('/removewish',UserMid,removewish)
          .post('/wish',UserMid,fetchwish)
          .post('/paymentfailed',UserMid,paymentFailed)
          .post('/fetchreservation',UserMid,fetchReservation)
          .post('/bookingdetails',UserMid,bookingDetails)
          .post('/continuepayment',UserMid,continuePayment)
          .post('/retryverify',UserMid,RetryVerify)
        

export default userRouter