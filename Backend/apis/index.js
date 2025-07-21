const express = require("express");
const { bookingApi } = require("./bookingsAPI");
const { carsApi } = require("./carsAPI");

const app = express.Router();

app.use(bookingApi, carsApi);

module.exports = app;
