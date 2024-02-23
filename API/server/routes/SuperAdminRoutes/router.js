const express = require("express");
const route = express.Router();
const multer = require("multer");
const upload = require("../../Multer/upload")

const loginController = require("../../controller/user.contoller")
const locationController = require("../../controller/superAdmin/location.controller")

// user login and signup API
route.post("/signup", loginController.signupPost)
route.post("/login", loginController.loginPost)

// location API
route.get("/location", locationController.locationGetAll)
route.get("/location/:id", locationController.locationGetId)
route.post("/location", multer({ storage: upload }).single('image'), locationController.locationPost);
route.put("/location/:id", multer({ storage: upload }).single('image'),locationController.locationupdate)
route.delete("/location/:id", locationController.locationDelete)

module.exports = route;