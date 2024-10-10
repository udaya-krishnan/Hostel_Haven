import AuthService from "../../../services/AuthService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AccountService from "../../../services/UserAccountService";
import propertyService from "../../../services/PropertyService";
import PaymentService from "../../../services/PaymentService";
import UserResService from "../../../services/UserReservationService";
import ChatService from "../../../services/ChatService";

export const register=(name,email,password)=>async()=>{
    const data=await AuthService.register(name,email,password)
    return data
    
}

// export const otpVerify=(otp)=>async()=>{
//     const data=await AuthService.otpVerify(otp)
//     return data
// }

export const otpVerify=createAsyncThunk(
  'auth/otpVerify',
  async({otp},{rejectWithValue})=>{
    const res=await AuthService.otpVerify(otp)
    if(res.message==="OTP verified and registration successful"){
      return res
    }
  }
)




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
    async () => {
      const response = await AuthService.resendOtp()
      return response.data;
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
    const data=await AuthService.verifyEmail(email)
    console.log(data,"data");
    return data
  }

  export const forgotPass=(data)=>async()=>{
    const res=await AuthService.forgotpass(data)
    return res
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
    async(hostId,thunkAPI)=>{
      try {
        console.log(hostId);
        
        const res=await ChatService.fetchHost(hostId)
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

