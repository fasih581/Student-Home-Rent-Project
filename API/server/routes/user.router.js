const express = require("express");
const route = express.Router();


const loginController = require("../controller/user.contoller")

// user login and signup API
route.post("/signup", loginController.signupPost)
route.post("/login", loginController.loginPost)

module.exports = route;