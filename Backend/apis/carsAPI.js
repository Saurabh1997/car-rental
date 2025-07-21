const express = require("express");
const carsApi = express.Router();
const Car = require("../Models/carSchema");

carsApi.get("/carcheck", (req, res) => {
  res.send({ msg: "sending back car" });
});

carsApi.get("/getAllCars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.log(" cars ", error);
    res.status(404).json({ msg: "Car not found" });
  }
});

carsApi.post("/addCarStock", async (req, res) => {
  try {
    const { brand, model, stock, price } = req.body;
    if (
      !brand ||
      !model ||
      !stock ||
      !price?.peak ||
      !price?.mid ||
      !price?.off
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newCar = await Car.create({
      brand,
      model,
      stock,
      price,
    });

    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.carsApi = carsApi;
