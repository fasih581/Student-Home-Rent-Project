import { configureStore } from "@reduxjs/toolkit";
import UserData from "../Features/user.Slice"
import locationSlice from "../Features/SuperAdmin/Location.slice"
import houseSlice from "../Features/SuperAdmin/house.slice"
import wishListSlice from "../Features/WishList.slice"

const store = configureStore({
    reducer: {
      userdata : UserData,
      location : locationSlice,
      house : houseSlice,
      wishList : wishListSlice,
    },
  });
  
  export default store; 