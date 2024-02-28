const asyncHandler = require("express-async-handler");

const ControllerServices = require("../../services/SuperAdmin/locationService");

// Get all locations
exports.locationGetAll = asyncHandler(async (req, res) => {
  try {
    const locations = await ControllerServices.locationGetAllService();
    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching locations");
  }
});

// Get a single location by ID
exports.locationGetId = asyncHandler(async (req, res) => {
  try {
    const locationId = req.params.id;

    const Location = await ControllerServices.locationGetIdService(locationId);

    if (!Location) {
      return res.status(404).send("Location not found");
    }
    res.status(200).json(Location);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching location");
  }
});

// Get a single location and house details by ID
exports.locationAndProduct = asyncHandler(async (req, res) => {
  try {
    const locationId = req.params.id;

    const Location = await ControllerServices.locationAndProductService(
      locationId
    );
    if (!Location) {
      return res.status(404).send("Location not found");
    }

    const house = await ControllerServices.locationAndProductService(
      locationId
    );

    // res.status(200).json({ Location, house });
    res.status(200).json(house);
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
    const newLocation = await ControllerServices.locationPostService(
      name,
      [latitude, longitude],
      image
    );
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
    const updatedLocation = await ControllerServices.locationupdateService(
      id,
      req.body,
      req.file
    );
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
    const deletedLocation = await ControllerServices.locationDeleteService(id);

    if (!deletedLocation) {
      return res.status(404).send("Location not found");
    }

    res.status(201).send("Location deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting location");
  }
});
