const mongoose = require("mongoose");

const WishListSchema = new mongoose.Schema(
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
  // { timestamps: true }
);

const WishList = mongoose.model("Wish_List", WishListSchema);
module.exports = WishList;
