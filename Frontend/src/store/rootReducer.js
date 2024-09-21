import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../features/User/auth/authSlice'
import hostauthReducer from '../features/Host/auth/authSlice'
import adminReducer from '../features/Admin/auth/authSlice'
import propertyReducer from '../features/Host/propertySlice'

const rootReducer=combineReducers({
    auth:authReducer,
    hostauth:hostauthReducer,
    admin:adminReducer,
    property:propertyReducer
})

export default rootReducer