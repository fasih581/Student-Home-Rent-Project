const express = require("express");
const route = express.Router();

const wishListController = require("../controller/wishList.contoller")

// Cart API
route.get("/:id", wishListController.getWishListByUser)
route.post("/", wishListController.postWishList)
route.delete("/:userId/:homeId", wishListController.updateWishList)


module.exports = route;