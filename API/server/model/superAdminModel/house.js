const mongoose = require("mongoose");

const location = require("./location.modal");

const houseSchema = new mongoose.Schema({
  image: [
    {
      type: String,
    }
  ],
  houseName: {
    type: String,
  },
  address: {
    type: String,
  },
  category: {
    type: String,
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
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "location",
  },
});

const homeModal = mongoose.model("homeDetails", houseSchema);
module.exports = homeModal;
