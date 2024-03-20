const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  image: [
    {
      type: String,
      required: [true, "image is required"],
    },
  ],
  popularRoom: {
    type: Boolean,
    default: false,
  },
  houseName: {
    type: String,
    required: [true, "House Name is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  description: {
    type: String,
  },
  facilities: {
    type: String,
  },
  bill: {
    type: String,
  },
  rate: {
    type: String,
    required: [true, "Rate is required"],
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "location",
    required: [true, "Location is required"],
  },
});

const homeModal = mongoose.model("homeDetails", houseSchema);
module.exports = homeModal;
