import { Router } from "express";
import { verifyhost, verifyOtp ,resendHost} from "../../controllers/Host/HostAuthController";
import { changepassword, hostupdateProfile ,uploadImag} from "../../controllers/Host/HostProfileController";
import { upload } from "../../../config/multer";
import { addproperty, availableProperty, fetchamenities, fetchProperty, fetchReservation, fetchsafety, updateProperty } from "../../controllers/Host/HostPropertyController";
import { actionReservation } from "../../controllers/Host/HostReservationController";
import { HostMid } from "../../../middleware/Host/hostMiddleware";
// import { fet } from "../../controllers/Admin/AdminSafetyController";


const hostRouter=Router()

hostRouter.post('/login',verifyhost)
          .post('/verify',verifyOtp)
          .get('/hostresend',resendHost)
          .post('/hosteditprofile',HostMid,hostupdateProfile)
          .post('/uploadphoto',HostMid,upload.single("file"),uploadImag)
          .post('/changepass',HostMid,changepassword)
          .get('/amenities',HostMid,fetchamenities)
          .get('/safety',HostMid,fetchsafety)
          .post('/addproperty',upload.fields([
            { name: 'propertyCertificate', maxCount: 1 },
            { name: 'propertyImages', maxCount: 10 }
          ]),addproperty)
          .post('/property',HostMid,fetchProperty)
          .post('/updateproperty', upload.array('propertyImages', 5), updateProperty)
          .post('/available',HostMid,availableProperty)
          .post('/fetchreservation',HostMid,fetchReservation)
          .post('/actionreservation',HostMid,actionReservation)


export default hostRouter