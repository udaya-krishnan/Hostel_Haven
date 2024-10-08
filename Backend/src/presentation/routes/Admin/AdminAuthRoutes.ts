import { Router } from "express";
import { adminLogin } from "../../controllers/Admin/AdminAuthController";
import { actionUser, fetchingUserData, userDetails } from "../../controllers/Admin/AdminUserController";
import { approveProperty, fetchingHostData, fetchProperty, hostDetails, propertyDetails, rejecteProperty } from "../../controllers/Admin/AdminHostController";
import { actionAmenities, addAmenitie, fetchamenities, updateAmenities } from "../../controllers/Admin/AdminAmenitiesController";
import { actionSafety, addSafety, fetchSafety, updateSafety } from "../../controllers/Admin/AdminSafetyController";
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

export default adminRoute
