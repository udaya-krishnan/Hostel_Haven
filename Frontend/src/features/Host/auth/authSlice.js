import { createSlice } from "@reduxjs/toolkit";
import {
  verifyHostOtp,
  editprofile,
  hostuploadphoto,
  actionReservation,
  addProperty,
  available,
  fetchProperty,
  fetchReservation,
  fetchSafety,
  fetchamenities,
  updateProperty
} from "./authAction";

const initialState = {
  host: null,
};

const hostauthSlice = createSlice({
  name: "hostAuth",
  initialState,
  reducers: {
    HostLogout: (state) => {
      state.host = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyHostOtp.fulfilled, (state, action) => {
        console.log("extrareducer");
        console.log(action.payload);
        state.host = action.payload.host;
      })
      .addCase(editprofile.fulfilled, (state, action) => {
        state.host = action.payload.hostData;
      })

      .addCase(editprofile.rejected, (state, action) => {
        state.host = null
      })
      
      .addCase(hostuploadphoto.fulfilled, (state, action) => {
        state.host = action.payload.hostData;
      })
      .addCase(hostuploadphoto.rejected, (state, action) => {
        state.host = null
      })
      .addCase(actionReservation.rejected, (state, action) => {
        state.host = null
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.host = null
      })
      .addCase(available.rejected, (state, action) => {
        state.host = null
      })
      .addCase(fetchProperty.rejected, (state, action) => {
        state.host = null
      })
      .addCase(fetchReservation.rejected, (state, action) => {
        state.host = null
      })
      .addCase(fetchSafety.rejected, (state, action) => {
        state.host = null
      })
      .addCase(fetchamenities.rejected, (state, action) => {
        state.host = null
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.host = null
      })
      
  },
});

export const { HostLogout } = hostauthSlice.actions;

export default hostauthSlice.reducer;
