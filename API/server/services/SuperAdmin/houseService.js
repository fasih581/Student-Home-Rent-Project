const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");

const houseModel = require("../../model/superAdminModel/house");

// GET:ID : Get the single data with id
const getIdHouseService = asyncHandler(async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ObjectId");
    }
    
    const houseDetailsId = await houseModel.findById(id);
    
    if (!houseDetailsId) {
      throw new Error("House details not found");
    }

    return houseDetailsId;
  } catch (error) {
    console.error(error);
    throw new Error("Error Getting House details");
  }
});

// GET: Get the all data from the mongodb
const getAllHouseService = asyncHandler(async (res) => {
  try {
    const houseDetails = await houseModel.find();
    return houseDetails;
  } catch (error) {
    console.error(error);
    res.status(500).send("Error geting data");
  }
});

// // GET: Get the popular Rooms
const getPopularRoomService = asyncHandler(async () => {
  try {
    const popularRooms = await houseModel.aggregate([
      {
        $match: {
          popularRoom: true
        }
      },
    ]);
    return popularRooms;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting Popular Room data");
  }
});

// POST: POST DATA IN HOUSE MODEL IN MONGODB
const housePostService = asyncHandler(async (houseData) => {
  // console.log("hheeloooo",houseData);

  try {
    const data = new houseModel(houseData);
    const saveData = await data.save();
    return saveData;
  } catch (error) {
    throw error;
  }
});

// UPDATE DATA: Put Method
const houseUpdateService = asyncHandler(async (id, requestBody, image, res) => {
  try {
    const houseGetId = await houseModel.findById(id);

    if (!houseGetId) {
      return res.status(404).send("House details not found");
    }

    const updatedData = {};

    console.log("Request body:", image);

    // Check if all required fields are present in req.body
    if (requestBody.houseName) {
      updatedData.houseName = requestBody.houseName;
    }
    if (requestBody.address) {
      updatedData.address = requestBody.address;
    }
    if (requestBody.category) {
      updatedData.category = requestBody.category;
    }
    if (requestBody.description) {
      updatedData.description = requestBody.description;
    }
    if (requestBody.facilities) {
      updatedData.facilities = requestBody.facilities;
    }
    if (requestBody.bill) {
      updatedData.bill = requestBody.bill;
    }
    if (requestBody.rate) {
      updatedData.category = requestBody.rate;
    }
    if (requestBody.location) {
      updatedData.location = requestBody.location;
    }
    // console.log("Request files:", req.files);

    if (image && image.length > 0) {
      updatedData.image = image.map((file) => file.path);
      console.log(
        "Files attached to the request:",
        image.map((file) => file.path)
      );
    } else {
      console.log("No file attached to the request.");
    }

    const houseDataUpdate = await houseModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    // console.log("Updated data:", houseDataUpdate);

    return houseDataUpdate;
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Update the house details");
  }
});

// DELETE: delete the data from the house details database
const deleteHouseService = asyncHandler(async (id, res) => {
  try {
    const houseDelete = await houseModel.findByIdAndDelete(id);

    return houseDelete;
  } catch (error) {
    console.error(error);
    res.status(500).send("Error to delete house the database");
  }
});

module.exports = {
  getIdHouseService,
  getAllHouseService,
  housePostService,
  houseUpdateService,
  deleteHouseService,
  getPopularRoomService,
};
