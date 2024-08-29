import { Router } from "express";
import { adminLogin } from "../../controllers/Admin/AdminAuthController";
import { actionUser, fetchingUserData, userDetails } from "../../controllers/Admin/AdminUserController";
import { fetchingHostData, hostDetails } from "../../controllers/Admin/AdminHostController";
import { actionAmenities, addAmenitie, fetchamenities } from "../../controllers/Admin/AdminAmenitiesController";
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

export default adminRoute
