const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectPostgresDB } = require("./DBConnecter/connectToPostgres");
const app = express();

app.get("/check", (req, res) => {
  connectPostgresDB();

  res.json({ msg: "API is fine" });
});

app.listen(4141, () => {
  console.log(" Server is running ");
});
