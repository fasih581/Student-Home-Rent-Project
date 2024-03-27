const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");

const wishListModal = require("../model/Wish_List.modal");

// Get: get the single user cart details
const getWhishListByUser = asyncHandler(async (userId) => {
  try {
    const UserId = new mongoose.Types.ObjectId(userId);

    const CartByIdAggregate = await wishListModal.aggregate([
      {
        $match: { userId: UserId },
      },
      {
        $lookup: {
          from: "homedetails",
          localField: "favHome._id",
          foreignField: "_id",
          as: "homeDetails",
        },
      },
    ]);

    return CartByIdAggregate;
  } catch (error) {
    console.error("Error getting home to wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST: create the user cart and his wish list
const wishListPost = asyncHandler(async (res, userId, homeId) => {
  try {
    let cart = await wishListModal.findOne({ userId });

    // If the cart doesn't exist, create it
    if (!cart) {
      cart = new wishListModal({ userId: userId, favHome: [] });
    }

    // Check if the product is already in the wishlist
    const isHomeExists = cart.favHome.find((item) => item?.equals(homeId));

    if (isHomeExists) {
      return res.status(400).json({
        message: "Home already exists in wishlist",
        userId: { message: "User already exists in wishlist" },
      });
    }

    // Add the product to the wishlist
    cart.favHome.push(homeId);

    // Save the updated cart
    await cart.save();

    return cart;
  } catch (error) {
    console.error("Error adding home to wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE: Delete the homeId in the favhome array
const updateWishList = asyncHandler(async (userId, homeId) => {
  try {
    let cart = await wishListModal.findOne({ userId });

    if (!cart) {
      throw { status: 404, message: "Cart not found" };
    }

    // Use pull to remove the homeId from the favHome array
    cart.favHome.pull(homeId);

    // Save the updated cart
    await cart.save();

    return cart;
  } catch (error) {
    console.error("Error updating cart:", error);
    throw { status: 500, message: "Internal server error" };
  }
});


module.exports = {
  getWhishListByUser,
  wishListPost,
  updateWishList,
};
