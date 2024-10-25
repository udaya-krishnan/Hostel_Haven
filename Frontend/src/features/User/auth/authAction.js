import AuthService from "../../../services/AuthService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AccountService from "../../../services/UserAccountService";
import propertyService from "../../../services/PropertyService";
import PaymentService from "../../../services/PaymentService";
import UserResService from "../../../services/UserReservationService";
import ChatService from "../../../services/ChatService";

export const register=(name,email,password)=>async()=>{
  try {
    const data=await AuthService.register(name,email,password)
    return data
  } catch (error) {
    throw error
  }
}

// export const otpVerify=(otp)=>async()=>{
//     const data=await AuthService.otpVerify(otp)
//     return data
// }

export const otpVerify = createAsyncThunk(
  'auth/otpVerify',
  async ({ otp }, { rejectWithValue }) => {
    try {
      const res = await AuthService.otpVerify(otp);
      console.log(res,"response");
      
      if (res.message === "OTP verified, registration successful"||res.message==="Otp verified " ) {
        return res;
      } else {
        return rejectWithValue({ message: "OTP verification failed", status: 400 });
      }
    } catch (error) {
      // Capture and reject the error with response details
      return rejectWithValue(error || { error: error });
    }
  }
);




export const login =createAsyncThunk(
    'auth/login',
    async({email,password,toast},{rejectWithValue})=>{
        console.log(email,password,"thunk");
        const response=await AuthService.loginverify(email,password)
        console.log(response.data);
        
        if(response.data.message==="Email was wrong"){
            toast.error('User Not Found', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 })
            return rejectWithValue('user not found')
        }else if(response.data.message==="Password was wrong"){
            toast.error('Incorrect Password', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 })
            return rejectWithValue('incorrect')
        }else if(response.data.message==="Account Blocked"){
          toast.error('Your Account Blocked', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 })
          return rejectWithValue('block')
        }else{
          console.log(response.data,'logged data');
          return response.data
        }
    }
)


export const resendOtp = createAsyncThunk(
    'auth/resendOtp',
    async (_,{rejectWithValue}) => {
      try {
        const response = await AuthService.resendOtp()
      return response.data;
      } catch (error) {
        return rejectWithValue(error)
      }
      
    }
  );


  export const googleRegister =createAsyncThunk(
    'auth/googleRegister',
    async({data},{rejectWithValue})=>{
        const response=await AuthService.googleRegister(data)

        console.log(response,"in action");
        
        return response
    }
  )


  export const verifyEmail=(email)=>async()=>{
    try {
      const data=await AuthService.verifyEmail(email)
      console.log(data,"data");
      return data
    } catch (error) {
      throw error
    }
  }

  export const forgotPass=(data)=>async()=>{
    try {
      const res=await AuthService.forgotpass(data)
      return res
    } catch (error) {
      throw error
    }
   
  }

  // Edit Profile
export const editProfile = createAsyncThunk(
  'auth/editprofile',
  async ({ values }, { rejectWithValue }) => {
    try {
      console.log('values from action', values);

      const response = await AccountService.editProfile(values);
      console.log(response);

      return response;
    } catch (error) {
      console.error("Error in editProfile:", error.message);
      return rejectWithValue(error.response ? error.response.data : error.message); // Reject and pass the error back
    }
  }
);

// Upload Photo
export const uploadPhoto = createAsyncThunk(
  'auth/uploadphoto',
  async ({ file, email }, { rejectWithValue }) => {
    try {
      console.log(file, email, "from action");

      const response = await AccountService.uploadPhoto(file, email);
      return response;
    } catch (error) {
      console.error("Error in uploadPhoto:", error.message);
      return rejectWithValue(error.response ? error.response.data : error.message); // Reject and pass the error back
    }
  }
);


