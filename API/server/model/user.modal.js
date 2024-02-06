const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "phone is required"],
  },
  phone: {
    type: String,
    required: [true, "phone is required"],
  },
  // this will be a assignment
  // token: {
  //   type: String,
  //   default: null,
  // },
});

const userModal = mongoose.model("user", userSchema);
module.exports = userModal;
