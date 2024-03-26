const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");

const checkOutModal = require("../model/checkOut.modal");

// GET: Get The All CheckOut Data
const getCheckOut = asyncHandler(async (req, res) => {
  try {
    const checkOut = await checkOutModal.find();
    return checkOut;
  } catch (error) {
    console.error("Error Getting CheckOut Data:", error);
    res.status(500).json({ error: "Failed to Getting Data" });
  }
});

// GET: Get The User CheckOut Data
const getUserCheckOut = asyncHandler(async (id) => {

    const userId = new mongoose.Types.ObjectId(id);
    try {
      const user = await checkOutModal.aggregate([
        {
          $match: { userId: userId },
        },
      ]);
  
      return user;

    } catch (error) {
      console.log("Error Getting CheckOut User Data:", error);
      res.status(500).json({ error: "Failed to Getting User Data" });
    }
  });
  

module.exports = {
  getCheckOut,
  getUserCheckOut
};
