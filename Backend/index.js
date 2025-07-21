const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectMongoDB } = require("./DBConnecter/connectToMongoDB");
const apis = require("./apis/index");
const app = express();

// MIDDLWARES
app.use(express.json());
app.use(cors());

app.use("/api", apis);
app.get("/check", (req, res) => {
  res.json({ msg: "API is fine" });
});

connectMongoDB();

app.listen(4141, () => {
  console.log(" Server is running ");
});
