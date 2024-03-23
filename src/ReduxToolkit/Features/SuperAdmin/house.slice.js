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

// GET All  Location
export const getHouse = createAsyncThunk("getHouse", async () => {
  try {
    const response = await axios.get("http://localhost:8080/house");
    console.log("API data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
});

// GET:Id Single contact
export const getHouseById = createAsyncThunk("getHouseById", async ({ id }) => {
  try {
    console.log("Received Single ID:", id);
    const response = await axios.get(`http://localhost:8080/house/${id}`);
    console.log("API Single Id Response:", response.data);
    console.log("Image Single Id Response:", response.data.image);

    return response.data;
  } catch (error) {
    throw error;
  }
});

// GET:Popular Rooms
export const getPopularRoom = createAsyncThunk("getPopularRoom", async () => {
  try {
    const response = await axios.get(`http://localhost:8080/house/popular`);
    console.log("API Response:", response.data);

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

const houseSlice = createSlice({
  name: "house",
  initialState: {
    data: [],
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
    builder.addCase(getHouseById.fulfilled, (state) => {
      state.isLoading = false;
    });

    // GET Popular Rooms
    builder
      .addCase(getPopularRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPopularRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getPopularRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
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
