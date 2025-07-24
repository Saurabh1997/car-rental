const express = require("express");
const { bookingApi } = require("./bookingsAPI");
const { carsApi } = require("./carsAPI");
const { usersApi } = require("./usersAPI");

const app = express.Router();

app.use("/bookings", bookingApi);
app.use("/cars", carsApi);
app.use("/auth", usersApi);
module.exports = app;
