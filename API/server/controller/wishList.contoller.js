const asyncHandler = require("express-async-handler");

const Services = require("../services/wishListService");

// Get: get the single user cart details
exports.getWishListByUser = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const cartDetails = await Services.getWhishListByUser(id);

    if (!cartDetails) {
      return res.status(404).send("User Not Found");
    }

    res.status(200).json(cartDetails);
  } catch (error) {
    console.error("Error getting home to wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST: create the user cart and his wish list
exports.postWishList = asyncHandler(async (req, res) => {
  try {
    const { userId, homeId } = req.body;

    let cart = await Services.wishListPost(res, userId, homeId);

    res.status(200).json(cart);

  } catch (error) {
    console.error("Error adding home to wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE: Delete the homeId in the favhome array
exports.updateWishList = asyncHandler(async (req, res) => {
  const { userId, homeId } = req.params;
  try {
    let cart = await Services.updateWishList(res, userId, homeId );

    res.status(200).json({ cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
