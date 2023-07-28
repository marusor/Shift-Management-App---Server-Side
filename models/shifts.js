let mongoose = require("mongoose");
let User = require("../models/user");

let shiftSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  start: { type: Number },
  end: { type: Number },
  perHour: { type: Number },
  place: { type: String },
  created: { type: String },
  updated: { type: String },
});

module.exports = mongoose.model("Shifts", shiftSchema);
