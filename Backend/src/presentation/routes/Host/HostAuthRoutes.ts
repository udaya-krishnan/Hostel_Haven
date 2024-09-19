import { Router } from "express";
import { verifyhost, verifyOtp ,resendHost} from "../../controllers/Host/HostAuthController";
import { changepassword, hostupdateProfile ,uploadImag} from "../../controllers/Host/HostProfileController";
import { upload } from "../../../config/multer";
import { addproperty, availableProperty, fetchamenities, fetchProperty, fetchReservation, fetchsafety, updateProperty } from "../../controllers/Host/HostPropertyController";
// import { fet } from "../../controllers/Admin/AdminSafetyController";


const hostRouter=Router()

hostRouter.post('/login',verifyhost)
          .post('/verify',verifyOtp)
          .get('/hostresend',resendHost)
          .post('/hosteditprofile',hostupdateProfile)
          .post('/uploadphoto',upload.single("file"),uploadImag)
          .post('/changepass',changepassword)
          .get('/amenities',fetchamenities)
          .get('/safety',fetchsafety)
          .post('/addproperty',upload.fields([
            { name: 'propertyCertificate', maxCount: 1 },
            { name: 'propertyImages', maxCount: 10 }
          ]),addproperty)
          .post('/property',fetchProperty)
          .post('/updateproperty', upload.array('propertyImages', 5), updateProperty)
          .post('/available',availableProperty)
          .post('/fetchreservation',fetchReservation)
          .post('/actionreservation',)


export default hostRouter