const express = require("express");
const route = express.Router();

const loginController = require("../controller/user.contoller")
const locationController = require("../controller/location.controller")

// user login and signup API
route.post("/signup", loginController.signupPost)
route.post("/login", loginController.loginPost)

// location API
route.get("/location", locationController.locationGetAll)
route.get("/location/:id", locationController.locationGetId)
route.post("/location", locationController.locationPost)
route.delete("/location/:id", locationController.locationDelete)

module.exports = route;