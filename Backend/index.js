const express = require("express");
const cors = require("cors");
const app = express();

app.get("/check", (req, res) => {
  connectPostgresDB();

  res.json({ msg: "API is fine" });
});

app.listen(4141, () => {
  console.log(" Server is running ");
});
