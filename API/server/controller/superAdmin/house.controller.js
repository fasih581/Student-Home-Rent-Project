const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");

const Services = require("../../services/SuperAdmin/houseService");

// GET:ID : Get the single data with id
exports.getIdHouse = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ObjectId");
    }

    const houseDetailsId = await Services.getIdHouse(id);

    if (!houseDetailsId) {
      return res.status(404).send("House details not found");
    }

    res.status(200).json(houseDetailsId);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Getting House details");
  }
});

// GET: Get the all data from the mongodb
exports.getAllHouse = asyncHandler(async (req, res) => {
  try {
    const houseDetails = await Services.getAllHouseService();
    res.status(201).json(houseDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error geting data");
  }
});

// GET: Get the Popular Room
exports.getPopularRoom = asyncHandler(async (req, res) => {
  try {
    const houseDetails = await Services.getPopularRoom();
    res.status(200).json(houseDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error geting Popural Room data");
  }
});

// POST: POST DATA IN HOUSE MODEL IN MONGODB
exports.housePost = asyncHandler(async (req, res) => {
  const {
    houseName,
    address,
    category,
    description,
    facilities,
    bill,
    rate,
    location,
    popularRoom,
  } = req.body;

  const images = req.files ? req.files.map((file) => file.path) : null;

  try {
    const saveData = await Services.housePost({
      image: images,
      houseName,
      address,
      category,
      description,
      facilities,
      bill,
      rate,
      location,
      popularRoom,
    });

    res.status(200).json(saveData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating house");
  }
});

// UPDATE : Update the house details
exports.houseUpdate = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    let image = null;

    // Check if files were uploaded
    if (req.files && req.files.length > 0) {
      image = req.files;
    }

    const houseDataUpdate = await Services.houseUpdate(id, req.body, image);
    console.log("Updated data:", houseDataUpdate);
    res.status(200).json(houseDataUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Update the house details");
  }
});

// DELETE: delete the data from the house details database
exports.deleteHouse = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const houseDelete = await Services.deleteHouse(id);
    if (!houseDelete) {
      return res.status(404).send("House details not found");
    }
    res.status(201).send("deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error to delete house the database");
  }
});
