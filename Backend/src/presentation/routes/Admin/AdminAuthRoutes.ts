import { Router } from "express";
import { adminLogin } from "../../controllers/Admin/AdminAuthController";
import { fetchingUserData } from "../../controllers/Admin/AdminUserController";
const adminRoute=Router()


adminRoute.post('/login',adminLogin)
          .get('/fetchuser',fetchingUserData)

export default adminRoute
