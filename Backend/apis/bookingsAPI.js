const express = require("express");
const bookingsApi = express.Router();
const Booking = require("../Models/bookingSchema");
const Car = require("../Models/carSchema");
const { getSeasonForDate, getAllDatesInRange } = require("../utils/helpers");

bookingsApi.get("/bookingcheck", (req, res) => {
  res.send({ msg: "sending back bookings" });
});

bookingsApi.post("/postBooking", async (req, res) => {
  try {
    console.log(" coming here ", req.body);
    const { userId, carId, from, to, drivingLicenseValidTill } = req.body;

    const fromDate = new Date(from);
    const toDate = new Date(to);
    const licenseDate = new Date(drivingLicenseValidTill);

    if (licenseDate < toDate) {
      return res.status(400).json({
        error: "Driving license must be valid through the booking period.",
      });
    }

    const overlapping = await Booking.find({
      userId,
      $or: [{ from: { $lte: toDate }, to: { $gte: fromDate } }],
    });

    if (overlapping.length > 0) {
      return res
        .status(400)
        .json({ error: "User already has a booking in this date range." });
    }

    const bookingsForCar = await Booking.find({
      car: carId,
      $or: [{ from: { $lte: toDate }, to: { $gte: fromDate } }],
    });

    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ error: "Car not found" });

    if (bookingsForCar.length >= car.stock) {
      return res
        .status(400)
        .json({ error: "No available cars for this period." });
    }

    const newBooking = await Booking.create({
      userId,
      car: carId,
      from: fromDate,
      to: toDate,
      drivingLicenseValidTill: licenseDate,
    });

    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

bookingsApi.get("/availability", async (req, res) => {
  const { from, to } = req.query;

  const fromDate = new Date(from);
  const toDate = new Date(to);
  const totalDays = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;

  const allCars = await Car.find();
  const bookings = await Booking.find({
    $or: [{ from: { $lte: toDate }, to: { $gte: fromDate } }],
  });

  const carAvailability = allCars.map((car) => {
    const carBookings = bookings.filter(
      (b) => b.car.toString() === car._id.toString()
    );

    // Check if car is fully booked
    const bookingCount = carBookings.length;
    const available = bookingCount < car.stock;

    // Calculate price
    let totalPrice = 0;
    const dateList = getAllDatesInRange(fromDate, toDate);

    dateList.forEach((d) => {
      const season = getSeasonForDate(d);
      totalPrice += car.price[season];
    });

    return {
      carId: car._id,
      brand: car.brand,
      model: car.model,
      available,
      averagePrice: +(totalPrice / totalDays).toFixed(2),
      totalPrice: +totalPrice.toFixed(2),
    };
  });

  res.json(carAvailability.filter((car) => car.available));
});

exports.bookingApi = bookingsApi;
