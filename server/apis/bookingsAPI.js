const express = require("express");
const bookingsApi = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  postBooking,
  checkAvailability,
  getAllBookings,
} = require("../controller/bookingsController");

bookingsApi.get("/bookingcheck", (req, res) => {
  res.send({ msg: "sending back bookings" });
});

bookingsApi.get("/getAllBookings", authMiddleware, getAllBookings);

bookingsApi.post("/postBooking", postBooking);

bookingsApi.get("/checkAvailability", checkAvailability);

exports.bookingApi = bookingsApi;
