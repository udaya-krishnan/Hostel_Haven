import { Router } from "express";
import { verifyhost, verifyOtp } from "../../controllers/Host/HostAuthController";

const hostRouter=Router()

hostRouter.post('/login',verifyhost)
          .post('/verify',verifyOtp)
          .get('/resend',)

export default hostRouter