const express = require("express");
const route = express.Router();
// const multer = require("multer");
// const upload = require("../../Multer/upload")

const cartController = require("../controller/cart.contoller")

// Cart API
route.get("/:id", cartController.getCartById)
route.post("/", cartController.postCart)
route.delete("/:userId/:productId", cartController.updateCart)


module.exports = route;