export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ password, email }, { rejectWithValue }) => {
    try {
      const response = await AccountService.changePassword(password, email);
      return response;
    } catch (error) {
      console.error("Error in changePassword:", error.message);
      return rejectWithValue(error.response ? error.response.data : error.message); // Reject and pass the error back
    }
  }
);

  export const fetchHostel = createAsyncThunk(
    "auth/fetchHostel",
    async ({search}, thunkAPI) => {
      try {
        const res = await propertyService.fetchhostel(search);
        return res;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  

  export const fetchRoom = createAsyncThunk(
    "auth/fetchRoom",
    async ({search}, thunkAPI) => {
      try {
        const res = await propertyService.fetchRoom(search);
        return res;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  
  export const popertyDetails = createAsyncThunk(
    "auth/popertyDetails",
    async (id, thunkAPI) => {
      try {
        const res = await propertyService.propertyDetails(id);
        return res;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const wishlist = createAsyncThunk(
    "auth/wishlist",
    async ({ id, proId }, thunkAPI) => {
      try {
        const res = await propertyService.addwishlist(id, proId);
        return res;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const findwish = createAsyncThunk(
    "auth/findwish",
    async (userId, thunkAPI) => {
      try {
        const res = await propertyService.findwish(userId);
        return res;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );


  export const fetchWishlist = createAsyncThunk(
    "auth/fetchWishlist",
    async (id, thunkAPI) => {
      try {
        const res = await propertyService.fetchwishlist(id);
        return res;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const removewish = createAsyncThunk(
    "auth/removewish",
    async ({ id, userId }, thunkAPI) => {
      try {
        const res = await propertyService.removeWish(id, userId);
        return res;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const fetchwish = createAsyncThunk(
    "auth/fetchwish",
    async ({ id, userId }, thunkAPI) => {
      try {
        const res = await propertyService.fetchWish(id, userId);
        return res;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const fethreservation = createAsyncThunk(
    "auth/fethreservation",
    async (id, thunkAPI) => {
      try {
        const res = await UserResService.fechReservation(id);
        return res;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const bookingDetails = createAsyncThunk(
    "auth/bookingDetails",
    async (id, thunkAPI) => {
      try {
        const res = await UserResService.bookingdetails(id);
        return res;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const continuePayment = createAsyncThunk(
    "auth/continuePayment",
    async (amount, thunkAPI) => {
      try {
        const res = await UserResService.continuepayment(amount);
        return res;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );


  export const  connectHost=createAsyncThunk(
    'auth/connectHost',
    async({userId,hostId,data},thunkAPI)=>{
      try {
        const res=await ChatService.connectHost(userId,hostId,data)
        return res
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  )

  export const  fetchHost=createAsyncThunk(
    'auth/fetchHost',
    async({hostId,userId},thunkAPI)=>{
      try {
        console.log(hostId,userId,'from the action');
        
        const res=await ChatService.fetchHost(hostId,userId)
        console.log(res,"it from action");
        
        return res
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  )


  export const  fetchConnection=createAsyncThunk(
    'auth/fetchConnection',
    async(userId,thunkAPI)=>{
      try {
        console.log(userId);
        
        const res=await ChatService.fetchConnection(userId)
        return res
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  )


  export const fetchUserMessage=createAsyncThunk(
    'auth/fetchUserMessage',
    async({hostId,userId},thunkAPI)=>{
      try {
        console.log(userId);
        const res=await ChatService.fetchUserMessages(hostId,userId)
        return res
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  )



  export const fetchNearme=createAsyncThunk(
    'auth/fetchNearme',
    async({lat,lng},thunkAPI)=>{
      try {
        // console.log(userId);
        const res=await propertyService.nearMe(lat,lng)
        return res
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  )


  export const rateProperty=createAsyncThunk(
    'auth/rateProperty',
    async({userId,proId,rate,review},thunkAPI)=>{
      try {
        // console.log(userId);
        const res=await UserResService.ratingProperty(userId,proId,rate,review)
        return res
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  )



  export const fetchReview=createAsyncThunk(
    'auth/fetchReview',
    async(proId,thunkAPI)=>{
      try {
        // console.log(userId);
        const res=await propertyService.fetchReview(proId)
        return res
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  )



  export const fetchNotifications=createAsyncThunk(
    'auth/fetchNotifications',
    async(_,thunkAPI)=>{
      try {
        // console.log(userId);
        const res=await AccountService.fetchNotifications()
        return res
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  )


  export const cancelReservation=createAsyncThunk(
    'auth/cancelReservation',
    async(resId,thunkAPI)=>{
      try {
        // console.log(userId);
        const res=await UserResService.cancelReservation(resId)
        return res
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  )



