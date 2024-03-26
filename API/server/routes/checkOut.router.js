const express = require("express");
const route = express.Router();

const checkOutController = require("../controller/checkOut.controller")

// checkOut API
route.get("/", checkOutController.getCheckOut );
route.get("/:id", checkOutController.getUserCheckOut );

module.exports = route;