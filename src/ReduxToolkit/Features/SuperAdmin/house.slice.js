import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// POST: post the Location
// export const addLocation = createAsyncThunk("addLocation", async (data) => {
//   console.log("Request Payload:", data);
//   try {
//     const response = await axios.post("http://localhost:8080/house", data);
//     return response.data;
//   } catch (error) {
//     console.error("Error:", error);
//     throw error;
//   }
// });

// GET: All Homes Data
export const getHouse = createAsyncThunk("getHouse", async () => {
  try {
    const response = await axios.get("http://localhost:8080/house");
    // console.log("API data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
});

// GET:Home Data With Single Id
export const getHouseById = createAsyncThunk("getHouseById", async ({ id }) => {
  try {
    // console.log("Received Single ID:", id);
    const response = await axios.get(`http://localhost:8080/house/${id}`);
    // console.log("API Single Id Response:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// GET:Home Popular Rooms
export const getPopularRoom = createAsyncThunk("getPopularRoom", async () => {
  try {
    const response = await axios.get(`http://localhost:8080/house/popular`);
    // console.log("API Response:", response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
});

// UPDATE Location
// export const updateLocation = createAsyncThunk(
//   "updateLocation",
//   async ({ id, data }) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:8080/house/${id}`, // Make sure the ID is properly passed here
//         data
//       );
//       console.log("edit", response.data);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// delete contact
// export const deleteContact = createAsyncThunk("deleteContact", async (id) => {
//   try {
//     const response = await axios.delete(`http://localhost:8080/house/${id}`);
//     console.log(response.data);
//     return id;
//   } catch (error) {
//     throw error;
//   }
// });

export const createCheckoutSession = createAsyncThunk(
  "createCheckoutSession",
  async ({ homeId, userId }) => {
    try {
      // console.log("Received homeId and userId:", homeId, userId);
      const response = await axios.post(
        `http://localhost:8080/stripe/create_checkout_session`,
        { homeId, userId }
      );
      // console.log("homeId:", homeId);
      // console.log("createCheckoutSession:", response.data);

      if (response.data.url) {
        window.location.href = response.data.url;
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const houseSlice = createSlice({
  name: "house",
  initialState: {
    data: [],
    dataById: [],
    popularRoomData: [],
    status: "idle",
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // GET data
    builder
      .addCase(getHouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getHouse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // GET:Id Single Contact
    builder.addCase(getHouseById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataById = action.payload;
      {
        console.log("dataById", state.dataById);
      }
    });

    // GET Popular Rooms
    builder
      .addCase(getPopularRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPopularRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.popularRoomData = action.payload;
      })
      .addCase(getPopularRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // CheckOut
    builder
      .addCase(createCheckoutSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.checkoutSessionId = action.payload;
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to create checkout session";
      });

    // post data
    // builder
    //   .addCase(addLocation.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(addLocation.fulfilled, (state) => {
    //     state.isLoading = false;
    //   })
    //   .addCase(addLocation.rejected, (state) => {
    //     state.isLoading = false;
    //     state.error = "Some error occurred";
    //   });

    // UPDATE data
    // builder
    //   .addCase(updateLocation.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(updateLocation.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.data = action.payload;
    //   })
    //   .addCase(updateLocation.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.error.message;
    //   });

    // delete contact
    // builder.addCase(deleteContact.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = "";
    // });
    // builder.addCase(deleteContact.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.data = state.data.filter(
    //     (contact) => contact._id !== action.payload
    //   );
    // });
    // builder.addCase(deleteContact.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = "Some error occurred";
    // });
  },
});

export default houseSlice.reducer;
