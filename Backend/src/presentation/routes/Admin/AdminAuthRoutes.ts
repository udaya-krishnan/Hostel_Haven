import { Router } from "express";
import { adminLogin } from "../../controllers/Admin/AdminAuthController";
const adminRoute=Router()


adminRoute.post('/login',adminLogin)
