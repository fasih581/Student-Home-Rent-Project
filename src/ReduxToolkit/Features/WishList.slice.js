import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// POST: Add the Fav Home To User Wish List
export const addWishList = createAsyncThunk("addWishList", async (data) => {
  // console.log("Request Payload:", data);
  try {
    const response = await axios.post("http://localhost:8080/whislist", data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});

// GET:ID// GET the User Wish List with User Id
export const getUserWishList = createAsyncThunk(
  "getUserWishList",
  async ({ userId }) => {
    try {
      // console.log("Received ID The User Wish List :", userId);
      const response = await axios.get(
        `http://localhost:8080/whislist/${userId}`
      );
      // console.log("API The User Wish List Response:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  }
);

// DELETE: Delete fav home in the user wish list
export const deleteHomeWishList = createAsyncThunk(
  "deleteHomeWishList",
  async ({ userId, homeId }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/whislist/${userId}/${homeId}`
      );
      // console.log("detele wish list home", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const wishListSlice = createSlice({
  name: "wishList",
  initialState: {
    listItems: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // GET the User Wish List with User Id
    builder
      .addCase(getUserWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listItems = action.payload;
      })
      .addCase(getUserWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // POST: Add the Fav Home To User Wish List
    builder
      .addCase(addWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addWishList.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Some error occurred";
      });

    // DELETE: Delete fav home in the user wish list
    builder
      .addCase(deleteHomeWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteHomeWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.listItems = state.listItems.filter(
        //   (itemId) => itemId !== action.payload.deletedItemId
        // );
      })
      .addCase(deleteHomeWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default wishListSlice.reducer;
