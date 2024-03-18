const mongoose = require("mongoose");

const CheckOutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  houseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "homeDetails",
  },
  orderStatus: {
    type: String,
    enum: ["pending", "complete"],
    default: "pending",
  },
  amount: {
    type: Number,
  },
  billingAddress: {
    type: {},
  },
  customerEmail: {
    type: String,
  },
  checkInDate: {
    type: Date,
    default: Date.now,
  },
});

const checkOut = mongoose.model("checkOut", CheckOutSchema);
module.exports = checkOut;
