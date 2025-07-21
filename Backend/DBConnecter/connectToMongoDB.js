const mongoose = require("mongoose");

const connectMongoDB = () => {
  mongoose
    .connect(process.env.MONGODB_DB_URL)
    .then(() => console.log("Connected!"))
    .catch((err) => console.log(" err", err));
};

module.exports = { connectMongoDB };
