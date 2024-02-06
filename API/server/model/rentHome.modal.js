const mongoose = require("mongoose");

const location = require("./location.modal"); 

const rentHomeSchema = mongoose.model(
  "rentHome",
  new mongoose.Schema({
    date: {
      type: String,
    },
    customerName: {
      type: String,
    },
    billNumber: {
      type: String,
    },
    poNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    grandTotal: {
      type: String,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "location", 
    },
  })
);

const rentHomeModal = mongoose.model("rentHomeDetails", rentHomeSchema);
module.exports = rentHomeModal;
