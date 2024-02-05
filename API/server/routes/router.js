const express = require("express");
const route = express.Router();

const controller = require("../controller/user.contoller")

// user login and signup API
route.post("/signup", controller.signupPost)
route.post("/login", controller.loginPost)

module.exports = route;