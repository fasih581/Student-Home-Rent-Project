const asyncHandler = require("express-async-handler");

const Services = require("../services/checkOutService");

// GET: Get The All CheckOut Data
exports.getCheckOut = asyncHandler(async (res) => {
  try {
    const checkOut = await Services.getCheckOut();
    res.status(200).json(checkOut);
  } catch (error) {
    console.error("Error Getting CheckOut Data:", error);
    res.status(500).json({ error: "Failed to Getting Data" });
  }
});

// GET: Get The User CheckOut Data
exports.getUserCheckOut = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Services.getUserCheckOut(id);
    res.status(200).json(user);
  } catch (error) {
    console.log("Error Getting CheckOut User Data:", error);
    res.status(500).json({ error: "Failed to Getting User Data" });
  }
});
