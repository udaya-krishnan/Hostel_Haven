import { Router } from "express";
import { verifyhost, verifyOtp ,resendHost} from "../../controllers/Host/HostAuthController";

const hostRouter=Router()

hostRouter.post('/login',verifyhost)
          .post('/verify',verifyOtp)
          .get('/resend',resendHost)

export default hostRouter