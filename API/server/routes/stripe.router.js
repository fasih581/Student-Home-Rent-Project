const express = require("express");
const route = express.Router();
// const multer = require("multer");
// const upload = require("../Multer/upload")

const StripeController = require("../controller/stripe.controller")

// Stripe API
route.post("/create_checkout_session", StripeController.StripePost );

module.exports = route;