const express = require("express");
const route = express.Router();
const multer = require("multer");
const upload = require("../../Multer/upload")

const houseController = require("../../controller/superAdmin/house.controller")


route.post("/", multer({ storage: upload }).array('image', 5), houseController.housePost);

module.exports = route;