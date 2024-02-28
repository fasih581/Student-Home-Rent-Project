const asyncHandler = require("express-async-handler");

const locationModel = require("../../model/superAdminModel/location.modal");
const houseModel = require("../../model/superAdminModel/house");

// Get all locations Services
const locationGetAllService = asyncHandler(async (req, res) => {
  try {
    const locations = await locationModel.find();
    return locations;
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching locations");
  }
});

// Get Single locations Services
const locationGetIdService = asyncHandler(async (locationId, res) => {
  try {
    const Location = await locationModel.findById(locationId);
    return Location;
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching location");
  }
});

// Get a single location and house details by ID
const locationAndProductService = asyncHandler(async (locationId, res) => {
  try {
    const Location = await locationModel.findById(locationId);

    const house = await houseModel.find({ location: locationId });

    // res.status(200).json({ Location, house });
    return house;
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching location");
  }
});

// POST: Create a new location
const locationPostService = asyncHandler(
  async (name, coordinates, image, res) => {
    try {
      const newLocation = new locationModel({
        name,
        coordinates,
        image,
      });

      await newLocation.save();
      return newLocation;
    } catch (error) {
      console.error(error);
      res.status(500).send("Error creating location");
    }
  }
);

// UPDATE DATA: Put Method
const locationupdateService = async (id, requestBody, file) => {
  try {
    const locations = await locationModel.findById(id);

    if (!locations) {
      throw new Error("Location not found");
    }

    const updatedData = {};

    if (file) {
      updatedData.image = file.path;
    }

    if (requestBody.name) {
      updatedData.name = requestBody.name;
    }

    if (requestBody.coordinates) {
      const [latitude, longitude] = requestBody.coordinates
        .split(",")
        .map(Number);
      updatedData.coordinates = [latitude, longitude];
    }

    const updatedLocation = await locationModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    return updatedLocation;
  } catch (error) {
    throw error;
  }
};

// Delete a location
const locationDeleteService = asyncHandler(async (id, res) => {
  try {
    const deletedLocation = await locationModel.findByIdAndDelete(id);

    return deletedLocation;
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting location");
  }
});

module.exports = {
  locationGetAllService,
  locationGetIdService,
  locationAndProductService,
  locationPostService,
  locationupdateService,
  locationDeleteService,
};
