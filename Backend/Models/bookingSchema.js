const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    drivingLicenseValidTill: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
