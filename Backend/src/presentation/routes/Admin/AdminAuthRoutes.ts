import { Router } from "express";
import { adminLogin } from "../../controllers/Admin/AdminAuthController";
import { actionUser, fetchAllDetails, fetchingUserData, userDetails } from "../../controllers/Admin/AdminUserController";
import { approveProperty, fetchingHostData, fetchProperty, fetchRating, hostDetails, propertyDetails, rejecteProperty } from "../../controllers/Admin/AdminHostController";
import { actionAmenities, addAmenitie, fetchamenities, updateAmenities } from "../../controllers/Admin/AdminAmenitiesController";
import { actionSafety, addSafety, fetchSafety, updateSafety } from "../../controllers/Admin/AdminSafetyController";
import { actionCoupon, addcoupon, editCoupon, fetchCoupon } from "../../controllers/Admin/AdminCouponController";
import { editBanner, fetchBanner } from "../../controllers/Admin/AdminBannerController";
import { upload } from "../../../config/multer";
import { fetchWalletHistory } from "../../controllers/Admin/AdminWalletController";
import { sendNotication } from "../../controllers/Admin/AdminNotificationController";
const adminRoute=Router()


adminRoute.post('/login',adminLogin)
          .get('/fetchuser',fetchingUserData)
          .post('/actionuser',actionUser)
          .get('/fetchhost',fetchingHostData)
          .post('/userdetails',userDetails)
          .post('/hostdetails',hostDetails)
          .post('/addamenities',addAmenitie)
          .get('/fetchamenities',fetchamenities)
          .post('/actionamenities',actionAmenities)
          .post('/updateamenities',updateAmenities)
          .post('/addsafety',addSafety)
          .get('/fetchsafety',fetchSafety)
          .post('/actionsafety',actionSafety)
          .post('/updatesafety',updateSafety)
          .post('/hostproperty',fetchProperty)
          .post('/propertydetails',propertyDetails)
          .post('/approve',approveProperty)
          .post('/reject',rejecteProperty)
          .post('/addcoupon',addcoupon)
          .get('/fetchcoupon',fetchCoupon)
          .post('/actioncoupon',actionCoupon)
          .post('/editcoupon',editCoupon)
          .get('/fetchbanner',fetchBanner)
          .put('/editbanner',upload.single('image'),editBanner)
          .get('/fetchwallet',fetchWalletHistory)
          .get('/fetch',fetchAllDetails)
          .get('/rating',fetchRating)
          .post('/send',sendNotication)

export default adminRoute
