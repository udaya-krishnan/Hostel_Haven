import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import HostAuthService from "../../../services/HostAuthService"
import HostAccountService from "../../../services/HostAccountService";
import AddPropertyService from "../../../services/HostPropertyService";


export const hostLogin=(email, password, toast) => async (dispatch) => {
    try {
        const data = await HostAuthService.LoginHost(email, password)
        if (data.message === "Email was wrong") {
            toast.error('User Not Found', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 });
        } else if (data.message === "Password was wrong") {
            toast.error('Incorrect password', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 });
        }else if(data.message==="Account blocked"){
          toast.error('Account Blocked', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 });
        }else{
          dispatch({ type: 'LOGIN_SUCCESS', payload: data });  // This is an example

          return data.message;
        }

    } catch (error) {
        console.log(error.message);
        return null;  // or dispatch a failure action if needed
    }
};


export const verifyHostOtp=createAsyncThunk(
    'hostAuth/verifyHostOtp',
    async({otp,toast},{rejectWithValue})=>{

        console.log(otp,"create thunk");
        const response=await HostAuthService.VerifyOtp(otp)
        console.log(response,"thunk");

        if(response.message=="incorrect otp"){
            toast.error('Incorrect Otp', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 })
            return rejectWithValue("incorrect otp")
        }else{
            console.log('verify returnning');
            
            return response
        }
        
    }
)

export const hostresendOtp=createAsyncThunk(
    'hostAuth/resendOtp',
    async()=>{
        const response =await HostAuthService.resendOtp()
        return response.data
    }
)

export const editprofile=createAsyncThunk(
    'hostAuth/editprofile',
    async({values},{rejectWithValue})=>{
      console.log('values from  action',values);
      
      const response =await HostAccountService.hosteditProfile(values)
      console.log(response);
      

      return response
    }
  )


export const hostuploadphoto=createAsyncThunk(
    'hostauth/uploadphoto',
    async({file,email},{rejectWithValue})=>{
      try {
        console.log(file,email,"from action");
      
        const response =await HostAccountService.hostuploadPhoto(file,email)
        return response
      } catch (error) {
        return rejectWithValue()
      }

    }
  )



  export const hostchangePassword=createAsyncThunk(
    'hostauth/hostchangePassword',
    async({password,email},{rejectWithValue})=>{
      try {
        const res=await HostAccountService.hostchangePassword(password,email)
        return res
      } catch (error) {
        return rejectWithValue()
        
      }
    }
  )
  
  

  
  export const fetchamenities=createAsyncThunk(
    'hostauth/fetchamenities',
    async(__,{rejectWithValue})=>{
      try {
        const res=await AddPropertyService.fetchamenities()
        return res
      } catch (error) {
       return rejectWithValue()
      }
    }
  )
  export const fetchSafety = createAsyncThunk(
    'hostauth/fetchSafety',
    async (_, { rejectWithValue }) => {
      try {
        const res = await AddPropertyService.fetchsafety();
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  // Add Property
  export const addProperty = createAsyncThunk(
    'hostauth/addProperty',
    async (formData, { rejectWithValue }) => {
      try {
        const response = await AddPropertyService.addproperty(formData);
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  // Fetch Property
  export const fetchProperty = createAsyncThunk(
    'hostauth/fetchProperty',
    async (id, { rejectWithValue }) => {
      try {
        const response = await AddPropertyService.fetchProperty(id);
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  // Update Property
  export const updateProperty = createAsyncThunk(
    'hostauth/updateProperty',
    async (formData, { rejectWithValue }) => {
      try {
        const response = await AddPropertyService.updateproperty(formData);
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  // Check Availability
  export const available = createAsyncThunk(
    'hostauth/available',
    async ({ id, hostId }, { rejectWithValue }) => {
      try {
        const response = await AddPropertyService.available(id, hostId);
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  // Fetch Reservations
  export const fetchReservation = createAsyncThunk(
    'hostauth/fetchReservation',
    async (hostId, { rejectWithValue }) => {
      try {
        const response = await AddPropertyService.reservation(hostId);
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  // Action on Reservation
  export const actionReservation = createAsyncThunk(
    'hostauth/actionReservation',
    async ({ action, id }, { rejectWithValue }) => {
      try {
        const response = await AddPropertyService.actionOnReservation(action, id);
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  )


  export const fetchPayment=(id)=>async()=>{
    try {
      const response=await HostAccountService.fetchpayment(id)
      return response
    } catch (error) {
      console.log(error.message);
      
    }
  }


  export const addingAmount=(amount)=>async()=>{
    try {
      const response=await HostAccountService.addAmount(amount)
      return response
      
    } catch (error) {
      console.log(error.message);
      
    }
  }

  export const verifyamount=(order,hostId,amount)=>async()=>{
    try {
      const response =await HostAccountService.verifyAmount(order,hostId,amount)
      return response
    } catch (error) {
      console.log(error.message);
      
    }
  }
