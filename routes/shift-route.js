let express = require("express");
let router = express.Router();
const permission = require("../middleware/permission");
let ShiftController = require("../controllers/shift-controller");
let Admin = require("../middleware/admin-permission");

router.get("/", ShiftController.getAllShifts);

router.post("/", permission, ShiftController.addShift);
router.get("/user/:userId", ShiftController.getAllShiftsByUser);

router.get("/:lateShift", permission, ShiftController.getShiftById);
router.patch("/:lateShift", permission, ShiftController.updateShiftById);
router.delete("/:lateShift", Admin, ShiftController.deleteShiftById);

module.exports = router;
