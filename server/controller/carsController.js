const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/responseUtils");

const Car = require("../Models/carSchema");

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    sendSuccessResponse(res, cars);
  } catch (error) {
    console.log(" err", error);
    sendErrorResponse(res, "Car not found", 404);
  }
};

const addCarStock = async (req, res) => {
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
      return sendErrorResponse(res, "Missing required fields", 400);
    }
    const newCar = await Car.create({
      brand,
      model,
      stock,
      price,
    });

    sendSuccessResponse(res, newCar, 201);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = { getAllCars, addCarStock };
