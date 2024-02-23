const asyncHandler = require("express-async-handler");

const houseModel = require("../../model/superAdminModel/house");

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
  } = req.body;

//   const image = req.file ? req.file.path : null;
// const image = req.files ? req.files.map(file => file.path) : null;
const images = req.files ? req.files.map(file => file.path) : null;

  try {
    const data = new houseModel({
      image : images,
      houseName,
      address,
      category,
      description,
      facilities,
      bill,
      rate,
      location,
    });

    const saveData = await data.save();
    res.status(200).json(saveData);
  } catch (error) {
     console.error(error);
    res.status(500).send("Error creating location");
  }
});
