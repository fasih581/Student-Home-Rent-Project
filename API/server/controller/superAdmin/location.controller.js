const asyncHandler = require("express-async-handler");

const location = require("../../model/superAdminModel/location.modal");

// Get all locations
exports.locationGetAll = asyncHandler(async (req, res) => {
  try {
    const locations = await location.find();
    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching locations");
  }
});

// Get a single location by ID
exports.locationGetId = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const Location = await location.findById(id);

    if (!Location) {
      return res.status(404).send("Location not found");
    }
    res.json(Location);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching location");
  }
});

// POST: Create a new location
exports.locationPost = asyncHandler(async (req, res) => {
  const { name, coordinates } = req.body;
  const image = req.file ? req.file.path : null;

  if (!name || !coordinates) {
    return res.status(400).send("Name and coordinates are required");
  }

  // Split coordinates string into latitude and longitude
  const [latitude, longitude] = coordinates
    .split(",")
    .map((coord) => parseFloat(coord.trim()));

  try {
    const newLocation = new location({
      name,
      coordinates: [latitude, longitude],
      image,
    });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating location");
  }
});

// UPDATE DATA: Put Method
exports.locationupdate = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const locations = await location.findById(id);

    if (!locations) {
      return res.status(404).json({
        error: true, 
        message: "Location not found",
      });
    }

    // Create an object to hold the updated data
    const updatedData = {};

    console.log("Request body:", req.body);
    console.log("Request file:", req.file);
    
    // Check if image is being updated
    if (req.file) {
      updatedData.image = req.file.path; 
      console.log("No file attached to the request.");
    }
    
    // Check for other fields being updated
    if (req.body.name) {
      updatedData.name = req.body.name;
    }
    
    if (req.body.coordinates) {
      const [latitude, longitude] = req.body.coordinates.split(',').map(Number);
      updatedData.coordinates = [latitude, longitude];
    }

    const updatedLocation = await location.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    console.log("Updated data:", updatedLocation);
    res.status(200).json(updatedLocation);
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Delete a location
exports.locationDelete = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLocation = await location.findByIdAndDelete(id);

    if (!deletedLocation) {
      return res.status(404).send("Location not found");
    }

    res.status(204).send("Location deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting location");
  }
});
