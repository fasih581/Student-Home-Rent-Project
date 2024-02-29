const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    favHome: [
      {
        house: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "homeDetails",
        },
      },
    ],
  },
  { timestamps: true }
);

const cartFavHouse = mongoose.model("Cart", CartSchema);
module.exports = cartFavHouse;
