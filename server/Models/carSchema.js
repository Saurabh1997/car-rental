const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  stock: { type: Number, required: true },
  price: {
    peak: { type: Number, required: true },
    mid: { type: Number, required: true },
    off: { type: Number, required: true },
  },
});

module.exports = mongoose.model("Car", carSchema);
