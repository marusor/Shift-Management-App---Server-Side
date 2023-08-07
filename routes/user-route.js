let express = require("express");
let router = express.Router();
let UserController = require("../controllers/user-controller");
let Admin = require("../middleware/admin-permission");

router.get("/", Admin, UserController.getAllUsers);

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

router.get("/:userID", UserController.getUserById);

router.delete("/:userId", Admin, UserController.deleteUserById);

router.patch("/:userId", UserController.updateUserById);

module.exports = router;
