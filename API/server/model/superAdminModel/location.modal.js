const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true 
  },
  name: {
    type: String,
    required: true
  },
  coordinates: {
    type: [Number],
    index: '2dsphere' 
  }
});

const locationModal = mongoose.model("location", locationSchema);
module.exports = locationModal;