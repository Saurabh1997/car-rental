const express = require("express");
const { getAllCars, addCarStock } = require("../controller/carsController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const carsApi = express.Router();

carsApi.get("/carcheck", (req, res) => {
  res.send({ msg: "sending back car" });
});

carsApi.get("/getAllCars", authMiddleware, getAllCars);

carsApi.post("/addCarStock", authMiddleware, addCarStock);

exports.carsApi = carsApi;
