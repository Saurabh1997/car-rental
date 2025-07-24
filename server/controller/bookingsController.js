const Booking = require("../Models/bookingSchema");
const Car = require("../Models/carSchema");
const { getSeasonForDate, getAllDatesInRange } = require("../utils/helpers");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/responseUtils");

const postBooking = async (req, res) => {
  try {
    const { userId, carId, from, to, drivingLicenseValidTill } = req.body;

    const fromDate = new Date(from);
    const toDate = new Date(to);
    const licenseDate = new Date(drivingLicenseValidTill);

    if (licenseDate < toDate) {
      return sendErrorResponse(
        res,
        "Driving license must be valid through the booking period.",
        400
      );
    }

    const overlapping = await Booking.find({
      userId,
      $or: [{ from: { $lte: toDate }, to: { $gte: fromDate } }],
    });

    if (overlapping.length > 0) {
      return sendErrorResponse(
        res,
        "User already has a booking in this date range.",
        400
      );
    }

    const bookingsForCar = await Booking.find({
      car: carId,
      $or: [{ from: { $lte: toDate }, to: { $gte: fromDate } }],
    });

    const car = await Car.findById(carId);
    if (!car) return sendErrorResponse(res, "Car not found", 400);

    if (bookingsForCar.length >= car.stock) {
      return sendErrorResponse(res, "No available cars for this period.", 400);
    }

    const newBooking = await Booking.create({
      userId,
      car: carId,
      from: fromDate,
      to: toDate,
      drivingLicenseValidTill: licenseDate,
    });
    sendSuccessResponse(res, newBooking, 201);
  } catch (err) {
    sendErrorResponse(res, err.message);
  }
};

const checkAvailability = async (req, res) => {
  try {
    const { from, to } = req.query;

    const fromDate = new Date(from);
    const toDate = new Date(to);
    const totalDays =
      Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;

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

    sendSuccessResponse(
      res,
      carAvailability.filter((car) => car.available)
    );
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("car", "brand model") // Only fetch brand and model from Car
      .exec();
    sendSuccessResponse(res, bookings);
  } catch (error) {
    sendErrorResponse(res, "Bookings not found", 404);
  }
};

module.exports = { postBooking, checkAvailability, getAllBookings };
