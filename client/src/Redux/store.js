import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from './slices/authSlice'
import courseSliceReducer from './slices/courseSlice'
import razorpaySliceReducer from './slices/razorpaySlice'
import statSliceReducer from './slices/statSlice'

const store = configureStore({
    reducer:{
        auth: authSliceReducer,
        course: courseSliceReducer,
        razorpay:razorpaySliceReducer,
        stat: statSliceReducer,
    }
})


export default store