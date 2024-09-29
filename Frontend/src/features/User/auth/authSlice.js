import { createSlice } from '@reduxjs/toolkit';
import { login, googleRegister, editProfile,uploadPhoto, otpVerify,fetchHostel,
    fetchRoom,
    popertyDetails,
    wishlist,
    findwish,
    fetchWishlist,
    removewish,
    fetchwish,
    fethreservation,
    bookingDetails,
    continuePayment,
    changePassword } from './authAction';

const initialState = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        Logout: (state) => {
            state.user = null;
           
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                const { data } = action.payload;
                console.log(data,'payload');
                state.user = data;
            })
            .addCase(googleRegister.fulfilled, (state, action) => {
                console.log(action.payload);
                const { user } = action.payload;
                state.user = user;
            })
            .addCase(editProfile.fulfilled,(state,action)=>{
                state.user=action.payload.userData;
            })
            .addCase(editProfile.rejected,(state,action)=>{
                state.user=null
            })
            .addCase(uploadPhoto.fulfilled,(state,action)=>{
                console.log('success fully changed');
                state.user=action.payload.userData
            })
            .addCase(uploadPhoto.rejected,(state,action)=>{
                console.log('success fully changed');
                state.user=null
            })
            .addCase(otpVerify.fulfilled,(state,action)=>{
                state.user=action.payload.userData
                state.token=action.payload.token
            })
            .addCase(fetchHostel.rejected,(state,action)=>{
                state.user=null
            })
            .addCase(changePassword.rejected,(state,action)=>{
                state.user=null
            })
            .addCase(fetchRoom.rejected,(state,action)=>{
                state.user=null
            })
            .addCase(popertyDetails.rejected,(state,action)=>{
                state.user=null
            })
            .addCase(wishlist.rejected,(state,action)=>{
                state.user=null
            })
            .addCase(findwish.rejected,(state,action)=>{
                state.user=null
            })
            .addCase(fetchWishlist.rejected,(state,action)=>{
                state.user=null
            })
            .addCase(removewish.rejected,(state,action)=>{
                state.user=null
            })
            .addCase(fetchwish.rejected,(state,action)=>{
                state.user=null
            })
            .addCase(fethreservation.rejected,(state,action)=>{
                state.user=null
            })
            .addCase(bookingDetails.rejected,(state,action)=>{
                state.user=null
            })
            .addCase(continuePayment.rejected,(state,action)=>{
                state.user=null
            })
    },
});

export const { Logout } = authSlice.actions;

export default authSlice.reducer;
