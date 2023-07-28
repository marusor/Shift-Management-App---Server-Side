let express = require("express");
let router = express.Router();
const permission = require("../middleware/permission");
let ShiftController = require("../controllers/shift-controller");

router.get("/", permission, ShiftController.getAllShifts);

router.post("/", permission, ShiftController.addShift);

router.get("/:lateShift", ShiftController.getShiftById);
router.patch("/:lateShift", ShiftController.updateShiftById);
router.delete("/:lateShift", ShiftController.deleteShiftById);

module.exports = router;
