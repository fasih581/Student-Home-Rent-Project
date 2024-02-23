import { configureStore } from "@reduxjs/toolkit";
import UserData from "../Features/user.Slice"
import locationSlice from "../Features/SuperAdmin/Location.slice"

const store = configureStore({
    reducer: {
      userdata : UserData,
      location : locationSlice,
    },
  });
  
  export default store;