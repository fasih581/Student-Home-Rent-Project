import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// POST: post the Location
export const addLocation = createAsyncThunk("addLocation", async (data) => {
  console.log("Request Payload:", data);
  try {
    const response = await axios.post("http://localhost:8080/location", data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});

// GET All  Location
export const getData = createAsyncThunk("getData", async () => {
  try {
    const response = await axios.get("http://localhost:8080/location");
    console.log("API data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
});

// GET:Get a single location and house details by ID
export const getLocationHouse = createAsyncThunk(
  "getLocationHouse",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8080/location/product/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const getLocationHouse = createAsyncThunk(
//   "getLocationHouse",
//   async (id) => {
//     try {
//       console.log("Received location and Product ID:", id);
//       const response = await axios.get(`http://localhost:8080/location/product/${id}`);
//       console.log("API Response:", response.data);

//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );



// GET:Id Single contact
export const getDataById = createAsyncThunk("getDataById", async ({ id }) => {
  try {
    console.log("Received Single Data ID:", id);
    const response = await axios.get(`http://localhost:8080/location/${id}`);
    console.log("API Response:", response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
});

// UPDATE Location
export const updateLocation = createAsyncThunk(
  "updateLocation",
  async ({ id, data }) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/location/${id}`, // Make sure the ID is properly passed here
        data
      );
      console.log("edit", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// delete contact
export const deleteContact = createAsyncThunk("deleteContact", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/location/product/${id}`
    );
    console.log(response.data);
    return id;
  } catch (error) {
    throw error;
  }
});

const locationSlice = createSlice({
  name: "location",
  initialState: {
    data: [],
    house: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // GET data
    builder
      .addCase(getData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // GET:Id Single Contact
    builder.addCase(getDataById.fulfilled, (state) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // GET Location and house

    builder
      .addCase(getLocationHouse.pending, (state) => {
        state.isLoading = true;
        state.error = null; 
      })
      .addCase(getLocationHouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.house = action.payload;
        {console.log("ssttttttt", state.house);}
        state.error = null; 
      })
      .addCase(getLocationHouse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error fetching data"; 
      });

    // builder
    //   .addCase(getLocationHouse.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(getLocationHouse.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.house = action.payload;
    //   })
    //   .addCase(getLocationHouse.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.error.message;
    //   });

    // post data
    builder
      .addCase(addLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addLocation.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addLocation.rejected, (state) => {
        state.isLoading = false;
        state.error = "Some error occurred";
      });

    // UPDATE data
    builder
      .addCase(updateLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // delete contact
    builder.addCase(deleteContact.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter(
        (contact) => contact._id !== action.payload
      );
    });
    builder.addCase(deleteContact.rejected, (state, action) => {
      state.isLoading = false;
      state.error = "Some error occurred";
    });
  },
});

export default locationSlice.reducer;
