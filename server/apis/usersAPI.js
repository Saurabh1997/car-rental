const express = require("express");
const usersApi = express.Router();
const { signupUser, loginUser } = require("../controller/usersController");

usersApi.post("/signup", signupUser);

usersApi.post("/login", loginUser);

exports.usersApi = usersApi;
