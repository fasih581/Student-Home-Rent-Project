const express = require("express");
const route = express.Router();
const multer = require("multer");
const upload = require("../../Multer/upload");

const houseController = require("../../controller/superAdmin/house.controller");

route.get("/popular", houseController.getPopularRoom);
route.get("/:id", houseController.getIdHouse);
route.get("/", houseController.getAllHouse);

route.post(
  "/",
  multer({ storage: upload }).array("image", 5),
  houseController.housePost
);

route.put(
  "/:id",
  multer({ storage: upload }).array("image", 5),
  houseController.houseUpdate
);

route.delete("/:id", houseController.deleteHouse);

module.exports = route;
