import { Router } from "express";
import { verifyhost, verifyOtp ,resendHost} from "../../controllers/Host/HostAuthController";
import { changepassword, hostupdateProfile ,uploadImag} from "../../controllers/Host/HostProfileController";
import { upload } from "../../../config/multer";

const hostRouter=Router()

hostRouter.post('/login',verifyhost)
          .post('/verify',verifyOtp)
          .get('/hostresend',resendHost)
          .post('/hosteditprofile',hostupdateProfile)
          .post('/uploadphoto',upload.single("file"),uploadImag)
          .post('/changepass',changepassword)

export default hostRouter