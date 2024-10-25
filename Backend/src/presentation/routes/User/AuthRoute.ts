import { Router } from "express";
import { googleRegister, loginUser, otpVerify, register, resendUser, verifyEmail,forgotPassword } from "../../controllers/User/AuthController";
import { changepassword, updateProfile, uploadImag } from "../../controllers/User/ProfileController";
import { upload } from "../../../config/multer";
import { fetchHostel, fetchNearMe, fetchReivew, fetchRoom, fetchwish, fetchwishlist, findWish, propertyDetails, rateProperty, removewish, wishlist } from "../../controllers/User/PropertyController";
import { bookingDetails, CancelReservation, continuePayment, fetchReservation, paymentFailed, razorpayOrder, RetryVerify, verifyRazorpay } from "../../controllers/User/PaymentRazorpay";
import { addGusetInfo } from "../../controllers/User/GusetController";
import { UserMid } from "../../../middleware/User/userMiddleware";
import { connectHost, fetchConnection, fetchHost, fetchNotifications, fetchUserMessage } from "../../controllers/User/ChatController";


const userRouter=Router()

userRouter.post('/register',register)
          .post('/verify',otpVerify)
          .post('/login',loginUser)
          .get('/resend',resendUser)
          .post('/google',googleRegister)
          .post('/verifyemail',verifyEmail)
          .patch('/forgot',forgotPassword)
          .put('/editprofile',UserMid,updateProfile)
          .patch('/upload',UserMid,upload.single("file"),uploadImag)
          .patch('/changepassword',UserMid,changepassword)
          .get('/fetchhostel',fetchHostel)
          .get('/fetchroom',fetchRoom)
          .get('/propertydetails',propertyDetails)
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
          .post('/connecthost',UserMid,connectHost)
          .get('/fetchhost',UserMid,fetchHost)
          .get('/fetchconnection',UserMid,fetchConnection)
          .get('/fetchmessage',UserMid,fetchUserMessage)
          .get('/nearme',fetchNearMe)
          .post('/rate',rateProperty)
          .get('/fetchreview',fetchReivew)
          .get('/fetchnotifications',fetchNotifications)
          .patch('/cancel',CancelReservation)
        

export default userRouter