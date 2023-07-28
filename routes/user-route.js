let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let User = require("../models/user");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let permission = require("../middleware/permission");
let UserController = require("../controllers/user-controller");

router.get("/", UserController.getAllUsers);

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

router.get("/:userID", UserController.getUserById);

router.delete("/:userId", UserController.deleteUserById);

router.patch("/:userId", UserController.updateUserById);

module.exports = router;
