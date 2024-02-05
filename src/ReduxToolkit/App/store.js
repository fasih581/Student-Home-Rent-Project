import { configureStore } from "@reduxjs/toolkit";
import UserData from "../Features/user.Slice"

const store = configureStore({
    reducer: {
      userdata : UserData,
    },
  });
  
  export default store;