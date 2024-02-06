const asyncHandler = require("express-async-handler");

const location = require("../model/location.modal");

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

  if (!name || !coordinates) {
    return res.status(400).send("Name and coordinates are required");
  }

  try {
    const newLocation = new location({ name, coordinates });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating location");
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
