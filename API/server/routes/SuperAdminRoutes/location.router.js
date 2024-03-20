const express = require("express");
const route = express.Router();
const multer = require("multer");
const upload = require("../../Multer/upload")

const locationController = require("../../controller/superAdmin/location.controller")

// location API
route.get("/location", locationController.locationGetAll)
route.get("/location/:id", locationController.locationGetId)
route.get("/location/product/:id", locationController.locationAndProduct)
route.post("/location", multer({ storage: upload }).single('image'), locationController.locationPost);
route.put("/location/:id", multer({ storage: upload }).single('image'),locationController.locationupdate)
route.delete("/location/:id", locationController.locationDelete)

module.exports = route;