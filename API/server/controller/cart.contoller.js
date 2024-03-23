const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");

const cartModal = require("../model/Cart.modal");

// Get: get the single user cart details
exports.getCartById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const userId = new mongoose.Types.ObjectId(id);

    const CartByIdAggregate = await cartModal.aggregate([
      {
        $match: { userId: userId },
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

    if(CartByIdAggregate.length == 0){
      return res.status(404).send("User Not Found")
    }

    res.status(200).json(CartByIdAggregate);

  } catch (error) {
    console.error("Error getting home to wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST: create the user cart and his wish list
exports.postCart = asyncHandler(async (req, res) => {
  try {
    const { userId, homeId } = req.body;

    let cart = await cartModal.findOne({ userId });
    // console.log("userid cart", cart);

    // If the cart doesn't exist, create it
    if (!cart) {
      cart = new cartModal({ userId: userId, favHome: [] });
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

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding home to wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE: Delete the homeId in the favhome array
exports.updateCart = asyncHandler(async (req, res) => {
  const { userId, productId } = req.params;
  try {
    let cart = await cartModal.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Use $pull to remove the productId from the favHome array
    cart.favHome.pull(productId);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});