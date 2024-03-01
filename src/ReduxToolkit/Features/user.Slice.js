import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// signup User
export const createUser = createAsyncThunk("createContact", async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/signup", data);
      return response.data;
    } catch (error) { 
      console.error("Error:", error);
      throw error;
    }
  });

  // Login User
export const LoginUser = createAsyncThunk("LoginUser", async (data) => {
  console.log("Request login Payload:", data);
  try {
    const response = await axios.post("http://localhost:8080/login", data);
    Cookies.set('userId', response.data.userId);
    console.log("response login data:", response);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});

const Slice = createSlice({
    name: "user",
    reducers: {},
    initialState: {
      isLoading: false,
      user: [],
      userInfo: [],
      error: false,
    },
    extraReducers: (builder) => {
        builder
        .addCase(createUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createUser.fulfilled, (state, action) => {
          state.isLoading = false;
        })
        .addCase(createUser.rejected, (state) => {
          state.isLoading = false;
          state.error = "Some error occurred";
        });

        // loginUser
        builder.addCase(LoginUser.pending, (state) => {
          state.isLoading = true
          state.error = null
      });
      builder.addCase(LoginUser.fulfilled, (state, action) => {
          state.isLoading = false
          state.userInfo = action.payload;
          // state.userToken = payload.token
      });
      builder.addCase(LoginUser.rejected, (state,  action ) => {
          state.isLoading = false
          state.error = payload
      });
    }
})

export default Slice.reducer;