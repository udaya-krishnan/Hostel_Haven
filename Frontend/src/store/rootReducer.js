import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../features/User/auth/authSlice'
import hostauthReducer from '../features/Host/auth/authSlice'

const rootReducer=combineReducers({
    auth:authReducer,
    hostauth:hostauthReducer
})

export default rootReducer